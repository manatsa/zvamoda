import React from "react";
import { useToast } from "react-native-toast-notifications";

const show = (message, type, position, duration, anim) => {
  const toast = useToast();
  return toast.show(message, {
    type: type || "normal",
    placement: position || "bottom",
    duration: duration || 3000,
    offset: 30,
    animationType: anim || "zoom-in",
  });
};

export default show;
