
/* const userRequests = []

const userLimit = (req, res, next) => {
    
    try{
        console.log(req.user.email)
        if(userRequests.includes(req.user.email)){
            const current = userRequests.find(obj => obj.user == req.user.email)
            console.log(current)
        } else {
            userRequests.push({
                user: req.user.email,
                timestamp: new Date(),
                counter: 3
            })
        }
        
        console.log(userRequests)
        next()
    } catch(error){
        res.status(402).json({error: error.message})
    }
    
}

module.exports = {
    userLimit,
} */