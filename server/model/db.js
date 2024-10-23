/** DB 연결 코드 */
const mysql = require('mysql2');

// DB 연결정보를 설정
const conn = mysql.createConnection({
    host : "project-db-stu3.smhrd.com",
    port : 3307,
    user : "Insa5_JSB_hacksim_1",
    password : "aischool1",
    database : "Insa5_JSB_hacksim_1"
});

conn.connect((err) => {
  if (err) {
    console.error('DB 연결 실패: ', err.stack);
    return;
  }
  // 연결 진행
  console.log('DB 연결 성공');
});
module.exports = conn;