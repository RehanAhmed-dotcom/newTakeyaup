import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import {unBlock, blockList} from '../../../../lib/api';

import Icon from 'react-native-vector-icons/AntDesign';
const Blocked = ({navigation}: {navigation: any}) => {
  const [list, setList] = useState([]);
  const {userData} = useSelector(({USER}) => USER);
  const [alter, setAlter] = useState(false);
  const renderItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',

        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={
            item.image
              ? {uri: item.image}
              : require('../../../../Images/place.jpg')
          }
          style={{width: 50, height: 50, borderRadius: 50}}
        />
        <Text style={{marginLeft: 10}}>{item.username}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          unBlock({Auth: userData.token, block_user_id: item.id}).then(res => {
            console.log('res of unblock user', res);
            setAlter(!alter);
          });
        }}
        style={{
          backgroundColor: 'black',
          width: 100,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text style={{color: 'white'}}>Unblock</Text>
      </TouchableOpacity>
    </View>
  );
  useEffect(() => {
    blockList({Auth: userData.token}).then(res => {
      console.log('res of block', res);
      setList(res.data);
    });
  }, [alter]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          height: 58,
          flexDirection: 'row',
          alignItems: 'center',
          // elevation: 10,
          paddingHorizontal: 15,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: 'white',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={20} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Nunito-Bold',
            marginLeft: 10,
            color: 'black',
          }}>
          Blocked Users
        </Text>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <FlatList data={list} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
};
export default Blocked;
