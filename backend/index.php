<?php

// Configuración global de CORS
header('Access-Control-Allow-Origin: *'); // Permite acceso desde cualquier origen
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

$routes = include 'routes.php';

if (isset($_GET['route']) && array_key_exists($_GET['route'], $routes)) {
    $requestedRoute = $_GET['route'];
    $scriptPath = $routes[$requestedRoute];

    if (file_exists($scriptPath)) {
        require_once $scriptPath;
    } else {
        header('Content-Type: application/json');
        echo json_encode(['message' => 'Route not found']);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(['message' => 'Invalid route']);
}
