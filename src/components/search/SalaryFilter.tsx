import { Input } from "@/components/ui/input";

interface SalaryFilterProps {
  salaryMin: string;
  salaryMax: string;
  onSalaryChange: (min: string, max: string) => void;
}

const SALARY_PRESETS = [
  { label: "Entry Level", min: 30000, max: 50000 },
  { label: "Mid Level", min: 50000, max: 80000 },
  { label: "Senior Level", min: 80000, max: 120000 },
  { label: "Executive", min: 120000, max: 200000 },
];

export function SalaryFilter({ salaryMin, salaryMax, onSalaryChange }: SalaryFilterProps) {
  return (
    <div className="bg-spotify-darkgray rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-bold">Salary Range</h3>
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={salaryMin}
            onChange={(e) => onSalaryChange(e.target.value, salaryMax)}
            className="bg-spotify-black"
          />
          <Input
            type="number"
            placeholder="Max"
            value={salaryMax}
            onChange={(e) => onSalaryChange(salaryMin, e.target.value)}
            className="bg-spotify-black"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-spotify-lightgray">Presets:</p>
          {SALARY_PRESETS.map((preset, index) => (
            <button
              key={index}
              onClick={() => onSalaryChange(preset.min.toString(), preset.max.toString())}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-sm"
            >
              {preset.label} (${preset.min.toLocaleString()} - ${preset.max.toLocaleString()})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}