import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>#Snaplaw</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1696E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    fontSize: 48,
    color: '#fff'
  }
});
