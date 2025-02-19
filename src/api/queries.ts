import {gql} from "@apollo/client";

export const GET_TOP_LEVEL_COLLECTION = gql`
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
}
`;

export const GET_COLLECTION = gql`
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

export const GET_ALL_COLLECTIONS = gql`
query GetAllCollections {
  collections {
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