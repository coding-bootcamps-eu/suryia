import { rest, RequestHandler } from 'msw'

export const handlers: RequestHandler[] = [
  rest.post('http://localhost:8080/login', async (req, res, ctx) => {
    const { username, password } = await req.json()
    if (username === 'julia12345@test.com' && password === 'password1234') {
      return res(ctx.json({ token: 'mocked-tocken' }))
    } else {
      return res(ctx.status(401), ctx.json({ errorMassage: 'Inccorrect email or password' }))
    }
  })
]
