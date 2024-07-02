// Modall.js
import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setModalVisible } from '../redux/slice/slice';

const Modall = () => {
  const dispatch = useDispatch()
const {modalVisible, selectedImg} = useSelector((state) => state.users)


const handleCloseModal  = () => {
  dispatch(setModalVisible(false))
}


    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  handleCloseModal(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{selectedImg?.description}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={handleCloseModal}>
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 60,
        padding: 10,
        elevation: 6,
        
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        // width:1
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default Modall;
