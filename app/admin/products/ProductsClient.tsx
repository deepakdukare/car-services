"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Plus,
    Trash2,
    X,
    Loader2,
    Edit,
    Check,
    PlusCircle,
    MinusCircle,
    Image as ImageIcon,
    Upload
} from "lucide-react";
import { createProduct, deleteProduct, updateProduct } from "../actions";

interface Feature {
    title: string;
    description: string;
}

interface ProductsClientProps {
    products: any[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Image Preview State
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Dynamic Features State
    const [formFeatures, setFormFeatures] = useState<Feature[]>([{ title: "", description: "" }]);

    const filteredProducts = products.filter(product => {
        return product.cardTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = (product: any) => {
        setEditingProduct(product);
        setImagePreview(product.cardImage);

        // Parse features from string
        const parsedFeatures: Feature[] = (product.features?.split('\n') || [])
            .filter((f: string) => f.trim())
            .map((f: string) => {
                const [title, ...descParts] = f.split(':');
                return {
                    title: title.trim(),
                    description: descParts.join(':').trim()
                };
            });

        setFormFeatures(parsedFeatures.length > 0 ? parsedFeatures : [{ title: "", description: "" }]);
        setIsEditModalOpen(true);
    };

    const handleAddModalOpen = () => {
        setFormFeatures([{ title: "", description: "" }]);
        setImagePreview(null);
        setIsAddModalOpen(true);
    };

    const handleFeatureChange = (index: number, field: keyof Feature, value: string) => {
        const newFeatures = [...formFeatures];
        newFeatures[index][field] = value;
        setFormFeatures(newFeatures);
    };

    const addFeatureField = () => {
        setFormFeatures([...formFeatures, { title: "", description: "" }]);
    };

    const removeFeatureField = (index: number) => {
        if (formFeatures.length > 1) {
            setFormFeatures(formFeatures.filter((_, i) => i !== index));
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            await deleteProduct(id);
        }
    };

    const featuresString = formFeatures
        .filter(f => f.title.trim())
        .map(f => `${f.title.trim()}: ${f.description.trim()}`)
        .join('\n');

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-black tracking-tight">Product Management</h1>
                    <p className="text-black mt-1">Manage main products like Tyres and Engine Oil.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={handleAddModalOpen} className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-4 py-2 rounded-lg shadow-lg shadow-red-500/20 transition-all transform hover:scale-105 active:scale-95">
                        <Plus className="w-4 h-4" />
                        <span>Add Product</span>
                    </button>
                </div>
            </div>

            {/* Product Filter */}
            <div className="bg-white p-6 rounded-2xl border-2 border-red-50 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-100 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                {filteredProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white border-2 rounded-2xl p-6 transition-all group relative border-red-100 hover:border-red-300 hover:shadow-xl flex flex-col lg:flex-row gap-6"
                    >
                        {/* Admin Overlay Actions */}
                        <div className="absolute top-4 right-4 z-20 flex gap-2">
                            <button onClick={() => handleEditClick(product)} className="p-2 bg-white/90 backdrop-blur rounded-full text-blue-600 shadow-md hover:scale-110 transition-all">
                                <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(product.id)} className="p-2 bg-white/90 backdrop-blur rounded-full text-red-600 shadow-md hover:scale-110 transition-all">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Product Image */}
                        <div className="lg:w-1/3 relative h-48 lg:h-auto overflow-hidden rounded-xl border border-gray-100">
                            <img
                                src={product.cardImage || "/services/general.png"}
                                alt={product.cardTitle}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="lg:w-2/3 flex flex-col h-full bg-white">
                            <div className="mb-4">
                                <h4 className="text-red-600 text-xs font-bold tracking-widest uppercase mb-1">{product.title}</h4>
                                <h3 className="text-xl font-bold text-gray-900">{product.cardTitle}</h3>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{product.cardDesc}</p>

                            <div className="space-y-3 mb-6">
                                {(product.features?.split('\n') || []).slice(0, 4).map((feature: string, i: number) => {
                                    if (!feature) return null;
                                    const [title, ...descParts] = feature.split(':');
                                    const desc = descParts.join(':').trim();

                                    return (
                                        <div key={i} className="flex gap-2 text-xs text-black">
                                            <div className="w-4 h-4 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-2.5 h-2.5" />
                                            </div>
                                            <div>
                                                <span className="font-bold text-black">{title.trim()}</span>
                                                {desc && <span className="text-black block mt-0.5">{desc}</span>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                <div className="text-gray-900 font-bold text-sm">
                                    {product.phone}
                                </div>
                                <div className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full px-4 text-center">
                                    {product.ctaText}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Add Product Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white border-2 border-gray-200 rounded-2xl p-6 w-full max-w-3xl shadow-2xl relative overflow-y-auto max-h-[90vh]"
                        >
                            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Product</h2>
                            <form action={async (formData) => {
                                setIsLoading(true);
                                formData.set('features', featuresString);
                                await createProduct(formData);
                                setIsLoading(false);
                                setIsAddModalOpen(false);
                            }} className="grid grid-cols-1 md:grid-cols-12 gap-6">

                                {/* Left Column: Info */}
                                <div className="md:col-span-12 lg:col-span-7 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Banner Title</label>
                                            <input name="title" type="text" required className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:border-red-500" placeholder="e.g. Premium Engine Oil Change Services" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Banner Highlight</label>
                                            <input name="highlight" type="text" required className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:border-red-500" placeholder="e.g. for Japanese, American..." />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Title</label>
                                            <input name="cardTitle" type="text" required className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:border-red-500" placeholder="e.g. Engine Oil Service" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                            <input name="phone" type="text" required defaultValue="+971555350887" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:border-red-500" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Description</label>
                                        <textarea name="cardDesc" required className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:border-red-500 h-20" placeholder="Card description..." />
                                    </div>

                                    {/* Dynamic Features Builder */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Product Features</label>
                                            <button type="button" onClick={addFeatureField} className="text-red-600 hover:text-red-700 flex items-center gap-1 text-xs font-bold">
                                                <PlusCircle className="w-4 h-4" />
                                                Add Feature
                                            </button>
                                        </div>

                                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                            {formFeatures.map((feature, index) => (
                                                <div key={index} className="flex gap-3 items-start bg-gray-50 p-3 rounded-xl border border-gray-200 group relative">
                                                    <div className="flex-1 space-y-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Feature Title"
                                                            value={feature.title}
                                                            onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                                                            className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-red-500 font-bold text-black"
                                                        />
                                                        <textarea
                                                            placeholder="Feature Description"
                                                            value={feature.description}
                                                            onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                                                            className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-red-500 h-16 text-black"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFeatureField(index)}
                                                        className="text-gray-400 hover:text-red-600 transition-colors pt-2"
                                                    >
                                                        <MinusCircle className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Image & Settings */}
                                <div className="md:col-span-12 lg:col-span-5 space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Product Image</label>
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="group relative border-2 border-dashed border-gray-300 rounded-2xl aspect-video flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition-all overflow-hidden bg-gray-50"
                                        >
                                            {imagePreview ? (
                                                <>
                                                    <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                        <ImageIcon className="text-white w-8 h-8" />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-2 group-hover:bg-red-100 transition-colors">
                                                        <Upload className="w-6 h-6 text-red-600" />
                                                    </div>
                                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Upload Image</p>
                                                    <p className="text-[10px] text-gray-400 mt-1">Recommended: 800x600px</p>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            ref={fileInputRef}
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                                        <input name="ctaText" type="text" defaultValue="Book Now" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:border-red-500" />
                                    </div>

                                    <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-red-200 mt-auto">
                                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Product"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Edit Product Modal */}
            <AnimatePresence>
                {isEditModalOpen && editingProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white border-2 border-gray-200 rounded-2xl p-6 w-full max-w-3xl shadow-2xl relative overflow-y-auto max-h-[90vh]"
                        >
                            <button onClick={() => setIsEditModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Product</h2>
                            <form action={async (formData) => {
                                setIsLoading(true);
                                formData.set('features', featuresString);
                                await updateProduct(editingProduct.id, formData);
                                setIsLoading(false);
                                setIsEditModalOpen(false);
                                setEditingProduct(null);
                            }} className="grid grid-cols-1 md:grid-cols-12 gap-6">

                                {/* Left Column: Info */}
                                <div className="md:col-span-12 lg:col-span-7 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Banner Title</label>
                                            <input name="title" type="text" required defaultValue={editingProduct.title} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:border-red-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Banner Highlight</label>
                                            <input name="highlight" type="text" required defaultValue={editingProduct.highlight} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:border-red-500" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Title</label>
                                            <input name="cardTitle" type="text" required defaultValue={editingProduct.cardTitle} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:border-red-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                            <input name="phone" type="text" required defaultValue={editingProduct.phone} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:border-red-500" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Description</label>
                                        <textarea name="cardDesc" required defaultValue={editingProduct.cardDesc} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:border-red-500 h-20" />
                                    </div>

                                    {/* Dynamic Features Builder */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Product Features</label>
                                            <button type="button" onClick={addFeatureField} className="text-red-600 hover:text-red-700 flex items-center gap-1 text-xs font-bold">
                                                <PlusCircle className="w-4 h-4" />
                                                Add Feature
                                            </button>
                                        </div>

                                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                            {formFeatures.map((feature, index) => (
                                                <div key={index} className="flex gap-3 items-start bg-gray-50 p-3 rounded-xl border border-gray-200 group relative">
                                                    <div className="flex-1 space-y-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Feature Title"
                                                            value={feature.title}
                                                            onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                                                            className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-red-500 font-bold text-black"
                                                        />
                                                        <textarea
                                                            placeholder="Feature Description"
                                                            value={feature.description}
                                                            onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                                                            className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-red-500 h-16 text-black"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFeatureField(index)}
                                                        className="text-gray-400 hover:text-red-600 transition-colors pt-2"
                                                    >
                                                        <MinusCircle className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Image & Settings */}
                                <div className="md:col-span-12 lg:col-span-5 space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Product Image</label>
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="group relative border-2 border-dashed border-gray-300 rounded-2xl aspect-video flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all overflow-hidden bg-gray-50"
                                        >
                                            {imagePreview ? (
                                                <>
                                                    <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                        <ImageIcon className="text-white w-8 h-8" />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2 group-hover:bg-blue-100 transition-colors">
                                                        <Upload className="w-6 h-6 text-blue-600" />
                                                    </div>
                                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Upload Image</p>
                                                    <p className="text-[10px] text-gray-400 mt-1">Recommended: 800x600px</p>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            ref={fileInputRef}
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                                        <input name="ctaText" type="text" defaultValue={editingProduct.ctaText} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:border-red-500" />
                                    </div>

                                    <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-blue-200 mt-auto">
                                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Update Product"}
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
