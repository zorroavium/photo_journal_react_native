import { Dimensions, PermissionsAndroid} from 'react-native';
var ImagePicker = require('react-native-image-picker');

const OpenCamera = async () => {
    const grantedcamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    const grantedstorage = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (
      grantedcamera === PermissionsAndroid.RESULTS.GRANTED &&
      grantedstorage === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('Camera & storage permission given');
  
      const {height, width} = Dimensions.get('window');
      const options = {
        quality: 0.9,
        mediaType: 'photo',
        saveToPhotos: true, //to store captured photo via camera to photos or else it will be stored in temp folders and will get deleted on temp clear
        includeBase64: false,
      };
      const result = await ImagePicker.launchCamera(options);
      console.log('openCamera!!', ImagePicker, result);
    } else {
      console.log('Camera permission denied');
    }

    return null;
  };

  export default OpenCamera;