import { useState, useEffect, useRef, useMemo } from 'react';
import { Star, Loader2 } from 'lucide-react';

interface Course {
    id: number;
    title: string;
    description: string;
    price: number;
    originalPrice: number;
    reviews: number;
    rating: number;
    badge: string;
    image: string;
    category: 'Courses' | 'Digital Downloads';
}

const initialCourses: Course[] = [
    {
        id: 1,
        title: 'The AI-Powered Content Machine',
        description: 'Build a content engine that runs on AI and produces high-quality, high-converting copy in minutes.',
        price: 49,
        originalPrice: 490,
        reviews: 324,
        rating: 4.9,
        badge: 'Select',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
        category: 'Courses'
    },
    {
        id: 2,
        title: 'Mastering SaaS Sales',
        description: 'The complete guide to landing your first 100 customers and scaling your software business.',
        price: 99,
        originalPrice: 990,
        reviews: 156,
        rating: 4.8,
        badge: 'Select',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
        category: 'Digital Downloads'
    },
    {
        id: 3,
        title: 'SEO for Solopreneurs',
        description: 'No-BS search engine optimization strategies for entrepreneurs who want to rank without a team.',
        price: 39,
        originalPrice: 199,
        reviews: 89,
        rating: 4.7,
        badge: 'New',
        image: 'https://images.unsplash.com/photo-1571721795195-a2cb2d33e00d?q=80&w=800&auto=format&fit=crop',
        category: 'Courses'
    },
    {
        id: 4,
        title: 'High-Ticket Closing 101',
        description: 'Learn the exact psychological triggers used by world-class closers to seal premium deals.',
        price: 149,
        originalPrice: 1500,
        reviews: 42,
        rating: 4.6,
        badge: 'Select',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
        category: 'Courses'
    },
    {
        id: 5,
        title: 'Digital Marketing Mastery',
        description: 'A comprehensive journey through FB Ads, Google Ads, and Email Marketing for 2024.',
        price: 0,
        originalPrice: 299,
        reviews: 842,
        rating: 4.9,
        badge: 'Select',
        image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=800&auto=format&fit=crop',
        category: 'Digital Downloads'
    },
    {
        id: 6,
        title: 'Zero to App: Flutter Course',
        description: 'Build your first cross-platform mobile application from scratch with zero prior code experience.',
        price: 59,
        originalPrice: 399,
        reviews: 215,
        rating: 4.7,
        badge: 'Ending Soon',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
        category: 'Courses'
    }
];

const generateMoreCourses = (count: number, startIndex: number): Course[] => {
    const titles = ['Cold Email ROI', 'UI/UX for Founders', 'Lead Gen Secrets', 'Python Automation', 'Ghostwriting Pro', 'Webflow Mastery'];
    const images = [
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800',
        'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800',
        'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800',
        'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800',
        'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800'
    ];

    return Array.from({ length: count }).map((_, i) => ({
        id: startIndex + i + 1,
        title: titles[(startIndex + i) % titles.length],
        description: 'Unlock explosive growth with this market-proven course designed for high-performance entrepreneurs.',
        price: [0, 29, 49, 89, 149][Math.floor(Math.random() * 5)],
        originalPrice: 499,
        reviews: Math.floor(Math.random() * 500) + 50,
        rating: 1 + Math.random() * 4,
        badge: Math.random() > 0.5 ? 'Select' : 'New',
        image: images[(startIndex + i) % images.length],
        category: Math.random() > 0.5 ? 'Courses' : 'Digital Downloads'
    }));
};

