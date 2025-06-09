import db from '../database/config.js'
const  Activity= db.conn.define('activity',
    {
        email:{
            type: db.DataTypes.STRING,
            required: true
        },
        
        action:{
            type:db.DataTypes.STRING,
            required:true

        }
        
       

   }
        
       
    
)
Activity.sync()
export default Activity
