import { Sequelize,DataTypes } from "sequelize";
import 'dotenv/config'
const conn = new Sequelize(
process.env.DBNAME,
process.env.UNAME,
process.env.PASSWORD,
{
    host:process.env.HOST,
    dialect:process.env.DIALECT,
}
)

const db ={}
db.Sequelize = Sequelize
db.conn = conn
db.DataTypes = DataTypes


export default db