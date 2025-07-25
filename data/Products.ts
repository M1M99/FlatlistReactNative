const products = {
    Fruits: ['Apple', 'Banana', 'Orange'],
    Meat: ['Beef', 'Chicken'],
    Sweets: ['Chocolate', 'Cake'],
    Drinks: ['Water', 'Cola']
} as const;

export type CategoryType = keyof typeof products;

export default products;
