function solution(s, n) {
    var answer = '';
    let strArr = s.split('');
  // 대문자 소문자 알파벳 배열 만들기 start
    let arrUp = [];
    let arrDown = [];
    for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
      arrDown.push(String.fromCharCode(i));
    }
    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
      arrUp.push(String.fromCharCode(i));
    }
  // 대문자 소문자 알파벳 배열 만들기 end
  
  
    strArr.map((e, i) => {
      if (arrDown.includes(e)) {
        let index = arrDown.indexOf(e);
        answer += arrDown[(index + n) % 26];
      }
      if (arrUp.includes(e)) {
        let index = arrUp.indexOf(e);
        answer += arrUp[(index + n) % 26];
      }
      if (e === ' ') {
        answer += ' ';
      }
    });
    return answer;
  }
  
console.log(solution("jongbeum",10))
