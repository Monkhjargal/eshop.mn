import BaseModel from './BaseModel';
import { asyncFn } from './utils';

class SurveyModel extends BaseModel {
  initialState = {
    error: false,
    errorMessage: '',
    isLoading: false,
    questions: [],
  }

  constructor(data = {}) {
    super(data);
    this.getSchemaModel = {
      request: this.buildActionName('request', 'survey', 'schema', 'get'),
      response: this.buildActionName('response', 'survey', 'schema', 'get'),
      error: this.buildActionName('error', 'survey', 'schema', 'get'),
    };

    this.updateSchemaModel = {
      request: this.buildActionName('request', 'survey', 'schema', 'update'),
      response: this.buildActionName('response', 'survey', 'schema', 'update'),
      error: this.buildActionName('error', 'survey', 'schema', 'update'),
    };
  }

  getSchema = ({ _id }) => asyncFn({
    url: `${this.url}/schema/${_id}`, method: 'GET', model: this.getSchemaModel,
  })

  updateSchema = ({ body }) => asyncFn({
    body, url: `${this.url}/schema`, method: 'POST', model: this.updateSchemaModel,
  })

  reducer = (state = this.initialState, action) => {
    switch (action.type) {
      case this.getSchemaModel.request: {
        return {
          ...state,
          ...this.requestCase(state, action),
        };
      }
      case this.getSchemaModel.error: {
        return {
          ...state,
          ...this.errorCase(state, action),
        };
      }
      case this.getSchemaModel.response: {
        console.log('######', action.payload);
        return {
          ...state,
          isLoading: false,
          questions: action.payload.questions || [],
        };
      }
      case this.updateSchemaModel.request: {
        return {
          ...state,
          ...this.requestCase(state, action),
        };
      }
      case this.updateSchemaModel.error: {
        return {
          ...state,
          ...this.errorCase(state, action),
        };
      }
      case this.updateSchemaModel.response: {
        return {
          ...state,
          isLoading: false,
          questions: action.payload.questions || [],
        };
      }
      default:
        return state;
    }
  }
}

export default SurveyModel;
