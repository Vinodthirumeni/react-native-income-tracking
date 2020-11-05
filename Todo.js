import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Todo = ({ description,amount }) => {
  return (
    <View>
      <Text style={styles.titleText}>{description}</Text>
      <Text style={styles.titleText}>${amount}</Text>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  titleText: {
    marginLeft: 10,
  },
});
