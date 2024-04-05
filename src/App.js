import "./App.css";
import { Provider } from "react-redux";
import Head from "./components/Head";
import Body from "./components/Body";
import store from "./utils/store";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import ThemeContext from "./utils/ThemeContext";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


export const queryClient = new QueryClient();

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
    ],
  },
]);

function App() {
  const isBrowserDefaulDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const getDefaultTheme = () => {
    const localStorageTheme = localStorage.getItem("theme");
    const browserDefault = isBrowserDefaulDark() ? "dark" : "light";
    return localStorageTheme || browserDefault;
  };

  const [theme, setTheme] = useState(getDefaultTheme());

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className="relative w-full  overflow-x-hidden">
          <Head />
          <Outlet />
          <RouterProvider router={appRouter} />

          {/* 
     Head
     Body
       Sidebar
           MenuItems
       MainContainer
           ButtonsList
           VideoContainer
               VideoCard

     
     */}
        </div>
        {/* <ReactQueryDevtools initialIsOpen /> */}
      </ThemeContext.Provider>
    </Provider>
    </QueryClientProvider>
  );
}

export default App;


