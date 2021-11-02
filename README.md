<p align="center">
<img src="https://user-images.githubusercontent.com/28949213/138109377-4a86da46-6e83-466b-a60c-d2dd4a24b440.png"/>
</p>
<p align="center">   
   <img src='https://img.shields.io/github/package-json/v/Jandy-SeoulTech/Jandy_Web_Back'>
     <a href="https://github.com/Jandy-SeoulTech/Jandy_Web_Back/issues"><img src='https://img.shields.io/github/issues/Jandy-SeoulTech/Jandy_Web_Back'></a>
      <a href="https://github.com/Jandy-SeoulTech/Jandy_Web_Back/graphs/contributors"><img src='https://img.shields.io/github/contributors/Jandy-SeoulTech/Jandy_Web_Back'></a>
      <a href='https://github.com/Jandy-SeoulTech/Jandy_Web_Back/blob/main/LICENSE'><img src='https://img.shields.io/github/license/Jandy-SeoulTech/Jandy_Web_Back'></a>
</p>

# 재능 공유 플랫폼 Upgle

> 자신이 잘하는 분야를 화상 채팅을 이용하여 배우고 싶은 사람들과 실시간으로 인터랙션 하며 무료로 공유할 수 있는 플랫폼입니다. 

 
![Frame 600](https://user-images.githubusercontent.com/28949213/138156338-01c46b24-9d25-4ede-a428-76d7d06893a0.png)

**Upgle** 은 웹 사이트 환경에서 자신이 잘하는 분야를 공유하는 공유자와 배우고 싶은 분야를 배우는 사람들이 실시간으로 인터렉션 할 수 있게 도와주는 사이트입니다.
   


## ⭐️ 핵심 기능

### 🌈 재능공유자와 학습자가 만나기 위한 채널 기능
재능 공유자와 재능 참여자가 쉽게 만날 수 있는 **채널**을 만들어보세요!    
누구나 채널을 만들 수 있고 누구나 채널에 가입할 수 있습니다.    
채널을 통해 다른 사람들에게 자신만의 재능을 공유해주세요!😊

### 👥  효율적인 재능 공유를 위한 채팅 및 화상방 기능
재능 공유자가 편하게 재능을 공유하기 위해 **채팅 및 화상방**을 만들어주세요!    
저희 서비스에서 채팅방과 화상방을 만들어서 좀더 효율적으로 재능을 공유하실 수 있습니다.👋🏻

### 📝 재능 공유가 끝나고 기록하는 아카이빙 기능
재능 공유가 끝나고 유익한 내용을 기록하고 싶다면?    
재능 공유자가 채팅방에서 대화한 유익한 내용들을 직접 에디터를 통해 **아카이빙**으로 기록할 수 있습니다.    
채널 가입자뿐만 아니라 다른 사람들에게도 유익한 내용을 공유해주세요!

## 서비스 결과물

[https://upgle.hisfolio.com](https://upgle.hisfolio.com/)

## Architecture
![Upgle Architecture](https://user-images.githubusercontent.com/28949213/138162544-26f92166-1b5f-4240-b7f0-67c11e87e059.png)

## Dependencies
- `express` : 서버 프레임워크
- `prisma` : ORM
- `passport` : Auth 
- `cors` : cors 셋팅
- `dotenv` : 환경변수
- `express-validator` : 요청값 검증
- `nodemailer` : 메일 발송
- `multer` : 파일 업로드
- `babel` : 트랜스파일러
- `pm2` : 백그라운드 실행
- `socket.io` : 소켓 통신
- `node-schedule` : scheduler
- `dayjs` : 날짜 라이브러리
- `bcrypt` : 비밀번호 암호화
- `cross-env` : 환경변수 변경
- `nodemon` : 개발용 서버 재시작
- `husky` : git hook support
- `eslint` : 문법 분석
- `prettier` : 코드 포맷터

## ERD
[DB 설계 및 ER Diagram](https://github.com/Jandy-SeoulTech/Jandy_Web_Back/wiki/DB-%EC%84%A4%EA%B3%84)

## 🌟 Contribute
저희 서비스는 다른 사람들의 Contribute 를 원하고 있습니다. 👋🏻 아래는 설치 및 Contribute 가이드입니다.

### installation
> 원활한 실행을 위해서는 node LTS 이상의 버전을, 저희 서비스에 Contribute 하기 위해서는 node v16.8.0을 준비해주시기 바랍니다

1. 업글 원격 저장소를 클론합니다.
```
$ git clone https://github.com/Jandy-SeoulTech/Jandy_Web_Back.git
```
2. 생성된 로컬 저장소로 이동 후 모듈을 설치합니다.
```
$ cd Jandy_Web_Back
$ npm install
```
3. 루트 디렉토리에 환경변수 파일을 셋팅합니다.    
- 자세한 설명은 [환경변수 파일 설명](https://github.com/Jandy-SeoulTech/Jandy_Web_Back/wiki/%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98%ED%8C%8C%EC%9D%BC-%EC%84%A4%EB%AA%85)를 참고해주세요! 
4. 서비스의 ORM과 DB를 연동시켜줍니다.
```
$ npx prisma generate
$ npx prisma db push
```
> ❗️ MySQL 서버가 실행되고 있어야 하고, 환경변수 파일의 셋팅이 정확해야 합니다.
5. 위 작업이 완료되었다면 실행을 해주세요!
```
$ npm run dev
```

### Contribute
> 개발하시기 전 prettier가 에디터에 설정이 잘 돼있는지 확인해주세요!

기여 [가이드라인](https://github.com/Jandy-SeoulTech/Jandy_Web_Back/blob/dev/CONTRIBUTING.md)을 참고해주세요. 


## 👨‍👩‍👧‍👦 팀 멤버(Team Information)
<table>
   <tr>
      <td colspan="2" align="center"><strong>Front-End Developer</strong></td>
      <td colspan="2" align="center"><strong>Back-End Developer</strong></td>
      <td colspan="1" align="center"><strong>Product Manager</strong></td>
      <td colspan="1" align="center"><strong>Product Designer</strong></td>
   </tr>
  <tr>
    <td align="center">
    <a href="https://github.com/md2eoseo"><img src="https://avatars.githubusercontent.com/u/8054085?v=4" width="150px;" alt="김성태"/><br /><sub><b>김성태</b></sub></a><br />
    </td>
     <td align="center">
        <a href="https://github.com/sjsjsj1246"><img src="https://avatars.githubusercontent.com/u/24623403?v=4" width="150px" alt="황인서"/><br /><sub><b>황인서</b></sub></a>
     </td>
     <td align="center">
        <a href="https://github.com/InHyeok-J"><img src="https://avatars.githubusercontent.com/u/28949213?v=4" width="150px" alt="조인혁"/><br /><sub><b>조인혁</b></sub></a>
     </td>
     <td align="center">
        <a href="https://github.com/iqeq1945"><img src="https://avatars.githubusercontent.com/u/50164778?v=4" width="150px" alt="홍성웅"/><br /><sub><b>홍성웅</b></sub></a>
     </td>
     <td align="center">
        <a href="https://github.com/KeisLuv5991"><img src="https://avatars.githubusercontent.com/u/38745815?v=4" width="150px" alt="최민준"/><br /><sub><b>최민준</b></sub></a>
     </td>
     <td align="center">
        <a href="https://github.com/ssusukang"><img src="https://avatars.githubusercontent.com/u/80057422?v=4" width="150px" alt="김연수"/><br /><sub><b>김연수</b></sub></a>
     </td>
  <tr>
    

</table>

## License
[MIT](https://github.com/Jandy-SeoulTech/Jandy_Web_Back/blob/dev/LICENSE)
