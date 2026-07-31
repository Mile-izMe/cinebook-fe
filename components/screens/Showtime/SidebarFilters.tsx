import { ShowtimeQueryParams } from "@/features/showtime";
import CitySelection from "./CitySelection";
import FormatSelection from "./FormatSelection";

interface SidebarFiltersProps {
  filters: ShowtimeQueryParams;
  onFiltersChange(filters: Partial<ShowtimeQueryParams>): void;
}

function SidebarFilters({ filters, onFiltersChange }: SidebarFiltersProps) {
  return (
    <div className="space-y-6">
      <CitySelection
        value={filters.cityId ?? undefined}
        onChange={(cityId) => onFiltersChange({ cityId })}
      />

      <FormatSelection
        value={filters.format ?? undefined}
        onChange={(format) => onFiltersChange({ format })}
      />
    </div>
  );
}

export default SidebarFilters;
