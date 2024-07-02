import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUp from './Components/SignUp';
import { UserIdProvider } from './UserContext/UserContext';
import Login from './Components/Login';
import HomeChild from './Components/HomeChild';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Todo from './Components/Todo/Todo';
import { Drawer } from 'react-native-drawer-layout';
import More from './Components/More';
import Care from './Components/Care';
import store from "./redux/store";
import { Provider, useSelector } from 'react-redux';
import AddCart from './Components/Addcart';
import { selectCartById } from './redux/slice/GetCartSlice';




const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const HomeTabs = () => {
  const navigation = useNavigation();
  const [showNotificationIcon, setShowNotificationIcon] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { cartById } = useSelector(selectCartById);

  const cartLength = cartById.length



  const handleNotificationPress = () => {
    setOpenDrawer(!openDrawer);

  };

  const renderSettingsHeader = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon
        name="arrow-back-outline"
        size={25}
        color="#000"
        style={{ marginLeft: 1 }}
      />
    </TouchableOpacity>
  );


  const renderNotificationIcon = () => {
    if (showNotificationIcon) {
      return (
        <Icon
          name="notifications-outline"
          size={25}
          color="white"
          style={{ marginRight: 10 }}
          onPress={handleNotificationPress}
        />
      );
    }
    return null;
  };


  const search = () => {
    return (

      <TextInput
        placeholder="Search"
        placeholderTextColor="#292e2b"
        style={styles.searchInput}
      // onPress={handleNotificationPress}
      />

    )
    // return null;
  };

  return (
    <>
      <Drawer
        open={openDrawer}
        onOpen={() => setOpenDrawer(true)}
        drawerStyle={{ width: "100%" }}
        onClose={() => setOpenDrawer(false)}
        renderDrawerContent={() => (
          <View>
            <View style={styles.drawerHeader}>
              <TouchableOpacity style={styles.notifyArrow} onPress={() => setOpenDrawer(false)}>
                <Icon name="arrow-back-outline" size={25} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.drawerHeaderText}>Notification</Text>
            </View>

            <View style={styles.Notifi}>
              <Text>No Data Available...</Text>
            </View>
          </View>
        )}
      >
        <Tab.Navigator screenOptions={({ route }) => ({
          headerShown: true,
          tabBarStyle: {
            height: 70,
            paddingHorizontal: 5,
            paddingTop: 1,
            backgroundColor: 'white',
            position: 'absolute',
            borderTopWidth: 0,


          },
        })}>
          <Tab.Screen
            name="HomeChild"
            component={HomeChild}
            options={{
              headerLeft: search,
              headerStyle: {
                backgroundColor: '#58c791',
              },
              headerRight: renderNotificationIcon,
              tabBarLabel: 'Home',
              headerTitle: "",
              tabBarIcon: ({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              ),
            }}
          />



          <Tab.Screen
            name="Todo"
            component={Todo}
            options={{
              headerLeft: () => (
                <Icon
                  name="arrow-back-outline"
                  size={25}
                  color="#000"
                  style={{ marginLeft: 10 }}
                  onPress={() => navigation.goBack()}
                />
              ),
              headerRight: renderNotificationIcon,
              tabBarIcon: ({ color, size }) => (
                <Icon name="menu-outline" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="AddCart"
            component={AddCart}
            options={{
              tabBarBadge: cartLength,

              headerStyle: {
                backgroundColor: '#58c791',
              }, headerShown: true,

              tabBarIcon: ({ color, size }) => (
                <Icon name="cart-outline" color={color} size={size} />
              ),
            }}
          />





          <Tab.Screen
            name="Care"
            component={Care}
            options={{
              headerLeft: () => (
                <Icon
                  name="arrow-back-outline"
                  size={25}
                  color="#000"
                  style={{ marginLeft: 10 }}
                  onPress={() => navigation.goBack()}
                />
              ),
              headerRight: renderNotificationIcon,
              tabBarIcon: ({ color, size }) => (
                <Icon name="menu-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={More}

            options={{
              headerTitle: renderSettingsHeader,
              headerRight: renderNotificationIcon,
              tabBarIcon: ({ color, size }) => (
                <Icon
                  name="ellipsis-horizontal-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </Drawer>
    </>
  );
};

export default function App() {
  return (
    <>
      <Provider store={store}>
        <UserIdProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
              <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
              <Stack.Screen name='Signup' component={SignUp} options={{ headerShown: false }} />
              <Stack.Screen name='HomeChild' component={HomeTabs} options={{ headerShown: false }} />
              <Stack.Screen name='AddCart' component={AddCart} options={{ headerShown: true }} />


            </Stack.Navigator>
          </NavigationContainer>
        </UserIdProvider>
      </Provider>

    </>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#58c791',
    height: 85,
    padding: 16,
  },
  drawerHeaderText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 16,
    marginTop: 25
  },
  notifyArrow: {
    marginTop: 25
  },
  Notifi: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    color: "black",
    fontSize: 18,

  },
  searchInput: {
    marginLeft: 25,
    width: 180,
    padding: 4,
    color: "black",
    borderColor: 'black',
    borderRadius: 30,
    backgroundColor: "#beedd6"
  }
})
