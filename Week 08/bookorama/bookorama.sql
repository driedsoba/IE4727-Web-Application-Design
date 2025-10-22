USE
    myuser;
CREATE TABLE customers(
    customerid INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    NAME CHAR(50) NOT NULL,
    address CHAR(100) NOT NULL,
    city CHAR(30) NOT NULL
); CREATE TABLE orders(
    orderid INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customerid INT UNSIGNED NOT NULL,
    amount FLOAT(6, 2),
    DATE DATE NOT NULL
); CREATE TABLE books(
    isbn CHAR(13) NOT NULL PRIMARY KEY,
    author CHAR(50),
    title CHAR(100),
    price FLOAT(6, 2)
); CREATE TABLE order_items(
    orderid INT UNSIGNED NOT NULL,
    isbn CHAR(13) NOT NULL,
    quantity TINYINT UNSIGNED,
    PRIMARY KEY(orderid, isbn)
); CREATE TABLE book_reviews(
    isbn CHAR(13) NOT NULL PRIMARY KEY,
    review TEXT
);