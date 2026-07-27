export interface Rumah {
  nama: string;
  c1_harga: number;
  c2_jarak: number;
  c3_keamanan: number;
  c4_luas: number;
  HouseDetail?: any; 
  imageUrl?: string;
}

export const hitungTopsis = (data: Rumah[], bobotObj: any) => {
  const kriteria = ["c1_harga", "c2_jarak", "c3_keamanan", "c4_luas"] as const;
  const bobot = [
    bobotObj.C1_Harga,
    bobotObj.C2_Jarak,
    bobotObj.C3_Keamanan,
    bobotObj.C4_Luas,
  ];
  const isBenefit = [false, false, true, true];

  // Normalisasi
  let pembagi = kriteria.map((k) =>
    Math.sqrt(data.reduce((sum, row) => sum + Math.pow(row[k], 2), 0)),
  );
  let matrixTernormalisasi = data.map((row) =>
    kriteria.map((k, i) => (row[k] / pembagi[i]) * bobot[i]),
  );

  // Ideal Positif & Negatif
  let idealPos = kriteria.map((_, i) => {
    let values = matrixTernormalisasi.map((row) => row[i]);
    return isBenefit[i] ? Math.max(...values) : Math.min(...values);
  });

  let idealNeg = kriteria.map((_, i) => {
    let values = matrixTernormalisasi.map((row) => row[i]);
    return isBenefit[i] ? Math.min(...values) : Math.max(...values);
  });

  // Jarak & Skor
  return data
    .map((row, idx) => {
      let dPos = Math.sqrt(
        matrixTernormalisasi[idx].reduce(
          (sum, val, i) => sum + Math.pow(val - idealPos[i], 2),
          0,
        ),
      );
      let dNeg = Math.sqrt(
        matrixTernormalisasi[idx].reduce(
          (sum, val, i) => sum + Math.pow(val - idealNeg[i], 2),
          0,
        ),
      );

      return {
        ...row, // menyalin semua isi data
        skor: (dNeg / (dPos + dNeg)).toFixed(4),
      };
    })
    .sort((a, b) => parseFloat(b.skor) - parseFloat(a.skor));
};
