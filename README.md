# Machinomy Authority

## Get started

1. Create .env file with settings (see [example.env](https://github.com/machinomy/authority/blob/master/example.env)).
2. Apply DB-migrations via `yarn migrate` (database file will be created automatically).
3. Run Authority via `yarn start` or `yarn debug` (if you want to see debug information). 

## Settings file (.env file)

Default .env file (example.env):

```
DATABASE_URL=sqlite://authorityDB.sqlite3
PORT=5500
```

DATABASE_URL - connection URL for the database (only SQLite3). sqlite:// prefix **is mandatory**.

PORT - listening port for Authority.

