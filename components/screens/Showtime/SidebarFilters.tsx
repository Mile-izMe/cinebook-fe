import CitySelection from "@/features/city/components/CitySelection";
import FormatSelection from "@/features/showtime/components/FormatSelection";

interface SidebarFilterProps {
  selectedCityId: string | undefined;
  setSelectedCityId: (cityId: string | undefined) => void;
  selectedFormat: string;
  setSelectedFormat: (format: string) => void;
}

function SidebarFilters({
  selectedCityId,
  setSelectedCityId,
  selectedFormat,
  setSelectedFormat,
}: SidebarFilterProps) {
  return (
    <div className="space-y-6">
      <CitySelection
        selectedCityId={selectedCityId}
        setSelectedCityId={setSelectedCityId}
      />

      <FormatSelection
        selectedFormat={selectedFormat}
        setSelectedFormat={setSelectedFormat}
      />
    </div>
  );
}

export default SidebarFilters;
