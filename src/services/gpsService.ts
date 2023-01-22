import {PermissionsAndroid, PermissionStatus} from 'react-native';

const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const granted: PermissionStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      // {
      //   title: 'Atenção',
      //   message: 'Para ',
      //   // buttonNeutral: 'Perguntar depois',
      //   buttonNegative: 'Não',
      //   buttonPositive: 'Sim',
      // },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return Promise.resolve(true);
    } else {
      console.log('You cannot use Geolocation');
      return Promise.resolve(false);
    }
  } catch (err) {
    return Promise.resolve(false);
  }
};

export {requestLocationPermission};
