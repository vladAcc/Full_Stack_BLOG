import mongoose from 'mongoose';


//title
//text
//tags []
//viewCount -- Prosmotri
//user - avtar
// imageUrl 


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // obezatelinoepole
    },
    text: {
        type: String,
        required: true,
        unique: true // unical
    },
   tags: {
        type: Array,
        default : [] // daca nus teguri, intoarce []
    },
    viewCount: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // legatura cu tablitsa User
    },
    imageUrl: String  
},{
    timestamps: true // data kind o fost facuta shi kind o fost update
})


export default mongoose.model('Post', PostSchema)