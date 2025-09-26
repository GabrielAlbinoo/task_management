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
        
        return $this->successResponseWithPagination($tasks, 'Tarefas listadas');
    }

    public function store(TaskRequest $request): JsonResponse
    {
        $task = $this->taskService->createTask($request->validated());
        
        return $this->createdResponse($task, 'Tarefa criada');
    }

    public function update(TaskRequest $request, int $id): JsonResponse
    {
        $task = $this->taskService->updateTask($id, $request->validated());
        
        return $this->updatedResponse($task, 'Tarefa atualizada');
    }
    
    public function destroy(int $id): JsonResponse
    {
        $this->taskService->deleteTask($id);
        return $this->successResponse(null, 'Tarefa removida');
    }

    public function show(int $id): JsonResponse
    {
        $task = $this->taskService->findTask($id);
        
        return $this->successResponse($task, 'Tarefa retornada');
    }

    public function finalize(Request $request, int $id): JsonResponse
    {
        $userId = (int) $request->user()->id;
        $task = $this->taskService->finalizeTask($id, $userId);

        return $this->updatedResponse($task, 'Tarefa finalizada');
    }

    public function claim(Request $request, int $id): JsonResponse
    {
        $userId = (int) $request->user()->id;
        $task = $this->taskService->claimTask($id, $userId);

        return $this->updatedResponse($task, 'Tarefa atribuída');
    }

}
