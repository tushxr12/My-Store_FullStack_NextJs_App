'use client'

import { useParams } from "next/navigation"
import { products } from "@/app/product-data"
import NotFound from "@/app/not-found";

export default function ProductDetails() {
  const params = useParams();

  // Logs for debugging
  console.log("Products : ", products);
  console.log("Params : ", params);
  console.log("Params id : ", params?.id);

  const product = products.find(p => p.id === params?.id);
  console.log("Product : ", product);

  if (!product) {
    return <NotFound />
  }

  return (
    <>
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden md:flex">
        <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-6">
          <img src={'/' + product.imageUrl} alt={product.name} className="w-full h-auto rounded-lg shadow-md"/>
        </div>

        <div className="md:w-1/2 p-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">{product.name}</h1>
          <p className="mt-3 text-2xl font-bold text-indigo-600">{`$${product.price}`}</p>

          <h3 className="mt-6 text-sm font-bold text-gray-700 uppercase tracking-wide">Description</h3>
          <p className="mt-2 text-gray-500 leading-relaxed">{product.description}</p>

          {/* <div className="mt-6 flex items-center gap-3">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300">
              Add to cart
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50">
              Wishlist
            </button>
          </div> */}
        </div>
      </div>
    </div>
    </>
  )
}


