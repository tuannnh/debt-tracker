import { AsyncStorage } from 'react-native';

export const getAllData = async () => {
  try {
    const list = await AsyncStorage.getItem('LIST');
    if (list !== null) {
      return list;
    }
  } catch (error) {
    alert('Something Error');
  }
};

export const saveData = async (list) => {
  try {
    const listOld = await AsyncStorage.getItem('LIST');

    if (listOld !== null) {
      await AsyncStorage.mergeItem('LIST', JSON.stringify(list));
    } else await AsyncStorage.setItem('LIST', JSON.stringify(list));
    return true;
  } catch (error) {
    alert('Something Error');
  }
};

export const removeData = async () => {
  try {
    await AsyncStorage.removeItem('LIST');
    return true;
  } catch (error) {
    alert('Something Error');
  }
};
