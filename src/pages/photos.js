import React, { Component } from 'react';
import Rx from 'rxjs';
import styled from 'styled-components';

const PhotosWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: 'Open Sans Condensed', sans-serif;
`;

const StyledPhoto = styled.div`
  flex-basis: 25%;
  padding: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const Img = styled.img`
  width: 100%;
  height: 120px;
`;

const Title = styled.div`
  padding: 3px 8px;
  font-size: 14px;
  line-height: 1;
  :first-letter {
    text-transform: uppercase;
  }
`;

class Photo extends Component {
  constructor() {
    super();
    this.state = {
      random: this.random()
    };
  }

  random() {
    return Math.floor(Math.random() * 10);
  }

  render() {
    const {title} = this.props;
    return (
      <StyledPhoto>
        <Img innerRef={img => this.img = img} src={`https://unsplash.it/200/300?random&_t=${this.state.random}`}/>
        <Title>{title}</Title>
      </StyledPhoto>
    );
  }
}

export class Photos extends Component {
  render() {
    const photos = this.props.photos.map(item => <Photo {...item} key={item.id}/>);
    return <PhotosWrap>{photos}</PhotosWrap>;
  }
}