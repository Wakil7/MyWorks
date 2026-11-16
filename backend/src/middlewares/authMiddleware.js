import jwt from 'jsonwebtoken';

const authenticate = async(req, res, next) => {
    try{
        const authHeader = req.headers.authorization || req.headers.Authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({
                success: false,
                message: 'Access denied. Token not provided'
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    }
    catch (err){
        if (err.name==='TokenExpiredError'){
            return res.status(401).json({
                success: false,
                message: 'Token has expired. Please login again',
                error: err.message
            })
        }
        return res.status(403).json({
            success: false,
            message: 'Invalid token',
            error: err.message
        })
    }
};

module.exports = {
    authenticate
};