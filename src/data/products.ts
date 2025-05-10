export type Product = {
  id: string;
  name: string;
  price: number;
  category: "fashion" | "cosmetics" | "accessories";
  subcategory: string;
  image: string;
  description: string;
  brand: string;
  sizes?: string[];
  colors?: string[];
  rating: number;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Denim Jacket",
    price: 59.99,
    category: "fashion",
    subcategory: "outerwear",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    description:
      "A timeless denim jacket that goes with everything in your wardrobe. Made from high-quality sustainable cotton.",
    brand: "EcoFashion",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blue", "Black", "Light Blue"],
    rating: 4.5,
  },
  {
    id: "2",
    name: "Slim Fit Chinos",
    price: 39.99,
    category: "fashion",
    subcategory: "pants",
    image:
      "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    description:
      "Comfortable slim-fit chinos perfect for casual and semi-formal occasions.",
    brand: "UrbanStyle",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Khaki", "Navy", "Black", "Olive"],
    rating: 4.3,
  },
  {
    id: "3",
    name: "Cotton Crew T-Shirt",
    price: 19.99,
    category: "fashion",
    subcategory: "tops",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    description:
      "Soft and breathable cotton t-shirt with a classic crew neck design.",
    brand: "BasicTees",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Gray", "Navy", "Red"],
    rating: 4.8,
  },
  {
    id: "4",
    name: "Matte Lipstick",
    price: 24.99,
    category: "cosmetics",
    subcategory: "makeup",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    description: "Long-lasting matte lipstick that doesn't dry your lips.",
    brand: "GlowUp",
    colors: ["Ruby Red", "Coral Pink", "Dusty Rose", "Nude"],
    rating: 4.7,
  },
  {
    id: "5",
    name: "Moisturizing Face Cream",
    price: 32.5,
    category: "cosmetics",
    subcategory: "skincare",
    image:
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    description:
      "Hydrating face cream suitable for all skin types. Enriched with vitamins and natural oils.",
    brand: "PureSkin",
    rating: 4.6,
  },
  {
    id: "6",
    name: "Leather Crossbody Bag",
    price: 79.99,
    category: "accessories",
    subcategory: "bags",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    description:
      "Stylish genuine leather crossbody bag with multiple compartments.",
    brand: "LuxAccessories",
    colors: ["Black", "Brown", "Tan"],
    rating: 4.4,
  },
  {
    id: "7",
    name: "Aviator Sunglasses",
    price: 49.99,
    category: "accessories",
    subcategory: "eyewear",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    description:
      "Classic aviator sunglasses with UV protection and polarized lenses.",
    brand: "SunStyle",
    colors: ["Gold/Green", "Silver/Blue", "Black/Gray"],
    rating: 4.2,
  },
  {
    id: "8",
    name: "Floral Summer Dress",
    price: 45.99,
    category: "fashion",
    subcategory: "dresses",
    image:
      "https://images.unsplash.com/photo-1623609163859-ca93c959b98a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    description: "Light and breezy floral dress, perfect for warm summer days.",
    brand: "SummerChic",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blue Floral", "Pink Floral", "Yellow Floral"],
    rating: 4.5,
  },
  {
    id: "9",
    name: "Long-lasting Mascara",
    price: 18.99,
    category: "cosmetics",
    subcategory: "makeup",
    image: "/mascara.jpg",
    description: "Smudge-proof, long-lasting mascara for voluminous lashes.",
    brand: "LashLove",
    colors: ["Black", "Brown-Black"],
    rating: 4.3,
  },
  {
    id: "10",
    name: "Stainless Steel Watch",
    price: 149.99,
    category: "accessories",
    subcategory: "watches",
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    description: "Elegant stainless steel watch with Japanese movement.",
    brand: "TimeMaster",
    colors: ["Silver", "Gold", "Rose Gold"],
    rating: 4.6,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.brand.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.subcategory.toLowerCase().includes(lowercaseQuery)
  );
}
