import { useNavigate, useParams } from "react-router"
import { getCategories, getProduct, updateProduct } from "../../lib/APICalls/products"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useState } from "react"
import { IProduct } from "../../lib/interfaces"
import { toast } from "sonner"

const UpdateProduct = () => {
    const { id } = useParams<{ id: string }>()
    const productId = Number(id)

    const { data: product, isLoading: loading, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
            const product = await getProduct(productId)
            setFormData(product)
            return product
        },
        enabled: !!id,
        refetchOnWindowFocus: false,
        retry: 1
    })

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
        refetchOnWindowFocus: false,
        retry: 1
    })
    const [formData, setFormData] = useState<Partial<IProduct>>({
        id: productId,
        title: "",
        description: "",
        price: 0,
        category: "",
        image: "",
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }

    const mutation = useMutation({
        mutationFn: ({ product }: { id: number, product: Partial<IProduct> }) => updateProduct(product),
        onSuccess: () => {
            toast.success("Product updated successfully!")
        },
        onError: (error) => {
            console.error("Error updating product:", error)
            toast.error("Error updating product. Please try again later.")
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formData.title || !formData.price || !formData.category) {
            toast.error("Please fill in all required fields.")
            return
        }
        mutation.mutate({ id: productId, product: formData })
    }

    const navigate = useNavigate()

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : product && (
                <form className="flex flex-col gap-4 mx-auto max-w-lg w-full mt-4" onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-semibold text-center">
                        Update Product
                    </h1>
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
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Label htmlFor="image">Image</Label>
                    <Input id="image" type="text" value={formData.image} onChange={handleChange} />
                    {formData.image && <img src={formData.image} alt={formData.title} className="w-full h-40 object-top object-cover" />}

                    <Button type="submit" className="cursor-pointer">Update</Button>
                    <Button type="button" onClick={() => navigate(-1)} className="cursor-pointer">Cancel</Button>
                </form>
            )}
        </div>
    )
}

export default UpdateProduct
