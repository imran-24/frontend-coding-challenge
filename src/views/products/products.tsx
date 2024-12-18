"use client";

import React, { useState, useCallback } from "react";
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";
import qs from "query-string";
import { useRouter } from "next/navigation";
import { key, loadFromLocalStorage, saveToLocalStorage } from "../../../utils";

export const Products: React.FC = () => {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(loadFromLocalStorage(key));
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  const addParams = (id: string) => {
    const url = qs.stringifyUrl(
      {
        url: "/products",
        query: {
          "product-id": id,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  };

  const handleOpenModal = useCallback((product: Product) => {
    if (product) addParams(product.id);
    setSelectedProduct(product);
    saveToLocalStorage(key, product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    router.push('/products');
    localStorage.removeItem(key);

  }, []);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className='h-4' />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
