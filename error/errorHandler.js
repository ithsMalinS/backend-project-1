const errorHandler = (error, req, res, next) => {
    if(error.errorMessage){
      res.status(error.errorCode)
      .json({error: error.errorMessage})
    } else{
      res.status(500)
      .json({error:'Oops, something went wrong!'})
    }
    
  }
  
  module.exports = errorHandler