<?php

require_once 'class/GroupsManager.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && $data !== null) {
  $userId = $data['userId'] ?? null;
  $groupId = $data['groupId'] ?? null;
  $creatorUserId = $data['creatorUserId'] ?? null;


  if ($creatorUserId !== null && $userId !== null && $groupId !== null) {
    $groupsManager = new GroupsManager();
    $response = $groupsManager->deleteUserToGroup($groupId, $userId, $creatorUserId);


    echo json_encode($response);
  } else {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'Missing or invalid parameters in the request', 'status' => 400]);
  }
} else {
  http_response_code(400); // Bad Request
  echo json_encode(['error' => 'Invalid request method or missing data in the request', 'status' => 400]);
}


?>