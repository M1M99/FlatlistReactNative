import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function CartScreen() {
  const route = useRoute();
  const { cart } = route.params as { cart: { name: string; price: number }[] } || { cart: [] };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <FontAwesome
          size={300}
          color="#808080"
          name="shopping-basket"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Cart</ThemedText>
      </ThemedView>
      <SafeAreaView style={styles.container}>
        {cart.length === 0 ? (
          <Text>Cart Empty.</Text>
        ) : (
          cart.map((item, i) => (
            <View key={i} style={styles.item}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price} $</Text>
            </View>
          ))
        )}
        <Text style={styles.total}>
          Sum Amount: {cart.reduce((total, item) => total + item.price, 0)} $
        </Text>
      </SafeAreaView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  item: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  itemName: { fontSize: 18 },
  itemPrice: { fontSize: 18 },
  total: { marginTop: 20, fontSize: 20, fontWeight: 'bold' },
   headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
