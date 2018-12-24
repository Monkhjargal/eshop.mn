import React from 'react';
import { Button, Modal } from 'antd';
import { List, ListComponent } from '../../components';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

class CustomList extends ListComponent {
  constructor(props) {
    super(props);
    this.customAddons = [this.CustomButton, this.CustomButton1];
  }

  assignSurvey = () => {
    this.props.history.push(`/survey/edit/${this.state.selectedId}`);
  }

  seeResult = () => {
    this.props.history.push(`/survey/result/${this.state.selectedId}`);
  }

  CustomButton = () => (
    <Button
      onClick={() => this.assignSurvey()}
      size="small"
      icon="edit"
      key="teacherStatus"
      type="default"
      disabled={!this.state.selectedId}
    >
      Судалгааны асуултуудыг засах
    </Button>
  )

  CustomButton1 = () => (
    <Button
      onClick={() => this.seeResult()}
      size="small"
      icon="edit"
      key="result"
      type="default"
      disabled={!this.state.selectedId}
    >
      Үр дүн харах
    </Button>
  )
}

const myFn = props => <CustomList {...props} />;

export default props => (
  <PageHeaderLayout title="Судалгааны төрөл">
    <List
      actions={['create', 'update', 'delete']}
      model={'SurveyType'}
      name={'Судалгааны төрөл'}
      list={myFn}
      {...props}
    />
  </PageHeaderLayout>
);

// import React from 'react';
// import { List } from '../../components';
// import PageHeaderLayout from '../../layouts/PageHeaderLayout';

// export default () => (
//   <PageHeaderLayout title="Судалгааны төрөлүүд">
//     <List
//       actions={['create', 'update', 'delete']}
//       model={'SurveyType'}
//       name={'Судалгааны төрөлүүд'}
//     />
//   </PageHeaderLayout>
// );
