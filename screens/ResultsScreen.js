import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
const ResultsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // console.log(route.params);
  return (
    <SafeAreaView style={{ margin: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text>Your Results</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 14,
          }}
        >
          <Text>Share</Text>
          <AntDesign
            style={{ marginLeft: 4 }}
            name="sharealt"
            size={18}
            color="black"
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <Text>Questions Answered</Text>
        <Text>({route.params.answers.length}/{route.params.answers.length})</Text>
      </View>

      <Pressable
        style={{
          backgroundColor: "white",
          height: 220,
          borderRadius: 7,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "magenta",
            fontSize: 15,
            fontWeight: "500",
            textAlign: "center",
            marginTop: 8,
          }}
        >
          Score Card
        </Text>
        <FlatList
          numColumns={2}
          data={route.params.answers}
          renderItem={({ item, i }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                margin: 10,
                flexDirection: "row",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <Text>{item.question}</Text>
              {item.answer === true ? (
                <AntDesign style={{ marginLeft: 5 }} name="checkcircle" size={20} color="green" />
              ) : (
                <AntDesign style={{ marginLeft: 5 }} name="closecircle" size={20} color="red" />
              )}
            </View>
          )}
        />
        <Text
          style={{
            color: "magenta",
            fontSize: 30,
            fontWeight: "500",
            textAlign: "center",
            margin: 10,
          }}
        >
          RESULT : {route.params.points} / 100 POINTS
        </Text>

        <Pressable style={{ backgroundColor: "green", padding: 8, marginLeft: "auto", marginRight: "auto", marginBottom: 20, borderRadius: 5 }}>
          <Text onPress={() => navigation.navigate("QuizList")} style={{ color: "white", textAlign: "center" }}>Continue</Text>
        </Pressable>
      </Pressable>
    </SafeAreaView>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({});
