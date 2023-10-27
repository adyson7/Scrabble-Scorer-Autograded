// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");


const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};



function initialPrompt() {
   console.log("Let's play some Scrabble!");
   let word = input.question("Enter a word:");

   return word;
}
//the initial prompt function will greet with a console log statement. 
//readline-sync for user answer "Enter a word"




function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 } 


function simpleScorer(word) {
  word = word.toUpperCase();
   let score = 0;

   for (let i = 0; i < word.length; i++) {
      score += 1;
   }
   return score;
}

 // Set up a for loop to loop through the length of the "word" variable and give 1pt for each letter
// set word entered to word.toUpperCase again to match scrabble scorer
// used the includes method in my for loop to catch any vowels in the word 
// if/else statement to give +=3 for vowels, =+1 for anything else

function vowelBonusScorer(word) {
   //word = word.toUpperCase();
   let score = 0;
   let vowels = 'AEIOU';
   for (let i = 0; i < word.length; i++) {
      if(vowels.includes(word[i].toUpperCase())) {
         score += 3;
      }else {
         score += 1;
   }
      return score;
}
}
//vowelBonusScorer function will give points for vowels in the user's word
//the .includes method will tell me if the specified data (vowels) can be found in the array, IF it is then
//the addition assignment operator will add 3 to the score - ELSE, it will add 1

//set up scoring algorithm properties as directed by the book
const scoringAlgorithms = [
   {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer,
   },
   {
   name: "Bonus Vowels",
   description: "Vowels are 3 points, consonants are 1 point.",
   scorerFunction: vowelBonusScorer,
   },
   {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: oldScrabbleScorer,
   }
];

//scorerPrompt function will ask the user to choose their algorithm & the for loop will loop through the array 
//and select the algorithm based on the the algorithm's place in the array & use the scorer function
// scorerPrompt(word) allows us to pull the user word from the inital prompt


 function scorerPrompt(word, newPointStructure) {
    let scoringMethod = input.question("Choose a scoring algorithm (0, 1 or 2): ");
      for(let i = 0; i < scoringAlgorithms.length; i++) {
       if (scoringMethod === '0') {
         score = scoringAlgorithms[0].scorerFunction(word);
         console.log(`Score for "${word}": ${score}`);
       }else if (scoringMethod === '1') {
         score = scoringAlgorithms[1].scorerFunction(word);
         console.log(`Score for "${word}": ${score}`);
       }else if (scoringMethod === '2') {
         score = scoringAlgorithms[2].scorerFunction(word, newPointStructure);
       }else console.log("Not a valid Algorithm. Please Choose 0, 1 or 2.");
       return;
      }
      console.log(`Score for "${word}": ${score}`);
   }

   

   function transform(oldPointStructure) {

      let scorerObject = {};

      for (const key in oldPointStructure) {
        const letters = oldPointStructure[key];
        
        for (const letter of letters) {
          scorerObject[letter.toUpperCase()] = Number(key);
        }
      }
      
      return scorerObject;
    }

    let newPointStructure = transform(oldPointStructure);



function runProgram() {
   initialPrompt(); 
   scorerPrompt(); 
   transform(oldPointStructure);
     /// const word = initialPrompt();
     // const newPointStructure = transform(oldPointStructure);
    //scorerPrompt(word, newPointStructure);
    }
    

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   oldScrabbleScorer: oldScrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
