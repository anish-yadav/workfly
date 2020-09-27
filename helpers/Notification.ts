import { Platform } from 'react-native'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'

export const registerForPushNotificationsAsync = async  (): Promise<string | null> => {
  console.log("requesting permission")
  console.log(await Permissions.getAsync(Permissions.NOTIFICATIONS))
  let token:string = '';
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    console.log("in device")
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
     // alert('Failed to get push token for push notification!');
      return  null;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Token is ',token);
  } else {
    //alert('Must use physical device for Push Notifications');
    console.log("Must use physical device");
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}