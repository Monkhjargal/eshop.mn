import React from 'react';
import { List } from '../../components';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

export default () => (
  <PageHeaderLayout title="Мэдээ">

    <List
      actions={['create', 'update', 'delete']}
      model={'News'}
      name={'Мэдээ'}
    />

  </PageHeaderLayout>
);
