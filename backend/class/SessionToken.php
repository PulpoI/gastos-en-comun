<?php

require_once 'Database.php';
class SessionToken
{
  private $conn;

  public function __construct()
  {
    $db = new Database();
    $this->conn = $db->getConnection();
  }

  // Create a new token
  public function createToken($userId)
  {
    if ($userId === null) {
      http_response_code(400); // Bad request
      return ['error' => 'Missing required data', 'status' => 400];
    }
    $expirationTime = date('Y-m-d H:i:s', strtotime('+1 year')); // Calculate expiration time
    $uniqueId = uniqid(); // Generate a unique ID
    $token = bin2hex(random_bytes(32)); // Generate a random token
    // Insert new token
    $stmt = $this->conn->prepare("INSERT INTO SessionTokens (id_token, user_id, token, expiration_time) VALUES (:idToken, :userId, :token, :expirationTime)");
    $stmt->bindParam(':idToken', $uniqueId);
    $stmt->bindParam(':userId', $userId);
    $stmt->bindParam(':token', $token);
    $stmt->bindParam(':expirationTime', $expirationTime);
    $stmt->execute();
    http_response_code(201); // Created
    return $token;
  }

  // Eliminar un token existente
  public function deleteToken($token)
  {
    try {
      $stmt = $this->conn->prepare("DELETE FROM SessionTokens WHERE token = :token");
      $stmt->bindParam(':token', $token);
      $stmt->execute();

      if ($stmt->rowCount() === 0) {
        http_response_code(404); // Not found
        return ['error' => 'Token not found', 'status' => 404];
      } else {
        http_response_code(200); // OK
        return ['message' => 'Token deleted successfully', 'status' => 200];
      }
    } catch (PDOException $e) {
      http_response_code(500); // Internal Server Error
      return ['error' => 'Failed to delete token', 'status' => 500];
    }
  }

  // Verificar si un token es válido y obtener el ID de usuario asociado
  public function verifyToken($token, $userId)
  {
    try {
      $stmt = $this->conn->prepare("SELECT user_id, expiration_time FROM SessionTokens WHERE token = :token");
      $stmt->bindParam(':token', $token);
      $stmt->execute();

      if ($stmt->rowCount() === 0) {
        http_response_code(404); // Not found
        return ['error' => 'Token not found', 'status' => 404];
      } else {
        $tokenData = $stmt->fetch(PDO::FETCH_ASSOC);
        $expirationTime = $tokenData['expiration_time'];
        $currentTime = date('Y-m-d H:i:s');
        if ($currentTime > $expirationTime) {
          http_response_code(401); // Unauthorized
          return ['error' => 'Token expired', 'status' => 401];
        } else {
          if ($userId !== null) {
            if ($userId !== $tokenData['user_id']) {
              http_response_code(403); // Forbidden
              return ['error' => 'User does not have permission to access this resource', 'status' => 403];
            }
          }
          http_response_code(200); // OK
          return ['message' => 'Token is valid', 'status' => 200];
        }
      }
    } catch (PDOException $e) {
      http_response_code(500); // Internal Server Error
      return ['error' => 'Failed to verify token', 'status' => 500];
    }
  }
}
?>