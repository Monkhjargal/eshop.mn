import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Select, Card, Button, Row, Col } from 'antd';
import { News, Company } from '../../models';

import PageHeaderLayout from "../../layouts/PageHeaderLayout";

const { Option } = Select;

class Firebase extends Component {
  static propTypes = {
    getNews: PropTypes.func.isRequired,
    getCompany: PropTypes.func.isRequired,
    news: PropTypes.object,
    company: PropTypes.object,
  }

  static defaultProps = {
    news: {},
    company: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      company: null,
      news: null,
    };
  }

  async componentDidMount() {
    this.props.getNews();
    this.props.getCompany();
  }

  handleClick = () => {
    if (this.state.news && this.state.company) {
      const data = {
        title: this.state.news.name,
        content_id: this.state.news.content_id,
        company: this.state.company,
      };
      // http://43.231.115.106:3001/api/employees/sendPush
      fetch('http://43.231.115.106:3001/api/employees/sendPush', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    }
  }

  render() {
    return (
      <PageHeaderLayout title="Мэдээ илгээх">
        <Card bordered={false}>
          <Row gutter={8}>
            <Col span={8}>
              <Select onSelect={(value) => { this.setState({ news: value }); }} style={{ width: 300 }} placeholder="Мэдээ">
                {
                  this.props.news.data.map(entry => (
                    <Option key={entry._id} value={entry}>{entry.name}</Option>
                  ))
                }
              </Select>
            </Col>
            <Col span={8}>
              <Select onSelect={(value) => { this.setState({ company: value }); }} style={{ width: 300 }} placeholder="Хороо сонгох">
                {
                  [{ _id: '0', name: 'Бүгд' }, ...this.props.company.data].map(entry => (
                    <Option key={entry._id} value={entry._id}>{entry.name}</Option>
                  ))
                }
              </Select>
            </Col>
            <Col span={8}>
              <Button disabled={!this.state.news} onClick={this.handleClick}>Илгээх</Button>
            </Col>
          </Row>
        </Card>
      </PageHeaderLayout >
    );
  }
}


const mapStateToProps = (state => ({
  news: state.news.all,
  company: state.company.all,
}));

const mapDispatchToProps = {
  getNews: News.all,
  getCompany: Company.all,
};

export default connect(mapStateToProps, mapDispatchToProps)(Firebase);
