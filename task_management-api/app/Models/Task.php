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

    protected $casts = [
        'criado_em' => 'datetime',
        'atualizado_em' => 'datetime',
    ];

    protected $appends = [
        'responsavel_nome',
        'responsavel_email',
    ];

    public function responsavelUser()
    {
        return $this->belongsTo(User::class, 'responsavel');
    }

    public function getResponsavelNomeAttribute()
    {
        return $this->responsavelUser?->name;
    }

    public function getResponsavelEmailAttribute()
    {
        return $this->responsavelUser?->email;
    }
}
