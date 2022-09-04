import React, {useEffect, useState} from 'react';

import {View, SafeAreaView, Alert, TouchableOpacity, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {logoutuser} from '../../../../redux/actions';
import {files, deleteAccount} from '../../../../lib/api';
import Icon from 'react-native-vector-icons/AntDesign';
import {navigationRef} from '../../../../config/NavigationService';
const Setting = ({navigation}) => {
  const dispatch = useDispatch();
  const {userData} = useSelector(({USER}) => USER);
  const [fileData, setFileData] = useState({});
  useEffect(() => {
    files().then(res => {
      setFileData(res);
      console.log('res', res);
    });
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            marginTop: 30,
          }}>
          {userData?.userdata?.username}
        </Text>
      </View>
      <View style={{marginTop: 30}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <Text style={{color: 'black'}}>Edit Profile</Text>
          <Icon name="right" size={20} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChangePassword')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginTop: 30,
          }}>
          <Text style={{color: 'black'}}>Change Password</Text>
          <Icon name="right" size={20} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('pdf', {file: fileData?.cookiee})}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginTop: 30,
          }}>
          <Text style={{color: 'black'}}>Cookie Policy</Text>
          <Icon name="right" size={20} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('pdf', {file: fileData?.term_of_use})
          }
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginTop: 30,
          }}>
          <Text style={{color: 'black'}}>Terms Of Use</Text>
          <Icon name="right" size={20} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('pdf', {file: fileData?.standard_contractual})
          }
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginTop: 30,
          }}>
          <Text style={{color: 'black'}}>EEA Standard Contractual Clauses</Text>
          <Icon name="right" size={20} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('pdf', {file: fileData?.data_process})
          }
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginTop: 30,
          }}>
          <Text style={{color: 'black'}}>Data Processing Agreement</Text>
          <Icon name="right" size={20} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('pdf', {file: fileData?.privacy})}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginTop: 30,
          }}>
          <Text style={{color: 'black'}}>Privacy Policy</Text>
          <Icon name="right" size={20} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('contact')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginTop: 30,
          }}>
          <Text style={{color: 'black'}}>Contact Us</Text>
          <Icon name="right" size={20} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Blocked')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginTop: 30,
          }}>
          <Text style={{color: 'black'}}>Blocked Users</Text>
          <Icon name="right" size={20} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Delete Account',
              'Are you sure to delete your account?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('ok'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () =>
                    deleteAccount({Auth: userData.token})
                      .then(res => {
                        logoutuser(false)(dispatch);
                        console.log('res of deleteion', res);
                      })
                      .catch(err => {
                        console.log('err', err);
                      }),
                },
              ],
            )
          }
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginTop: 30,
          }}>
          <Text style={{color: 'black'}}>Delete Account</Text>
          {/* <Icon name="right" size={20} color={'#50D240'} /> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => logoutuser(false)(dispatch)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginTop: 30,
          }}>
          <Text style={{color: 'black'}}>Log Out</Text>
          {/* <Icon name="right" size={20} color={'#50D240'} /> */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Setting;
