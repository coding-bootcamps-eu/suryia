import { rest } from 'msw'

export const handlers = [
  rest.post('http://localhost:8080/login', (req, res, ctx) => {
    const { username, password } = req.body as { username: string; password: string }
    if (username === 'julia12345@test.com' && password === 'password1234') {
      return res(ctx.json({ token: 'mocked-tocken' }))
    } else {
      return res(ctx.status(401), ctx.json({ errorMassage: 'Inccorrect email or password' }))
    }
  })
]
