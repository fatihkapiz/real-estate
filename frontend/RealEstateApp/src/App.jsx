import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NotLogged from './Pages/NotLogged';
import Login from './Pages/Login';
import Logged from './Pages/Logged';
import LoggedAdmin from './Pages/LoggedAdmin';
import AdminParameters from './Pages/AdminParameters';
import AddParameter from './Pages/AddParameter';
import { addCurrency, getCurrency, getCurrencyList } from './Services/CurrencyService';
import { addType, getType, getTypeList } from './Services/TypeService';
import { addStatus, getStatus, getStatusList } from './Services/StatusService';
import ParameterList from './Pages/ParameterList';
import AddRealEstate from './Pages/AddRealEstate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NotLogged />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<Logged />}>
          <Route path="/" element={<HomePage />} />
          <Route path="realestate" element={<AddRealEstate />}/>
        </Route>
        <Route element={<LoggedAdmin />}>
          <Route path="realestate" element={<AddRealEstate />}/>
          <Route path="/admin/param" element={<AdminParameters />} />
          <Route path="admin/currency/list" element={<ParameterList list={getCurrencyList} parameter={"currency"} field={"currencySymbol"}/>} />
          <Route path="admin/currency/get" element={<AddParameter get={getCurrency} parameter={"currency"} />} />
          <Route path="admin/currency/add" element={<AddParameter add={addCurrency} parameter={"currency"} />} />
          <Route path="admin/currency/update" element={<AdminParameters />} />
          <Route path="admin/currency/delete" element={<AdminParameters />} />

          <Route path="admin/type/list" element={<ParameterList list={getTypeList} parameter={"type"} field={"type"}/>} />
          <Route path="admin/type/get" element={<AddParameter get={getType} parameter={"type"} />} />
          <Route path="admin/type/add" element={<AddParameter add={addType} parameter={"type"} />} />
          <Route path="admin/type/update" element={<AdminParameters />} />
          <Route path="admin/type/delete" element={<AdminParameters />} />
          
          <Route path="admin/status/list" element={<ParameterList list={getStatusList} parameter={"status"} field={"status"}/>} />
          <Route path="admin/status/get" element={<AddParameter get={getStatus} parameter={"status"} />} />
          <Route path="admin/status/add" element={<AddParameter add={addStatus} parameter={"status"} />} />
          <Route path="admin/status/update" element={<AdminParameters />} />
          <Route path="admin/status/delete" element={<AdminParameters />} />
        </Route>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
