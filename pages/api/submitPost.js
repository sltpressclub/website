import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.GRAPHCMS_TOKEN;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { nameOfStudent } = req.body;

  if (!nameOfStudent) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${graphCMSToken}`,
      },
    });

    // Log the request data for debugging
    console.log("Request Data:", req.body);

    const mutation = gql`
      mutation CreatePost($nameOfStudent: String!) {
        createPost(data: { nameOfStudent: $nameOfStudent }) {
          id
        }
      }
    `;

    const variables = { nameOfStudent };
    const result = await graphQLClient.request(mutation, variables);

    // Log the response for debugging
    console.log("GraphQL Response:", result);

    return res.status(200).json(result);
  } catch (error) {
    console.error("GraphQL Request Error:", error.response || error.message);
    return res.status(500).json({
      message: "Failed to create post",
      error: error.response?.errors || error.message,
    });
  }
}
