import {CartItemProps, CollectionType} from "../../libraries/utilities/types.ts";
import {GET_CART, NAVIGATION_MENU} from "../../api/schemas/queries.ts";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import HomeIcon from "@mui/icons-material/Home";
import {useAuth} from "../../context/useAuth.ts";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CloseIcon from '@mui/icons-material/Close';
import {formatCurrency} from "../../libraries/utilities/formatPrice.ts";

const NavMenu = () => {
    const {data: navigationData} = useQuery(NAVIGATION_MENU);
    const {data: cartData} = useQuery(GET_CART);
    const [collections, setCollections] = useState<CollectionType[]>([]);
    const navigate = useNavigate();
    const {user} = useAuth();
    const [shoppingCart, setShoppingCart] = useState<boolean>(false);
    useEffect(() => {
        if (navigationData) {
            setCollections(navigationData.collections?.items);
        }
    }, [navigationData]);
    if (!user) return;

    const topLevelCollectionPage = (slug: string) => {
        navigate(`/collections/${slug}`)
    };

    const handleShoppingCart = () => {
        setShoppingCart(!shoppingCart);
    };
    return (
        <div className="bg-gray-900 px-60 text-white flex flex-row justify-between items-center">
            <div className="flex flex-row gap-9 py-4 items-center">
                <Link to={'/'}>
                    <HomeIcon/>
                </Link>
                {collections && collections.map(({id, name, slug}: CollectionType) => (
                    <div key={id} onClick={() => topLevelCollectionPage(slug)}>
                        <h2 className="cursor-pointer">{name}</h2>
                    </div>
                ))}
            </div>
            <div onClick={handleShoppingCart} className="cursor-pointer">
                <LocalMallIcon/>
            </div>
            {shoppingCart &&
                <div
                    className="fixed top-0 h-screen right-0 w-110 h-40 bg-white p-5 shadow-md z-50 shadow-gray-950">
                    <div className="flex flex-row gap-4 text-black w-full">
                        <div className="flex justify-between w-full">
                            <span className="text-xl">Shopping Cart</span>
                            <CloseIcon onClick={handleShoppingCart} className="cursor-pointer" color="action"/>
                        </div>
                    </div>
                    <div className="p-2 w-full">
                        {cartData?.activeOrder?.lines.map((line: CartItemProps) => {
                            console.log(line)
                            return (
                                <div className="flex flex-row py-4 text-black w-full">
                                    <div className="flex flex-row gap-2 w-full">
                                        <img src={line?.productVariant?.product?.featuredAsset?.preview} alt="image"
                                             className="w-25 h-25 rounded object-cover"/>
                                        <div className="flex flex-col justify-between w-70 py-1">
                                            <div className="w-full flex flex-row justify-between">
                                                <h2 className="max-w-50">{line?.productVariant?.name}</h2>
                                                <div>{formatCurrency(line.productVariant.priceWithTax)}</div>
                                            </div>
                                            <div className="flex justify-between">
                                                Quantity: {line.quantity}
                                                Remove
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                // <div key={line.id} className="flex flex-row gap-2 py-2 text-black">
                                //     <img src={line?.productVariant?.product?.featuredAsset?.preview} alt="image"
                                //          className="w-25 h-25 rounded object-cover"/>
                                //     <h2 className="max-w-50">{line?.productVariant?.name}</h2>
                                //
                                // </div>
                            );
                        })}
                    </div>
                </div>
            }
        </div>
    );
};

export default NavMenu;
