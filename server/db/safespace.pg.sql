CREATE TABLE CustomerWaitingList (
    id serial PRIMARY KEY,
    email varchar(8000) NOT NULL UNIQUE
);