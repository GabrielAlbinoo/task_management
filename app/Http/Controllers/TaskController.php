<?php

namespace App\Http\Controllers;
use App\Http\Requests\TaskRequest;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
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
        
        return response()->json([
            'success' => true,
            'data' => $tasks->items(),
            'pagination' => [
                'current_page' => $tasks->currentPage(),
                'last_page' => $tasks->lastPage(),
                'per_page' => $tasks->perPage(),
                'total' => $tasks->total(),
                'from' => $tasks->firstItem(),
                'to' => $tasks->lastItem(),
                'has_more_pages' => $tasks->hasMorePages()
            ],
            'filters_applied' => array_filter($filters)
        ]);
    }

    public function store(TaskRequest $request): JsonResponse
    {
        $task = $this->taskService->createTask($request->validated());
        
        return response()->json([
            'success' => true,
            'message' => 'Tarefa criada com sucesso',
            'data' => $task
        ], 201);
    }

    public function update(TaskRequest $request, int $id): JsonResponse
    {
        $task = $this->taskService->updateTask($id, $request->validated());
        
        return response()->json([
            'success' => true,
            'message' => 'Tarefa atualizada com sucesso',
            'data' => $task
        ]);
    }
    
    public function destroy(int $id): JsonResponse
    {
        $this->taskService->deleteTask($id);
        
        return response()->json([
            'success' => true,
            'message' => 'Tarefa deletada com sucesso'
        ], 204);
    }

    public function show(int $id): JsonResponse
    {
        $task = $this->taskService->findTask($id);
        
        return response()->json([
            'success' => true,
            'data' => $task
        ]);
    }

}
