## Flow of HTTP request
Browser -> Web Server -> PHP Engine -> MySQL Server
then back the same way.

## Relational Databases Concepts
- Tables
- Columns
  - each column as a unique name and a data type, they are also called fields or attributes.
- Rows
  - each row represents a single record in the table, also called tuples or records.
- Values
  - the actual data stored in the table.
- Primary Key
  - identifying column in a table for each row in a table.
  - Primary key when appeared in another table is called Foreign Key.


## Database Schema
- A blueprint or architecture of how the database is structured.
- Shows tables, columns, primary keys, foreign keys, and relationships between tables.
- Foreign Key represents relationships between tables.
  - One-to-One (1:1)
  - One-to-Many (1:N)
  - Many-to-Many (M:N)


## Design Considerations
- Avoid storing redundant data.
- Use **Atomic** column values, each attibute should contain only a single value.
- Avoid designs with many empty values.


## SQL (Structured Query Language)
- SQL statements not case sensitive.
- Data types in MySQL
  - AUTO-INCREMENT
  - NOT NULL
  - UNSIGNED
- CRUD Operations
  - Create: `INSERT INTO`
  - Read: `SELECT`
  - Update: `UPDATE`
  - Delete: `DELETE`
- Common SQL commands
```sql
-- Create a new database
CREATE DATABASE database_name;

-- Create a new table
CREATE TABLE table_name (
    column1 datatype constraints,
    column2 datatype constraints,
    ...
    PRIMARY KEY (column)
);

-- Insert data into a table
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);

-- Select data from a table
SELECT column1, column2, ... FROM table_name;

-- Update data in a table
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;

-- Delete data from a table
DELETE FROM table_name
WHERE condition;

-- Drop Database
DROP DATABASE database_name;

-- Drop Table
DROP TABLE table_name;

-- Alter Table (Add Column)
ALTER TABLE table_name
ADD column_name datatype constraints;
-- Alter Table (Modify Column)
MODIFY COLUMN column_name new_datatype;
-- Alter Table (Drop Column)
DROP COLUMN column_name;

-- Alter Database (Rename)
ALTER DATABASE old_database_name
RENAME TO new_database_name;
```