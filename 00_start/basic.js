const { members, add, getPerson } = require("./data.js"); //import

console.log("Hello, World");
let myName = "홍길동";
let age = 20;

if (age >= 20) {
  console.log(`${myName}성인`);
} else {
  console.log(`${myName}미성년`);
}

console.log(members);
console.log(add(10, 20));

members.forEach((item, idx) => {
  if (idx > 0) {
    console.log(item);
  }
}); //function(item, idx, arry)

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let result = [...arr1, ...arr2]; //새로운 하나의 배열을 생성함 (펼침연산자).
let ex = [arr1, arr2]; //배열의 배열, 위에꺼랑 다름!

console.log(...arr1); //배열의 요소를 하나씩 꺼내주는 spread Operator(p.52)
console.log(result);
console.log(ex);

//object Destruckturing
let { firstName, lastName, email } = getPerson(); //{firstName, lastName} -> getPerson이 갖는 객체들을 변수에 담음. object Destructuring(p.52)
console.log(firstName, lastName, email);

//Array Destructuring
function getScores() {
  return [70, 80, 90];
}

//let scoreAry = getScores(); scoreAry[0], [1], [2]로 출력안해도 됨.
let [x, y, ...z] = getScores();
console.log(x, y, z);

//펼침연산자 사용가능
// function getScores2() {
//   return [70, 80, 90, 30, 50, 70];
// }
// let [a, b, ...g] = getScores2();
// console.log(a, b, g);

//Rest Prameter(펼침연산자)
function sumAry(...ary) {
  //배열은 아니나 배열처럼 parameter 활용가능. 파라미터가 몇개 들어올지 정의안해줘도 됨!
  let sum = 0;
  for (let num of ary) {
    sum += num;
  }
  console.log(`합계: ${sum}`);
}
sumAry(1, 2, 3, 4, 5);
