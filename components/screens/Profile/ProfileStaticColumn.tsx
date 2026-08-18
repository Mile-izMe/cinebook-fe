import { User } from "@/features";
import { ActivityIcon, Award, Film, Ticket } from "lucide-react";

interface ProfileStaticColumnProps {
  user: User | null;
}

function ProfileStaticColumn({ user }: ProfileStaticColumnProps) {
  return (
    <div className="space-y-6">
      {/* Avatar Profile Card */}
      <div className="bg-brand-dark border border-white/5 rounded-2xl p-6 text-center space-y-4">
        <div className="relative inline-block">
          <img
            src={
              user?.avatarUrl ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
            }
            alt={user?.userName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-brand-red mx-auto object-cover"
          />
          <span className="absolute bottom-1 right-1 bg-brand-red text-white rounded-full p-1 border border-brand-dark">
            <Award className="w-4 h-4 fill-white" />
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="text-xs font-black text-white uppercase tracking-widest">
            {user?.userName}
          </h3>
          <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">
            {user?.email}
          </p>
        </div>

        <div className="pt-2">
          <button
            // onClick={() => setIsEditing(!isEditing)}
            className="w-full py-2.5 bg-brand-black border border-white/5 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl text-[10px] font-black transition-colors uppercase tracking-widest cursor-pointer"
          >
            {/* {isEditing ? "Cancel Edit" : "Edit Profile"} */}
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stat metrics bento */}
      <div className="bg-brand-dark border border-white/5 rounded-2xl p-6 space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5 border-b border-white/5 pb-3">
          <ActivityIcon className="w-4 h-4 text-brand-red" />
          <span>Cinema Loyalty Stats</span>
        </h4>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-black border border-white/5 p-4 rounded-xl space-y-1">
            <Ticket className="w-5 h-5 text-brand-red mx-auto" />
            <span className="text-zinc-500 text-[9px] uppercase font-black tracking-widest block">
              Tickets
            </span>
            <p className="text-xl font-black text-white">
              {/* {totalSeatsBooked} */} 2
            </p>
          </div>
          <div className="bg-black border border-white/5 p-4 rounded-xl space-y-1">
            <Film className="w-5 h-5 text-brand-red mx-auto" />
            <span className="text-zinc-500 text-[9px] uppercase font-black tracking-widest block">
              Bookings
            </span>
            <p className="text-xl font-black text-white">
              {/* {bookings.length} */} 3
            </p>
          </div>
        </div>

        <div className="bg-black border border-white/5 p-4 rounded-xl flex justify-between items-center text-xs">
          <span className="text-zinc-500 font-black uppercase tracking-widest">
            Total Investment
          </span>
          <span className="font-mono text-emerald-400 font-black text-xs">
            {/* ${totalAmountSpent.toFixed(2)} */} 300.000 VNĐ
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfileStaticColumn;
