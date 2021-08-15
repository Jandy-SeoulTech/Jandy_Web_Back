import env from './';

const RandomCode = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
    const stringLength = 6
    let randomstring = ''
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length)
      randomstring += chars.substring(rnum, rnum + 1)
    }
    return randomstring
  }


const mailConfig = {
    service: 'Naver',
    host: 'smtp.naver.com',
    port: 587,
    auth: {
      user: env.MAIL_EMAIL,
      pass: env.MAIL_PASSWORD
    }
  }
  


export default {
    mailConfig,
    RandomCode,
}