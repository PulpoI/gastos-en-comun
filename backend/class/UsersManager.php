<?php

require_once 'Database.php';

class UsersManager
{
  private $conn;

  public function __construct()
  {
    $db = new Database();
    $this->conn = $db->getConnection();
  }

  public function createUser($name, $email, $password)
  {
    try {
      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400); // Bad Request
        return ['error' => 'Invalid email format'];

      }
      // verify that the email is not already registered
      $stmt = $this->conn->prepare("SELECT * FROM Users WHERE email = :email");
      $stmt->bindParam(':email', $email);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        http_response_code(400);
        return ['error' => 'User with this email already exists'];
      }
      // register the user
      $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
      $stmt = $this->conn->prepare("INSERT INTO Users (name, email, password) VALUES (:name, :email, :password)");
      $stmt->bindParam(':name', $name);
      $stmt->bindParam(':email', $email);
      $stmt->bindParam(':password', $hashedPassword);
      $stmt->execute();
      http_response_code(200);
      return ['message' => 'User registered successfully', 'status' => 200];
    } catch (PDOException $e) {
      http_response_code(500);
      return ['error' => 'Failed to register user', 'status' => 500];
    }
  }

  public function getUserByEmail($email)
  {
    try {
      // check if the user exists
      $stmt = $this->conn->prepare("SELECT * FROM Users WHERE email = :email");
      $stmt->bindParam(':email', $email);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        http_response_code(200);
        return ['user' => $user, 'status' => 200];
      } else {
        http_response_code(404);
        return ['error' => 'User not found', 'status' => 404];
      }
    } catch (PDOException $e) {
      return ['error' => 'Failed to fetch user', 'status' => 500];
    }
  }



}


?>