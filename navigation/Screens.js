import React, { useContext } from 'react';
import LoginContext from '../constants/LoginContext';
import { connect } from 'react-redux';
import { Dimensions, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import LockScreen from '../screens/LockScreen';
import Detail from '../screens/Detail';
import Add from '../screens/Add';
import { Theme } from '../constants';
import { Button } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

const Stack = createStackNavigator();
const HomeStack = (props) => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => (
            <Text style={{ fontSize: 25, color: Theme.COLORS.WHITE }}>Loans List</Text>
          ),
          headerTransparent: true,
          headerRight: () => (
            <Button
              onlyIcon
              iconSize={25}
              iconFamily="MaterialIcons"
              icon="person-add"
              iconColor={Theme.COLORS.WHITE}
              style={{ backgroundColor: 'transparent', marginRight: 15 }}
              onPress={() => navigation.navigate('Add')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Add"
        component={Add}
        options={{ headerTitle: '', headerTransparent: true }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ headerTitle: '', headerTransparent: true }}
      />
    </Stack.Navigator>
  );
};

const LockScreenStack = (props) => {
  const loginStatus = useContext(LoginContext).isLogin;
  return (
    <Stack.Navigator>
      {loginStatus ? (
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen name="LockScreen" component={LockScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};
const mapStateToProps = (state) => ({
  list: state.data.listData,
});
export default connect(mapStateToProps, {})(LockScreenStack);
