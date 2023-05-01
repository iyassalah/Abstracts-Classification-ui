import "./App.css";
import Navbar from "./components/navbar/navbar.component";
import Interactive from "./pages/interactive/interactive.page";
import Batch from "./pages/batch/batch.page";
import Results from "./pages/results/results.page";
import NotFound from "./pages/notfound/notfound.page";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";

function App() {
  return (
    <div className="">
      <Layout>
        <Layout.Header className="layout-header">
          <Navbar />
        </Layout.Header>
        <Layout.Content className="app">
          <Routes>
            <Route path="/" element={<Interactive />}></Route>
            <Route path="interactive" element={<Interactive />}></Route>
            <Route path="batch" element={<Batch />}></Route>
            <Route path="results" element={<Results />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;
