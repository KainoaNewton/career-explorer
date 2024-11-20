import { Slider } from "@/components/ui/slider";

interface EducationFilterProps {
  minYears: number;
  maxYears: number;
  onChange: (min: number, max: number) => void;
}

export function EducationFilter({ minYears, maxYears, onChange }: EducationFilterProps) {
  return (
    <div className="bg-spotify-darkgray rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-bold">Years of Education</h3>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{minYears} years</span>
            <span>{maxYears} years</span>
          </div>
          <Slider
            defaultValue={[minYears, maxYears]}
            max={12}
            min={0}
            step={1}
            onValueChange={(values) => onChange(values[0], values[1])}
          />
        </div>
      </div>
    </div>
  );
}