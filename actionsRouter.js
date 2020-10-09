const express = require('express');
const actions = require('./data/helpers/actionModel')
const projects = require('./data/helpers/projectModel')

const router = express.Router();

router.get('/projects/:id/actions/:id',validateProjectId(), validateActionId(), (req,res)=>{
    actions.get(req.params.id)
    .then((action)=>{
        res.status(200).json(action)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({
          message: "Error getting the actions",
         })
    })
})
//DONE -- GETS a specific action by id


router.post('/projects/:id/actions', validateAction(), validateProjectId(), (req,res)=>{
    actions.insert(req.body)
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
//DONE --- POST creates a action for a specific project

router.put('/projects/:id/actions/:id',  validateAction(), validateProjectId(), validateActionId(), (req,res)=>{
    actions.update(req.params.id, req.body)
    .then((action)=>{
        res.status(200).json(action)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({
          message: "Error updating the action",
         })
    })
})
// DONE -- UPDATES specific action by id

router.delete('/projects/:id/actions/:id', validateProjectId(), validateActionId(), (req,res)=>{
    projects.remove(req.params.id)
    .then((project)=>{
        res.status(200).json({
            message:"project destruction was a success! 🔥 "
        })
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({
          message: "Error deleting the project",
         })
    })
})
// DONE -- DELETES single action by id

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
        .catch(next)
    }
}

function validateActionId(){
    return( req, res, next) =>{
        actions.get(req.params.id)
        .then((action)=>{
            if(action){
                req.action = action
                next()
            } else {
                res.status(400).json({
                    message:"invalid action id"
                })
            }
        })
        .catch(next)
    }
}

function validateAction(){
    return (req, res, next) =>{
        if(!req.body){
            res.status(400).json({
                message:"missing action data"
            })
        } else if (!req.body.project_id || !req.body.description || !req.body.notes) {
            res.status(400).json({
                message:"missing field (Required: notes, description and project_id)"
            })
        }
        next()
    }
}

module.exports = router