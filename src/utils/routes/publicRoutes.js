import { path } from "../../utils/constants"
import { ExampleServices, ExampleMultiLang, ExampleCommonFunction, Home } from "../../pages"

export const PublicRoutes = [
    //#region Example
    {
        path: `${path.example.services}`,
        exact: true,
        component: <ExampleServices />,
        main: () => <ExampleServices />,
    },
    {
        path: `${path.example.multilang}`,
        exact: true,
        component: <ExampleMultiLang />,
        main: () => <ExampleMultiLang />,
    },
    {
        path: `${path.example.common}`,
        exact: true,
        component: <ExampleCommonFunction />,
        main: () => <ExampleCommonFunction />,
    },
    //#endregion 
    //#region Main
    {
        path: `${path.common.Home}`,
        exact: true,
        component: <Home />,
        main: () => <Home />,
    },
    //#endregion   
]