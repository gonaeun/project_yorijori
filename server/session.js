const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');
const path = require('path');

const fileStoreOptions = {
  path: path.join(__dirname, 'sessions'), // 세션 파일을 저장할 디렉토리 경로!!!!!!!!
  ttl: 3600 // 세션 파일의 유효기간 (초 단위로 설정, 여기서는 1시간)
};

module.exports = {
  sessionMiddleware: session({
    secret: 'Hexacore6!!', // 세션을 암호화하는 데 사용할 키
    resave: false,             // 세션을 강제로 저장할지 여부
    saveUninitialized: false,   // 초기화되지 않은 세션을 저장소에 저장할지 여부
    cookie: { 
      maxAge: 1000 * 60 * 60, // 세션의 유효기간 설정 (로그인 유지시간 1시간)
      secure: false // 로컬 개발 환경에서는 https가 아니므로 false로 설정
    },
    store: new FileStore(fileStoreOptions) // 세션을 저장하기 위한 파일 스토어 세팅
  }),
  cookieParser: cookieParser()
};

console.log('세션 미들웨어 설정 완료');
console.log('세션 저장소 : FileStore');
console.log('세션 만료 시간 : 1시간');
console.log('쿠키 파서 설정 완료');