import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, FlatList, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// Types
type MenuItem = {
  dishName: string;
  description: string;
  course: string | null;
  price: string;
};

// MenuEntry Component
const MenuEntry: React.FC<{ setSelectedItems: React.Dispatch<React.SetStateAction<MenuItem[]>> }> = ({ setSelectedItems }) => {
  const [dishName, setDishName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [course, setCourse] = useState<string | null>(null);
  const [price, setPrice] = useState<string>('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [premadeMeals, setPremadeMeals] = useState<MenuItem[]>([
    { dishName: 'Caesar Salad', description: 'Fresh romaine, croutons, and Caesar dressing', course: 'Starter', price: '59.99' },
    { dishName: 'Spaghetti Carbonara', description: 'Classic Italian pasta dish with egg, cheese, pancetta, and pepper', course: 'Main', price: '120.99' },
    { dishName: 'Chocolate Cake', description: 'Rich and moist chocolate cake with creamy frosting', course: 'Dessert', price: '45.99' },
  ]);

  const handleAddMenuItem = () => {
    if (!dishName || !description || !course || !price) {
      Alert.alert('Error', 'Please fill out all fields before adding an item.');
      return;
    }

    if (isNaN(parseFloat(price))) {
      Alert.alert('Error', 'Please enter a valid number for the price.');
      return;
    }

    const newItem: MenuItem = { dishName, description, course, price };
    setMenuItems((prevItems) => [...prevItems, newItem]);
    setDishName('');
    setDescription('');
    setCourse(null);
    setPrice('');
  };

  const handleAddPremadeMeal = (meal: MenuItem) => {
    setMenuItems((prevItems) => [...prevItems, meal]);
    setPremadeMeals((prevMeals) => prevMeals.filter((item) => item.dishName !== meal.dishName));
  };

  const calculateTotalPrice = (items: MenuItem[]): string => {
    const total = items.reduce((accum, item) => accum + parseFloat(item.price), 0);
    return total.toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chef's Menu Entry</Text>
      <TextInput style={styles.input} placeholder="Dish Name" value={dishName} onChangeText={setDishName} textAlign="center" />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.courseButton, course === 'starter' && styles.selectedButton]} onPress={() => setCourse('starter')}>
          <Text style={styles.buttonText}>Starter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.courseButton, course === 'main' && styles.selectedButton]} onPress={() => setCourse('main')}>
          <Text style={styles.buttonText}>Main</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.courseButton, course === 'dessert' && styles.selectedButton]} onPress={() => setCourse('dessert')}>
          <Text style={styles.buttonText}>Dessert</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <Button title="Add Menu Item" onPress={handleAddMenuItem} />
      <Text style={styles.premadeMealsTitle}>Pre-Made Chef Meals:</Text>
      <FlatList
        data={premadeMeals}
        keyExtractor={(item) => item.dishName}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>{item.dishName}</Text>
            <Text style={styles.menuText}>{item.description}</Text>
            <Text style={styles.menuText}>{item.course}</Text>
            <Text style={styles.menuText}>R {item.price}</Text>
            <TouchableOpacity onPress={() => handleAddPremadeMeal(item)}>
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.footer}>Total Items: {menuItems.length}</Text>
      <Text style={styles.totalPrice}>Total Price: R {calculateTotalPrice(menuItems)}</Text>
      <Button title="Proceed to Results" onPress={() => setSelectedItems(menuItems)} />
    </SafeAreaView>
  );
};

