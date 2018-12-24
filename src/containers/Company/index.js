import React from 'react';
import { List } from '../../components';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

export default () => (
  <PageHeaderLayout title="Аж ахуй нэгж бүртгэл">

    <List
      actions={['create', 'update', 'delete']}
      model={'Company'}
      name={'Аж ахуй нэгж'}
    />

  </PageHeaderLayout>
);