import React, { ReactNode } from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import Colors from "../constants/Colors";

interface CustomButtonProps extends PressableProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: "primary" | "secondary";
}

const getColorsForVariant = (variant: string) => {
  switch (variant) {
    case "secondary":
      return {
        defaultColor: Colors.dark_green[400],
        pressedColor: Colors.dark_green[500],
      };
    case "primary":
      return {
        defaultColor: Colors.royal_blue[400],
        pressedColor: Colors.royal_blue[500],
      };
    default: {
      return {
        defaultColor: Colors.royal_blue[400],
        pressedColor: Colors.royal_blue[500],
      };
    }
  }
};

const CustomButton = ({
  children,
  style,
  variant = "primary",
  ...props
}: CustomButtonProps) => {
  const { defaultColor, pressedColor } = getColorsForVariant(variant);

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? pressedColor : defaultColor,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
};

export default CustomButton;
