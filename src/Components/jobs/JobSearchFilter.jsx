import {
    TextField,
    InputGroup,
    Label,
    Select,
    ListBox,
    Button,
    Switch,
} from "@heroui/react";
import { Magnifier, Xmark } from "@gravity-ui/icons";

const labelClass = "block text-xs font-medium text-zinc-400 mb-4";

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

export default function JobSearchFilter({
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedCategory,
    setSelectedCategory,
    isRemoteOnly,
    setIsRemoteOnly,
}) {
    const hasActiveFilters =
        searchQuery || selectedType !== "all" || selectedCategory !== "all" || isRemoteOnly;

    const handleReset = () => {
        setSearchQuery("");
        setSelectedType("all");
        setSelectedCategory("all");
        setIsRemoteOnly(false);
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl pb-3">



            {/* Filters */}
            <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="">
                    <TextField
                        value={searchQuery}
                        onChange={(value) => setSearchQuery(value)}
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

                {/* Category */}
                <div className="flex flex-col">
                    <Label className={labelClass}>Category</Label>
                    <Select
                        name="category"
                        selectedKey={selectedCategory}
                        onSelectionChange={setSelectedCategory}
                    >
                        <Button variant="bordered" className={selectButtonClass}>
                            <Select.Value />
                            <Select.Indicator />
                        </Button>
                        <Select.Popover className="bg-zinc-800 border border-zinc-700 rounded-lg">
                            <ListBox className="bg-zinc-800 text-zinc-200 text-sm">
                                <ListBox.Item id="all">All Categories</ListBox.Item>
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
                        selectedKey={selectedType}
                        onSelectionChange={setSelectedType}
                    >
                        <Button variant="bordered" className={selectButtonClass}>
                            <Select.Value />
                            <Select.Indicator />
                        </Button>
                        <Select.Popover className="bg-zinc-800 border border-zinc-700 rounded-lg">
                            <ListBox className="bg-zinc-800 text-zinc-200 text-sm">
                                <ListBox.Item id="all">All Types</ListBox.Item>
                                {JOB_TYPES.map((t) => (
                                    <ListBox.Item key={t.toLowerCase()} id={t.toLowerCase()}>
                                        {t}
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* Remote */}
                <div className="md:col-span-1 flex items-center justify-start md:justify-center h-10 mt-6 pb-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={isRemoteOnly}
                            onChange={(e) => setIsRemoteOnly(e.target.checked)}
                            className="accent-purple-500 w-4 h-4 rounded bg-zinc-800 border-zinc-700 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-zinc-300">Remote</span>
                    </label>
                </div>

            </div>

            {/* Footer actions */}
            {hasActiveFilters && (
                <div className="flex items-center gap-3 p-4">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                        <Xmark className="w-3.5 h-3.5" />
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}