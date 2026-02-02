"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Plus,
    Trash2,
    X,
    Loader2,
    Edit,
    ChevronDown,
    RotateCcw,
    Clock,
    Check,
    LayoutGrid,
    Tag,
    TrendingUp,
    Camera,
    Save,
    AlertTriangle
} from "lucide-react";
import { createService, deleteService, updateService } from "../actions";

interface AdminDashboardClientProps {
    services: any[];
    categories: any[];
    stats: any;
}

export default function AdminDashboardClient({ services, categories, stats }: AdminDashboardClientProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);

    const [imageError, setImageError] = useState<string | null>(null);

    const filteredServices = services.filter(service => {
        const matchesSearch =
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.category?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory === "all" || service.categoryId === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("all");
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
    const paginatedServices = filteredServices.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this service?")) {
            await deleteService(id);
        }
    };

    const handleCreateService = async (formData: FormData) => {
        setIsLoading(true);
        try {
            await createService(formData);
            setIsAddModalOpen(false);
        } catch (error) {
            console.error("Failed to create service:", error);
            alert("Failed to create service. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateService = async (formData: FormData) => {
        if (!editingService) return;
        setIsLoading(true);
        try {
            await updateService(editingService.id, formData);
            setIsEditModalOpen(false);
            setEditingService(null);
        } catch (error) {
            console.error("Failed to update service:", error);
            alert("Failed to update service. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditClick = (service: any) => {
        setEditingService(service);
        setIsEditModalOpen(true);
    };

    const validateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const maxSize = 2 * 1024 * 1024; // 2MB
        const minSize = 2 * 1024; // 2KB

        if (file.size > maxSize) {
            setImageError(`Image is too large (${(file.size / (1024 * 1024)).toFixed(2)}MB). Maximum allowed is 2MB.`);
            e.target.value = ""; // Clear input
        } else if (file.size < minSize) {
            setImageError(`Image is too small (${(file.size / 1024).toFixed(2)}KB). Please upload a higher quality image.`);
            e.target.value = ""; // Clear input
        } else {
            setImageError(null);
        }
    };

    return (
        <div className="space-y-8">
            {/* Dashboard Content */}

            {/* Add New Service Card (Collapsible) */}
            <div className="bg-white border-2 border-red-50 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full -mr-16 -mt-16" />

                {/* Header Toggle */}
                <button
                    onClick={() => setIsAddModalOpen(!isAddModalOpen)}
                    className="w-full flex items-center justify-between p-6 hover:bg-red-50/50 transition-colors text-left"
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isAddModalOpen ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600'}`}>
                            <Plus className={`w-5 h-5 transition-transform duration-300 ${isAddModalOpen ? 'rotate-45' : ''}`} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Add New Service</h2>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isAddModalOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {isAddModalOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="p-8 pt-0 border-t border-red-50 mt-6">
                                <form action={handleCreateService} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">

                                    {/* Column 1: Name & Price */}
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">Service Name</label>
                                            <input name="name" type="text" required className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all placeholder:font-normal" placeholder="e.g. Brake Pad Replacement" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">Price</label>
                                            <input name="price" type="text" required className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-red-600 font-bold focus:outline-none focus:border-red-500 transition-all placeholder:font-normal" placeholder="e.g. 150 AED" />
                                        </div>
                                    </div>

                                    {/* Column 2: Category & Time */}
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">Category</label>
                                            <select name="categoryId" required className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all appearance-none cursor-pointer">
                                                <option value="" className="text-gray-900">Select Category</option>
                                                {categories.map(cat => <option key={cat.id} value={cat.id} className="text-gray-900">{cat.title}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">Time Estimation</label>
                                            <div className="relative">
                                                <input name="time" type="text" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all placeholder:font-normal" placeholder="e.g. 1 hour" />
                                                <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Column 3: Service Image */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 ml-1">Service Image</label>
                                        <label className="flex flex-col items-center justify-center w-full h-[180px] border-2 border-gray-100 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-red-300 transition-all group">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <div className="bg-red-50 p-3 rounded-xl mb-2 group-hover:scale-110 transition-transform">
                                                    <Camera className="w-7 h-7 text-red-600" />
                                                </div>
                                                <p className="text-[10px] text-gray-900 font-bold text-center px-4 uppercase tracking-widest">Upload Photo</p>
                                            </div>
                                            <input name="image" type="file" accept="image/*" className="hidden" onChange={validateImage} />
                                        </label>
                                    </div>

                                    {/* Full Width Description */}
                                    <div className="space-y-2 lg:col-span-3">
                                        <label className="text-sm font-bold text-gray-900 ml-1">Full Description</label>
                                        <textarea name="description" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-medium h-32 focus:outline-none focus:border-red-500 transition-all resize-none" placeholder="Provide a detailed breakdown of this service..." />
                                    </div>

                                    <div className="md:col-span-full pt-4 border-t border-gray-100 mt-4 flex justify-end gap-4">
                                        <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-8 py-4 rounded-2xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-all">
                                            Cancel
                                        </button>
                                        <button type="submit" disabled={isLoading} className="bg-red-600 text-white font-bold py-4 px-12 rounded-2xl shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3">
                                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                            Create Service
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Unified Filters & Controls Bar */}
            <div className="bg-white p-4 rounded-2xl border-2 border-red-50 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Search */}
                    <div className="flex-1 min-w-[200px] relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Name, ID or keyword..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-500 transition-all font-medium"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className="w-full lg:w-48 relative">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm text-gray-900 focus:outline-none focus:border-red-500 transition-all font-medium appearance-none cursor-pointer"
                        >
                            <option value="all" className="text-gray-900">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id} className="text-gray-900">{cat.title}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    {/* Results Count & Reset */}
                    <div className="flex items-center gap-3 px-2 border-l-0 lg:border-l-2 border-gray-100 flex-shrink-0">
                        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                            Found <span className="text-red-600">{filteredServices.length}</span> services
                        </div>
                        {(searchTerm || selectedCategory !== "all") && (
                            <button
                                onClick={clearFilters}
                                className="p-1.5 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                                title="Reset Filters"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    {/* Show Cards (Page Limit) */}
                    <div className="flex items-center gap-3 flex-shrink-0 lg:ml-auto">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Show:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-xl py-2 px-3 focus:outline-none focus:border-red-500 font-bold"
                        >
                            <option value={6}>6</option>
                            <option value={12}>12</option>
                            <option value={24}>24</option>
                            <option value={48}>48</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedServices.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white border-2 rounded-2xl p-6 transition-all group relative border-red-100 hover:border-red-300 hover:shadow-xl"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-100">
                                    <img
                                        src={service.image || "/services/general.png"}
                                        alt={service.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => (e.currentTarget.src = "/services/general.png")}
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 line-clamp-1" title={service.name}>{service.name}</h3>
                                    <p className="text-[10px] text-gray-400 font-mono">#{service.id.slice(-5)}</p>
                                </div>
                            </div>

                            {/* Action Buttons with Spacing */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleEditClick(service)}
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Edit Service"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(service.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete Service"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="text-sm border-t border-gray-100 pt-3">
                                <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">Category</span>
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">{service.category?.title}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm pt-2">
                                <div>
                                    <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">Price</span>
                                    <span className="font-bold text-red-600">{service.price}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">Time</span>
                                    <span className="text-gray-700 flex items-center gap-1 text-xs">
                                        <Clock className="w-3 h-3" />
                                        {service.time || "-"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 bg-white p-4 rounded-xl border-2 border-red-50">
                <div className="text-sm text-gray-600">
                    Showing <span className="font-bold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredServices.length)}</span> of <span className="font-bold text-gray-900">{filteredServices.length}</span> results
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg disabled:opacity-50 transition-colors">Previous</button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
                            <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 rounded-lg text-sm font-medium ${currentPage === i + 1 ? "bg-red-600 text-white" : "text-gray-600 hover:bg-red-50"}`}>{i + 1}</button>
                        ))}
                    </div>
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg disabled:opacity-50 transition-colors">Next</button>
                </div>
            </div>

            {/* Edit Modal (Keeping for consistency, but making labels black/bold) */}
            <AnimatePresence>
                {isEditModalOpen && editingService && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white border-2 border-gray-200 rounded-3xl p-8 w-full max-w-lg shadow-2xl relative overflow-y-auto max-h-[90vh]">
                            <button onClick={() => setIsEditModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"><X className="w-6 h-6" /></button>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Service Details</h2>
                            <form action={handleUpdateService} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-900 ml-1">Service Name</label>
                                        <input name="name" type="text" required defaultValue={editingService.name} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-900 ml-1">Category</label>
                                        <select name="categoryId" required defaultValue={editingService.categoryId} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all appearance-none cursor-pointer">
                                            {categories.map(cat => <option key={cat.id} value={cat.id} className="text-gray-900">{cat.title}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-900 ml-1">Full Description</label>
                                    <textarea name="description" defaultValue={editingService.description} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 h-32 text-gray-900 font-medium focus:outline-none focus:border-red-500 transition-all resize-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-900 ml-1">Price</label>
                                        <input name="price" type="text" required defaultValue={editingService.price} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-red-600 font-bold focus:outline-none focus:border-red-500 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-900 ml-1">Time</label>
                                        <input name="time" type="text" defaultValue={editingService.time} className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 ml-1 mb-2">Service Image</label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-100 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all group">
                                            <div className="flex flex-col items-center justify-center pt-3 pb-4">
                                                <div className="bg-red-50 p-2 rounded-xl mb-2 group-hover:scale-110 transition-transform">
                                                    <Camera className="w-6 h-6 text-red-600" />
                                                </div>
                                                <p className="text-xs text-gray-900 font-bold">Update Photo</p>
                                            </div>
                                            <input name="image" type="file" accept="image/*" className="hidden" onChange={validateImage} />
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" disabled={isLoading} className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl mt-4 shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3">
                                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            <span>Save Changes</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Image Size Error Modal */}
            <AnimatePresence>
                {imageError && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-red-500" />
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AlertTriangle className="w-10 h-10 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Image Size Issue</h3>
                            <p className="text-gray-600 font-medium mb-8 leading-relaxed">
                                {imageError}
                            </p>
                            <button
                                onClick={() => setImageError(null)}
                                className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Check className="w-5 h-5" />
                                <span>I Understand</span>
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
