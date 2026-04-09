# 📝 Note App com IndexedDB

Aplicação web simples para criação, edição e exclusão de notas, com persistência local utilizando IndexedDB.

O projeto foi desenvolvido com o objetivo de estudar armazenamento no lado do cliente (client-side) e entender na prática como funciona o IndexedDB, além de aplicar boas práticas de organização e segurança no frontend.

---

## 🚀 Tecnologias utilizadas

* PHP 8.4 (estrutura e renderização)
* JavaScript (lógica da aplicação)
* IndexedDB (persistência de dados no navegador)
* Bootstrap 5 (interface)
* Laravel Herd (ambiente local)

---

## 🎯 Objetivo do projeto

O foco principal deste projeto é explorar o uso do IndexedDB como alternativa a bancos tradicionais, entendendo:

* Como criar e versionar um banco local
* Como estruturar Object Stores
* Operações CRUD assíncronas no browser
* Separação entre camada de dados e interface

---

## 💾 Por que IndexedDB?

Diferente do `localStorage`, o IndexedDB permite:

* Armazenamento estruturado (objetos)
* Grande volume de dados
* Indexação (busca eficiente)
* Operações assíncronas
* Transações (controle de leitura/escrita)

Isso o torna mais próximo de um banco de dados real dentro do navegador.

---

## 🧠 Arquitetura da aplicação

A aplicação foi dividida em duas camadas principais:

### 🔹 Camada de dados (db.js)

Responsável por toda interação com o IndexedDB:

* Inicialização do banco
* Criação da Object Store (`notes`)
* Operações CRUD:

  * `addData`
  * `getAllNotes`
  * `updateData`
  * `deleteData`

Essa separação evita acoplamento com a interface e facilita manutenção.

---

### 🔹 Camada de interface (scripts.js)

Responsável por:

* Manipulação do DOM
* Controle do modal (criar/editar nota)
* Renderização dinâmica das notas
* Gerenciamento de estado (`editingNoteId`)

---

## ⚙️ Funcionamento do IndexedDB no projeto

### 📌 Inicialização

O banco é criado com versionamento:

```js
indexedDB.open("note_app", 1);
```

Caso a versão seja alterada, o `onupgradeneeded` é disparado para atualizar a estrutura.

---

### 📌 Estrutura do banco

* Object Store: `notes`
* Campos:

  * `id` (autoIncrement)
  * `title`
  * `content`

---

### 📌 Operações

Todas as operações utilizam transações:

```js
db.transaction(['notes'], 'readwrite');
```

Isso garante consistência e controle sobre leitura e escrita.

---

### 📌 Assincronismo

O IndexedDB funciona de forma assíncrona por padrão.

Mesmo sendo local, isso evita bloqueio da UI e segue o modelo do browser para operações de I/O.

---

## 🔐 Boas práticas aplicadas

Embora segurança não seja o foco principal, algumas medidas foram adotadas:

* Uso de `textContent` ao invés de `innerHTML` (prevenção de XSS)
* Sanitização básica de inputs
* Validação de dados antes de persistir
* Escape de saída no PHP com `htmlspecialchars`
* Separação de responsabilidades (dados vs UI)

---

## 📸 Funcionalidades

* ✅ Criar nota
* ✅ Editar nota
* ✅ Excluir nota
* ✅ Listagem dinâmica
* ✅ Persistência local (dados mantidos no navegador)

---

## ⚠️ Limitações

* Não possui autenticação (dados são locais)
* Dados não são sincronizados com backend
* Armazenamento limitado ao navegador do usuário

---

## 📚 Aprendizados

Durante o desenvolvimento, foram consolidados conhecimentos sobre:

* Funcionamento do IndexedDB
* Programação assíncrona no JavaScript
* Manipulação dinâmica do DOM
* Organização de código em camadas
* Boas práticas básicas de segurança no frontend

---

## 💡 Possíveis melhorias

* Sincronização com backend (API)
* Sistema de usuários
* Busca e filtros por notas
* Tags/categorias
* Exportação de notas
* Criptografia local dos dados

---

## 👩‍💻 Autora

Desenvolvido por Jordana Loreto
Desenvolvedora Fullstack em transição para Segurança da Informação

---
