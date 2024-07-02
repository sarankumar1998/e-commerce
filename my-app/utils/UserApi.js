import axios from 'axios';

export const fetchUserData = async (userId) => {
  try {
    if (userId) {
      
      const response = await axios.get(`http://192.168.0.63:8080/api/v1/user_by/${userId}`);

      return response.data;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const fetchImgData = async () => {
  try {

    const response = await axios.get('https://api.slingacademy.com/v1/sample-data/photos');
    return response.data;

  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};


