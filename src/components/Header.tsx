import { Link } from 'react-router-dom';
import { Search, Bell, ShoppingCart } from 'lucide-react';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white z-50 border-b border-transparent shadow-sm flex items-center justify-center">
            <div className="w-full max-w-[1600px] flex items-center justify-between px-6 h-full">
                <div className="flex items-center gap-10">
                    {/* Logo Section */}
                    <Link to="/" className="flex flex-col items-center cursor-pointer group shrink-0">
                        <span className="text-[22px] font-black tracking-tighter leading-none text-gray-900">APPSUMO</span>
                        <span className="text-[11px] text-[#2c78f6] font-medium italic -mt-0.5" style={{ fontFamily: 'var(--font-cursive, "Brush Script MT", "Dancing Script", cursive)' }}>
                            15 years of software deals
                        </span>
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden md:flex items-center bg-[#ebf0f5] rounded-full px-5 py-2 w-[400px] gap-3">
                        <Search className="w-4 h-4 text-[#5f6368]" />
                        <input
                            type="text"
                            placeholder="Search products (⌘+k)"
                            className="bg-transparent border-none outline-none text-[14px] w-full placeholder:text-[#5f6368] py-1"
                        />
                    </div>
                </div>

                <nav className="hidden xl:flex items-center gap-8 px-4">
                    <Link to="/" className="text-[16px] font-medium text-gray-700 hover:text-black transition-colors whitespace-nowrap">Software</Link>
                    <Link to="/courses" className="text-[16px] font-medium text-gray-700 hover:text-black transition-colors whitespace-nowrap">Courses & more</Link>
                    <Link to="#" className="text-[16px] font-medium text-gray-700 hover:text-black transition-colors whitespace-nowrap">New arrivals</Link>
                    <Link to="#" className="text-[16px] font-medium text-gray-700 hover:text-black transition-colors whitespace-nowrap">Ending soon</Link>
                </nav>

                <div className="flex items-center gap-5 shrink-0">
                    <div className="flex items-center gap-2">
                        <button className="relative p-2 hover:bg-gray-50 rounded-full transition-colors group">
                            <Bell className="w-5 h-5 text-gray-900" />
                            <span className="absolute top-1 right-1 w-4 h-4 bg-[#f24444] rounded-full flex items-center justify-center text-[9px] text-white font-bold border-2 border-white">
                                1
                            </span>
                        </button>
                        <button className="p-2 hover:bg-gray-50 rounded-full transition-colors group">
                            <ShoppingCart className="w-5 h-5 text-gray-900" />
                        </button>
                    </div>
                    <button className="px-5 py-2 border border-black rounded-[6px] font-bold text-[14px] text-gray-900 hover:bg-gray-50 transition-all ml-1">
                        Log in
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
