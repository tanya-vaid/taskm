import db from '../database/config.js'
const  Admin= db.conn.define('admin',
    {
        email:{
            type: db.DataTypes.STRING,
            required: true
        },
        
        password:{
            type:db.DataTypes.STRING,
            required:true

        },
       

   }
        
       
    
)
Admin.sync()
export default Admin
