import { Route, Routes, BrowserRouter } from "react-router-dom"
import Financials from "./FinancialAnalytics/screens/financialsPage"
import SideNav from "@/components/side-nav"
import DataSources from "./DataSources/screens/dataSources"

export default function Dashboard(){
    return(
        <BrowserRouter>
        <SideNav></SideNav>
            <Routes>
                <Route path='/'>
                    <Route index element={<DataSources></DataSources>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )

}