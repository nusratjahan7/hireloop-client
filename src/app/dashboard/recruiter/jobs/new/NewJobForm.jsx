"use client"
import { useState } from "react";
import {
    Form,
    Select,
    Button,
    Switch,
    Label,
    ListBox,
} from "@heroui/react";
import { toast } from "sonner";
import { createJob } from "@/lib/actions/jobs";

const selectButtonClass = [
    "w-full justify-between",
    "bg-zinc-800",
    "border border-zinc-700",
    "hover:border-zinc-500",
    "text-zinc-300",
    "rounded-lg",
    "h-10 px-3",
    "text-sm font-normal",
    "shadow-none",
].join(" ");

const labelClass = "block text-xs font-medium text-zinc-400 mb-1.5";

const errorClass = "text-xs text-red-400 mt-1";

const inputClass = (hasError) =>
    [
        "w-full border shadow-none rounded-lg h-10 px-3 bg-zinc-800 text-white text-sm placeholder:text-zinc-500",
        "focus:outline-none",
        hasError
            ? "border-red-500 focus:border-red-400"
            : "border-zinc-700 hover:border-zinc-500 focus:border-zinc-400",
    ].join(" ");

const textareaClass = (hasError) =>
    [
        "w-full border shadow-none rounded-lg px-3 py-2 bg-zinc-800 text-white text-sm placeholder:text-zinc-500 resize-none",
        "focus:outline-none",
        hasError
            ? "border-red-500 focus:border-red-400"
            : "border-zinc-700 hover:border-zinc-500 focus:border-zinc-400",
    ].join(" ");

