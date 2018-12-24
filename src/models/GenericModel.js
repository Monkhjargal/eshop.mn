import BaseModel from './BaseModel';
import { asyncFn } from './utils';

class GenericModel extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.genericModel = {
      request: this.buildActionName('request', 'get', 'generic'),
      response: this.buildActionName('response', 'get', 'generic'),
      error: this.buildActionName('error', 'get', 'generic'),
    };

    this.initialState = {
      data: undefined,
      isLoading: false,
      university: undefined,
      error: false,
      errorMessage: '',
      department: undefined,
      profession: undefined,
      degree: undefined,
      class_type: undefined,
    };
  }

  get = () => asyncFn({
    url: '/api/core/generic', method: 'GET', model: this.genericModel,
  })

  reducer = (state = this.initialState, action) => {
    switch (action.type) {
      case 'PROFESSION_CHANGE': {
        if (action.payload.university) {
          action.payload.department = undefined;
          action.payload.profession = undefined;
        }

        if (action.payload.department) {
          action.payload.profession = undefined;
        }

        return {
          ...state,
          ...action.payload,
        };
      }
      case this.genericModel.request:
        return {
          ...state,
          isLoading: true,
          error: false,
          errorMessage: '',
        };
      case this.genericModel.error:
        return {
          ...state,
          isLoading: false,
          error: true,
          errorMessage: action.message,
        };
      case this.genericModel.response:
        return {
          ...state,
          isLoading: false,
          isLogged: true,
          data: {
            ...action.payload,
          },
        };
      default:
        return state;
    }
  }
}

export default GenericModel;
