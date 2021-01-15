import React from "react";

import {
  Container,
  Title,
  TextInput,
  ErrorLabel,
  InputWithMask,
} from "./styles";
import colors from "~/styles/colors";

export default function Input({
  color = colors.primaryColor,
  title,
  mask = null,
  errorText = null,
  ...rest
}) {
  const renderInput = () => {
    if (mask)
      return (
        <InputWithMask mask={mask} error={errorText} colorI={color} {...rest} />
      );

    return <TextInput error={errorText} colorI={color} {...rest}></TextInput>;
  };

  return (
    <Container>
      {title && <Title colorI={color}>{title}</Title>}
      {renderInput()}

      <ErrorLabel>{errorText}</ErrorLabel>
    </Container>
  );
}
