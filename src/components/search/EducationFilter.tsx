interface EducationFilterProps {
  selectedRanges: string[];
  onChange: (ranges: string[]) => void;
}

const EDUCATION_RANGES = [
  { id: "1-2", label: "1-2 years" },
  { id: "3-4", label: "3-4 years" },
  { id: "5-6", label: "5-6 years" },
  { id: "7+", label: "7+ years" },
];

export function EducationFilter({ selectedRanges, onChange }: EducationFilterProps) {
  const toggleRange = (rangeId: string) => {
    const newRanges = selectedRanges.includes(rangeId)
      ? selectedRanges.filter(id => id !== rangeId)
      : [...selectedRanges, rangeId];
    onChange(newRanges);
  };

  return (
    <div className="bg-spotify-darkgray rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-bold">Years of Education</h3>
      <div className="space-y-2">
        {EDUCATION_RANGES.map((range) => (
          <button
            key={range.id}
            onClick={() => toggleRange(range.id)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              selectedRanges.includes(range.id)
                ? "bg-spotify-green text-white"
                : "hover:bg-white/10"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
}