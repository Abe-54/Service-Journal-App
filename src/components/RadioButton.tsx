import React, { ReactNode } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import Colors from "../constants/Colors";

interface RadioButtonProps extends PressableProps {
  label?: string;
  selected: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: "primary" | "secondary" | "light_blue" | "disabled";
  customColor?: {
    color: string;
  };
}

const getColorsForVariant = (variant: string) => {
  switch (variant) {
    case "secondary":
      return {
        color: Colors.dark_green[400],
      };
    case "primary":
      return {
        color: Colors.royal_blue[500],
      };
    case "light_blue":
      return {
        color: Colors.royal_blue[300],
      };
    case "disabled":
      return {
        color: Colors.gray[500],
      };
    default: {
      return {
        color: Colors.royal_blue[500],
      };
    }
  }
};

const RadioButton = ({
  label,
  selected,
  children,
  style,
  variant = "primary",
  customColor,
  ...props
}: RadioButtonProps) => {
  const { color } = customColor ? customColor : getColorsForVariant(variant);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressableContainer,
        pressed && styles.pressablePressed,
      ]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      {...props}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={[
            styles.RadioButtonOuter,
            {
              borderColor: color, // Set border color dynamically
            },
          ]}
        >
          <View
            style={[
              styles.RadioButtonInner,
              {
                backgroundColor: selected ? color : "transparent",
              },
            ]}
          />
        </View>
        {label ? <Text style={styles.RadioLabelText}>{label}</Text> : <></>}
      </View>
    </Pressable>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  pressableContainer: {
    overflow: "hidden",
  },
  pressablePressed: {
    opacity: 0.6,
  },
  RadioButtonOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.royal_blue[500],
    alignItems: "center",
    justifyContent: "center",
  },
  RadioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  RadioLabelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    margin: 5,
  },
});
