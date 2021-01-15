import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";

export default KeyboardScrollView = styled(KeyboardAwareScrollView).attrs({
  enableOnAndroid: true,
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  enableAutomaticScroll: true,
  contentInsetAdjustmentBehavior: "never",
})`
  width: 100%;
`;
