import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import {z} from 'zod';

export async function memoriesRoutes(app: FastifyInstance) {

  //Todas as memórias.
  app.get('/memories', async() => {
    const memories = await prisma.memory.findMany({
      orderBy:{
        createdAt: 'asc',
      },
    })

    //Vai retornar memórias curtas e então será utilizado um map.
    return memories.map((memory)=>{
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.contet.substring(0, 115).concat('...'),
      }
    })
  })

  //Detalhes de uma memória em específica.
  app.get('/memories/:id', async() => {
    
  })
  //Criar uma nova memória.
  app.post('/memories', async() => {

  })
  //Atualizar uma memória existente.
  app.put('/memories/:id', async() => {
    
  })
  //Deletar uma memória existente.
  app.delete('/memories/:id', async() => {
    
  })
};