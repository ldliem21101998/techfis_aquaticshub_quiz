import { sessionVar, path, allowedRoles } from "../../utils/constants";
import { setSessionVar } from "../../utils/common/hashData";
import { useNavigate, useLocation } from "react-router-dom";

const LoginWithRequireLogin = ({ onSetUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectCallBack = location.state?.redirectCallBack
    ? location.state?.redirectCallBack
    : undefined;

  //API Integration
  const handleLogin = async () => {
    // await apiLogin({
    //     adminCode: credentials.adminCode,
    //     password: credentials.password,
    // })
    //     .then((res) => {
    //         setSessionVar(sessionVar.user, res.data.data.basicInformation);
    //         onSetUser(res.data.data.basicInformation);
    //     })
    //     .then(() => {
    //         if (redirectCallBack) {
    //             redirectCallBack();
    //         } else {
    //             navigate(-1);
    //         }
    //     })
    //     .catch((error) => {
    //         console.error(error.message);
    //     });
    setSessionVar(sessionVar.user, { role: allowedRoles[2] });
    onSetUser({ role: allowedRoles[2] });
    navigate("../" + path.common.Home);
  };

  return <div onClick={() => handleLogin()}>Login</div>;
};

export default LoginWithRequireLogin;
