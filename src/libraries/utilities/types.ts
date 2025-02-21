import {Dispatch, ReactNode, SetStateAction} from "react";

export interface CollectionType {
    id: number;
    name: string;
    slug: string;
    parentId: number;
    featuredAsset: {
        preview: string;
    };
}

export interface CollectionProps {
    items: CollectionType[];
    currentId?: number;
}

export interface ProductCollectionProps {
    productName: string;
    slug: string;
    currencyCode: string;
    priceWithTax: {
        max: number;
        min: number;
    }
    productAsset: {
        id: string;
        preview: string;
    };
}

export interface ProductDetailsProps {
    id: string;
    name: string;
    description: string;
    featuredAsset: {
        id: string;
        preview: string;
    };
    assets: {
        id: string;
        preview: string;
    }[];
    variants: productVariant[];
}

export interface productVariant {
    id: string;
    name: string;
    sku: string;
    stockLevel: number;
    currencyCode: string;
    price: number;
    priceWithTax: {
        value: number;
    };
    featuredAsset: {
        id: string;
        preview: string;
    };
    assets: {
        id: string;
        preview: string;
    };
}

export interface AuthContextType {
    user: { id: string; emailAddress: string } | null;
    loading: boolean;
    logout: () => void;
    refetchUser: () => Promise<void>;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export interface buttonTypeProps {
    buttonName: string;
    logOut?: () => void;
}

export interface SignInOrSignUpProps {
    isLogin?: boolean;
    setIsLogin: Dispatch<SetStateAction<boolean>>;
}