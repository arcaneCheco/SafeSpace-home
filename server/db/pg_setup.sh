#!/usr/bin/env sh
echo "\033[0;32mSetting Up PostgreSQL Database. This may take a few minutes...\033[0m"
echo "\033[1;33m - Removing any existing safespace database"
dropdb safespace
echo "\033[1;33m - Removing any existing safespace_user user\033[0m"
dropuser safespace_user

echo "\033[1;33m - Creating safespace database\033[0m"
createdb safespace

echo "\033[1;33m - Ensuring plpgsql extension is installed\033[0m"
psql safespace -c "CREATE EXTENSION IF NOT EXISTS plpgsql" 

echo "\033[1;33m - Setting up schema from ./safespace.pg.sql\033[0m"
psql safespace < ./db/safespace.pg.sql -q 
echo "\033[1;33m - Importing data from ./safespace_data.sql\033[0m"
psql safespace < ./db/safespace_data.sql -q 

echo "\033[1;33m - Creating user: safespace_user\033[0m"
psql template1 -c "create user safespace_user;"
psql template1 -c "alter user safespace_user password 'sm@llMoon47';"
echo "\033[1;33m - Assigning ownership of safespace database to safespace_user\033[0m"
psql template1 -c "grant all on DATABASE safespace to safespace_user;"
psql safespace -c "GRANT ALL on ALL tables IN SCHEMA public to safespace_user"
psql safespace -c "alter table \"customerwaitinglist\" owner to safespace_user"
