import { dashboard, bug, clippy, alert, deviceDesktop, tasklist, desktopDownload, info, versions, verified, organization, link } from 'octicons-vue'
export default [
  {
    path: '/',
    redirect: { name: 'overview' }
  },
  {
    path: '/overview',
    name: 'overview',
    component: () => import(/* webpackChunkName: "overview" */ './views/Overview.vue'),
    meta: { title: 'Overview', description: 'overview', icon: dashboard }
  },
  {
    path: '/threat',
    name: 'threat',
    component: () => import(/* webpackChunkName: "threats" */ './views/Threats.vue'),
    meta: { title: 'Threats', description: 'threats', icon: bug }
  },
  {
    path: '/agent',
    name: 'agent',
    component: () => import(/* webpackChunkName: "agents" */ './views/Agents.vue'),
    meta: { title: 'Agents', group: 'agents', description: 'agents', icon: deviceDesktop },
    children: [
      {
        path: ':groupID',
        component: () => import(/* webpackChunkName: "agents" */ './views/Agents.vue'),
        meta: { title: 'Agents', show: false, group: 'agents', description: 'agents', icon: deviceDesktop }
      }
    ]
  },
  {
    path: '/group',
    name: 'group',
    component: () => import(/* webpackChunkName: "config" */ './views/ConfigurationGroup.vue'),
    meta: { title: 'Groups', group: 'agents', icon: versions }
  },
  {
    path: '/license',
    name: 'license',
    component: () => import(/* webpackChunkName: "config" */ './views/ConfigurationLicense.vue'),
    meta: { title: 'Licenses', group: 'agents', icon: verified }
  },
  {
    path: '/policy',
    name: 'policy',
    component: () => import(/* webpackChunkName: "policies" */ './views/Policies.vue'),
    meta: { title: 'Policies', group: 'management', description: 'policies', icon: tasklist }
  },
  {
    path: '/report',
    name: 'report',
    component: () => import(/* webpackChunkName: "report" */ './views/Report.vue'),
    meta: { title: 'Reports', group: 'management', description: 'report', icon: clippy }
  },
  {
    path: '/alert',
    name: 'alert',
    component: () => import(/* webpackChunkName: "authentication" */ './views/Alert.vue'),
    meta: { title: 'Alerts', group: 'management', icon: alert }
  },
  {
    path: '/collector',
    name: 'collector',
    component: () => import(/* webpackChunkName: "authentication" */ './views/Collector.vue'),
    meta: { title: 'Collector', group: 'management', icon: link }
  },
  {
    path: '/info',
    name: 'info',
    component: () => import(/* webpackChunkName: "config" */ './views/ConfigurationInfo.vue'),
    meta: { title: 'Info', group: 'config', icon: info }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "authentication" */ './views/User.vue'),
    meta: { title: 'Users', group: 'config', icon: organization }
  },
  {
    path: '/update',
    name: 'update',
    component: () => import(/* webpackChunkName: "authentication" */ './views/ConfigurationUpdate.vue'),
    meta: { title: 'Offline Update', group: 'config', icon: desktopDownload }
  },
  {
    path: '/download',
    name: 'download',
    component: () => import(/* webpackChunkName: "download" */ './views/Download.vue'),
    meta: {
      show: false,
      bare: true,
      public: true
    }
  }
]
