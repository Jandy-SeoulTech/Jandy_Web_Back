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

const RandomAuth = RandomCode()

const mailConfig = {
    service: 'Naver',
    host: 'smtp.naver.com',
    port: 587,
    auth: {
      user: env.MAIL_EMAIL,
      pass: env.MAIL_PASSWORD
    }
  }
  
let message = {
    from: env.MAIL_EMAIL,
    to: null,
    subject: '이메일 인증 요청 메일입니다.',
    html: `<p> 다음 인증번호 6자리를 입력해주세요! <br> ${RandomAuth} </p>`
}

export default {
    mailConfig,
    message,
    RandomAuth,
}