//validation
import { validationResult } from 'express-validator';
//jwt
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
//Schema
import UserModel from '../models/User.js';




//register====================================================================
export const register =  async (req, res)=>{
    try{
        //validation----------------
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array())
        }
        //hash pass---------------------------
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        //model-----------------------------------------
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash
        })
        const user = await doc.save()
        //jwt-----------------------------------------------
        const token = jwt.sign(
            {
                _id: user._id
            },
            'secret12345', //scret cliuci
            {
                expiresIn: '30d' // kite zile ii proaspat tokenul
            }
        )

        //res---------------------------------------
        const { passwordHash, ...userData } = user._doc
        return res.json({...userData, token})
    }
    catch(err){
        return res.status(500).json({message: 'не удалось зарегистрировать пользователя'})
    }
};





//login===================================================================================
export const login = async (req, res)=>{
    try{
        //proverca la email--------------------------------------------
        const user = await UserModel.findOne({ email: req.body.email})
        console.log(user)
        if(!user){
            return res.status(404).json({
                mesage: 'Пользователь не найден'
            })
        }
  
        //proverca la password--------------------------------------------
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if(!isValidPass){
            return res.status(403).json({
                message: "Nui drept Login sau Parol"
            })
        }

        //daca tat ii bun facem alt token
        const token = jwt.sign(
            {
                _id: user._id
            },
            'secret12345', //scret cliuci
            {
                expiresIn: '30d' // kite zile ii proaspat tokenul
            }
        )
        //res---------------------------------------
        const { passwordHash, ...userData } = user._doc//scoatem infa din db
        return res.json({ ...userData, token, message:"LOGIN SUCCES"})

    }
    catch(err){
        return res.status(500).json({message: 'не удалось авторизоватся'})
    }
};






export const getMe = async (req, res)=>{
    try{
        const user = await UserModel.findById(req.userId)
        if(!user){//daca nui user ID
            return res.status(404).json({message: 'polizovateli ne naiden'})
        }
        const { userData } = user._doc
        return res.json(user._doc)
    }catch(err){
        return res.status(500).json({message: 'ERROR CHECK ---'})
    }
    
};