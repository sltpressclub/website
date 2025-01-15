import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

/**
 * Utility function to handle GraphQL requests with error handling.
 * @param {string} query - The GraphQL query string.
 * @param {object} variables - Variables for the query.
 * @returns {Promise<any>} - The result of the GraphQL request.
 */
const fetchGraphQL = async (query, variables = {}) => {
  try {
    return await request(graphqlAPI, query, variables);
  } catch (error) {
    console.error("GraphQL Request Error:", error);
    throw new Error("Failed to fetch data.");
  }
};

/**
 * Fetch all posts with basic details.
 * @returns {Promise<Array>} - Array of posts.
 */
export const getPosts = async () => {
  const query = gql`
    query GetPosts {
      postsConnection(orderBy: createdAt_DESC, first: 1) {
        edges {
          node {
            id
            title
            slug
            excerpt
            createdAt
            featuredImage {
              url
            }
            category {
              name
              slug
            }
            member {
              id
              name
              bio
              photo {
                url
              }
            }
          }
        }
      }
    }
  `;
  const result = await fetchGraphQL(query);
  return result.postsConnection.edges.map((edge) => edge.node);
};

/**
 * Fetch details of a specific post by slug.
 * @param {string} slug - The slug of the post.
 * @returns {Promise<object>} - Post details.
 */
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        id
        title
        excerpt
        createdAt
        featuredImage {
          url
        }
        content {
          raw
        }
        category {
          name
          slug
        }
        member {
          id
          name
          bio
          role
          photo {
            url
          }
        }
      }
    }
  `;

  try {
    const result = await fetchGraphQL(query, { slug });
    return result.post || null; // Return null if no post is found
  } catch (error) {
    console.error(`Error fetching post details for slug: ${slug}`, error);
    return null; // Return null in case of error
  }
};

/**
 * Fetch the most recent posts.
 * @returns {Promise<Array>} - Array of recent posts.
 */
export const getRecentPosts = async () => {
  const query = gql`
    query GetRecentPosts {
      posts(orderBy: createdAt_DESC, first: 3) {
        id
        title
        slug
        featuredImage {
          url
        }
        createdAt
      }
    }
  `;
  const result = await fetchGraphQL(query);
  return result.posts;
};

/**
 * Fetch posts by category slug.
 * @param {string} slug - The slug of the category.
 * @returns {Promise<Array>} - Array of posts in the category.
 */
export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { category_some: { slug: $slug } }) {
        edges {
          node {
            id
            title
            slug
            excerpt
            createdAt
            featuredImage {
              url
            }
            member {
              id
              name
              bio
              photo {
                url
              }
            }
          }
        }
      }
    }
  `;
  const result = await fetchGraphQL(query, { slug });
  return result.postsConnection.edges.map((edge) => edge.node);
};

/**
 * Fetch all categories.
 * @returns {Promise<Array>} - Array of categories.
 */
export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        id
        name
        slug
      }
    }
  `;
  const result = await fetchGraphQL(query);
  return result.categories;
};

/**
 * Fetch all members.
 * @returns {Promise<Array>} - Array of members.
 */
export const getMembers = async () => {
  const query = gql`
    query GetMembers {
      members {
        id
        name
        bio
        role {
          name
        }
        photo {
          url
        }
        slug
      }
    }
  `;
  const result = await fetchGraphQL(query);
  return result.members;
};

/**
 * Fetch upcoming events.
 * @returns {Promise<Array>} - Array of upcoming events.
 */
export const getUpcoming = async () => {
  const query = gql`
    query GetUpcoming {
      upcomings(orderBy: date_ASC) {
        id
        name
        slug
        description
        date
        venue
        requirement
      }
    }
  `;
  const result = await fetchGraphQL(query);
  return result.upcomings;
};

/**
 * Search for posts, events, and members.
 * @param {string} searchTerm - The search term.
 * @returns {Promise<object>} - Search results.
 */
export const searchPostsAndUpcoming = async (searchTerm) => {
  const query = gql`
    query SearchPostsAndUpcoming($searchTerm: String!) {
      posts(where: { title_contains: $searchTerm }) {
        id
        title
        slug
        excerpt
        member {
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
  const result = await fetchGraphQL(query, { searchTerm });
  return {
    posts: result.posts || [],
    upcomings: result.upcomings || [],
    members: result.members || [],
  };
};

/**
 * Submit a new comment.
 * @param {object} commentData - Data of the comment.
 * @returns {Promise<any>} - The result of the submission.
 */
export const submitComment = async (commentData) => {
  try {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit comment.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw new Error("Failed to submit comment.");
  }
};

/**
 * Fetch comments for a specific post by slug.
 * @param {string} slug - The slug of the post.
 * @returns {Promise<Array>} - Array of comments.
 */
export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }, orderBy: createdAt_DESC) {
        id
        name
        comment
        createdAt
      }
    }
  `;
  const result = await fetchGraphQL(query, { slug });
  return result.comments;
};

/**
 * Fetch member by slug.
 * @param {string} slug - The slug of the member.
 * @returns {Promise<object>} - Member details.
 */
export const getMemberBySlug = async (slug) => {
  const query = gql`
    query GetMemberBySlug($slug: String!) {
      member(where: { slug: $slug }) {
        id
        name
        bio
        role {
          name
        }
        photo {
          url
        }
        slug
      }
    }
  `;
  const result = await fetchGraphQL(query, { slug });
  return result.member;
};

/**
 * Fetch posts by a specific member ID.
 * @param {string} memberId - The ID of the member.
 * @returns {Promise<Array>} - Array of posts by the member.
 */
export const getPostsByMember = async (memberId) => {
  const query = gql`
    query GetPostsByMember($memberId: ID!) {
      posts(where: { member: { id: $memberId } }, orderBy: createdAt_DESC) {
        id
        title
        slug
        excerpt
        createdAt
        featuredImage {
          url
        }
      }
    }
  `;
  const result = await fetchGraphQL(query, { memberId });
  return result.posts || [];
};
