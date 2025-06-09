import db from '../database/config.js'
const User = db.conn.define('user',
    {
        name:{
            type: db.DataTypes.STRING,
            required: true
        },
        email: {
            type: db.DataTypes.STRING,
            required: true,
            unique:true,
        },
        password: {
            type: db.DataTypes.STRING,
            required: true
        },
       
    }
)
User.sync()
export default User
