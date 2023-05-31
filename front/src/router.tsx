import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import ProfilePage from "./components/Pages/ProfilePage"
import SearchPage from "./components/Pages/SearchPage"
import AuthPage from "./components/Pages/AuthPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            // CHILDREN HERE
            {
                path: "",
                element: <SearchPage />
            },
            {
                path: "auth",
                element: <AuthPage />
            },
            {
                path: "profile",
                element: <ProfilePage />

            }
        ]
    }
])

const Router = () => {

    return (
        <RouterProvider router={router} />
    )
}

export default Router