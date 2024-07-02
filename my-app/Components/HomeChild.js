import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getProductStart } from '../redux/slice/ProductSlice';
import { addToCartStart } from '../redux/slice/cartSlice';
import { useUserId } from '../UserContext/UserContext';
import DropDownPicker from 'react-native-dropdown-picker';
import { categoriesAllType } from '../redux/slice/categorySlice';
import { getCartStart, selectCartById } from '../redux/slice/GetCartSlice';
import { useNavigation } from '@react-navigation/native';
import PopupMessage from './Messages/PopupMessage';
import Spinner from 'react-native-loading-spinner-overlay';



export default function HomeChild() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { productItems} = useSelector(getAllProducts);
  const { cartById } = useSelector(selectCartById);
  const { getAllCategory } = useSelector(categoriesAllType);
  const { userId } = useUserId();
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [filteredProductItems, setFilteredProductItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  useEffect(() => {
    if (value && value !== 'All') {
      const filteredItems = productItems.filter(product => product.category_name === value);
      setFilteredProductItems(filteredItems);
    } else {
      setFilteredProductItems(productItems);
    }
  }, [value, productItems]);

  useEffect(() => {
    dispatch(getProductStart());
    dispatch(getCartStart(userId));

  }, [dispatch]);

  const handleAddToCart = (productId, productprice) => {
    
    const payload = { user_id: userId, product_id: productId, quantity: 1, totalByProduct: productprice };
    dispatch(addToCartStart(payload));
    setPopupMessage('Product added to cart successfully!');
    setShowPopup(true);
    dispatch(getCartStart(userId));
    // setTimeout(() => {
    //   setIsSecondButtonLoading(true);
    // }, 1000);


  }

  const dropValues = [{ label: 'All', value: 'All' }, ...getAllCategory.map((category, index) => ({
    label: category.name,
    value: category.name,
  }))];

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={dropValues}
        setOpen={setOpen}
        setValue={setValue}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredProductItems.map((product, index) => (
          <View key={product.id} style={styles.productContainer}>
            <Image source={{ uri: product.image_url }} style={styles.productImage} />
            <View style={styles.productDetails}>
   
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productCategory}>{product.category_name}</Text>
              <Text style={styles.productPrice}>₹{product.price}</Text>
              <Text style={styles.productDescription}>{product.description}</Text>
              <TouchableOpacity
                onPress={() => {
                  if (userId && cartById.some(item => item.cart_product_id === product.id && item.cart_user_id === userId)) {
                    navigation.navigate('AddCart');
                  } else {
                    handleAddToCart(product.id, product.price);
                  }
                }}
                style={[
                  styles.addToCartButton,
                  userId && cartById.some(item => item.cart_product_id === product.id && item.cart_user_id === userId) ? styles.viewCartButton : null
                ]}
              >
                <Text style={[styles.addToCartButtonText, userId && cartById.some(item => item.cart_product_id === product.id && item.cart_user_id === userId) ? styles.viewCartButton : null]}>
                  {userId && cartById.some(item => item.cart_product_id === product.id && item.cart_user_id === userId) ? 'View Cart' : 'Add to Cart'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      {showPopup && <PopupMessage message={popupMessage} visible={showPopup} setVisible={setShowPopup} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  viewCartButton: {
    backgroundColor: '#ffd447',
    color: "black"
  },
  checkbox: {
    alignSelf: 'right',
  },
});
