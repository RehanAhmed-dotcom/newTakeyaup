import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
// import {createThumbnail} from 'react-native-create-thumbnail';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
// import {senderMsg, recieverMsg} from '../../../../lib/messageUtilis';
// import database from '@react-native-firebase/database';
// import {GiftedChat} from 'react-native-gifted-chat';
// import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon3 from 'react-native-vector-icons/Entypo';
import {completeBetApi} from '../../../../lib/api';
import {useSelector} from 'react-redux';
const Notifications = ({navigation, route}) => {
  const {userData} = useSelector(({USER}) => USER);
  console.log('userData.token', userData.token);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const checkForUpdate = useRef(null);
  const {item, id} = route.params;
  console.log('item', item, id);
  const picker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      co(image);
    });
  };
  const chosePic = type => {
    type == 'library'
      ? ImagePicker.openPicker({
          // multiple: true,
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          setShow(!show);
          // images.push(image.path);
          co(image);
        })
      : ImagePicker.openPicker({
          mediaType: 'video',
          // multiple: true,
        }).then(video => {
          setShow(!show);
          cov(video);
          // setImgErr("");
          // setImg([...img, video.path]);
          //   console.log(video);
          // createThumbnail({
          //   url: video.path,
          //   timeStamp: 10000,
          // })
          //   .then(responce => {
          //     setImg([{video: video.path, thumbnil: responce.path}]);
          //     setImgErr('');
          //     // console.log(setThumb(responce.path));
          //   })
          //   .catch(err => console.log({err}));
          //   console.log(video);
        });
  };
  const myModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        setShow(!show);
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000088',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: '40%',
            width: '90%',
            backgroundColor: 'black',
            borderRadius: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginRight: 10,
              marginTop: 10,
            }}>
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Icon3 name="circle-with-cross" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              //   backgroundColor: 'blue',
              paddingHorizontal: 10,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                chosePic('library');
              }}
              style={{
                backgroundColor: 'white',
                height: 50,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Picture
              </Text>
            </TouchableOpacity>

            {/* <Button
              title={'Video'}
              onPress={() => {
                choosePic('video');
                setModalVisible(!modalVisible);
                setCheck('video');
              }}
            /> */}
            <View style={{marginTop: 20}} />
            <TouchableOpacity
              onPress={() => {
                chosePic('video');
              }}
              style={{
                backgroundColor: 'white',
                height: 50,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Video
              </Text>
            </TouchableOpacity>

            {/* <Button
              title={'Picture'}
              onPress={() => {
                choosePic('picture');
                setModalVisible(!modalVisible);
                setCheck('image');
              }}
            /> */}
          </View>
        </View>
      </View>
    </Modal>
  );
  const cov = video => {
    setShowModal(true);
    const data = new FormData();
    data.append('bet_id', item.id);
    data.append('winner', id);
    data.append('bet_video', {
      uri: video.path,
      type: 'video/mp4',
      name: `video${Math.random()}.mp4`,
    });

    completeBetApi({Auth: userData.token}, data)
      .then(res => {
        console.log('res of completee api', res);
        setShowModal(false);
        navigation.navigate('Home');
      })
      .catch(err => {
        console.log('err', err);
        setShowModal(false);
      });
  };
  const co = image => {
    setShowModal(true);
    const data = new FormData();
    data.append('bet_id', item.id);
    data.append('winner', id);
    data.append('bet_video', {
      uri: image.path,
      type: 'image/jpeg',
      name: 'image' + new Date() + '.jpg',
    });

    completeBetApi({Auth: userData.token}, data)
      .then(res => {
        console.log('res of completee api', res);
        setShowModal(false);
        navigation.navigate('Home');
      })
      .catch(err => {
        console.log('err', err);
        setShowModal(false);
      });
  };
  const cos = () => {
    setShowModal(true);
    const data = new FormData();
    data.append('bet_id', item.id);
    data.append('winner', id);
    // data.append('bet_video', {
    //   uri: image.path,
    //   type: 'image/jpeg',
    //   name: 'image' + new Date() + '.jpg',
    // });

    completeBetApi({Auth: userData.token}, data)
      .then(res => {
        console.log('res of completee api', res);
        setShowModal(false);
        navigation.navigate('Home');
      })
      .catch(err => {
        console.log('err', err);
        setShowModal(false);
      });
  };
  // const emailToUniqueString = email => email.replace(/[^a-zA-Z0-9 ]/g, '');
  const myModal3 = () => (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00000088',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            height: 100,
            width: 100,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={'black'} />
        </View>
      </View>
    </Modal>
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          height: 58,
          flexDirection: 'row',
          alignItems: 'center',
          // elevation: 4,
          justifyContent: 'center',
          paddingHorizontal: 15,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: 'white',
        }}>
        <TouchableOpacity>
          <Image
            source={require('../../../../Images/takeup.png')}
            style={{height: 20, width: 20}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          // height: 150,
          height: hp(18),
          marginTop: 10,
          // backgroundColor: 'red',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 70,
              width: 70,
              borderRadius: 50,
              // backgroundColor: 'pink',
            }}>
            <Image
              source={
                item?.sender?.image
                  ? {uri: item?.sender?.image}
                  : require('../../../../Images/place.jpg')
              }
              style={{width: 50, height: 50, borderRadius: 50}}
            />
            {!item?.sender?.image && (
              <View
                style={{
                  position: 'absolute',
                  width: 70,
                  bottom: 20,
                  height: 70,
                  // backgroundColor: 'red',
                  zIndex: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black'}}>
                  {item?.sender?.username.charAt(0)}
                </Text>
              </View>
            )}
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Image
                source={require('../../../../Images/Capture.png')}
                style={{width: 20, height: 20}}
              />
              <Text style={{marginLeft: 5, color: 'black'}}>
                {item?.like_count_sender}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Chat', {item});
            }}
            style={{
              // backgroundColor: 'red',
              width: '50%',
              borderBottomColor: 'black',
              // borderBottomWidth: 1,
              justifyContent: 'center',
              paddingBottom: 5,
              height: '100%',
            }}>
            <Text style={{color: 'black'}}>{item.sender_bet}</Text>
            <Text style={{marginTop: 10, color: 'black'}}>
              Stakes: {item.loser_task}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 70,
              width: 70,
              borderRadius: 50,
              // backgroundColor: 'pink',
            }}>
            <Image
              source={
                item?.receiver?.image
                  ? {uri: item?.receiver?.image}
                  : require('../../../../Images/place.jpg')
              }
              style={{width: 50, height: 50, borderRadius: 50}}
            />
            {!item?.receiver?.image && (
              <View
                style={{
                  position: 'absolute',
                  width: 70,
                  bottom: 20,
                  height: 70,
                  // backgroundColor: 'red',
                  zIndex: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black'}}>
                  {item?.receiver?.username.charAt(0)}
                </Text>
              </View>
            )}
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Image
                source={require('../../../../Images/Capture.png')}
                style={{width: 20, height: 20}}
              />
              <Text style={{marginLeft: 5, color: 'black'}}>
                {item?.like_count_receiver}
              </Text>
            </View>
          </View>
        </>
      </View>
      <View style={{paddingHorizontal: 15, marginTop: 10}}>
        <Text style={{fontWeight: 'bold', color: 'black'}}>Comments</Text>
      </View>
      <View style={{marginTop: 100, paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            Upload Image or Video
          </Text>
          <TouchableOpacity
            //  onPress={() => picker()}
            onPress={() => setShow(!show)}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              NOW
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => cos()}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              LATER
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => cos()}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              NO UPLOAD
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {myModal()}
      {myModal3()}
    </SafeAreaView>
  );
};
export default Notifications;
