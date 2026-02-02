"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Edit, Plus, Trash2, TrendingUp, Package as PackageIcon, Settings as SettingsIcon } from "lucide-react";

interface SettingsClientProps {
    siteConfig: any;
    stats: any[];
    servicePackages: any[];
}

export default function SettingsClient({ siteConfig, stats, servicePackages }: SettingsClientProps) {
    const [activeTab, setActiveTab] = useState<"site" | "stats" | "packages">("site");

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
                <p className="text-gray-600 mt-1">Manage site configuration, stats, and service packages.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b-2 border-gray-200">
                {[
                    { id: "site", label: "Site Config" },
                    { id: "stats", label: "Stats" },
                    { id: "packages", label: "Service Packages" }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-4 py-3 font-semibold transition-colors relative ${activeTab === tab.id
                                ? "text-red-600"
                                : "text-gray-500 hover:text-gray-900"
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Site Config Tab */}
            {activeTab === "site" && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border-2 border-red-100 rounded-2xl p-6 shadow-lg"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                                <SettingsIcon className="w-5 h-5 text-red-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Site Configuration</h2>
                        </div>
                        <button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-red-500/20">
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="text"
                                defaultValue={siteConfig?.phone}
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Discount Banner Text</label>
                            <input
                                type="text"
                                defaultValue={siteConfig?.discountText}
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                            />
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Stats Tab */}
            {activeTab === "stats" && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Statistics</h2>
                        <button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-red-500/20">
                            <Plus className="w-4 h-4" />
                            Add Stat
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.id}
                                className="bg-white border-2 border-red-100 rounded-xl p-4 hover:border-red-200 hover:shadow-lg transition-all"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
                                            <TrendingUp className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{stat.label}</h3>
                                            <p className="text-2xl font-bold text-red-600">{stat.value}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Service Packages Tab */}
            {activeTab === "packages" && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Service Packages</h2>
                        <button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-red-500/20">
                            <Plus className="w-4 h-4" />
                            Add Package
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {servicePackages.map((pkg) => {
                            const features = JSON.parse(pkg.features);
                            return (
                                <div
                                    key={pkg.id}
                                    className={`bg-white border-2 rounded-2xl p-6 transition-all hover:shadow-lg ${pkg.highlighted
                                            ? "border-red-500 ring-2 ring-red-100"
                                            : "border-red-100 hover:border-red-200"
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{pkg.title}</h3>
                                            <p className="text-2xl font-bold text-red-600 mt-2">{pkg.price}</p>
                                        </div>
                                        {pkg.highlighted && (
                                            <span className="px-2 py-1 text-xs font-bold bg-red-600 text-white rounded">
                                                POPULAR
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        {features.slice(0, 5).map((feature: any, i: number) => (
                                            <div key={i} className="flex items-start gap-2 text-sm">
                                                <span className={feature.included ? "text-green-600" : "text-gray-400"}>
                                                    {feature.included ? "✓" : "✗"}
                                                </span>
                                                <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                                                    {feature.label}
                                                </span>
                                            </div>
                                        ))}
                                        {features.length > 5 && (
                                            <p className="text-xs text-gray-500 italic pl-5">+{features.length - 5} more features</p>
                                        )}
                                    </div>

                                    <div className="flex gap-2 pt-4 border-t-2 border-gray-100">
                                        <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-3 py-2 rounded-lg transition-colors font-medium">
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
