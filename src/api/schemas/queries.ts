import {gql} from "@apollo/client";

export const GET_PRODUCT = gql`
  query {
    product(id: "1") {
      id
      name
      description
    }
  }
`;

export const NAVIGATION_MENU = gql`
    query GetTopLevelCollections {
      collections(options: { topLevelOnly: true }) {
        items {
          id
          slug
          name
        featuredAsset {
          id
          preview
        }
      }
    }
}`;

export const GET_COLLECTIONS = gql`
    query GetCollection($slug: String!) {
  collection(slug: $slug) {
    id
    name
    slug
    description
    featuredAsset {
      id
      preview
    }
  }
}`;

export const GET_PRODUCTS_COLLECTION = gql`
    query GetCollectionProducts($slug: String!, $skip: Int, $take: Int) {
  search(
    input: {
      collectionSlug: $slug,
      groupByProduct: true,
      skip: $skip,
      take: $take }
  ) {
    totalItems
    items {
      productName
      slug
      productAsset {
        id
        preview
      }
      priceWithTax {
        ... on SinglePrice {
          value
        }
        ... on PriceRange {
          min
          max
        }
      }
      currencyCode
    }
  }
}`;

export const GET_ALL_COLLECTIONS = gql`
query GetAllCollections {
  collections{
    items {
      id
      slug
      name
      parentId
      featuredAsset {
        id
        preview
      }
    }
  }
}`;

export const ACTIVE_CUSTOMER_QUERY = gql`
  query ActiveCustomer {
    activeCustomer {
      id
      emailAddress
      firstName
      lastName
    }
  }
`;

export const GET_PRODUCT_DETAILS = gql`
query GetProductDetail($slug: String!) {
  product(slug: $slug) {
    id
    name
    description
    featuredAsset {
      id
      preview
    }
    assets {
      id
      preview
    }
    variants {
      id
      name
      sku
      stockLevel
      currencyCode
      price
      priceWithTax
      featuredAsset {
        id
        preview
      }
      assets {
        id
        preview
      }
    }
  }
}
`;