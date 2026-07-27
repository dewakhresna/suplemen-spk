export interface UserProfile {
  fullname: string;
  username: string;
  email: string;
  avatarUrl: string;
}

export interface FavoriteHouse {
  id: string;
  name: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  landSize: number;
  imageUrl: string;
}

export const currentUser: UserProfile = {
  fullname: "Budi Santoso",
  username: "@budisantoso",
  email: "budi.santoso@example.com",
  avatarUrl: "https://i.pravatar.cc/150?u=budi",
};

export const favoriteHouses: FavoriteHouse[] = [
  {
    id: "1",
    name: "Modern Minimalist Villa",
    price: "Rp 2.500.000.000",
    location: "Canggu, Bali",
    bedrooms: 3,
    bathrooms: 2,
    landSize: 250,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Urban Glass Apartment",
    price: "Rp 1.200.000.000",
    location: "Jakarta Selatan",
    bedrooms: 2,
    bathrooms: 1,
    landSize: 85,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Suburban Family Home",
    price: "Rp 1.850.000.000",
    location: "Bandung, Jawa Barat",
    bedrooms: 4,
    bathrooms: 3,
    landSize: 300,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
];