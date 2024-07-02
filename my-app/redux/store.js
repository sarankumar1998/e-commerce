// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import usersReducer from './slice/slice';
import productReducer from './slice/ProductSlice';
import cardReducer from './slice/cartSlice';
import rootSagaMain from './saga/rootSaga';
import getCartReducer from './slice/GetCartSlice'
import addQuantityReducer from './slice/GetCartSlice'
import removeMoreQuantityReducer from './slice/GetCartSlice'
import deletedItemReducer from './slice/deleteSlice'
import getAllCategoryReducer from './slice/categorySlice'
import subTotalByIdReducer from './slice/SubTotallingSlice'


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    productItems: productReducer,
    users: usersReducer,
    cart: cardReducer,
    cartById: getCartReducer,
    addMoreQuantity:addQuantityReducer,
    removeMoreQuantity:removeMoreQuantityReducer,
    deletedItem:deletedItemReducer,
    getAllCategory:getAllCategoryReducer,
    subTotalById:subTotalByIdReducer
    

  },
  middleware: () => [sagaMiddleware]
});

sagaMiddleware.run(rootSagaMain);

export default store;
