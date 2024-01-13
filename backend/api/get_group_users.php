<?php

require_once 'class/GroupsManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $groupId = $_GET['groupId'];

  $groupsManager = new GroupsManager();
  $response = $groupsManager->getGroupUsers($groupId);

  echo json_encode($response);
} else {
  echo json_encode(['error' => 'Invalid request method']);
}


?>