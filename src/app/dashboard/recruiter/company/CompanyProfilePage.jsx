'use client'
import { useState, useRef } from 'react';
import { Button, Chip, Form, Select, ListBox } from "@heroui/react";
import { OfficeBadge, Pencil, CloudArrowUpIn } from "@gravity-ui/icons";
import Image from 'next/image';
import { createCompany } from '@/lib/actions/companies';
import { toast } from 'sonner';

// ── Style constants (matching your job form style) ──────────────────────────
const labelClass = "block text-xs font-medium text-zinc-400 mb-1.5";
const errorClass = "text-xs text-red-400 mt-1";
const inputClass = (hasError) =>
    `w-full border ${hasError ? "border-red-500" : "border-zinc-800"} bg-zinc-900 rounded-lg h-10 px-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors`;
const selectButtonClass =
    "w-full border border-zinc-800 bg-zinc-900 rounded-lg h-10 px-3 text-sm text-zinc-200 justify-between";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

const statusConfig = {
    pending: { label: "Pending", color: "warning" },
    approved: { label: "Approved", color: "success" },
    rejected: { label: "Rejected", color: "danger" },
};


// const mockCompany = {
//     name: "Acme Corp",
//     websiteUrl: "https://acme.com",
//     logoUrl: "https://...",
//     industry: "technology",
//     location: "Dhaka, Bangladesh",
//     employeeCount: "11-50",
//     description: "We build things.",
//     status: "pending",
// };

// ── No Company Prompt ────────────────────────────────────────────────────────
function NoCompanyPrompt({ onRegister }) {
    return (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-5">
                <OfficeBadge className="w-8 h-8 text-zinc-500" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-100 mb-2">No company registered</h2>
            <p className="text-sm text-zinc-500 max-w-sm mb-7">
                Register your company to start posting jobs and reaching candidates on Hireloop.
            </p>
            <Button
                onPress={onRegister}
                color="primary"
                className="rounded-xl px-7 h-11 font-medium"
            >
                Register Company
            </Button>
        </div>
    );
}

// ── Logo Uploader ────────────────────────────────────────────────────────────
function LogoUploader({ logoUrl, setLogoUrl, setLogoUploading, logoUploading }) {
    const fileRef = useRef(null);

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setLogoUploading(true);
        try {
            const formData = new FormData();
            formData.append("image", file);
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.success) setLogoUrl(data.data.url);
        } catch (err) {
            console.error("Logo upload failed", err);
        } finally {
            setLogoUploading(false);
        }
    };

    return (
        <div>
            <label className={labelClass}>Company Logo</label>
            <div
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-4 border border-zinc-800 bg-zinc-900 rounded-lg px-4 py-3 cursor-pointer hover:border-zinc-600 transition-colors"
            >
                {logoUrl ? (
                    <Image src={logoUrl} alt="Company logo" width={40} height={40} className="rounded-lg object-cover" />
                ) : (
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                        <CloudArrowUpIn className="w-5 h-5 text-zinc-500" />
                    </div>
                )}
                <div>
                    <p className="text-sm text-zinc-300">
                        {logoUploading ? "Uploading..." : logoUrl ? "Change image" : "Upload image"}
                    </p>
                    <p className="text-xs text-zinc-600">PNG, JPG up to 5MB</p>
                </div>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </div>
    );
}

