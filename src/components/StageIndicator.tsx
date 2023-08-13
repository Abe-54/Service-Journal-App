import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import Colors from "../constants/Colors";

interface StageIndicatorsProps {
  currentStage: number;
  totalStages: number;
  style?: ViewStyle;
}

const StageIndicator = ({
  currentStage,
  totalStages,
  style,
}: StageIndicatorsProps) => {
  const indicators = [];

  for (let stage = 0; stage < totalStages; stage++) {
    indicators.push(
      <View
        key={stage}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={[
            styles.indicatorDot,
            stage < currentStage && styles.indicatorDotActive,
          ]}
        />
        {stage < totalStages - 1 && (
          <View
            style={[
              styles.indicatorLine,
              stage < currentStage - 1 && styles.indicatorLineActive,
            ]}
          />
        )}
      </View>
    );
  }

  return <View style={[styles.indicatorContainer, style]}>{indicators}</View>;
};

export default StageIndicator;

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  indicatorLine: {
    width: 20,
    height: 2,
    backgroundColor: Colors.gray[300],
    marginHorizontal: 5,
  },
  indicatorLineActive: {
    backgroundColor: Colors.royal_blue[400],
  },
  indicatorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.gray[300],
    marginHorizontal: 5,
  },
  indicatorDotActive: {
    backgroundColor: Colors.royal_blue[400],
  },
});
