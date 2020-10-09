
const express = require('express')

const projectRouter = require('./routers/projectRouter')
const actionsRouter = require('./routers/actionsRouter')

const server = express()
const port = process.env.PORT || 5000


server.use(express.json())
server.use(projectRouter)
server.use(actionsRouter)



server.get('/', (req, res) => {
    res.json({
        message: `LETS DO IT ${process.env.NAME}. Then its time for some ${process.env.FAV_FOOD}`,
	})
})

server.listen(port, ()=> {
    console.log(`Server running at http://localhost:${port}`)
})