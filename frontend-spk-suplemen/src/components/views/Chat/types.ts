export interface SupplementRecommendation {
  id: number;
  nama: string;
  c1_harga: number;        // Silakan sesuaikan kriteria SPK dengan DB kamu
  c2_rating: number;       // Contoh: rating/kualitas
  c3_dosis: number;        // Contoh: dosis/takaran
  c4_efektivitas: number;  // Contoh: efektivitas
  skor?: number;
  kategori?: string;       // Menggantikan lokasi
  imageUrl?: string;
  isFavorite?: boolean;
  favoriteId?: number | null;
}

export interface Message {
  id: number;
  role: "user" | "admin";
  text?: string;
  supplements?: SupplementRecommendation[]; // Menggantikan houses
  outroText?: string;
}