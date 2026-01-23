'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

// DUMMY DATA (Normally this comes from specific state/context or API)
const initialCartItems = [
    {
        id: 1,
        name: "Premium Synthetic Motor Oil (5W-30)",
        category: "Engine Oil",
        price: 45.00,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1635773177873-d5d143c72b22?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
        id: 2,
        name: "Performance Brake Pads (Front Set)",
        category: "Brake System",
        price: 89.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
        id: 3,
        name: "Ultra-Flow Air Filter",
        category: "Filters",
        price: 24.50,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1552656967-7a0fe8a4f94c?auto=format&fit=crop&q=80&w=300&h=300"
    }
];

export default function CartPage() {
    const [cartItems, setCartItems] = useState(initialCartItems);

    // Calculate Totals
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 15.00; // Free shipping over $100
    const tax = subtotal * 0.08; // 8% Tax
    const total = subtotal + shipping + tax;

    // Handlers
    const handleRemove = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(cartItems.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center bg-gray-50 text-center">
                <div className="bg-white p-10 rounded-full shadow-sm mb-6">
                    <ShoppingBag size={64} className="text-gray-300" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8 max-w-md">
                    Looks like you haven't added any auto parts or services to your cart yet.
                </p>
                <Link
                    href="/services"
                    className="bg-[#D80000] text-white px-8 py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-black transition-colors duration-300"
                >
                    Browse Services
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 border-l-4 border-[#D80000] pl-4 uppercase tracking-tight">
                    Shopping Cart
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* CART ITEMS LIST */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 rounded-sm hover:shadow-md transition-shadow"
                            >
                                {/* Image */}
                                <div className="relative w-full sm:w-24 h-24 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-1 w-full text-center sm:text-left">
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                                    <p className="text-sm text-gray-500 mb-2">Category: {item.category}</p>
                                    <p className="font-semibold text-[#D80000]">${item.price.toFixed(2)}</p>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center gap-4">

                                    {/* Quantity */}
                                    <div className="flex items-center border border-gray-300 rounded">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="p-2 hover:bg-gray-100 transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} className={item.quantity <= 1 ? "text-gray-300" : "text-gray-600"} />
                                        </button>
                                        <span className="w-10 text-center font-medium text-gray-900">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="p-2 hover:bg-gray-100 transition-colors"
                                        >
                                            <Plus size={16} className="text-gray-600" />
                                        </button>
                                    </div>

                                    {/* Remove */}
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="p-2 text-gray-400 hover:text-[#D80000] transition-colors"
                                        title="Remove item"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* ORDER SUMMARY */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 border-t-4 border-[#D80000] shadow-lg top-28 sticky">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Order Summary</h2>

                            <div className="space-y-4 text-sm text-gray-600 mb-8 border-b border-gray-100 pb-8">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping Estimate</span>
                                    <span className="font-medium text-gray-900">
                                        {shipping === 0 ? <span className="text-green-600 font-bold">FREE</span> : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax Estimate (8%)</span>
                                    <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-8">
                                <span className="text-lg font-bold text-gray-900">Order Total</span>
                                <span className="text-2xl font-extrabold text-[#D80000]">${total.toFixed(2)}</span>
                            </div>

                            <button className="w-full bg-black text-white py-4 rounded font-bold uppercase tracking-widest hover:bg-[#D80000] transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl translate-y-0 hover:-translate-y-1">
                                Checkout Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="mt-6 text-center">
                                <p className="text-xs text-gray-400">
                                    Secure Checkout - 100% Money Back Guarantee
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
