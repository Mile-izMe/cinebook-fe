## Server state (React-Query || SWR) vs Client state (Zustand)

- Server State (movie, seat, cinema, seatMap ...) -> React Query, key by ID from URL/route/param (Source of truth)
- Client State (selectedSeats, currentShowtime, vouchers, paymentMethod, ...) -> Zustand, data from user created, UI state

- Route/URL param => SOURCE OF TRUTH, zustand only "brings" for page if there is no param included (checkout, ...)
