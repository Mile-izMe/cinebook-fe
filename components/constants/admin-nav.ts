import {
  Building2,
  CalendarDays,
  DoorOpen,
  Film,
  LayoutDashboard,
  LayoutGrid,
  MapPin,
  Ticket,
  Users,
} from "lucide-react";

export const ADMIN_NAV_LINKS = [
  {
    title: "Overview",
    items: [{ name: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "Movie Management",
    items: [{ name: "Movies", href: "/admin/movies", icon: Film }],
  },
  {
    title: "Cinema Management",
    items: [
      { name: "Cities", href: "/admin/cities", icon: MapPin },
      { name: "Cinemas", href: "/admin/cinemas", icon: Building2 },
      { name: "Rooms", href: "/admin/rooms", icon: DoorOpen },
    ],
  },
  {
    title: "Workspace & Visuals",
    items: [
      { name: "Seat Map Editor", href: "/admin/seat-editor", icon: LayoutGrid },
    ],
  },
  {
    title: "Operation",
    items: [
      { name: "Showtimes", href: "/admin/showtimes", icon: CalendarDays },
      { name: "Bookings", href: "/admin/bookings", icon: Ticket },
    ],
  },
  {
    title: "System",
    items: [{ name: "Users", href: "/admin/users", icon: Users }],
  },
];
