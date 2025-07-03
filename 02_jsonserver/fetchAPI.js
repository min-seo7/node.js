//fetchAPI.js  //try-catch구문보다는 await로!
async function json_func() {
  let promise = await fetch("http://localhost:3000/posts/2", {
    method: "put", //요청방식(put, post, get, delete)
    headers: { "Content-Type": "application/json" }, //헤더값 정의 => content-type로
    body: JSON.stringify({
      //전송할 데이터
      id: 2,
      title: "fetch2 수정 연습해봅니다",
      author: "admin",
    }),
  });
  let resolve = await promise.json();
  console.log("결과=>", resolve);

  promise = await fetch("http://localhost:3000/posts");
  resolve = await promise.json();
  console.log("조회=>", resolve);
}
json_func();
