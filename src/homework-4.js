// string reverse

function reverse(str) {
    const arr = str.split('')
    arr.reverse()
    const newString = arr.join('')
    return newString
}

const originalString = "word"
const reversedString = reverse(originalString);
console.log(reversedString);


// palindrome

function isPalindrome(input) {
    const len = input.length;
  
    for (let i = 0; i < len / 2; i++) {
      if (input[i] !== input[len - 1 - i]) {
        return false;
      }
    }
  
    return true; 
  }
  
  const testString = "aba";
  console.log(isPalindrome(testString)); 


// output of paired values in reversed order

const array = [1, 2, 3, 4, 5, 6];

const getPaired = array.filter((element) => element % 2 === 0);

const reversedPairedValues = getPaired.reverse();

console.log(reversedPairedValues); 