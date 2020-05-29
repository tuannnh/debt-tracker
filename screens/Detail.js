import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  FlatList,
  ImageBackground,
  View,
  Alert,
} from 'react-native';
import { Block, Card, Text } from 'galio-framework';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { MaskService } from 'react-native-masked-text';
import { Input, Button } from '../components';
import HomeBackground from '../assets/imgs/HomeBackground.jpg';
import { saveData } from '../redux/actions';
import { Theme } from '../constants';
import { idGenerator } from '../constants/utils';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
const { width, height } = Dimensions.get('screen');

const Transaction = ({ amount, date, handleRemove }) => {
  let transactionStyle = [styles.transaction, styles.add];
  if (amount < 0) transactionStyle = [styles.transaction, styles.subtract];

  return (
    <GestureRecognizer
      style={{ flex: 1 }}
      onSwipeLeft={(state) => {
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
        );
      }}
    >
      <Block
        center
        style={{
          borderWidth: 2,
          borderRadius: 10,
          borderColor: Theme.COLORS.GITHUB,
          width: width * 0.8,
          marginTop: 5,
          justifyContent: 'center',
          flexDirection: 'row',
          backgroundColor: Theme.COLORS.WHITE,
        }}
      >
        <Block flex style={[transactionStyle]}>
          <Text style={{ width: width * 0.35, textAlign: 'left' }}>{date}</Text>
          <Text
            style={{
              width: width * 0.3,
              textAlign: 'right',
            }}
          >
            {amount > 0
              ? '+' +
                amount.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })
              : amount.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
          </Text>
        </Block>
      </Block>
    </GestureRecognizer>
  );
};

const Detail = (props) => {
  const { id } = props.route.params;
  const dataList = props.list;
  const person = dataList.filter((data) => data.id === id)[0];
  const [personShow, setPersonShow] = useState(person);
  console.log(personShow);
  const updateDataList = () => {
    const elementsIndex = dataList.findIndex((element) => element.id == id);
    let newDataList = [...dataList];
    newDataList[elementsIndex] = {
      ...newDataList[elementsIndex],
      detail: personShow.detail,
      total: personShow.total,
    };
    return newDataList;
  };

  const [transaction, setTransaction] = useState('');
  const money = MaskService.toMask('money', transaction, {
    precision: 0,
    separator: '.',
    delimiter: ',',
    unit: '',
    suffixUnit: '',
  });
  const transactionNumber = MaskService.toRawValue('money', transaction, { precision: 0 });

  const handleRemove = async (id, amount) => {
    const removedDetailArr = personShow.detail.filter((el) => el.id !== id);
    personShow.total += amount;

    setPersonShow({ ...personShow, detail: removedDetailArr });

    const newArr = updateDataList();
    await props.saveData(newArr);
  };
  return (
    <Block flex middle>
      <ImageBackground
        source={HomeBackground}
        style={{
          opacity: 0.85,
          width,
          height,
        }}
      >
        <Block style={styles.home}>
          <Text
            style={{
              textAlign: 'center',
              color: Theme.COLORS.PRIMARY,
              fontSize: 30,
              marginTop: 50,
            }}
          >
            {personShow
              ? personShow.total.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })
              : null}
          </Text>
          <Block center>
            <Text
              style={{
                width: width * 0.8,
                textAlign: 'left',
                color: Theme.COLORS.WHITE,
                fontSize: 20,
                marginTop: 10,
              }}
            >
              History
            </Text>
            <View
              style={{
                marginTop: 5,
                width: width * 0.8,
                borderBottomColor: Theme.COLORS.DARK,
                borderBottomWidth: 2,
              }}
            />
          </Block>

          <Block style={{ height: height * 0.4 }}>
            <FlatList
              data={personShow.detail}
              renderItem={({ item }) => (
                <Transaction
                  amount={item.amount}
                  date={item.date}
                  handleRemove={() => handleRemove(item.id, item.amount)}
                />
              )}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </Block>
          <KeyboardAwareScrollView extraScrollHeight={-110}>
            <Block center style={{ zIndex: 3 }}>
              <Text
                style={{
                  width: width * 0.8,
                  textAlign: 'left',
                  color: Theme.COLORS.WHITE,
                  fontSize: 20,
                  marginTop: 10,
                }}
              >
                Add new transaction
              </Text>
              <View
                style={{
                  marginTop: 5,
                  width: width * 0.8,
                  borderBottomColor: Theme.COLORS.DARK,
                  borderBottomWidth: 2,
                }}
              />

              <Input
                left
                keyboardType="numeric"
                style={{ width: width * 0.8 }}
                value={money}
                onChangeText={(text) => setTransaction(text)}
                iconContent={<MaterialIcons name="attach-money" size={24} color="black" />}
                autoCompleteType="off"
                autoCorrect={false}
                autoCapitalize="none"
              />

              <Block style={{ flexDirection: 'row', marginTop: 10 }}>
                <Button
                  color="warning"
                  style={{ width: width * 0.3, borderRadius: 8, height: 30, marginHorizontal: 10 }}
                  onPress={async () => {
                    if (transactionNumber > 0) {
                      personShow.detail.push({
                        id: idGenerator(),
                        amount: transactionNumber - transactionNumber * 2,
                        date: new Date().toLocaleDateString('vi-VN'),
                      });
                      personShow.total += transactionNumber;
                      const newArr = updateDataList();
                      await props.saveData(newArr);
                    }
                  }}
                >
                  Paid
                </Button>
                <Button
                  color="primary"
                  style={{ width: width * 0.3, borderRadius: 8, height: 30, marginHorizontal: 10 }}
                  onPress={async () => {
                    if (transactionNumber > 0)
                      personShow.detail.push({
                        id: idGenerator(),
                        amount: transactionNumber,
                        date: new Date().toLocaleDateString('vi-VN'),
                      });
                    personShow.total -= transactionNumber;
                    const newArr = updateDataList();
                    await props.saveData(newArr);
                  }}
                >
                  Received
                </Button>
              </Block>
            </Block>
          </KeyboardAwareScrollView>
        </Block>
      </ImageBackground>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  home: {
    width: width,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    borderRightWidth: 10,
  },
  add: {
    borderRightColor: Theme.COLORS.SUCCESS,
  },
  subtract: {
    borderRightColor: Theme.COLORS.ERROR,
  },
});
const mapStateToProps = (state) => ({
  list: state.data.listData,
});
export default connect(mapStateToProps, { saveData })(Detail);
