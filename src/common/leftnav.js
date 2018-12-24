// nav data
import {
  UserList,
  EmployeeList,
  CompanyList,
  SectionList,
  ProfessionList,
  AwardList,
  NewsList,
  PushNoti,
  Survey,
  SurveyType,
  SurveySelectType,
  SideNav,
  BannerList,
} from "../containers";

export const getNavData = [
  {
    name: 'Dashboard',
    icon: 'team',
    path: 'dashboard',
  },
  {
    name: 'Banner',
    icon: 'team',
    path: 'banner',
    component: BannerList,
  },
  {
    name: 'Ажилтан',
    icon: 'team',
    path: 'employee',
    component: EmployeeList,
  },
  {
    name: 'Аж ахуй нэгж',
    icon: 'bank',
    path: 'company',
    children: [
      {
        name: 'Аж ахуй нэгж бүртгэл',
        path: 'company-list',
        component: CompanyList,
      },
      {
        name: 'Хэсэг тасаг бүртгэл',
        path: 'section-list',
        component: SectionList,
      },
      {
        name: 'Мэргэжил бүртгэл',
        path: 'profession-list',
        component: ProfessionList,
      },
    ],
  },
  {
    name: 'Судалгаа',
    icon: 'book',
    path: 'survey',
    children: [
      {
        name: 'Асуулт засах',
        path: 'answer',
        component: SurveySelectType,
      },
      {
        name: 'Судалгааны төрлүүд',
        path: 'type',
        component: SurveyType,
      },
    ],
  },
  {
    name: 'Тохиргоо',
    icon: 'setting',
    path: 'settings',
    children: [
      {
        name: 'Системийн хэрэглэгч',
        path: 'system-users',
        component: UserList,
      },
    ],
  },
];

