export interface HouseDetail {
  id: string;
  title: string;
  price: number;
  location: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  landSize: number;
  buildingSize: number;
  images: string[];
  facilities: string[];
  agent: {
    name: string;
    avatar: string;
    status: string;
    agency: string;
  };
}

export const houseDetailData: HouseDetail = {
  id: "1",
  title: "Modern Minimalist Villa with Private Pool",
  price: 2500000000,
  location: "Canggu, Kuta Utara, Bali",
  description: "Vila minimalis modern yang menakjubkan ini menawarkan perpaduan sempurna antara kemewahan dan kenyamanan. Terletak di jantung Canggu, properti ini memiliki ruang tamu berkonsep terbuka, jendela setinggi langit-langit yang memaksimalkan cahaya alami, dan teknologi smart home yang terintegrasi. Di bagian luar, Anda akan menemukan taman tropis yang rimbun dan kolam renang pribadi yang indah. Sangat cocok untuk investasi masa depan atau hunian keluarga yang tenang.",
  bedrooms: 3,
  bathrooms: 3,
  landSize: 250,
  buildingSize: 180,
  images: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  ],
  facilities: [
    "Kolam Renang Pribadi",
    "Sistem Smart Home",
    "Keamanan 24 Jam",
    "Garasi 2 Mobil",
    "Taman Tropis",
    "Dapur Bersih & Kotor",
    "Area BBQ",
    "Akses Jalan Lebar"
  ],
  agent: {
    name: "Sarah Wijayanto",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    status: "Online",
    agency: "Vital Prime Bali",
  }
};