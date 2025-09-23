<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use App\Exceptions\ApiException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (Throwable $e, $request) {
            if ($request->is('api/*')) {
                if ($e instanceof ApiException) {
                    return $e->render();
                }
                if ($e instanceof ValidationException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Dados inválidos',
                        'errors' => $e->errors(),
                        'status_code' => 422
                    ], 422);
                }

                if ($e instanceof ModelNotFoundException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Recurso não encontrado',
                        'status_code' => 404
                    ], 404);
                }

                if ($e instanceof QueryException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Erro no banco de dados',
                        'status_code' => 500
                    ], 500);
                }

                return response()->json([
                    'success' => false,
                    'message' => 'Erro interno do servidor',
                    'status_code' => 500
                ], 500);
            }
        });
    })->create();
