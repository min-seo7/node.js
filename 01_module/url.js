//url을 다루기 위한 모듈. 

const url = new URL( //url객체 생성. 

  "https://user:pass@sum.example.com:8080/a/b/c?query=name&num=1#node"
);
const params = url.searchParams;

console.log(params.get("query")); // parameter
console.log(params.get("num"));

console.log(
  url2.parse(
    "https://user:pass@sum.example.com:8080/a/b/c?query=name&num=1#node"
  )
);