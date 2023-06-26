import express, { Application } from 'express';
import cors from 'cors';

import userRoutes from '../routes/user';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '9400';

        //! Initials Methods
        // invoke database
        this.dbConnection();
        // INVOKE middlewares
        this.middlewares();

        // define my routes
        this.routes();
    }

    // Todo: connect database
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online')
        } catch ( error ) {
            throw new Error();
        }
    }

    // middlewares run before our routes or functions
    middlewares() {
        // CORS
        this.app.use( cors() );

        // PARSER - Body reading
        this.app.use( express.json() );

        // PUBLIC FOLDER - STATICS
        this.app.use( express.static('public') );
    }

    routes() {

        this.app.use( this.apiPaths.users, userRoutes );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running on ' + this.port );
        })
    }
}

export default Server;