import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import LoginContext from './constants/LoginContext';
import Screens from './navigation/Screens';
import { Theme } from './constants';
import { store, persistor } from './redux/store';
const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const doLogin = () => setIsLogin(true);
  const [loadingComplete, setLoadingComplete] = React.useState(false);
  const fetchFonts = async () => {
    Font.loadAsync({
      'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf'),
    });
  };

  _loadResourcesAsync = async () => {
    return await fetchFonts();
  };

  _handleLoadingError = (error) => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    setLoadingComplete(true);
  };

  if (!loadingComplete) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <GalioProvider theme={Theme}>
              <LoginContext.Provider value={{ isLogin, doLogin }}>
                <Block flex>
                  <Screens />
                </Block>
              </LoginContext.Provider>
            </GalioProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
};
export default App;
