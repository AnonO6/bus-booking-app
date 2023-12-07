import Scan from './Operator/scan';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function OperatorLogin() {
  // return <Scan />;
  return (
    <View>
      <Text style={styles.titleText}>COMING SOON</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40,
    backgroundColor: '#9FA8DA',
    minHeight: '100%',
    maxHeight: '100%',
  },
});

export default OperatorLogin;
