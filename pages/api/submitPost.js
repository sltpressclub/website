import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.GRAPHCMS_TOKEN;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const {
    nameOfStudent,
    class: studentClass,
    email,
    phoneNumber,
    whatsapp,
    title,
    slug,
    excerpt,
    featuredImage,
    content,
  } = req.body;

  if (
    !nameOfStudent ||
    !studentClass ||
    !email ||
    !title ||
    !slug ||
    !excerpt ||
    !featuredImage ||
    !content
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${graphCMSToken}`,
      },
    });

    const mutation = gql`
      mutation CreatePost(
        $nameOfStudent: String!
        $class: String!
        $email: String!
        $phoneNumber: String
        $whatsapp: String
        $title: String!
        $slug: String!
        $excerpt: String!
        $featuredImage: String!
        $content: RichText!
      ) {
        createPost(
          data: {
            nameOfStudent: $nameOfStudent
            class: $class
            email: $email
            phoneNumber: $phoneNumber
            whatsapp: $whatsapp
            title: $title
            slug: $slug
            excerpt: $excerpt
            featuredImage: { create: { url: $featuredImage } }
            content: { raw: $content }
          }
        ) {
          id
        }
      }
    `;

    const variables = {
      nameOfStudent,
      class: studentClass,
      email,
      phoneNumber,
      whatsapp,
      title,
      slug,
      excerpt,
      featuredImage,
      content: { raw: content },
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
