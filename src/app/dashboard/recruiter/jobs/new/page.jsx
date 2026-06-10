import {
    Form,
    Input,
    Select,
    Button,
    Switch,
    Label,
    ListBox,
    TextArea,
} from "@heroui/react";


const readonlyInputStyles = {
    label: "text-zinc-500 text-xs font-medium pb-1",
    inputWrapper: [
        "bg-zinc-800/40",
        "border border-zinc-800",
        "rounded-lg",
        "h-10",
        "shadow-none",
        "cursor-not-allowed",
        "opacity-60",
    ].join(" "),
    input: "text-zinc-400 text-sm cursor-not-allowed",
};


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

export default function NewJobPage() {
    return (
        <div className="min-h-screen  px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Page heading */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                        Post a new job
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1.5">
                        Fill in the details below to publish a new opening.
                    </p>
                </div>

                <Form className="space-y-5">

                    {/* ── Job Information ── */}
                    <section className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-zinc-800">
                            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                                Job information
                            </h2>
                        </div>

                        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Job Title — full width */}
                            <div className="sm:col-span-2">
                                <Label className={labelClass}>Job Title</Label>
                                <Input
                                    label="Job title"
                                    placeholder="e.g. Senior Frontend Developer"
                                    className="w-full border border-zinc-700 bg-zinc-800 shadow-none rounded-lg h-10 px-3"
                                />
                            </div>

                            {/* Category */}
                            <div className="flex flex-col">
                                <Label className={labelClass}>Category</Label>
                                <Select>
                                    <Button variant="bordered" className={selectButtonClass}>
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
                            </div>

                            {/* Job Type */}
                            <div className="flex flex-col">
                                <Label className={labelClass}>Job type</Label>
                                <Select>
                                    <Button variant="bordered" className={selectButtonClass}>
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
                            </div>

                            {/* Location */}
                            <div>
                                <Label className={labelClass}>Location</Label>
                                <Input
                                    label="Location"
                                    placeholder="e.g. Dhaka, Bangladesh"
                                    className="w-full border border-zinc-700 bg-zinc-800 shadow-none rounded-lg h-10 px-3"
                                />
                            </div>

                            {/* Deadline */}
                            <div>
                                <Label className={labelClass}>Deadline</Label>
                                <Input
                                    type="date"
                                    label="Application deadline"
                                    className="w-full border border-zinc-700 bg-zinc-800 shadow-none rounded-lg h-10 px-3"
                                />
                            </div>

                            {/* Salary: min / max / currency */}
                            <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">

                                <div>
                                    <Label className={labelClass}>Min Salary</Label>
                                    <Input
                                        type="number"
                                        label="Min salary"
                                        placeholder="500"
                                        className="w-full border border-zinc-700 bg-zinc-800 shadow-none rounded-lg h-10 px-3"
                                    />
                                </div>

                                <div>
                                    <Label className={labelClass}>Max Salary</Label>
                                    <Input
                                        type="number"
                                        label="Max salary"
                                        placeholder="1500"
                                        className="w-full border border-zinc-700 bg-zinc-800 shadow-none rounded-lg h-10 px-3"
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1 flex flex-col">
                                    <Label className={labelClass}>Currency</Label>
                                    <Select>
                                        <Button variant="bordered" className={selectButtonClass}>
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
                                </div>
                            </div>

                            {/* Remote toggle */}
                            <div className="sm:col-span-2 flex items-center gap-3 pt-1">
                                <Switch classNames={{ label: "text-sm text-zinc-300" }}>
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
                                <Label className="block text-sm font-medium text-zinc-400 mb-2">Responsibilities</Label>
                                <TextArea
                                    label="Responsibilities"
                                    rows={5}
                                    placeholder="List what the person in this role will do day-to-day..."
                                    className="w-full border border-zinc-700 bg-zinc-800 shadow-none rounded-lg  px-3"
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-zinc-400 mb-2">Requirements</Label>
                                <TextArea
                                    label="Requirements"
                                    rows={5}
                                    placeholder="Skills, experience, and qualifications needed..."
                                    className="w-full border border-zinc-700 bg-zinc-800 shadow-none rounded-lg  px-3"
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-zinc-400 mb-2 ">Benefits</Label>
                                <TextArea
                                    label="Benefits"
                                    rows={4}
                                    placeholder="Health cover, equity, flexible hours… (optional)"
                                    className="w-full border border-zinc-700 bg-zinc-800 shadow-none rounded-lg  px-3"
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
                            <Input
                                label="Company"
                                value="Acme Inc."
                                readOnly
                                classNames={readonlyInputStyles}
                            />
                            <Input
                                label="Status"
                                value="Approved"
                                readOnly
                                classNames={{
                                    ...readonlyInputStyles,
                                    input: "text-emerald-400 text-sm cursor-not-allowed",
                                }}
                            />
                            <Input
                                label="Plan usage"
                                value="2 / 10 active jobs"
                                readOnly
                                classNames={readonlyInputStyles}
                            />
                        </div>
                    </section>

                    {/* ── Footer ── */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pb-8">
                        <Button
                            variant="bordered"
                            className="w-full sm:w-auto border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-xl px-6 h-11"
                        >
                            Cancel
                        </Button>
                        <Button
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