"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import ProductList from "@/components/ui/product-components/productList";

export default function Products() {
  return (
    
      <div className="min-h-screen ">
        {/* <h1 className="text-2xl font-bold mb-4">Ürünler</h1>
    <ul className="space-y-2">
      {products.map((product) => (
        <li key={product.id} className="p-4 bg-white shadow rounded">
          <Link href={`/products/${product.id}`}>{product.name}</Link> | <span>{product.description}</span> |{" "}
          {product.billOfMaterials && product.billOfMaterials.map((material) => (
            <span key={material.id}>{material.name} </span>
          ))}
        </li>
      ))}
    </ul> */}

        <ProductList />
      </div>
    
  );
}
