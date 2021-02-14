import React from "react";
import styled from "styled-components";

const QuestionWrapper = styled.label`
  font-size: 18px;
  color: ${(props) => props.theme.colors.main};
  padding: 10px;
  display: flex; 
  justify-content: space-between;
`;

const StyledInput = styled.input`
    font-weight: bold;
    font-size: 26px;
    margin-left: 14px;
    height: 26px;
    width: 10%;
    border-radius: 4px; 
    border-width: 1px;
    border-color: rgba(255,255,255,0.8)
`;

type QuestionProps = {
  question: string;
  index: number;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
};

export function Question(props: QuestionProps) {

  return (
    <QuestionWrapper key={props.index}>
      {props.index + 1}. {props.question}
      <StyledInput
        type="number"
        min={props.min ?? 1}
        max={props.max ?? 5}
        name={props.name}
        onChange={props.onChange}
      />
    </QuestionWrapper>
  );
}
