const sqlite = require('sqlite3')
const db = new sqlite.Database("database/fuskeluring.db")

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS users")
    db.run(`CREATE TABLE "users" (
        "email"	TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL,
        "timestamp"	INTEGER,
        "counter" INTEGER NOT NULL,
        PRIMARY KEY("email")
    )`)
})