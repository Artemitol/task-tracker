import { RouterProvider } from "react-router-dom"
import "./index.scss"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { router } from "./router/router"

export function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router}></RouterProvider>
        </Provider>
    )
}
