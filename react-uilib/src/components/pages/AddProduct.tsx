import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addProduct, getCategories } from "../../lib/APICalls/products";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { IProduct } from "../../lib/interfaces";

const AddProduct = () => {
    const [formData, setFormData] = useState<Partial<IProduct>>({
        title: "",
        description: "",
        price: 0,
        category: "",
        image: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
    };

    const mutation = useMutation({
        mutationFn: (product: Partial<IProduct>) => addProduct(product),
        onSuccess: () => {
            toast.success("Product added successfully!");
            setFormData({ title: "", description: "", price: 0, category: "", image: "" });
        },
        onError: () => {
            toast.error("Error adding product. Please try again.");
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.title || !formData.price || !formData.category) {
            toast.error("Please fill in all required fields.");
            return;
        }
        mutation.mutate(formData);
    };

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
        refetchOnWindowFocus: false,
        retry: 1
    })
    return (
        <div className="w-full mt-6">
            <h1 className="text-2xl font-semibold text-center">Add Product</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg w-full mx-auto mt-4">
                <Label htmlFor="title">Name</Label>
                <Input id="title" type="text" value={formData.title} onChange={handleChange} />

                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={handleChange} />

                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" value={formData.price} onChange={handleChange} />

                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories?.map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Label htmlFor="image">Image</Label>
                <Input id="image" type="text" value={formData.image} onChange={handleChange} />
                {formData.image && <img src={formData.image} alt={formData.title} className="w-full h-24 object-cover" />}

                <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Adding..." : "Add Product"}
                </Button>
            </form>
        </div>
    );
};

export default AddProduct;