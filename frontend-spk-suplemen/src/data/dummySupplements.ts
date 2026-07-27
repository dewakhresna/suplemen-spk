export interface Supplement {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  rating: number;
  reviews: number;
  stockStatus: string;
  imageUrl: string;
}

export const supplements: Supplement[] = [
  {
    id: "1",
    title: "Premium Whey Protein Isolate",
    category: "Muscle Growth",
    price: "$59.99",
    description: "Fast-absorbing, 100% pure whey protein isolate designed for maximum muscle recovery and growth.",
    rating: 4.9,
    reviews: 1240,
    stockStatus: "In Stock",
    imageUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Daily Essential Multivitamin",
    category: "Vitamins & Minerals",
    price: "$29.99",
    description: "Complete daily multivitamin packed with 24 essential nutrients to support immune health and energy.",
    rating: 4.8,
    reviews: 856,
    stockStatus: "Low Stock",
    imageUrl: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Omega-3 Fish Oil 1000mg",
    category: "Heart Health",
    price: "$24.99",
    description: "High-potency EPA and DHA fish oil to support cardiovascular health, brain function, and joint mobility.",
    rating: 4.7,
    reviews: 432,
    stockStatus: "In Stock",
    imageUrl: "https://images.unsplash.com/photo-1610444371173-9a3b2b800412?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    title: "Micronized Creatine Monohydrate",
    category: "Performance",
    price: "$34.99",
    description: "Pure micronized creatine to boost strength, power output, and high-intensity exercise performance.",
    rating: 4.9,
    reviews: 2150,
    stockStatus: "In Stock",
    imageUrl: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&w=800&q=80",
  },
];