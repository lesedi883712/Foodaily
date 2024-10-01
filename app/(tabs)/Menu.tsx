// Start screens/MenuScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Dish } from './types';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
// Import the initial dishes data
import initialDishes from './data/menu.json';

const MenuScreen: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [newDish, setNewDish] = useState<Dish>({
    id: '',
    name: '',
    description: '',
    course: '',
    price: '',
    image: '',
    available: true,
  });

  const DISHES_FILE = FileSystem.documentDirectory + 'menu.json';
  useEffect(() => {
    loadDishes();
  }, []);

  const loadDishes = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(DISHES_FILE);
      if (fileInfo.exists) {
        const fileContents = await FileSystem.readAsStringAsync(DISHES_FILE);
        setDishes(JSON.parse(fileContents));
      } else {
        // If the file doesn't exist, write the initial dishes to the file
        await FileSystem.writeAsStringAsync(DISHES_FILE, JSON.stringify(initialDishes));
        setDishes(initialDishes);
      }
    } catch (error) {
      console.error('Error loading dishes:', error);
      Alert.alert('Error', 'Failed to load dishes');
    }
  };
  

  const saveDishes = async (updatedDishes: Dish[]) => {
    try {
      await FileSystem.writeAsStringAsync(DISHES_FILE, JSON.stringify(updatedDishes));
    } catch (error) {
      console.error('Error saving dishes:', error);
      Alert.alert('Error', 'Failed to save dishes');
    }
  };
  

  const handleAddDish = async () => {
    if (!newDish.name || !newDish.description || !newDish.course || !newDish.price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const updatedDishes = [...dishes, { ...newDish, id: Date.now().toString() }];
    try {
      await saveDishes(updatedDishes);
      setDishes(updatedDishes);
      setNewDish({
        id: '',
        name: '',
        description: '',
        course: '',
        price: '',
        image: '',
        available: true,
      });
      Alert.alert('Success', 'New dish added successfully');
    } catch (error) {
      console.error('Error adding new dish:', error);
      Alert.alert('Error', 'Failed to add new dish');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Dish</Text>
      <TextInput
        style={styles.input}
        placeholder="Dish name"
        value={newDish.name}
        onChangeText={(text) => setNewDish({ ...newDish, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={newDish.description}
        onChangeText={(text) => setNewDish({ ...newDish, description: text })}
      />
      <Picker
        selectedValue={newDish.course}
        onValueChange={(itemValue) => setNewDish({ ...newDish, course: itemValue })}
        style={styles.picker}
      >
        <Picker.Item label="Select course" value="" />
        <Picker.Item label="Starter" value="starter" />
        <Picker.Item label="Main" value="main" />
        <Picker.Item label="Dessert" value="dessert" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={newDish.price}
        onChangeText={(text) => setNewDish({ ...newDish, price: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={newDish.image}
        onChangeText={(text) => setNewDish({ ...newDish, image: text })}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddDish}>
        <Text style={styles.addButtonText}>Add Dish</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    marginBottom: 10,
    ...Platform.select({
      android: {
        color: 'black',
        backgroundColor: 'white',
      }
    })
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MenuScreen;
// End screens/MenuScreen.tsx