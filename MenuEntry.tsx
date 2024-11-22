import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

export default function MenuEntry() {
  const [dishName, setDishName] = useState('');
  const [menuItems, setMenuItems] = useState([
    { dishName: 'Caesar Salad', description: 'Crispy romaine lettuce, croutons, and Caesar dressing', price: '59.99' },
    { dishName: 'Spaghetti Carbonara', description: 'Pasta with creamy sauce, pancetta, and parmesan cheese', price: '120.99' },
    { dishName: 'Chocolate Cake', description: 'Decadent cake with rich chocolate frosting', price: '45.99' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore the Menu</Text>

      {/* Menu Item List */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.dishName}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.dishName}>{item.dishName}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>R {item.price}</Text>
          </View>
        )}
      />
      
      {/* Add New Dish */}
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />
      <Button title="Add Dish" onPress={() => setMenuItems([...menuItems, { dishName, description: 'New Dish', price: '99.99' }])} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFAF0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6347',
    textAlign: 'center',
    marginBottom: 20,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  input: {
    height: 40,
    borderColor: '#FF6347',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});
