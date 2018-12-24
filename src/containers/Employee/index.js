import React from 'react';
import { Button, Modal } from 'antd';
import { List, ListComponent } from '../../components';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";

class CustomList extends ListComponent {
  constructor(props) {
    super(props);
    // this.customAddons = [this.CustomButton];
  }

  seeReport = () => {
    this.props.history.push(`/employee/${this.state.selectedId}/report`);
  }

  CustomButton = () => (
    <Button
      onClick={() => this.seeReport()}
      size="small"
      icon="edit"
      key="employeeReport"
      type="default"
      disabled={!this.state.selectedId}
    >
      Тайлан харах
    </Button>
  )
}

const myFn = props => <CustomList {...props} />;

export default props => (
  <PageHeaderLayout title="Ажилтан бүртгэл">
    <div>
      asd
    </div>
  </PageHeaderLayout>
);
