interface TProduct {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  price: number;
  ingredients: TIngredient[];
  category: TCategory;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}
