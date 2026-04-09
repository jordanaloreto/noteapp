<div class="container">
    <div class="gradient-border">

        <header class="py-4">
            <div class="container">

                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="mb-0">Minhas Notas</h4>
                    <button class="btn btn-primary" id="btnNewNote">
                        + Nova Nota
                    </button>
                </div>

                <hr>

                <div id="notesList">

                </div>

            </div>
        </header>
    </div>
</div>
<br>
<section>
    <div class="container">
        <div class="gradient-border">
            <header class="py-4">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-10 text-center">
                            <p class="lead">
                                Este projeto foi desenvolvido com base na ideia proposta no repositório do GitHub
                                (NoteApp). Além de implementar os requisitos originais, também foi utilizado o IndexedDB, 
                                com o objetivo de aprendizado.
                            </p>
                            <p class="lead">
                                Esse projeto foi feito utilizando PHP 8.4, Laravel Herd e o template Personal do Start Bootstrap
                            </p>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    </div>
</section>
<div class="modal fade" id="noteModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Nova Nota</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Título</label>
                    <input type="text" class="form-control" id="noteTitle">
                </div>

                <div class="mb-3">
                    <label class="form-label">Conteúdo</label>
                    <textarea class="form-control" id="noteContent"></textarea>
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button class="btn btn-primary" id="saveNote">Salvar</button>
            </div>

        </div>
    </div>
</div>
<style>
    .gradient-border {
        padding: 2px;
        border-radius: 15px;
        background: linear-gradient(135deg, #6f42c1, #0d6efd);
    }

    .gradient-border>header {
        background: white;
        border-radius: 13px;
    }

    .tool-card {
        border-radius: 10px;
        padding: 10px;
        cursor: pointer;
        transition: 0.2s;
        background: white;
        border: 1px solid #eee;
    }

    .tool-card:hover {
        transform: translateY(-2px);
    }

    .tool-content {
        max-height: 0;
        overflow: hidden;
        transition: 0.3s ease;
    }

    .tool-content.active {
        max-height: 100px;
    }

    .note-title {
        font-weight: 500;
    }
</style>