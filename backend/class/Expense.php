<?php

require_once 'Database.php';
class Expense {
    private $expenseId;
    private $description;
    private $amount;
    private $date;
    private $payerId;
    private $database;

    public function __construct($description, $amount, $date, $payerId) {
        $this->description = $description;
        $this->amount = $amount;
        $this->date = $date;
        $this->payerId = $payerId;
        $this->database = new Database();
    }

    public function getExpenseId() {
        return $this->expenseId;
    }

    public function createExpense() {
        $query = "INSERT INTO Expenses (description, amount, date, payer_id) VALUES (:description, :amount, :date, :payerId)";
        $params = [
            ':description' => $this->description,
            ':amount' => $this->amount,
            ':date' => $this->date,
            ':payerId' => $this->payerId
        ];
        return $this->database->executeQuery($query, $params);
    }
    public function updateExpense() {
        $query = "UPDATE Expenses SET description = :description, amount = :amount, date = :date, payer_id = :payerId WHERE id = :id";
        $params = [
            ':description' => $this->description,
            ':amount' => $this->amount,
            ':date' => $this->date,
            ':payerId' => $this->payerId,
            ':id' => $this->expenseId
        ];
        return $this->database->executeQuery($query, $params);
    }

    public static function deleteExpense($expenseId) {
        $query = "DELETE FROM Expenses WHERE id = :id";
        $params = [':id' => $expenseId];
        return (new Database())->executeQuery($query, $params);
    }

    public static function getExpenseById($expenseId) {
        $query = "SELECT * FROM Expenses WHERE id = :id";
        $params = [':id' => $expenseId];
        return (new Database())->fetchOne($query, $params);
    }
}

?>
