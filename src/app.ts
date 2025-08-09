// "dev": "npm run nodemon"

import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import './config/passportConfig.js';
import methodOverride from 'method-override';

import path from 'path';
import { fileURLToPath } from 'url';
import { configDotenv } from 'dotenv';

import authRouter from './auth/authRouter.js';
import folderRouter from './folders/folderRouter.js';
import fileRouter from './files/fileRouter.js';

// import { PrismaClient } from '@prisma/client';
import prisma from './database/prismaClient.js';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

configDotenv();

const PORT = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname)));

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, //ms
    },
    secret: 'arsenal is the best',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', authRouter);
app.use('/folders', folderRouter);
app.use('/file', fileRouter);

app.listen(PORT, () => {
  console.log(`express app listening on PORT: ${PORT}`);
});
