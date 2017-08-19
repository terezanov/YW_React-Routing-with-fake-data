import React, { Component } from 'react';
import { render } from 'react-dom';
import Rx from 'rxjs';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import {Photos} from './pages/photos';
import {Posts} from './pages/posts';
import styled from 'styled-components';

const Menu = styled.ul`
  display: flex;
  font-family: 'Open Sans Condensed', sans-serif;
  margin: 0;
  padding: 0;
  list-style-type: none;
  justify-content: space-between;
  li {
    flex-grow: 1;
    a {
      display: block;
      text-align: center;
      padding: 10px 0;
      font-size: 22px;
      color: #333;
      text-decoration: none;
      :hover {
        background-color: #ececec;
      }
    }
  }
`;

class AjaxRequest extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const root = 'https://jsonplaceholder.typicode.com';
    const {query} = this.props;
    const url = `${root}/${query}`;
    Rx.Observable
      .fromPromise(fetch(url).then(data => data.json()))
      .flatMap(data => Rx.Observable.from(data).take(10))
      .toArray()
      .subscribe(data => this.setState({data}));
  }

  render() {
    return this.props.children(this.state);
  }
}

const Cmp = (query, callback) => <AjaxRequest query={query}>{callback}</AjaxRequest>;

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu>
            <li><Link to="/photos">Photos</Link></li>
            <li><Link to="/posts">Posts</Link></li>
          </Menu>
          <div>
            <Route render={({location: {pathname}}) => {
              switch(pathname) {
                case '/photos':
                    return <AjaxRequest query="photos">
                            {(state) => <Photos photos={state.data}/>}
                          </AjaxRequest>;
                case '/posts':
                    return <AjaxRequest query="posts">
                            {(state) => <Posts posts={state.data}/>}
                          </AjaxRequest>;
              }
                  
            }}/>
          </div>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById('root'));

// <AjaxRequest query="posts">
//               {(state) => <Posts posts={state.data}/>}
//             </AjaxRequest>