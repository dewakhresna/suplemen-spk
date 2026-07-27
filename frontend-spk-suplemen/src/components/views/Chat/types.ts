export interface HouseRecommendation {
  id: number;
  nama: string;
  c1_harga: number;
  c2_jarak: number;
  c3_keamanan: number;
  c4_luas: number;
  skor?: number;
  lokasi?: string; 
  imageUrl?: string;
  isFavorite?: boolean;
  favoriteId?: number | null;
}

export interface Message {
  id: number;
  role: "user" | "admin";
  text?: string;
  houses?: HouseRecommendation[];
  outroText?: string;            
}