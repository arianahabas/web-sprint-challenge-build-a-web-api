const express = require('express');
const projects = require('./data/helpers/projectModel')

const router = express.Router();

router.get('/projects', (req,res) => {
    projects.get()
    .then((p)=>{
        res.status(200).json(p)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({
          message: "Error retrieving the users",
         })
    })
})
//DONE --- GETS all projects

router.get('/projects/:id',validateProjectId(), (req,res)=>{
  res.status(200).json(req.project)
})
//DONE --- GETS single project by ID

router.get('/projects/:id/actions', (req,res)=>{

})
//GETS all actions for a specific project

router.post('/projects', (req,res)=>{

})
//POST creates a new project

router.put('/projects/:id', (req,res)=>{

})
//UPDATES specific project by id

router.delete('/projects/:id', (req,res)=>{

})
//DELETES single project by id

//custom middleware
function validateProjectId(){
    return(req, res, next) => {
        projects.get(req.params.id)
        .then((project)=>{
            if(project) {
                req.project = project
                next()
            } else {
                res.status(400).json({
                    message: "invalid project id"
                })
            }
        })
        .catch((next)=>{
        })
    }
}

module.exports = router