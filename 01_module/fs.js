//fs.js
const fs = require("fs");
// 매개변수1번째: 2번째: 콜백, 3번째 매개값: 함수
// 1.비동기방식.
// fs.readFile("./sample/output.log", "utf8", (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(data);
// }); //fs.readFileSync()

//2. 동기방식
// let data = fs.readFileSync("./sample/output.log", "utf8");
//console.log(data);

fs.writeFile("./sample/write.txt", "글쓰기..", "utf8", (err) => {
  if (err) {
    throw err;
  }
  console.log("쓰기완료");
});
console.log("end");
