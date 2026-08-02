export interface SupplementRecommendation {
  id: number;
  nama: string;
  c1_harga: number;        
  c2_rating: number;       
  c3_kandungan_nutrisi: number;        
  c4_efektivitas: number;  
  skor?: number;
  kategori?: string;      
  imageUrl?: string;
  isFavorite?: boolean;
  favoriteId?: number | null;
}

export interface Message {
  id: number;
  role: "user" | "admin";
  text?: string;
  supplements?: SupplementRecommendation[];
  outroText?: string;
}