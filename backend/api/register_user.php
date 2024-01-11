<?php

require_once 'class/UsersManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $name = $data['name'];
    $email = $data['email'];
    $password = $data['password'];

    $userManager = new UsersManager();
    $result = $userManager->registerUser($name, $email, $password);

    if ($result) {
        echo json_encode(['message' => 'User registered successfully']);
    } else {
        echo json_encode(['message' => 'Failed to register user']);
    }
} else {
    echo json_encode(['message' => 'Invalid request method']);
}

?>
