<?php

require_once 'class/ExpensesManager.php';


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && $data !== null) {
  http_response_code(200);
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);
  $groupId = $data['groupId'];

  $expensesManager = new ExpensesManager();
  $response = $expensesManager->generateHistoryExpenses($groupId);
  echo json_encode($response);
} else {
  echo json_encode(['error' => 'Invalid request method']);
}


?>