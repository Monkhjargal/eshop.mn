import React from 'react';
import { List } from '../../components';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
// import { StylesManager } from 'survey-react';
import { styles } from './style.less';

const divStyle = {
  width: '90%',
};

export default () => (
  <PageHeaderLayout title="List information" style={divStyle}>
    <List
      actions={['create', 'update', 'delete']}
      model={'Infolist'}
      name={'Banner'}
    />
  </PageHeaderLayout>
);

// import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { Button, List } from 'antd';

// const mapStateToProps = (state) => {
//   const { attribute } = state;
//   return {
//     attribute,
//   };
// };

// class ProductList extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   componentDidMount() {
//   }
//   render() {
//     return (
//       <div>
//         ProductList
//       </div>
//     );
//   }
// }

// export default connect(mapStateToProps)(ProductList);
