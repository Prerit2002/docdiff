import { gql } from "apollo-boost";

export const getRepos = gql`
query {
    viewer {
      repositories(first: 100) {
        nodes {
          id
          name
        }
      }
    }
  }
`

export const getUser = gql`
query { 
  viewer { 
    login
  }
}
`



export const getFileTree = gql`
  query ($name: String!) {
    viewer {
      repository(name: $name) {
        object(expression: "HEAD:") {
          ... on Tree {
            entries {
              type
              oid
              name
              object {
                ... on Blob {
                  text
                }
              }
            }
          }
        }
      }
    }
  }
`

export const getInnerFiles = gql`
  query ($name: String!, $oid: GitObjectID) {
    viewer {
      repository(name: $name) {
        object(oid: $oid) {
          ... on Tree {
            entries {
              type
              oid
              name
              object {
                ... on Blob {
                  text
                }
              }
            }
          }
        }
      }
    }
  }
`

