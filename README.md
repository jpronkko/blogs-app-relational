# blogs-app-relational

This application uses dotenv, therefore .env file needs to have definitions for
DATABASE_URL, PORT and SECRET. Note that the .env is not included in the git repository!

The DATABASE_URL needs to point to a running postgres SQL server. An example for connecting to postgres at local host:

DATABASE_URL=postgres://admin:example@localhost:5432/testidb

The port number is the port the server is listening to, for example: 
PORT=3001

The secret is used by token processing, for example:
SECRET=VerySecretSecret


