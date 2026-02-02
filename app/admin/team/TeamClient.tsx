"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, User, Facebook, Twitter, Instagram, Loader2, Camera, Check, ChevronDown, Save, Edit2, X } from "lucide-react";
import { createTeamMember, deleteTeamMember, updateTeamMember } from "./actions";

interface TeamClientProps {
    teamMembers: any[];
}

export default function TeamClient({ teamMembers }: TeamClientProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<any | null>(null);

    return (
        <div className="space-y-8 pb-20">
            {/* Add New Team Member Card (Collapsible) */}
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
                        <h2 className="text-xl font-bold text-gray-900">Add New Member</h2>
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
                                    await createTeamMember(formData);
                                    setIsLoading(false);
                                    setIsAddOpen(false);
                                }} className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">

                                    {/* Left Column: Personal Info */}
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">FullName</label>
                                            <input name="name" required type="text" placeholder="e.g. John Doe" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all placeholder:font-normal" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">Role</label>
                                            <input name="role" required type="text" placeholder="e.g. Senior Technician" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all placeholder:font-normal" />
                                        </div>
                                    </div>

                                    {/* Middle Column: Social Links */}
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">Social Media Links</label>
                                            <div className="space-y-3">
                                                <div className="relative group">
                                                    <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                                    <input name="facebook" type="text" placeholder="Facebook Profile Link" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 pl-12 text-xs text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all placeholder:font-normal" />
                                                </div>
                                                <div className="relative group">
                                                    <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                                                    <input name="twitter" type="text" placeholder="Twitter Profile Link" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 pl-12 text-xs text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all placeholder:font-normal" />
                                                </div>
                                                <div className="relative group">
                                                    <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-pink-600 transition-colors" />
                                                    <input name="instagram" type="text" placeholder="Instagram Profile Link" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 pl-12 text-xs text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all placeholder:font-normal" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Profile Photo */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 ml-1">Profile Photo</label>
                                        <label className="flex flex-col items-center justify-center w-full h-[210px] border-2 border-gray-100 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-red-300 transition-all group">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <div className="bg-red-50 p-4 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                                                    <Camera className="w-8 h-8 text-red-600" />
                                                </div>
                                                <p className="text-xs text-gray-900 font-bold mb-1 px-4 text-center">Click to upload or drag and drop</p>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-2">Professional portrait</p>
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
                                            Add Team Member
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member) => {
                    let socials = { facebook: "#", twitter: "#", instagram: "#" };
                    try { socials = JSON.parse(member.socials); } catch (e) { }

                    return (
                        <div key={member.id} className="bg-white p-6 rounded-2xl border-2 border-red-50 shadow-sm relative group text-center hover:border-red-200 transition-all flex flex-col">
                            <div className="w-24 h-24 mx-auto rounded-full bg-gray-100 overflow-hidden relative mb-4 ring-4 ring-gray-50 shadow-inner group-hover:ring-red-50 transition-all">
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                ) : (
                                    <User className="w-12 h-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-300" />
                                )}
                            </div>

                            <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 truncate w-full">{member.name}</h3>
                            <p className="text-xs text-red-600 font-bold uppercase tracking-widest bg-red-50/50 py-1 px-3 rounded-full w-fit mx-auto mb-4 truncate max-w-full">{member.role}</p>

                            <div className="flex justify-center gap-4 mb-6">
                                {socials.facebook && socials.facebook !== "#" && (
                                    <a href={socials.facebook} className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                        <Facebook size={16} />
                                    </a>
                                )}
                                {socials.twitter && socials.twitter !== "#" && (
                                    <a href={socials.twitter} className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white transition-all shadow-sm">
                                        <Twitter size={16} />
                                    </a>
                                )}
                                {socials.instagram && socials.instagram !== "#" && (
                                    <a href={socials.instagram} className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all shadow-sm">
                                        <Instagram size={16} />
                                    </a>
                                )}
                            </div>

                            <div className="flex items-center gap-2 pt-4 border-t border-gray-50 mt-auto">
                                <button
                                    onClick={() => setEditingMember(member)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-gray-50 text-gray-600 font-bold hover:bg-red-50 hover:text-red-600 transition-all text-sm"
                                >
                                    <Edit2 size={14} />
                                    <span>Edit</span>
                                </button>
                                <form action={async () => {
                                    if (confirm("Are you sure?")) {
                                        await deleteTeamMember(member.id);
                                    }
                                }}>
                                    <button className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                        <Trash2 size={16} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {editingMember && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setEditingMember(null)}
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
                                    <h2 className="text-2xl font-bold text-gray-900">Edit Team Member</h2>
                                    <p className="text-gray-500 font-medium text-sm">Update profile details and links</p>
                                </div>
                                <button
                                    onClick={() => setEditingMember(null)}
                                    className="p-3 bg-white rounded-2xl text-gray-400 hover:text-gray-900 hover:shadow-lg transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form action={async (formData) => {
                                setIsLoading(true);
                                await updateTeamMember(editingMember.id, formData);
                                setIsLoading(false);
                                setEditingMember(null);
                            }} className="p-8">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Left Column: Personal */}
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">FullName</label>
                                            <input
                                                name="name"
                                                defaultValue={editingMember.name}
                                                required
                                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">Role</label>
                                            <input
                                                name="role"
                                                defaultValue={editingMember.role}
                                                required
                                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Middle Column: Socials */}
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">Social Media Links</label>
                                            <div className="space-y-3">
                                                <div className="relative group">
                                                    <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                                    <input
                                                        name="facebook"
                                                        defaultValue={JSON.parse(editingMember.socials || "{}").facebook}
                                                        placeholder="Facebook Link"
                                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 pl-12 text-xs text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all"
                                                    />
                                                </div>
                                                <div className="relative group">
                                                    <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                                                    <input
                                                        name="twitter"
                                                        defaultValue={JSON.parse(editingMember.socials || "{}").twitter}
                                                        placeholder="Twitter Link"
                                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 pl-12 text-xs text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all"
                                                    />
                                                </div>
                                                <div className="relative group">
                                                    <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-pink-600 transition-colors" />
                                                    <input
                                                        name="instagram"
                                                        defaultValue={JSON.parse(editingMember.socials || "{}").instagram}
                                                        placeholder="Instagram Link"
                                                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 pl-12 text-xs text-gray-900 font-bold focus:outline-none focus:border-red-500 transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Photo */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 ml-1">Update Photo</label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-20 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0 ring-4 ring-gray-50 border-2 border-white shadow-sm">
                                                <img src={editingMember.image} alt="Current" className="w-full h-full object-cover" />
                                            </div>
                                            <label className="flex-1 flex flex-col items-center justify-center h-20 border-2 border-gray-100 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-red-300 transition-all group">
                                                <div className="flex items-center gap-2">
                                                    <Camera className="w-4 h-4 text-red-600" />
                                                    <span className="text-xs text-gray-900 font-bold">Replace photo</span>
                                                </div>
                                                <input name="image" type="file" accept="image/*" className="hidden" />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-4 mt-8 pt-8 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setEditingMember(null)}
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
                                        Update Member
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
