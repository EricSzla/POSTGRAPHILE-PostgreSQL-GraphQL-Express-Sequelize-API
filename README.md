# POSTGRAPHILE-PostgreSQL-GraphQL-Express-Sequelize-API

## Postgraphile
### Set-Up

1. Create new Database in Postgres

```CREATE DATABASE dellstore2;```

2. Connect to the created database

```\connect dellstore2;```

3. Create new schema called ```postgraphile```

```CREATE SCHEMA postgraphile;```

4. Load schema definitions from dellstore2.sql

```pg_restore --no-owner --dbname postgraphile dellstore2.sql;```

    **OR** specify hostname, database and username

```psql -h hostname -d databasename -U username -f file.sql```

    e.g. ```psql -h localhost -d dellstore2 -U postgres -f dellstore2.sql```
    
5. Start Postgraphile in watch mode

```postgraphile --watch --schema postgraphile -c "postgres://username:password@localhost:5432/dellstore2"```

6. Open Postgraphile interface:

```http://localhost:5000/graphiql```
