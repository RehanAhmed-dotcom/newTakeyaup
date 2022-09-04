import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';
// import {senderMsg, recieverMsg} from '../../../../lib/messageUtilis';
// import database from '@react-native-firebase/database';
// import {GiftedChat} from 'react-native-gifted-chat';
// import styles from './style';
import {
  betCount,
  showComment,
  sendMessage,
  PostLikes,
  reportBet,
  blockUser,
} from '../../../../lib/api';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
const Chat = ({navigation, route}) => {
  const {userData} = useSelector(({USER}) => USER);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const [keyboardStatus, setKeyboardStatus] = useState('');
  const checkForUpdate = useRef(null);
  const [comment, setComment] = useState('');
  const {item} = route.params;
  console.log('item', item);
  const [change, setChange] = useState(false);
  const [show, setShow] = useState([]);
  const [check, setCheck] = useState(false);
  const [senderCount, setSenderCount] = useState('');
  const [receiverCount, setReceiverCount] = useState('');
  const [repblok, setRepBlock] = useState(false);
  const [block, setBlock] = useState(false);
  const [report, setReport] = useState(false);
  const [reason, setReason] = useState('');
  useEffect(() => {
    betCount({Auth: userData.token, id: item.id}).then(res => {
      console.log('res', res);
      setReceiverCount(res.receiver_like);
      setSenderCount(res.sender_like);
    });
  }, [change]);
  const renderItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10,
        // alignItems: 'center',
      }}>
      <Text style={{color: 'black'}}>{item.user_name}:</Text>
      <Text style={{color: 'black'}}> {item.message}</Text>
    </View>
  );
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const myModal4 = () => (
    <Modal animationType="slide" transparent={true} visible={repblok}>
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
            height: '50%',
            width: '90%',
            borderRadius: 10,
            // alignItems: 'center',
            // justifyContent: 'center',
          }}>
          <View
            style={{alignItems: 'flex-end', marginTop: 10, marginRight: 10}}>
            <Icon2
              name="circle-with-cross"
              size={20}
              color={'black'}
              onPress={() => setRepBlock(false)}
            />
          </View>
          <View
            style={{
              // backgroundColor: 'black',
              alignItems: 'center',

              justifyContent: 'center',
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                setRepBlock(false);
                setBlock(true);
              }}
              style={{
                height: 50,
                width: '90%',
                backgroundColor: 'black',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Block User
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRepBlock(false);
                setReport(true);
              }}
              style={{
                height: 50,
                width: '90%',
                backgroundColor: 'black',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Report content
              </Text>
            </TouchableOpacity>
          </View>
          {/* <ActivityIndicator size="large" color={'black'} /> */}
        </View>
      </View>
    </Modal>
  );
  const myModal5 = () => (
    <Modal animationType="slide" transparent={true} visible={block}>
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
            height: '30%',
            width: '90%',
            borderRadius: 10,
            // alignItems: 'center',
            // justifyContent: 'center',
          }}>
          <View
            style={{alignItems: 'flex-end', marginTop: 10, marginRight: 10}}>
            <Icon2
              name="circle-with-cross"
              size={20}
              color={'black'}
              onPress={() => setBlock(false)}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 10,
              marginRight: 10,
            }}>
            <Text style={{color: 'black'}}>Block users</Text>
          </View>
          <View
            style={{
              // backgroundColor: 'black',
              alignItems: 'center',
              flexDirection: 'row',

              justifyContent: 'center',
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                blockUser({
                  Auth: userData.token,
                  block_user_id: item.sender.id,
                }).then(res => {
                  // setChange(!change);
                  Alert.alert('Blocked user');
                  console.log('res of block', res);
                  // console.log('res', res);
                  // if (res.is_like == 'true') {
                  //   // setCount(count + 1);
                  //
                  // }
                });
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // height: '100%',
                width: 70,
                height: 100,
                // backgroundColor: 'red',
                // borderRadius: 50,
              }}>
              <Image
                source={
                  item?.sender?.image
                    ? {uri: item.sender.image}
                    : require('../../../../Images/place.jpg')
                }
                style={{width: 50, height: 50, borderRadius: 50}}
              />
              {!item?.sender?.image && (
                <View
                  style={{
                    position: 'absolute',
                    width: 70,
                    bottom: 0,
                    height: 70,
                    // backgroundColor: 'blue',
                    zIndex: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'black'}}>
                    {item?.sender?.username.charAt(0)}
                  </Text>
                </View>
              )}
              {/* <View style={{flexDirection: 'row', marginTop: 20}}>
                <Image
                  source={require('../../../../Images/Capture.png')}
                  style={{width: 20, height: 20}}
                />
                <Text style={{marginLeft: 5, color: 'black'}}>
                  {senderCount ? senderCount : item.like_count_sender}
                </Text>
              </View> */}
            </TouchableOpacity>
            {item?.receiver?.id && (
              <TouchableOpacity
                onPress={() => {
                  blockUser({
                    Auth: userData.token,
                    block_user_id: item?.receiver.id,
                  }).then(res => {
                    Alert.alert('Blocked user');
                    console.log('res of block', res);
                    // if (res.is_like == 'true') {
                    //   // setCount(count + 1);
                    //
                    // }
                  });
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 100,
                  width: 70,
                  // borderRadius: 50,
                  // backgroundColor:
                  //   item.winner_id == item.receiver.id ? 'green' : 'red',
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
                      bottom: 0,
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
                {/* <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Image
                      source={require('../../../../Images/Capture.png')}
                      style={{width: 20, height: 20}}
                    />
                    <Text style={{marginLeft: 5, color: 'black'}}>
                      {receiverCount ? receiverCount : item.like_count_receiver}
                    </Text>
                  </View> */}
              </TouchableOpacity>
            )}
          </View>
          {/* <ActivityIndicator size="large" color={'black'} /> */}
        </View>
      </View>
    </Modal>
  );
  const myModal6 = () => (
    <Modal animationType="slide" transparent={true} visible={report}>
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
            height: '50%',
            width: '90%',
            borderRadius: 10,
            // alignItems: 'center',
            // justifyContent: 'center',
          }}>
          <View
            style={{alignItems: 'flex-end', marginTop: 10, marginRight: 10}}>
            <Icon2
              name="circle-with-cross"
              size={20}
              color={'black'}
              onPress={() => setReport(false)}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text>Report Content</Text>
          </View>
          <View
            style={{
              // backgroundColor: 'black',
              alignItems: 'center',

              justifyContent: 'center',
              flex: 1,
            }}>
            <TextInput
              placeholder={'Report content'}
              placeholderTextColor="grey"
              value={reason}
              onChangeText={text => {
                setReason(text);
                // emailErr && setEmailErr('');
              }}
              style={{
                // marginLeft: 15,
                // backgroundColor: 'red',
                height: 50,
                fontFamily: 'Nunito-Regular',
                fontSize: 16,
                // marginBottom: 20,
                borderWidth: 3,
                borderColor: 'grey',
                paddingLeft: 10,
                color: 'black',
                width: '80%',
                // marginTop: 20,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                if (reason) {
                  reportBet({
                    Auth: userData.token,
                    bet_id: item.id,
                    reason,
                  }).then(res => {
                    console.log('res of block', res);
                    setReport(false);
                  });
                }
              }}
              style={{
                height: 50,
                width: '90%',
                backgroundColor: 'black',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Submit</Text>
            </TouchableOpacity>
          </View>
          {/* <ActivityIndicator size="large" color={'black'} /> */}
        </View>
      </View>
    </Modal>
  );
  // const emailToUniqueString = email => email.replace(/[^a-zA-Z0-9 ]/g, '');
  useEffect(() => {
    showComment({Auth: userData.token, id: item.id}).then(res => {
      console.log('resip', res);
      setShow(res.comments);
    });
  }, [check]);
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
      {keyboardStatus != 'Keyboard Shown' && (
        <View
          style={{
            // flexDirection: 'row',
            // height: 150,
            backgroundColor: 'white',
            // elevation: 3,
            // borderWidth: 1,
            // borderColor: 'black',
            marginHorizontal: 5,
            height: hp(20),
            marginTop: 10,
            // backgroundColor: 'red',
            // justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', color: 'black', marginTop: 10}}>
                {item.sender.username} vs {item?.receiver?.username}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  PostLikes({
                    Auth: userData.token,
                    betid: item.id,
                    userid: item.sender.id,
                  }).then(res => {
                    setChange(!change);
                    // console.log('res', res);
                    // if (res.is_like == 'true') {
                    //   // setCount(count + 1);
                    //
                    // }
                  });
                }}
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
                    {senderCount ? senderCount : item?.like_count_sender}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => {
                //   navigation.navigate('Chat', {item});
                // }}
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
              <TouchableOpacity
                onPress={() => {
                  PostLikes({
                    Auth: userData.token,
                    betid: item.id,
                    userid: item?.receiver?.id,
                  }).then(res => {
                    setChange(!change);
                    console.log('res of like', res);
                    // if (res.is_like == 'true') {
                    //   // setCount(count + 1);
                    //
                    // }
                  });
                }}
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
                    {receiverCount ? receiverCount : item?.like_count_receiver}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        </View>
      )}

      <View style={{paddingHorizontal: 15, marginTop: 10}}>
        <Text style={{fontWeight: 'bold', color: 'black'}}>Comments</Text>
      </View>
      <View style={{height: '35%'}}>
        <FlatList data={show} renderItem={renderItem} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // marginBottom: 20,
          // backgroundColor: 'red',
        }}>
        <TextInput
          placeholder={'Comment'}
          placeholderTextColor="grey"
          value={comment}
          onChangeText={text => {
            setComment(text);
            // emailErr && setEmailErr('');
          }}
          style={{
            marginLeft: 15,
            // backgroundColor: 'red',
            height: 50,
            fontFamily: 'Nunito-Regular',
            fontSize: 16,
            // marginBottom: 20,
            borderWidth: 3,
            borderColor: 'grey',
            paddingLeft: 10,
            color: 'black',
            width: '65%',
            // marginTop: 20,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setComment('');
            if (comment) {
              sendMessage({
                Auth: userData.token,
                message: comment,
                bet_id: item.id,
              }).then(res => {
                console.log('res', res);
                setCheck(!check);
              });
            }
          }}
          style={{
            height: 50,
            borderRadius: 5,
            marginTop: 0,
            marginRight: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            width: 70,
          }}>
          <Text style={{color: 'white'}}>Send</Text>
        </TouchableOpacity>
        <Icon2
          name="flag"
          size={20}
          color={'black'}
          onPress={() => setRepBlock(true)}
        />
      </View>
      {myModal4()}
      {myModal5()}
      {myModal6()}
    </SafeAreaView>
  );
};
export default Chat;
