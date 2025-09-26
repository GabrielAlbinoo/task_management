<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tarefas', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->text('descricao')->nullable();
            $table->enum('status', ['aberto', 'em_andamento', 'finalizado'])->default('aberto');
            $table->enum('prioridade', ['baixa', 'media', 'alta'])->default('media');
            $table->foreignId('responsavel')->nullable()->constrained('users')->nullOnDelete()->index();
            $table->timestamp('criado_em')->useCurrent();
            $table->timestamp('atualizado_em')->useCurrentOnUpdate()->useCurrent();

            $table->index('status');
            $table->index('prioridade');
            $table->index('titulo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tarefas');
    }
};
