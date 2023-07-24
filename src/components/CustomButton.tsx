import React, { ReactNode } from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import Colors from "../constants/Colors";

interface CustomButtonProps extends PressableProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: "primary" | "secondary" | "light_blue" | "disabled";
  customColors?: {
    defaultColor: string;
    pressedColor: string;
  };
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
    case "light_blue":
      return {
        defaultColor: Colors.royal_blue[300],
        pressedColor: Colors.royal_blue[400],
      };
    case "disabled":
      return {
        defaultColor: Colors.gray[500],
        pressedColor: Colors.gray[500],
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
  customColors,
  ...props
}: CustomButtonProps) => {
  const { defaultColor, pressedColor } = customColors
    ? customColors
    : getColorsForVariant(variant);

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
