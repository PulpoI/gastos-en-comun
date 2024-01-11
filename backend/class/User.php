<?php

require_once 'Database.php';
class User {
    private $database;

    private $userId;
    private $name;
    private $email;
    private $password;

    public function __construct($name, $email, $password) {
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
        $this->database = new Database();
    }

    public function getUserId() {
        return $this->userId;
    }

    public function createUser() {
        $query = "INSERT INTO Users (name, email, password) VALUES (:name, :email, :password)";
        $params = [
            ':name' => $this->name,
            ':email' => $this->email,
            ':password' => $this->password
        ];
        return $this->database->executeQuery($query, $params);
    }

    public function updateUser() {
        $query = "UPDATE Users SET name = :name, email = :email, password = :password WHERE id = :id";
        $params = [
            ':name' => $this->name,
            ':email' => $this->email,
            ':password' => $this->password,
            ':id' => $this->userId
        ];
        return $this->database->executeQuery($query, $params);
    }

    public static function deleteUser($userId) {
        $query = "DELETE FROM Users WHERE id = :id";
        $params = [':id' => $userId];
        return (new Database())->executeQuery($query, $params);
    }

    public static function getUserById($userId) {
        $query = "SELECT * FROM Users WHERE id = :id";
        $params = [':id' => $userId];
        return (new Database())->fetchOne($query, $params);
    }
}

?>
