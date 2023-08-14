import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type PriceInputProps = {
  priceInput: string;
  setPriceInput: (priceInput: string) => void;
  price: number;
  setPrice: (price: number) => void;
};

const PriceInput = ({
  priceInput,
  setPriceInput,
  price,
  setPrice,
}: PriceInputProps) => {
  const handlePriceChange = (text: string) => {
    const unformattedPrice = text.replace(/[^\d.]/g, "");
    setPrice(unformattedPrice === "" ? 0 : parseFloat(unformattedPrice));
    setPriceInput(text);
  };

  const isValidMoneyInput = (input: string) => {
    const moneyPattern = /^\d+(\.\d*)?$/;
    return moneyPattern.test(input);
  };

  const formatMoney = (input: string) => {
    const numericValue = parseFloat(input.replace(/[^\d.]/g, ""));
    return isNaN(numericValue)
      ? ""
      : numericValue.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  };

  return (
    <TextInput
      style={styles.priceTextInput}
      value={priceInput}
      placeholder="$0.00"
      inputMode="numeric"
      keyboardType="numeric"
      onFocus={() => {
        setPriceInput(price.toFixed(2));
      }}
      onChangeText={(text) => handlePriceChange(text)}
      onBlur={() => {
        if (isValidMoneyInput(priceInput)) {
          const formattedPrice = formatMoney(priceInput);
          setPriceInput(formattedPrice);
        }
      }}
    />
  );
};

export default PriceInput;

const styles = StyleSheet.create({
  priceTextInput: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 30,
    padding: 15,
    color: "black",
    fontWeight: "600",
  },
});
