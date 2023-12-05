import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function InventoryForm({ handleOnChange, formData, handleOnSubmit, editValue }) {
    const { id } = formData

    // Destructuring properties from useForm hook for form handling
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        // Set default values for form fields based on whether an id is present in formData
        defaultValues: id
            ? formData
            : {
                id: "Default",
                productName: "Default",
                brand: "Default",
                quantity: "Default",
                image: "Default",
                price: "Default",
            }
    })

    // Reset the form when editValue changes (used for editing existing entries)
    useEffect(() => {
        reset(formData)
    }, [editValue])

    // JSX for the form component
    return (
        <div>
            <form action="" onSubmit={handleSubmit(handleOnSubmit)}>
                <div>
                    {/* Input field for Product Name */}
                    <label htmlFor="productName">Product Name: </label>
                    <input
                        type="text"
                        {...register("productName", { required: "Please enter a valid product name" })}
                        id="productName"
                        onChange={handleOnChange}
                        value={formData.productName}
                    />
                    <span>{errors.productName?.message}</span>
                </div>
                <div>
                    {/* Input field for Brand */}
                    <label htmlFor="brand">Brand: </label>
                    <input
                        type="text"
                        {...register("brand", { required: "Please enter a valid brand name" })}
                        id="brand"
                        onChange={handleOnChange}
                        value={formData.brand}
                    />
                    <span>{errors.brand?.message}</span>
                </div>
                <div>
                    {/* Input field for Quantity */}
                    <label htmlFor="quantity">Quantity: </label>
                    <input
                        type="text"
                        {...register("quantity", { required: "Please enter a valid quantity" })}
                        id="quantity"
                        onChange={handleOnChange}
                        value={formData.quantity}
                    />
                    <span>{errors.quantity?.message}</span>
                </div>
                <div>
                    {/* Input field for Image */}
                    <label htmlFor="image">Image: </label>
                    <input
                        type="text"
                        {...register("image", { required: "Please enter a valid image URL" })}
                        id="image"
                        onChange={handleOnChange}
                        value={formData.image}
                    />
                    <span>{errors.image?.message}</span>
                </div>
                <div>
                    {/* Input field for Price */}
                    <label htmlFor="price">Price: </label>
                    <input
                        type="text"
                        {...register("price", { required: "Please enter a valid price" })}
                        id="price"
                        onChange={handleOnChange}
                        value={formData.price}
                    />
                    <span>{errors.price?.message}</span>
                </div>
                {/* Button that becomes an "edit" button when the handleToggleEdit function is called */}
                <button>{editValue ? `Edit: ${formData.productName}` : "Add to Inventory"}</button>
            </form>
        </div>
    )
}
