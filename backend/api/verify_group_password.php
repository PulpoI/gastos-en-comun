<?php

require_once 'class/GroupsManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  $groupId = $data['groupId'];
  $enteredPassword = $data['enteredPassword'];

  $groupsManager = new GroupsManager();
  $response = $groupsManager->verifyGroupPassword($groupId, $enteredPassword);

  echo json_encode($response);
} else {
  http_response_code(400); // Bad Request
  echo json_encode(['error' => 'Invalid request method', 'status' => 400]);
}

?>