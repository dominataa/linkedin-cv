"use strict";
/**
 * Author: Dom Armstrong, Date: 22/05/15
 */

import React from 'react';
import classNames from 'classnames';

export class FileTree extends React.Component {
  render () {
    return (
        <div className="file-tree">
          <ul className="wrapper">
            <Folder name="Root" content={ this.props.data } urlPrefix={ this.props.urlPrefix } />
          </ul>
        </div>
    )
  }
}
FileTree.propTypes = {
  data: React.PropTypes.object.isRequired,
  urlPrefix: React.PropTypes.string,
};

class Folder extends React.Component {
  render () {
    let { name, content, urlPrefix } = this.props;

    let items = Object.keys(content).map(key => {
      return { name: key, value: content[key] };
    }).sort((a, b) => {
      // Show folders before files
      if (typeof a.value === 'object') return -1;
      if (typeof b.value === 'object') return 1;
      return a.name > b.name ? 1 : -1
    }).map(item => {
      if (typeof item.value === 'string') {
        return <File name={ item.name } value={ item.value } urlPrefix={ urlPrefix } />;
      }
      return <Folder name={ item.name } content={ item.value } urlPrefix={ urlPrefix } />;
    });

    return (
      <li className="folder">
        <i className="icon-folder" />{ name }
        <ul>
          { items }
        </ul>
      </li>
    );
  }
}
Folder.propTypes = {
  name: React.PropTypes.string.isRequired,
  content: React.PropTypes.object.isRequired,
  urlPrefix: React.PropTypes.string,
};

class File extends React.Component {
  render () {
    let href = this.props.urlPrefix + '/' + this.props.value;

    return (
      <li className="file">
        <a href={ href }>
          <i className="icon-file" />{ this.props.name }
        </a>
      </li>
    );
  }
}
File.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  urlPrefix: React.PropTypes.string,
};