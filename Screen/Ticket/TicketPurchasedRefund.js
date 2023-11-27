import React, {useState} from 'react';
import {View, Button, Text, TouchableOpacity} from 'react-native';
//FOR QR CODE
//Dont forget to add below to QRProject/Android/app/src/main/AndroidManifest.xml
/* <uses-permission android:name=" android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name=" android.permission.READ_EXTERNAL_STORAGE"/>
    

<application
...
android:requestLegacyExternalStorage="true"></application> */

import QRCode from 'react-native-qrcode-svg';
// Importing Modal
import RefundModal from '../../Components/Modals/TicketPurchasedRefundModal';
import Input from '../../Components/Component/InputComponent';
// Importing styles
import {GlobalBackgroundColors, primaryButton} from '../../Styles/global';

{
  /* />
<Text>Ticket Purchased Refund</Text>
<Button title="Refund" onPress={()=>setModalVisible(true)} /> */
}
function TicketPurchasedRefund({navigation, route}) {
  console.log(route.params);
  // Function goes here
  const key = route.params.person.PhoneNumber; //Temporarly, will encrypt later
  const purchaseDone = () => {
    setModalVisible(false);
    navigation.navigate('HomeScreen');
  };
  // Data goes here
  var [isModalVisible, setModalVisible] = useState(false);
  var [mobileNo, changeMobileNo] = useState('');
  return (
    <View
      style={{
        backgroundColor: GlobalBackgroundColors.primaryColor,
        paddingBottom: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <QRCode
          size={370}
          style={{marginTop: 32, paddingHorizontal: 24}}
          value={key}
        />
      </View>
      <View style={{paddingBottom: 50}}></View>
      <View style={{display: isModalVisible ? 'flex' : 'none'}}>
        <RefundModal
          isVisible={isModalVisible}
          purchaseDone={() => purchaseDone()}
        />
      </View>
      <Text style={{color: GlobalBackgroundColors.ternaryColor}}>
        Please Enter LNMIIT BUS CARD mobile number for refund
      </Text>
      <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
        <Input
          secure={true}
          onchange={changeMobileNo}
          value={mobileNo}
          placeHolder="Mobile No"
        />
      </View>
      <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 20}}>
        <TouchableOpacity
          style={primaryButton}
          onPress={() => setModalVisible(true)}>
          <Text style={{marginLeft: 50}}>Refund</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default TicketPurchasedRefund;
