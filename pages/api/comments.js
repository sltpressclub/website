import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.GRAPHCMS_TOKEN;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, comment, slug } = req.body;

  if (!name || !email || !comment || !slug) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${graphCMSToken}`,
      },
    });

    const mutation = gql`
      mutation CreateComment(
        $name: String!
        $email: String!
        $comment: String!
        $slug: String!
      ) {
        createComment(
          data: {
            name: $name
            email: $email
            comment: $comment
            post: { connect: { slug: $slug } }
          }
        ) {
          id
        }
      }
    `;

    const variables = { name, email, comment, slug };
    const result = await graphQLClient.request(mutation, variables);

    return res.status(200).json(result);
  } catch (error) {
    console.error("GraphQL Request Error:", error.response || error.message);
    return res.status(500).json({
      message: "Failed to create comment",
      error: error.response?.errors || error.message,
    });
  }
}
