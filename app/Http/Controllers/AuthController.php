<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends BaseController
{

    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(AuthRequest $request): JsonResponse
    {
        $user = $this->authService->register($request->validated());
        
        return $this->createdResponse($user, 'Usuário criado com sucesso');
    }

    public function login(AuthRequest $request): JsonResponse
    {
        $data = $this->authService->login($request->validated());
        
        return $this->successResponse($data, 'Login realizado com sucesso');
    }

    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout($request->user());
        
        return $this->successResponse(null, 'Logout realizado com sucesso');
    }
}
