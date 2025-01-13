import { path, allowedRoles } from "../constants";
import {
    UserProfile,
    Home
} from "../../pages";

export const PrivateRoutes = [
    {
        path: `${path.common.Home}`,
        exact: true,
        component: <Home />,
        main: () => <Home />,
        role: [allowedRoles[2]],
    },
    {
        path: `${path.private.UserProfile}`,
        exact: true,
        component: <UserProfile />,
        main: () => <UserProfile />,
        role: [allowedRoles[1]],
    }
];
