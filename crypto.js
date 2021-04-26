const crypto = require('crypto')

const algorithm = 'aes-256-ctr'
const secretKey = process.env.CRYPTO_KEY
const iv = crypto.randomBytes(16)

const encrypt = (str) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
    const encrypted = Buffer.concat([cipher.update(str), cipher.final()])
    return {
        iv: iv.toString('base64'),
        content: encrypted.toString('base64')
    }
}

const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'base64'))
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'base64')), decipher.final()])
    return decrpyted.toString()
}

module.exports = {
    encrypt,
    decrypt
}