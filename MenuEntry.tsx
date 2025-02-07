import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, FlatList, View, StyleSheet, Alert, Button } from 'react-native';

type MenuItem = {
  dishName: string;
  description: string;
  course: string | null;
  price: string;
};

const MenuEntry: React.FC<{ setSelectedItems: React.Dispatch<React.SetStateAction<MenuItem[]>>; onGoBack: () => void }> = ({ setSelectedItems, onGoBack }) => {
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
    setSelectedItems((prevItems) => [...prevItems, newItem]);
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
      <TouchableOpacity style={styles.addButton} onPress={handleAddMenuItem}>
        <Text style={styles.addButtonText}>Add Menu Item</Text>
      </TouchableOpacity>

      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.heading}>Dish Name:</Text>
            <Text style={styles.itemText}>{item.dishName} - R {item.price}</Text>
            <Text style={styles.courseText}>Course: {item.course}</Text>
          </View>
        )}
      />

      <Button title="Go Back" onPress={onGoBack} color="#FF7043" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  title: { fontSize: 26, fontWeight: '700', textAlign: 'center', marginBottom: 20, color: '#333' },
  input: { height: 50, borderWidth: 1, borderRadius: 10, marginBottom: 12, paddingLeft: 15, borderColor: '#E0E0E0', backgroundColor: '#F5F5F5', fontSize: 16 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  courseButton: { flex: 1, padding: 14, backgroundColor: '#E0E0E0', borderRadius: 10, marginHorizontal: 5, alignItems: 'center' },
  selectedButton: { backgroundColor: '#FF7043' },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  addButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  addButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  heading: { fontSize: 16, fontWeight: '600', marginTop: 10, color: '#555' },
  courseText: { fontSize: 14, fontStyle: 'italic', color: '#888' },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#ddd', backgroundColor: '#F9F9F9', borderRadius: 8, marginVertical: 5 },
  itemText: { fontSize: 18, color: '#333' },
});

export default MenuEntry;
