import styled from "styled-components";
import colors from "~/styles/colors";

export const Container = styled.View`
  flex: 1;
  padding: 15px;
  background-color: ${colors.secondaryColor};
`;

export const Title = styled.Text`
  color: ${colors.white};
  font-size: 24px;
  margin-top: 7px;
  margin-bottom: 20px;
  margin-left: 70px;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: 0,
  },
})`
  flex: 1;
`;

export const RaceList = styled.View`
  width: 100%;
`;

export const LoadingContainter = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

export const Message = styled.Text`
  font-size: 20px;
  color: ${colors.white}88;
`;
