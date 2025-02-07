import React, { useState } from 'react';
import { SafeAreaView, Button, FlatList, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
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

  // Pre-made meals from the chef
  const [premadeMeals] = useState<MenuItem[]>([
    { dishName: 'Caesar Salad', description: 'Fresh romaine, croutons, and Caesar dressing', course: 'Starter', price: '59.99' },
    { dishName: 'Spaghetti Carbonara', description: 'Classic Italian pasta dish with egg, cheese, pancetta, and pepper', course: 'Main', price: '120.99' },
    { dishName: 'Chocolate Cake', description: 'Rich and moist chocolate cake with creamy frosting', course: 'Dessert', price: '45.99' },
  ]);

  // Handle adding premade meal to the order summary
  const handleAddPremadeMeal = (meal: MenuItem) => {
    setSelectedItems((prevItems) => [...prevItems, meal]);
  };

  // Handle removing an item from the order
  const handleRemoveItem = (index: number) => {
    const updatedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(updatedItems);
  };

  // Calculate total price of selected items
  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
  };

  // Disable "Place Order" if there are no items or total is 0
  const isPlaceOrderDisabled = calculateTotal() === '0.00' || selectedItems.length === 0;

  // Show Welcome screen when the app first starts
  if (showWelcomeScreen) {
    return <WelcomeScreen onStart={() => setShowWelcomeScreen(false)} />;
  }

  // Show "Menu Entry" when clicking on "Add Custom Dishes"
  if (showMenuEntry) {
    return <MenuEntry setSelectedItems={setSelectedItems} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Show premade meals only if not on MenuEntry page */}
      {!showMenuEntry && !showResults && (
        <View>
          <Text style={styles.title}>Chef's Premade Meals</Text>
          <FlatList
            data={premadeMeals}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>{item.dishName} - R {item.price}</Text>
                <Text>{item.description}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddPremadeMeal(item)}
                >
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}

      {/* Order Summary Page */}
      {showResults && (
        <View>
          <Text style={styles.title}>Order Summary</Text>
          <FlatList
            data={selectedItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>{item.dishName} - R {item.price}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(index)}
                >
                  <Text style={styles.removeButtonText}>-</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Text style={styles.total}>Total: R {calculateTotal()}</Text>
          <Button
            title="Place Order"
            onPress={() => alert('Order placed!')}
            disabled={isPlaceOrderDisabled}
          />
          <Button title="Go Back" onPress={() => setShowResults(false)} />
        </View>
      )}

      {/* Show 'Add Custom Dishes' button only when not on the MenuEntry page */}
      {!showMenuEntry && (
        <Button title="Add Custom Dishes" onPress={() => setShowMenuEntry(true)} />
      )}

      {/* View Order Summary button */}
      <Button title="View Order Summary" onPress={() => setShowResults(true)} disabled={selectedItems.length === 0} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#ddd', flexDirection: 'row', justifyContent: 'space-between' },
  itemText: { fontSize: 18, flex: 1 },
  addButton: {
    backgroundColor: '#FF7043',
    padding: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: { fontSize: 24, color: '#fff' },
  removeButton: {
    backgroundColor: '#FF7043',
    padding: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: { fontSize: 24, color: '#fff' },
  total: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
});

export default App;
