//Console모둘은 Console클래스와 전역 객체로 사용가능. [디버깅위해 사용]

const { Console } = require("console"); //Console 클래스 사용.
const fs = require("fs"); //파일 시스템 모듈
const express = require("express"); // 웹 서버 프레임워크

const output = fs.createWriteStream("./sample/output.log", { flags: "a" }); //파일 쓰기가 가능하도록 스트림 생성.(출력로그)
const errlog = fs.createWriteStream("./sample/errlog.log", { flags: "a" }); //파일 쓰기가 가능하도록 스트림 생성.(에러로그)

const logger = new Console({ //콘솔객체 생성. 
  stdout: output, //log()는 output.log에
  stderr: errlog, //error는 errlog.log에 리록
});

logger.log("로그기록하기");  // log함수를 사용하여 기록. 
logger.error("에러로그기록하기");

console.log("end ");  //단순 종료를 알리기 위한 콘솔출력. 
