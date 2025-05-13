import {Platform, Alert} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  requestMultiple,
  check,
  openSettings,
} from 'react-native-permissions';
import {isIOS} from './dimension';

const currentVersion = Number(Platform.Version);

const permissionComponent = {
  Camera: (success, err) => {
    check(isIOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)
      .then(result => {
        switch (result) {
          case RESULTS.GRANTED:
            success(true);
            return;
          case RESULTS.DENIED:
            requestPermission();
            return;
          case RESULTS.BLOCKED:
            showBlockedAlert();
            return;
          case RESULTS.UNAVAILABLE:
            success(false);
            return;
          default:
            success(false);
            return;
        }
      })
      .catch(() => {
        err();
      });

    function requestPermission() {
      requestMultiple(
        isIOS ? [PERMISSIONS.IOS.CAMERA] : [PERMISSIONS.ANDROID.CAMERA],
      )
        .then(res => {
          const result = isIOS
            ? res[PERMISSIONS.IOS.CAMERA]
            : res[PERMISSIONS.ANDROID.CAMERA];

          let status = true;
          switch (result) {
            case RESULTS.GRANTED:
              break;
            case RESULTS.DENIED:
            case RESULTS.BLOCKED:
              status = false;
              break;
            case RESULTS.UNAVAILABLE:
              break;
            default:
              break;
          }
          success(status);
        })
        .catch(() => {
          err();
        });
    }

    function showBlockedAlert() {
      Alert.alert(
        'Permission Blocked',
        'It looks like you have blocked camera access. To use this feature, please enable camera permission in your device settings.',
        [
          {
            text: 'Go to Settings',
            onPress: () =>
              openSettings().catch(() => console.warn('Cannot open settings')),
          },
          {text: 'Cancel', style: 'cancel'},
        ],
      );
    }
  },

  Gallery: (success, err) => {
    check(
      isIOS
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : currentVersion < 33
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    )
      .then(result => {
        switch (result) {
          case RESULTS.GRANTED:
            success(true);
            return;
          case RESULTS.DENIED:
            requestGalleryPermission();
            return;
          case RESULTS.BLOCKED:
            showBlockedGalleryAlert();
            return;
          case RESULTS.UNAVAILABLE:
            success(false);
            return;
          case RESULTS.LIMITED:
            success(true);
            return;
          default:
            success(false);
            return;
        }
      })
      .catch(() => {
        err();
      });

    function requestGalleryPermission() {
      requestMultiple(
        isIOS
          ? [
              PERMISSIONS.IOS.PHOTO_LIBRARY,
              PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
            ]
          : currentVersion < 33
          ? [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]
          : [PERMISSIONS.ANDROID.READ_MEDIA_IMAGES],
      )
        .then(res => {
          const result = isIOS
            ? res[PERMISSIONS.IOS.PHOTO_LIBRARY]
            : currentVersion < 33
            ? res[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]
            : res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES];

          let status = true;
          switch (result) {
            case RESULTS.GRANTED:
              break;
            case RESULTS.DENIED:
            case RESULTS.BLOCKED:
              status = false;
              break;
            case RESULTS.UNAVAILABLE:
              break;
            default:
              break;
          }
          success(status);
        })
        .catch(() => {
          err();
        });
    }

    function showBlockedGalleryAlert() {
      Alert.alert(
        'Permission Blocked',
        'It looks like you have blocked photo library access. To use this feature, please enable photo library permission in your device settings.',
        [
          {
            text: 'Go to Settings',
            onPress: () =>
              openSettings().catch(() => console.warn('Cannot open settings')),
          },
          {text: 'Cancel', style: 'cancel'},
        ],
      );
    }
  },
};

export default permissionComponent;
