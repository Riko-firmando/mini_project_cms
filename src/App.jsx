import { RouterProvider } from "react-router-dom";
import router from "./routes"; // Import router yang baru dibuat

function App() {
  return <RouterProvider router={router} />;
}

export default App;
