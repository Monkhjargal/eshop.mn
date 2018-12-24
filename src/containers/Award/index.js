import React from 'react';
import { List } from '../../components';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

export default () => (
  <PageHeaderLayout title="Зэрэг бүртгэл">

    <List
      actions={['create', 'update', 'delete']}
      model={'Award'}
      name={'Зэрэг'}
    />

  </PageHeaderLayout>
);
