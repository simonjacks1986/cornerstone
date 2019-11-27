import { Platform } from 'react-native';
const RNFS = require('react-native-fs');

export const dirHome = Platform.select({
  ios: '${RNFS.DocumentDirectoryPath}/cmm',
  android: '${RNFS.ExternalStorageDirectoryPath}/cmm'
});

export const dirPicutures = '${dirHome}/Pictures';
export const dirAudio = '${dirHome}/Audio';