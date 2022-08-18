import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Modal,
  Keyboard,
  Image,
  View,
  FlatList,
} from 'react-native';
import Video from 'react-native-video';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Fontisto';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {
  sendMessage,
  PostLikes,
  betCount,
  completeBetApi,
  CreateBet,
  showComment,
} from '../../../../lib/api';
import Icon4 from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';

// import { FlatList } from 'react-native-gesture-handler';
const SelectCategory = ({navigation, route}) => {
  const {item} = route.params;
  const [check, setCheck] = useState(false);
  const [comment, setComment] = useState('');
  const [paused, setPaused] = useState(true);
  const {userData} = useSelector(({USER}) => USER);
  const [img, setimg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [shows, setShows] = useState(false);
  const [show, setShow] = useState([]);
  const [keyboardStatus, setKeyboardStatus] = useState('');
  const [selected, setSelected] = useState([]);
  const [change, setChange] = useState(false);
  const [senderCount, setSenderCount] = useState('');
  const [receiverCount, setReceiverCount] = useState('');
  // console.log('id', userData.userdata.id);
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
  const cov = video => {
    setShowModal(true);
    const data = new FormData();
    data.append('bet_id', item.id);
    data.append('winner', item.winner_id);
    data.append('bet_video', {
      uri: video.path,
      type: 'video/mp4',
      name: `video${Math.random()}.mp4`,
    });

    completeBetApi({Auth: userData.token}, data)
      .then(res => {
        console.log('res of completee api', res);
        setShowModal(false);
        if (res.status == 'success') {
          navigation.goBack();
        }
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
    data.append('winner', item.winner_id);
    data.append('bet_video', {
      uri: image.path,
      type: 'image/jpeg',
      name: 'image' + new Date() + '.jpg',
    });

    completeBetApi({Auth: userData.token}, data)
      .then(res => {
        console.log('res of completee api', res);
        setShowModal(false);
        if (res.status == 'success') {
          navigation.goBack();
        }
      })
      .catch(err => {
        console.log('err', err.response.data);
        setShowModal(false);
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
          setShows(!shows);
          // images.push(image.path);
          co(image);
        })
      : ImagePicker.openPicker({
          mediaType: 'video',
          // multiple: true,
        }).then(video => {
          setShows(!shows);
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
      visible={shows}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        setShows(!shows);
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
            <TouchableOpacity onPress={() => setShows(!shows)}>
              <Icon2 name="circle-with-cross" size={20} color="white" />
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
  useEffect(() => {
    betCount({Auth: userData.token, id: item.id}).then(res => {
      console.log('res', res);
      setReceiverCount(res.receiver_like);
      setSenderCount(res.sender_like);
    });
  }, [change]);
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

  // const name = route?.params?.name;
  const handleRemove = i => {
    const arr = selected.filter(item => item !== i);
    setSelected(arr);
  };
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
    showComment({Auth: userData.token, id: item.id}).then(res => {
      console.log('resip', res);
      setShow(res.comments);
    });
  }, [check]);
  // console.log(
  //   'check',
  //   userData.userdata.id == item.sender.id ||
  //     userData.userdata.id == item.receiver.id,
  // );
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 15}}>
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
      <View style={{paddingHorizontal: 15, marginTop: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            {item.sender.username}{' '}
          </Text>
          <Text style={{fontWeight: 'bold', color: 'black'}}>vs </Text>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            {item.receiver.username}
          </Text>
        </View>
        {keyboardStatus != 'Keyboard Shown' && (
          <>
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
                    height: '100%',
                    width: 70,
                    // borderRadius: 50,
                    backgroundColor:
                      item.winner_id == item.sender.id ? 'green' : 'red',
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
                        bottom: 60,
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
                  <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Image
                      source={require('../../../../Images/Capture.png')}
                      style={{width: 20, height: 20}}
                    />
                    <Text style={{marginLeft: 5, color: 'black'}}>
                      {senderCount ? senderCount : item.like_count_sender}
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{height: '80%'}}> */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('SelectCategory', {item})}
                  style={{
                    // backgroundColor: 'red',
                    width: '50%',
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                    height: '100%',
                  }}>
                  <Text style={{color: 'black'}}>{item?.sender_bet}</Text>
                  <Text style={{marginTop: 10, color: 'black'}}>
                    Stakes: {item.loser_task}
                  </Text>
                </TouchableOpacity>
                {/* </ScrollView> */}

                <TouchableOpacity
                  onPress={() => {
                    PostLikes({
                      Auth: userData.token,
                      betid: item.id,
                      userid: item.receiver.id,
                    }).then(res => {
                      setChange(!change);
                      console.log('res', res);
                      // if (res.is_like == 'true') {
                      //   // setCount(count + 1);
                      //
                      // }
                    });
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: 70,
                    // borderRadius: 50,
                    backgroundColor:
                      item.winner_id == item.receiver.id ? 'green' : 'red',
                  }}>
                  <Image
                    source={
                      item?.receiver?.image
                        ? {uri: item.receiver.image}
                        : require('../../../../Images/place.jpg')
                    }
                    style={{width: 50, height: 50, borderRadius: 50}}
                  />
                  {!item?.receiver?.image && (
                    <View
                      style={{
                        position: 'absolute',
                        width: 70,
                        bottom: 60,
                        height: 70,
                        // backgroundColor: 'red',
                        zIndex: 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'black'}}>
                        {item.receiver.username.charAt(0)}
                      </Text>
                    </View>
                  )}
                  <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Image
                      source={require('../../../../Images/Capture.png')}
                      style={{width: 20, height: 20}}
                    />
                    <Text style={{marginLeft: 5, color: 'black'}}>
                      {receiverCount ? receiverCount : item.like_count_receiver}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            </View>
            <Text
              style={{
                marginTop: 20,
                color: 'black',
                marginLeft: 0,
                fontWeight: 'bold',
              }}>
              Consequence
            </Text>
            {!item.bet_video && !img && (
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={() => {
                  if (userData.userdata.id == item.sender.id) {
                    // navigation.navigate('PostDescription', {
                    //   item,
                    //   id: item.sender.id,
                    // });
                    setShows(!shows);
                  } else if (userData.userdata.id == item.receiver.id) {
                    // navigation.navigate('PostDescription', {
                    //   item,
                    //   id: item.sender.id,
                    // });
                    setShows(!shows);
                  } else {
                    console.log('not equal');
                  }
                  // userData.userdata.id == item.sender.id ||
                  //   (userData.userdata.id == item.receiver.id &&
                  //     setShows(!shows));
                }}
                // onPress={() =>
                //   ImagePicker.openPicker({
                //     width: 300,
                //     height: 400,
                //     cropping: true,
                //   }).then(image => {
                //     const data = new FormData();
                //     data.append('bet_id', item.id);
                //     data.append('winner', item.winner_id);
                //     data.append('bet_video', {
                //       uri: image.path,
                //       type: 'image/jpeg',
                //       name: 'image' + new Date() + '.jpg',
                //     });
                //     completeBetApi({Auth: userData.token}, data)
                //       .then(res => {
                //         console.log('res', res);
                //         navigation.goBack();
                //       })
                //       .then(err => {
                //         console.log('err', err);
                //       });
                //     // setimg(image.path);
                //   })
                // }
              >
                <Text style={{color: 'black'}}>Upload</Text>
              </TouchableOpacity>
            )}
            {item?.bet_video?.slice(-3) == 'mp4' ? (
              <View style={{width: 150, height: 150}}>
                <Video
                  source={{uri: item.bet_video}} // Can be a URL or a local file.
                  // onEnd={() => setPaused(false)}
                  // ref={ref => {
                  //   this.player = ref;
                  // }} // Store reference
                  //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
                  //  onError={this.videoError}
                  // Callback when video cannot be loaded
                  paused={paused}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    height: 150,
                    width: 150,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {paused ? (
                    <Icon2
                      name={'controller-play'}
                      onPress={() => setPaused(!paused)}
                      size={40}
                      color="white"
                    />
                  ) : (
                    <Icon1
                      name={'pause'}
                      onPress={() => setPaused(!paused)}
                      size={40}
                      color="white"
                    />
                  )}
                </View>
              </View>
            ) : (
              <Image
                source={{uri: item.bet_video ? item.bet_video : img}}
                style={{width: 150, height: 150}}
              />
            )}
          </>
        )}

        <Text style={{fontWeight: 'bold', color: 'black'}}>Comments</Text>
        <View style={{height: '30%'}}>
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
              width: '70%',
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
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'black',
              width: 70,
            }}>
            <Text style={{color: 'white'}}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      /> */}
      {myModal()}
      {myModal3()}
    </SafeAreaView>
  );
};

export default SelectCategory;
