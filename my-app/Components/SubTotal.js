import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getsubTotalStart, selectSubTotalById } from '../redux/slice/SubTotallingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useUserId } from '../UserContext/UserContext';

export default function SubTotal() {
    const { userId } = useUserId();
    const dispatch = useDispatch()
    const { subTotalById, isLoading, error } = useSelector(selectSubTotalById);
    useEffect(() => {
        dispatch(getsubTotalStart(userId));
    }, [dispatch, userId]);


    return (
        <View style={styles.container}>
    <Text style={styles.label}>Price Details</Text>
        {subTotalById ? (
            <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Sub total ({subTotalById.subTotalQuantity} items)</Text>
                <Text style={styles.priceAmount}>₹ {subTotalById.subTotalAmount}</Text>
            </View>
        ) : (
            <Text style={styles.emptyCartText}>Cart is empty</Text>
        )}
        </View>
        
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 50,
        backgroundColor: "#F5F5F5",
        padding: 10,
    },
    label: {
        fontSize: 18,
        // margin:10,

        fontWeight: 'bold',
        marginBottom: 10,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    priceLabel: {
        fontSize: 16,
        flex: 1,
    },
    priceAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyCartText: {
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 10,
    }
    
});
