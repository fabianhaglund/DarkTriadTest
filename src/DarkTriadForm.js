import { ConstantNodeDependencies } from "mathjs";
import React, { useRef, useState } from "react";
import { ZscoreMachiavelli, ZscoreNarcissism, ZscorePsychopathy, Percentile } from "./Zscore.js";

const questions = [
  "It’s not wise to tell your secrets.",
  "I like to use clever manipulation to get my way.",
  "Whatever it takes, you must get the important people on your side.",
  "Avoid direct conflict with others because they may be useful in the future.",
  "It’s wise to keep track of information that you can use against people later.",
  "You should wait for the right time to get back at people.",
  "There are things you should hide from other people to preserve your reputation.",
  "Make sure your plans benefit yourself, not others.",
  "Most people can be manipulated.",
  "People see me as a natural leader.",
  "I hate being the center of attention.",
  "Many group activities tend to be dull without me.",
  "I know that I am special because everyone keeps telling me so.",
  "I like to get acquainted with important people.",
  "I feel embarrassed if someone compliments me.",
  "I have been compared to famous people.",
  "I am an average person.",
  "I insist on getting the respect I deserve.",
  "I like to get revenge on authorities.",
  "I avoid dangerous situations.",
  "Payback needs to be quick and nasty.",
  "People often say I’m out of control.",
  "It’s true that I can be mean to others.",
  "People who mess with me always regret it.",
  "I have never gotten into trouble with the law.",
  "I enjoy having sex with people I hardly know.",
  "I’ll say anything to get what I want.",
];

const fields = [
  "Mac[Mac1]",
  "Mac[Mac2]",
  "Mac[Mac3]",
  "Mac[Mac4]",
  "Mac[Mac5]",
  "Mac[Mac6]",
  "Mac[Mac7]",
  "Mac[Mac8]",
  "Mac[Mac9]",
  "Nar[Nar01]",
  "Nar[Nar02]",
  "Nar[Nar03]",
  "Nar[Nar04]",
  "Nar[Nar05]",
  "Nar[Nar06]",
  "Nar[Nar07]",
  "Nar[Nar08]",
  "Nar[Nar09]",
  "Psy[Psy01]",
  "Psy[Psy02]",
  "Psy[Psy03]",
  "Psy[Psy04]",
  "Psy[Psy05]",
  "Psy[Psy06]",
  "Psy[Psy07]",
  "Psy[Psy08]",
  "Psy[Psy09]",
  "Code",
];

export function DarkTriadForm() {

    const [mach, setMach] = useState();
    const [narc, setNarc] = useState();
    const [psych, setPsych] = useState();

  const responses = useRef({});

  const onSubmit = () => {
    var responseValues = Object.values(responses.current).map(v => parseInt(v))
    var results = Results(responseValues)
    setMach(results[0])
    setNarc(results[1])
    setPsych(results[2])
  };

  const MachiavelliScore = (responses) => {
      var sum = responses.reduce((a, b) => a + b, 0)
      var x = sum / responses.length;
      var score = ZscoreMachiavelli(x);
      return score;
  };

  const NarcissismScore = (responses) => {
      responses[1] = 6 - responses[1]
      responses[5] = 6 - responses[5]
      responses[8] = 6 - responses[8]
      var sum = responses.reduce((a, b) => a + b, 0)
      var x = sum / responses.length;
      var score = ZscoreNarcissism(x);
      return score;
  };

  const PsychopathyScore = (responses) => {
    responses[1] = 6 - responses[1]
    responses[6] = 6 - responses[6]
    var sum = responses.reduce((a, b) => a + b, 0)
    var x = sum / responses.length;
    var score = ZscorePsychopathy(x);
    return score;
};

const Results = (responses) => {

    
    var machiavelliResponses = responses.slice(0,9);
    var machiavelli = MachiavelliScore(machiavelliResponses)
    console.log(machiavelli)
    var machiavelliPercentile = Percentile(machiavelli)
    
    var narcissismResponses = responses.slice(9,18);
    var narcissism = NarcissismScore(narcissismResponses);
    console.log(narcissism)
    var narcissismPercentile = Percentile(narcissism);
    
    var psychopathyResponses = responses.slice(18,27);
    var psychopathy = PsychopathyScore(psychopathyResponses);
    console.log(psychopathy)
    var psychopathyPercentile = Percentile(psychopathy);

    return [machiavelliPercentile, narcissismPercentile, psychopathyPercentile];
}

  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
      }}>
        {questions.map((q, i) => (
          <label key={i}>
            {i + 1}. {q}
            <input
              type="number"
              min="1"
              max="5"
              name={fields[i]}
              onChange={e => responses.current[fields[i]] = e.target.value}
            />
          </label>
        ))}
        <input type="submit" value="Submit" />
      </form>

      <div>
          Machiavelli Percentile: 
          { mach }
      </div>

      <div>
          Narcissism Percentile: 
          { narc }
      </div>

      <div>
          Psychopathy Percentile: 
          { psych }
      </div>


    </div>
  );
}
