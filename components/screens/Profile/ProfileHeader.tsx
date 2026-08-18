import { Award } from "lucide-react";

function ProfileHeader() {
  return (
    <div className="bg-brand-dark/40 border-b border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Award className="w-8 h-8 text-brand-red fill-brand-red/10" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              User Profile
            </h1>
            <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mt-1.5">
              Manage your personal details, visual avatars, and active movie
              stats.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
