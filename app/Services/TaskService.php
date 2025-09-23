<?php

namespace App\Services;

use App\Models\Task;
use App\Http\Requests\TaskRequest;
use App\Exceptions\ApiException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Pagination\LengthAwarePaginator;

class TaskService
{
    public function getAllTasks(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = Task::query();
        
        $this->applyFilters($query, $filters);
        
        return $query->paginate($perPage);
    }

    public function createTask(array $data): Task
    {
        try {
            return Task::create($data);
        } catch (\Exception $e) {
            throw new ApiException('Erro ao criar tarefa: ' . $e->getMessage(), 500);
        }
    }

    public function updateTask(int $id, array $data): Task
    {
        try {
            $task = Task::findOrFail($id);
            $task->update($data);
            return $task->fresh();
        } catch (ModelNotFoundException $e) {
            throw new ApiException('Tarefa não encontrada', 404);
        } catch (\Exception $e) {
            throw new ApiException('Erro ao atualizar tarefa: ' . $e->getMessage(), 500);
        }
    }

    public function deleteTask(int $id): bool
    {
        try {
            $task = Task::findOrFail($id);
            return $task->delete();
        } catch (ModelNotFoundException $e) {
            throw new ApiException('Tarefa não encontrada', 404);
        } catch (\Exception $e) {
            throw new ApiException('Erro ao deletar tarefa: ' . $e->getMessage(), 500);
        }
    }

    public function findTask(int $id): Task
    {
        try {
            return Task::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            throw new ApiException('Tarefa não encontrada', 404);
        }
    }

    private function applyFilters($query, array $filters): void
    {
        if (!empty($filters['priority'])) {
            $query->where('prioridade', $filters['priority']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['search'])) {
            $query->where('titulo', 'LIKE', '%' . $filters['search'] . '%');
        }
    }
}
