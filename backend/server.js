import express from 'express';
import config from './db/config.js';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';

// import routes
import authRoutes from './Routes/authRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import chatRoutes from './Routes/chatRoutes.js';

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

// Enable cors for all routes
app.use(cors());


// jwt middleware

app.use((req,res,next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1],
        config.SECRET,(err,decode) =>{
            if (err) req.user= undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user= undefined;
        next();
    }
});

// instantiate the routes here
authRoutes(app);
userRoutes(app);
chatRoutes(app);


app.get('/', (req,res) => {
    res.sendStatus('Hello Welcome to my API👨‍💻');
});

app.listen(config.port, () =>{
    console.log(`Server is listening at port ${config.port}`);
})