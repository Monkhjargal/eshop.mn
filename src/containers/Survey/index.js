import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Card, Button, Modal, Form, Input, Select, Icon, message } from 'antd';
import { arrayMove } from 'react-sortable-hoc';

import { Survey as SurveyModel, SurveyType } from '../../models';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Form as FormComponent, Sortable } from '../../components';
import styles from './index.less';

const questionEnum = {
  radio: 'Уламжлалт асуулт',
  input: 'Бичиж хариулах асуулт',
  custom: 'Сонголттой асуулт',
};
class Survey extends Component {
  static propTypes = {
    survey: PropTypes.object,
    getSurvey: PropTypes.func.isRequired,
    updateSurvey: PropTypes.func.isRequired,
    surveySelectTypes: PropTypes.array,
    match: PropTypes.object.isRequired,
  }

  static defaultProps = {
    survey: {},
    surveySelectTypes: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      type: '',
      modal: false,
      mode: 'add',
      validated: false,
      currentItemIndex: null,
      answers: [''],
      validation: {
        question: '',
        answers: [''],
      },
      questions: [],
    };
  }

  async componentDidMount() {
    await this.props.getSurveyType({ _id: this.props.match.params._id });
    await this.props.getSurvey({ _id: this.props.match.params._id });
    // await this.props.getSurveys();

    this.setState({
      questions: this.props.survey.questions,
    });
  }

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  handleInputChange = (value, key) => {
    this.setState({
      [key]: value,
    }, () => {
      if (this.state.validated) {
        this.validateQuestion();
      }
    });
  }

  handleAnswerChange = (value, index) => {
    this.setState({
      answers: [
        ...this.state.answers.slice(0, index),
        value,
        ...this.state.answers.slice(index + 1),
      ],
    }, () => {
      if (this.state.validated) {
        this.validateQuestion();
      }
    });
  }

  handleDelete = (item, index) => {
    let changedState = this.state;

    changedState.questions = [
      ...changedState.questions.slice(0, index),
      ...changedState.questions.slice(index + 1),
    ];

    this.setState({
      ...changedState,
    });
  }

  handleUpdate = (item, index) => {
    this.setState({
      modal: true,
      mode: 'update',
      inputValue: item.name,
      type: item.type,
      answers: item.answers || [''],
      currentItemIndex: index,
    });
  }

  handleSave = async () => {
    try {
      await this.props.updateSurvey({
        body: {
          type: this.props.match.params._id,
          questions: this.state.questions,
        },
      });
      this.setState({
        questions: this.props.survey.questions,
      });

      if (this.props.survey.error) {
        throw new Error(this.props.survey.errorMessage);
      }

      message.success('Судалгааг амжилттай хадгаллаа!');
    } catch (e) {
      message.error('Судалгааг хадгалах амжилтгүй');
    }
  }

  handleAdd = (type) => {
    this.setState({
      modal: true,
      type,
      mode: 'add',
    });
  }

  handleSort = async ({ oldIndex, newIndex }) => {
    let changedState = this.state;

    changedState.questions = arrayMove(this.state.questions, oldIndex, newIndex);
    this.setState(changedState);
  }

  generateComponent = (item, index) => {
    if (item.type === 'input') {
      return this.generateInput(item, index);
    }
    if (item.type === 'custom') {
      return this.generateCustomRadio(item, index);
    }
    return this.generateRadio(item, index);
  }

  generateInput = (item, index) => ({
    properties: {
      type: 'string',
      placeholder: 'Энд бичнэ үү',
      label: `${index}. ${item.name}`,
    },
    uiSchema: {
      'ui:widget': 'textarea',
      'ui:placeholder': 'Энд бичнэ үү',
    },
  })

  generateRadio = (item, index) => ({
    properties: {
      type: 'string',
      label: `${index}. ${item.name}`,
      options: this.props.surveySelectTypes.map(entry => ({
        value: entry.name,
        label: entry.name,
      })),
    },
    uiSchema: {
      'ui:widget': 'radio-group',
    },
  })

  generateCustomRadio = (item, index) => ({
    properties: {
      type: 'string',
      label: `${index}. ${item.name}`,
      options: item.answers.map(entry => ({
        value: entry,
        label: entry,
      })),
    },
    uiSchema: {
      'ui:widget': 'radio-group',
    },
  })

  generateForm = () => {
    if (this.state.questions.length) {
      let defaultValue = {
        schema: {
          title: 'Form',
          type: 'object',
          required: [],
          column: 12,
          properties: {},
        },
        uiSchema: {},
      };

      this.state.questions.forEach((entry, index) => {
        let { properties, uiSchema } = this.generateComponent(entry, index + 1);
        defaultValue.schema.properties[`component-${index}`] = properties;
        defaultValue.uiSchema[`component-${index}`] = uiSchema;
      });

      return defaultValue;
    }

    return false;
  }

  validateQuestion = () => {
    let checker = true;
    let { validation } = this.state;

    if (!this.state.inputValue) {
      validation = {
        ...validation,
        question: 'Асуултаа оруулна уу',
      };
      checker = false;
    } else {
      validation = {
        ...validation,
        question: '',
      };
    }

    if (this.state.type === 'custom') {
      this.state.answers.forEach((entry, index) => {
        if (!entry) {
          validation.answers[index] = 'Сонголтыг оруулна уу';
          checker = false;
        } else {
          validation.answers[index] = '';
        }
      });
    }

    if (checker) {
      this.setState({
        validated: true,
        validation,
      });
      return true;
    }

    this.setState({
      validated: true,
      validation,
    });

    return false;
  }

  createQuestion = () => {
    let validation = this.validateQuestion();

    if (!validation) {
      return;
    }

    let changedState = this.state;

    changedState.questions = [
      ...this.state.questions,
      this.state.type === 'custom' ? {
        type: this.state.type,
        name: this.state.inputValue,
        answers: this.state.answers,
      } : {
        type: this.state.type,
        name: this.state.inputValue,
      },
    ];

    this.setState({
      ...changedState,
      modal: false,
    });
  }

  updateQuestion = () => {
    let validation = this.validateQuestion();

    if (!validation) {
      return;
    }

    let changedState = this.state;
    changedState.questions[this.state.currentItemIndex].name = this.state.inputValue;
    changedState.questions[this.state.currentItemIndex].type = this.state.type;

    if (this.state.type === 'custom') {
      changedState.questions[this.state.currentItemIndex].answers = this.state.answers;
    } else {
      changedState.questions[this.state.currentItemIndex].answers = [];
    }

    this.setState({
      ...changedState,
      modal: false,
    });
  }

  cancelModal = () => {
    this.setState({
      modal: false,
    });
  }

  afterClose = () => {
    this.setState({
      inputValue: '',
      mode: 'add',
      type: 'input',
      currentItemIndex: null,
      answers: [''],
      validation: {
        question: '',
        answers: [''],
      },
    });
  }

  addAnswer = () => {
    this.setState({
      answers: [
        ...this.state.answers,
        '',
      ],
      validation: {
        ...this.state.validation,
        answers: [
          ...this.state.validation.answers,
          '',
        ],
      },
    });
  }

  removeAnswer = (index) => {
    this.setState({
      answers: [
        ...this.state.answers.slice(0, index),
        ...this.state.answers.slice(index + 1),
      ],
      validation: {
        ...this.state.validation,
        answers: [
          ...this.state.validation.answers.slice(0, index),
          ...this.state.validation.answers.slice(index + 1),
        ],
      },
    });
  }

  render() {
    return (
      <PageHeaderLayout
        title="Судалгаа засах"
      >
        <Row gutter={12}>
          <Col span="16">
            <Card>
              {
                this.state.questions.length ?
                  <FormComponent
                    form={this.generateForm(this.state.questions)}
                    previewMode
                    vertical
                    data={{}}
                  /> :
                  <div className={styles.placeholderContainer}>
                    Асуулт байхгүй байна
                  </div>
              }
            </Card>
          </Col>
          <Col span="6">
            <div>
              <div className={styles.title}>
                Асуултын төрөл
              </div>
              <div className={styles.buttonContainer}>
                <Button
                  icon="line-chart"
                  className={styles.toolboxButton}
                  onClick={() => this.handleAdd('radio')}
                >
                  {questionEnum.radio}
                </Button>
                <Button
                  icon="form"
                  className={styles.toolboxButton}
                  onClick={() => this.handleAdd('input')}
                >
                  {questionEnum.input}
                </Button>
                <Button
                  icon="bars"
                  className={styles.toolboxButton}
                  onClick={() => this.handleAdd('custom')}
                >
                  {questionEnum.custom}
                </Button>
              </div>
            </div>

            {/* <Card>
              <pre>{JSON.stringify(this.state, false, 2)}</pre>
            </Card> */}

            {
              this.state.questions.length ?
                <Sortable
                  helperClass={`${styles.helper} ${styles.stylizedHelper}`}
                  items={this.state.questions}
                  onEdit={this.handleUpdate}
                  onDelete={this.handleDelete}
                  onSortEnd={this.handleSort}
                  useDragHandle
                /> :
                null
            }

            <div className={styles.save}>
              <Button
                icon="save"
                type="primary"
                onClick={() => this.handleSave()}
              >
                Судалгааг хадгалах
              </Button>
            </div>

          </Col>
        </Row>
        <Modal
          title={this.state.mode === 'add' ? 'Шинэ асуулт нэмэх' : 'Асуулт засах'}
          visible={this.state.modal}
          onOk={this.state.mode === 'add' ? this.createQuestion : this.updateQuestion}
          onCancel={this.cancelModal}
          afterClose={this.afterClose}
          width={700}
        >
          <div className="ant-form-vertical">
            <Form.Item
              label="Асуултын төрөл"
              help=""
              validateStatus=""
              formLayout="vertical"
              className="ant-form-item-sm"
            >
              <Select
                style={{ width: '100%' }}
                onChange={value => this.handleInputChange(value, 'type')}
                value={this.state.type}
                size="small"
              >
                <Select.Option value="radio">{questionEnum.radio}</Select.Option>
                <Select.Option value="input">{questionEnum.input}</Select.Option>
                <Select.Option value="custom">{questionEnum.custom}</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Асуулт"
              help={this.state.validation.question}
              validateStatus={this.state.validation.question ? 'error' : ''}
              formLayout="vertical"
              className="ant-form-item-sm"
            >
              <Input
                onChange={e => this.handleInputChange(e.target.value, 'inputValue')}
                value={this.state.inputValue}
                placeholder="Асуултаа бичнэ үү"
                type="text"
                size="small"
              />
            </Form.Item>
            {(this.state.type === 'custom') && (
              <Fragment>
                {this.state.answers.map((entry, index) => (
                  <Form.Item
                    label={index === 0 ? 'Сонголтууд' : ''}
                    key={index}
                    help={this.state.validation.answers[index]}
                    validateStatus={this.state.validation.answers[index] ? 'error' : ''}
                    formLayout="vertical"
                    className="ant-form-item-sm"
                    /* style={(index === this.state.answers.length - 1) ? {} : { marginBottom: 0 }} */
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      type="text"
                      size="small"
                      placeholder={`Сонголт ${index + 1}`}
                      value={this.state.answers[index]}
                      onChange={(e) => { this.handleAnswerChange(e.target.value, index); }}
                      style={(this.state.answers.length > 1) ? { marginRight: 8, width: 'calc(100% - 30px)' } : {}}
                    />
                    {this.state.answers.length > 1 ? (
                      <Icon
                        className={styles.minusButton}
                        type="minus-circle-o"
                        disabled={this.state.answers.length === 1}
                        onClick={() => { this.removeAnswer(index); }}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Button
                  type="dashed"
                  size="small"
                  onClick={this.addAnswer}
                  style={{ width: '100%' }}
                >
                  <Icon type="plus" /> Сонголт нэмэх
                </Button>
              </Fragment>
            )
            }
          </div>
        </Modal>
      </PageHeaderLayout>
    );
  }
}

const mapStateToProps = state => ({
  survey: state.survey,
  surveySelectTypes: state.generic.data.survey_select_types,
});

const mapDispatchToProps = {
  getSurvey: SurveyModel.getSchema,
  updateSurvey: SurveyModel.updateSchema,
  getSurveyType: SurveyType.get,
};

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
