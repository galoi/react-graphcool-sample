import React, { Component, Fragment } from "react";
import Post from "./Post";

import gql from "graphql-tag";
import { graphql } from "react-apollo";

const ALL_POSTS_QUERY = gql`
  query {
    allPosts {
      id
      title
      content
    }
  }
`;

class PostList extends Component {
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
