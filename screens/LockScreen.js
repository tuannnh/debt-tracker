import React, { useContext, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { StyleSheet, Dimensions, StatusBar, ImageBackground } from 'react-native';
import { Block, Text } from 'galio-framework';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { Button } from '../components';
import { Theme } from '../constants';
import LockScreenImage from '../assets/imgs/LockScreen.jpg';
import LoginContext from '../constants/LoginContext';
const { width, height } = Dimensions.get('screen');

const LockScreen = (props) => {
  const [code, setCode] = useState('');
  const loginContext = useContext(LoginContext);
  const fingerprintLogin = async () => {
    const auth = await LocalAuthentication.authenticateAsync({ disableDeviceFallback: true });
    if (!auth.success) return;
    loginContext.doLogin();
  };
  const passCodeLogin = () => {
    if (code == 2102) loginContext.doLogin();
  };
  passCodeLogin();

  return (
    <Block flex middle>
      <StatusBar />
      <ImageBackground
        source={LockScreenImage}
        style={{
          width,
          height,
          zIndex: 0,
        }}
      />
      <Block flex center style={styles.home}>
        <SmoothPinCodeInput
          style={{ zIndex: 1 }}
          cellStyle={{
            borderBottomWidth: 2,
            borderColor: 'white',
          }}
          cellStyleFocused={{
            borderColor: 'tomato',
          }}
          textStyle={{
            color: 'white',
            fontSize: 30,
          }}
          value={code}
          onTextChange={(code) => setCode(code)}
        />

        <Button
          onlyIcon
          iconSize={50}
          iconFamily="MaterialIcons"
          icon="fingerprint"
          iconColor={Theme.COLORS.DARK}
          style={{ backgroundColor: 'transparent', zIndex: 1 }}
          onPress={() => {
            fingerprintLogin();
          }}
        />
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  home: {
    width: width,
    justifyContent: 'center',
    position: 'absolute',
  },
});

export default LockScreen;
