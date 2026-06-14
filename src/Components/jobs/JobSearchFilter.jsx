
import { useState } from "react";
import {
    TextField,
    InputGroup,
    Label,
    Select,
    ListBox,
    Button,
} from "@heroui/react";
import { Magnifier, Xmark } from "@gravity-ui/icons";

const labelClass = "block text-xs font-medium text-zinc-400 mb-1.5";

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

const CATEGORIES = ["Development", "Design", "Marketing", "Sales", "Finance"];
const JOB_TYPES = ["Full-time", "Part-time", "Remote", "Contract", "Internship"];

export default function JobSearchFilter({ onFilterChange }) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [jobType, setJobType] = useState("");

    const hasActiveFilters =
        search || category || jobType;

    const handleApply = () => {
        onFilterChange?.({
            search,
            category,
            jobType,
        });
    };

    const handleReset = () => {
        setSearch("");
        setCategory("");
        setJobType("");
        onFilterChange?.({});
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl pb-3">

            <div className="px-5 py-4 border-b border-zinc-800">
                <TextField
                    value={search}
                    onChange={(value) => setSearch(value)}
                    className="w-full"
                >
                    <span className="text-sm font-medium text-zinc-400 block mb-2">Search Jobs</span>
                    <InputGroup className="bg-zinc-800 border-zinc-700 hover:border-zinc-500 focus-within:border-zinc-400 focus:outline-none rounded-xl transition-all">
                        <InputGroup.Prefix className="pl-3 text-zinc-500">
                            <Magnifier className="w-4 h-4" />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                            placeholder="Title, company, or keywords..."
                            className="w-full bg-zinc-800 focus:border-zinc-400 focus:outline-none rounded-lg h-10 pl-9! pr-3 text-sm text-white placeholder:text-zinc-500"
                        />
                    </InputGroup>
                </TextField>
            </div>


            {/* Filters */}
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Category */}
                <div className="flex flex-col">
                    <Label className={labelClass}>Category</Label>
                    <Select
                        name="category"
                        selectedKey={category}
                        onSelectionChange={setCategory}
                    >
                        <Button variant="bordered" className={selectButtonClass}>
                            <Select.Value placeholder="All categories" />
                            <Select.Indicator />
                        </Button>
                        <Select.Popover className="bg-zinc-800 border border-zinc-700 rounded-lg">
                            <ListBox className="bg-zinc-800 text-zinc-200 text-sm">
                                {CATEGORIES.map((c) => (
                                    <ListBox.Item key={c.toLowerCase()} id={c.toLowerCase()}>
                                        {c}
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* Job Type */}
                <div className="flex flex-col">
                    <Label className={labelClass}>Job type</Label>
                    <Select
                        name="jobType"
                        selectedKey={jobType}
                        onSelectionChange={setJobType}
                    >
                        <Button variant="bordered" className={selectButtonClass}>
                            <Select.Value placeholder="All types" />
                            <Select.Indicator />
                        </Button>
                        <Select.Popover className="bg-zinc-800 border border-zinc-700 rounded-lg">
                            <ListBox className="bg-zinc-800 text-zinc-200 text-sm">
                                {JOB_TYPES.map((t) => (
                                    <ListBox.Item key={t.toLowerCase()} id={t.toLowerCase()}>
                                        {t}
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>

                </div>
            </div>
            {/* Footer actions */}
            <div className=" flex items-center gap-3 px-4 pb-4">
                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                        <Xmark className="w-3.5 h-3.5" />
                        Clear filters
                    </button>
                )}
                <div className="ml-auto">
                    <Button
                        type="button"
                        color="primary"
                        className="rounded-xl px-6 h-10 text-sm font-medium"
                        onPress={handleApply}
                    >
                        Apply filters
                    </Button>
                </div>
            </div>
        </div>
    );
}