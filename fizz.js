function fizzBuzz(n, result = '') { // result initialized as an empty string the first time the function is called
  switch(true) {                    // this stops the first (last in order of being printed) entry from being entry + undefined
    case (n === 0):
      console.log(result.substring(1)); // prints the result without the extra \n at the beginning
      return;
    case (n % 15 === 0):
      result = `\nFizzBuzz${result}`;
      break;
    case (n % 5 === 0):
      result = `\nBuzz${result}`;
      break;
    case (n % 3 === 0):
      result = `\nFizz${result}`;
      break;
    default:
      result = `\n${n}${result}`;
  }
  return fizzBuzz(n - 1, result);
}

fizzBuzz(20);
