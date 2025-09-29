<?php

namespace App\Livewire;

use App\Models\User;
use App\Http\Requests\TaskRequest;
use App\Services\TaskService;
use Illuminate\Support\Facades\Validator;
use Livewire\Component;
use Livewire\WithPagination;

class Task extends Component
{
    use WithPagination;

    public $modalOpen = false;
    public $editingId = null;

    public $titulo = '';
    public $descricao = '';
    public $status = '';
    public $prioridade = 'baixa';
    public $responsavel = null;
    public $users = [];

    public $search = '';
    public $filterStatus = '';
    public $filterPriority = '';

    public function openCreateModal(): void
    {
        $this->resetForm();
        $this->editingId = null;
        $this->modalOpen = true;
    }

    public function openEditModal(TaskService $service, int $id): void
    {
        if (empty($this->users)) {
            $this->users = User::query()->orderBy('name')->get(['id','name','email'])->toArray();
        }
        
        $task = $service->findTask($id);
        $this->editingId = $task->id;
        $this->titulo = $task->titulo ?? '';
        $this->descricao = $task->descricao ?? '';
        $this->status = $task->status ?? 'aberto';
        $this->prioridade = $task->prioridade ?? 'media';
        $this->responsavel = $task->responsavel ?? null;
        $this->modalOpen = true;
    }

    public function closeModal(): void
    {
        $this->modalOpen = false;
    }

    public function save(TaskService $service): void
    {
        if ($this->editingId) {
            $this->validate(TaskRequest::rulesForUpdate());
            $payload = $this->only(['titulo', 'descricao', 'prioridade', 'status', 'responsavel']);
            $service->updateTask($this->editingId, $payload);
        } else {
            $payload = $this->only(['titulo', 'descricao', 'prioridade']);
            Validator::make($payload, TaskRequest::rulesForStore())->validate();
            $service->createTask($payload);
        }

        $this->closeModal();
        $this->resetForm();
        $this->resetPage();
    }

    public function delete(TaskService $service, int $id): void
    {
        $service->deleteTask($id);
        $this->resetPage();
    }

    private function resetForm(): void
    {
        $this->titulo = '';
        $this->descricao = '';
        $this->status = '';
        $this->prioridade = 'baixa';
        $this->responsavel = null;
    }

    public function updatingSearch(): void
    {
        $this->resetPage();
    }

    public function updatingFilterStatus(): void
    {
        $this->resetPage();
    }

    public function updatingFilterPriority(): void
    {
        $this->resetPage();
    }

    public function getTasksProperty(TaskService $service)
    {
        $filters = [
            'search' => $this->search,
            'status' => $this->filterStatus,
            'priority' => $this->filterPriority,
        ];

        return $service->getAllTasks($filters, 10);
    }

    public function render()
    {
        return view('livewire.task');
    }
}
