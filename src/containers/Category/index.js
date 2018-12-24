import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, List } from 'antd';
import { Category } from '../../models';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

const mapStateToProps = (state) => {
  const { category } = state;
  return {
    category,
  };
};

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        Category
      </div>
    );
  }
}

export default connect(mapStateToProps)(CategoryList);
