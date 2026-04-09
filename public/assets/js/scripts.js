let editingNoteId = null; 
// Armazena o ID da nota em edição (null = modo criação)

document.addEventListener('DOMContentLoaded', function () {

    // Inicializa o banco IndexedDB
    initDB();

    // Botão para abrir o modal de nova nota
    const btn = document.getElementById('btnNewNote');

    // Botão para salvar (criar ou editar)
    const saveBtn = document.getElementById('saveNote');

    if (btn) {
        btn.addEventListener('click', function () {

            // Garante que estamos no modo criação
            editingNoteId = null;

            // Abre o modal
            const modal = new bootstrap.Modal(document.getElementById('noteModal'));
            modal.show();
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', function () {

            // Captura os valores dos inputs
            const title = document.getElementById('noteTitle').value;
            const content = document.getElementById('noteContent').value;

            // Validação básica
            if (!title.trim() || !content.trim()) {
                console.log("Dados inválidos");
                return;
            }

            // Decide entre criação ou atualização
            if (editingNoteId !== null) {
                updateData(editingNoteId, { title, content });
                editingNoteId = null;
            } else {
                addData(title, content);
            }

            // Limpa os campos do formulário
            document.getElementById('noteTitle').value = "";
            document.getElementById('noteContent').value = "";

            // Fecha o modal
            const modalEl = document.getElementById('noteModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();
        });
    }

});

// Carrega todas as notas e envia para renderização
function loadNotes() {
    getAllNotes(function (notes) {
        renderNotes(notes);
    });
}

// Responsável por renderizar a lista de notas na UI
function renderNotes(notes) {

    const notesList = document.getElementById('notesList');

    // Limpa a lista antes de renderizar novamente
    notesList.innerHTML = "";

    // Percorre todas as notas retornadas do banco
    notes.forEach(note => {

        // Container principal da nota
        const div = document.createElement('div');
        div.className = 'tool-card d-flex justify-content-between align-items-center mb-2';

        // Exibe o título da nota
        const span = document.createElement('span');
        span.className = 'note-title';
        span.textContent = note.title; // Uso de textContent evita XSS

        // Container dos botões de ação
        const actions = document.createElement('div');

        // Botão de edição
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-sm btn-outline-secondary';
        editBtn.textContent = '✏️';

        // Botão de exclusão
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-outline-danger';
        deleteBtn.textContent = '🗑️';

        // Evento de exclusão
        deleteBtn.addEventListener('click', function () {
            deleteData(note.id);
        });

        // Evento de edição
        editBtn.addEventListener('click', function () {

            // Define o ID da nota em edição
            editingNoteId = note.id;

            // Preenche o modal com os dados existentes
            document.getElementById('noteTitle').value = note.title;
            document.getElementById('noteContent').value = note.content;

            // Abre o modal
            const modal = new bootstrap.Modal(document.getElementById('noteModal'));
            modal.show();
        });

        // Monta a estrutura da nota
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        div.appendChild(span);
        div.appendChild(actions);

        notesList.appendChild(div);
    });
}