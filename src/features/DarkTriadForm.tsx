import React, { useRef, useState } from "react";
import {
  Question,
  SubmitButton,
  Heading,
  SubHeading,
} from "../components/index";
import {
  ZscoreMachiavelli,
  ZscoreNarcissism,
  ZscorePsychopathy,
  ZscorePercentile,
} from "../math/Zscore.js";
import { questions, fields } from "../data/DarkTriadData";

export function DarkTriadForm() {
  const [machiavelliResult, setMachiavelliResult] = useState<
    number | undefined
  >();
  const [narcissismResult, setNarcissismResult] = useState<
    number | undefined
  >();
  const [psychopathyResult, setPsychopathyResult] = useState<
    number | undefined
  >();
  const [showResults, setShowResults] = useState(false);

  type ResponseRefObject = {
    [key: string]: string;
  };

  const responseRefs = useRef<ResponseRefObject | null>({});

  const onSubmit = () => {
    var responseValues = Object.values(
      responseRefs.current ?? []
    ).map((value: string) => parseInt(value));
    setMachiavelliResult(Results(responseValues)["machiavelli"]);
    setNarcissismResult(Results(responseValues)["narcissism"]);
    setPsychopathyResult(Results(responseValues)["psychopathy"]);
    setShowResults(true);
  };

  // Compute scores and results
  const MachiavelliScore = (machiavelliResponses: number[]) => {
    var sum = machiavelliResponses.reduce((a: number, b: number) => a + b, 0);
    var x = sum / machiavelliResponses.length;
    var score = ZscoreMachiavelli(x);
    return score;
  };

  const NarcissismScore = (narcissismResponses: number[]) => {
    // Question 2, 6 and 9 of Narcissism section have reverse scale
    narcissismResponses[1] = 6 - narcissismResponses[1];
    narcissismResponses[5] = 6 - narcissismResponses[5];
    narcissismResponses[8] = 6 - narcissismResponses[8];
    var sum = narcissismResponses.reduce((a: number, b: number) => a + b, 0);
    var x = sum / narcissismResponses.length;
    var score = ZscoreNarcissism(x);
    return score;
  };

  const PsychopathyScore = (psychopathyResponses: number[]) => {
    // Question 2 and 6 of Psychopathy section have reverse scale
    psychopathyResponses[1] = 6 - psychopathyResponses[1];
    psychopathyResponses[6] = 6 - psychopathyResponses[6];
    var sum = psychopathyResponses.reduce((a: number, b: number) => a + b, 0);
    var x = sum / psychopathyResponses.length;
    var score = ZscorePsychopathy(x);
    return score;
  };

  const Results = (responses: number[]) => {
    // Pick out responses for each personality trait (9 questions each in the following order)
    var machiavelliResponses = responses.slice(0, 9);
    var narcissismResponses = responses.slice(9, 18);
    var psychopathyResponses = responses.slice(18, 27);
    // Compute results
    var results = {
      machiavelli: () =>
        ZscorePercentile(MachiavelliScore(machiavelliResponses)),
      narcissism: () => ZscorePercentile(NarcissismScore(narcissismResponses)),
      psychopathy: () =>
        ZscorePercentile(PsychopathyScore(psychopathyResponses)),
    };
    return results;
  };

  const Explanation = (result: number | null) => {
    var text = "";
    if (result === null) {
      text = "NaN";
    } else if (result > 90) {
      text = text.concat(
        result.toString(),
        " %   |  ",
        "You are an extreme case"
      );
    } else if (result > 50) {
      text = text.concat(result.toString(), " %   |  ", "Above average");
    } else if (result > 25) {
      text = text.concat(result.toString(), " %   |  ", "Below average");
    } else {
      text = text.concat(result.toString(), " %   |  ", "Nope...");
    }

    return <SubHeading text={text} />;
  };

  return (
    <div>
      {showResults ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Heading text="Thank you, here are your results" />
          <SubHeading text="MACHIAVELLIAN?" />
          {Explanation(machiavelliResult ?? null)}
          <SubHeading text="NARCISSIST?" />
          {Explanation(narcissismResult ?? null)}
          <SubHeading text="PSYCHOPATHIC?" />
          {Explanation(psychopathyResult ?? null)}

          <button onClick={() => setShowResults(false)}>Again</button>
        </div>
      ) : (
        <div>
          <Heading text="Welcome to the Dark Triad!" />
          <SubHeading
            text="Test yourself for machiavellianism, narcissism and psychopathy. 
            Reply as well as you can to all questions with a value of 1 to 5 
            where:"
          />
          <SubHeading text="1 = fully disagree, 5 = fully agree" />

          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            {questions.map((q, i) => (
              <Question
                key={i}
                question={q}
                index={i}
                name={fields[i]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  responseRefs.current
                    ? (responseRefs.current[fields[i]] = e.target.value)
                    : null
                }
              />
            ))}
            <SubmitButton />
          </form>
        </div>
      )}
    </div>
  );
}
