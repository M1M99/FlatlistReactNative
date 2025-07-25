import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, Platform, SafeAreaView, SectionList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import products, { CategoryType } from './../data/Products';
import { ThemedText } from './ThemedText';

type Props = {
  category: CategoryType | null;
};

export default function ProductsPage({ category }: Props) {
  const [newProduct, setNewProduct] = useState('');
  const [productData, setProductData] = useState<
    Record<CategoryType, { name: string; price: number }[]>
  >(products);
  const navigation = useNavigation();
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    navigation.setParams({ cart });
  }, [cart]);

  if (!category) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Please select a category</Text>
      </SafeAreaView>
    );
  }

  const handleAdd = (item: { name: string; price: number }) => {
    Alert.alert(item.name, 'Added Cart Successfully');
    setCart(prevCart => [...prevCart, item]);
  };

  const handleAddProduct = () => {
    if (newProduct.trim() === '' || !category) return;
    const newItem = {
      name: newProduct.trim(),
      price: Math.floor(Math.random() * 10) + 1, 
    };
    setProductData(prev => ({
      ...prev,
      [category]: [...prev[category], newItem]
    }));

    setNewProduct('');
  };


  const prods = productData[category];

  const sectionData = [
    {
      title: `${category} Products`,
      data: productData[category],
    },
  ];
  SectionList<{ name: string; price: number }, { title: string; data: { name: string; price: number }[] }>
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.navigate('cart', { cart })} ><Text style={styles.cart}>🛒</Text></TouchableOpacity>
        <Text style={{ marginVertical: 'auto' }}>
          {/* {cart.map(item => item.name).join(', ')} */}
          {cart.length} Product / {cart.reduce((a, current) => a + current.price, 0)} $
        </Text>
      </View>
      <SectionList
        sections={sectionData}
        keyExtractor={(item) => item.name}
        renderSectionHeader={({ section: { title } }) => (
          <ThemedText type="defaultSemiBold" style={styles.sectionHeader}>{title}</ThemedText>
        )}
        renderItem={({ item }) => (
          <View style={styles.containerHelper}>
            <Text style={styles.textProd}>{item.name}</Text>
            <TouchableOpacity style={styles.btn} onPress={() => handleAdd(item)}>
              <Text>+ Əlavə et </Text>
            </TouchableOpacity>
          </View>
        )}
        style={{ flex: 1 }}
      />
      <View style={styles.addSection}>
        <TextInput
          style={styles.input}
          placeholder="New Product Name"
          value={newProduct}
          onChangeText={setNewProduct}
          onSubmitEditing={handleAddProduct}
        />
        <TouchableOpacity style={styles.btn} onPress={handleAddProduct}>
          <Text>+ Əlavə et</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
    paddingHorizontal: 16,
    flexDirection: 'column',
  },
  text: {
    fontSize: 22,
    padding: 20,
    fontWeight: '500',
    color: 'springgreen',
  },
  textProd: {
    fontSize: 18,
    paddingVertical: 1,
    paddingHorizontal: 7,
    fontWeight: '400',
    color: 'deepskyblue',
    textAlign: 'center'
  },
  sectionHeader: {
    fontSize: 20,
    paddingVertical: 12,
    color: 'black',
  },
  btn: {
    padding: 10,
    borderRadius: 4,
    borderColor: 'deepskyblue',
    borderStyle: 'dashed',
    borderWidth: 1,
    alignItems: 'center'
  },
  containerHelper: {
    padding: 10, flex: 1
  },
  addSection: {
    gap: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 20,
    borderRadius: 6,
    minHeight: 20,
  },
  cart: {
    fontSize: 20,
    marginVertical: 'auto'
  }
});
