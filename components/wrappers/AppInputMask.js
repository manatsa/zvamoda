import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MaskedTextInput } from "react-native-mask-text";
import MaskInput, { Masks } from "react-native-mask-input";

export default function AppInputMask() {
  const [phone, setPhone] = useState("");

  return (
    <View style={styles.container}>
      <MaskInput
        value={phone}
        onChangeText={(masked) => {
          setPhone(masked);
        }}
        keyboardType="numeric"
        mask={Masks.DATE_DDMMYYYY}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 0.5,
  },
});
