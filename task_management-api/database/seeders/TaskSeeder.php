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
        Task::create([
            'titulo' => 'Plan marketing campaign',
            'descricao' => 'Outline the main points for the next marketing campaign.',
            'status' => 'aberto',
            'prioridade' => 'alta',
            'responsavel' => null,
        ]);
        Task::create([
            'titulo' => 'Prepare sprint backlog',
            'descricao' => 'Organize user stories for the upcoming sprint planning.',
            'status' => 'aberto',
            'prioridade' => 'media',
            'responsavel' => null,
        ]);
        Task::create([
            'titulo' => 'Update CI pipeline',
            'descricao' => 'Review and update CI workflow to include new tests.',
            'status' => 'aberto',
            'prioridade' => 'alta',
            'responsavel' => null,
        ]);
        Task::create([
            'titulo' => 'Audit dependencies',
            'descricao' => 'Run dependency check and document required updates.',
            'status' => 'aberto',
            'prioridade' => 'media',
            'responsavel' => null,
        ]);
        Task::create([
            'titulo' => 'Refine user stories',
            'descricao' => 'Improve acceptance criteria for existing user stories.',
            'status' => 'aberto',
            'prioridade' => 'baixa',
            'responsavel' => null,
        ]);
        Task::create([
            'titulo' => 'Create onboarding guide',
            'descricao' => 'Draft onboarding documentation for new collaborators.',
            'status' => 'aberto',
            'prioridade' => 'media',
            'responsavel' => null,
        ]);
        Task::create([
            'titulo' => 'Test notification system',
            'descricao' => 'Verify push notifications across environments.',
            'status' => 'aberto',
            'prioridade' => 'alta',
            'responsavel' => null,
        ]);
    }
}
