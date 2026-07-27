"use client";

import React, { useState } from "react";
import { Button, Card, CardBody, CardFooter, Image, Chip } from "@heroui/react";
import { Star, Heart, ArrowRight } from "lucide-react";
import { supplements, Supplement } from "@/data/dummySupplements";

function SupplementCard({ product }: { product: Supplement }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="group border-none rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
      <CardBody className="p-0 overflow-hidden relative bg-slate-50 flex items-center justify-center h-64">
        <Image
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl rounded-b-none mix-blend-multiply"
        />
      </CardBody>

      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-red-600">{product.price}</h3>
          <div className="flex items-center gap-1 text-amber-500 font-semibold text-sm">
            <Star size={16} fill="currentColor" />
            {product.rating}{" "}
            <span className="text-slate-400 font-normal">
              ({product.reviews})
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-slate-900 line-clamp-1">
            {product.title}
          </h4>
        </div>

        <p className="text-sm text-slate-600 line-clamp-2 mt-1 min-h-[40px]">
          {product.description}
        </p>
      </div>

      <CardFooter className="px-5 pb-6 pt-0 gap-3 bg-white relative z-20 mt-auto">
        <Button
          className="flex-1 bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-xl shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all duration-300"
          endContent={<ArrowRight size={18} />}
        >
          Lihat Detail
        </Button>

        <Button
          isIconOnly
          onClick={() => setIsFavorite(!isFavorite)}
          className={`shrink-0 border-2 rounded-xl transition-all duration-300 hover:scale-105 ${
            isFavorite
              ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-600/30"
              : "bg-white border-red-100 text-red-600 hover:bg-red-600 hover:border-red-600 hover:text-white shadow-sm"
          }`}
          aria-label="Tambah ke Favorit"
        >
          <Heart
            size={20}
            fill={isFavorite ? "currentColor" : "none"}
            className={
              isFavorite
                ? "scale-110 transition-transform"
                : "transition-transform"
            }
          />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {supplements.map((product) => (
        <SupplementCard key={product.id} product={product} />
      ))}
    </div>
  );
}
