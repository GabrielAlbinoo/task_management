<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::get('tarefas', [TaskController::class, 'index']);
Route::post('tarefas', [TaskController::class, 'store']);
Route::get('tarefas/{id}', [TaskController::class, 'show']);
Route::put('tarefas/{id}', [TaskController::class, 'update']);
Route::delete('tarefas/{id}', [TaskController::class, 'destroy']);
