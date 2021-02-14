import React, { useRef, useState } from "react";
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

  type ResponseRefObject = {
    [key: string]: string
  }

  const responseRefs = useRef<ResponseRefObject>({});

  const onSubmit = () => {
    var responseValues = Object.values(responseRefs.current ?? []).map((value: string) => parseInt(value))
    console.log("responseValues")
    console.log(responseValues)
    var results = Results(responseValues);
    setMachiavelliResult(results["machiavelli"]);
    setNarcissismResult(results["narcissism"]);
    setPsychopathyResult(results["psychopathy"]);
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
    console.log("RESULTS")
    console.log(responses) // []
    // Pick out responses for each personality trait (9 questions each in the following order)
    var machiavelliResponses = responses.slice(0, 9);
    var narcissismResponses = responses.slice(9, 18);
    var psychopathyResponses = responses.slice(18, 27);

    // Compute results
    var results = {
      machiavelli: () => ZscorePercentile(MachiavelliScore(machiavelliResponses)),
      narcissism: () => ZscorePercentile(NarcissismScore(narcissismResponses)),
      psychopathy: () => ZscorePercentile(PsychopathyScore(psychopathyResponses)),
    };
    return results;
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {questions.map((q, i) => (
          <label key={i}>
            {i + 1}. {q}
            <input
              type="number"
              min="1"
              max="5"
              name={fields[i]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => (responseRefs.current ? responseRefs.current[fields[i]] = e.target.value : null)}
            />
          </label>
        ))}
        <input type="submit" value="Submit" />
      </form>

      <div>
        Machiavelli Percentile:
        {machiavelliResult}
      </div>

      <div>
        Narcissism Percentile:
        {narcissismResult}
      </div>

      <div>
        Psychopathy Percentile:
        {psychopathyResult}
      </div>
    </div>
  );
}
