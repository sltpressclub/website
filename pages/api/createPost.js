import { GraphQLClient } from "graphql-request";

const hygraphAPI = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
  {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  }
);

const CREATE_POST_MUTATION = `
  mutation CreatePost($nameOfStudent: String!, $class: String!, $email: String!, $phoneNumber: String!, $whatsapp: String, $content: String!, $title: String!, $slug: String!, $featuredImage: String) {
    createPost(data: {
      nameOfStudent: $nameOfStudent
      class: $class
      email: $email
      phoneNumber: $phoneNumber
      whatsapp: $whatsapp
      content: $content
      title: $title
      slug: $slug
      featuredImage: { url: $featuredImage }
    }) {
      id
      title
      slug
      content
    }
  }
`;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      nameOfStudent,
      class: studentClass,
      email,
      phoneNumber,
      whatsapp,
      content,
      title,
      slug,
      featuredImage,
    } = req.body;

    try {
      const variables = {
        nameOfStudent,
        class: studentClass,
        email,
        phoneNumber,
        whatsapp,
        content,
        title,
        slug,
        featuredImage,
      };

      const data = await hygraphAPI.request(CREATE_POST_MUTATION, variables);

      res.status(200).json({ message: "Post created successfully", data });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating post", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
