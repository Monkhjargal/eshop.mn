import React from 'react';
import { List } from '../../components';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

export default () => (
  <PageHeaderLayout title="Уламжлалт судалгааны асуултууд">
    <List
      actions={['create', 'update', 'delete']}
      model={'SurveySelectType'}
      name={'Судалгааны асуулт'}
    />
  </PageHeaderLayout>
);
