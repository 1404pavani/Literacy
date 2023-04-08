import { diffWords } from 'diff';
import map from './Map';

function Diff({ text1, text2 }) {
  text1 = text1.replace(/[^\w\s\']|_/g, "").trim();
  text2 = text2.replace(/[^\w\s\']|_/g, "").trim();
  const options = { ignoreCase: true };
  const diffs = diffWords(text1, text2, options);
  let totalPassageScore = 0;
  let totalUserScore = 0;
  let totalWordsPassage = 0;
  let totalWordsUser = 0;
  let correctWords = 0;
  let wrongWords = 0;
  let partialWords = 0;
  let prev;
  let prevScore = 0;
  const wrongWordsMap = new Map();
  let sortedWrongWordsArray;
  let sortedWrongWordsString;

  /*
      Added words styling and scores.
  */
  function handleAddedDiff(diff) {
    let score = getScore(diff);
    if (redGreenCount(diff, score)) {
      totalUserScore += 0.5 * prevScore;
      prevScore = score;
      return {
        backgroundColor: '#fedd70',
      };
    }
    else {
      totalUserScore -= (1 / totalWordsPassage) * score;
      return {
        backgroundColor: '#d4edda',
        color: 'green',
      };
    }
  }

  /*
      Removed words styling and scores.
  */
  function handleRemovedDiff(diff) {
    let score = getScore(diff);
    totalPassageScore += score;
    //totalUserScore -= score; User's score shouldn't be decremented 
    redGreenCount(diff, score);
    //addWrongWordMap(diff);
    return {
      //backgroundColor: '#f8d7da',
      color: 'red',
      textDecoration: 'line-through',
    };
  }

  /*
      Normal words styling and scores.
  */
  function handleNormalDiff(diff) {
    let score = getScore(diff);
    redGreenCount(diff, score);
    totalUserScore += score;
    totalPassageScore += score;
    return {};
  }

  /*
      Get word score from map or return 1.
  */
  function getScore(diff) {
    let phraseScore = 0;
    let words = diff.value.trim().split(" ");
    if (words[0] != "") {
      if (diff.added) {
        totalWordsUser += words.length;
        wrongWords += words.length;
      }
      else if (diff.removed) {
        wrongWords += words.length;
      }
      else {
        totalWordsUser += words.length;
        correctWords += words.length;
      }

      for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (map.has(word)) {
          phraseScore += map.get(word);
        }
        else {
          phraseScore += 1;
        }
        if(diff.removed)
        {
          if(!wrongWordsMap.has(word))
          {
            wrongWordsMap.set(word, 1);
          }
          else
          {
            wrongWordsMap.set(word, wrongWordsMap.get(word) + 1);
          }
        }
      }
    }

    return phraseScore;
  }

  /*
      Return true if there is a red word followed by a green word or false otherwise. Used to give partial credit.
  */
  function redGreenCount(diff, score) {
    if (diff.value == " ") {
      prevScore = 0;
      return false;
    }
    if (prev && prev.removed && diff.added && diff.count == 1 && prev.count == 1) {
      partialWords++;
      wrongWords--; //Prevents double counting of wrong words.
      return true;
    }
    prev = diff;
    prevScore = score;
    return false;
  }

  function getTotalWords(text) {
    let arr = text.split(" ");
    return arr.length;
  }

  function sortMap(map)
  {
    const arr = Array.from(map);
    if(arr.length > 1)
    {
      arr.sort((a, b) => b[1] - a[1]);
    }
    largestValue = arr[0][1];
    largestKey = arr[0][0];
    return arr;
  }

  function wrongWordsString(arr)
  {
    let string = "";
    if(arr.length == 0)
    {
      string = "None! Perfect! Slay!";
    }
    else if(arr.length == 1)
    {
      string += ("1. " + arr[0][0] + " , " + arr[0][1]);
    }
    else if(arr.length == 2)
    {
      string += ("1. " + arr[0][0] + " , " + arr[0][1] + "; 2. " + arr[1][0] + " , " + arr[1][1]);
    }
    else
    {
      string += ("1. " + arr[0][0] + " , " + arr[0][1] + "; 2. " + arr[1][0] + " , " + arr[1][1] + "; 3. " + arr[2][0] + " , " + arr[2][1]);
    }
    return string;
  } 


  return (
    <div>
      {diffs.map((diff, i) => {
        let style;
        if (i == 0) {
          totalWordsPassage = getTotalWords(text1);
        }

        if (diff.added) {
          style = handleAddedDiff(diff);
        }
        else if (diff.removed) {
          style = handleRemovedDiff(diff);
        }
        else {
          style = handleNormalDiff(diff);
        }

        if (i == diffs.length - 1)
        { 
          sortedWrongWordsArray = sortMap(wrongWordsMap);
          sortedWrongWordsString = wrongWordsString(sortedWrongWordsArray);
          if(totalUserScore < 0) 
          {
            totalUserScore = 0;
          }
        }
        return (
          <span key={i} style={style}>
            {diff.value}
          </span>
        );
      })}

      <p>
        Wrong Words #: {wrongWords}
        <br />
        Correct words #: {correctWords}
        <br />
        Total Words Passage: {totalWordsPassage}
        <br />
        Total Words User: {totalWordsUser}
        <br />
        Partial Words: {partialWords}
        <br />
        Passage Score: {totalPassageScore}
        <br />
        User Score: {totalUserScore}
        <br />
        Accuracy: {Math.round(100 * (totalUserScore / totalPassageScore))}%
        <br />
        Most Wrong Words and Frequencies: {sortedWrongWordsString}
      </p>
    </div>
  );
}

export default Diff;