<?php

require_once 'class/ExpensesManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $description = $data['description'];
    $amount = $data['amount'];
    $date = $data['date'];
    $payerId = $data['payerId'];

    $expensesManager = new ExpensesManager();
    $result = $expensesManager->registerExpense($description, $amount, $date, $payerId);

    if ($result) {
        echo json_encode(['message' => 'Expense registered successfully']);
    } else {
        echo json_encode(['message' => 'Failed to register expense']);
    }
} else {
    echo json_encode(['message' => 'Invalid request method']);
}

?>
