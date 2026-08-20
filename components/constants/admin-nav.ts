import {
  LayoutDashboard,
  Film,
  Tags,
  Building2,
  MonitorPlay,
  CalendarDays,
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
    items: [
      { name: "Movies", href: "/admin/movies", icon: Film },
      { name: "Genres", href: "/admin/genres", icon: Tags },
    ],
  },
  {
    title: "Cinema Management",
    items: [
      { name: "Cities", href: "/admin/cities", icon: Building2 },
      { name: "Cinemas", href: "/admin/cinemas", icon: Building2 },
      { name: "Rooms & Seats", href: "/admin/rooms", icon: MonitorPlay },
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
