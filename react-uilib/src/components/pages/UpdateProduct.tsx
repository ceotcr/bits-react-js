import { useNavigate, useParams } from "react-router"
import { getProduct, updateProduct } from "../../lib/APICalls/products"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { IProduct } from "../../lib/interfaces"
import { toast } from "sonner"
import ProductForm from "../custom/products/ProductForm"

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

    const [formData, setFormData] = useState<Partial<IProduct>>({
        id: productId,
        title: "",
        description: "",
        price: 0,
        category: "",
        image: "",
    })

    const mutation = useMutation({
        mutationFn: ({ product }: { product: Partial<IProduct> }) => updateProduct(product),
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
        if (!formData.title || !formData.price || !formData.category || !formData.image || !formData.description) {
            toast.error("Please fill in all required fields.")
            return
        }
        mutation.mutate({ product: formData })
    }

    const navigate = useNavigate()

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : product && (
                <ProductForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                    isLoading={loading}
                    isUpdate
                    onCancel={() => navigate(`/products/${productId}`)}
                />
            )}
        </div>
    )
}

export default UpdateProduct
