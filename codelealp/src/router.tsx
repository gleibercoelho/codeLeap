import { Route, Routes } from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import Login from "./pages/login";


export default function Router () {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
        </Routes>
        </BrowserRouter>
    )
}