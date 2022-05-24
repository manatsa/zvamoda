import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  Animated,
} from "react-native";
import colors from "../config/Colors";
import AppText from "./AppText";
// import { Swipeable, RectButton } from 'react-native-gesture-handler';

function ListItem({
  imageSource,
  title,
  subTitle,
  onPress,
  renderRightActions,
}) {
  return (
    //<Swipeable renderRightActions={renderLeftActions}>
    <TouchableHighlight onPress={onPress} underlayColor={"lightgrey"}>
      <View style={styles.detailsContainer}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.details}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
        </View>
      </View>
    </TouchableHighlight>
    //</Swipeable>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: "row",
    width: "100%",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    padding: 10,
    margin: 20,
  },
  details: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 25,
    color: colors.secondary,
  },
  subTitle: {
    fontSize: 18,
    color: "grey",
  },
});

export default ListItem;
