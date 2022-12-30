import jwt from 'jsonwebtoken';


//check po ID
export default (req, res, next)=>{
    //token - Bear
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if(token){
        try{//dekoding la token
            const decoded = jwt.verify(token, 'secret12345');
            req.userId = decoded._id
            next()
        }catch(e){
            return res.status(403).json({mesage: 'Нет доступа'})
        }
    }else{
        return res.status(403).json({mesage: 'Нет доступа'})
    }
}