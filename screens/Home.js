import React, { useContext } from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  View,
  ImageBackground,
  Alert,
  RefreshControl,
} from 'react-native';
import { Block, Card, Text } from 'galio-framework';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Input, Button } from '../components';
import HomeBackground from '../assets/imgs/HomeBackground.jpg';
import { connect } from 'react-redux';
import { Theme } from '../constants';
import { saveData } from '../redux/actions';

const { width, height } = Dimensions.get('screen');

const Name = ({ id, name, total, handleRemove, navigation }) => {
  return (
    <Block flex style={{}}>
      <TouchableOpacity onPress={() => navigation.navigate('Detail', { id })}>
        <Block flex style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Card
            flex
            borderless
            titleColor={Theme.COLORS.PRIMARY}
            captionColor={Theme.COLORS.WHITE}
            title={name}
            caption={total}
          />
          <Button
            onlyIcon
            iconSize={35}
            iconFamily="MaterialIcons"
            icon="delete"
            iconColor={Theme.COLORS.ERROR}
            style={{ backgroundColor: 'transparent', zIndex: 1, verticalAlign: 'middle' }}
            onPress={() =>
              Alert.alert(
                'Alert',
                'Do you really want to remove?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  { text: 'OK', onPress: handleRemove },
                ],
                { cancelable: false }
              )
            }
          />
        </Block>
      </TouchableOpacity>
    </Block>
  );
};

const Home = (props) => {
  const dataList = props.list;
  const [people, setPeople] = React.useState(dataList);
  const findPeople = (searchWord) => {
    setPeople(
      dataList.filter(
        (dataList) => dataList.name.toLowerCase().indexOf(searchWord.toLowerCase()) > -1
      )
    );
  };

  const handleRemove = async (id) => {
    const arr = dataList.filter((dataList) => dataList.id !== id);
    await props.saveData(arr);
    setPeople(arr);
  };

  return (
    <Block flex>
      <ImageBackground
        source={HomeBackground}
        style={{
          opacity: 0.85,
          width,
          height,
          zIndex: 0,
        }}
      />
      <Block style={styles.home}>
        <Input
          style={{ marginTop: 60 }}
          left
          placeholder="Search"
          onChangeText={findPeople}
          iconContent={<MaterialCommunityIcons name="account-search" size={24} color="black" />}
          autoCompleteType="off"
          autoCorrect={false}
          autoCapitalize="none"
        />

        {people ? (
          people.length > 0 ? (
            <FlatList
              data={people}
              renderItem={({ item }) => (
                <Name
                  id={item.id}
                  name={item.name}
                  total={item.total}
                  navigation={props.navigation}
                  handleRemove={() => handleRemove(item.id)}
                />
              )}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text
              style={{
                textAlign: 'center',
                color: Theme.COLORS.INFO,
                fontSize: 25,
                marginTop: 30,
              }}
            >
              No data
            </Text>
          )
        ) : (
          <Text
            style={{
              textAlign: 'center',
              color: Theme.COLORS.INFO,
              fontSize: 25,
              marginTop: 30,
            }}
          >
            No data
          </Text>
        )}
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  home: {
    width: width,
    height: height,
    position: 'absolute',
  },
});
const mapStateToProps = (state) => ({
  list: state.data.listData,
});
export default connect(mapStateToProps, { saveData })(Home);
