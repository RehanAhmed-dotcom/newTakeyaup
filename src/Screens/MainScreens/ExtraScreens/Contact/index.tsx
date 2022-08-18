import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  Linking,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

const Contact = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{paddingHorizontal: 15}}>
        <Icon
          name="arrowleft"
          size={20}
          onPress={() => navigation.goBack()}
          color={'black'}
          style={{marginTop: 20}}
        />
        <Text
          style={{
            marginTop: 30,
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Contact Us
        </Text>
        {/* <Text style={{marginTop: 30, fontSize: 18, color: 'black'}}>
        Your side of the bet
      </Text> */}
        <View style={{marginTop: 20}}>
          <Text
            style={{
              marginTop: 0,
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Social Media:
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL('@takeyaup')}>
            <Text style={{color: 'black'}}>@takeyaup</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              marginTop: 0,
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Questions:
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('info@takeyaup.com')}>
            <Text style={{color: 'black'}}>info@takeyaup.com</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              marginTop: 0,
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Report Wrongdoing:
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('courthouse@takeyaup.com')}>
            <Text style={{color: 'black'}}>courthouse@takeyaup.com</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Contact;
