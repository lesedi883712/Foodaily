// Start screens/HomeScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DishCard from '../Dish'; // Assuming you have a DishCard component
import { Dish } from './types';
import * as FileSystem from 'expo-file-system';
import { useFocusEffect } from '@react-navigation/native';
import initialDishes from './data/menu.json'; // Import initial dishes

const DISHES_FILE = FileSystem.documentDirectory + 'menu.json';

const HomeScreen: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>(initialDishes); // Initialize with the static data
  const [searchQuery, setSearchQuery] = useState('');

  // This function loads dishes from the file system
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

  // useFocusEffect reloads dishes whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadDishes();
    }, [])
  );

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search dishes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <Text style={styles.totalItems}>Total menu items: {filteredDishes.length}</Text>
      <FlatList
        data={filteredDishes}
        renderItem={({ item }) => <DishCard dish={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 30,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  totalItems: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
    padding: 7,
    backgroundColor: '#f0f0f0',
    borderRadius: 100,
    width: 150,
    textAlign: 'center',
  },
});

export default HomeScreen;
// End screens/HomeScreen.tsx
