<?php

namespace App\Livewire;

use App\Models\Task as TaskModel;
use Livewire\Component;
use Livewire\WithPagination;

class Task extends Component
{
    use WithPagination;

    public $modalOpen = false;
    public $editingId = null;

    public $titulo = '';
    public $descricao = '';
    public $status = 'aberto';
    public $prioridade = 'media';
    public $responsavel = '';

    public $search = '';
    public $filterStatus = '';
    public $filterPrioridade = '';

    protected $rules = [
        'titulo' => 'required|string|max:255|min:3',
        'descricao' => 'nullable|string|max:1000',
        'status' => 'nullable|in:aberto,em_andamento,finalizado',
        'prioridade' => 'nullable|in:baixa,media,alta',
        'responsavel' => 'nullable|string|max:100',
    ];

    public function openCreateModal(): void
    {
        $this->resetForm();
        $this->editingId = null;
        $this->modalOpen = true;
    }

    public function openEditModal(int $id): void
    {
        $task = TaskModel::findOrFail($id);
        $this->editingId = $task->id;
        $this->titulo = $task->titulo ?? '';
        $this->descricao = $task->descricao ?? '';
        $this->status = $task->status ?? 'aberto';
        $this->prioridade = $task->prioridade ?? 'media';
        $this->responsavel = $task->responsavel ?? '';
        $this->modalOpen = true;
    }

    public function closeModal(): void
    {
        $this->modalOpen = false;
    }

    public function save(): void
    {
        $this->validate();

        if ($this->editingId) {
            $task = TaskModel::findOrFail($this->editingId);
            $task->update($this->only(['titulo', 'descricao', 'status', 'prioridade', 'responsavel']));
        } else {
            TaskModel::create($this->only(['titulo', 'descricao', 'status', 'prioridade', 'responsavel']));
        }

        $this->closeModal();
        $this->resetForm();
        $this->resetPage();
    }

    public function delete(int $id): void
    {
        $task = TaskModel::findOrFail($id);
        $task->delete();
        $this->resetPage();
    }

    private function resetForm(): void
    {
        $this->titulo = '';
        $this->descricao = '';
        $this->status = 'aberto';
        $this->prioridade = 'media';
        $this->responsavel = '';
    }

    public function render()
    {
        $query = TaskModel::query();

        if ($this->search !== '') {
            $query->where('titulo', 'like', '%' . $this->search . '%');
        }

        if ($this->filterStatus !== '') {
            $query->where('status', $this->filterStatus);
        }

        if ($this->filterPrioridade !== '') {
            $query->where('prioridade', $this->filterPrioridade);
        }

        $tasks = $query->orderByDesc('criado_em')->paginate(10);

        return view('livewire.task', [
            'tasks' => $tasks,
        ]);
    }

    public function updatingSearch(): void
    {
        $this->resetPage();
    }

    public function updatedFilterStatus(): void
    {
        $this->resetPage();
    }

    public function updatedFilterPrioridade(): void
    {
        $this->resetPage();
    }
}
