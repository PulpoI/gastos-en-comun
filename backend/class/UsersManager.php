<?php

require_once 'Database.php';
require_once 'SessionToken.php';

class UsersManager
{
  private $conn;
  private $token;

  public function __construct()
  {
    $db = new Database();
    $this->conn = $db->getConnection();
    $token = new SessionToken();
    $this->token = $token;
  }

  public function createUser($name, $email, $password)
  {
    try {
      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400); // Bad Request
        return ['error' => 'Formato de email inválido'];
      }
      // verify that the email is not already registered
      $stmt = $this->conn->prepare("SELECT * FROM Users WHERE email = :email");
      $stmt->bindParam(':email', $email);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        http_response_code(400);
        return ['error' => 'Ya existe un usuario con ese email'];
      }
      // register the user
      $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
      $stmt = $this->conn->prepare("INSERT INTO Users (id_user, name, email, password, creator_user_id) VALUES (:id_user, :name, :email, :password, :id_user)");
      $generatedId = uniqid();

      $stmt->bindParam(':id_user', $generatedId);
      $stmt->bindParam(':name', $name);
      $stmt->bindParam(':email', $email);
      $stmt->bindParam(':password', $hashedPassword);

      $stmt->execute();


      $user['email'] = $email;
      $user['password'] = $password;

      http_response_code(200);
      return ['user' => $user, 'message' => 'Usuario registrado correctamente', 'status' => 200];
    } catch (PDOException $e) {
      http_response_code(500);
      return ['error' => 'Fallo el registro', 'status' => 500];
    }
  }

  public function login($email, $password)
  {
    try {
      // check if the user exists
      $stmt = $this->conn->prepare("SELECT * FROM Users WHERE email = :email");
      $stmt->bindParam(':email', $email);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if (password_verify($password, $user['password'])) {
          $stmt->execute();
          $token = $this->token->createToken($user['id_user']);
          http_response_code(200);
          return ['user' => $user, 'status' => 200, 'token' => $token];
        } else {
          http_response_code(401);
          return ['error' => 'Contraseña incorrecta', 'status' => 401];
        }
      } else {
        http_response_code(404);
        return ['error' => 'Usuario no encontrado', 'status' => 404];
      }
    } catch (PDOException $e) {
      return ['error' => 'Falló el inicio de sesión', 'status' => 500];
    }
  }

  public function logout($token)
  {
    try {
      $this->token->deleteToken($token);
      http_response_code(200);
      return ['message' => 'User logged out successfully', 'status' => 200];
    } catch (PDOException $e) {
      http_response_code(500);
      return ['error' => 'Failed to logout user', 'status' => 500];
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
  public function addUnregisteredUserToGroup($creatorUserId, $name)
  {
    try {
      $stmt = $this->conn->prepare("INSERT INTO Users (id_user, name, is_registered, creator_user_id) VALUES (:id_user, :name, false, :creatorUserId)");
      $generatedId = uniqid();
      $stmt->bindParam(':id_user', $generatedId);
      $stmt->bindParam(':name', $name);
      $stmt->bindParam(':creatorUserId', $creatorUserId);
      $stmt->execute();
      http_response_code(201);
      return ['message' => 'Unregistered user created successfully', 'status' => 201];
    } catch (PDOException $e) {
      http_response_code(500);
      return ['error' => 'Failed to create unregistered user', 'status' => 500];
    }
  }



}


?>