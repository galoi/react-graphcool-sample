import React, { Component, Fragment } from "react";

import PostList from "./PostList";
import PostForm from "./PostForm";

class App extends Component {
  render() {
    return (
      <Fragment>
        <section>
          <h2>投稿一覧</h2>
          <PostList />
        </section>
        <section>
          <h2>新規投稿</h2>
          <PostForm />
        </section>
      </Fragment>
    );
  }
}

export default App;
