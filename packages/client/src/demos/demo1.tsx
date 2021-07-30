import { useRequest } from 'ahooks';
import { Spin } from 'antd';
import React, { useMemo } from 'react';
import {
  MemoryRouter as Router,
} from 'react-router-dom';
import {
  createRouteSwitch,
  RouteRedirectProps,
  AdminLayout,
  AuthLayout,
  RouteSchemaRenderer,
} from '../';
import { UseRequestProvider } from 'ahooks';
import { extend } from 'umi-request';

const request = extend({
  prefix: process.env.API_URL,
  timeout: 1000,
});

console.log('process.env.API_URL', process.env.API_URL);

// console.log = () => {}

const RouteSwitch = createRouteSwitch({
  components: {
    AdminLayout,
    AuthLayout,
    RouteSchemaRenderer,
  },
});

const App = () => {
  const { data, loading } = useRequest('routes:getAccessible', {
    formatResult: (result) => result?.data,
  });

  if (loading) {
    return <Spin/>
  }

  return (
    <div>
      <Router initialEntries={['/admin']}>
        <RouteSwitch routes={data} />
      </Router>
    </div>
  );
};

export default () => {
  return (
    <UseRequestProvider
      value={{
        requestMethod: (service) => request(service),
      }}
    >
      <App />
    </UseRequestProvider>
  );
}