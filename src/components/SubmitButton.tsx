import React from "react";

import styled from "styled-components";

const StyledSubmitButton = styled.input`
font-size: 44px;
    width: 60%;
    height: 120px;
    border: none;
    background-color: ${props => props.theme.colors.secondary}
`;

export function SubmitButton(){
    return <StyledSubmitButton type="submit" value="Submit" />
};