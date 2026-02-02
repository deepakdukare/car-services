"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle, AlertCircle, Eye, Plus } from "lucide-react";

// Mock bookings data
const mockBookings = [
    {
        id: "1",
        customerName: "John Doe",
        email: "john@example.com",
        phone: "+971 50 123 4567",
        service: "Brake System Services",
        date: "2026-01-25",
        time: "10:00 AM",
        status: "confirmed"
    },
    {
        id: "2",
        customerName: "Sarah Smith",
        email: "sarah@example.com",
        phone: "+971 55 987 6543",
        service: "Engine Oil Change",
        date: "2026-01-26",
        time: "2:00 PM",
        status: "pending"
    },
    {
        id: "3",
        customerName: "Ahmed Ali",
        email: "ahmed@example.com",
        phone: "+971 52 456 7890",
        service: "Tyre Replacement",
        date: "2026-01-24",
        time: "11:30 AM",
        status: "completed"
    },
    {
        id: "4",
        customerName: "Maria Garcia",
        email: "maria@example.com",
        phone: "+971 54 321 9876",
        service: "AC Repair",
        date: "2026-01-27",
        time: "3:00 PM",
        status: "pending"
    },
];

export default function BookingsPage() {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "confirmed": return "text-blue-600 bg-blue-50 border-blue-200";
            case "pending": return "text-yellow-600 bg-yellow-50 border-yellow-200";
            case "completed": return "text-green-600 bg-green-50 border-green-200";
            case "cancelled": return "text-red-600 bg-red-50 border-red-200";
            default: return "text-gray-600 bg-gray-50 border-gray-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "confirmed": return <CheckCircle className="w-4 h-4" />;
            case "pending": return <AlertCircle className="w-4 h-4" />;
            case "completed": return <CheckCircle className="w-4 h-4" />;
            case "cancelled": return <XCircle className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bookings</h1>
                    <p className="text-gray-600 mt-1">Manage customer service bookings and appointments.</p>
                </div>
                <button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-4 py-2 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-red-500/20">
                    <Plus className="w-4 h-4" />
                    <span>Add Booking</span>
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Bookings", value: "156", color: "text-red-600", bg: "bg-red-50" },
                    { label: "Pending", value: "12", color: "text-yellow-600", bg: "bg-yellow-50" },
                    { label: "Confirmed", value: "8", color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Completed", value: "136", color: "text-green-600", bg: "bg-green-50" }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white border-2 border-red-100 rounded-xl p-4 hover:border-red-200 hover:shadow-lg transition-all"
                    >
                        <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Bookings Table */}
            <div className="bg-white border-2 border-red-100 rounded-2xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-red-100 bg-red-50">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Service</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date & Time</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockBookings.map((booking) => (
                                <tr key={booking.id} className="group hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                                <User className="w-5 h-5 text-red-600" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">{booking.customerName}</div>
                                                <div className="text-xs text-gray-500 flex items-center gap-3 mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <Mail className="w-3 h-3" /> {booking.email}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                    <Phone className="w-3 h-3" /> {booking.phone}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-900 font-medium">{booking.service}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm text-gray-900 flex items-center gap-2 font-medium">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                {booking.date}
                                            </span>
                                            <span className="text-xs text-gray-600 flex items-center gap-2 ml-6">
                                                <Clock className="w-3 h-3" />
                                                {booking.time}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                                            {getStatusIcon(booking.status)}
                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                                            <Eye className="w-4 h-4" />
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t-2 border-gray-100 bg-gray-50">
                    <p className="text-sm text-gray-600">
                        Showing <span className="font-semibold text-gray-900">{mockBookings.length}</span> of <span className="font-semibold text-gray-900">156</span> bookings
                    </p>
                </div>
            </div>
        </div>
    );
}
