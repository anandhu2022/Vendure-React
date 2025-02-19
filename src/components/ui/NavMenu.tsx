import {CollectionType} from "../../libraries/utilities/types.ts";
import {NAVIGATION_MENU} from "../../api/schemas/queries.ts";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import HomeIcon from "@mui/icons-material/Home";

const NavMenu = () => {
    const {data} = useQuery(NAVIGATION_MENU);
    const [collections, setCollections] = useState<CollectionType[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setCollections(data.collections?.items);
        }
    }, [data]);

    const topLevelCollectionPage = (slug: string) => {
        navigate(`/collections/${slug}`)
    };

    return (
        <div className="bg-gray-900 px-60 text-white flex felx-row gap-9 py-4 items-center">
            <Link to={'/'}>
                <HomeIcon />
            </Link>
            {collections && collections.map(({id, name, slug}: CollectionType) => (
                <div key={id} onClick={() => topLevelCollectionPage(slug)}>
                    <h2 className="cursor-pointer">{name}</h2>
                </div>
            ))}
        </div>
    );
};

export default NavMenu;
