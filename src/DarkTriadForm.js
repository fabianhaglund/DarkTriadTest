import React, { useRef } from "react";

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

  const responses = useRef({});

  const onSubmit = () => {
    console.log("hej");
    console.log(JSON.stringify(responses.current))
  };

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

        <label>
          Chose a code, can be whatever. 
          <input type="text" name="Code" />
        </label>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
