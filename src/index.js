import { NestFactory } from '@nestjs/core';
import {ExpressAdapter} from '@nestjs/platform-express'
import *as functions from 'firebase-functions'
import { AppModule } from './app.module';

import * as express from 'express'

const server = express()

export const createNestServer = async (expressInstance)=>{

const app = await NestFactory.create(
   AppModule,
   new ExpressAdapter(expressInstance),
)
return app.init();
}

createNestServer(server)
.then( v=>console.log("nest is ready", v))
.catch( err=> console.console.error("nest broken", err))

export const api = functions.https.onRequest(server)