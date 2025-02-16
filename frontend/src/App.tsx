import { Route, Routes } from "react-router";
import DefaultLayout from "./layout/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "./components/theme-provider";
import LoginPage from "./pages/LoginPage";
import AllLoans from "./pages/loan/AllLoans";
import LoanApplication from "./pages/loan/Application";
import LoanCollections from "./pages/collection/LoanCollections";
import CollectLoan from "./pages/collection/CollectLoan";
import UsersPage from "./pages/UsersPage";
import LedgerPage from "./pages/LedgerPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import CashInOutPage from "./pages/CashInOutPage";

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Routes>
				<Route path="/login" element={<LoginPage />} />

				<Route element={<DefaultLayout />}>
					<Route path="/" element={<Dashboard />} />
					<Route path="/dashboard" element={<Dashboard />} />

					{/* Loan routes */}
					<Route path="/dashboard/loans" element={<AllLoans />} />
					<Route path="/dashboard/application" element={<LoanApplication />} />

					{/* Collection routes */}
					<Route path="/dashboard/collections" element={<LoanCollections />} />
					<Route path="/dashboard/collect-loan" element={<CollectLoan />} />

					{/* Users */}
					<Route path="/dashboard/users" element={<UsersPage />} />

					{/* Ledger */}
					<Route path="/dashboard/ledger" element={<LedgerPage />} />

					{/* Activities */}
					<Route path="/dashboard/activities" element={<ActivitiesPage />} />

					{/* Cash in/out */}
					<Route path="/dashboard/cash-in-or-out" element={<CashInOutPage />} />
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
