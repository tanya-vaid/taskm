import db from '../database/config.js'
const  Task= db.conn.define('task',
    {
        email:{
            type: db.DataTypes.STRING,
            required: true
        },
        task_heading:{
            type:db.DataTypes.STRING,
            required:true
        },
        description:{
            type:db.DataTypes.STRING,
            required:true

        },
        active:{
            type:db.DataTypes.BOOLEAN,
            required:true
        }

        }
        
       
    
)
Task.sync()
export default Task
