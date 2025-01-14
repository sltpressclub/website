import { request, gql } from "graphql-request";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

// Utility function to handle GraphQL requests with error handling
const fetchGraphQL = async (query, variables) => {
  try {
    const result = await request(graphqlAPI, query, variables);
    return result;
  } catch (error) {
    console.error("GraphQL Request Error:", error);
    throw new Error("Something went wrong while fetching data from GraphQL.");
  }
};

// Get Latest Post
export const getPosts = async () => {
  const query = gql`
    query GetPosts {
      postsConnection(orderBy: createdAt_DESC, first: 1) {
        edges {
          cursor
          node {
            member {
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

  const result = await fetchGraphQL(query);
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
        member {
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

  const result = await fetchGraphQL(query, { slug });
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

  const result = await fetchGraphQL(query);
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

  const result = await fetchGraphQL(query, { first: 20 });
  return result.categories;
};

// Submit Comment
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
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit comment.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw new Error("Failed to submit comment.");
  }
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

  const result = await fetchGraphQL(query, { slug });
  return result.comments;
};

// Get Upcoming Events
export const getUpcoming = async () => {
  const query = gql`
    query GetUpcoming {
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

  const result = await fetchGraphQL(query);
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
            member {
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

  const result = await fetchGraphQL(query, { slug });
  return result.postsConnection.edges.map((edge) => edge.node);
};

// Get Members
export const getMembers = async () => {
  const query = gql`
    query GetMembers {
      members {
        id
        name
        bio
        photo {
          url
        }
        role {
          name
        }
      }
    }
  `;

  const result = await fetchGraphQL(query);
  return result.members;
};
import { gql } from "graphql-request";
import { fetchGraphQL } from "./graphqlClient"; // Assuming you have a GraphQL client set up

// Fetch member by slug
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

  const variables = { slug };
  const result = await fetchGraphQL(query, variables);
  return result.member;
};

// Fetch posts by a specific member
export const getPostsByMember = async (memberId) => {
  const query = gql`
    query GetPostsByMember($memberId: ID!) {
      posts(where: { author: { id: $memberId } }) {
        id
        title
        slug
        content
      }
    }
  `;

  const variables = { memberId };
  const result = await fetchGraphQL(query, variables);
  return result.posts;
};
