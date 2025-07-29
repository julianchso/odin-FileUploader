import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
// import passportConfig from './config/passportConfig';
import './config/passportConfig';

import path from 'path';
import { configDotenv } from 'dotenv';

import authRouter from './routes/authRouter';

// import { PrismaClient } from '@prisma/client';
import prisma from './database/prismaClient';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

configDotenv();

const PORT = process.env.PORT || 3000;
const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname + '../public')));

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, //ms
    },
    secret: 'arsenal is the best',
    resave: true,
    saveUninitialized: true,
    // store: new PrismaSessionStore(new PrismaClient(), {
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);

app.listen(PORT, () => {
  console.log(`express app listening on PORT: ${PORT}`);
});
