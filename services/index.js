import { request, gql } from "graphql-request";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// Get Posts
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection(orderBy: createdAt_DESC) {
        edges {
          cursor
          node {
            members {
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

// Get Post Details
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        members {
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

// Get Recent Posts
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

// Get Categories
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

// Submit Comment
export const submitComment = async (commentData) => {
  const response = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to submit comment.");
  }

  const result = await response.json();
  return result;
};

// Get Comments
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

// Get Upcoming Events
export const getUpcoming = async () => {
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
  const result = await request(graphqlAPI, query);
  return result.upcomings;
};

// Search Posts and Upcoming Events
export const searchPostsAndUpcoming = async (searchTerm) => {
  const query = gql`
    query SearchPostsAndUpcoming($searchTerm: String!) {
      posts(where: { title_contains: $searchTerm }) {
        id
        title
        slug
        excerpt
        members {
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
      members(where: { name_contains: $searchTerm }) {
        id
        name
        bio
        photo {
          url
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { searchTerm });
  if (!result) {
    throw new Error("No results found.");
  }
  return {
    posts: result.posts,
    upcomings: result.upcomings,
    members: result.members,
  };
};

// Get Category Posts
export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { category_some: { slug: $slug } }) {
        edges {
          node {
            members {
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
  const result = await request(graphqlAPI, query, { slug });
  return result.postsConnection.edges.map((edge) => edge.node);
};

export const getMembers = async () => {
  const query = gql`
    query GetMembers {
      members {
        id
        name
        role
        bio
        slug
        photo {
          url
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.members;
};
