export interface HouseListing {
  id: string;
  title: string;
  price: string;
  location: string;
  description: string;
  beds: number;
  baths: number;
  sqft: number;
  imageUrl: string;
}

export const listings: HouseListing[] = [
  {
    id: "1",
    title: "Modern Minimalist Villa",
    price: "$850,000",
    location: "Beverly Hills, CA",
    description: "A stunning modern villa featuring open-concept living, smart home tech, and panoramic city views.",
    beds: 4,
    baths: 3,
    sqft: 3200,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Luxury Family Home",
    price: "$620,000",
    location: "Austin, TX",
    description: "Spacious family home with a beautiful backyard, newly renovated kitchen, and top-tier school district.",
    beds: 5,
    baths: 4,
    sqft: 4100,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Urban Glass Penthouse",
    price: "$1,200,000",
    location: "Manhattan, NY",
    description: "Sleek penthouse with floor-to-ceiling windows, private rooftop terrace, and premium finishes.",
    beds: 2,
    baths: 2,
    sqft: 1800,
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    title: "Suburban Retreat",
    price: "$450,000",
    location: "Denver, CO",
    description: "Cozy yet spacious home surrounded by nature trails. Features a rustic fireplace and large deck.",
    beds: 3,
    baths: 2,
    sqft: 2400,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
];