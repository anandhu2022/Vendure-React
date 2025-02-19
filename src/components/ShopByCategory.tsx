import {useQuery} from "@apollo/client";
import {GET_ALL_COLLECTIONS} from "../api/schemas/queries.ts";
import {CollectionProps, CollectionType} from "../libraries/utilities/types.ts";
import {FC} from "react";
import {Link} from "react-router-dom";

const ShopByCategory = () => {
    const {data: allCollections} = useQuery(GET_ALL_COLLECTIONS);
    const items: CollectionType[] = allCollections?.collections?.items;
    return (
        <div className="p-40">
            <h3 className="text-2xl">Shop by Category</h3>
            <Categories items={items}/>
        </div>
    );
};

export default ShopByCategory;


const Categories: FC<CollectionProps> = ({items}) => {
    return (
        <div className="flex flex-row gap-6 flex-wrap justify-center py-9">
            {
                items &&
                items.map(({id, name, slug, featuredAsset: {preview}}: CollectionType) => (
                    <Link to={`/collections/${slug}`} key={id} className="p-4 relative w-82 h-82">
                        <img src={preview} alt="" className="w-full h-full object-cover"/>
                        <h2 className="absolute top-5 text-xl left-1/2 transform -translate-x-1/2">{name}</h2>
                    </Link>
                ))
            }
        </div>
    );
};
