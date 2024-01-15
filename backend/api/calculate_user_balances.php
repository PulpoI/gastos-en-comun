<?php

require_once 'class/GroupsManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if (isset($_GET['group_id'])) {
    $groupId = $_GET['group_id'];

    $groupsManager = new GroupsManager();
    $response = $groupsManager->calculateUserBalances($groupId);

    echo json_encode($response);
  } else {
    echo json_encode(['error' => 'Group ID is required', 'status' => 400]);
  }
} else {
  echo json_encode(['error' => 'Invalid request method', 'status' => 405]);
}
?>