import { BarChart2, Menu, Settings, ShoppingBag, ShoppingCart, ClipboardList, Users } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
	{ name: "Tổng quan", icon: BarChart2, color: "#6366f1", href: "/admin" },
	{ name: "Danh mục sản phẩm", icon: ClipboardList, color: "#ed1c24", href: "/admin/danh-muc" },
	{ name: "Sản phẩm", icon: ShoppingBag, color: "#8b5cf6", href: "/admin/san-pham" },
	{ name: "Tài khoản", icon: Users, color: "#ec4899", href: "/admin/users" },
	{ name: "Đơn hàng", icon: ShoppingCart, color: "#f59e0b", href: "/admin/orders" },
	// { name: "Cài đặt", icon: Settings, color: "#6ee7b7", href: "/admin/settings" },
]

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"
				}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 rounded-full hover:bg-green-300 transition-colors max-w-fit'
				>
					<Menu size={24} />
				</motion.button>
	
				<nav className='mt-7 flex-grow'>
					{isSidebarOpen && (
						<Link to="/admin">
							<div className="pl-3 pb-4 pr-3 text-2xl">
								<span className="text-orange-500 font-bold">Flower</span> Shop
							</div>
						</Link>
					)}

					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-green-300 transition-colors mb-2'>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.1 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>
			</div>
		</motion.div>
	);
};

export default Sidebar;
