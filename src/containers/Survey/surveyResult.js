// @flow
/* eslint prefer-destructuring: 0 */
import { Chart, Axis, Tooltip, Geom, Coord, Legend, Label } from "bizcharts";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DataSet } from '@antv/data-set';
import { Tabs, Card, Button, Modal } from 'antd';
import { connect } from 'react-redux';
import { StandardTable } from '../../components';
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import { ChartModule, SurveyType } from "../../models";
import styles from './styles.less';

const mapStateToProps = state => ({
  surveyType: state.surveyType,
  surveyResultArray: state.chart.surveyResult,
  chart: state.chart,
});

const { TabPane } = Tabs;

class SurveyResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: undefined,
      visible: false,
    };
  }

  async componentDidMount() {
    this.props.surveyResult(this.props.match.params._id);
  }

  columns = [
    {
      title: '#',
      key: '_id',
      render: (text, record, index) => (index),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ]

  handleOnSelect = (selectedId) => {
    this.setState({
      selectedId,
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  handleOk = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    if (this.props.surveyResultArray) {
      let current = this.props.surveyResultArray.find(e => (e._id === this.state.selectedId));
      if (this.props.surveyResultArray.length && !current) {
        current = this.props.surveyResultArray[0];
      }

      if (!this.props.surveyResultArray.length && !current) {
        current = {
          values: [],
        };
      }

      const { DataView } = DataSet;
      const data = new DataView();
      data
        .source(current.values || [])
        .transform({
          type: 'percent',
          field: 'count',
          dimension: 'name',
          as: 'percent',
        });

      const cols = {
        percent: {
          formatter: (val) => {
            val = `${(val * 100).toFixed(2)}%`;
            return val;
          },
        },
      };


      return (
        <PageHeaderLayout title="Судалгааны асуултууд">
          <Card bordered={false}>
            <div className={styles.tableList}>
              <div className={styles.tableListOperator}>
                <Button
                  onClick={this.showModal}
                  size="small"
                  icon="chart"
                  type="primary"
                >
                  Асуултын үр дүнг харах
                </Button>
              </div>

              <StandardTable
                bordered
                onSelect={this.handleOnSelect}
                onChange={this.handleTableChange}
                columns={this.columns}
                data={this.props.surveyResultArray}
                loading={this.props.chart.isLoading}
              />
            </div>
          </Card>
          <Modal
            title="Үр дүн"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={1200}
          >
            <Chart height={window.innerHeight} data={data} scale={cols} padding={[80, 100, 80, 80]} forceFit>
              <Coord type="theta" radius={0.75} />
              <Axis name="percent" />
              <Legend position="right" offsetY={(-window.innerHeight / 2) + 120} offsetX={-100} />
              <Tooltip
                showTitle={false}
                itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
              />
              <Geom
                type="intervalStack"
                position="percent"
                color="name"
                tooltip={['name*percent', (name, percent) => {
                    percent = `${(percent * 100).toFixed(2)}%`;
                    return {
                      name,
                      value: percent,
                    };
                  }]}
                style={{ lineWidth: 1, stroke: '#fff' }}
              >
                <Label
                  content="percent"
                  formatter={(val, name) => `${name.point.name}: ${val}`}
                />
              </Geom>
            </Chart>
          </Modal>
        </PageHeaderLayout>
      );
    }
    return (
      <div>Loading ...</div>
    );
  }
}

SurveyResult.defaultProps = {
  professionsArray: [],
};

SurveyResult.propTypes = {
  professionsArray: PropTypes.array,
};
export default connect(mapStateToProps, {
  surveyResult: ChartModule.surveyResult,
  getSurveyType: SurveyType.get,
})(SurveyResult);

