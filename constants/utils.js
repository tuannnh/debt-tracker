import { Platform, StatusBar } from 'react-native';
import { theme } from 'galio-framework';

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = theme.SIZES.BASE * 3.5 + (StatusHeight || 0);
export const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812);

export const idGenerator = () => {
  const s4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};
