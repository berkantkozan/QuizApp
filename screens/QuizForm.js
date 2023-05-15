import React, { useState } from 'react';
import { View, TextInput, Text, Button, Picker, StyleSheet } from 'react-native';
import { auth, database } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

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
                onValueChange={(value) => setCorrectAnswerIndex(value)}
            >
                <Picker.Item label="Select correct answer" value={null} />
                {options.map((option, index) => (
                    <Picker.Item key={index} label={option.options} value={index} />
                ))}
            </Picker>
            <Button onPress={() => handleAddQuestion({ question, options, correctAnswerIndex })} title="Add new question" />
            <Button onPress={handleFormSubmit} title="Save Quiz Data" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
        width: '100%',
        height: 80,
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
