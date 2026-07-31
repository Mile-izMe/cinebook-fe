import CitySelection from "@/features/city/components/CitySelection";
import FormatSelection from "@/features/showtime/components/FormatSelection";

function SidebarFilters() {
  return (
    <div className="space-y-6">
      <CitySelection />
      <FormatSelection />
    </div>
  );
}

export default SidebarFilters;
