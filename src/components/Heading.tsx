import React from "react";

import styled from "styled-components";

const StyledHeading = styled.h1`
`;

type HeadingProps = {
    text: string
}

export function Heading(props: HeadingProps) {
  return <StyledHeading>{props.text}</StyledHeading>;
}
