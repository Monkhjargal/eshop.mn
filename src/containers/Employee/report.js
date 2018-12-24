import React from 'react';
import { List } from '../../components';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

export default props => (
  <PageHeaderLayout title="Ажилтны тайлан бүртгэл">
    <List
      actions={['create', 'update', 'delete']}
      model={'Report'}
      name={'Report'}
      url={`/api/employees/${props.match.params._id}/report`}
    />
  </PageHeaderLayout>
);
