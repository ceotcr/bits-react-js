import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../lib/APICalls/products";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { IProduct } from "../../../lib/interfaces";

interface ProductFormProps {
    formData: Partial<IProduct>;
    setFormData: React.Dispatch<React.SetStateAction<Partial<IProduct>>>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading?: boolean;
    isUpdate?: boolean;
    onCancel?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ formData, setFormData, onSubmit, isLoading, isUpdate, onCancel }) => {
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
        refetchOnWindowFocus: false,
        retry: 1
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-lg w-full mx-auto mt-4">
            <h1 className="text-2xl font-semibold text-center">{isUpdate ? "Update Product" : "Add Product"}</h1>

            <Label htmlFor="title">Name</Label>
            <Input required id="title" type="text" value={formData.title} onChange={handleChange} />

            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={formData.description} onChange={handleChange} />

            <Label htmlFor="price">Price</Label>
            <Input required id="price" type="number" value={formData.price} onChange={handleChange} />

            <Label htmlFor="category">Category</Label>
            <Select required value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    {categories?.map((category) => (
                        <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Label htmlFor="image">Image</Label>
            <Input required id="image" type="text" value={formData.image} onChange={handleChange} />
            {formData.image && <img src={formData.image} alt={formData.title} className="w-full h-24 object-cover" />}

            <Button type="submit" className="cursor-pointer" disabled={isLoading}>{isLoading ? "Processing..." : isUpdate ? "Update" : "Add Product"}</Button>
            {isUpdate && onCancel && <Button className="cursor-pointer" type="button" onClick={onCancel}>Back</Button>}
        </form>
    );
};

export default ProductForm;
