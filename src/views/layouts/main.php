<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Evita XSS -->
    <title><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></title>

    <!-- Favicon-->
    <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />

    <!-- Google font-->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@100;900&display=swap" rel="stylesheet" />

    <!-- Bootstrap icons-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css" rel="stylesheet" />

    <!-- CSS -->
    <link href="/assets/css/styles.css" rel="stylesheet" />
</head>

<body class="d-flex flex-column h-100">

<main class="flex-shrink-0">

    <?php require __DIR__ . '/../components/navbar.php'; ?>

    <?php require $viewPath; ?>

</main>

<?php require __DIR__ . '/../components/footer.php'; ?>

<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="/assets/js/db.js"></script>
<script src="/assets/js/scripts.js"></script>

</body>
</html>