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

  // Unregistered users
  public function addUnregisteredUserToGroup($creatorUserId, $name, $groupId)
  {
    try {
      // Verificar que el creador pertenece al grupo
      if (!$this->userBelongsToGroup($creatorUserId, $groupId)) {
        http_response_code(403);
        return ['error' => 'User does not have permission to add unregistered user to the group', 'status' => 403];
      }

      $stmt = $this->conn->prepare("INSERT INTO UnregisteredUsers (name, creator_user_id, group_id) VALUES (:name, :creatorUserId, :groupId)");
      $stmt->bindParam(':name', $name);
      $stmt->bindParam(':creatorUserId', $creatorUserId);
      $stmt->bindParam(':groupId', $groupId);
      $stmt->execute();
      http_response_code(201);
      return ['message' => 'Unregistered user added to the group successfully', 'status' => 201];
    } catch (PDOException $e) {
      http_response_code(500);
      return ['error' => 'Failed to add unregistered user to the group', 'status' => 500];
    }
  }

  private function userBelongsToGroup($userId, $groupId)
  {
    $stmt = $this->conn->prepare("SELECT COUNT(*) as count FROM UserGroups WHERE user_id = :userId AND group_id = :groupId");
    $stmt->bindParam(':userId', $userId);
    $stmt->bindParam(':groupId', $groupId);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    return $result['count'] > 0;
  }


}


?>