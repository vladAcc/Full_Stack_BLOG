import mongoose from 'mongoose';


//fullname
//email
//password


const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true // obezatelinoepole
    },
    email: {
        type: String,
        required: true,
        unique: true // unical
    },
    passwordHash: {
        type: String,
        required: true
    },
    avataUrl: String  
},{
    timestamps: true // data kind o fost facuta shi kind o fost update
})


export default mongoose.model('User', UserSchema)