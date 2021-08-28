import { gql } from "@apollo/client";

const GET_ME = gql `
{
    me {
        _id
        username
        email
        savedBooks {
            bookId
            description
            authors
            image
            title
            link
        }
    }
}
`
export default GET_ME;