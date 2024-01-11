<?php

require_once 'class/Database.php';
require_once 'class/Expense.php';

class ExpensesManager {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->getConnection();
    }

    public function registerExpense($description, $amount, $date, $payerId) {
        $stmt = $this->conn->prepare("INSERT INTO Expenses (description, amount, date, payer_id) VALUES (:description, :amount, :date, :payerId)");
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':amount', $amount);
        $stmt->bindParam(':date', $date);
        $stmt->bindParam(':payerId', $payerId);

        return $stmt->execute();
    }
}

?>
