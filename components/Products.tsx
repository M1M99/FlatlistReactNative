import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Platform, SafeAreaView, SectionList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import products, { CategoryType } from './../data/Products';

type Props = {
  category: CategoryType | null;
};

export default function ProductsPage({ category }: Props) {
  const { width, height } = useWindowDimensions();
  const isLandScape = height < width
  const [newProduct, setNewProduct] = useState('');
  const [newPrice, setNewPrice] = useState('');
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
    if (newProduct.trim() === '' || !category || newPrice.trim() === '') {
      Alert.alert('All Fields Required')
      return
    };
    const newItem = {
      name: newProduct.trim(),
      price: parseFloat(newPrice)
    };
    setProductData(prev => ({
      ...prev,
      [category]: [...prev[category], newItem]
    }));

    setNewProduct('');
    setNewPrice('');
  };

  const handleDelete = (item: { name: string; price: number }) => {
    if (!category) return;

    Alert.alert(
      "Delete Product",
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setProductData(prev => ({
              ...prev,
              [category]: prev[category].filter(prod => prod.name !== item.name)
            }));
            Alert.alert(`${item.name} Deleted Successfully`)
          }
        }
      ]
    );
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
      {/* <SectionList /// bununla landscape olmurdu yenede 2 si ilede misal yazdim
        sections={sectionData}
        keyExtractor={(item) => item.name}
        renderSectionHeader={({ section: { title } }) => (
          <ThemedText type="defaultSemiBold" style={styles.sectionHeader}>{title}</ThemedText>
        )}
        renderItem={({ item }) => (
          <View style={styles.containerHelper}>
            <Text style={styles.textProd}>{item.name}</Text>
            <FontAwesome onPress={() => handleDelete(item)} name='trash' style={styles.iconTrash}></FontAwesome>
            <TouchableOpacity style={styles.btn} onPress={() => handleAdd(item)}>
              <Text>+ Əlavə et </Text>
            </TouchableOpacity>
          </View>
        )}
        style={{ flex: 1 }}
      /> */}
      <FlatList // adaptiv ui ucun flatlist istifade etdim sectionlist (commentde olan hissede) isleyir sadece adaptiv ui ucun flat list.
        data={productData[category]}
        keyExtractor={(item) => item.name}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={[!isLandScape ? styles.containerHelper : styles.landscape]}>
            <Text style={styles.textProd}>{item.name}</Text>
            <FontAwesome onPress={() => handleDelete(item)} name='trash' style={styles.iconTrash}></FontAwesome>
            <TouchableOpacity style={styles.btn} onPress={() => handleAdd(item)}>
              <Text>+ Əlavə et </Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ gap: 8 }}
      />

      <View style={[styles.addSection,{flex:1,margin:10}]}>
        <TextInput
          style={!isLandScape ? styles.input : styles.landscapeInput}
          placeholder="New Product Name"
          value={newProduct}
          onChangeText={setNewProduct}
          onSubmitEditing={handleAddProduct}
        />
        <TextInput
          style={!isLandScape ? styles.input : styles.landscapeInput}
          placeholder="Price"
          keyboardType="numeric"
          value={newPrice}
          onChangeText={setNewPrice}
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
    alignItems: 'center',
  },
  addSection: {
    gap: 3,
    flex:1
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 6,
    minHeight: 20,
  },
  landscapeInput: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius:5
  },
  cart: {
    fontSize: 20,
    marginVertical: 'auto'
  },
  iconTrash: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'deepskyblue',
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
    minHeight: 20,
    marginHorizontal: 'auto'
  },
  containerHelper: {
    paddingHorizontal: 2,
    paddingVertical: 2,
    flex: 1
  },
  landscape: {
    flex: 1,
    marginHorizontal: 4
  }

});
