import React from "react";
import { Hero } from "../Components/Layout/Hero";
import { GenderCollectionSection } from "../Components/Products/GenderCollectionSection";
import { NewArrivals } from "../Components/Products/NewArrivals";
import { ProductDetails } from "../Components/Products/ProductDetails";
import { ProductGrid } from "../Components/Products/ProductGrid";
import { FeaturedCollection } from "../Components/Products/FeaturedCollection";
import { FeaturesSection } from "../Components/Products/FeaturesSection";

const placeholderProducts = [
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish Jacket 3",
      },
    ],
  },
  {
    _id: 2,
    name: "Product 2",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Stylish Jacket 3",
      },
    ],
  },
  {
    _id: 3,
    name: "Product 3",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
        altText: "Stylish Jacket 3",
      },
    ],
  },
  {
    _id: 4,
    name: "Product 4",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Stylish Jacket 3",
      },
    ],
  },
  {
    _id: 5,
    name: "Product 1",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=5",
        altText: "Stylish Jacket 3",
      },
    ],
  },
  {
    _id: 6,
    name: "Product 2",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=6",
        altText: "Stylish Jacket 3",
      },
    ],
  },
  {
    _id: 7,
    name: "Product 3",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=7",
        altText: "Stylish Jacket 3",
      },
    ],
  },
  {
    _id: 8,
    name: "Product 4",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=8",
        altText: "Stylish Jacket 3",
      },
    ],
  },
];
export const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* BEST SELLER */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      <ProductDetails />

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>

        <ProductGrid products={placeholderProducts} />
      </div>
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};
