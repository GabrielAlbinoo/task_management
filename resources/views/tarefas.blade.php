<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tarefas</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        :root { --bg: #0b1220; --panel:#0f172a; --muted:#94a3b8; --text:#e2e8f0; --primary:#3b82f6; --success:#10b981; --danger:#ef4444; }
        * { box-sizing: border-box; }
        body { margin:0; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"; background:var(--bg); color:var(--text); }
        .container { max-width: 1100px; margin: 32px auto; padding: 0 16px; }
        .card { background: var(--panel); border:1px solid #1f2937; border-radius: 12px; padding: 16px; }
        .title { font-weight: 600; font-size: 20px; margin: 0 0 12px; }
        .row { display:flex; gap:12px; flex-wrap:wrap; }
        input, select { background:#0b1328; border:1px solid #1f2a44; color:var(--text); padding:10px 12px; border-radius:8px; }
        button { padding:10px 14px; border:none; border-radius:8px; color:white; background:var(--primary); cursor:pointer; }
        button[disabled] { opacity:.6; cursor:not-allowed; }
        .btn-danger { background: var(--danger); }
        .btn-success { background: var(--success); }
        table { width:100%; border-collapse: collapse; }
        th, td { text-align:left; padding:10px 8px; border-bottom:1px solid #1f2937; font-size:14px; }
        th { color:#a3b2c7; font-weight:600; }
        .muted { color: var(--muted); font-size: 12px; }
        .pill { display:inline-block; padding:2px 8px; border-radius:9999px; font-size:12px; border:1px solid #26334d; }
        .status-aberto { background:#1e293b; color:#93c5fd; }
        .status-em_andamento { background:#0f5132; color:#86efac; }
        .status-finalizado { background:#1e293b; color:#cbd5e1; text-decoration: line-through; }
        .pagination { display:flex; gap:8px; align-items:center; justify-content:flex-end; }
    </style>
</head>
<body>
<div class="container">
    <h1 style="margin:0 0 16px">Gerenciador de Tarefas</h1>

    <div class="card" style="margin-bottom:16px">
        <div class="title">Filtros</div>
        <div class="row">
            <input id="filter-search" placeholder="Buscar por título" />
            <select id="filter-status">
                <option value="">Status (todos)</option>
                <option value="aberto">Aberto</option>
                <option value="em_andamento">Em andamento</option>
                <option value="finalizado">Finalizado</option>
            </select>
            <select id="filter-priority">
                <option value="">Prioridade (todas)</option>
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
            </select>
            <select id="per-page">
                <option value="10">10</option>
                <option value="15" selected>15</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
            <button id="apply-filters">Aplicar</button>
        </div>
    </div>

    <div class="card" style="margin-bottom:16px">
        <div class="title">Nova / Editar Tarefa</div>
        <form id="task-form" class="row" onsubmit="return false;">
            <input type="hidden" id="task-id" />
            <input id="titulo" placeholder="Título *" required minlength="3" maxlength="255" style="flex:1 1 240px" />
            <input id="responsavel" placeholder="Responsável" maxlength="100" style="flex:1 1 200px" />
            <select id="status">
                <option value="aberto">Aberto</option>
                <option value="em_andamento">Em andamento</option>
                <option value="finalizado">Finalizado</option>
            </select>
            <select id="prioridade">
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
            </select>
            <input id="descricao" placeholder="Descrição" maxlength="1000" style="flex: 1 1 320px" />
            <button id="save-task" class="btn-success">Salvar</button>
            <button id="reset-form" type="button">Limpar</button>
        </form>
        <div id="form-errors" class="muted" style="margin-top:8px"></div>
    </div>

    <div class="card">
        <div class="title">Lista</div>
        <div style="overflow:auto">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Status</th>
                        <th>Prioridade</th>
                        <th>Responsável</th>
                        <th style="width:160px">Ações</th>
                    </tr>
                </thead>
                <tbody id="tbody"></tbody>
            </table>
        </div>
        <div class="pagination" style="margin-top:12px">
            <button id="prev">Anterior</button>
            <span id="page-info" class="muted"></span>
            <button id="next">Próxima</button>
        </div>
    </div>
</div>

<script>
const apiBase = '/api/tarefas'; // usa rotas já existentes
let currentPage = 1;

function qs(id){ return document.getElementById(id); }
function serializeFilters(){
    const params = new URLSearchParams();
    const search = qs('filter-search').value.trim();
    const status = qs('filter-status').value;
    const priority = qs('filter-priority').value;
    const perPage = qs('per-page').value;
    if(search) params.set('search', search);
    if(status) params.set('status', status);
    if(priority) params.set('priority', priority);
    if(perPage) params.set('per_page', perPage);
    params.set('page', String(currentPage));
    return params.toString();
}

async function fetchJson(url, options){
    const res = await fetch(url, { headers: { 'Content-Type':'application/json' }, ...options });
    if(res.status === 204) return { success:true };
    const data = await res.json().catch(()=>({ success:false }));
    if(!res.ok || data.success === false){
        const message = data?.message || 'Erro na requisição';
        const errors = data?.errors || {};
        throw { message, errors };
    }
    return data;
}

function renderRows(items){
    const tbody = qs('tbody');
    tbody.innerHTML = '';
    for(const item of items){
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${escapeHtml(item.titulo)}</td>
            <td><span class="pill status-${item.status}">${item.status}</span></td>
            <td>${item.prioridade}</td>
            <td>${escapeHtml(item.responsavel ?? '')}</td>
            <td>
                <button data-id="${item.id}" class="edit">Editar</button>
                <button data-id="${item.id}" class="btn-danger delete">Excluir</button>
            </td>`;
        tbody.appendChild(tr);
    }
}

function escapeHtml(str){
    return String(str).replace(/[&<>"]+/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));
}

function bindRowActions(items){
    document.querySelectorAll('button.edit').forEach(btn => {
        btn.onclick = () => {
            const item = items.find(i => String(i.id) === btn.dataset.id);
            if(!item) return;
            qs('task-id').value = item.id;
            qs('titulo').value = item.titulo;
            qs('responsavel').value = item.responsavel ?? '';
            qs('status').value = item.status ?? 'aberto';
            qs('prioridade').value = item.prioridade ?? 'baixa';
            qs('descricao').value = item.descricao ?? '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    });
    document.querySelectorAll('button.delete').forEach(btn => {
        btn.onclick = async () => {
            if(!confirm('Excluir esta tarefa?')) return;
            try{
                await fetchJson(`${apiBase}/${btn.dataset.id}`, { method:'DELETE' });
                load();
            }catch(err){ showErrors(err); }
        };
    });
}

function showErrors(err){
    const el = qs('form-errors');
    if(err?.errors && typeof err.errors === 'object'){
        const list = Object.entries(err.errors).map(([k,v]) => `- ${k}: ${Array.isArray(v)?v.join(', '):v}`).join('<br>');
        el.innerHTML = list;
    } else {
        el.textContent = err?.message || 'Erro inesperado';
    }
}

async function load(){
    try{
        const q = serializeFilters();
        const data = await fetchJson(`${apiBase}?${q}`);
        renderRows(data.data);
        bindRowActions(data.data);
        qs('page-info').textContent = `Página ${data.pagination.current_page} de ${data.pagination.last_page} • ${data.pagination.total} itens`;
        qs('prev').disabled = data.pagination.current_page <= 1;
        qs('next').disabled = !data.pagination.has_more_pages;
    }catch(err){ showErrors(err); }
}

qs('apply-filters').onclick = () => { currentPage = 1; load(); };
qs('prev').onclick = () => { if(currentPage>1){ currentPage--; load(); } };
qs('next').onclick = () => { currentPage++; load(); };

qs('reset-form').onclick = () => {
    qs('task-id').value = '';
    qs('task-form').reset();
    qs('status').value = 'aberto';
    qs('prioridade').value = 'baixa';
    qs('form-errors').textContent = '';
};

qs('save-task').onclick = async () => {
    const id = qs('task-id').value.trim();
    const body = {
        titulo: qs('titulo').value.trim(),
        descricao: qs('descricao').value.trim() || null,
        status: qs('status').value || null,
        prioridade: qs('prioridade').value || null,
        responsavel: qs('responsavel').value.trim() || null,
    };
    try{
        if(id){
            await fetchJson(`${apiBase}/${id}`, { method:'PUT', body: JSON.stringify(body) });
        }else{
            await fetchJson(`${apiBase}`, { method:'POST', body: JSON.stringify(body) });
        }
        qs('reset-form').click();
        load();
    }catch(err){ showErrors(err); }
};

// inicialização
load();
</script>
</body>
</html>


