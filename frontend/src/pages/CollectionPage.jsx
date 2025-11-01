import React, { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import { FilterSidebar } from "../Components/Products/FilterSidebar";
import { ProductGrid } from "../Components/Products/ProductGrid";
import { SortOptions } from "../Components/Products/SortOptions";

export const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
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
      setProducts(fetchedProducts);
    }, 1000);
  }, []);
  return (
    <div className="flex flex-col lg:flex-row">
      {/* MOBILE FILTER BUTTON */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>
      {/* FILTER SIDEBAR */}
      <div
        ref={sidebarRef}
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>
        {/* SORT OPtIONS */}
        <SortOptions />
        {/* PRODUCT GRID */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};
