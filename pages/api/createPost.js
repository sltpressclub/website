import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nameOfStudent } = req.body;

    const createPostMutation = `
      mutation CreatePost($nameOfStudent: String!) {
        createPost(
          data: {
            nameOfStudent: $nameOfStudent
          }
        ) {
          id
          nameOfStudent
        }
      }
    `;

    try {
      // Send the mutation request to Hygraph to create the post
      const response = await client.request(createPostMutation, {
        nameOfStudent,
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
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
