import AuthModel from './AuthModel';
import BannerModel from './BannerModel';
import CrudModel from './CrudModel';
import FormModel from './FormModel';
import FilterModel from './FilterModel';
import GlobalModel from './GlobalModel';
import ChartModel from './ChartModel';
import EmployeeOfProfessionModel from './EmployeeOfProfession';
import EmployeeOfAwardModel from './EmployeeOfAward';
import SurveyModel from './SurveyModel';
import GenericModel from './GenericModel';

const SurveySelectType = new CrudModel({
  url: '/api/surveys/schemaSelectTypes',
  model: 'surveySelectType',
});

const SurveyType = new CrudModel({
  url: '/api/surveyTypes',
  model: 'surveyType',
});

const Survey = new SurveyModel({
  url: '/api/surveys',
  model: 'survey',
});

const Generic = new GenericModel({
  model: 'generic',
});

const User = new CrudModel({
  url: '/api/users',
  model: 'user',
});

const Employee = new CrudModel({
  url: '/api/employees',
  model: 'employee',
});

const Report = new CrudModel({
  url: '/api/employees',
  model: 'report',
});

const Company = new CrudModel({
  url: '/api/companies',
  model: 'company',
});
const Award = new CrudModel({
  url: '/api/awards',
  model: 'award',
});
const News = new CrudModel({
  url: '/api/newss',
  model: 'news',
});
const Section = new CrudModel({
  url: '/api/sections',
  model: 'section',
});
const Profession = new CrudModel({
  url: '/api/professions',
  model: 'profession',
});
const Auth = new AuthModel({
  model: 'auth',
});
const EmployeeOfProfession = new EmployeeOfProfessionModel({
  url: '/api/employees',
  model: 'employeeOfProfession',
});
const EmployeeOfAward = new EmployeeOfAwardModel({
  url: '/api/employees',
  model: 'employeeOfAward',
});
const Form = new FormModel({
  url: '/api/core/form',
  model: 'form',
  initialState: {
    forms: {},
    isLoading: false,
    isError: false,
    errorMessage: '',
  },
});

const Filter = new FilterModel({
  url: '/api/core/filter',
  model: 'filter',
  initialState: {
    filters: {},
    isLoading: false,
    isError: false,
    errorMessage: '',
  },
});

const Global = new GlobalModel({
  model: 'global',
});
const ChartModule = new ChartModel({
  model: 'chart',
});


const Banner = new BannerModel({
  url: '/mn/api/banner',
  model: 'banner',
});

// const Award = new CrudModel({
//   url: '/api/awards',
//   model: 'award',
// });

const Category = new CrudModel({
  model: 'category',
});

const Attribute = new CrudModel({
  model: 'attribute',
});

const ProductList = new CrudModel({
  model: 'productList',
});

const Brandlist = new CrudModel({
  url: '/mn/api/brand',
  model: 'brandlist',
});

const Infolist = new CrudModel({
  url: '/mn/api/banner',
  model: 'infolist',
});

const CollectionList = new CrudModel({
  model: 'collectoinlist',
});

const EhowList = new CrudModel({
  model: 'ehowlist',
});

const GeneralInfoList = new CrudModel({
  model: 'generalinfolist',
});

const Widgetslist = new CrudModel({
  url: '/mn/api/widget',
  model: 'widgetslist',
});

const MenuList = new CrudModel({
  model: 'menulist',
});

const Language = new CrudModel({
  model: 'language',
});

const StaticPage = new CrudModel({
  model: 'staticpage',
});


export {
  Auth,
  ChartModule,
  User,
  Employee,
  Filter,
  Form,
  Global,
  Company,
  Section,
  Profession,
  EmployeeOfProfession,
  EmployeeOfAward,
  Award,
  News,
  Survey,
  Generic,
  SurveySelectType,
  SurveyType,
  Report,
  Category,
  Banner,
  Attribute,
  ProductList,
  Brandlist,
  Infolist,
  CollectionList,
  EhowList,
  GeneralInfoList,
  Widgetslist,
  MenuList,
  Language,
  StaticPage,
};
