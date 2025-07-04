const nodemailer = require("nodemailer");

const config = {
  host: "smtp.kakao.com",
  port: 465,
  secure: true,
  auth: {
    user: "ms1117777@kakao.com",
    pass: "yklffkoiceysxulg", //다음 앱 pw
  },
};

const sendEmail = async (data) => {
  //promise 객체로 반환
  return new Promise(async (resolve, reject) => {
    let tp = nodemailer.createTransport(config);
    try {
      let result = await tp.sendMail(data);
      console.log("메일성공", result);
      resolve(result);
    } catch (err) {
      console.log("메일실패", err);
      reject(err);
    }
  });
};

module.exports = {
  sendEmail,
};
