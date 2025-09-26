<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AuthController;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('tarefas', [TaskController::class, 'index']);
    Route::post('tarefas', [TaskController::class, 'store']);
    Route::get('tarefas/{id}', [TaskController::class, 'show']);
    Route::put('tarefas/{id}', [TaskController::class, 'update']);
    Route::delete('tarefas/{id}', [TaskController::class, 'destroy']);
});