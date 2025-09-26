<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        Task::create([
            'titulo' => 'Finish documentation',
            'descricao' => 'Complete the API documentation for the project.',
            'status' => 'aberto',
            'prioridade' => 'alta',
            'responsavel' => 1,
        ]);
        Task::create([
            'titulo' => 'Fix login bug',
            'descricao' => 'Resolve the login issue for new users.',
            'status' => 'em_andamento',
            'prioridade' => 'media',
            'responsavel' => 2,
        ]);
        Task::create([
            'titulo' => 'Design homepage',
            'descricao' => 'Create a new design for the homepage.',
            'status' => 'finalizado',
            'prioridade' => 'baixa',
            'responsavel' => 3,
        ]);
    }
}
