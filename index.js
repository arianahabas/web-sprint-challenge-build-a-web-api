
const express = require('express')
// const projects = require('./data/helpers/projectModel')
const projectRouter = require('./projectRouter')
const actionsRouter = require('./actionsRouter')

const server = express()
const port = 4001


server.use(express.json())
server.use(projectRouter)
server.use(actionsRouter)



server.get('/', (req, res) => {
    res.json({
		message: "LETS DO IT",
	})
})

server.listen(port, ()=> {
    console.log(`Server running at http://localhost:${port}`)
})