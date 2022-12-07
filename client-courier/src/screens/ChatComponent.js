import { useQuery } from '@apollo/client';
import * as TalkRn from '@talkjs/expo';
import { View, Text } from "react-native"
import { INVOICE_DRIVER, GET_USER_DETAIL } from "../queries/drivers"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChatComponent(props) {
  // const { data, loading, error } = useQuery(INVOICE_DRIVER)
  // const { data: user, loading:userLoading, error:userError } = useQuery(GET_USER_DETAIL)
  // get user detail, assign ke other buat idnya dan namenya
  // get driver detail, assign ke me buat idnya
  // di user, bikin kebalikan

  const [dId, setDId] = useState([])
  const getId = async () => {
    const id = await AsyncStorage.getItem('id')
    return setDId(id)
  }

  useEffect(() => {
    getId()
  }, [])

  
  // HARDCODE
  // const data = {
  //   getInvoiceById: {
  //     DriverId: 1
  //   }
  // }

  // const user = {
  //   getUserById: {
  //     username: 1,
  //     _id: 2
  //   }
  // }

  const me = {
    // id: data?.getInvoiceById?.DriverId,
    id: setDId, //dari async storage
    name: 'You',
    // email: 'alice@example.com',
    photoUrl: 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
    // welcomeMessage: 'Hey there! How are you? :-)',
    role: 'default',
  };

  const other = {
    // id: user?.getUserById?._id,
    id: user?.getUserById?._id, //dpt dari ROUTE PARAMSSS invoice userid
    name: 'adam',
    // email: 'Sebastian@example.com',
    photoUrl: 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
    // welcomeMessage: 'Hey, how can I help? https://google.com',
    role: 'default',
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
