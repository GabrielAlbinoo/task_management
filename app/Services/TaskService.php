<?php

namespace App\Services;

use App\Models\Task;
use App\Exceptions\ApiException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class TaskService
{
    public function getAllTasks(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = Task::query()->orderBy('criado_em', 'desc');
        
        $this->applyFilters($query, $filters);
        
        return $query->paginate($perPage);
    }

    public function createTask(array $data): Task
    {
        try {
            $data['status'] = 'aberto';
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

    public function finalizeTask(int $id, int $userId): Task
    {
        try {
            $task = Task::findOrFail($id);

            if ((int) $task->responsavel !== (int) $userId) {
                throw new ApiException('Apenas o responsável pode finalizar a tarefa', 403);
            }

            if ($task->status === 'finalizado') {
                return $task;
            }

            $task->status = 'finalizado';
            $task->save();

            return $task->fresh();
        } catch (ModelNotFoundException $e) {
            throw new ApiException('Tarefa não encontrada', 404);
        } catch (ApiException $e) {
            throw $e;
        } catch (\Exception $e) {
            throw new ApiException('Erro ao finalizar tarefa: ' . $e->getMessage(), 500);
        }
    }

    public function claimTask(int $id, int $userId): Task
    {
        try {
            return DB::transaction(function () use ($id, $userId) {
                $task = Task::where('id', $id)->lockForUpdate()->firstOrFail();

                if ($task->status === 'finalizado') {
                    throw new ApiException('Não é possível pegar uma tarefa finalizada', 422);
                }

                if ($task->responsavel !== null) {
                    throw new ApiException('Tarefa já possui responsável', 403);
                }

                $task->responsavel = $userId;
                $task->status = 'em_andamento';
                $task->save();

                return $task->fresh();
            });
        } catch (ModelNotFoundException $e) {
            throw new ApiException('Tarefa não encontrada', 404);
        } catch (ApiException $e) {
            throw $e;
        } catch (\Exception $e) {
            throw new ApiException('Erro ao pegar tarefa: ' . $e->getMessage(), 500);
        }
    }

    private function applyFilters(Builder $query, array $filters): void
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
