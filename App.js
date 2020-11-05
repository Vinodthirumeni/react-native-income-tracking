import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Button,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import Todo from "./Todo";
import { BarChart, LineChart } from "react-native-chart-kit";
import moment from "moment";

const App = () => {
  const [description, setDescriptions] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([
    { date: moment().format("LL"), amount: 2000 },
    { date: moment().subtract(1, "days").format("LL"), amount: 2500 },
    { date: moment().subtract(1, "days").format("LL"), amount: 3500 },
    { date: moment().subtract(3, "days").format("LL"), amount: 4500 },
    { date: moment().subtract(3, "days").format("LL"), amount: 5500 },
    { date: moment().subtract(1, "days").format("LL"), amount: 5500 },
    { date: moment().subtract(4, "days").format("LL"), amount: 4500 },
    { date: moment().subtract(5, "days").format("LL"), amount: 5500 },
    { date: moment().subtract(6, "days").format("LL"), amount: 5500 },
    { date: moment().subtract(7, "days").format("LL"), amount: 4500 },
    { date: moment().subtract(8, "days").format("LL"), amount: 5500 },
    { date: moment().subtract(9, "days").format("LL"), amount: 5500 },
  ]);

  const [gigs, setGigs] = useState([
    {
      description: "Frelance with vinod",
      amount: 500,
      timestamp: new Date(),
    },
  ]);

  const [transformdData, setTransformddata] = useState([]);

  useEffect(() => {
    setTransformddata(transformData(groupBy(data, "date")));
  }, [data]);

  const groupBy = (xs, key) =>
    xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});

  const transformData = (groupedData) => {
    const transformedArray = [];
    Object.entries(groupedData).forEach((entry) => {
      const total = entry[1].reduce((total, pair) => total + pair.amount, 0);
      transformedArray.push({
        date: moment(entry[0]).format("DD"),
        amount: total,
      });
    });
    const sortedArray = transformedArray.sort((a, b) => a["date"] - b["date"]);
    return sortedArray;
  };

  const addGig = () => {
    setGigs([
      {
        description: description,
        amount: amount,
      },
      ...gigs,
    ]);

    setData([
      ...data,
      {
        date: moment().format("LL"),
        amount: Number(amount),
      },
    ]);
    setDescriptions("");
    setAmount("");
  };

  const getDates = () => {
    const dates = transformdData.map((pair) => pair.date);
    return dates;
  };

  const getAmount = () => {
    const amounts = transformdData.map((pair) => pair.amount);
    return amounts;
  };

  useEffect(() => {
    const total = gigs.reduce((total, gig) => {
      return total + Number(gig.amount);
    }, 0);
    setTotal(total);
  }, [gigs]);

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Text style={styles.titleText}>This is todo app</Text>

      <LineChart
        data={{
          labels: getDates(),
          datasets: [{ data: getAmount() }],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        // yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: null, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <View style={styles.view}>
        <Text>Total income ${total} </Text>
        <TextInput
          style={styles.todoInput}
          value={description}
          placeholder="Enter the description..."
          onChangeText={(text) => setDescriptions(text)}
        />

        <TextInput
          style={styles.todoInput}
          value={amount}
          placeholder="Enter the amount you made..."
          keyboardType="numeric"
          onChangeText={(text) => setAmount(text)}
        />

        <Button
          disabled={!amount && !description}
          title="Add Gig"
          onPress={addGig}
        />

        {gigs?.map((gig) => (
          <Todo description={gig.description} amount={gig.amount} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  todoInput: {
    height: 40,
    borderColor: "red",
    borderWidth: 1,
    margin: 5,
  },
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  view: {
    marginLeft: 10,
  },
});
