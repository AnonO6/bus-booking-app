import React from 'react';
import {View, Image, Button, StyleSheet, Text, Modal} from 'react-native';
function TicketPurchasingDoneModal(props) {
  return (
    <Modal visible={props.isVisible}>
      <View
        style={{
          justifyContent: 'center',
          marginTop: 'auto',
          marginBottom: 'auto',
        }}>
        {/* <Image
          style={{
            width: 200,
            height: 200,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          source={require('./surprise.png')}
        /> */}
        <View style={styles.container}>
          <Image source={require('./surprise.png')} style={styles.image} />
        </View>
        <Text style={styles.text}>Ticket has been Purchased</Text>

        <Button title="OK" onPress={() => props.PurchaseDoneHandler()} />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  text: {
    marginTop: 100,
    fontSize: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#3498db',
    fontWeight: 'bold',
  },
});
export default TicketPurchasingDoneModal;
