import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useQuery } from '@apollo/client';
import * as TalkRn from '@talkjs/expo';
import { View, Text } from "react-native"
import { useEffect, useRef, useState } from 'react';
import { INVOICE_DRIVER, GET_USER_DETAIL } from "../queries/users"
import AsyncStorage from '@react-native-async-storage/async-storage';

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }


export default function ChatScreen(props) {
  // const { data, loading, error } = useQuery(INVOICE_DRIVER) // DIGANTI JADI DIKIRIM VIA PARAMS DRIVERIDNYA
  // const { data: user, loading:userLoading, error:userError } = useQuery(GET_USER_DETAIL) // INI UDAH DPT DR ASYNCSTORAGE
  const [uId, setUId] = useState([])
  const getId = async () => {
    const id = await AsyncStorage.getItem('id')
    return setUId(id)
  }

  useEffect(() => {
    getId()
  }, [])

  // get user detail, assign ke other buat idnya dan namenya
  // get driver detail, assign ke me buat idnya
  // di user, bikin kebalikan
 

  // HARDCODE
  // const data = {
  //   getInvoiceById: {
  //     DriverId: 1
  //   }
  // }

  // const user = {
  //   getUserById: {
  //     username: 'yosinaga',
  //     _id: 2
  //   }
  // }


  const other = {
    // id: data?.getInvoiceById?.DriverId, // KIRIM VIA PARAMS AJAAAA
    id: 'driver-1', // KIRIM VIA PARAMS AJAAAA
    // id: {
    //   expoPushToken: '123',
    //   id: data?.getInvoiceById?.DriverId
    // },
    name: 'Driver',
    // email: 'alice@example.com',
    photoUrl: 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
    // welcomeMessage: 'Hey there! How are you? :-)',
    role: 'default',
    // custom: {
    //   expoPushToken: '123'
    // }
  };

  const me = {
    // id: user?.getUserById?._id,
    // id: +uId,
    id: `user-1`,
    name: 'Customer', //hardcode aja wkwk
    // email: 'Sebastian@example.com',
    photoUrl: 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
    // welcomeMessage: 'Hey, how can I help? https://google.com',
    role: 'default',
    custom: {
      // receiverId: data?.getInvoiceById?.DriverId, // KIRIM VIA PARAMS AJAAAA
      receiverId: '2', // KIRIM VIA PARAMS AJAAAA
      role: 'courier'
    }
  };

  const conversationBuilder = TalkRn.getConversationBuilder(
    TalkRn.oneOnOneId(me, other)
  );

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);

  

  return (
	<View style={{flex: 1, backgroundColor: "#fff", width: "100%"}}>
    <TalkRn.Session appId='tRccGe39' me={me} >
      <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
    </TalkRn.Session>
	</View>
  );
}
