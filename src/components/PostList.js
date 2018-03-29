import React, { Component, Fragment } from "react";
import Post from "./Post";

import gql from "graphql-tag";
import { graphql } from "react-apollo";

const ALL_POSTS_QUERY = gql`
  query allPostsQuery {
    allPosts {
      id
      title
      content
    }
  }
`;

const POSTS_SUBSCRIPTION = gql`
  subscription updatePost {
    Post(
      filter: {
        mutation_in: [CREATED, UPDATED, DELETED]
      }
    ) {
      mutation
      node {
        id
        title
        content
      }
      updatedFields
      previousValues {
        id
        title
        content
      }
    }
  }
`;

class PostList extends Component {
  componentDidMount() {
    this.props.allPostsQuery.subscribeToMore({
      document: POSTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        let newPosts = [
          ...prev.allPosts,
        ];
        if (subscriptionData.data.Post.mutation === "CREATED") {
          newPosts = [
            ...prev.allPosts,
            subscriptionData.data.Post.node,
          ];
        }
        const result = {
          ...prev,
          allPosts: newPosts,
        };
        console.log('prev', prev);
        console.log('sub', subscriptionData.data);
        console.log('newPosts', newPosts);
        return result;
      },
    });
  }

  render() {
    if (this.props.allPostsQuery && this.props.allPostsQuery.loading) {
      return <p>データを読み込み中</p>;
    }

    if (this.props.allPostsQuery && this.props.allPostsQuery.error) {
      return <p>エラーが発生しました。</p>;
    }

    const allPosts = this.props.allPostsQuery.allPosts;
    if (allPosts.length === 0) {
      return <p>投稿がありません。</p>;
    }

    return (
      <Fragment>
        {allPosts.map(post => <Post key={post.id} post={post} />)}
      </Fragment>
    );
  }
}

export default graphql(ALL_POSTS_QUERY, { name: "allPostsQuery" })(PostList);
