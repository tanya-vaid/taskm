import User from "../model/user.js"
import Task from "../model/task.js"
import Admin from "../model/admin.js"
import Activity from "../model/activity.js"
import jwt from 'jsonwebtoken'
 import 'dotenv/config'
const pe = process.env
 


import ss from "../jwt.js"
const index = (req,res)=>{
    
    return res.render('index')
}

const login = (req,res)=>{
    return res.render('users/login',{msg:""})
}

const loginp = async  (req,res,next)=>{
    const {role,email,password} = req.body

    if(role === 'admin')
    {
        await  Admin.findOne({where:{email:email}})
        .then(async result=>{
            if(result.password === password){
                await Task.findAll()
                .then(tasks=>{
              res.render('admin/dashboard',{tasks})
                })
               
            }
            else{
                res.render('index')
            }

        })
     
    }else{
       await  User.findOne({where:{email:email}})
       .then((result)=>{
           if(!result){
                return res.render('index')
           }else{
                
               if(result.password === password){
              Task.findAll({where:{email:email}}).then(tasks=>{
                const user= {}
                user.email = email
                  const token = jwt.sign(user,pe.SECERET_KEY,{expiresIn:'1h'} )
                  res.cookie("token",token,{httpOnly:true})
                  res.render('user/dashboard',{tasks})
              })
                
                 
               }else{
                  return res.render('index')
                }
            }
       })

      

      }
      

    }

    const addtask = (req,res)=>{
        const email =req.user.email
        res.render('user/addtask',{email})
    }





const register = (req,res)=>{
    return res.render('user/register')
}

const registerp   = async (req,res)=>{
    const {name,email,password} = req.body
    const result = await User.findAll({where:{email:email}})
    if(result.length==0)
    {
     const user = new User({name,email,password})
      user.save()
      return res.redirect('/')
    }else{
        return res.render('user/register')
    }


    

    
}

const storetask = async (req,res)=>{
    const {email,task_heading,description} = req.body
    const task = new Task()
    task.email=email
    task.task_heading = task_heading
    task.description = description

   await task.save()

 const activity = new Activity()

 activity.email =task.email
 activity.action ="Add task"
 activity.save()


     Task.findAll({where:{email:email}}).then(tasks=>{
        res.render('user/dashboard',{tasks})
     })
   
}

const edit =async (req,res)=>{
    const id = req.params.id
    await Task.findByPk(id)
    .then(task=>{
        res.render('user/edit',{task})
    })

}

const edits = async (req,res)=>{
    const id = req.params.id
    await Task.update(
        {
            task_heading:req.body.task_heading,
            description:req.body.description
        },
        {
            where:{id:id}
        }
        
        )

        
        const activity = new Activity()
       activity.email =req.body.email
       activity.action ="Edit task"
      activity.save()

 
        
    
    Task.findAll({where:{email:req.body.email}}).then(tasks=>{
        res.render('user/dashboard',{tasks})
     })
}


const deletet = async (req,res)=>{
 const id = req.params.id
 const task = ""
 await Task.findAll({where:{id:id}})
 .then(async task=>{
    console.log(task[0].email)


   await Task.destroy({where:{id:id}})

const activity = new Activity()

 activity.email =task[0].email
 activity.action ="Delete task"
 activity.save()


   Task.findAll({where:{email:task[0].email}}).then(tasks=>{

        res.render('user/dashboard',{tasks})
     })
      })

      
}

const logout = (req,res)=>{
    res.clearCookie('token')
    res.render('index')
}

const view_activities = async (req,res)=>{
    await Activity.findAll()
    .then(log=>{
        res.render('admin/viewlogs',{log})
    })

}



export default {
    index,
    login,
    loginp,
    register,
    registerp,
    addtask,
    storetask,
    edit,
    edits,
    deletet,
    logout,
    view_activities
}