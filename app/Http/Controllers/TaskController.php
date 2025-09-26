<?php

namespace App\Http\Controllers;
use App\Http\Requests\TaskRequest;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends BaseController
{

    protected TaskService $taskService;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['priority', 'status', 'search']);
        $perPage = $request->get('per_page', 15);
        
        $perPage = min(max($perPage, 1), 100);
        
        $tasks = $this->taskService->getAllTasks($filters, $perPage);
        
        return $this->successResponseWithPagination($tasks, 'Tarefas recuperadas com sucesso');
    }

    public function store(TaskRequest $request): JsonResponse
    {
        $task = $this->taskService->createTask($request->validated());
        
        return $this->createdResponse($task, 'Tarefa criada com sucesso');
    }

    public function update(TaskRequest $request, int $id): JsonResponse
    {
        $task = $this->taskService->updateTask($id, $request->validated());
        
        return $this->updatedResponse($task, 'Tarefa atualizada com sucesso');
    }
    
    public function destroy(int $id): JsonResponse
    {
        $this->taskService->deleteTask($id);

        return $this->successNoContent();
    }

    public function show(int $id): JsonResponse
    {
        $task = $this->taskService->findTask($id);
        
        return $this->successResponse($task, 'Tarefa recuperada com sucesso');
    }

}