const Courses = () => {
    const [courses, setCourses] = useState<Course[]>(initialCourses);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

    const observerTarget = useRef(null);

    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(course.category);
            const ratingMatch = selectedRatings.length === 0 || selectedRatings.some(r => course.rating >= r);
            const priceMatch = selectedPriceRanges.length === 0 || selectedPriceRanges.some(range => {
                if (range === 'Free') return course.price === 0;
                if (range === 'Under $50') return course.price > 0 && course.price < 50;
                if (range === '$50 to $100') return course.price >= 50 && course.price <= 100;
                return true;
            });
            return categoryMatch && ratingMatch && priceMatch;
        });
    }, [courses, selectedCategories, selectedRatings, selectedPriceRanges]);

    const loadMore = () => {
        if (isLoading) return;
        setIsLoading(true);
        setTimeout(() => {
            setCourses(prev => [...prev, ...generateMoreCourses(3, prev.length)]);
            setIsLoading(false);
        }, 1200);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [observerTarget, isLoading]);

    const toggleFilter = (list: any[], setList: Function, value: any) => {
        if (list.includes(value)) {
            setList(list.filter(item => item !== value));
        } else {
            setList([...list, value]);
        }
    };

    return (
        <div className="pt-24 pb-20 min-h-screen max-w-[1600px] mx-auto px-6">
            <div className="mb-8">
                <nav className="text-sm text-gray-500 mb-4 font-medium uppercase tracking-wider">
                    <span className="cursor-pointer hover:text-blue-600 transition-colors">Browse</span>
                    <span className="mx-3">/</span>
                    <span className="text-gray-900 font-bold">Courses & Learning</span>
                </nav>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Courses & Learning</h1>
            </div>

            <div className="flex gap-10">
                {/* Sidebar Filters */}
                <aside className="w-64 shrink-0">
                    <div className="space-y-10">
                        {/* Categories */}
                        <div>
                            <h3 className="font-black text-gray-900 mb-5 uppercase text-[11px] tracking-[0.2em]">Categories</h3>
                            <div className="space-y-4">
                                {['Courses', 'Digital Downloads'].map(cat => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(cat)}
                                                onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}
                                                className="peer w-5 h-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-0 appearance-none transition-all checked:border-blue-600 checked:bg-blue-600"
                                            />
                                            <svg className="absolute w-3 h-3 text-white left-1 hidden peer-checked:block pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-bold text-gray-600 group-hover:text-blue-600 transition-colors">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <h3 className="font-black text-gray-900 mb-5 uppercase text-[11px] tracking-[0.2em]">Rating</h3>
                            <div className="space-y-4">
                                {[4, 3, 2, 1].map((rating) => (
                                    <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedRatings.includes(rating)}
                                                onChange={() => toggleFilter(selectedRatings, setSelectedRatings, rating)}
                                                className="peer w-5 h-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-0 appearance-none transition-all checked:border-blue-600 checked:bg-blue-600"
                                            />
                                            <svg className="absolute w-3 h-3 text-white left-1 hidden peer-checked:block pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="flex items-center text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'fill-current' : 'text-gray-200'}`} />
                                            ))}
                                            <span className="text-sm font-bold text-gray-600 ml-2">& up</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h3 className="font-black text-gray-900 mb-5 uppercase text-[11px] tracking-[0.2em]">Price Range</h3>
                            <div className="space-y-4">
                                {['Free', 'Under $50', '$50 to $100'].map(range => (
                                    <label key={range} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedPriceRanges.includes(range)}
                                                onChange={() => toggleFilter(selectedPriceRanges, setSelectedPriceRanges, range)}
                                                className="peer w-5 h-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-0 appearance-none transition-all checked:border-blue-600 checked:bg-blue-600"
                                            />
                                            <svg className="absolute w-3 h-3 text-white left-1 hidden peer-checked:block pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-bold text-gray-600 group-hover:text-blue-600 transition-colors">{range}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Grid */}
                <main className="flex-1">
                    {filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCourses.map((course) => (
                                <div key={course.id} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white group flex flex-col">
                                    <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden shrink-0">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className={`text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider ${course.badge === 'Select' ? 'bg-blue-600 text-white' :
                                                course.badge === 'New' ? 'bg-green-600 text-white' :
                                                    course.badge === 'Ending Soon' ? 'bg-red-600 text-white' :
                                                        'bg-gray-900 text-white'
                                                }`}>
                                                {course.badge}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-[18px] font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                                {course.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed flex-1">
                                            {course.description}
                                        </p>

                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-3.5 h-3.5 ${i < Math.floor(course.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-200'}`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs text-blue-600 font-bold underline cursor-pointer">{course.reviews} reviews</span>
                                        </div>

                                        <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
                                            <span className="text-[20px] font-bold text-gray-900">${course.price === 0 ? '0 (Free)' : course.price}</span>
                                            {course.price > 0 && <span className="text-[14px] text-gray-400 line-through">${course.originalPrice}</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No deals found for these filters</p>
                            <button
                                onClick={() => {
                                    setSelectedCategories([]);
                                    setSelectedRatings([]);
                                    setSelectedPriceRanges([]);
                                }}
                                className="mt-4 text-blue-600 font-bold underline text-sm"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}

                    {/* Infinite Scroll Trigger & Loader */}
                    <div ref={observerTarget} className="mt-12 flex flex-col items-center justify-center gap-4 py-8">
                        {isLoading ? (
                            <div className="flex flex-col items-center gap-3">
                                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Finding more deals...</p>
                            </div>
                        ) : (
                            filteredCourses.length > 0 && <p className="text-xs text-gray-300 font-medium italic">Keep scrolling for more software goodness</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Courses;
