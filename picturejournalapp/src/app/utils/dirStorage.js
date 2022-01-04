import { Platform } from 'react-native';
const RNFS = require('react-native-fs');

export const dirHome = Platform.select({
  ios: `${RNFS.DocumentDirectoryPath}/picADay`,
  android: `${RNFS.DownloadDirectoryPath}`,
});

export const dirPictures = `${dirHome}/PicADay`;
