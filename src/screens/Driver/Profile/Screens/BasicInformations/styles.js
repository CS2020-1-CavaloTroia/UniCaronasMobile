import styled from "styled-components/native";
import colors from "~/styles/colors";

export const Container = styled.View`
  padding: 0 15px;
  padding-bottom: 20px;
`;

export const SelectColor = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

export const SelectColorText = styled.Text`
  color: ${colors.white};
  font-size: 18px;
  font-weight: bold;
`;

export const ColorSelected = styled.View`
  height: 40px;
  width: 120px;
  margin-left: 15px;
  border-radius: 500px;
  background-color: ${(props) =>
    props.color ? props.color : colors.primaryColor};
`;

export const ChangeColorModalContainer = styled.View`
  background-color: ${colors.black};
  width: 100%;
  height: 50%;
`;
