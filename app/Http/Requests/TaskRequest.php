<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $isStore = $this->isMethod('post');

        return $isStore
            ? self::rulesForStore()
            : self::rulesForUpdate();
    }

    public static function rulesForStore(): array
    {
        $rules = [
            'titulo' => 'required|string|max:255|min:3',
            'descricao' => 'nullable|string|max:1000',
            'prioridade' => 'nullable|in:baixa,media,alta',
            'status' => 'prohibited',
            'responsavel' => 'prohibited',
        ];

        return $rules;
    }

    public static function rulesForUpdate(): array
    {
        return [
            'titulo' => 'required|string|max:255|min:3',
            'descricao' => 'nullable|string|max:1000',
            'prioridade' => 'nullable|in:baixa,media,alta',
            'status' => 'nullable|in:aberto,em_andamento,finalizado',
            'responsavel' => 'nullable|exists:users,id',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'titulo.required' => 'O título da tarefa é obrigatório.',
            'titulo.min' => 'O título deve ter pelo menos 3 caracteres.',
            'titulo.max' => 'O título não pode ter mais de 255 caracteres.',
            'descricao.max' => 'A descrição não pode ter mais de 1000 caracteres.',
            'prioridade.in' => 'A prioridade deve ser: baixa, media ou alta.',
            'responsavel.exists' => 'O responsável informado é inválido.',
            'status.prohibited' => 'O campo status não pode ser enviado na criação.',
            'responsavel.prohibited' => 'O campo responsável não pode ser enviado na criação.',
        ];
    }
}
