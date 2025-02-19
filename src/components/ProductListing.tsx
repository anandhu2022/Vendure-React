import {useQuery} from "@apollo/client";
import {GET_PRODUCTS_COLLECTION} from "../api/schemas/queries.ts";
import {Link, useParams} from "react-router-dom";
import {ProductCollectionProps} from "../libraries/utilities/types.ts";
import {formatCurrency} from "../libraries/utilities/formatPrice.ts";

const ProductListing = () => {
    const {slug} = useParams();
    const {data: productCollection} = useQuery(GET_PRODUCTS_COLLECTION, {
        variables: {slug},
        skip: !slug
    });
    const items: ProductCollectionProps[] = productCollection?.search?.items;
    return (
        <div className="flex flex-row gap-3">
            <div className="bg-gray-200 min-w-xs rounded-2xl p-3">
                Filters
            </div>
            <div className="w-full flex flex-wrap ">
                {
                    items &&
                    items.map((item: ProductCollectionProps) => (
                        <Link key={item.slug} className="p-4 w-1/4 h-xs flex flex-col gap-2"
                              to={`/products/${item.slug}`}>
                            <img className="w-full h-15/16 object-cover rounded-lg"
                                 src={item.productAsset?.preview}
                                 alt={item.productName}
                            />
                            <div className="text-gray-700 text-sm bg-opacity-50">
                                {item.productName}
                            </div>
                            <div className="text-black text-sm">
                                {item.priceWithTax.max !== item.priceWithTax.min ?
                                    formatCurrency(item.priceWithTax.min) +
                                    " - " +
                                    formatCurrency(item.priceWithTax.max) :
                                    formatCurrency(item.priceWithTax.min)
                                }
                            </div>
                        </Link>
                    ))

                }
            </div>
        </div>
    );
};

export default ProductListing;
