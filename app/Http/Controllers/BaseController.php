<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class BaseController extends Controller
{
    protected function successResponse($data = null, string $message = 'Operação realizada com sucesso', int $statusCode = 200): JsonResponse
    {
        $response = [
            'success' => true,
            'message' => $message,
        ];

        if ($data !== null) {
            $response['data'] = $data;
        }

        return response()->json($response, $statusCode);
    }

    protected function successResponseWithPagination($data, string $message = 'Dados recuperados com sucesso'): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data->items(),
            'pagination' => [
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'per_page' => $data->perPage(),
                'total' => $data->total(),
                'from' => $data->firstItem(),
                'to' => $data->lastItem(),
                'has_more_pages' => $data->hasMorePages()
            ]
        ]);
    }

    protected function createdResponse($data, string $message = 'Recurso criado com sucesso'): JsonResponse
    {
        return $this->successResponse($data, $message, 201);
    }

    protected function updatedResponse($data, string $message = 'Recurso atualizado com sucesso'): JsonResponse
    {
        return $this->successResponse($data, $message, 200);
    }
}
