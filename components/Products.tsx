import { Platform, SafeAreaView, SectionList, StatusBar, StyleSheet, Text } from 'react-native';
import products, { CategoryType } from './../data/Products';
import { ThemedText } from './ThemedText';

type Props = {
  category: CategoryType | null;
};

export default function ProductsPage({ category }: Props) {
  if (!category) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Please select a category</Text>
      </SafeAreaView>
    );
  }

  const prods = products[category];

  const sectionData = [
    {
      title: `${category} Products`,
      data: prods,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sectionData}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => (
          <ThemedText type="defaultSemiBold" style={styles.sectionHeader}>{title}</ThemedText>
        )}
        renderItem={({ item }) => (
          <Text style={styles.textProd}>{item}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
    paddingHorizontal: 16,
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
  },
  sectionHeader: {
    fontSize: 20,
    paddingVertical: 12,
    color: 'black',
  },
});
