import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-date-picker";
import { Alert, Button, Text, View } from "react-native";

// const DatePicker = require("react-native-date-picker");

const DatePickerExample = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        cancelText="Close"
        open={open}
        date={date}
        mode={"date"}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
          Alert.alert("Selected Date", date.toISOString().slice(0, 10));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default DatePickerExample;
