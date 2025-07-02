//crypto.js
const crypto = require("crypto");
const { resolve } = require("path");

crypto.createHash("sha512").update("pw1234").digest("base64");
//console.log(pw);

let result = fetch("url");
let result2 = result * 222;

//salting 암호화.
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

// createSalt() //
//   .then((result) => console.log(result));
//salt 방식으로 암호화.
const createCryptoPassword = (plainPassword, salt) => {
  //비밀화 할 비밀번호를 매개값 첫번째,

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 10000, 64, "sha512", (err, key) => {
      if (err) {
        reject(err);
      }
      resolve({ salt: salt, password: key.toString("base64") });
    });
  });
};

async function main() {
  const salt = await createSalt();
  onsole.log(salt);
  const pw = await createCryptoPassword("1111", salt);
  console.log(pw);
}

main();
