import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./componenst/Progect/Progect.js";
import ProgectInfo from "./componenst/Progect/ProgectInfo.js";
import ProgectSiteInfo from "./componenst/Progect/ProgectSiteInfo.js";
import ProgectSiteInfoPage from "./componenst/Progect/ProgectSiteInfoPage.js";
import ProgectAdd from "./componenst/Progect/ProgectAdd.js";
import TaskList from "./componenst/Task/TaskList.js";
import Error from "./componenst/error/Error.js";
import ErrorAdd from "./componenst/error/ErrorAdd.js";
import ErrorItem from "./componenst/error/ErrorItem.js";
import Constructor from "./componenst/constructor/Constructor.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/error" element={<Error />} />
          <Route path="/error/:id" element={<ErrorItem />} />
          <Route path="/erroradd" element={<ErrorAdd />} />
          <Route path="/erroradd/:id" element={<ErrorAdd />} />
          <Route path="/task" element={<TaskList />} />
          <Route path="/constructo-html" element={<Constructor />} />
          <Route path="/progectadd" element={<ProgectAdd />} />
          <Route path="/progectadd/:id" element={<ProgectAdd />} />
          <Route path="/progect/:id" element={<ProgectInfo />} />
          <Route path="/progect/:ProgectId/:id" element={<ProgectSiteInfo />} />
          <Route path="/progect/:ProgectId/:SiteId/:id" element={<ProgectSiteInfoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
