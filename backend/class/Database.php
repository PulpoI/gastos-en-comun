<?php

require_once 'config/config.php';

class Database
{
  private $host = "localhost";
  private $username = "c2790080_gastosc";
  private $password = "tuGUbupe57";
  private $dbname = "c2790080_gastosc";

  public function getConnection()
  {
    $conn = new PDO("mysql:host=$this->host;dbname=$this->dbname", $this->username, $this->password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $conn;
  }
}
