import PostModel from '../models/Post.js';


export const create = async (req, res) => {
    try{
        const doc = new  PostModel({
            title:  req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags:  req.body.tags,
            user: req.userId
        })

        const post = await doc.save()
        return res.json(post)
    }catch(err){
        return res.status(500).json({
            message: 'не удалось создать статью'
        })
    }
}


export const getAll = async (req, res) => {
    try{
        const posts = await PostModel.find().populate('user').exec()//sviazi cu Shema User/ pentru de gasit useru
        return res.json(posts)
    }catch(err){
        return res.status(500).json({
            message: 'ne udalosi polciti statii'
        })
    }
}

export const getOne = async (req, res) => {
    try{
        const postId = req.params.id
        PostModel.findOneAndUpdate({
            _id: postId,
            },{
                $inc: { viewCount: 1}
            },{
                returnDocument: 'after' //vernuti obnovlenii resulitat
            },
            (err, doc)=>{
                if(err) {return res.status(500).json({ message: 'ne udalosi vernuti statiu'})}
        
                if(!doc){ return res.status(500).json({ message: 'statia ne naidena'})}
            },
            res.json()
        )
    }catch(err){
        return res.status(500).json({
            message: 'ne udalosi polciti statii'
        })
    }
}