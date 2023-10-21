module.exports = function check(str, bracketsConfig) {

  const stack = []; // создаем пустой массив для хранения открывающих скобок
  const closeToOpen = {}; // будем использовать для отображения закрывающих скобок на соответствие открывающим скобкам
  const openingBrackets = bracketsConfig.map(bracket => bracket[0]); // создаем новый массив методом мар - на основе bracketsConfig, который содержит все открывающие скобки каждого подмассива
  const closingBrackets = bracketsConfig.map(bracket => bracket[1]); // создаем новый массив методом мар - на основе bracketsConfig, который содержит все закрывающие скобки каждого подмассива


  for (let i = 0; i < bracketsConfig.length; i++) {
    // создаем обьект где ключом будет закрывающая скобка, а значением будет открывающая из подмассива bracketsConfig
    closeToOpen[bracketsConfig[i][1]] = bracketsConfig[i][0];
  }

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (openingBrackets.includes(char) && (closingBrackets.includes(char) && stack[stack.length - 1] === char)) { // проверяем является ли текущий символ открывающей и одновременно закрывающей скобкой и последним символом в стеке для того случая если скобки откр и закр одинаковые

      stack.pop(); // удаляем последнией символ стека так как нашли пару для текущей скобки

    } else if (openingBrackets.includes(char)) { // проверяем является ли текущий символ открывающей скобкой, если да то мы ее добавляем в стек чтобы отслеживать все открывающие скобки пока не найдем соответствующие закрывающие скобки
      stack.push(char);
      
    } else if (closingBrackets.includes(char)) { // проверяем является ли текущий символ закрывающей скобкой
      if (stack.length === 0 || stack[stack.length - 1] !== closeToOpen[char]) { // если текущий символ явл закрывающей скобкой, тогда проверяем есть ли чтото в стеке, если да, то проверяем ее на соответствие последней открывающей скобке
        return false;
      }
      stack.pop();
    }
  }

  return stack.length === 0;
}
