// Interface untuk Produk Favorit
export interface FavoriteSupplement {
  id: string;
  name: string;
  price: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  imageUrl: string;
  badge?: string;
}

// Data Dummy List Produk Favorit
export const favoriteSupplements: FavoriteSupplement[] = [
  {
    id: "fav-001",
    name: "Premium Whey Protein Isolate - 5lbs",
    price: "Rp 1.250.000",
    category: "Otot & Pemulihan",
    rating: 4.9,
    reviews: 1240,
    description: "Protein murni cepat serap untuk pemulihan otot maksimal setelah latihan intens. Bebas laktosa dan rendah gula.",
    imageUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80",
    badge: "Terlaris",
  },
  {
    id: "fav-002",
    name: "Daily Essential Multivitamin",
    price: "Rp 350.000",
    category: "Vitamin & Mineral",
    rating: 4.8,
    reviews: 856,
    description: "Kombinasi 24 vitamin dan mineral esensial untuk menjaga imunitas dan energi harian Anda agar selalu prima.",
    imageUrl: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fav-003",
    name: "Explosive Pre-Workout Energy",
    price: "Rp 550.000",
    category: "Stamina & Performa",
    rating: 4.7,
    reviews: 623,
    description: "Tingkatkan fokus, energi, dan daya tahan selama latihan dengan formula pre-workout klinis tanpa efek gelisah.",
    imageUrl: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&w=800&q=80",
    badge: "Diskon 15%",
  },
  {
    id: "fav-004",
    name: "Omega-3 Pure Fish Oil 1000mg",
    price: "Rp 275.000",
    category: "Kesehatan Jantung",
    rating: 4.9,
    reviews: 2150,
    description: "Kaya akan EPA dan DHA untuk mendukung kesehatan kardiovaskular, fungsi otak, serta mobilitas sendi Anda.",
    imageUrl: "https://images.unsplash.com/photo-1610444371173-9a3b2b800412?auto=format&fit=crop&w=800&q=80",
  }
];