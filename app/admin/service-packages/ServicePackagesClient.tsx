"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit, Save, X, Layers, Check, CheckCircle2, Loader2, GripVertical, ChevronDown } from "lucide-react";
import { updateServicePackage, createServicePackage, deleteServicePackage } from "../actions";

interface ServicePackagesClientProps {
    packages: any[];
}

export default function ServicePackagesClient({ packages }: ServicePackagesClientProps) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editingPkg, setEditingPkg] = useState<any>(null);

    // Initial state for a new package
    const initialNewPkg = {
        title: "",
        price: "",
        highlighted: false,
        featuresList: [
            { label: "Oil change", included: true },
            { label: "Oil filter replacement", included: true },
            { label: "Air & AC filter replacement", included: true }
        ]
    };

    const [newPkg, setNewPkg] = useState(initialNewPkg);

    const handleEditClick = (pkg: any) => {
        setEditingPkg({
            ...pkg,
            featuresList: JSON.parse(pkg.features || '[]')
        });
    };

    const handleFeatureChange = (target: 'new' | 'edit', index: number, label: string) => {
        if (target === 'new') {
            const newList = [...newPkg.featuresList];
            newList[index].label = label;
            setNewPkg({ ...newPkg, featuresList: newList });
        } else {
            const newList = [...editingPkg.featuresList];
            newList[index].label = label;
            setEditingPkg({ ...editingPkg, featuresList: newList });
        }
    };

    const handleFeatureToggle = (target: 'new' | 'edit', index: number) => {
        if (target === 'new') {
            const newList = [...newPkg.featuresList];
            newList[index].included = !newList[index].included;
            setNewPkg({ ...newPkg, featuresList: newList });
        } else {
            const newList = [...editingPkg.featuresList];
            newList[index].included = !newList[index].included;
            setEditingPkg({ ...editingPkg, featuresList: newList });
        }
    };

    const addFeature = (target: 'new' | 'edit') => {
        if (target === 'new') {
            setNewPkg({
                ...newPkg,
                featuresList: [...newPkg.featuresList, { label: "", included: true }]
            });
        } else {
            setEditingPkg({
                ...editingPkg,
                featuresList: [...editingPkg.featuresList, { label: "", included: true }]
            });
        }
    };

    const removeFeature = (target: 'new' | 'edit', index: number) => {
        if (target === 'new') {
            const newList = newPkg.featuresList.filter((_, i) => i !== index);
            setNewPkg({ ...newPkg, featuresList: newList });
        } else {
            const newList = editingPkg.featuresList.filter((_, i) => i !== index);
            setEditingPkg({ ...editingPkg, featuresList: newList });
        }
    };

    const saveChanges = async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("title", editingPkg.title);
        formData.append("price", editingPkg.price);
        formData.append("highlighted", editingPkg.highlighted.toString());
        formData.append("features", JSON.stringify(editingPkg.featuresList));

        await updateServicePackage(editingPkg.id, formData);
        setIsLoading(false);
        setEditingPkg(null);
    };

    const handleCreate = async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("title", newPkg.title);
        formData.append("price", newPkg.price);
        formData.append("highlighted", newPkg.highlighted.toString());
        formData.append("features", JSON.stringify(newPkg.featuresList));

        await createServicePackage(formData);
        setIsLoading(false);
        setIsAddOpen(false);
        setNewPkg(initialNewPkg);
    };

    return (
        <div className="space-y-8">
            {/* Inline Add New Package Form (Collapsible) */}
            <div className="bg-white border-2 border-red-50 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full -mr-16 -mt-16" />

                <button
                    onClick={() => setIsAddOpen(!isAddOpen)}
                    className="w-full flex items-center justify-between p-6 hover:bg-red-50/50 transition-colors text-left"
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isAddOpen ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600'}`}>
                            <Plus className={`w-5 h-5 transition-transform duration-300 ${isAddOpen ? 'rotate-45' : ''}`} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Add New Service Package</h2>
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
                            <div className="p-8 pt-0 border-t border-red-50 space-y-8 mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 ml-1">Package Title</label>
                                        <input
                                            value={newPkg.title}
                                            onChange={(e) => setNewPkg({ ...newPkg, title: e.target.value })}
                                            placeholder="e.g. Extra Full Service"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all placeholder:font-normal"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 ml-1">Price Label</label>
                                        <input
                                            value={newPkg.price}
                                            onChange={(e) => setNewPkg({ ...newPkg, price: e.target.value })}
                                            placeholder="e.g. 2499 AED + VAT"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-red-600 font-bold focus:outline-none focus:border-red-500 transition-all placeholder:font-normal"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 bg-red-50/50 p-4 rounded-2xl border-2 border-red-50 w-fit">
                                    <input
                                        type="checkbox"
                                        id="new-highlighted"
                                        checked={newPkg.highlighted}
                                        onChange={(e) => setNewPkg({ ...newPkg, highlighted: e.target.checked })}
                                        className="w-5 h-5 rounded accent-red-600 cursor-pointer"
                                    />
                                    <label htmlFor="new-highlighted" className="text-sm font-bold text-gray-900 cursor-pointer">
                                        Highlight as "Popular" Package
                                    </label>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between ml-1">
                                        <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">Features & Inclusions</label>
                                        <button
                                            onClick={() => addFeature('new')}
                                            className="text-xs font-bold text-black hover:text-red-600 flex items-center gap-1.5 px-4 py-2 bg-gray-100 rounded-xl transition-colors"
                                        >
                                            <Plus className="w-4 h-4" /> Add Feature
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {newPkg.featuresList.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-2xl border-2 border-gray-50 hover:border-gray-200 transition-all shadow-sm">
                                                <button
                                                    onClick={() => handleFeatureToggle('new', index)}
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${feature.included ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                                                >
                                                    {feature.included ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                                                </button>
                                                <input
                                                    value={feature.label}
                                                    onChange={(e) => handleFeatureChange('new', index, e.target.value)}
                                                    placeholder="Enter feature..."
                                                    className={`flex-1 bg-transparent text-sm font-bold text-black focus:outline-none ${!feature.included && 'line-through opacity-40'}`}
                                                />
                                                <button
                                                    onClick={() => removeFeature('new', index)}
                                                    className="p-2 text-red-400 hover:text-red-600 transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end gap-4 border-t border-gray-100 mt-8">
                                    <button
                                        onClick={() => setIsAddOpen(false)}
                                        className="px-8 py-4 rounded-2xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleCreate}
                                        disabled={isLoading || !newPkg.title || !newPkg.price}
                                        className="bg-red-600 text-white font-bold py-4 px-12 rounded-2xl shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3"
                                    >
                                        {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-5 h-5" />}
                                        Create Package
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {packages.map((pkg) => {
                    const features = JSON.parse(pkg.features || '[]');

                    return (
                        <div key={pkg.id} className={`bg-white border-2 rounded-2xl p-6 transition-all relative flex flex-col ${pkg.highlighted ? 'border-red-500 shadow-xl' : 'border-red-50 hover:border-red-200'}`}>
                            {pkg.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                    POPULAR
                                </div>
                            )}

                            <div className="flex justify-between items-start mb-6">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900">{pkg.title}</h3>
                                    <p className="text-red-600 font-bold text-lg mt-1">{pkg.price}</p>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8 flex-1">
                                {features.slice(0, 6).map((f: any, i: number) => (
                                    <li key={i} className={`flex items-start gap-2 text-sm ${f.included ? 'text-gray-900' : 'text-gray-400 line-through'}`}>
                                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${f.included ? 'text-green-600' : 'text-gray-300'}`} />
                                        <span className="font-medium">{f.label}</span>
                                    </li>
                                ))}
                                {features.length > 6 && (
                                    <li className="text-xs font-bold text-red-600 pt-1">
                                        +{features.length - 6} more features
                                    </li>
                                )}
                            </ul>

                            <button
                                onClick={() => handleEditClick(pkg)}
                                className="w-full py-4 rounded-2xl border-2 border-red-50 text-gray-900 font-bold text-sm hover:bg-red-50 hover:border-red-100 transition-all mt-auto"
                            >
                                Edit Details
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Edit Modal (Keeping Edit as a modal for focused adjustment) */}
            {editingPkg && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditingPkg(null)} />

                    <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Edit Package</h2>
                                <p className="text-sm text-gray-500 mt-0.5">Customize your service bundle offerings.</p>
                            </div>
                            <button onClick={() => setEditingPkg(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 overflow-y-auto flex-1 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-900 ml-1">Package Title</label>
                                    <input
                                        value={editingPkg.title}
                                        onChange={(e) => setEditingPkg({ ...editingPkg, title: e.target.value })}
                                        placeholder="e.g. Major Service"
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-900 ml-1">Price Label</label>
                                    <input
                                        value={editingPkg.price}
                                        onChange={(e) => setEditingPkg({ ...editingPkg, price: e.target.value })}
                                        placeholder="e.g. 1899 AED + VAT"
                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-red-600 font-bold focus:outline-none focus:border-red-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-red-50/50 p-4 rounded-2xl border-2 border-red-50">
                                <input
                                    type="checkbox"
                                    id="highlighted"
                                    checked={editingPkg.highlighted}
                                    onChange={(e) => setEditingPkg({ ...editingPkg, highlighted: e.target.checked })}
                                    className="w-5 h-5 rounded accent-red-600"
                                />
                                <label htmlFor="highlighted" className="text-sm font-bold text-gray-900 cursor-pointer">
                                    Highlight as "Popular" Package
                                </label>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-sm font-bold text-gray-900 uppercase">Features & Inclusions</label>
                                    <button
                                        onClick={() => addFeature('edit')}
                                        className="text-xs font-bold text-black hover:text-red-600 flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Add Feature
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {editingPkg.featuresList.map((feature: any, index: number) => (
                                        <div key={index} className="flex items-center gap-3 group">
                                            <div className="cursor-grab text-gray-300 group-hover:text-gray-400">
                                                <GripVertical className="w-4 h-4" />
                                            </div>
                                            <button
                                                onClick={() => handleFeatureToggle('edit', index)}
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${feature.included ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                                            >
                                                {feature.included ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                                            </button>
                                            <input
                                                value={feature.label}
                                                onChange={(e) => handleFeatureChange('edit', index, e.target.value)}
                                                placeholder="Enter feature description..."
                                                className={`flex-1 bg-white border-2 border-gray-100 rounded-xl p-3 text-sm text-black font-bold focus:outline-none focus:border-red-500 transition-all ${!feature.included && 'line-through opacity-40'}`}
                                            />
                                            <button
                                                onClick={() => removeFeature('edit', index)}
                                                className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-100 flex gap-4 bg-gray-50/50">
                            {editingPkg.id && (
                                <button
                                    onClick={async () => {
                                        if (confirm("Confirm delete? This cannot be undone.")) {
                                            setIsLoading(true);
                                            await deleteServicePackage(editingPkg.id);
                                            setIsLoading(false);
                                            setEditingPkg(null);
                                        }
                                    }}
                                    className="px-6 py-4 rounded-2xl bg-white border-2 border-red-100 text-red-600 font-bold hover:bg-red-50 transition-all active:scale-95"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            )}
                            <button
                                onClick={saveChanges}
                                disabled={isLoading}
                                className="flex-1 bg-red-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        <span>Save Changes</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
