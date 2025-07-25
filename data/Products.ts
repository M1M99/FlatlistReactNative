const products = {
  Fruits: [
    { name: 'Apple', price: 2 },
    { name: 'Banana', price: 1 },
    { name: 'Orange', price: 1.5 },
  ],
  Meat: [
    { name: 'Beef', price: 10 },
    { name: 'Chicken', price: 7 },
  ],
  Sweets: [
    { name: 'Chocolate', price: 3 },
    { name: 'Cake', price: 5 },
  ],
  Drinks: [
    { name: 'Water', price: 1 },
    { name: 'Cola', price: 2 },
  ],
};

export type CategoryType = keyof typeof products;

export default products;
