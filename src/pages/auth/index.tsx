import { RouteChildrenProps } from "react-router-dom";

import { AuthByLogin } from "entities/viewer";

import { reflect } from "@effector/reflect";

type Props = RouteChildrenProps<{}> & {};

const View = ({}: Props) => {
  return (
    <>
      <AuthByLogin />
    </>
  );
};
const AuthPage = reflect({
  view: View,
  bind: {},
});

export default AuthPage;
