import {Link} from "react-router-dom";

export interface CollectionTypes {
    id: number;
    name: string;
    slug: string;
    parentId: string;
}

import {useQuery} from "@apollo/client";
import {GET_TOP_LEVEL_COLLECTION} from "../api/schemas/queries.ts";

const NavBar = () => {
        const {data} = useQuery(GET_TOP_LEVEL_COLLECTION);
        return (
            <div className="bg-blue-600 p-2 px-40 text-white flex items-center gap-9">
                {data?.collections?.items.map(({id, name, slug}: CollectionTypes) => (
                    <div key={id} className="cursor-pointer">
                        <Link to={`/collections/${slug}`}>
                            {name}
                        </Link>
                    </div>
                ))}
            </div>
        );
    }
;

export default NavBar;