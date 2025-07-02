//promise.js  //첫번째 매개: 정상적실행했을때 호출할 함수 , 두번째: 에러가 났을 때 호출할 함수  //서버의 결과를 받아올때 성공&실패
const promise = new Promise(function (resolve, reject) {
  //resolve("ok");
  setTimeout(function () {
    //비동기방식 setTimeOut의 매개값으로 (함수, 지연시간)
    reject("error"); //아무거나 출력가능 ex){id:"user", name:"회원"}
  }, 1000); //1000 = 1초를 대기했다가 에러출력.
});

promise //
  .then(function (result) {
    //result에 ok값이 전달됨.
    console.log(result);
  })
  .catch(function (err) {
    //실패했을 때 함수 호출
    console.log(err);
  });
