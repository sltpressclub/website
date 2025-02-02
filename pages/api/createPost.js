import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      nameOfStudent,
      class: studentClass,
      email,
      phoneNumber,
      whatsapp,
      title,
      slug,
      content,
      featuredImage,
    } = req.body;

    const createPostMutation = `
      mutation CreatePost(
        $nameOfStudent: String!
        $class: String!
        $email: String!
        $phoneNumber: String!
        $whatsapp: String
        $title: String!
        $slug: String!
        $content: String!
        $featuredImage: String!
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
            content: $content
            featuredImage: { url: $featuredImage }
          }
        ) {
          id
          title
          slug
        }
      }
    `;

    try {
      // Send the mutation request to Hygraph to create the post
      const response = await client.request(createPostMutation, {
        nameOfStudent,
        class: studentClass,
        email,
        phoneNumber,
        whatsapp,
        title,
        slug,
        content,
        featuredImage,
      });

      return res.status(200).json({
        message: "Post created successfully!",
        postId: response.createPost.id,
      });
    } catch (error) {
      console.error("Error creating post:", error);
      return res
        .status(500)
        .json({ message: "Error creating post", error: error.message });
    }
  } else {
    // If the request method is not POST
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
