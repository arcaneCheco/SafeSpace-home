CREATE TABLE CustomerWaitingList (
    "id" serial NOT NULL,
    email varchar(8000) NOT NULL UNIQUE,
    PRIMARY KEY ("id")
);