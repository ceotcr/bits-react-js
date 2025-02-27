import { useState } from "react";
import { useProduct } from "../../lib/contexts/ProductsContext.tsx";
import { toast } from "sonner";
import { IProduct } from "../../lib/interfaces";
import ProductForm from "../custom/products/ProductForm";
import { useNavigate } from "react-router";

const AddProduct = () => {
    const { addNewProduct } = useProduct();
    const [formData, setFormData] = useState<Partial<IProduct>>({
        title: "",
        description: "",
        price: 0,
        category: "",
        image: "",
    });

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.title || !formData.price || !formData.category || !formData.image || !formData.description) {
            toast.error("Please fill in all required fields.");
            return;
        }
        addNewProduct(formData);
        setFormData({ title: "", description: "", price: 0, category: "", image: "" });
        navigate("/products");
    };

    return (
        <div className="w-full mt-6">
            <ProductForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                onCancel={() => setFormData({ title: "", description: "", price: 0, category: "", image: "" })}
            />
        </div>
    );
};

export default AddProduct;