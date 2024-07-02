import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCartStart, selectCartById, setRemoveQuantityStart, setaddMoreQuantityStart } from '../redux/slice/GetCartSlice';
import { useUserId } from '../UserContext/UserContext';
import { deleteStart } from '../redux/slice/deleteSlice';
import CheckBox from 'expo-checkbox'
import SubTotal from './SubTotal'


const AddCart = () => {
    const { userId } = useUserId();
    const dispatch = useDispatch();
    const { cartById, isLoading, error } = useSelector(selectCartById);


    useEffect(() => {
        dispatch(getCartStart(userId));
    }, [dispatch, userId]);

    const handleAddQuantity = (cartItemId) => {
        const selectedItem = cartById.find(item => item.cart_item_id === cartItemId);
        if (!selectedItem) return;

        const newQuantity = selectedItem.cart_item_quantity + 1;
        if (newQuantity > 10) return;
        const totalPrice = calculateTotalPrice(selectedItem, newQuantity);
        const payload = { cartItemId, quantity: newQuantity, totalByProduct: totalPrice };
        dispatch(setaddMoreQuantityStart(payload));
        dispatch(getCartStart(userId));
    }

    const calculateTotalPrice = (item, quantity) => {
        const totalPrice = item.price * quantity;
        return totalPrice.toFixed(2);
    }

    const handleRemoveQuantity = (cartItemId) => {
        const selectedItem = cartById.find(item => item.cart_item_id === cartItemId);
        if (!selectedItem) return;

        const newQuantity = selectedItem.cart_item_quantity - 1;

        if (newQuantity < 1) return;

        const totalPrice = calculateTotalPrice(selectedItem, newQuantity);
        const payload = { cartItemId, quantity: newQuantity, totalByProduct: totalPrice };
        dispatch(setRemoveQuantityStart(payload));
        dispatch(getCartStart(userId));
    }


    const handleDeleteCart = (cartItemId) => {
        dispatch(deleteStart({ cartItemId: cartItemId }))
        dispatch(getCartStart(userId));

    }


    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {cartById.map((item) => (
                    <View key={item.id} style={styles.itemContainer}>

                        <View style={styles.itemContent}>
                            <Image source={{ uri: item.image_url }} style={styles.productImage} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.itemCategoryName}>{item.category_name}</Text>

                                <Text style={styles.priceText}>₹{calculateTotalPrice(item, item.cart_item_quantity)}</Text>
                                <Text style={styles.eligibleProduct}>Eligible for FREE Shipping</Text>

                                <Text style={styles.inStock}>In stock</Text>
                                <Text style={styles.itemReplacement}>{item.category_replacement_days} {item.category_replacement_description}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => handleRemoveQuantity(item.cart_item_id)}>
                                <Text style={styles.quantityAddButton}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{item.cart_item_quantity}</Text>
                            <TouchableOpacity onPress={() => handleAddQuantity(item.cart_item_id)}>
                                <Text style={styles.quantityRemoveButton}>+</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleDeleteCart(item.cart_item_id)}>
                                <Text style={styles.removeFromCart}>Remove</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                ))}
                <SubTotal />
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "white"
    },
    scrollContainer: {
        paddingVertical: 20,
    },
    itemContainer: {
        flexDirection: 'column',
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#F5F5F5",
        marginBottom: 30
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemDetails: {
        flex: 1,
        marginLeft: 10,
    },
    productImage: {
        width: 123,
        height: 125,
        marginRight: 10,
    },
    priceText: {
        fontSize: 17,
    },
    productName: {
        fontSize: 16,
    },
    itemCategoryName: {
        fontSize: 14,
    },
    eligibleProduct: {
        fontSize: 12,
        color: "grey"

    },
    itemReplacement: {
        fontSize: 12,
        color: "#0987b5"
    },
    inStock: {
        fontSize: 12,
        color: "green"
    },
    quantityAddButton: {
        paddingHorizontal: 15,
        paddingVertical: 6,
        backgroundColor: '#F5F5F5',
        marginTop: 10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderColor: '#cecdd1',
        borderWidth: 1,
    },

    quantityRemoveButton: {
        paddingHorizontal: 15,
        paddingVertical: 6,
        backgroundColor: '#F5F5F5',
        marginTop: 10,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderColor: '#cecdd1',
        borderWidth: 1,
    },
    removeFromCart: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        color: "black",
        backgroundColor: "#ffffff",
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 5,
        borderColor: '#cecdd1',
        borderWidth: 1,
    },
    quantityText: {
        fontSize: 16,
        borderWidth: 1,
        paddingHorizontal: 19,
        paddingVertical: 4.9,
        borderColor: '#cecdd1',
        borderRadius: 0,
        backgroundColor: "#ffffff",
        marginTop: 10,

    },
});



export default AddCart;
