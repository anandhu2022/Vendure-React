import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_PRODUCT_DETAILS} from "../api/schemas/queries.ts";
import {ProductDetailsProps, productVariant} from "../libraries/utilities/types.ts";
import MuiBreadcrumbs from "../components/MuiBreadcrumbs.tsx";

const Product = () => {
    const {slug} = useParams();
    const {data, loading, error} = useQuery(GET_PRODUCT_DETAILS, {
        variables: {slug},
        skip: !slug
    });

    const productDetails: ProductDetailsProps | null = data?.product || null;
    console.log(productDetails);
    if (loading) return <div className="px-60 py-9">Loading...</div>;
    if (error) return <div className="px-60 py-9 text-red-500">Error loading product details</div>;
    if (!productDetails) return <div className="px-60 py-9 text-gray-500">Product not found</div>;

    return (
        <div className="px-60 py-9">
            <div className="text-4xl text-gray-700">
                {productDetails.name}
            </div>
            <MuiBreadcrumbs/>
            <div className="flex flex-row gap-8">
                <img src={productDetails.featuredAsset.preview} alt="product-image"
                     className="w-xl py-3 rounded-4xl object-cover"/>
                <div className="py-4 text-gray-700">
                    <div>{productDetails.description}</div>
                    <div className="pt-4">
                        Select option
                        <select name="varient">
                            {productDetails.variants.map((variant: productVariant) => (
                                <option key={variant.id} value={variant.id}>{variant.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
