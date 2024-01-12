<?php

$routes = include 'routes.php';

if (isset($_GET['route']) && array_key_exists($_GET['route'], $routes)) {
    $requestedRoute = $_GET['route'];
    $scriptPath = $routes[$requestedRoute];

    if (file_exists($scriptPath)) {
        require_once $scriptPath;
    } else {
        echo json_encode(['message' => 'Route not found']);
    }
} else {
    echo json_encode(['message' => 'Invalid route']);
}

?>