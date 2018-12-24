import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  Menu,
  Icon,
  Button,
} from 'antd';
import { Global } from "../../models";
import styles from './index.less';

const { SubMenu } = Menu;

const mapStateToProps = (state) => {
  const { global: { collapsed } } = state;
  return {
    collapsed,
  };
};

class SideNav extends PureComponent {
  state = {
    collapsed: false,
    theme: 'light',
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  static defaultProps = {
  };
  static propTypes = {
    location: PropTypes.object.isRequired,
    menus: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.menus = props.menus;
  }

  getDefaultCollapsedSubMenus(props) {
  }

  getCurrentMenuSelectedKeys(props) {
  }

  getNavMenuItems(menusData, parentPath = '') {
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button> */}
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme={this.state.theme}
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1">
            <Icon type="bank" />
            <span>Dashboard</span>
          </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Products</span></span>}>
            <Menu.Item key="5">Category</Menu.Item>
            <Menu.Item key="6">Attribute</Menu.Item>
            <Menu.Item key="7">List</Menu.Item>
            <Menu.Item key="13">Brands</Menu.Item>
            <Menu.Item key="14">Info</Menu.Item>
            <Menu.Item key="15">Collection</Menu.Item>
            <Menu.Item key="16">Meal recipe</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="setting" /><span>Settings</span></span>}>
            <Menu.Item key="9">General info</Menu.Item>
            <Menu.Item key="10">Widgets</Menu.Item>
            <Menu.Item key="17">Menus</Menu.Item>
            <Menu.Item key="18">Languages</Menu.Item>
            <Menu.Item key="19">Banners</Menu.Item>
            <Menu.Item key="20">Static pages</Menu.Item>
          </SubMenu>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="inbox" />
            <span>Option 3</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, { onCollapse: Global.onCollapse })(SideNav));
