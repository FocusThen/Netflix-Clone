import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { Home, Signin, Signup, Browse } from './pages';
import { useAuthListener } from './hooks';
import { IsUserRedirect, ProtectedRoute } from './helpers/routes';
import { UserContext } from './context/user';

export function App() {
  const { user } = useAuthListener();
  return (
    <Router>
      <Switch>
        <IsUserRedirect
          user={user}
          path={ROUTES.SIGN_IN}
          loggedInPath={ROUTES.BROWSE}
        >
          <Signin />
        </IsUserRedirect>
        <IsUserRedirect
          user={user}
          path={ROUTES.SIGN_UP}
          loggedInPath={ROUTES.BROWSE}
        >
          <Signup />
        </IsUserRedirect>
        <ProtectedRoute user={user} path={ROUTES.BROWSE}>
          <UserContext.Provider value={user}>
            <Browse />
          </UserContext.Provider>
        </ProtectedRoute>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.BROWSE}
          path={ROUTES.HOME}
        >
          <Home />
        </IsUserRedirect>
      </Switch>
    </Router>
  );
}