// Results Component
const Results: React.FC<{ selectedItems: MenuItem[], setSelectedItems: React.Dispatch<React.SetStateAction<MenuItem[]>> }> = ({ selectedItems, setSelectedItems }) => {
    const [filter, setFilter] = useState('');
    const [courseFilter, setCourseFilter] = useState<string | null>(null);
    const [filteredItems, setFilteredItems] = useState(selectedItems);
  
    const handleFilterChange = (value: string) => {
      setFilter(value);
      updateFilteredItems(value, courseFilter);
    };
  
    const handleCourseFilterChange = (course: string | null) => {
      setCourseFilter(course);
      updateFilteredItems(filter, course);
    };
  
    const updateFilteredItems = (textFilter: string, course: string | null) => {
      setFilteredItems(
        selectedItems.filter(
          (item) =>
            (item.dishName.toLowerCase().includes(textFilter.toLowerCase()) ||
              item.description.toLowerCase().includes(textFilter.toLowerCase())) &&
            (!course || item.course?.toLowerCase() === course?.toLowerCase())
        )
      );
    };
  
    const handleRemoveItem = (itemToRemove: MenuItem) => {
      const updatedItems = selectedItems.filter((item) => item.dishName !== itemToRemove.dishName);
      setSelectedItems(updatedItems);
      updateFilteredItems(filter, courseFilter);
    };
  
    const handleConfirm = () => {
      alert('Your selection has been confirmed!');
    };
  
    const calculateTotalPrice = (items: MenuItem[]): string => {
      const total = items.reduce((accum, item) => accum + parseFloat(item.price), 0);
      return total.toFixed(2);
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Your Selection</Text>
        <TouchableOpacity onPress={() => setSelectedItems([])}>
          <Text style={styles.addText}>Back to Menu</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Search items..."
          value={filter}
          onChangeText={handleFilterChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Filter by course (starter, main, dessert)..."
          value={courseFilter || ''}
          onChangeText={(text) => handleCourseFilterChange(text || null)}
        />
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.dishName}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>{item.dishName}</Text>
              <Text style={styles.menuText}>{item.description}</Text>
              <Text style={styles.menuText}>{item.course}</Text>
              <Text style={styles.menuText}>R {item.price}</Text>
              <TouchableOpacity onPress={() => handleRemoveItem(item)}>
                <Text style={styles.addText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <Text style={styles.totalPrice}>Total Price: R {calculateTotalPrice(filteredItems)}</Text>
        <Button title="Confirm" onPress={handleConfirm} />
      </SafeAreaView>
    );
  };
  
  

// Main App Component
const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);

  return selectedItems.length === 0 ? (
    <MenuEntry setSelectedItems={setSelectedItems} />
  ) : (
    <Results selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
  );
};

// Styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#F7F7F7', // Very light gray for a clean and neutral background
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333333', // Dark gray for a subtle, professional title
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: '#CCCCCC', // Light gray for input borders
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
      borderRadius: 8,
      backgroundColor: '#FFFFFF', // White for inputs
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    courseButton: {
      flex: 1,
      padding: 12,
      backgroundColor: '#555555', // Medium gray for buttons
      borderRadius: 8,
      marginHorizontal: 5,
      alignItems: 'center',
    },
    selectedButton: {
      backgroundColor: '#FF7043', // Soft orange as the single accent color for selected states
    },
    buttonText: {
      color: '#FFFFFF', // White for button text
      fontSize: 16,
      fontWeight: 'bold',
    },
    menuItem: {
      padding: 15,
      borderRadius: 8,
      backgroundColor: '#FAFAFA', // Very light gray for menu items
      marginVertical: 5,
      borderWidth: 1,
      borderColor: '#E0E0E0', // Light gray for item borders
    },
    menuText: {
      fontSize: 16,
      color: '#555555', // Medium gray for text
    },
    addText: {
      color: '#FF7043', // Accent orange for links and actionable text
      marginTop: 10,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    premadeMealsTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      textAlign: 'center',
      color: '#333333', // Dark gray for section titles
    },
    footer: {
      fontSize: 20,
      marginTop: 20,
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#555555', // Medium gray for footer text
    },
    totalPrice: {
      fontSize: 20,
      marginTop: 10,
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#333333', // Dark gray for emphasis
    },
  });
  
  

export default App;
