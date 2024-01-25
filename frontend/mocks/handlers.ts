/*import { rest, RequestHandler } from 'msw'
import type { Context } from 'vm'

export const handlers: RequestHandler[] = [
  rest.post('http://localhost:8080/login', async (req: Request, res:Response, ctx:Context) => {
    const { username, password } = await req.json()
    if (username === 'julia12345@test.com' && password === 'password1234') {
      return res(ctx.json({ token: 'mocked-tocken' }))
    } else {
      return res(ctx.status(401), ctx.json({ errorMassage: 'Inccorrect email or password' }))
    }
  })
  /* GET-Handler
  rest.get('http://localhost:8080/data', (req, res, ctx) => {
    return res(ctx.json({ data: 'some data' }))
  }),

  // DELETE-Handler
  rest.delete('http://localhost:8080/items/:id', (req, res, ctx) => {
    return res(ctx.status(200))
  }),

  // PATCH-Handler
  rest.patch('http://localhost:8080/items/:id', (req, res, ctx) => {
    return res(ctx.json({ updated: true }))
  }),

  // PUT (Update)-Handler
  rest.put('http://localhost:8080/items/:id', (req, res, ctx) => {
    // Update-Logik
    return res(ctx.json({ updated: true }))
  })*/
