// Либо использовать @loadable/component, в рамках туториала - некритично
import { Route, Switch, Redirect, RouteProps } from "react-router-dom";

import { modelAuthCheck } from "processes/auth";
import { GetParameterPopups } from "widgets/popups/lib";
import { usePrepareLink } from "shared/hooks";

import ActivationPage from "./activation";
import DevicesPage from "./devices";
import HomePage from "./home";
import IncidentsPage from "./incidents";
import ProfilePage from "./profile";
import SettingsPage from "./settings";
import SystemPage from "./system";
import TasksPage from "./tasks";
import AuthPage from "./auth";
import { Loader } from "shared/components";
import { APP_MODE } from "shared/config";

type Props = RouteProps & {
  component: any;
};

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const status = modelAuthCheck.selectors.useStatus();
  const isAuthorized = status === "cubic-auth";
  const isWizard = status === "wizard";
  const url = status === "cubic-is-not-auth" ? "/auth" : "/activation";
  const link = usePrepareLink({ to: url, isRelativePath: true });

  if (!status) return <Loader />;

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!isAuthorized) {
          if (isWizard) {
            if (location.pathname === "/activation") {
              return <Component />;
            } else
              return <Redirect to={{ ...link, state: { from: location } }} />;
          }
          if (location.pathname === "/auth") {
            return <Component />;
          } else
            return <Redirect to={{ ...link, state: { from: location } }} />;
        } else {
          if (
            location.pathname === "/auth" ||
            location.pathname === "/activation"
          ) {
            return (
              <Redirect to={{ pathname: "/home", state: { from: location } }} />
            );
          } else return <Component />;
        }
      }}
    />
  );
};

export const Routing = () => {
  const isServer = APP_MODE !== "CUBIC";
  const status = modelAuthCheck.selectors.useStatus();
  const isAuthorized = status === "cubic-auth";

  return (
    <>
      <Switch>
        <PrivateRoute exact path="/devices" component={DevicesPage} />
        {!isServer && <PrivateRoute exact path="/home" component={HomePage} />}
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <PrivateRoute exact path="/incidents" component={IncidentsPage} />
        <PrivateRoute exact path="/settings" component={SettingsPage} />
        <PrivateRoute exact path="/system" component={SystemPage} />
        <PrivateRoute exact path="/tasks" component={TasksPage} />
        <PrivateRoute exact path="/activation" component={ActivationPage} />
        <PrivateRoute exact path="/auth" component={AuthPage} />
        <Redirect to="/home" />
      </Switch>
      {isAuthorized && <GetParameterPopups />}
    </>
  );
};
