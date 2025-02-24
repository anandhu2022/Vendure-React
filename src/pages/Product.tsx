import {ProductDetailsProps, productVariant} from "../libraries/utilities/types.ts";
import {formatCurrency} from "../libraries/utilities/formatPrice.ts";
import {GET_PRODUCT_DETAILS} from "../api/schemas/queries.ts";
import MuiBreadcrumbs from "../components/MuiBreadcrumbs.tsx";
import {ADD_TO_CART} from "../api/schemas/mutations.ts";
import {useMutation, useQuery} from "@apollo/client";
import {Favorite} from "@mui/icons-material";
import {ChangeEvent, useState} from "react";
import {useParams} from "react-router-dom";

const Product = () => {
    const {slug} = useParams();
    const {data, loading, error} = useQuery(GET_PRODUCT_DETAILS, {
        variables: {slug},
        skip: !slug
    });

    const [addToCart] = useMutation(ADD_TO_CART);
    const productDetails: ProductDetailsProps | null = data?.product || null;
    const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null)
    const selectedVariant: productVariant | undefined =
        productDetails?.variants.find((v) => v.id === selectedVariantId) || productDetails?.variants[0];

    if (loading) return <div className="px-60 py-9">Loading...</div>;
    if (error) return <div className="px-60 py-9 text-red-500">Error loading product details</div>;
    if (!productDetails) return <div className="px-60 py-9 text-gray-500">Product not found</div>;

    const handleVariantChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedVariantId(event.target.value);
    };

    const handleAddToCart = async (productVariantId: string) => {
        const {data} = await addToCart({
            variables: {
                productVariantId,
                quantity: 1,
            }
        })
        console.log(data);
        if (data?.addItemToOrder?.__typename == "Order") {
            setMessage("Product added to cart successfully");
            setTimeout(() => setMessage(null), 3000);
        } else {
            setMessage("Failed to add product to cart");
            setTimeout(() => setMessage(null), 3000);
        }
    }

    return (
        <div className="px-60 py-9">
            <div className="text-4xl text-gray-900">{productDetails.name}</div>
            <MuiBreadcrumbs/>
            <div className="min-h-7">
                {message && <div className={`${message.includes('successfully') ? 'bg-green-300' : 'bg-red-300'} text-center rounded-2xl text-xm`}>{message}</div>}
            </div>
            <div className="flex flex-row gap-8 mt-4">
                <img src={productDetails.featuredAsset.preview} alt="product-image"
                     className="w-xl py-3 rounded-4xl object-cover"/>
                <div className="py-4 text-gray-700">
                    <div className="text-justify">{productDetails.description}</div>

                    {productDetails.variants.length > 1 && (
                        <div className="pt-4 relative">
                            Select option<br/>
                            <select name="variant"
                                    className="mt-2 border-1 border-gray-300 w-full p-2 rounded-xl appearance-none"
                                    onChange={handleVariantChange}
                                    value={selectedVariant?.id || ""}>
                                {productDetails.variants.map((variant) => (
                                    <option key={variant.id} value={variant.id}>
                                        {variant.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-1/32 bottom-1/12 pointer-events-none">▼</div>
                        </div>
                    )}

                    <div className="flex flex-row items-center mt-10 gap-8">
                        <div
                            className="text-4xl text-gray-800">{formatCurrency(selectedVariant?.priceWithTax || 0)}</div>
                        <Favorite fontSize="large" className="cursor-pointer"/>
                    </div>
                    <button
                        className="bg-gray-800 text-gray-400 rounded-xl py-2 px-2
                        cursor-pointer mt-5 hover:bg-gray-950 hover:text-white"
                        onClick={async () => {
                            if (selectedVariantId) {
                                await handleAddToCart(selectedVariantId);
                            } else if (selectedVariant) {
                                await handleAddToCart(selectedVariant.id);
                            } else {
                                console.error("No valid variant selected!");
                            }
                        }}
                    >
                        Add to Cart
                    </button>
                    <div className="my-3 flex flex-row gap-5 items-center">

                        <div>{selectedVariant?.sku}</div>
                        <div
                            className={`rounded-2xl p-1 ${selectedVariant?.stockLevel === "IN_STOCK" ? "bg-green-300" : "bg-red-300"}`}>
                            {selectedVariant?.stockLevel === "IN_STOCK" ? "In stock" : "Out of Stock"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
