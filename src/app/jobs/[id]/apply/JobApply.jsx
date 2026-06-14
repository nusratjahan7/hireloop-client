"use client";
import { useState } from "react";
import { Form, Button, TextField, Label, Input, Description, FieldError, TextArea } from "@heroui/react";
import { Link, Paperclip, Person, TextAlignLeft, CircleDollar, Clock } from "@gravity-ui/icons";
import { toast } from "sonner";
import { submitApplication } from "@/lib/actions/submitApplication";

const labelClass = "block text-xs font-medium text-zinc-400 mb-1.5";
const inputClass = "w-full bg-zinc-800 border border-zinc-700 hover:border-zinc-500 focus:border-zinc-400 focus:outline-none rounded-lg h-10 px-3 text-sm text-white placeholder:text-zinc-500";

const JobApply = ({ job, applicant }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const payload = {
            jobId: job?._id,
            jobTitle: job?.jobTitle,
            companyId: job?.companyId,
            companyName: job?.companyName,
            applicantId: applicant?.id,
            applicantName: applicant?.name,
            applicantEmail: applicant?.email,
            ...data,
            appliedAt: new Date().toISOString(),
            status: "pending",
        };

        const res = await submitApplication(payload);

        if (res.insertedId) {
            toast.success("Application submitted!");
            setIsSubmitting(false);
            window.location.href = `/jobs/${job._id}`;
        }
    };

    return (
        <div className="min-h-screen pb-20 px-6">
            <div className="max-w-2xl mx-auto flex flex-col gap-5">

                {/* Job header */}
                <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500/60 to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-blue-950/30 to-transparent pointer-events-none" />
                    <div className="relative p-6">
                        <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-1">
                            {job.companyName}
                        </p>
                        <h1 className="text-xl font-semibold text-white capitalize">{job.jobTitle}</h1>
                        <p className="text-sm text-zinc-500 mt-0.5 capitalize">
                            {job.jobCategory} · {job.jobType} · {job.isRemote ? "Remote" : job.location}
                        </p>
                    </div>
                </div>

                {/* Applicant */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">
                        Applying as
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400">
                            <Person className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">{applicant.name}</p>
                            <p className="text-xs text-zinc-500">{applicant.email}</p>
                        </div>
                    </div>
                </div>

                <Form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Resume */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Resume</p>

                        <TextField name="resumeUrl" isRequired className="flex flex-col">
                            <Label className={labelClass + " flex items-center gap-1.5"}>
                                <Paperclip className="w-3.5 h-3.5" />
                                Resume link
                            </Label>
                            <Input
                                placeholder="https://drive.google.com/your-resume"
                                className={inputClass}
                            />
                            <Description className="text-xs text-zinc-600 mt-1">
                                Google Drive, Dropbox, or any public URL.
                            </Description>
                            <FieldError className="text-xs text-red-400 mt-1" />
                        </TextField>

                        <TextField name="portfolioUrl" className="flex flex-col">
                            <Label className={labelClass}>
                                <span className="flex items-center gap-1.5">
                                    <Link className="w-3.5 h-3.5" />
                                    Portfolio / LinkedIn
                                    <span className="text-zinc-600 font-normal">(optional)</span>
                                </span>
                            </Label>
                            <Input
                                placeholder="https://linkedin.com/in/yourname"
                                className={inputClass}
                            />
                        </TextField>
                    </div>

                    {/* Optional */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                            Additional info
                            <span className="ml-2 normal-case font-normal text-zinc-600">(optional)</span>
                        </p>

                        <div className="flex flex-col">
                            <label className={labelClass}>
                                <span className="flex items-center gap-1.5">
                                    <TextAlignLeft className="w-3.5 h-3.5" />
                                    Cover note
                                </span>
                            </label>
                            <TextArea
                                name="coverNote"
                                placeholder="Tell the recruiter why you're a great fit..."
                                className="bg-zinc-800 border border-zinc-700 hover:border-zinc-500 focus:border-zinc-400 focus:outline-none rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 resize-none h-32 w-full"
                            />
                            <p className="text-xs text-zinc-600 mt-1">Keep it to 2–3 sentences.</p>
                        </div>

                        <TextField name="expectedSalary" className="flex flex-col">
                            <Label className={labelClass}>
                                <span className="flex items-center gap-1.5">
                                    <CircleDollar className="w-3.5 h-3.5" />
                                    Expected salary
                                </span>
                            </Label>
                            <Input placeholder="e.g. $2,000 / month" className={inputClass} />
                        </TextField>

                        <TextField name="availability" className="flex flex-col">
                            <Label className={labelClass}>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    Availability
                                </span>
                            </Label>
                            <Input placeholder="e.g. Available immediately, 2 weeks notice" className={inputClass} />
                        </TextField>
                    </div>

                    {/* Submit */}
                    <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />
                        <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-white">Submit your application</p>
                                <p className="text-xs text-zinc-500 mt-0.5">
                                    Deadline: {new Date(job.deadline).toLocaleDateString("en-GB", {
                                        day: "2-digit", month: "short", year: "numeric"
                                    })}
                                </p>
                            </div>
                            <Button
                                type="submit"
                                isDisabled={isSubmitting}
                                className="flex items-center justify-center w-full sm:w-auto text-white text-sm font-medium rounded-xl px-8 h-11"
                                style={{ backgroundColor: isSubmitting ? '#1d4ed8' : '#2563eb' }}
                                onMouseEnter={e => !isSubmitting && (e.currentTarget.style.backgroundColor = '#3b82f6')}
                                onMouseLeave={e => !isSubmitting && (e.currentTarget.style.backgroundColor = '#2563eb')}
                            >
                                {isSubmitting ? "Submitting…" : "Submit application"}
                            </Button>
                        </div>
                    </div>

                </Form>
            </div>
        </div>
    );
};

export default JobApply;