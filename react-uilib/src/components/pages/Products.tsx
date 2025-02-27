import { useCallback, useState } from "react";
import { useProduct } from "../../lib/contexts/ProductsContext.tsx";
import CProductCard from "../custom/products/CProductCard";
import Filters from "../custom/products/Filters";
import ConfirmDeleteDialog from "../custom/products/ConfirmDeleteDialog";

const Products = () => {
    const { products, loading, removeProduct, filters, changeCategory, changeSort, changeLimit } = useProduct();

    const [confirmDelete, setConfirmDelete] = useState({
        open: false,
        id: 0
    });

    const deleteProductCB = useCallback((id: number) => {
        removeProduct(id);
    }, [removeProduct]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="py-4 flex flex-col gap-4">
            <p>Products</p>
            <Filters filters={filters} changeCategory={changeCategory} changeSort={changeSort} changeLimit={changeLimit} />
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                {products && products.map((product) => (
                    <CProductCard
                        handleDelete={() => setConfirmDelete({ open: true, id: product.id })}
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
            <ConfirmDeleteDialog
                open={confirmDelete.open}
                onClose={() => setConfirmDelete({ open: false, id: 0 })}
                onConfirm={() => {
                    deleteProductCB(confirmDelete.id);
                    setConfirmDelete({ open: false, id: 0 });
                }}
            />
        </div>
    );
};

export default Products;
