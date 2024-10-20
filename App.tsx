import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';

// Define your course type according to your data structure
type Course = {
  label: string;
  value: string | null;
};

type MenuItem = {
  dishName: string;
  description: string;
  course: string | null;
  price: string;
};

const MenuEntry: React.FC = () => {
  const [dishName, setDishName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [course, setCourse] = useState<string | null>(null);
  const [price, setPrice] = useState<string>('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Pre-made chef meals
  const [premadeMeals, setPremadeMeals] = useState<MenuItem[]>([
    { dishName: 'Caesar Salad', description: 'Fresh romaine, croutons, and Caesar dressing', course: 'Starter', price: '59.99' },
    { dishName: 'Spaghetti Carbonara', description: 'Classic Italian pasta dish with egg, cheese, pancetta, and pepper', course: 'Main', price: '120.99' },
    { dishName: 'Chocolate Cake', description: 'Rich and moist chocolate cake with creamy frosting', course: 'Dessert', price: '45.99' },
  ]);

  // Function to calculate total price from menu items
  const calculateTotalPrice = (items: MenuItem[]): string => {
    const total = items.reduce((accum, item) => {
      return accum + parseFloat(item.price);
    }, 0);
    return total.toFixed(2); // Return total formatted to 2 decimal places
  };

  const handleAddMenuItem = () => {
    if (dishName && description && course && price) {
      const newItem: MenuItem = {
        dishName,
        description,
        course,
        price,
      };
      setMenuItems((prevItems) => [...prevItems, newItem]);

      // Reset state after adding
      setDishName('');
      setDescription('');
      setCourse(null);
      setPrice('');
    } else {
      alert("Please fill all fields");
    }
  };

  const handleRemoveMenuItem = (itemToRemove: MenuItem) => {
    setMenuItems((prevItems) => prevItems.filter(item => item.dishName !== itemToRemove.dishName));
  };

  const handleRemovePremadeMeal = (itemToRemove: MenuItem) => {
    setPremadeMeals((prevItems) => prevItems.filter(item => item.dishName !== itemToRemove.dishName));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chef's Menu Entry</Text>
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
        textAlign='center'
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      {/* Course Selection Buttons */}
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

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      
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
            <TouchableOpacity onPress={() => handleRemovePremadeMeal(item)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.userItemsTitle}>Your Added Menu Items:</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.dishName}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>{item.dishName}</Text>
            <Text style={styles.menuText}>{item.description}</Text>
            <Text style={styles.menuText}>{item.course}</Text>
            <Text style={styles.menuText}>R {item.price}</Text>
            <TouchableOpacity onPress={() => handleRemoveMenuItem(item)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.footer}>
        Total Items: {menuItems.length}
      </Text>
      <Text style={styles.totalPrice}>
        Total Price: R {calculateTotalPrice(menuItems)} {/* Call the function here */}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFEFD5', // Light background color for a decorative touch
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#8B0000', // Dark red color for the title
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#8B0000', // Dark red border color
    borderWidth: 2,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5, // Rounded corners for inputs
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  courseButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#8B0000',
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#FF6347', // Tomato color for selected button
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    backgroundColor: '#FFF8DC', // Light yellow background for menu items
    borderRadius: 5, // Rounded corners for menu items
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333', // Darker color for better readability
  },
  footer: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#8B0000',
  },
  premadeMealsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#8B0000', // Dark red for title
  },
  userItemsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#8B0000', // Dark red for title
  },
  removeText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#8B0000', // Use the same color for consistency
  },
});

export default MenuEntry;

