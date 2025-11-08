import css from "./App.module.css";
import { Suspense } from "react";
import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import TodoPage from "./pages/todoPage/TodoPage";
function App() {
  return (
    <div className={css.app}>
      <Layout>
        <Suspense>
          <Routes>
            <Route path="/" element={<TodoPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
