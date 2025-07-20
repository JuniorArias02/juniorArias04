import { Outlet } from "react-router-dom";
import Navbar from "../page/components/Navbar";
import Footer from "../page/components/Footer";
import { motion } from "framer-motion";

const MainLayout = () => {
	return (
		<div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
			<Navbar />

			<motion.main
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="flex-1 p-4 md:p-8"
			>
				<Outlet />
			</motion.main>

			<Footer />
		</div>
	);
};

export default MainLayout;