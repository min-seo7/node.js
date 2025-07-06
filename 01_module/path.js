//경로작업을 위한 유틸리티를 제공하는 모듈. 
const path = require("path");

console.log(__filename);  //현재파일의 절대경로 
console.log(path.basename(__filename)); // 경로의 마지막 부분
console.log(path.basename(__filename, ".js")); //경로의 마지막 부분에서 확장자 제거.

let result = path.format({  //경로문자열 반환, 경로조합
  base: "sample.txt",
  dir: "/home/temp",
});
console.log(result);

result = path.parse("/home/temp/sample.txt");  //문자열로 된 경로를 pathObject로 반환, 경로분해
console.log(result);