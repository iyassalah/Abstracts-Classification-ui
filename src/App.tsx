import "./App.css";
import Navbar from "./components/navbar/navbar.component";
import Interactive from "./pages/interactive/interactive.page";
import Batch from "./pages/batch/batch.page";
import Results from "./pages/results/results.page";
import LoginForm from "./pages/login/login.page";
import NotFound from "./pages/notfound/notfound.page";
import { Routes, Route } from "react-router-dom";
import { ConfigProvider, Layout } from "antd";
import { useTheme } from "./hooks/theme.hook";
import AdminDashboard from "./pages/admin-dashboard/admin-dashboard.page";

function App() {
  const { themeProps, toggle, token, darkTheme } = useTheme(true);
  return (
    <ConfigProvider {...themeProps}>
      <div className={`app-wrapper${darkTheme ? ' dark' : ''}`}>
        <Layout>
          <Layout.Header className="layout-header" style={{ backgroundColor: token.colorBgContainer }}>
            <Navbar toggle={toggle} darkTheme={darkTheme} />
          </Layout.Header>
          <Layout.Content className="app">
            <Routes>
              <Route path="/" element={<Interactive />}></Route>
              <Route path="interactive" element={<Interactive />}></Route>
              <Route path="batch" element={<Batch />}></Route>
              <Route path="results" element={<Results />}></Route>
              <Route path="login" element={<LoginForm />}></Route>
              <Route path="adminDashboard" element={<AdminDashboard />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </Layout.Content>
        </Layout>
      </div>
    </ConfigProvider>
  );
}

export default App;
