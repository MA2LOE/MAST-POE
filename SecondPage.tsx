import React from 'react';
import { SafeAreaView, Text, FlatList, View, Button, StyleSheet } from 'react-native';

type MenuItem = {
  dishName: string;
  description: string;
  course: string | null;
  price: string;
};

const SecondaryPage: React.FC<{ selectedItems: MenuItem[]; goBack: () => void }> = ({ selectedItems, goBack }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      <FlatList
        data={selectedItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.dishName} - R {item.price}</Text>
          </View>
        )}
      />
      <Button title="Go Back" onPress={goBack} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
  itemText: { fontSize: 18 },
});

export default SecondaryPage;
