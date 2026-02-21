'use client'
import { PackageIcon, Search, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {useUser, useClerk, UserButton} from "@clerk/nextjs"
import CustomUserButton from "./CustomUserButton"
import axios from "axios"

const Navbar = () => {

    const {user, isLoaded} = useUser()
    const {openSignIn} = useClerk()
    const router = useRouter();
    const [storeName, setStoreName] = useState('Shop')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const [search, setSearch] = useState('')
    const cartCount = useSelector(state => state.cart.total)

    useEffect(() => {
        const fetchStoreName = async () => {
            try {
                const res = await axios.get('/api/admin/settings')
                if (res.data?.storeName) {
                    setStoreName(res.data.storeName)
                }
            } catch (error) {
                console.error('Error fetching store name:', error)
            }
        }

        fetchStoreName()

        // Poll for store name changes every 5 seconds
        const interval = setInterval(fetchStoreName, 5000)

        return () => clearInterval(interval)
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
        setMobileMenuOpen(false)
    }

    const handleOpenSignIn = () => {
        if (isLoaded && !user) {
            openSignIn()
        }
    }

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" }
    ]

    return (
        <nav className="relative bg-white">
            <div className="mx-4 sm:mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4">

                    {/* Logo */}
                    <Link href="/" className="text-3xl sm:text-4xl font-semibold text-slate-700 flex-shrink-0">
                        {storeName}<span className="text-green-600 text-4xl sm:text-5xl leading-0">.</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-8 text-slate-600">
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href} className="hover:text-indigo-600 transition text-sm lg:text-base font-medium">
                                {link.name}
                            </Link>
                        ))}

                        <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2 bg-slate-100 px-4 py-2.5 rounded-full">
                            <Search size={18} className="text-slate-600 flex-shrink-0" />
                            <input className="w-40 bg-transparent outline-none placeholder-slate-600 text-sm" type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </form>

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition text-sm lg:text-base font-medium">
                            <ShoppingCart size={20} className="flex-shrink-0" />
                            <span>Cart</span>
                            {cartCount > 0 && <button className="absolute -top-2 left-4 text-[10px] text-white bg-slate-600 w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</button>}
                        </Link>

                        {
                            !user && isLoaded ? (
                                <button onClick={handleOpenSignIn} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-full font-medium text-sm">
                                    Login
                                </button>
                            ) : (
                                <CustomUserButton>
                                    <UserButton.Action labelIcon={<PackageIcon size={16}/>} label="My Orders" onClick={()=> router.push('/orders')}/>
                                </CustomUserButton>
                            )
                        }
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <Link href="/cart" className="relative p-2">
                            <ShoppingCart size={24} className="text-slate-600" />
                            {cartCount > 0 && <span className="absolute top-0 right-0 text-xs text-white bg-slate-600 w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>}
                        </Link>
                        
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                            className="p-2 hover:bg-slate-100 rounded-lg transition-all duration-300 active:scale-95"
                        >
                            {mobileMenuOpen ? (
                                <X size={28} className="transition-transform duration-300 rotate-90" />
                            ) : (
                                <Menu size={28} className="transition-transform duration-300" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4 border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 animate-in slide-in-from-top-2 duration-300">
                        {/* Mobile Search */}
                        <form onSubmit={handleSearch} className="flex items-center gap-2 bg-slate-100 mx-4 mt-4 mb-4 px-3 py-2 rounded-full">
                            <Search size={18} className="text-slate-600 flex-shrink-0" />
                            <input className="flex-1 bg-transparent outline-none placeholder-slate-600 text-sm" type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </form>

                        {/* Mobile Nav Links */}
                        <div className="space-y-2 py-3">
                            {navLinks.map(link => (
                                <Link 
                                    key={link.href}
                                    href={link.href} 
                                    className="block px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition font-medium text-base"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Profile Section */}
                        {user ? (
                            <div className="border-t border-slate-200 pt-4 mt-4 px-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <img src={user.imageUrl} alt="Profile" className="w-10 h-10 rounded-full" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-slate-800 text-sm truncate">{user.firstName}</p>
                                        <p className="text-xs text-slate-500 truncate">{user.primaryEmailAddress?.emailAddress}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        router.push('/orders')
                                        setMobileMenuOpen(false)
                                    }}
                                    className="w-full flex items-center gap-2 px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition font-medium text-base mb-2"
                                >
                                    <PackageIcon size={18} />
                                    My Orders
                                </button>
                                <div className="border-t border-slate-200 pt-3 mt-3">
                                    <CustomUserButton />
                                </div>
                            </div>
                        ) : (
                            isLoaded && !user ? (
                                <div className="flex items-center justify-center mt-6">
                                    <button 
                                        onClick={() => {
                                            handleOpenSignIn()
                                            setMobileMenuOpen(false)
                                        }} 
                                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all duration-200 text-white rounded-lg font-medium"
                                    >
                                        Login
                                    </button>
                                </div>
                            ) : null
                        )}
                    </div>
                )}
            </div>
            <hr className="border-gray-200" />
        </nav>
    )
}

export default Navbar