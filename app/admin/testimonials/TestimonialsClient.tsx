"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, User, Star, ChevronDown, Check, Loader2, Camera, Quote, Edit2, X, Save } from "lucide-react";
import { createTestimonial, deleteTestimonial, updateTestimonial } from "./actions";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    image: string;
    review: string;
    rating: number;
}

interface TestimonialsClientProps {
    testimonials: Testimonial[];
}

export default function TestimonialsClient({ testimonials }: TestimonialsClientProps) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="space-y-8 pb-20">
            {/* Add New Testimonial Card (Collapsible) */}
            <div className="bg-white border-2 border-red-50 rounded-2xl shadow-sm relative overflow-hidden focus-within:border-red-500 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full -mr-16 -mt-16" />

                <button
                    onClick={() => setIsAddOpen(!isAddOpen)}
                    className="w-full flex items-center justify-between p-6 hover:bg-red-50/50 transition-colors text-left"
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isAddOpen ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600'}`}>
                            <Plus className={`w-5 h-5 transition-transform duration-300 ${isAddOpen ? 'rotate-45' : ''}`} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Add New Testimonial</h2>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isAddOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {isAddOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="p-8 pt-0 border-t border-red-50 mt-6">
                                <form action={async (formData) => {
                                    setIsLoading(true);
                                    await createTestimonial(formData);
                                    setIsLoading(false);
                                    setIsAddOpen(false);
                                }} className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">

                                    {/* Left Column: Info */}
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">Client Name</label>
                                            <input name="name" required placeholder="e.g. John Smith" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all placeholder:font-normal" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">Role / Location</label>
                                            <input name="role" required placeholder="e.g. CEO, Dubai" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all placeholder:font-normal" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">Rating</label>
                                            <select name="rating" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all appearance-none cursor-pointer">
                                                <option value="5">★★★★★ (5 Stars)</option>
                                                <option value="4">★★★★☆ (4 Stars)</option>
                                                <option value="3">★★★☆☆ (3 Stars)</option>
                                                <option value="2">★★☆☆☆ (2 Stars)</option>
                                                <option value="1">★☆☆☆☆ (1 Star)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Middle Column: Review Text */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 ml-1">Client Feedback</label>
                                        <textarea
                                            name="review"
                                            required
                                            placeholder="Write the client's testimonial here..."
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-medium focus:outline-none focus:border-red-500 transition-all h-[calc(100%-2rem)] min-h-[150px] resize-none"
                                        />
                                    </div>

                                    {/* Right Column: Photo */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 ml-1">Client Photo</label>
                                        <label className="flex flex-col items-center justify-center w-full h-[220px] border-2 border-gray-100 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-red-300 transition-all group">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <div className="bg-red-50 p-4 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                                                    <Camera className="w-8 h-8 text-red-600" />
                                                </div>
                                                <p className="text-xs text-gray-900 font-bold mb-1 px-4 text-center">Click to upload or drag and drop</p>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-2">Professional portrait recommended</p>
                                            </div>
                                            <input name="image" type="file" accept="image/*" className="hidden" />
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="md:col-span-full pt-4 border-t border-gray-100 mt-4 flex justify-end gap-4">
                                        <button type="button" onClick={() => setIsAddOpen(false)} className="px-8 py-4 rounded-2xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-all">
                                            Cancel
                                        </button>
                                        <button type="submit" disabled={isLoading} className="bg-red-600 text-white font-bold py-4 px-12 rounded-2xl shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3">
                                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                            Save Testimonial
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                    <div key={t.id} className="bg-white p-8 rounded-3xl border-2 border-red-50 shadow-sm relative group hover:border-red-200 transition-all flex flex-col">
                        <Quote className="absolute top-6 right-8 w-12 h-12 text-red-50 opacity-50" />

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden relative shadow-inner ring-4 ring-gray-50">
                                {t.image ? (
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-300" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 text-lg leading-tight truncate">{t.name}</h3>
                                <p className="text-sm text-gray-500 font-medium truncate">{t.role}</p>
                            </div>
                        </div>

                        <div className="flex text-yellow-500 gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < t.rating ? "currentColor" : "none"} className={i < t.rating ? "" : "text-gray-200"} />
                            ))}
                        </div>

                        <p className="text-gray-900 font-medium text-sm italic leading-relaxed mb-6 flex-1 line-clamp-4">"{t.review}"</p>

                        <div className="flex items-center gap-2 pt-4 border-t border-gray-50 mt-auto">
                            <button
                                onClick={() => setEditingTestimonial(t)}
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-50 text-gray-600 font-bold hover:bg-red-50 hover:text-red-600 transition-all"
                            >
                                <Edit2 size={16} />
                                <span>Edit</span>
                            </button>
                            <form action={async () => {
                                if (confirm("Are you sure?")) {
                                    await deleteTestimonial(t.id);
                                }
                            }}>
                                <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                    <Trash2 size={16} />
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {editingTestimonial && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setEditingTestimonial(null)}
                            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white w-full max-w-4xl rounded-[32px] shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Edit Testimonial</h2>
                                    <p className="text-gray-500 font-medium text-sm">Update client feedback and details</p>
                                </div>
                                <button
                                    onClick={() => setEditingTestimonial(null)}
                                    className="p-3 bg-white rounded-2xl text-gray-400 hover:text-gray-900 hover:shadow-lg transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form action={async (formData) => {
                                setIsLoading(true);
                                await updateTestimonial(editingTestimonial.id, formData);
                                setIsLoading(false);
                                setEditingTestimonial(null);
                            }} className="p-8">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Left Column: Info */}
                                    <div className="lg:col-span-1 space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">Client Name</label>
                                            <input
                                                name="name"
                                                defaultValue={editingTestimonial.name}
                                                required
                                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">Role / Location</label>
                                            <input
                                                name="role"
                                                defaultValue={editingTestimonial.role}
                                                required
                                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">Rating</label>
                                            <select
                                                name="rating"
                                                defaultValue={editingTestimonial.rating}
                                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="5">★★★★★ (5 Stars)</option>
                                                <option value="4">★★★★☆ (4 Stars)</option>
                                                <option value="3">★★★☆☆ (3 Stars)</option>
                                                <option value="2">★★☆☆☆ (2 Stars)</option>
                                                <option value="1">★☆☆☆☆ (1 Star)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Middle/Right Column: Review & Photo */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">Client Feedback</label>
                                            <textarea
                                                name="review"
                                                defaultValue={editingTestimonial.review}
                                                required
                                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-medium focus:outline-none focus:border-red-500 transition-all min-h-[120px] resize-none"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">Update Photo (Optional)</label>
                                            <div className="flex items-center gap-6">
                                                <div className="w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0 ring-4 ring-gray-50 border-2 border-white shadow-sm">
                                                    <img src={editingTestimonial.image} alt="Current" className="w-full h-full object-cover" />
                                                </div>
                                                <label className="flex-1 flex flex-col items-center justify-center h-24 border-2 border-gray-100 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-red-300 transition-all group">
                                                    <div className="flex items-center gap-3">
                                                        <Camera className="w-5 h-5 text-red-600" />
                                                        <span className="text-xs text-gray-900 font-bold">Replace photo</span>
                                                    </div>
                                                    <input name="image" type="file" accept="image/*" className="hidden" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-4 mt-8 pt-8 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setEditingTestimonial(null)}
                                        className="px-8 py-4 rounded-2xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-red-600 text-white font-bold py-4 px-12 rounded-2xl shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3"
                                    >
                                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                                        Update Testimonial
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
