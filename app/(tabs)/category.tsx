import Category from "@/components/Category";
import ProductsPage from "@/components/Products";
import { CategoryType } from "@/data/Products";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

function CategoryPage() {
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);

    return (
        <View style={styles.container}>
            <Category onCategorySelect={(cat: CategoryType) => setSelectedCategory(cat)} />
            <View style={styles.contentArea}>
                <ProductsPage category={selectedCategory} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor:'white'
    },
    contentArea: {
        marginHorizontal:15,
        flex: 2,
        backgroundColor: '#151a37',
    },
});

export default CategoryPage;
