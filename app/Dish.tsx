// Start components/DishCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dish } from './(tabs)/types';

interface DishCardProps {
  dish: Dish;
}

const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      //onPress={() => navigation.navigate('Dish', { dish })}
      //onPress={() => (navigation.navigate as (screen: 'Dish', params: { dish: Dish }) => void)('Dish', { dish })}

    >
      <Image source={{ uri: dish.image }} style={styles.image} />
      <View style={styles.pillContainer}>
        <View style={styles.pill}>
          <Text style={styles.pillText}>{dish.course}</Text>
        </View>
        <View style={[styles.pill, { marginLeft: 10 }]}>
          <Text style={styles.pillText}>{dish.available ? 'Available' : 'Unavailable'}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{dish.name}</Text>
        <Text style={styles.description}>{dish.description}</Text>
        <Text style={styles.price}>R {dish.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: 'white',
    marginBottom: 15,
    
    borderColor: '#e6e6e6',
    borderWidth: 1,
    padding: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    
  },
  pillContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
  },
  pill: {
    backgroundColor: 'orange',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  pillText: {
    color: 'white',
    fontSize: 12,
  },
  content: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
});

export default DishCard;
// End components/DishCard.tsx