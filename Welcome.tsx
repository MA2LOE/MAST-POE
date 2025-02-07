import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const WelcomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gradientBackground} />
      <Text style={styles.title}>Welcome to the Chef's Kitchen</Text>
      <Text style={styles.subtitle}>Create and manage your menu with ease.</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#F5F5F5', 
    padding: 20,
    position: 'relative'
  },
  gradientBackground: {
    backgroundColor: '#FF7043', 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    zIndex: -1,
    opacity: 0.2, 
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 10, 
    color: '#333', 
    fontFamily: 'sans-serif-medium'
  },
  subtitle: { 
    fontSize: 20, 
    textAlign: 'center', 
    color: '#555', 
    marginBottom: 20,
    fontFamily: 'sans-serif-light'
  },
  buttonContainer: { 
    width: '100%', 
    paddingHorizontal: 50, 
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FF5722', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600',
  },
});

export default WelcomeScreen;
