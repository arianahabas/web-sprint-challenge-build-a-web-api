const express = require('express');
const projects = require('./data/helpers/projectModel')

const router = express.Router();

router.get('/projects', (req,res) => {
    projects.get()
    .then((project)=>{
        res.status(200).json(project)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({
          message: "Error retrieving the projects",
         })
    })
})
//DONE --- GETS all projects

router.get('/projects/:id',validateProjectId(), (req,res)=>{
  res.status(200).json(req.project)
})
//DONE --- GETS single project by ID

router.get('/projects/:id/actions', validateProjectId(), (req,res)=>{
    projects.getProjectActions(req.params.id)
    .then((actions)=>{
        res.status(200).json(actions)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({
          message: "Error retrieving the actions",
         })
    })
})
//GETS all actions for a specific project

router.post('/projects', validateProject(), (req,res)=>{
    projects.insert(req.body)
    .then((project)=>{
        res.status(201).json(project)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({
          message: "Error posting the projects",
         })
    })
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

function validateProject(){
    return (req, res, next) =>{
        if(!req.body){
            res.status(400).json({
                message:"missing project data"
            })
        } else if (!req.body.name || !req.body.description) {
            res.status(400).json({
                message:"missing field (BOTH name and description required)"
            })
        }
        next()
    }
}
module.exports = router