import {FC} from "react";
import {CollectionProps, CollectionType} from "../libraries/utilities/types.ts";
import {Link} from "react-router-dom";

const Children: FC<CollectionProps> = ({items, currentId}) => {
    return (
        <div className="flex gap-5">
            {items &&
                items.map((item: CollectionType) => {
                    if (item.parentId === currentId) {
                        return (
                            <div key={item.id} className="relative w-82 h-82">
                                <Link to={`/collections/${item.slug}`}>
                                    <img className="w-full h-full object-cover rounded-lg"
                                         src={item.featuredAsset?.preview || "https://via.placeholder.com/300"}
                                         alt={item.name || "Card Image"}
                                         onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/300")}
                                    />
                                    <h2 className="absolute top-2 left-1/2 transform -translate-x-1/2 text-black text-xl font-bold bg-opacity-50">
                                        {item.name}
                                    </h2>
                                </Link>
                            </div>

                        )
                    }
                    return null;
                })
            }
        </div>
    );
};

export default Children;