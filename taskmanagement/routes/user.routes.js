import { Router } from "express";
import uc from "../controller/user.controller.js"
import jw from '../jwt.js'
const router = Router()
 
router.get('/',uc.index)
router.get('/login',uc.login)
router.get('/register',uc.register)
router.post('/login',uc.loginp)
router.post('/register',uc.registerp)
router.get('/add_task',jw.verify,uc.addtask)
router.post('/add_task',uc.storetask)
router.get('/edit/:id',uc.edit)
router.post('/edit/:id',uc.edits)
router.get('/delete/:id',uc.deletet)
router.get('/logout',uc.logout)
router.get('/view_activities',uc.view_activities)









export default router