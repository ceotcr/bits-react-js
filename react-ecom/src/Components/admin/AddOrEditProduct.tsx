/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { IProduct } from "../../libs/interfaces";
import { getCategories } from "../../libs/APICalls/Products";
import { useQuery } from "@tanstack/react-query";
import { MdClose } from "react-icons/md";
import { addProduct, updateProduct } from "../../libs/APICalls/Admin";
import { useSnackbar } from "../../contexts/SnackBarContext";

const AddOrEditProduct = ({
    product, closeModal, setProducts
}: { product?: IProduct; closeModal: () => void; setProducts: React.Dispatch<React.SetStateAction<IProduct[]>> }) => {
    const [form, setForm] = useState({
        title: product?.title || "",
        price: product?.price || 0,
        description: product?.description || "",
        image: product?.image || "",
        id: product?.id || -1,
        category: product?.category || "",
        rating: product?.rating || { rate: 0, count: 0 },
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const { showSnackbar } = useSnackbar()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (!form.title || !form.price || !form.description || !form.image || !form.category) {
            setError("Please fill all fields");
            setLoading(false);
            return;
        }
        try {
            if (product) {
                await updateProduct(form);
                setProducts((prev) => prev.map((p) => p.id === form.id ? form : p));
                showSnackbar("Product Updated Successfully", 0)
            } else {
                await addProduct(form);
                setProducts((prev) => [form, ...prev]);
                showSnackbar("Product Added Successfully", 0)
            }
            closeModal();
        } catch (error) {
            showSnackbar("Error Submitting Form", 2)
        }
        setLoading(false);
    };


    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
        refetchOnWindowFocus: false,
        retry: 1,
    })

    return (
        <div className="fixed top-0 left-0 h-screen pt-20 flex items-center justify-center w-screen bg-[rgba(255,255,255,0.6)] backdrop-blur-lg z-50">
            <div className="w-[96%] max-w-[512px] max-h-[600px] overflow-y-auto shadow-2xl rounded-md bg-white h-[80vh] flex items-center justify-center">
                <form onSubmit={handleSubmit} className="w-full h-full p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-gray-900">{product ? "Edit Product" : "Add Product"}</h2>
                        <button type="button" onClick={closeModal} className="p-2 cursor-pointer bg-red-500 text-white rounded-md">
                            <MdClose size={24} />
                        </button>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border border-gray-300 rounded-md" required />
                    <input type="number" name="price" step={.1} value={form.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border border-gray-300 rounded-md" required />
                    <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={8} className="w-full p-2 border border-gray-300 rounded-md" required />
                    <input type="url" name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border border-gray-300 rounded-md" required />
                    <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
                        {categories?.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <button type="submit" disabled={loading} className="p-2 bg-black text-white w-full cursor-pointer rounded-md">{loading ? "Submitting..." : "Submit"}</button>
                </form>
            </div>
        </div>
    );
};

export default AddOrEditProduct;