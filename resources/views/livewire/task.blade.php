<div style="padding:16px;max-width:1100px;margin:0 auto;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;gap:12px;flex-wrap:wrap;">
        <h1 style="margin:0;">Tarefas</h1>
        <div style="display:flex;gap:8px;align-items:center;flex:1;justify-content:flex-end;flex-wrap:wrap;">
            <input type="text" placeholder="Buscar por título" wire:model.live.debounce.400ms="search" style="flex:1;min-width:220px;padding:8px;border:1px solid #d1d5db;border-radius:6px;">
            <select wire:model.live="filterStatus" wire:change="resetPageOnFilter" style="padding:8px;border:1px solid #d1d5db;border-radius:6px;">
                <option value="">Todos status</option>
                <option value="aberto">Aberto</option>
                <option value="em_andamento">Em andamento</option>
                <option value="finalizado">Finalizado</option>
            </select>
            <select wire:model.live="filterPriority" wire:change="resetPageOnFilter" style="padding:8px;border:1px solid #d1d5db;border-radius:6px;">
                <option value="">Todas prioridades</option>
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
            </select>
            <button wire:click="openCreateModal" style="padding:8px 12px;background:#2563eb;color:#fff;border:none;border-radius:6px;cursor:pointer;">Nova tarefa</button>
        </div>
    </div>

    <div style="overflow:auto;border:1px solid #e5e7eb;border-radius:8px;background:#fff;box-shadow:0 4px 14px rgba(0,0,0,0.06);">
        <table style="width:100%;border-collapse:collapse;min-width:720px;">
            <thead>
                <tr style="background:#f9fafb;">
                    <th style="text-align:left;border-bottom:1px solid #e5e7eb;padding:10px 12px;font-weight:600;color:#111827;">Título</th>
                    <th style="text-align:left;border-bottom:1px solid #e5e7eb;padding:10px 12px;font-weight:600;color:#111827;">Status</th>
                    <th style="text-align:left;border-bottom:1px solid #e5e7eb;padding:10px 12px;font-weight:600;color:#111827;">Prioridade</th>
                    <th style="text-align:left;border-bottom:1px solid #e5e7eb;padding:10px 12px;font-weight:600;color:#111827;">Responsável</th>
                    <th style="text-align:left;border-bottom:1px solid #e5e7eb;padding:10px 12px;font-weight:600;color:#111827;">Criado em</th>
                    <th style="text-align:left;border-bottom:1px solid #e5e7eb;padding:10px 12px;font-weight:600;color:#111827;">Ações</th>
                </tr>
            </thead>
            <tbody wire:loading.class="opacity-60" wire:target="search,filterStatus,filterPriority,nextPage,previousPage,save,delete,openEditModal,openCreateModal">
                @forelse($this->tasks as $task)
                    <tr wire:key="task-{{ $task->id }}" style="transition:background-color .15s;">
                        <td style="border-bottom:1px solid #f3f4f6;padding:10px 12px;">{{ $task->titulo }}</td>
                        <td style="border-bottom:1px solid #f3f4f6;padding:10px 12px;">
                            <x-status-tag :value="$task->status" />
                        </td>
                        <td style="border-bottom:1px solid #f3f4f6;padding:10px 12px;">
                            <x-priority-tag :value="$task->prioridade" />
                        </td>
                        <td style="border-bottom:1px solid #f3f4f6;padding:10px 12px;">
                            @if($task->responsavelUser)
                                {{ $task->responsavelUser->name }} <span style="color:#6b7280;">({{ $task->responsavelUser->email }})</span>
                            @else
                                -
                            @endif
                        </td>
                        <td style="border-bottom:1px solid #f3f4f6;padding:10px 12px;">{{ optional($task->criado_em)->format('d/m/Y H:i') }}</td>
                        <td style="border-bottom:1px solid #f3f4f6;padding:10px 12px;display:flex;gap:8px;">
                            <button wire:click="openEditModal({{ $task->id }})" style="padding:6px 10px;background:#6b7280;color:#fff;border:none;border-radius:6px;cursor:pointer;">Editar</button>
                            <button onclick="if(!confirm('Tem certeza que deseja excluir?')){event.stopImmediatePropagation();event.preventDefault();}" wire:click="delete({{ $task->id }})" style="padding:6px 10px;background:#dc2626;color:#fff;border:none;border-radius:6px;cursor:pointer;">Excluir</button>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6" style="padding:16px;text-align:center;color:#6b7280;">Nenhuma tarefa encontrada.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div style="margin-top:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
        <div style="color:#6b7280;">Página {{ $this->tasks->currentPage() }} de {{ $this->tasks->lastPage() }}</div>
        <div style="display:flex;gap:8px;">
            <button wire:click="previousPage" @if($this->tasks->onFirstPage()) disabled @endif style="padding:6px 10px;border:1px solid #d1d5db;background:#fff;border-radius:6px;cursor:pointer;@if($this->tasks->onFirstPage())opacity:0.5;cursor:not-allowed;@endif">Anterior</button>
            <button wire:click="nextPage" @if(!$this->tasks->hasMorePages()) disabled @endif style="padding:6px 10px;border:1px solid #d1d5db;background:#fff;border-radius:6px;cursor:pointer;@if(!$this->tasks->hasMorePages())opacity:0.5;cursor:not-allowed;@endif">Próxima</button>
        </div>
    </div>

    @if($modalOpen)
        <div style="position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:50;padding:16px;">
            <div style="background:#fff;border-radius:8px;max-width:600px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 10px 25px rgba(0,0,0,0.2);">
                <div style="padding:20px;border-bottom:1px solid #e5e7eb;position:sticky;top:0;background:#fff;z-index:10;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <h2 style="margin:0;font-size:18px;font-weight:600;">{{ $editingId ? 'Editar tarefa' : 'Nova tarefa' }}</h2>
                        <button wire:click="closeModal" aria-label="Fechar" style="background:transparent;border:none;font-size:24px;cursor:pointer;padding:4px;line-height:1;">×</button>
                    </div>
                </div>

                <div style="padding:20px;">
                    <div style="display:grid;grid-template-columns:1fr;gap:16px;">
                        <div>
                            <label for="titulo" style="display:block;margin-bottom:6px;font-weight:500;color:#374151;">Título</label>
                            <input id="titulo" type="text" wire:model.defer="titulo" style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:6px;box-sizing:border-box;">
                            @error('titulo')
                                <div style="color:#dc2626;font-size:12px;margin-top:4px;">{{ $message }}</div>
                            @enderror
                        </div>

                        <div>
                            <label for="descricao" style="display:block;margin-bottom:6px;font-weight:500;color:#374151;">Descrição</label>
                            <textarea id="descricao" rows="3" wire:model.defer="descricao" style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:6px;resize:vertical;box-sizing:border-box;"></textarea>
                            @error('descricao')
                                <div style="color:#dc2626;font-size:12px;margin-top:4px;">{{ $message }}</div>
                            @enderror
                        </div>

                        @if($editingId)
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                                <div>
                                    <label for="status" style="display:block;margin-bottom:6px;font-weight:500;color:#374151;">Status</label>
                                    <select id="status" wire:model.defer="status" style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:6px;box-sizing:border-box;">
                                        <option value="aberto">Aberto</option>
                                        <option value="em_andamento">Em andamento</option>
                                        <option value="finalizado">Finalizado</option>
                                    </select>
                                    @error('status')
                                        <div style="color:#dc2626;font-size:12px;margin-top:4px;">{{ $message }}</div>
                                    @enderror
                                </div>
                                <div>
                                    <label for="prioridade" style="display:block;margin-bottom:6px;font-weight:500;color:#374151;">Prioridade</label>
                                    <select id="prioridade" wire:model.defer="prioridade" style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:6px;box-sizing:border-box;">
                                        <option value="baixa">Baixa</option>
                                        <option value="media">Média</option>
                                        <option value="alta">Alta</option>
                                    </select>
                                    @error('prioridade')
                                        <div style="color:#dc2626;font-size:12px;margin-top:4px;">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        @else
                            <div>
                                <label for="prioridade" style="display:block;margin-bottom:6px;font-weight:500;color:#374151;">Prioridade</label>
                                <select id="prioridade" wire:model.defer="prioridade" style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:6px;box-sizing:border-box;">
                                    <option value="baixa">Baixa</option>
                                    <option value="media">Média</option>
                                    <option value="alta">Alta</option>
                                </select>
                                @error('prioridade')
                                    <div style="color:#dc2626;font-size:12px;margin-top:4px;">{{ $message }}</div>
                                @enderror
                            </div>
                        @endif

                        @if($editingId)
                            <div>
                                <label for="responsavel" style="display:block;margin-bottom:6px;font-weight:500;color:#374151;">Responsável</label>
                                <select id="responsavel" wire:model.defer="responsavel" style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:6px;box-sizing:border-box;">
                                    <option value="">Sem responsável</option>
                                    @foreach($this->users as $user)
                                        <option value="{{ $user['id'] }}">{{ $user['name'] }} ({{ $user['email'] }})</option>
                                    @endforeach
                                </select>
                                @error('responsavel')
                                    <div style="color:#dc2626;font-size:12px;margin-top:4px;">{{ $message }}</div>
                                @enderror
                            </div>
                        @endif
                    </div>

                    <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb;">
                        <button wire:click="closeModal" style="padding:10px 16px;background:#f3f4f6;color:#374151;border:none;border-radius:6px;cursor:pointer;font-weight:500;">Cancelar</button>
                        <button wire:click="save" style="padding:10px 16px;background:#16a34a;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:500;">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    @endif
</div>
