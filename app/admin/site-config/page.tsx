"use client";

import { siteConfig } from "@/data/site";
import { useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import { updateSiteConfig } from "../actions";

export default function SiteConfigPage() {
    const [config, setConfig] = useState(siteConfig);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        const formData = new FormData();
        formData.append("phone", config.phone);
        formData.append("discountText", config.discountText);

        try {
            await updateSiteConfig(formData);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error("Failed to save config:", error);
            alert("Error saving configuration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 size={20} />
                    <p className="font-medium text-sm">Configuration saved successfully!</p>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">Phone Number</label>
                            <input
                                type="text"
                                value={config.phone}
                                onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-gray-900"
                                placeholder="+971..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">Discount Text</label>
                            <input
                                type="text"
                                value={config.discountText}
                                onChange={(e) => setConfig({ ...config, discountText: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-gray-900"
                                placeholder="e.g. 30% OFF..."
                            />
                        </div>

                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                            <Save size={18} />
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
