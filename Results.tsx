import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const NextPage: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome to the Next Page!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEFD5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B0000',
  },
});

export default NextPage;
