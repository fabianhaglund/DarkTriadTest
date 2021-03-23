import React from "react";

import styled from "styled-components";

const StyledSubHeading = styled.h4``;

type SubHeadingProps = {
  text: string;
};

export function SubHeading(props: SubHeadingProps) {
  return <StyledSubHeading>{props.text}</StyledSubHeading>;
}
