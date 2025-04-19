export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: '主页',
      meta: {
        icon: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'prediction',
      displayName: '预测',
      meta: {
        icon: 'credit_card',
      },
    },
    /* {
      name: 'auth',
      displayName: '账户',
      meta: {
        icon: 'login',
      },
      children: [
        {
          name: 'login',
          displayName: '登录',
        },
        {
          name: 'signup',
          displayName: '注册',
        },
        {
          name: 'recover-password',
          displayName: '修改密码',
        },
      ],
    },
*/
    {
      name: 'faq',
      displayName: '指南',
      meta: {
        icon: 'quiz',
      },
    },
  ] as INavigationRoute[],
}
