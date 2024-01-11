CREATE TABLE Users (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Expenses (
    id_expense INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    id_payer INT,
    FOREIGN KEY (id_payer) REFERENCES Users(id_user)
);

CREATE TABLE Users_Expenses (
    id_relation INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    id_expense INT,
    FOREIGN KEY (id_user) REFERENCES Users(id_user),
    FOREIGN KEY (id_expense) REFERENCES Expenses(id_expense)
);


