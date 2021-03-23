import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  align-items: start;
`;

const BarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  width: 50%;
`;

const Line = styled.div`
  border: solid;
  border-width: 3px;
  border-color: black;
  height: 0px;
  width: 50%;
  margin-right: 20px; 
  margin-left: 20px;
`;

export function ReplyScaleIndex() {
  return (
    <Container>
      <BarWrapper>
        <div>Disagree fully</div>
        <div>Disagree fully</div>
        <div>Disagree fully</div>
        <div>Disagree fully</div>
        <div>Disagree fully</div>
      </BarWrapper>

      <Line />

      <BarWrapper>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </BarWrapper>
    </Container>
  );
}
