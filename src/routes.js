import React, { Suspense, Fragment, lazy } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
/* import DashboardLayout from './pages/dashbord';
import LoadingScreen from './component/SplashScreen';
import AuthGuard from './components/AuthGuard';
import GuestGuard from './components/GuestGuard';
import SwitchGuard from './components/SwitchGuard'; */

export const renderRoutes = (routes = []) => (
  <Suspense
    fallback={
      {
        /* <LoadingScreen /> */
      }
    }
  >
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: "/404",
    component: () => <Redirect to="/" />,
  },
  /*   {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('./pages/Auth/LoginView')),
  },
  {
    exact: true,
    guard: SwitchGuard,
    path: '/switch',
    component: lazy(() => import('./pages/Auth/Switch')),
  }, */
  {
    path: "/",
    /*    guard: AuthGuard,
    layout: DashboardLayout, */
    routes: [
      {
        exact: true,
        path: "/",
        component: lazy(() => import("./pages/dashbord")),
      },
      {
        exact: true,
        path: "/magazine",
        component: lazy(() => import("./pages/usersPage")),
      },
      /*  {
        exact: true,
        path: '/counter',
        component: lazy(() => import('./pages/Counter')),
      },
      {
        path: '*',
        component: lazy(() => import('./pages/Auth/NotFound')),
      },
     {
        exact: true,
        path: '/old-class',
        component: lazy(() => import('./pages/OldCounter')),
      },*/
    ],
  },
];

export default routes;