// ── Company Form (Register + Edit) ──────────────────────────────────────────
function CompanyForm({ initial = {}, onCancel, onSave, recruiterId }) {
    const [errors, setErrors] = useState({});
    const [logoUrl, setLogoUrl] = useState(initial.logoUrl || "");
    const [logoUploading, setLogoUploading] = useState(false);

    const validate = (fields) => {
        const e = {};
        if (!fields.name?.trim()) e.name = "Company name is required.";
        if (!fields.websiteUrl?.trim()) e.websiteUrl = "Website URL is required.";
        if (!fields.industry) e.industry = "Please select an industry.";
        if (!fields.location?.trim()) e.location = "Location is required.";
        if (!fields.employeeCount) e.employeeCount = "Please select employee count.";
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const fields = Object.fromEntries(fd.entries());

        // validate first before hitting the API
        const errs = validate(fields);
        if (Object.keys(errs).length) { setErrors(errs); return; }

        const payload = { ...fields, logoUrl, recruiterId };

        try {
            const result = await createCompany(payload);
            if (result) {
                toast.success("Company registered successfully!");
                onSave(payload);
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <section className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-zinc-800">
                    <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                        Company information
                    </h2>
                </div>

                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Company Name */}
                    <div>
                        <label className={labelClass}>Company Name</label>
                        <input
                            name="name"
                            defaultValue={initial.name}
                            placeholder="e.g. Acme Corp"
                            className={inputClass(errors.name)}
                        />
                        {errors.name && <p className={errorClass}>{errors.name}</p>}
                    </div>

                    {/* Industry */}
                    <div className="flex flex-col">
                        <label className={labelClass}>Industry / Category</label>
                        <Select name="industry" defaultSelectedKey={initial.industry}>
                            <Button variant="bordered" className={selectButtonClass + (errors.industry ? " border-red-500!" : "")}>
                                <Select.Value placeholder="Select industry" />
                                <Select.Indicator />
                            </Button>
                            <Select.Popover className="bg-zinc-800 border border-zinc-700 rounded-lg">
                                <ListBox className="bg-zinc-800 text-zinc-200 text-sm">
                                    <ListBox.Item id="technology">Technology</ListBox.Item>
                                    <ListBox.Item id="finance">Finance</ListBox.Item>
                                    <ListBox.Item id="healthcare">Healthcare</ListBox.Item>
                                    <ListBox.Item id="education">Education</ListBox.Item>
                                    <ListBox.Item id="retail">Retail</ListBox.Item>
                                    <ListBox.Item id="marketing">Marketing</ListBox.Item>
                                    <ListBox.Item id="other">Other</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                        {errors.industry && <p className={errorClass}>{errors.industry}</p>}
                    </div>

                    {/* Website URL */}
                    <div>
                        <label className={labelClass}>Website URL</label>
                        <div className={`flex items-center border ${errors.websiteUrl ? "border-red-500" : "border-zinc-800"} bg-zinc-900 rounded-lg h-10 overflow-hidden`}>
                            <span className="px-3 text-sm text-zinc-600 border-r border-zinc-800 h-full flex items-center">https://</span>
                            <input
                                name="websiteUrl"
                                defaultValue={initial.websiteUrl?.replace(/^https?:\/\//, "")}
                                placeholder="www.company.com"
                                className="flex-1 bg-transparent px-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none"
                            />
                        </div>
                        {errors.websiteUrl && <p className={errorClass}>{errors.websiteUrl}</p>}
                    </div>

                    {/* Location */}
                    <div>
                        <label className={labelClass}>Location</label>
                        <input
                            name="location"
                            defaultValue={initial.location}
                            placeholder="City, Country"
                            className={inputClass(errors.location)}
                        />
                        {errors.location && <p className={errorClass}>{errors.location}</p>}
                    </div>

                    {/* Employee Count */}
                    <div className="flex flex-col">
                        <label className={labelClass}>Employee Count Range</label>
                        <Select name="employeeCount" defaultSelectedKey={initial.employeeCount}>
                            <Button variant="bordered" className={selectButtonClass + (errors.employeeCount ? " border-red-500!" : "")}>
                                <Select.Value placeholder="Select range" />
                                <Select.Indicator />
                            </Button>
                            <Select.Popover className="bg-zinc-800 border border-zinc-700 rounded-lg">
                                <ListBox className="bg-zinc-800 text-zinc-200 text-sm">
                                    <ListBox.Item id="1-10">1–10 employees</ListBox.Item>
                                    <ListBox.Item id="11-50">11–50 employees</ListBox.Item>
                                    <ListBox.Item id="51-200">51–200 employees</ListBox.Item>
                                    <ListBox.Item id="201-500">201–500 employees</ListBox.Item>
                                    <ListBox.Item id="500+">500+ employees</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                        {errors.employeeCount && <p className={errorClass}>{errors.employeeCount}</p>}
                    </div>

                    {/* Logo */}
                    <div>
                        <LogoUploader
                            logoUrl={logoUrl}
                            setLogoUrl={setLogoUrl}
                            logoUploading={logoUploading}
                            setLogoUploading={setLogoUploading}
                        />
                    </div>

                    {/* Description */}
                    <div className="sm:col-span-2">
                        <label className={labelClass}>Brief Description</label>
                        <textarea
                            name="description"
                            defaultValue={initial.description}
                            rows={4}
                            placeholder="Tell us about your company's mission and culture..."
                            className="w-full border border-zinc-800 bg-zinc-900 rounded-lg px-3 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors resize-none"
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pb-8">
                <Button
                    type="button"
                    variant="bordered"
                    className="w-full sm:w-auto border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-xl px-6 h-11"
                    onPress={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    color="primary"
                    isDisabled={logoUploading}
                    className="w-full sm:w-auto rounded-xl px-6 h-11 font-medium"
                >
                    {initial.name ? "Save changes" : "Register Company"}
                </Button>
            </div>
        </form>
    );
}

// ── Company Details View ─────────────────────────────────────────────────────
function CompanyDetails({ company, onEdit }) {
    const status = statusConfig[company.status] ?? statusConfig.pending;

    return (
        <section className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
                <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                    Company profile
                </h2>
                <div className="flex items-center gap-3">
                    <Chip color={status.color} size="sm" variant="soft">{status.label}</Chip>
                    <Button
                        size="sm"
                        variant="bordered"
                        className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-lg h-8 px-3 gap-1.5"
                        onPress={onEdit}
                    >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                    </Button>
                </div>
            </div>

            <div className="p-5">
                {/* Logo + Name */}
                <div className="flex items-center gap-4 mb-6">
                    {company.logoUrl ? (
                        <Image
                            src={company.logoUrl}
                            alt={company.name}
                            width={56}
                            height={56}
                            className="rounded-xl object-cover border border-zinc-800"
                        />
                    ) : (
                        <div className="w-14 h-14 rounded-xl bg-zinc-800 flex items-center justify-center">
                            <OfficeBadge className="w-7 h-7 text-zinc-500" />
                        </div>
                    )}
                    <div>
                        <h3 className="text-base font-semibold text-zinc-100">{company.name}</h3>
                        <a
                            href={company.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            {company.websiteUrl}
                        </a>
                    </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                    <div>
                        <p className="text-xs text-zinc-600 mb-1">Industry</p>
                        <p className="text-sm text-zinc-300 capitalize">{company.industry}</p>
                    </div>
                    <div>
                        <p className="text-xs text-zinc-600 mb-1">Location</p>
                        <p className="text-sm text-zinc-300">{company.location}</p>
                    </div>
                    <div>
                        <p className="text-xs text-zinc-600 mb-1">Employees</p>
                        <p className="text-sm text-zinc-300">{company.employeeCount}</p>
                    </div>
                </div>

                {/* Description */}
                {company.description && (
                    <div>
                        <p className="text-xs text-zinc-600 mb-1.5">About</p>
                        <p className="text-sm text-zinc-300 leading-relaxed">{company.description}</p>
                    </div>
                )}
            </div>
        </section >
    );
}

// ── Main Page ────────────────────────────────────────────────────────────────
const CompanyProfilePage = ({ recruiter, recruiterCompany }) => {
    const [company, setCompany] = useState(recruiterCompany ?? null);
    const [mode, setMode] = useState("view"); // "view" | "register" | "edit"

    const handleSave = (data) => {
        // TODO: replace with real API call
        setCompany({ ...data, status: company?.status ?? "pending" });
        setMode("view");
    };

    if (!company?._id && mode !== "register") {
        return (
            <div className="max-w-3xl mx-auto px-4 py-8">
                <NoCompanyPrompt onRegister={() => setMode("register")} />
            </div>
        );
    }

    if (mode === "register" || mode === "edit") {
        return (
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-zinc-100">
                        {mode === "edit" ? "Edit Company" : "Register New Company"}
                    </h1>
                    <p className="text-sm text-zinc-500 mt-1">
                        {mode === "edit"
                            ? "Update your company details."
                            : "Enter your business details to start hiring on Hireloop."}
                    </p>
                </div>
                <CompanyForm
                    initial={mode === "edit" ? company : {}}
                    onCancel={() => setMode(company ? "view" : "view")}
                    onSave={handleSave}
                    recruiterId={recruiter?.id}
                />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-zinc-100">Company Profile</h1>
                <p className="text-sm text-zinc-500 mt-1">Manage your company information.</p>
            </div>
            <CompanyDetails company={company} onEdit={() => setMode("edit")} />
        </div>
    );
};

export default CompanyProfilePage;