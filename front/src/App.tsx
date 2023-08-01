import { AuthProvider } from "./context/authProvider"
import { GlobalStyle } from "./pages/styles/globalStyles"
import { RoutesMain } from "./routes/routes"

export const App = () => {


  return(
    <>
      <GlobalStyle />
      <AuthProvider>
        <RoutesMain /> 
      </AuthProvider>
    </>
  )
}

export default App
