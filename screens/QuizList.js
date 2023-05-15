import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../firebase';
import { useNavigation } from "@react-navigation/native";

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
            <TouchableOpacity style={styles.quizItem} onPress={() => handleQuizPress(item.questions)}>
                <Text style={styles.quizTitle}>{item.title}</Text>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Created by: {item.name}</Text>
                </View>
            </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
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
        padding: 20,
    },
    quizItem: {
        marginBottom: 10,
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 5,
    },
    quizTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 5,
        alignItems: 'end',
    },
    footerText: {
        fontSize: 14,
        color: 'gray',
    },
});

export default QuizList;
