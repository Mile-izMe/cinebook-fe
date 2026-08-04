## Server state (React-Query || SWR) vs Client state (Zustand) - 03/08

**Root Problem**: IF I DELETED THIS DATA, CAN I RECALCULATE OR REFETCH IT FROM WHAT I HAVE?
-> If "YES" -> No need to save state to zustand, derive when it renders.
-> If "NO" -> It comes from user's action, no where knows -> It's the state should be saved.

E.g:

1. movie, cinema, room, ... -> Deleted and call API to get it again -> No need to save state, let React Query cache.
2. selectedSeats, ... -> Deleted then it gone forever cause no API knows which seat user selected -> Zustand
3. totalPrice, ... -> Deleted then selectedSeats.reduce(...) gave the same answers → Not need saving, recalculate once renders.

- Server State (movie, seat, cinema, seatMap ...) -> React Query, key by ID from URL/route/param (Source of truth)
- Client State (selectedSeats, currentShowtime, vouchers, paymentMethod, ...) -> Zustand, data from user created, UI state

- Route/URL param => SOURCE OF TRUTH, zustand only "brings" for page if there is no param included (checkout, ...)


## Optimistic Lock - Pessimistic Lock - Redis Lock - 04/08

**Root Problem**: IF MANY USERS DISPUTE FOR THE SAME RESOURCE
-> WHO WAIT - HOW TO WAIT - WAIT FOR HOW LONG

**Mechanism**:
- Optimistic: Check version before UPDATE, if version is wrong -> Retry
    + Suitable for READ over WRITE, little CONFLICT
    + E.g: update user profile, update orders, ...
- Pessimistic: SELECT FOR UPDATE, lock until data is commit/rollback
    + Suitable for WRITE, high CONFLICT, data related to payment, financial
    + E.g: minus bank amount, ... (happen in ms)
- Redis lock: lock outside DB, TTL, auto unlock when timeout
    + Suitable when there is time between user & user (mins)
    + E.g: select seat, concert booking ticket, ...

**What if**: USER HOLDING LOCK CRASH, WILL RESOURCE AUTO UNLOCK?
- Optimistic: N/A (No one hold lock)
- Pessimistic: App crash, no auto unlock -> Deadlock
- Redis lock: Auto release after TTL

**Applied to Project**:
- Use Redis Lock: User need an enough time to decide, select seat and payment (5 mins)