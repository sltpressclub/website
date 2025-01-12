import { request, gql } from "graphql-request";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection(orderBy: createdAt_DESC) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            category {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        category {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};
export const getRecentPosts = async () => {
  const query = gql`
    query GetRecentPosts {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories($first: Int) {
      categories(first: $first) {
        name
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { first: 20 });
  return result.categories;
};

export const submitComment = async (commentData) => {
  // Send POST request to the API
  const response = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });

  // Handle non-OK responses
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to submit comment.");
  }

  // Parse JSON response
  const result = await response.json();
  return result;
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }, orderBy: createdAt_DESC) {
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};
export const getUpcoming = async () => {
  // Updated GraphQL query to fetch events in descending order of the date
  const query = gql`
    query MyQuery {
      upcomings(orderBy: date_ASC) {
        id
        name
        slug
        createdAt
        date
        description
        venue
        requirement
      }
    }
  `;

  // Execute the query and fetch results
  const result = await request(graphqlAPI, query);

  // Return the list of upcoming events
  return result.upcomings;
};

export const searchPostsAndUpcoming = async (searchTerm) => {
  try {
    const query = gql`
      query SearchPostsAndUpcoming($searchTerm: String!) {
        posts(where: { title_contains: $searchTerm }) {
          id
          title
          slug
          excerpt
          author {
            id
            name
            bio
            photo {
              url
            }
          }
        }
        upcomings(where: { name_contains: $searchTerm }) {
          id
          name
          slug
          description
        }
        authors(where: { name_contains: $searchTerm }) {
          id
          name
          bio
          photo {
            url
          }
        }
      }
    `;

    // Fetch the data from the GraphQL API
    const result = await request(graphqlAPI, query, { searchTerm });

    if (!result) {
      throw new Error("No results found.");
    }

    return {
      posts: result.posts,
      upcomings: result.upcomings,
      authors: result.authors,
    };
  } catch (error) {
    // Log the error and display a message to the user
    console.error("Error fetching search results:", error);
    throw new Error("Failed to fetch search results. Please try again.");
  }
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { category_some: { slug: $slug } }) {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            category {
              name
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query, { slug });
    return result.postsConnection.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return an empty array in case of error
  }
};
