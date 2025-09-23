<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'tarefas';
    
    protected $fillable = [
        'titulo',
        'descricao',
        'status',
        'prioridade',
        'responsavel',
    ];
    
    const CREATED_AT = 'criado_em';
    const UPDATED_AT = 'atualizado_em';
}
