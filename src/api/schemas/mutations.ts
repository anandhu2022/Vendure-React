import {gql} from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(username: $email, password: $password) {
      __typename
      ... on CurrentUser {
        id
        identifier
      }
      ... on ErrorResult {
        message
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout {
      success
    }
  }
`;

export const REGISTER_CUSTOMER_ACCOUNT = gql`
  mutation RegisterCustomerAccount($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input) {
      __typename
      ... on Success {
        success
      }
      ... on ErrorResult {
        message
      }
    }
  }
`;

export const VERIFY_CUSTOMER_ACCOUNT = gql`
  mutation VerifyCustomerAccount($token: String!) {
    verifyCustomerAccount(token: $token) {
      ... on CurrentUser {
        id
        identifier
      }
      ... on ErrorResult {
        message
      }
    }
  }
`;

export const ADD_TO_CART = gql`
mutation AddToCart($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ... on Order {
        id
        totalQuantity
        lines {
          id
          quantity
          productVariant {
            id
            name
          }
        }
      }
      ... on ErrorResult {
        message
      }
    }
  }
`;