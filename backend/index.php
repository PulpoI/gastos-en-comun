<?php

// Rutas disponibles
$routes = [
    'register_user' => 'api/register_user.php',
    'register_expense' => 'api/register_expense.php',
    
];

// Obtener la ruta solicitada desde la solicitud
if (isset($_GET['route']) && array_key_exists($_GET['route'], $routes)) {
    $requestedRoute = $_GET['route'];
    $scriptPath = $routes[$requestedRoute];

    // Verificar si el archivo existe antes de incluirlo
    if (file_exists($scriptPath)) {
        require_once $scriptPath;
    } else {
        echo json_encode(['message' => 'Route not found']);
    }
} else {
    echo json_encode(['message' => 'Invalid route']);
}

?>

