import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [quizTitle, setQuizTitle] = useState('');

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Logout successful
        navigation.navigate('Login');
      })
      .catch((error) => {
        // An error occurred during logout
        console.error('Error during logout:', error);
      });
    }


  return (
    <View style={{ marginTop: 15 }}>
      <Image
        style={{ height: 370, width: "100%", resizeMode: "contain" }}
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9k2hf2J5rbVVpb4Z1Gy4y9D0vWZHQnA1dW6GxHchAKtufJapZ_bJOkZ_ESB3nDoSvgFw&usqp=CAU",
        }}
      />

      <View style={{ padding: 10 }}>
        <Text
          style={{
            textAlign: "center",
            color: "magenta",
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          QUIZ RULES
        </Text>

        <View
          style={{
            padding: 10,
            backgroundColor: "#F88379",
            borderRadius: 6,
            marginTop: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Text style={{ color: "white" }}>•</Text>
            <Text
              style={{
                marginLeft: 4,
                color: "#722F37",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              For each correct answer you get 5 points
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Text style={{ color: "white" }}>•</Text>
            <Text
              style={{
                marginLeft: 4,
                color: "#722F37",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              There is no negative marking for wrong answer
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Text style={{ color: "white" }}>•</Text>
            <Text
              style={{
                marginLeft: 4,
                color: "#722F37",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              Each question has a time limit of 15 sec
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Text style={{ color: "white" }}>•</Text>
            <Text
              style={{
                marginLeft: 4,
                color: "#722F37",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              You should answer all the questions compulsarily
            </Text>
          </View>
        </View>
      </View>
      <View style={{  flexDirection: 'row', justifyContent: 'center',alignItems: 'center', marginTop:'35%' ,marginBottom: 20, width:'100%' }}>
        <TouchableOpacity onPress={() => navigation.navigate('QuizForm')} style={{ marginRight: '15%', marginLeft:'15%' }}>
          <FontAwesome name="plus" size={70} color="#F88379" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('QuizList')} style={{ marginRight: '15%' }}>
          <FontAwesome name="list" size={70} color="#F88379" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}style={{ marginRight: '15%' }}>
          <FontAwesome name="sign-out" size={70} color="#F88379" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
