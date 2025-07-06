async function json_func() { //async함수선-> await 사용! 
  try {//post 요청
    let promise = await fetch("http://localhost:3000/posts", { //fetch():네트워크 요청함수
      method: "post", //서버에 데이터생성 전달.
      headers: { "Content-Type": "application/json" }, //json형식임을 알림. 
      body: JSON.stringify({ id: "7", title: "fetch TEST", author: "alstj" }), //실제 데이터 
    });

    let resolve = await promise.json(); //응답결과 json()를 파싱. 서버가 응답한 json데이터를 js객체로. 
    console.log("결과=>", resolve);

    promise = await fetch("http://localhost:3000/posts");
    resolve = await promise.json(); //새로 추가된 데이터를 포함해서 전체 목록가지고옴. 
    console.log("조회=>", resolve);
  } catch (err) {
    console.log(err);
  }
}

json_func();
