const crypto = require('crypto')

const algorithm = 'aes-256-ctr'
//const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'
const secretKey = process.env.CRYPTO_KEY
const iv = crypto.randomBytes(16)

const encrypt = (str) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
    const encrypted = Buffer.concat([cipher.update(str), cipher.final()])
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    }
}

const decrypt = (hash) => {
    //console.log('Hash:    ' + hash)
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'))
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])
    return decrpyted.toString()
}

module.exports = {
    encrypt,
    decrypt
}