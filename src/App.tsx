import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
