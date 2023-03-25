// Used to respond if the Route does not exist. Means no Successful Resposne was returned to client OR No Error was forwared by Either asyncWrapper's catch block or as Custom Error then this MDW Func is used as it does not have 'next' as argument means no MDW Func will pass Control to this MDW Func notFound.    
const notFound = (req,res)=>{
    res.status(404).send('Route does not exist');
};

module.exports = notFound;
