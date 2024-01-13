<?php

require_once 'class/ExpensesManager.php';

// Obtener los datos de la solicitud PUT
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'PUT' && $data !== null) {
  $expenseId = $data['expenseId'] ?? null;
  $description = $data['description'] ?? null;
  $amount = $data['amount'] ?? null;
  $userId = $data['userId'] ?? null;
  $groupId = $data['groupId'] ?? null;

  if ($expenseId !== null && $description !== null && $amount !== null && $userId !== null && $groupId !== null) {
    $expensesManager = new ExpensesManager();
    $response = $expensesManager->updateCommonExpense($expenseId, $description, $amount, $userId, $groupId);

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