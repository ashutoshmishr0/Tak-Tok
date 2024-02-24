const notFound =(req,err, res,next)=>{
    const error =new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler=(err, req, res, next)=>{
    const statusCode =res.statusCode==200? 500: res.statusCode;
    res.json({
        message:errorHandler.message,
        stack: process.env.NODE_ENV ==="production" ? null :errorHandler.stack,
    });
};

module.exports={notFound ,errorHandler};