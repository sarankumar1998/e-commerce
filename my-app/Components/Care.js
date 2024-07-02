import React, { useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getAllData, getUsersStart, setModalVisible, setSelectedImg } from '../redux/slice/slice';
import Modall from './Modall';

function Care() {
  const dispatch = useDispatch();
  const { users } = useSelector(getAllData);

  useEffect(() => {
    dispatch(getUsersStart());
  }, [dispatch]);

  const handleImagePress = (photo) => {
    dispatch(setModalVisible(true));
    dispatch(setSelectedImg(photo)); 
  };

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <View><Text>Birds</Text></View>
        <ScrollView>
          <Modall />
          {
            Array.isArray(users?.photos) && users.photos.map((photo) => (
              <Pressable key={photo.id} onPress={() => handleImagePress(photo)}>
                <View style={{ marginBottom: 40 }}>
                  <Text>{photo.title}</Text>
                  <Image
                    source={{ uri: photo.url }}
                    style={{ width: 100, height: 100, marginTop: 10 }}
                  />
                </View>
              </Pressable>
            ))
          }
        </ScrollView>
      </View>
    </ScrollView>
  );
}

export default Care;
