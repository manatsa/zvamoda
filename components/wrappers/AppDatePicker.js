import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFormikContext } from "formik";
import Colors from "../../config/Colors";
import AppText from "./AppText";
import { IconButton } from "react-native-paper";
import { AppErrorMessage } from "../form";
import AppTextInput from "./AppTextInput";
import DatePicker from "react-native-date-picker";

export default function AppDatePicker({ name, label, placeholder, color }) {
  const { values, errors, setFieldValue, touched } = useFormikContext();
  const [visible, setVisible] = React.useState(false);

  const onChange = (selectedDate) => {
    const currentDate = selectedDate || new Date();
    setFieldValue(name, currentDate);
    setVisible(false);
  };

  return (
    <View>
      <AppText>{label}</AppText>
      <View style={{ width: "100%", flexDirection: "row" }}>
        <TouchableWithoutFeedback onPress={() => setVisible(true)}>
          <View style={{ width: "80%" }}>
            <TextInput
              editable={false}
              style={styles.dateText}
              value={
                typeof values[name] === "string"
                  ? values[name]
                  : values[name]
                  ? new Date(String(values[name])).toISOString().slice(0, 10)
                  : null
              }
              onChangeText={(val) => setFieldValue(name, val)}
              placeholder={" ( YYYY - MM-dd )"}
            />
          </View>
        </TouchableWithoutFeedback>

        <IconButton
          icon={"calendar"}
          size={30}
          color={Colors.primary}
          onPress={() => setVisible(true)}
        />
        <DatePicker
          modal
          cancelText="Close"
          androidVariant="nativeAndroid"
          open={visible}
          date={values[name] || new Date()}
          mode={"date"}
          onConfirm={(date) => {
            onChange(date);
          }}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </View>
      <AppErrorMessage message={errors[name]} visible={touched[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  dateText: {
    width: "100%",
    color: Colors.primary,
    backgroundColor: Colors.light,
    marginVertical: 10,
    minHeight: 50,
  },
});
