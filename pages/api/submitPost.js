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

  try {
    const graphQLClient = new GraphQLClient(graphqlAPI, {
      headers: {
        authorization: `Bearer ${graphCMSToken}`,
      },
    });

    // Handle the image upload only if the image exists
    let uploadedImageUrl = null;
    if (featuredImage) {
      const uploadMutation = gql`
        mutation UploadImage($file: Upload!) {
          uploadImage(data: { file: $file }) {
            url
          }
        }
      `;

      const imageUploadResponse = await graphQLClient.request(uploadMutation, {
        file: featuredImage,
      });

      uploadedImageUrl = imageUploadResponse.uploadImage.url;
    }

    // Create the post with any missing fields handled accordingly
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
        $featuredImage: String
        $content: RichTextAST!
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
            content: $content
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
      featuredImage: uploadedImageUrl, // ✅ Use uploaded image URL or null
      content: { raw: content || "" }, // ✅ Handle missing content as empty string
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
