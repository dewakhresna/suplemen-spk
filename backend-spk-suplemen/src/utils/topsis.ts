export interface Suplemen {
  id: number;
  nama: string;
  c1_harga: number;
  c2_ulasan_negatif: number;
  c3_kandungan_nutrisi: number;
  c4_efektivitas_manfaat: number;
  SuplemenDetail?: any;
  imageUrl?: string;
  skor?: string; 
}

export const hitungTopsis = (data: Suplemen[], bobotObj: any): Suplemen[] => {
  console.log("\n=========================================================");
  console.log("🔍 MEMULAI PERHITUNGAN TOPSIS (SUPLEMEN)");
  console.log("=========================================================\n");

  const kriteria = [
    "c1_harga", 
    "c2_ulasan_negatif", 
    "c3_kandungan_nutrisi", 
    "c4_efektivitas_manfaat"
  ] as const;

  // Tarik data dari object JSON, default ke 3 (Cukup Penting) jika tidak ada
  const bobot = [
    bobotObj.C1_Harga || 3,
    bobotObj.C2_Ulasan_Negatif || 3,
    bobotObj.C3_Kandungan_Nutrisi || 3,
    bobotObj.C4_Efektivitas_Manfaat || 3,
  ];
  
  // Penentuan Cost/Benefit
  const isBenefit = [false, false, true, true]; // [Cost, Cost, Benefit, Benefit]

  // --- TAHAP 1: MATRIKS KEPUTUSAN AWAL (X) ---
  console.log("TAHAP 1: MATRIKS KEPUTUSAN AWAL (X)");
  const matriksX = data.map((row) => ({
    Alternatif: row.nama,
    C1_Harga: row.c1_harga,
    C2_Ulasan_Negatif: row.c2_ulasan_negatif,
    C3_Kandungan_Nutrisi: row.c3_kandungan_nutrisi,
    C4_Efektivitas: row.c4_efektivitas_manfaat,
  }));
  console.table(matriksX);

  // --- TAHAP 2: BOBOT PREFERENSI (W) DARI AI ---
  console.log("TAHAP 2: VEKTOR BOBOT PREFERENSI (W) DARI AI GROQ");
  console.table([{
    C1_Harga: bobot[0],
    C2_Ulasan_Negatif: bobot[1],
    C3_Kandungan_Nutrisi: bobot[2],
    C4_Efektivitas: bobot[3],
  }]);

  // --- TAHAP 3: MATRIKS TERNORMALISASI (R) ---
  let pembagi = kriteria.map((k) =>
    Math.sqrt(data.reduce((sum, row) => sum + Math.pow(row[k], 2), 0)),
  );

  console.log("TAHAP 3: MATRIKS KEPUTUSAN TERNORMALISASI (R)");
  const matriksR = data.map((row) => {
    return {
      Alternatif: row.nama,
      C1_Harga: Number((row.c1_harga / (pembagi[0] || 1)).toFixed(4)),
      C2_Ulasan_Negatif: Number((row.c2_ulasan_negatif / (pembagi[1] || 1)).toFixed(4)),
      C3_Kandungan_Nutrisi: Number((row.c3_kandungan_nutrisi / (pembagi[2] || 1)).toFixed(4)),
      C4_Efektivitas: Number((row.c4_efektivitas_manfaat / (pembagi[3] || 1)).toFixed(4)),
    };
  });
  console.table(matriksR);

  // --- TAHAP 4: MATRIKS TERNORMALISASI TERBOBOT (Y) ---
  console.log("TAHAP 4: MATRIKS TERNORMALISASI TERBOBOT (Y)");
  let matrixTernormalisasi = data.map((row) =>
    kriteria.map((k, i) => {
      const divisor = pembagi[i] === 0 ? 1 : pembagi[i];
      return (row[k] / divisor) * bobot[i];
    }),
  );

  const formatMatriksY = matrixTernormalisasi.map((row, idx) => ({
    Alternatif: data[idx].nama,
    C1_Harga: Number(row[0].toFixed(4)),
    C2_Ulasan_Negatif: Number(row[1].toFixed(4)),
    C3_Kandungan_Nutrisi: Number(row[2].toFixed(4)),
    C4_Efektivitas: Number(row[3].toFixed(4)),
  }));
  console.table(formatMatriksY);

  // --- TAHAP 5: SOLUSI IDEAL POSITIF (A+) DAN NEGATIF (A-) ---
  let idealPos = kriteria.map((_, i) => {
    let values = matrixTernormalisasi.map((row) => row[i]);
    return isBenefit[i] ? Math.max(...values) : Math.min(...values);
  });

  let idealNeg = kriteria.map((_, i) => {
    let values = matrixTernormalisasi.map((row) => row[i]);
    return isBenefit[i] ? Math.min(...values) : Math.max(...values);
  });

  console.log("TAHAP 5: SOLUSI IDEAL POSITIF (A+) & NEGATIF (A-)");
  console.table([
    {
      Titik_Ideal: "Positif (A+)",
      C1_Harga: Number(idealPos[0].toFixed(4)),
      C2_Ulasan_Negatif: Number(idealPos[1].toFixed(4)),
      C3_Kandungan_Nutrisi: Number(idealPos[2].toFixed(4)),
      C4_Efektivitas: Number(idealPos[3].toFixed(4)),
    },
    {
      Titik_Ideal: "Negatif (A-)",
      C1_Harga: Number(idealNeg[0].toFixed(4)),
      C2_Ulasan_Negatif: Number(idealNeg[1].toFixed(4)),
      C3_Kandungan_Nutrisi: Number(idealNeg[2].toFixed(4)),
      C4_Efektivitas: Number(idealNeg[3].toFixed(4)),
    }
  ]);

  // --- TAHAP 6 & 7: JARAK EUCLIDEAN (D+, D-) & PREFERENSI (V) ---
  console.log("TAHAP 6 & 7: JARAK EUCLIDEAN & SKOR PREFERENSI (V)");
  const hasilAkhir = data.map((row, idx) => {
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

    const totalJarak = dPos + dNeg;
    const skorAkhir = totalJarak === 0 ? "1.0000" : (dNeg / totalJarak).toFixed(4);

    return {
      ...row,
      D_Positif: Number(dPos.toFixed(4)),
      D_Negatif: Number(dNeg.toFixed(4)),
      Skor_V: Number(skorAkhir),
      skor: skorAkhir, 
    };
  });

  const formatHasilAkhir = hasilAkhir.map((h) => ({
    Alternatif: h.nama,
    "Jarak Ideal Pos (D+)": h.D_Positif,
    "Jarak Ideal Neg (D-)": h.D_Negatif,
    "Skor Akhir (V)": h.Skor_V
  }));
  console.table(formatHasilAkhir);

  console.log("\n✅ PERHITUNGAN SELESAI. Mengembalikan hasil berdasarkan skor...\n");

  return hasilAkhir.sort((a, b) => parseFloat(b.skor!) - parseFloat(a.skor!));
};