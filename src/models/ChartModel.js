import BaseModel from './BaseModel';
import { asyncFn } from './utils';

class ChartModel extends BaseModel {
  constructor(data = {}) {
    super(data);
    this.surverResultModel = {
      request: this.buildActionName('request', 'profession'),
      response: this.buildActionName('response', 'profession'),
      error: this.buildActionName('error', 'profession'),
    };
    this.professionModel = {
      request: this.buildActionName('request', 'profession'),
      response: this.buildActionName('response', 'profession'),
      error: this.buildActionName('error', 'profession'),
    };
    this.sectionModel = {
      request: this.buildActionName('request', 'section'),
      response: this.buildActionName('response', 'section'),
      error: this.buildActionName('error', 'section'),
    };
    this.awardModel = {
      request: this.buildActionName('request', 'award'),
      response: this.buildActionName('response', 'award'),
      error: this.buildActionName('error', 'award'),
    };
    this.genderModel = {
      request: this.buildActionName('request', 'gender'),
      response: this.buildActionName('response', 'gender'),
      error: this.buildActionName('error', 'gender'),
    };
    this.apartmentModel = {
      request: this.buildActionName('request', 'apartment'),
      response: this.buildActionName('response', 'apartment'),
      error: this.buildActionName('error', 'apartment'),
    };
    this.workdateModel = {
      request: this.buildActionName('request', 'workdate'),
      response: this.buildActionName('response', 'workdate'),
      error: this.buildActionName('error', 'workdate'),
    };
    this.companyModel = {
      request: this.buildActionName('request', 'company'),
      response: this.buildActionName('response', 'company'),
      error: this.buildActionName('error', 'company'),
    };
    this.initialState = {
      awards: [],
      professions: [],
      sections: [],
      genders: [],
      apartments: [],
      workdates: [],
      companys: [],
      surveyResult: [],
      isLoading: false,
      isLogged: false,
      error: false,
      errorMessage: '',
      modules: [],
    };
  }
  surveyResult = surveySchemaId => asyncFn({
    url: '/api/surveys/result',
    method: 'POST',
    model: this.surverResultModel,
    body: { surveySchemaId },

  })

  professions = () => asyncFn({
    url: '/api/charts/profession', method: 'GET', model: this.professionModel,
  })

  sections = () => asyncFn({
    url: '/api/charts/section', method: 'GET', model: this.sectionModel,
  })

  awards = () => asyncFn({
    url: '/api/charts/award', method: 'GET', model: this.awardModel,
  })
  genders = () => asyncFn({
    url: '/api/charts/gender', method: 'GET', model: this.genderModel,
  })
  apartments = () => asyncFn({
    url: '/api/charts/apartment', method: 'GET', model: this.apartmentModel,
  })
  workdates = () => asyncFn({
    url: '/api/charts/workdate', method: 'GET', model: this.workdateModel,
  })
  companys = () => asyncFn({
    url: '/api/charts/company', method: 'GET', model: this.companyModel,
  })

  reducer = (state = this.initialState, action) => {
    // console.log('action', action);
    switch (action.type) {
      case this.surverResultModel.request:
        return {
          ...state,
          isLoading: true,
          error: false,
          errorMessage: '',
        };
      case this.surverResultModel.error:
        return {
          ...state,
          isLoading: false,
          error: true,
          errorMessage: action.message,
        };
      case this.surverResultModel.response:
        return {
          ...state,
          isLoading: false,
          isLogged: true,
          surveyResult: action.payload,
        };

      case this.professionModel.request:
        return {
          ...state,
          isLoading: true,
          error: false,
          errorMessage: '',
        };
      case this.professionModel.error:
        return {
          ...state,
          isLoading: false,
          error: true,
          errorMessage: action.message,
        };
      case this.professionModel.response:
        return {
          ...state,
          isLoading: false,
          isLogged: true,
          professions: action.payload,
        };
      case this.sectionModel.request:
        return {
          ...state,
          isLoading: true,
          error: false,
          errorMessage: '',
        };
      case this.sectionModel.error:
        return {
          ...state,
          isLoading: false,
          error: true,
          errorMessage: action.message,
        };
      case this.sectionModel.response:
        return {
          ...state,
          isLoading: false,
          isLogged: true,
          sections: action.payload,
        };
      case this.awardModel.request:
        return {
          ...state,
          isLoading: true,
          error: false,
          errorMessage: '',
        };
      case this.awardModel.error:
        return {
          ...state,
          isLoading: false,
          error: true,
          errorMessage: action.message,
        };
      case this.awardModel.response:
        return {
          ...state,
          isLoading: false,
          error: false,
          awards: action.payload,
        };
      case this.genderModel.request:
        return {
          ...state,
          isLoading: true,
          error: false,
          errorMessage: '',
        };
      case this.genderModel.error:
        return {
          ...state,
          isLoading: false,
          error: true,
          errorMessage: action.message,
        };
      case this.genderModel.response:
        return {
          ...state,
          isLoading: false,
          error: false,
          genders: action.payload,
        };
      case this.apartmentModel.request:
        return {
          ...state,
          isLoading: true,
          error: false,
          errorMessage: '',
        };
      case this.apartmentModel.error:
        return {
          ...state,
          isLoading: false,
          error: true,
          errorMessage: action.message,
        };
      case this.apartmentModel.response:
        return {
          ...state,
          isLoading: false,
          error: false,
          apartments: action.payload,
        };
      case this.workdateModel.request:
        return {
          ...state,
          isLoading: true,
          error: false,
          errorMessage: '',
        };
      case this.workdateModel.error:
        return {
          ...state,
          isLoading: false,
          error: true,
          errorMessage: action.message,
        };
      case this.workdateModel.response:
        return {
          ...state,
          isLoading: false,
          error: false,
          workdates: action.payload,
        };
      case this.companyModel.request:
        return {
          ...state,
          isLoading: true,
          error: false,
          errorMessage: '',
        };
      case this.companyModel.error:
        return {
          ...state,
          isLoading: false,
          error: true,
          errorMessage: action.message,
        };
      case this.companyModel.response:
        return {
          ...state,
          isLoading: false,
          error: false,
          companys: action.payload,
        };
      default:
        return state;
    }
  }
}

export default ChartModel;
