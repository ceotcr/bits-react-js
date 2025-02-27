
import { useProduct } from "../../lib/contexts/ProductsContext.tsx";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { IProduct } from "../../lib/interfaces";
import { toast } from "sonner";
import ProductForm from "../custom/products/ProductForm";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../lib/APICalls/products.ts";

const UpdateProduct = () => {
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);

    const { data: product } = useQuery({
        queryKey: ["product", productId],
        queryFn: async () => {
            const product = await getProduct(productId);
            setFormData(product);
            return product;
        }
    });

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);


    const { updateExistingProduct } = useProduct();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Partial<IProduct>>({
        id: productId,
        title: "",
        description: "",
        price: 0,
        category: "",
        image: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.title || !formData.price || !formData.category || !formData.image || !formData.description) {
            toast.error("Please fill in all required fields.");
            return;
        }
        updateExistingProduct(formData);
        navigate(`/products/${productId}`);
    };

    return (
        <div>
            <ProductForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                isUpdate
                onCancel={() => navigate(`/products/${productId}`)}
            />
        </div>
    );
};

export default UpdateProduct;