import { View, StyleSheet, Dimensions, TouchableOpacity, Text, ImageBackground, PermissionsAndroid } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { dirPictures } from '../../utils/dirStorage';
import React, { useState, useEffect } from 'react';
import {RNCamera} from 'react-native-camera';
import {Input} from 'react-native-elements';
import Icon from 'react-native-remix-icon';
const RNFS = require('react-native-fs');

import {stylesGlobalCards} from '../../global/style';
import {saveImagePath, removeImage, updatethought} from '../store/actions';

const icons = {
    temperatureIcon: 'sun-line',
    locationIcon: 'map-pin-3-line',
    cameraLens: 'camera-lens-line',
    cameraLens: 'camera-lens-line',
  }

const iconColor = '#fff';
const iconColorLens = '#00e3ba';

const fileName = new Date().toLocaleDateString().replaceAll('/', '-') + '.jpg' 

const getDayName = day => new Date(day).toString().split(' ')[1];
const getDate = day => new Date(day).toString().split(' ')[2];

const moveAttachment = async (filePath, newFilepath) => {
    return new Promise((resolve, reject) => {
        RNFS.mkdir(dirPictures)
        .then(() => {
            RNFS.moveFile(filePath, newFilepath)
            .then(() => {
                RNFS.scanFile(newFilepath);
                resolve(true)
            })
            .catch(error => reject(error));
        })
        .catch(err => reject(err));
    });
};

const CameraView = () => {
  const resourceReducer = useSelector(state => state.resourceReducer);
  const dispatch = useDispatch();
  const SaveImagePathToStore = path => dispatch(saveImagePath(path));
  const RemoveImageFromStore = key => dispatch(removeImage(key));
  const UpdateThought = text => dispatch(updatethought(text));

  const [camera, setCamera] = useState(null);
  const [path, setPath] = useState(null);
 // const [path, setPath] = useState(resourceReducer?.imageUriMap[fileName] ? (`file://${resourceReducer?.imageUriMap[fileName]}`) : null);
  const [takingPic, setTakingPic] = useState(false);
  const [item, setItem] = useState(null);

  console.log('resourceReducer', resourceReducer);

  useEffect(() => {
    let data = resourceReducer.dataMap[fileName];

    console.log('*****CameraView*********', fileName, data);

    setItem(data);
    if(data) {
        setPath(data.image);    
    }
  }, [resourceReducer]);

  
 const onChangeText = (text) => {
        UpdateThought(text);
 };  

  const deleteImageFile = async filepath => {
    return new Promise((resolve, reject) => {
      RNFS.exists(filepath)
        .then(result => {
          console.log('file exists: ', result);

          return RNFS.unlink(filepath)
            .then(() => {
              RNFS.scanFile(filepath);
              console.log('FILE DELETED');
              resolve(true);
            })
            .catch(err => {
              console.log(err.message);
              reject(err);
            });
        })
        .catch(err => {
          console.log(err.message);
          reject(err);
        });
    });
  };

const saveImage = async filePath => {

  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);

    const readGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    const writeGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (!readGranted || !writeGranted) {
      console.log('Read and write permissions have not been granted');
      return;
    }

    // set new image name and filepath
    const newFilepath = `${dirPictures}/${fileName}`;
    console.log('newFilepath', newFilepath);

    const imageMoved = await moveAttachment(filePath, newFilepath);

    if(imageMoved) {
        SaveImagePathToStore(newFilepath);
    }

  } catch (error) {
    console.log(error);
  }
};

  const takePicture = async () => {
    if (camera && !takingPic) {
      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true
      };

      setTakingPic(true);

      try {
        const data = await camera.takePictureAsync(options);
        console.log('takePicture data', data);
        saveImage(data.uri);
      } catch (err) {
        console.log('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      } finally {
        setTakingPic(false);
      }
    }
  };

  const renderCamera = () => {
    return (
      <RNCamera
        ref={cam => {
          setCamera(cam);
        }}
        captureAudio={false}
        style={{flex: 1, justifyContent: 'flex-end'}}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.roundButton}
          onPress={takePicture}
          underlayColor="rgba(255, 255, 255, 0.5)">
          <Icon name={icons.cameraLens} size={24} color={iconColorLens} />
        </TouchableOpacity>
      </RNCamera>
    );
  };

  const renderImage = () => {
    return (
      <View>
        {!!item && (
          <ImageBackground
            source={{uri: `file://${item.image}`}}
            resizeMode="cover"
            style={styles.preview}>
            <View>
              <Text style={styles.dayName}>{getDayName(null)}</Text>
              <Text style={styles.date}>{getDate(null)}</Text>
            </View>

            <View style={styles.tempContainer}>
              <Text style={styles.temperature}>{item.temperature}&deg;</Text>
              <Icon color={iconColor} name={icons.temperatureIcon} size={20} />
            </View>

            <View style={styles.locationContainer}>
              <Icon color={iconColor} name={icons.locationIcon} size={20} />
              <Text style={styles.text}>{item.location}</Text>
            </View>
          </ImageBackground>
        )}
        <View style={styles.cancel}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.roundButton}
            onPress={() => {setPath(null); deleteImageFile(`${dirPictures}/${fileName}`); RemoveImageFromStore(fileName);}}>
            <Icon name={icons.cameraLens} size={24} color={iconColorLens} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={path ? styles.containerWithoutFlex : styles.container}>
      {path ? renderImage() : renderCamera()}
      {path && (
        <Input
          inputStyle={styles.inputStyle}
          inputContainerStyle={styles.inputContainerStyle}
          multiline={true}
          value={item?.thoughts}
          placeholder="Type your thoughts..."
          onChangeText={text => onChangeText(text)}
        />
      )}
    </View>
  );
};

export default CameraView;

const styles = StyleSheet.create({
    ...stylesGlobalCards,
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
    },
    inputStyle: {
        fontSize: 20
    },
    inputContainerStyle: {
        borderBottomWidth: 0,
        position: 'absolute',
        top: 40,
    },
    containerWithoutFlex: {
    },
    preview: {
      height: 250,
      width: Dimensions.get('window').width, backgroundColor: '#fff'
    },
    cancel: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    roundButton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#eeeeee',
        backgroundColor: 'white',
      }
  });