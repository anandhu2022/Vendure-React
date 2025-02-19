import { useQuery } from "@apollo/client";
import {GET_PRODUCT} from "../api/schemas/queries.ts";


const Product = () => {
    const {loading, error, data} = useQuery(GET_PRODUCT);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div>
            <h1>Product Details</h1>
            <p><strong>ID:</strong> {data.product.id}</p>
            <p><strong>Name:</strong> {data.product.name}</p>
            <p><strong>Description:</strong> {data.product.description}</p>
        </div>
    );
};

export default Product;
