import { SeatMapRow, SeatMapSeat } from "@/features/booking";
import { Armchair } from "lucide-react";
import InformationWarning from "./InformationWarning";
import SeatComponent from "./SeatComponent";
import SeatingMapLegend from "./SeatingMapLegend";

interface SeatMapPanelProps {
  isLoading: boolean;
  rows: SeatMapRow[];
  selectedSeats: SeatMapSeat[];
  onSeatSelect: (seat: SeatMapSeat) => void;
}

function SeatMapPanel({
  isLoading,
  rows,
  selectedSeats,
  onSeatSelect,
}: SeatMapPanelProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-zinc-500 text-xs animate-pulse">
        <Armchair className="w-10 h-10 mb-2 animate-bounce" />
        <span>Creating theatrical grid...</span>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 space-y-8 bg-brand-dark border border-white/5 p-6 rounded-2xl">
      {/* Seating Header controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/5">
        <div>
          <h3 className="font-black text-white text-xs uppercase tracking-widest">
            Select Seats
          </h3>
          <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mt-1">
            Click seats in the map below to select them. Maximum 6 seats per
            booking.
          </p>
        </div>

        {/* Countdown seat hold timer */}
        {/* {selectedSeats.length > 0 && (
          <CountdownTimer initialMinutes={5} onExpire={handleTimerExpire} />
        )} */}
      </div>

      {/* Screen representation */}
      <div className="relative pt-12 pb-6 text-center">
        {/* Screen arc curve */}
        <div className="w-3/4 h-2 mx-auto bg-brand-red rounded-full shadow-[0_-5px_25px_rgba(229,9,20,0.8)]" />
        <div className="text-[9px] uppercase font-black tracking-widest text-zinc-500 mt-4">
          Theater Stage / Curved Laser Screen This Way
        </div>
      </div>

      {/* Seating map grid */}
      <div className="overflow-x-auto pb-4 scrollbar-thin">
        <div className="min-w-120 flex flex-col gap-3 py-6 items-center justify-center">
          {rows.map(({ row, seats }) => (
            <div key={row} className="flex items-center gap-4">
              {/* Left Row Label */}
              <span className="w-4 text-xs font-bold text-zinc-500 text-right select-none">
                {row}
              </span>

              {/* Seat row items */}
              <div className="flex gap-2">
                {seats.map((seat) => {
                  return (
                    <SeatComponent
                      key={seat.seatId}
                      seat={seat}
                      isSelected={selectedSeats.some(
                        (s) => s.seatId === seat.seatId,
                      )}
                      onSelect={onSeatSelect}
                    />
                  );
                })}
              </div>

              {/* Right Row Label */}
              <span className="w-4 text-xs font-bold text-zinc-500 text-left select-none">
                {row}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Seating Map Legend */}
      <SeatingMapLegend />

      {/* Information Warning */}
      <InformationWarning />
    </div>
  );
}

export default SeatMapPanel;
