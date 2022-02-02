import "./styles.css";
import { useState, useEffect } from "react";
import rita from "rita";

export default function App() {
  const [answer, setAnswer] = useState();
  const [win, setWin] = useState(false);
  const [decision, setDecision] = useState();

  //if rita returns on empty set, get another word
  const word = rita.randomWord({ pos: "nns", numSyllables: 1 });

  //find a way -- via useEffect? -- to refresh word when you hit "play again"
  const rhymes = rita.rhymes(word, { limit: 20 });
  console.log(rhymes);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(answer);
    for (let i = 0; i < rhymes.length; i++) {
      if (answer === rhymes[i]) {
        setWin(true);
        console.log("winner!");
        break;
      }
    }
    if (win === true) {
      console.log(win);
      setDecision("official win!");
    } else {
      setDecision("total loser!");
    }
    setWin(false);
    setAnswer("");
  };

  return (
    <div className="App">
      <h1>Rhyme Check</h1>
      <h3>Write a word that rhymes with this:</h3>
      <h2>"{word}"</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="your answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
      <button onClick={(e) => setDecision("")}>play again</button>

      <h2>
        <i>{decision}</i>
      </h2>
    </div>
  );
}
