import { useFormikContext } from "formik";
import * as React from "react";
import {
  LogBox,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackComponent,
  View,
} from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import Colors from "../../config/Colors";
import { AppErrorMessage } from "../form";
import AppText from "./AppText";

export default function AppDateComponent({ name, label, placeholder, color }) {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState(new Date(2000, 1, 1));
  const { values, errors, setFieldValue, touched } = useFormikContext();
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  React.useEffect(() => {
    LogBox.ignoreLogs(["undefined is not registered, key"]);
  }, []);

  const onChange = React.useCallback(({ date }) => {
    setVisible(false);
    const dateVal = new Date(String(date)).toISOString().slice(0, 10);
    setFieldValue(name, dateVal);
  }, []);

  return (
    <>
      <View>
        <AppText>{label}</AppText>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <TouchableWithoutFeedback onPress={() => setVisible(true)}>
            <View style={{ width: "80%" }}>
              <TextInput
                editable={true}
                style={styles.dateText}
                value={
                  typeof values[name] === "string"
                    ? values[name]
                    : new Date(String(values[name])).toISOString().slice(0, 10)
                }
                onChangeText={(val) => setFieldValue(name, val)}
                placeholder={
                  placeholder
                    ? placeholder + " ( YYYY - MM-dd )"
                    : " ( YYYY - MM-dd )"
                }
                keyboardType={"numeric"}
              />
            </View>
          </TouchableWithoutFeedback>

          <IconButton
            icon={"calendar"}
            size={30}
            color={Colors.primary}
            onPress={() => setVisible(true)}
          />
          <DatePickerModal
            disableStatusBarPadding={false}
            inputFormat={"dd-mm-yyyy"}
            mode="single"
            visible={visible}
            onDismiss={onDismiss}
            date={values[name] ? new Date(values[name]) : new Date()}
            onConfirm={onChange}
            onChange={onChange}
            saveLabel="." // optional
            label={label} // optional
            animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
          />
        </View>
        {<Text>{errors?.length}</Text>}
        <AppErrorMessage message={errors[name]} visible={touched[name]} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dateText: {
    width: "100%",
    color: Colors.primary,
    backgroundColor: Colors.light,
    marginVertical: 10,
  },
});
