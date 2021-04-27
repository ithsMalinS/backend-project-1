
class userNotFound extends Error{
    constructor(email){
        super()
        this.errorCode = 404
        this.errorMessage = `User with ${email} not found`
    }
}

class wrongPassword extends Error{
    constructor(){
        super()
        this.errorCode = 405
        this.errorMessage = `Wrong password`
    }
}

class invalidPassword extends Error{
    constructor(str){
        super()
        this.errorCode = 405
        this.errorMessage = `New password not valid. ${str}`
    }
}

class requestsExceeded extends Error {
    constructor(user){
        super()
        this.errorCode = 405
        this.errorMessage = `Requests for ${user} exceeded`
    }
}



module.exports = {
    userNotFound,
    wrongPassword,
    invalidPassword,
    requestsExceeded
}