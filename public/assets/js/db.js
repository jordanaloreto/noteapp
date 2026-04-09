let db;

// Inicializa o banco de dados IndexedDB
function initDB() {
    const dbName = "note_app";

    // Abre (ou cria) o banco na versão 1
    const request = indexedDB.open(dbName, 1);

    // Tratamento de erro na abertura
    request.onerror = (event) => {
        console.error(`Database error: ${event.target.error?.message}`);
    };

    // Executado quando o banco precisa ser criado ou atualizado
    request.onupgradeneeded = (event) => {
        const database = event.target.result;

        // Cria a "tabela" (object store)
        const objectStore = database.createObjectStore("notes", {
            keyPath: "id",          // chave primária
            autoIncrement: true    // auto incremento do id
        });

        // Criação de índices para possíveis buscas futuras
        objectStore.createIndex("title", "title", { unique: false });
        objectStore.createIndex("content", "content", { unique: false });
    };

    // Executado quando o banco é aberto com sucesso
    request.onsuccess = (event) => {
        db = event.target.result;
        console.log("DB inicializado");

        // Carrega as notas já salvas
        loadNotes();
    };
}

// Adiciona uma nova nota
function addData(title, content) {

    // Garante que o banco foi inicializado
    if (!db) {
        console.log("DB não inicializado");
        return;
    }

    // Inicia transação de escrita
    let transaction = db.transaction(['notes'], 'readwrite');
    let objectStore = transaction.objectStore('notes');

    // Estrutura do objeto a ser salvo
    let newData = { title: title, content: content };

    // Insere no banco
    let request = objectStore.add(newData);

    request.onsuccess = function() {
        console.log('Data added successfully');
        loadNotes(); // Atualiza a listagem
    };

    request.onerror = function() {
        console.log('Error adding data');
    };
}

// Recupera todas as notas
function getAllNotes(callback) {

    // Transação somente leitura
    let transaction = db.transaction(['notes'], 'readonly');
    let objectStore = transaction.objectStore('notes');

    // Busca todos os registros
    let request = objectStore.getAll();

    request.onsuccess = function() {
        // Retorna os dados via callback
        callback(request.result);
    };

    request.onerror = function() {
        console.log('Erro ao buscar notas');
    };
}

// Atualiza uma nota existente
function updateData(id, updatedData) {

    let transaction = db.transaction(['notes'], 'readwrite');
    let objectStore = transaction.objectStore('notes');

    // Busca o registro atual pelo ID
    let getRequest = objectStore.get(id);

    getRequest.onsuccess = function() {

        let existingData = getRequest.result;

        // Valida se a nota existe
        if (!existingData) {
            console.log("Nota não encontrada");
            return;
        }

        // Faz merge dos dados antigos com os novos
        let newData = {
            ...existingData,
            ...updatedData
        };

        // Atualiza o registro no banco
        let updateRequest = objectStore.put(newData);

        updateRequest.onsuccess = function() {
            console.log('Data updated successfully');
            loadNotes();
        };

        updateRequest.onerror = function() {
            console.log('Error updating data');
        };
    };
}

// Remove uma nota pelo ID
function deleteData(id) {
    let transaction = db.transaction(['notes'], 'readwrite');
    let objectStore = transaction.objectStore('notes');

    let request = objectStore.delete(id);

    request.onsuccess = function() {
        console.log('Data deleted successfully');
        loadNotes();
    };

    request.onerror = function() {
        console.log('Error deleting data');
    };
}