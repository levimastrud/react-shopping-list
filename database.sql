-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data

-- Database called "shopping-list"

CREATE TABLE list (
    "id" serial primary key,
    "item" varchar(150) NOT NULL,
    "quantity" DECIMAL (5,2) NOT NULL,
    "unit" varchar(20),
    "is-purchased" BOOLEAN DEFAULT FALSE
);

INSERT INTO list ("item", "quantity", "unit") VALUES ('eggs', 12, 'dozen'), ('milk', 1.3, 'gallon');