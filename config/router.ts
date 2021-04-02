const routeList = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: '首页',
    icon: 'rive-icon-home',
    component: './home/index.tsx',
    meta: {
      name: 'home',
    },
  },
  {
    path: '/form',
    name: '表单',
    icon: 'rive-icon-form',
    component: './form/index.tsx',
    meta: {
      name: 'form',
    },
  },
  {
    path: '/list',
    name: '列表',
    icon: 'rive-icon-list',
    component: './list/index.tsx',
    meta: {
      name: 'list',
    },
  },
];

export default routeList;
