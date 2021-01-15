import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  align-items: ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props.alignment === "left"
      ? "flex-start"
      : props.alignment === "right"
      ? "flex-end"
      : "center"};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
`;

export const Line = styled.View`
  width: ${(props) => props.width};
  height: ${(props) => props.weight};
  background-color: ${(props) => props.color};
`;
