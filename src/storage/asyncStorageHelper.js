import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async key => {
  let value = await AsyncStorage.getItem(key);
  return value;
};

const setData = async (key, value) => {
  let resp = await AsyncStorage.setItem(key, JSON.stringify(value));
};

const deleteSingleData = async (keyname) => {
  let resp = await AsyncStorage.removeItem(keyname);
};

const deleteAllData = async () => {
  let resp = await AsyncStorage.clear();
};

export {getData, setData, deleteAllData, deleteSingleData};
