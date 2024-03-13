import { gql } from 'graphql-tag';

const GET_BUSINESSES = gql`
query GetBusinesses {
  businesses {
    id
    name
    category {
      id
      name
    }
    campaigns {
      id
      budget
    }
  }
}
`;

export default GET_BUSINESSES
