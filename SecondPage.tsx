import React, { useState } from 'react';
import { SafeAreaView, Text, FlatList, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';

type MenuItem = {
  dishName: string;
  description: string;
  course: string | null;
  price: string;
};

const SecondaryPage: React.FC<{ selectedItems: MenuItem[]; goBack: () => void }> = ({ selectedItems, goBack }) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Function to handle order confirmation
  const handleConfirmOrder = () => {
    setOrderConfirmed(true); // Set orderConfirmed state to true
    Alert.alert("Order Confirmed", "Your order has been successfully placed!");
  };

  // Function to handle purchase confirmation
  const handleConfirmPurchase = () => {
    Alert.alert("Purchase Successful", "Your payment has been processed successfully!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>

      <FlatList
        data={selectedItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.dishName}>{item.dishName}</Text>
            <Text style={styles.price}>R {item.price}</Text>
            <Text style={styles.course}>{item.course}</Text>
          </View>
        )}
      />

      {/* Buttons Container */}
      <View style={styles.buttonContainer}>
        {!orderConfirmed && (
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
            <Text style={styles.buttonText}>Confirm Order</Text>
          </TouchableOpacity>
        )}

        {orderConfirmed && (
          <TouchableOpacity style={styles.purchaseButton} onPress={handleConfirmPurchase}>
            <Text style={styles.buttonText}>Confirm Purchase</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.goBackButton} onPress={goBack}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    paddingTop: 40,  // Added extra padding on top for better spacing
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
    fontFamily: 'Arial',  // Chose a more modern and elegant font
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  dishName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 18,
    fontWeight: '500',
    color: '#28a745',
    marginTop: 6,
  },
  course: {
    fontSize: 16,
    fontWeight: '400',
    color: '#777',
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#28a745',
    padding: 18,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  purchaseButton: {
    backgroundColor: '#007bff',
    padding: 18,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  goBackButton: {
    backgroundColor: '#FF7043',
    padding: 18,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#FF7043',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: 1,  // Adding a bit of letter spacing for elegance
  },
});

export default SecondaryPage;
