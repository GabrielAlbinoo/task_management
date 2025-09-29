<?php

namespace App\Services;

use App\Models\User;
use App\Exceptions\ApiException;
use Illuminate\Support\Facades\Auth;

class AuthService {

    public function register(array $data)
    {
        try {
            $user = User::create($data);
            $token = $user->createToken('auth_token')->plainTextToken;

            return [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email
                ],
                'token' => $token,
            ];
        } catch (\Exception $e) {
            throw new ApiException('Erro ao criar usuário: ' . $e->getMessage(), 500);
        }
    }

    public function login(array $data)
    {
        try {
            if (!Auth::attempt($data)) {
                throw new ApiException('Credenciais inválidas', 401);
            }

            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email
                ],
                'token' => $token,
            ];
        } catch (ApiException $e) {
            throw $e;
        } catch (\Exception $e) {
            throw new ApiException('Erro ao fazer login: ' . $e->getMessage(), 500);
        }
    }

    public function logout(User $user)
    {
        try {
            $user->tokens()->delete();
            return true;
        } catch (\Exception $e) {
            throw new ApiException('Erro ao fazer logout: ' . $e->getMessage(), 500);
        }
    }
}