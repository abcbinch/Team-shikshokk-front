import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
// import { useStore } from "./store";
import AppRoutes from "./routes/";

// import AppRoutes from "./routes";
import "./app2.scss";

const App2: React.FC = () => {
  return (
    <Router
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <AppRoutes />
    </Router>
  );
};

export default App2;
