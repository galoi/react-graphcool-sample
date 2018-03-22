import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      title: "",
      isSending: false
    };
  }

  createPost = async e => {
    e.preventDefault();
    this.setState({ isSending: true });
    const { title, content } = this.state;
    try {
      await this.props.createPostMutation({
        variables: {
          title,
          content
        }
      });
      this.setState({
        content: "",
        title: "",
        isSending: false
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <form>
        <div>
          <input
            id="title"
            type="text"
            value={this.state.title}
            placeholder="タイトルを入力"
            onChange={e => this.setState({ title: e.target.value })}
            style={{ width: "500px" }}
          />
        </div>
        <div>
          <textarea
            id="content"
            value={this.state.content}
            placeholder="内容を入力"
            onChange={e => this.setState({ content: e.target.value })}
            style={{ width: "500px", height: "100px", marginTop: "10px" }}
          />
        </div>
        {this.state.isSending ? (
          "送信中"
        ) : (
          <button onClick={e => this.createPost(e)}>投稿する</button>
        )}
      </form>
    );
  }
}

const CREATE_POST_MUTATION = gql`
  mutation createPostMutation($title: String!, $content: String) {
    createPost(title: $title, content: $content) {
      id
    }
  }
`;

export default graphql(CREATE_POST_MUTATION, {
  name: "createPostMutation"
})(PostForm);
