<?php

// =============================
// 🔐 HEADERS DE SEGURANÇA
// =============================

// Impede que o site seja carregado dentro de <iframe>
// Protege contra Clickjacking (quando um atacante tenta enganar o usuário com uma interface invisível)
header("X-Frame-Options: DENY");

// Impede o navegador de tentar "adivinhar" o tipo de arquivo (MIME sniffing)
// Evita execução de arquivos maliciosos disfarçados (ex: script com extensão .jpg)
header("X-Content-Type-Options: nosniff");

// Ativa uma proteção básica contra ataques de XSS no navegador
// XSS (Cross-Site Scripting) permite a injeção de scripts maliciosos (geralmente JavaScript)
header("X-XSS-Protection: 1; mode=block");


// =============================
// 🔐 CONTENT SECURITY POLICY (CSP)
// =============================

$csp = "default-src 'self'; " 
// Regra padrão: só permite carregar recursos do próprio domínio

     . "img-src 'self' data:; "  
// Permite imagens locais e imagens embutidas em base64 (data URI)

     . "script-src 'self' https://cdn.jsdelivr.net; " 
// Permite execução de scripts apenas do próprio site e da CDN do Bootstrap

     . "style-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net 'unsafe-inline'; " 
// Permite CSS local, Google Fonts e Bootstrap
// 'unsafe-inline' permite estilos inline (necessário em alguns casos, mas reduz a segurança contra XSS)

     . "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net; " 
// Permite carregamento de fontes externas confiáveis

     . "connect-src 'self' https://cdn.jsdelivr.net;"; 
// Controla requisições feitas via fetch, AJAX ou APIs externas


// Aplica a política de segurança no navegador
// O navegador bloqueará automaticamente qualquer recurso fora dessas regras
header("Content-Security-Policy: $csp");


// =============================
// 🚀 INICIALIZAÇÃO DA APLICAÇÃO
// =============================

// Carrega o sistema de rotas
// Centraliza o controle da aplicação (Front Controller)
// Garante que todas as requisições passem por validação antes de acessar qualquer página
require __DIR__ . '/../routes/web.php';