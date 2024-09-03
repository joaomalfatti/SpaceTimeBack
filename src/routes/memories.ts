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
  app.get('/memories/:id', async(request) => {
    //meu params ele é um objeto, quero que ele traz para mim uma string, utlizando uuid como paramêtro, sabendo que ele é um tipo uuid.
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    //objeto request.params segue a mesma lógica do z.object.
    // se for ele vai trazer ID se não, código para.
    const {id} = paramsSchema.parse(request.params)

    // quero obter a memory do bd e encontrar uma única memória e utilizar um método auxiliar do prisma.
    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      }
    })

    return memory
  })

  //Criar uma nova memória.
  app.post('/memories', async(request) => {
    //Aqui nada mais é que quando for enviar uma memória, ela tem que retornar verdadeiro ou falso.
    const bodySchema = z.object({
      contet: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false)
    })

    //objeto request.params segue a mesma lógica do z.object.
    // se for ele vai as informações bodySchema
    const {contet, coverUrl, isPublic} = bodySchema.parse(request.body)

    //Aqui vai adicionar ao banco de dados
    const memory = await prisma.memory.create({
      data: {
        contet,
        coverUrl,
        isPublic,
        userId: 'f37d5dca-dd19-4887-b526-75279293e646',
      }
    })

    return memory

  })
  //Atualizar uma memória existente.
  app.put('/memories/:id', async() => {
    
  })
  //Deletar uma memória existente.
  app.delete('/memories/:id', async() => {
    
  })
};