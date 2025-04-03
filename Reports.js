import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Reports() {
  return (
    <View style={{ styles.container }}>
      <Text style={{ styles.text }}>Reports Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
