
class invalidBody extends Error{
    constructor(str){
        super()
        this.errorCode = 400
        this.errorMessage = `Invalid body. ${str} required.`
    }
}

module.exports = {
    invalidBody
}