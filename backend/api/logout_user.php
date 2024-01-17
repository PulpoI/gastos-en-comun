<?php

require_once 'class/UsersManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  $token = isset($data['token']) ? $data['token'] : null;

  if ($token !== null) {
    $userManager = new UsersManager();
    $response = $userManager->logout($token);
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    echo json_encode($response);
  } else {
    http_response_code(400);
    echo json_encode(['error' => 'Token not provided']);
  }
} else {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid request method']);
}


?>