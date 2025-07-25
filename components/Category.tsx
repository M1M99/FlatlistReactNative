import { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CategoryType } from "../data/Products";

const categoriesMock: { name: CategoryType }[] = [
  { name: 'Fruits' },
  { name: 'Meat' },
  { name: 'Sweets' },
  { name: 'Drinks' }
];

function Category({ onCategorySelect }: { onCategorySelect: (cat: CategoryType) => void }) {
  const [categories, setCategories] = useState(categoriesMock);

  return (
    <ScrollView style={styles.viewForScrool}>
      <Text style={styles.title}>Category</Text>
      {categories.map((data, i) => (
        <View style={styles.view} key={i}>
          <TouchableOpacity onPress={() => onCategorySelect(data.name)}>
            <Text style={styles.text}>{data.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewForScrool: {
    paddingTop: StatusBar.currentHeight || '13%',
    paddingHorizontal: '5%',
    backgroundColor: '#4b8cac',
    width: '35%',
    flex: 1,
  },
  view: {
    flex: 1,
    paddingTop: 8
  },
  text: {
    fontSize: 15,
    color: '#080512be',
    fontWeight: "500"
  },
  title: {
    fontSize: 18,
    color: '#080512be',
    fontWeight: "600",
    paddingVertical: 5,
    textAlign: 'center'
  }
});

export default Category;
