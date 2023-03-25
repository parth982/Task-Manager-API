// MDW Func used to avoid try and catch block in Func by handling them.
// If Error Occurs then Control is Passed to Next MDW Func
const asyncWrapper = (fn) => {
    return async(req,res,next)=>{
        try{
            await fn(req,res,next);
        }catch(error){return next(error);}
    }
}
module.exports = asyncWrapper; 