export default function NewJobForm({ company }) {

    // console.log("company info", company);

    // const [company] = useState({
    //     name: "Acme Corp (Auto-filled)",
    //     id: "company_123",
    //     isApproved: true,
    // });

    const [isRemote, setIsRemote] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!company.isApproved) {
        //     toast.error("Your company profile must be approved before you can post jobs.");
        //     return;
        // }

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const newErrors = {};
        if (!data.jobTitle) newErrors.jobTitle = "Job title is required";
        if (!data.jobCategory) newErrors.jobCategory = "Job category is required";
        if (!data.jobType) newErrors.jobType = "Job type is required";
        if (!data.minSalary) newErrors.minSalary = "Minimum salary is required";
        if (!data.maxSalary) newErrors.maxSalary = "Maximum salary is required";
        if (!data.currency) newErrors.currency = "Currency is required";
        if (!isRemote && !data.location) newErrors.location = "Location is required for non-remote roles";
        if (!data.deadline) newErrors.deadline = "Application deadline is required";
        if (!data.responsibilities) newErrors.responsibilities = "Responsibilities are required";
        if (!data.requirements) newErrors.requirements = "Requirements are required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const payload = {
            ...data,
            isRemote,
            companyId: company._id,
            companyName: company.name,
            companyLogo: company.logo,
            status: "active",
            isPubliclyVisible: true,
        };

        const res = await createJob(payload);

        if (res?.insertedId) {
            toast.success("Job posted successfully!");
            e.target.reset();
            setIsRemote(false);
            window.location.href = "/dashboard/recruiter/jobs";
        }
    };

    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                        Post a new job
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1.5">
                        Fill in the details below to publish a new opening.
                    </p>
                </div>

                <Form onSubmit={handleSubmit} className="space-y-5">

                    {/* ── Job Information ── */}
                    <section className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-zinc-800">
                            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                                Job information
                            </h2>
                        </div>

                        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Job Title */}
                            <div className="sm:col-span-2">
                                <Label className={labelClass}>Job Title</Label>
                                <input
                                    name="jobTitle"
                                    placeholder="e.g. Senior Frontend Developer"
                                    className={inputClass(errors.jobTitle)}
                                />
                                {errors.jobTitle && <p className={errorClass}>{errors.jobTitle}</p>}
                            </div>

                            {/* Category */}
                            <div className="flex flex-col">
                                <Label className={labelClass}>Category</Label>
                                <Select name="jobCategory">
                                    <Button
                                        variant="bordered"
                                        className={
                                            selectButtonClass +
                                            (errors.jobCategory ? " !border-red-500" : "")
                                        }
                                    >
                                        <Select.Value placeholder="Select category" />
                                        <Select.Indicator />
                                    </Button>
                                    <Select.Popover className="bg-zinc-800 border border-zinc-700 rounded-lg">
                                        <ListBox className="bg-zinc-800 text-zinc-200 text-sm">
                                            <ListBox.Item id="development">Development</ListBox.Item>
                                            <ListBox.Item id="design">Design</ListBox.Item>
                                            <ListBox.Item id="marketing">Marketing</ListBox.Item>
                                            <ListBox.Item id="sales">Sales</ListBox.Item>
                                            <ListBox.Item id="finance">Finance</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                                {errors.jobCategory && <p className={errorClass}>{errors.jobCategory}</p>}
                            </div>

                            {/* Job Type */}
                            <div className="flex flex-col">
                                <Label className={labelClass}>Job type</Label>
                                <Select name="jobType">
                                    <Button
                                        variant="bordered"
                                        className={
                                            selectButtonClass +
                                            (errors.jobType ? " !border-red-500" : "")
                                        }
                                    >
                                        <Select.Value placeholder="Select type" />
                                        <Select.Indicator />
                                    </Button>
                                    <Select.Popover className="bg-zinc-800 border border-zinc-700 rounded-lg">
                                        <ListBox className="bg-zinc-800 text-zinc-200 text-sm">
                                            <ListBox.Item id="full-time">Full-time</ListBox.Item>
                                            <ListBox.Item id="part-time">Part-time</ListBox.Item>
                                            <ListBox.Item id="remote">Remote</ListBox.Item>
                                            <ListBox.Item id="contract">Contract</ListBox.Item>
                                            <ListBox.Item id="internship">Internship</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                                {errors.jobType && <p className={errorClass}>{errors.jobType}</p>}
                            </div>

                            {/* Location */}
                            <div>
                                <Label className={labelClass}>
                                    Location
                                    {isRemote && (
                                        <span className="ml-2 text-zinc-500 font-normal">(not required for remote)</span>
                                    )}
                                </Label>
                                <input
                                    name="location"
                                    placeholder="e.g. Dhaka, Bangladesh"
                                    disabled={isRemote}
                                    className={
                                        inputClass(errors.location) +
                                        (isRemote ? " opacity-40 cursor-not-allowed" : "")
                                    }
                                />
                                {errors.location && <p className={errorClass}>{errors.location}</p>}
                            </div>

                            {/* Deadline */}
                            <div>
                                <Label className={labelClass}>Application Deadline</Label>
                                <input
                                    type="date"
                                    name="deadline"
                                    className={inputClass(errors.deadline) + " [color-scheme:dark]"}
                                />
                                {errors.deadline && <p className={errorClass}>{errors.deadline}</p>}
                            </div>

                            {/* Salary */}
                            <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                <div>
                                    <Label className={labelClass}>Min Salary</Label>
                                    <input
                                        type="number"
                                        name="minSalary"
                                        placeholder="500"
                                        className={inputClass(errors.minSalary)}
                                    />
                                    {errors.minSalary && <p className={errorClass}>{errors.minSalary}</p>}
                                </div>

                                <div>
                                    <Label className={labelClass}>Max Salary</Label>
                                    <input
                                        type="number"
                                        name="maxSalary"
                                        placeholder="1500"
                                        className={inputClass(errors.maxSalary)}
                                    />
                                    {errors.maxSalary && <p className={errorClass}>{errors.maxSalary}</p>}
                                </div>

                                <div className="col-span-2 sm:col-span-1 flex flex-col">
                                    <Label className={labelClass}>Currency</Label>
                                    <Select name="currency">
                                        <Button
                                            variant="bordered"
                                            className={
                                                selectButtonClass +
                                                (errors.currency ? " !border-red-500" : "")
                                            }
                                        >
                                            <Select.Value placeholder="Currency" />
                                            <Select.Indicator />
                                        </Button>
                                        <Select.Popover className="bg-zinc-800 border border-zinc-700 rounded-lg">
                                            <ListBox className="bg-zinc-800 text-zinc-200 text-sm">
                                                <ListBox.Item id="usd">USD — US Dollar</ListBox.Item>
                                                <ListBox.Item id="eur">EUR — Euro</ListBox.Item>
                                                <ListBox.Item id="bdt">BDT — Taka</ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                    {errors.currency && <p className={errorClass}>{errors.currency}</p>}
                                </div>
                            </div>

                            {/* Remote toggle */}
                            <div className="sm:col-span-2 flex items-center gap-3 pt-1">
                                <Switch
                                    isSelected={isRemote}
                                    onValueChange={setIsRemote}
                                    classNames={{ label: "text-sm text-zinc-300" }}
                                >
                                    Remote position
                                </Switch>
                                <span className="text-xs text-zinc-500">
                                    Visible to candidates filtering for remote roles
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* ── Job Description ── */}
                    <section className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-zinc-800">
                            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                                Job description
                            </h2>
                        </div>

                        <div className="p-5 flex flex-col gap-5">
                            <div>
                                <Label className="block text-xs font-medium text-zinc-400 mb-1.5">
                                    Responsibilities
                                </Label>
                                <textarea
                                    name="responsibilities"
                                    rows={5}
                                    placeholder="List what the person in this role will do day-to-day..."
                                    className={textareaClass(errors.responsibilities)}
                                />
                                {errors.responsibilities && <p className={errorClass}>{errors.responsibilities}</p>}
                            </div>

                            <div>
                                <Label className="block text-xs font-medium text-zinc-400 mb-1.5">
                                    Requirements
                                </Label>
                                <textarea
                                    name="requirements"
                                    rows={5}
                                    placeholder="Skills, experience, and qualifications needed..."
                                    className={textareaClass(errors.requirements)}
                                />
                                {errors.requirements && <p className={errorClass}>{errors.requirements}</p>}
                            </div>

                            <div>
                                <Label className="block text-xs font-medium text-zinc-400 mb-1.5">
                                    Benefits
                                    <span className="ml-1.5 text-zinc-500 font-normal">(optional)</span>
                                </Label>
                                <textarea
                                    name="benefits"
                                    rows={4}
                                    placeholder="Health cover, equity, flexible hours…"
                                    className={textareaClass(false)}
                                />
                            </div>
                        </div>
                    </section>

                    {/* ── Company Information ── */}
                    <section className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-zinc-800">
                            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                                Company
                            </h2>
                        </div>

                        <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1.5">Company</label>
                                <input
                                    value={company.name}
                                    readOnly
                                    className="w-full border border-zinc-800 bg-zinc-800/40 rounded-lg h-10 px-3 text-sm text-zinc-400 cursor-not-allowed opacity-60 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1.5">Status</label>
                                <input
                                    value={company.isApproved ? "Approved" : "Pending"}
                                    readOnly
                                    className={`w-full border border-zinc-800 bg-zinc-800/40 rounded-lg h-10 px-3 text-sm cursor-not-allowed opacity-60 focus:outline-none ${company.isApproved ? "text-emerald-400" : "text-amber-400"
                                        }`}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-1.5">Plan usage</label>
                                <input
                                    value="2 / 10 active jobs"
                                    readOnly
                                    className="w-full border border-zinc-800 bg-zinc-800/40 rounded-lg h-10 px-3 text-sm text-zinc-400 cursor-not-allowed opacity-60 focus:outline-none"
                                />
                            </div>
                        </div>
                    </section>

                    {/* ── Footer ── */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pb-8">
                        <Button
                            type="button"
                            variant="bordered"
                            className="w-full sm:w-auto border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-xl px-6 h-11"
                            onPress={() => window.history.back()}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            className="w-full sm:w-auto rounded-xl px-6 h-11 font-medium"
                        >
                            Publish job
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    );
}