import {PermissionsAndroid, PermissionStatus} from 'react-native';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';

interface Location {
  coords: {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  };
  mocked: boolean;
  provider: string;
  timestamp: number;
}

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
    return Promise.resolve(granted === 'granted');
  } catch (err) {
    return Promise.resolve(false);
  }
};

const getLocation = async (): Promise<GeoPosition> => {
  return new Promise<GeoPosition>(async (resolve, reject) => {
    const result = await requestLocationPermission();
    if (result) {
      Geolocation.getCurrentPosition(
        position => {
          resolve(position);
          // console.log(position);
          // return Promise.resolve(position);
          // setLocation(position);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
          reject('Não foi possível obter a posição atual de gps.');
          // return Promise.resolve(undefined);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      reject('Aplicativo sem permissão de acesso ao gps.');
    }
  });

  // const result = await requestLocationPermission();
  // if (result) {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       // console.log(position);
  //       return Promise.resolve(position);
  //       // setLocation(position);
  //     },
  //     error => {
  //       // See error code charts below.
  //       console.log(error.code, error.message);
  //       return Promise.resolve(undefined);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // } else {
  //   return Promise.resolve(undefined);
  // }
};

export {requestLocationPermission, getLocation};
export type {Location};
