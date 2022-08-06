import Header from "./commponents/Navbar/Header";
import TodoContextsProvider from "./contexts/TodoContexts";
import MainRoutes from "./MainRoutes";

function App() {
  return (
    <>
      <TodoContextsProvider>
        <Header />
        <MainRoutes />
      </TodoContextsProvider>
    </>
  );
}

export default App;
