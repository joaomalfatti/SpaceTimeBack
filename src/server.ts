import 'dotenv/config'

import fastify from "fastify";
import cors from '@fastify/cors';
import  jwt  from '@fastify/jwt';
import {memoriesRoutes} from './routes/memories'
import { authRoutes } from './routes/auth';

const app = fastify()


app.register(cors, {
  origin: true, //Todas URLs de front-end poderão acessar o nosso back-end
})

app.register(jwt, {
  secret: 'spacetime', //Maneira de diferenciar os tokens de outros jwt outros back-end
})

//Registrar um arquivo de rota separados.
app.register(memoriesRoutes)
app.register(authRoutes)

app.listen({
  port:3333
}).then(() => {
  console.log('🚀 HTTP server running on http://localhost:3333')
});