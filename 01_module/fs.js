//파일 읽기, 쓰기, 삭제 & 폴서생성, 삭제등 파일처리 관련 모듈. File System(fs)

const fs = require("fs");

console.log("start");
// 1. 비동기 파일읽기  - 읽은 후 결과를 callback함수로 저달하는 비동기 방식.
// fs.readFile("./sample/output.log", "utf8", (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(data);
// });

// 2.동기 파일읽기 
// let data = fs.readFileSync("./sample/output.log", "utf8");
// console.log(data);


// 비동기 파일 쓰기 - 파일쓰기 작업이 완료되면 콜백함수 호출. [node.js의 모든 콜백함수는 에러우선콜백으로 에러가 첫번째!]
fs.writeFile("./sample/write.txt", "글쓰기..", "utf8", (err) => { //(경로, 내용, 옵션, 콜백함수(의 순서err,data순서))를 인자로 갖음. 
  if (err) {
    throw err;
  }
  console.log("쓰기완료");
});

console.log("end");