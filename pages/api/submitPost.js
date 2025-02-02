import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.GRAPHCMS_TOKEN;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { nameOfStudent } = req.body;

  if (!nameOfStudent) {
    return res.status(400).json({ message: "Name of student is required." });
  }

  try {
    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${graphCMSToken}`,
      },
    });

    // Create a post with just the nameOfStudent
    const mutation = gql`
      mutation CreatePost($nameOfStudent: String!) {
        createPost(data: { nameOfStudent: $nameOfStudent }) {
          id
        }
      }
    `;

    const variables = {
      nameOfStudent,
    };

    const result = await graphQLClient.request(mutation, variables);

    return res.status(200).json(result);
  } catch (error) {
    console.error("GraphQL Request Error:", error.response || error.message);
    return res.status(500).json({
      message: "Failed to create post",
      error: error.response?.errors || error.message,
    });
  }
}
