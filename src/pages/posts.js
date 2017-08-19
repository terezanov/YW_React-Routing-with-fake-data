import React, { Component } from 'react';
import styled from 'styled-components';

const PostsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: 'Open Sans Condensed', sans-serif;
`;

const Title = styled.h2`
  padding: 3px 8px;
  font-size: 18px;
  line-height: 1;
  :first-letter {
    text-transform: uppercase;
  }
`;

function Post({title, body}) {
  return (
    <div>
      <Title>{title}</Title>
      <div>{body}</div>
    </div>
  );
}

export class Posts extends Component {
  render() {
    const posts = this.props.posts.map(item => <Post {...item} key={item.id}/>);
    return <PostsWrap>{posts}</PostsWrap>;
  }
}