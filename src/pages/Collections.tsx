import {GET_ALL_COLLECTIONS, GET_COLLECTIONS} from "../api/schemas/queries.ts";
import {CollectionType} from "../libraries/utilities/types.ts";
import ProductListing from "../components/ProductListing.tsx";
import MuiBreadcrumbs from "../components/MuiBreadcrumbs.tsx";
import Children from "../components/Children.tsx";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";

const Collections = () => {
    const {slug} = useParams();
    const {data: CollectionData} = useQuery(GET_COLLECTIONS, {
        variables: {slug},
        skip: !slug
    });
    const currentId: number = CollectionData?.collection?.id;
    const {data: AllCollections} = useQuery(GET_ALL_COLLECTIONS)
    const items: CollectionType[] = AllCollections?.collections?.items;

    const hasCollections = items && items.some(item => item.parentId === currentId);

    return (
        <div className="px-60 text-xl p-8">
            <div className="text-5xl">{CollectionData?.collection?.name}</div>
            <MuiBreadcrumbs/>
            {hasCollections && <div className="text-3xl py-8">Collections</div>}
            <Children items={items} currentId={currentId}/>
            <hr className="my-9 text-gray-300"/>
            <ProductListing/>
        </div>
    );
};

export default Collections;






