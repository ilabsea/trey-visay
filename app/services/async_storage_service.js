import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncStorageService = (() => {
  return {
    setItem,
    getItem,
    removeItem,
  }

  function setItem(key, value) {
    AsyncStorage.setItem(key, JSON.stringify(value));
  }
  
  async function getItem(key) {
    return JSON.parse(await AsyncStorage.getItem(key));
  }

  function removeItem(key) {
    AsyncStorage.removeItem(key);
  }
})();

export default asyncStorageService;