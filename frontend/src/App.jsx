import "./App.css";
import EmailForm from "./EmailForm";
import { Toaster } from "sonner";
function App() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Toaster position="bottom-center" />
      <EmailForm />
    </div>
  );
}

export default App;
