import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { auth, database } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const saveQuizData = async (quizData) => {
    try {
        const quizCollectionRef = collection(database, 'quizzes');
        await addDoc(quizCollectionRef, quizData);
        console.log('Quiz data saved successfully!');
    } catch (error) {
        console.error('Error saving quiz data:', error);
    }
};


const QuizForm = () => {
    const navigation = useNavigation();
    const [question, setQuestion] = useState('');
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([
        {
            id: 1,
            options: "A",
            answer: ""
        },
        {
            id: 2,
            options: "B",
            answer: ""
        },
        {
            id: 3,
            options: "C",
            answer: ""
        },
        {
            id: 4,
            options: "D",
            answer: ""
        },
    ]);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState('');

    const handleFormSubmit = () => {
        const quizData = {
            title: title,
            questions: questions,
            name: auth.currentUser.email
        };
        console.log(questions);
        saveQuizData(quizData);
    };

    const handleAddQuestion = (value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questions.length] = value;
        setQuestions(updatedQuestions);
        setQuestion('');
        setOptions([
            {
                id: 1,
                options: "A",
                answer: ""
            },
            {
                id: 2,
                options: "B",
                answer: ""
            },
            {
                id: 3,
                options: "C",
                answer: ""
            },
            {
                id: 4,
                options: "D",
                answer: ""
            },
        ]);
        setCorrectAnswerIndex('');
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index].answer = value;
        setOptions(updatedOptions);
    };
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ alignItems:"flex-start", width:"50%", marginRight: 10 }}>
                    <FontAwesome name="home" size={30} color="#F88379" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('QuizList')}style={{ alignItems:"flex-end", width:"50%", marginRight: 10 }}>
                    <FontAwesome name="list" size={30} color="#F88379" />
                </TouchableOpacity>
            </View>
            <Text style={styles.pageTitle}>ADD YOUR QUIZ</Text>
            <TextInput
                value={title}
                style={styles.titleInput}
                onChangeText={setTitle}
                placeholder="title of this quiz"
            />
            <View style={styles.questionContainer}>
                <Text style={styles.optionLabel}>{questions.length + 1}</Text>
                <TextInput
                    value={question}
                    style={styles.questionInput}
                    onChangeText={setQuestion}
                    placeholder="Question"
                />
            </View>
            {options.map((option, index) => (
                <View key={option.id} style={styles.optionContainer}>
                    <Text style={styles.optionLabel}>{String.fromCharCode(65 + index)}</Text>
                    <TextInput
                        value={option.answer}
                        style={styles.optionInput}
                        onChangeText={(answer) => { handleOptionChange(option.id - 1, answer) }}
                        placeholder={`Option ${option.options}`}
                    />
                </View>
            ))}
            <Picker
                selectedValue={correctAnswerIndex}
                style={styles.picker}
                onValueChange={(value) => setCorrectAnswerIndex(parseInt(value))}
            >
                <Picker.Item label="Select correct answer" value={null} />
                {options.map((option, index) => (
                    <Picker.Item key={index} label={option.options} value={index} />
                ))}
            </Picker>
            <View style={{ display: 'flex', flexDirection: 'row', width: "100%" }}>
                <View style={{ alignItems: 'flex-start', width: "50%" }}>
                    <Pressable
                        onPress={handleFormSubmit}
                        style={{
                            backgroundColor: '#4CAF50',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 10,
                        }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>Save Quiz </Text>
                    </Pressable>
                </View>
                <View style={{ alignItems: 'flex-end', width: "50%" }}>
                    <Pressable
                        onPress={() => handleAddQuestion({ question, options, correctAnswerIndex })}
                        style={{
                            backgroundColor: '#4CAF50',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 10,
                        }} >
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>add question</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:'10%',
        alignItems: 'center',
        padding: 20,
    },
    pageTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 5,
    },
    titleInput: {
        width: '100%',
        height: 40,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    questionInput: {
        height: 80,
        flex: 1,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    questionContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    optionLabel: {
        width: 30,
        marginRight: 10,
        fontSize: 16,
    },
    optionInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    picker: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'gray',
    },
});

export default QuizForm;
