import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';


 const TodoBtn = ({ addTask, editingIndex }) => {
    console.log("renderrrring",addTask, editingIndex,"op" );
    return (
        <View style={styles.inputContainer}>

            <TouchableOpacity style={styles.addButton} onPress={addTask}>
                <Text style={styles.addButtonText}>{editingIndex !== null ? 'Update' : 'Add'}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 230
    },

    addButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
export default React.memo(TodoBtn) 