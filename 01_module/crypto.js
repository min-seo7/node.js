//다양한 암호화기능제공-> DB저장시 평문x 암호문 저장. 
const crypto = require("crypto"); //내장된 모듈

//단순 해쉬암호화
let pw = crypto.createHash("sha512").update("pw1234").digest("base64");

// salting 생성함수(무작위 문자열 생성)
const createSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) {
        reject(err);
      }
      resolve(buf.toString("base64"));
    });
  });
};

// createSalt().then((result) => console.log(result.toString("base64")));
//암호화 함수(비밀번호 + salt)
const createCryptoPassword = (plainPassword, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 10000, 64, "sha512", (err, key) => {
      if (err) {
        reject(err);
      }
      resolve({ salt: salt, password: key.toString("base64") });
    });
  });
};

//실행함수
async function main() {
  const salt = await createSalt();   //salt 먼저호출
  const pw = await createCryptoPassword("1111", salt); //pw 암호화작엄. 
  console.log(pw.password); 
}

main();
