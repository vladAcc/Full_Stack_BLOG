import express from 'express'
import mongoose from 'mongoose';
//validation
import { registerValidator, loginValidator } from  './validations/auth.js'
import { postCreateValidator } from  './validations/post.js'
//midleware 
import checkAuth from './middleware/checkAuth.js';

import * as UserControl  from './controllers/UseController.js';
import * as PostCotroller from './controllers/PostController.js'




//-----------------------
const PORT = 5000
const app = express()
app.use(express.json())




//Regists================================================================
app.post('/auth/register', registerValidator,  UserControl.register);
//Login
app.post('/auth/login', loginValidator,  UserControl.login)
//Check
app.get('/auth/me', checkAuth,  UserControl.getMe);


//Posts======================================================================
//create
app.post('/post', postCreateValidator, checkAuth, PostCotroller.create)
//GetAll
app.get('/post',  PostCotroller.getAll);
//Get One
app.get('/post/:id',  PostCotroller.getOne);




//---------------------------
const startApp =  async () => {
   
    try{
        ///fiuC3WDrmlVUbN19
        const db = await mongoose.connect('mongodb+srv://vadim:fiuC3WDrmlVUbN19@cluster0.3ghbqth.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT, ()=> console.log('SERVER START', PORT))
    }catch(e){
        console.log('ERROR DB', db)
    }

}
startApp()


