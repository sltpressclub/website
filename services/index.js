import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection(orderBy: createdAt_DESC) {
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
        member {
          name
          bio
          slug
          role {
            name
          }
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
