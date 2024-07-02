import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TodoBtn from './BtnTodo';
import { useCallback } from 'react';

export default function Todo() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [check, setCheck] = useState("")
    const [editedIndex, setEditedIndex] = useState(null);

    const addTask = useCallback(() => {
        if (newTask.trim() !== '') {
            if (editingIndex !== null) {
                const updatedTasks = [...tasks];
                updatedTasks[editingIndex] = newTask;
                setTasks(updatedTasks);
                setEditingIndex(null);
            } else {
                setTasks([...tasks, newTask]);
            }
            setNewTask('');
        }
    },[newTask,editingIndex,tasks])
//  const addTask = () => {
//     if (newTask.trim() !== '') {
//         if (editingIndex !== null) {
//             const updatedTasks = [...tasks];
//             updatedTasks[editingIndex] = newTask;
//             setTasks(updatedTasks);
//             setEditingIndex(null);
//         } else {
//             setTasks([...tasks, newTask]);
//         }
//         setNewTask('');
//     }
// }


    const editTask = (index) => {
        setNewTask(tasks[index]);
        setEditingIndex(index);
        setEditedIndex(index);
    };

    const deleteTask = (index) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this task?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        const updatedTasks = [...tasks];
                        updatedTasks.splice(index, 1);
                        setTasks(updatedTasks);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Tasks</Text>
            {tasks?.length === 0 ? (
                <View style={styles.create}>
                    <Text style={styles.text}>Do Something</Text>
                    <TextInput style={styles.inputt} value={check} onChangeText={(check) => setCheck(check)}
 />

                </View>
            ) : null}

            <View style={styles.content}>
                <ScrollView style={styles.scrollView}>
                    {tasks.map((task, index) => (
                        <View key={index} style={[styles.contentContainer,index === editedIndex ? styles.inputEditing : null]}>
                            <Text style={styles.contentText }>{task}</Text>
                            <TouchableOpacity onPress={() => editTask(index)}>
                                <Text style={styles.editButton}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteTask(index)}>
                                <Text style={styles.deleteButton}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>


                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a new task"
                        value={newTask}
                        onChangeText={(text) => setNewTask(text)}
                    />
                    <TodoBtn
                        addTask={addTask}
                        editingIndex={editingIndex}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'left',
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 100
        // marginRight: 1,
        // padding: 1,
    },
    inputt: {
        // flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginRight: 10,
        width:100,
        padding: 8,
    },
    create: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 16,
    },
    contentText: {
        flex: 1,
        fontSize: 18,
    },
    inputEditing: {
        borderColor: '#58c791', 
    },
    editButton: {
        color: 'blue',
        marginLeft: 10,
    },
    deleteButton: {
        color: 'red',
        marginLeft: 10,
    },
    text: {
        color: 'gray'
    },
    scrollView: {
        flex: 1,
        marginBottom: 10,
    }
});
