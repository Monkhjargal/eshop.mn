import React from 'react';
import { List } from '../../components';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

export default () => (
  <PageHeaderLayout title="Системийн хэрэглэгч">
    <List
      actions={['create', 'update']}
      model={'User'}
      name={'Системийн хэрэглэгч'}
    />
  </PageHeaderLayout>
);
