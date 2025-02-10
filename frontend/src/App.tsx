import { Route, Routes } from "react-router";
import DefaultLayout from "./layout/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "./components/theme-provider";
import LoginPage from "./pages/LoginPage";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Routes>
				<Route path="/login" element={<LoginPage />} />

				<Route element={<DefaultLayout />}>
					<Route index element={<Dashboard />} />
				</Route>
				{/* 
			<Route path="concerts">
				<Route index element={<ConcertsHome />} />
				<Route path=":city" element={<City />} />
				<Route path="trending" element={<Trending />} />
			</Route> */}
			</Routes>
		</ThemeProvider>
	);
}

export default App;
