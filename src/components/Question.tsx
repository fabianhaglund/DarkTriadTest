import React from "react";

type QuestionProps = {
    text: string
}

export function Question(props: QuestionProps){
    return (
        <div>
            {props.text}
        </div>
    );

};