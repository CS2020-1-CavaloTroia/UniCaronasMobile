import React from "react";
import { Menu, Icon, Notify } from "./styles";

export default function MenuButton({
  absolute = true,
  navigation,
  notify = false,
  ...rest
}) {
  return (
    <Menu
      absolute={absolute}
      onPress={() => navigation.toggleDrawer()}
      {...rest}
    >
      <Icon name="menu" />

      {notify && <Notify />}
    </Menu>
  );
}
