import { jsonserver } from 'json-server'
const server = jsonserver.create()
const router = jsonserver.router('db.json routes.json')
const middlewares = jsonserver.defaults({
  static: './build',
})

const port = 5000
server.use(middlewares)
server.use(
  jsonserver.rewriter({
    '/api/*': '/$1',
  })
)
server.use(router)
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})
