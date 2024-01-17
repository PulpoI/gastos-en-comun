<?php

require_once 'class/SessionToken.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  $userId = isset($data['userId']) ? $data['userId'] : null;
  $token = isset($data['token']) ? $data['token'] : null;

  if ($token !== null) {
    $sessionToken = new SessionToken();
    $response = $sessionToken->verifyToken($token, $userId);
    echo json_encode($response);
  } else {
    http_response_code(400); // Bad request
    echo json_encode(['error' => 'Token not provided']);
  }
} else {
  http_response_code(405); // Method not allowed
  echo json_encode(['error' => 'Invalid request method']);

}

?>