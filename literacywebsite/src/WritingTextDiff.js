import { diffWords } from 'diff';
import map from './Map';

function WritingDiff({ text1, text2 }) {
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

  /*
      Added words styling and scores.
  */
  function handleAddedDiff(diff) {
    let score = getScore(diff);
    if (redGreenCount(diff, score)) {
      totalUserScore += 0.5 * prevScore;
      prevScore = score;
      return {
        backgroundColor: 'rgb(250, 224, 167)',
      };
    }
    else {
      totalUserScore -= (1 / totalWordsPassage) * score;
      return {
        backgroundColor: '#9bd0c3',
        color: '#406c6c',
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
      color: 'rgb(242, 112, 75)',
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

        if (i == diffs.length - 1 && totalUserScore < 0) {
          totalUserScore = 0;
        }
        return (
          <span key={i} style={style}>
            {diff.value}
          </span>
        );
      })}

      {/* <p>
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
      </p> */}
    </div>
  );
}

export default WritingDiff;