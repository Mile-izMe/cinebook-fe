import { CityResponse } from "@/features/city";
import { ShowtimeQueryParams } from "@/features/showtime";
import CitySelection from "./Filter/CitySelection";
import FormatSelection from "./Filter/FormatSelection";

interface SidebarFiltersProps {
  cities?: CityResponse[];
  filters: ShowtimeQueryParams;
  onFiltersChange(filters: Partial<ShowtimeQueryParams>): void;
}

function SidebarFilters({
  cities,
  filters,
  onFiltersChange,
}: SidebarFiltersProps) {
  return (
    <div className="space-y-6">
      <CitySelection
        cities={cities}
        value={filters.cityId}
        onChange={(cityId) => onFiltersChange({ cityId })}
      />

      <FormatSelection
        value={filters.format}
        onChange={(format) => onFiltersChange({ format })}
      />
    </div>
  );
}

export default SidebarFilters;
