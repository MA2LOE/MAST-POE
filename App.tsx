import React, { useState } from 'react';
import { SafeAreaView, Button, FlatList, View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import WelcomeScreen from './Welcome';
import MenuEntry from './MenuEntry';

type MenuItem = {
  dishName: string;
  description: string;
  course: string | null;
  price: string;
};

const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [showMenuEntry, setShowMenuEntry] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // New state to handle loading

  const premadeMeals: MenuItem[] = [
    { dishName: 'Caesar Salad', description: 'Fresh romaine, croutons, and Caesar dressing', course: 'Starter', price: '59.99' },
    { dishName: 'Spaghetti Carbonara', description: 'Classic Italian pasta dish with egg, cheese, pancetta, and pepper', course: 'Main', price: '120.99' },
    { dishName: 'Chocolate Cake', description: 'Rich and moist chocolate cake with creamy frosting', course: 'Dessert', price: '45.99' },
  ];

  const handleAddPremadeMeal = (meal: MenuItem) => {
    setSelectedItems((prevItems) => [...prevItems, meal]);
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const calculateTotal = () => selectedItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);

  // Handle the order confirmation with loading state
  const handleConfirmOrder = () => {
    setIsLoading(true); // Start loading

    // Simulate a network request or order processing
    setTimeout(() => {
      setIsLoading(false); // Stop loading after 2 seconds
      Alert.alert('Order Confirmed', 'Your order has been successfully placed!');
    }, 2000); // Simulate a 2-second delay
  };

  if (showWelcomeScreen) {
    return <WelcomeScreen onStart={() => setShowWelcomeScreen(false)} />;
  }

  if (showMenuEntry) {
    return (
      <MenuEntry
        setSelectedItems={setSelectedItems}
        onGoBack={() => setShowMenuEntry(false)} // <-- Fix: Using onGoBack instead of onViewOrderSummary
      />
    );
  }

  const filteredItems = filter ? selectedItems.filter(item => item.course === filter) : selectedItems;

  return (
    <SafeAreaView style={styles.container}>
      {!showResults && (
        <>
          <Text style={styles.title}>Chef's Premade Meals</Text>
          <FlatList
            data={premadeMeals}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.heading}>Dish Name:</Text>
                <Text style={styles.itemText}>{item.dishName} - R {item.price}</Text>
                <Text>{item.description}</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => handleAddPremadeMeal(item)}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}

      {showResults && (
        <View>
          <Text style={styles.title}>Order Summary</Text>
          <FlatList
            data={filteredItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <Text style={styles.heading}>Dish Name:</Text>
                <Text style={styles.itemText}>{item.dishName} - R {item.price}</Text>
                <Text style={styles.courseText}>Course: {item.course}</Text>
                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(index)}>
                  <Text style={styles.removeButtonText}>-</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Text style={styles.total}>Total: R {calculateTotal()}</Text>

          {/* Confirm Order Button */}
          <TouchableOpacity 
            style={[styles.confirmButton, isLoading && styles.confirmButtonDisabled]} 
            onPress={handleConfirmOrder} 
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Processing...' : 'Confirm Order'}
            </Text>
          </TouchableOpacity>

          <Button title="Go Back" onPress={() => setShowResults(false)} />
        </View>
      )}

      {!showResults && <Button title="Add Custom Dishes" onPress={() => setShowMenuEntry(true)} />}
      <Button title="View Order Summary" onPress={() => setShowResults(true)} disabled={selectedItems.length === 0} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  heading: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  courseText: { fontSize: 14, fontStyle: 'italic', color: 'gray' },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#ddd', flexDirection: 'column' },
  itemText: { fontSize: 18 },
  addButton: { backgroundColor: '#FF7043', padding: 10, borderRadius: 20, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  addButtonText: { fontSize: 24, color: '#fff' },
  removeButton: { backgroundColor: '#FF7043', padding: 10, borderRadius: 20, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  removeButtonText: { fontSize: 24, color: '#fff' },
  total: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
  confirmButton: { 
    backgroundColor: '#28a745', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 20 
  },
  confirmButtonDisabled: {
    backgroundColor: '#ddd', // Light gray color when loading
  },
  buttonText: { fontSize: 19, fontWeight: 'bold', color: '#FFF' },
});

export default App;
