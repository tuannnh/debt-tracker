import React, { useState, useContext } from 'react';
import { StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Block, Text } from 'galio-framework';
import { MaterialIcons } from '@expo/vector-icons';
import { Input, Button } from '../components';
import HomeBackground from '../assets/imgs/HomeBackground.jpg';
import { Theme } from '../constants';
import { MaskService } from 'react-native-masked-text';
import { saveData } from '../redux/actions';
import { idGenerator } from '../constants/utils';
const { width, height } = Dimensions.get('screen');

const Add = (props) => {
  const id = idGenerator();
  let arr = props.list;

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const money = MaskService.toMask('money', amount, {
    precision: 0,
    separator: '.',
    delimiter: ',',
    unit: '',
    suffixUnit: '',
  });
  const total = MaskService.toRawValue('money', amount, { precision: 0 });
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
      <Block flex style={styles.home}>
        <Text style={{ textAlign: 'center', fontSize: 30, color: Theme.COLORS.PRIMARY }}>
          Create New
        </Text>
        <Input
          left
          value={name}
          onChangeText={setName}
          placeholder="Name"
          iconContent={<MaterialIcons name="person" size={24} color="black" />}
          autoCompleteType="off"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Input
          left
          value={money}
          keyboardType="numeric"
          onChangeText={(text) => setAmount(text)}
          iconContent={<MaterialIcons name="attach-money" size={24} color="black" />}
          autoCompleteType="off"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Block flex style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Button
            onlyIcon
            radius={30}
            iconSize={25}
            iconFamily="MaterialIcons"
            icon="check"
            iconColor={Theme.COLORS.SUCCESS}
            style={{ width: width * 0.3, backgroundColor: Theme.COLORS.WHITE, marginTop: 20 }}
            onPress={async () => {
              if (MaskService.toRawValue('money', amount, { precision: 0 }) > 0 && name) {
                if (!arr) arr = [];
                arr.push({
                  id,
                  name,
                  total,
                  detail: [
                    {
                      id: idGenerator(),
                      amount: total,
                      date: new Date().toLocaleDateString('vi-VN'),
                    },
                  ],
                });
                await props.saveData(arr);
                props.navigation.goBack();
              }
            }}
          >
            Create
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  home: {
    width: width,
    marginTop: 60,
    position: 'absolute',
  },
});
const mapStateToProps = (state) => ({
  list: state.data.listData,
});
export default connect(mapStateToProps, { saveData })(Add);
