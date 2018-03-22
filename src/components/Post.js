import React, { Component } from "react";
import PropTypes from "prop-types";

class Post extends Component {
  render() {
    return (
      <dl>
        <dt>{this.props.post.title}</dt>
        <dd>{this.props.post.content}</dd>
      </dl>
    );
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string
  })
};

export default Post;
