import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../firebase';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';

const QuizList = () => {
    const navigation = useNavigation();
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const querySnapshot = await getDocs(collection(database, 'quizzes'));
                const quizzesData = [];
                querySnapshot.forEach((doc) => {
                    const quiz = {
                        id: doc.id,
                        ...doc.data(),
                    };
                    quizzesData.push(quiz);
                });
                setQuizzes(quizzesData);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    const handleQuizPress = (questions) => {
        console.log(questions);
        navigation.navigate('Quiz', { questions });
    };

    const renderQuizItem = ({ item }) => (
        <View style={styles.quizItem}>
            <Text style={styles.quizTitle}>{item.title}</Text>
            <View style={styles.footer}>
                <Pressable
                    onPress={() => handleQuizPress(item.questions)}
                    style={{
                        backgroundColor: "magenta",
                        padding: 10,
                        width: 120,
                        margin: 5,
                    }}
                >
                    <Text style={{ color: "white", fontWeight: "600", textAlign: "center" }}>Start Quiz</Text>
                </Pressable>
                <Text style={styles.footerText}>Created by: {item.name}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ alignItems: "flex-start", width: "50%", marginRight: 10 }}>
                    <FontAwesome name="home" size={30} color="#F88379" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('QuizForm')} style={{ alignItems: "flex-end", width: "50%", marginRight: 10 }}>
                    <FontAwesome name="plus" size={30} color="#F88379" />
                </TouchableOpacity>
            </View>
            <View style={styles.headerTitle}>
                <Text style={styles.quizTitle}>QUIZZES</Text>
            </View>
            <FlatList
                data={quizzes}
                renderItem={renderQuizItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:'10%',
        padding: 20,
    },
    headerTitle: {
        width: '100%',
        alignItems: 'center'
    },
    quizItem: {
        marginBottom: 10,
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 5,
    },
    quizTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 5,
    },
    footer: {
        marginTop: 5,
        alignItems: 'flex-end',
    },
    footerText: {
        fontSize: 14,
        color: 'gray',
    },
});

export default QuizList;
