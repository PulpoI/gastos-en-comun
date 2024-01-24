<?php

require_once 'class/GroupsManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  $userId = $data['userId'];
  $groupId = $data['groupId'];

  $groupManager = new GroupsManager();
  $response = $groupManager->checkUserInGroup($userId, $groupId);

  echo json_encode($response);
} else {
  http_response_code(405); // Method not allowed
  echo json_encode(['error' => 'Invalid request method']);
}

?>