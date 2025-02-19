import { useParams } from "react-router-dom";
import { GET_ALL_COLLECTIONS, GET_COLLECTION } from "../api/queries.ts";
import { useQuery } from "@apollo/client";
import { CollectionTypes } from "../components/NavBar.tsx";

const TopLevelCollections = () => {
    const { slug } = useParams<{ slug: string }>();

    // Fetch the parent collection
    const { data: ParentCollection } = useQuery(GET_COLLECTION, {
        variables: { slug },
        skip: !slug,
    });

    // Get the parent collection's ID
    const id = ParentCollection?.collection?.id;

    // Fetch all collections
    const { data: AllCollections } = useQuery(GET_ALL_COLLECTIONS);

    return (
        <div className="container px-40 py-8">
            {/* Parent Collection Title */}
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
                {ParentCollection?.collection?.name}
            </h1>

            {/* Child Collections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {AllCollections?.collections?.items
                    .filter((item: CollectionTypes) => id === item.parentId)
                    .map((item: CollectionTypes) => (
                        <a
                            key={item.id}
                            href={`/collection/${item.slug}`}
                            className="block p-4 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg"
                        >
                            <h2 className="text-lg font-semibold text-gray-700">{item.name}</h2>
                        </a>
                    ))}
            </div>
        </div>
    );
};

export default TopLevelCollections;
