"use client";

import { useState } from "react";
import { Edit, Save, X, BarChart3, TrendingUp, Users, Loader2 } from "lucide-react";
import { updateStat } from "../actions";

interface StatsClientProps {
    stats: any[];
}

export default function StatsClient({ stats }: StatsClientProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.length === 0 ? (
                    <div className="col-span-full py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-center">
                        <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">No Statistics Found</h3>
                    </div>
                ) : (
                    stats.map((stat) => (
                        <div key={stat.id} className="bg-white p-6 rounded-2xl border-2 border-red-50 shadow-sm transition-all hover:shadow-md group relative">
                            {editingId === stat.id ? (
                                <form action={async (formData) => {
                                    setIsLoading(true);
                                    await updateStat(stat.id, formData);
                                    setIsLoading(false);
                                    setEditingId(null);
                                }} className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase">Label</label>
                                        <input name="label" defaultValue={stat.label} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm text-gray-900 font-bold focus:outline-none focus:border-red-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase">Value</label>
                                        <input name="value" type="number" defaultValue={stat.value} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm text-gray-900 focus:outline-none focus:border-red-500" />
                                    </div>
                                    <div className="flex gap-2">
                                        <button type="submit" disabled={isLoading} className="flex-1 bg-gray-900 text-white p-2 rounded-lg hover:bg-black transition-all flex items-center justify-center">
                                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        </button>
                                        <button type="button" onClick={() => setEditingId(null)} className="flex-1 bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200">
                                            <X className="w-4 h-4 mx-auto" />
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                                            <TrendingUp className="w-6 h-6" />
                                        </div>
                                        <div className="flex gap-1 transition-opacity">
                                            <button onClick={() => setEditingId(stat.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 bg-blue-50/50 rounded-lg transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
                                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
