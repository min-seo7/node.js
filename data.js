const members = [
  { id: "guest", name: "손님" },
  { id: "user", name: "회원" },
  { id: "admin", name: "관리자" },
];

// function add(num1, num2) {
//   return num1 + num2;
// }

let add = (num1, num2) => num1 + num2; //한줄로가능!

module.exports = { members, add };
