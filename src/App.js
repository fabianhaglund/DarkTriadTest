import { ThemeProvider } from "styled-components";
import { GlobalTheme } from "./global-theme";
import { DarkTriadForm } from "./features/DarkTriadForm";

function App() {

  return (
    <ThemeProvider theme={GlobalTheme}>

    <div style={{
      fontFamily: GlobalTheme.fontFamily,
      padding: "40px",

    }}>
      <DarkTriadForm/>
    </div>
      </ThemeProvider>
  );
}

export default App;
