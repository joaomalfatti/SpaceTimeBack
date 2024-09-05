import type { FastifyInstance } from "fastify";
import axios from 'axios';
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function authRoutes(app:FastifyInstance){
  //Para cadastrar um usuário para ele me trazer o CODE .
  //Tudo isso para informação não vim null
  app.post('/register', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })
    //Com esse code, consigo autenticar o usuário
    const { code } = bodySchema.parse(request.body)
    // vai trazer o acesstoken agora.
    const accessTokenResponse = await axios.post(
      //o link para onde trazer o access token
      'https://github.com/login/oauth/access_token',
      // o corpo da requisição é null
      null,
      //configuração da requisição
      {
        params:{
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers:{
          Accept: 'application/json',
        },
      },
    )
    //resposta da requisição
    const {access_token} = accessTokenResponse.data
    //Buscar o access token
    const userResponse = await axios.get(
      'https://api.github.com/user',
      {
        headers:{
          Authorization: `Bearer ${access_token}`,
        },
      },
    )
    //Validação da resposta da api
    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })

    //Verificar se o user já existe
    const userInfo = userSchema.parse(userResponse.data)

    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id,
      }
    })

    if(!user) {
      user = await prisma.user.create({
        data: {
          githubId: userInfo.id,
          login: userInfo.login,
          name: userInfo.name,
          avatarUrl: userInfo.avatar_url,
        },
      })
    }

    //resposta do github
    return {
      user,
    }
  })
}