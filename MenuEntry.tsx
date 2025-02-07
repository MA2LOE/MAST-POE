import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, FlatList, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

type MenuItem = {
  dishName: string;
  description: string;
  course: string | null;
  price: string;
};

const MenuEntry: React.FC<{ setSelectedItems: React.Dispatch<React.SetStateAction<MenuItem[]>> }> = ({ setSelectedItems }) => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<string | null>(null);
  const [price, setPrice] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const handleAddMenuItem = () => {
    if (!dishName || !description || !course || !price) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    if (isNaN(parseFloat(price))) {
      Alert.alert('Error', 'Enter a valid price.');
      return;
    }

    const newItem: MenuItem = { dishName, description, course, price };
    setMenuItems((prev) => [...prev, newItem]);
    setDishName('');
    setDescription('');
    setCourse(null);
    setPrice('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chef's Custom Dishes</Text>
      <TextInput style={styles.input} placeholder="Dish Name" value={dishName} onChangeText={setDishName} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <View style={styles.buttonContainer}>
        {['starter', 'main', 'dessert'].map((c) => (
          <TouchableOpacity key={c} style={[styles.courseButton, course === c && styles.selectedButton]} onPress={() => setCourse(c)}>
            <Text style={styles.buttonText}>{c.charAt(0).toUpperCase() + c.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <Button title="Add Menu Item" onPress={handleAddMenuItem} />
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.dishName} - R {item.price}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F7F7F7' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { height: 40, borderWidth: 1, borderRadius: 8, marginBottom: 10, paddingLeft: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  courseButton: { flex: 1, padding: 12, backgroundColor: '#555', borderRadius: 8, marginHorizontal: 5, alignItems: 'center' },
  selectedButton: { backgroundColor: '#FF7043' },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
});

export default MenuEntry;
