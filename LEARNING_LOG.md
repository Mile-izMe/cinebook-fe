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
  - Suitable for READ over WRITE, little CONFLICT
  - E.g: update user profile, update orders, ...
- Pessimistic: SELECT FOR UPDATE, lock until data is commit/rollback
  - Suitable for WRITE, high CONFLICT, data related to payment, financial
  - E.g: minus bank amount, ... (happen in ms)
- Redis lock: lock outside DB, TTL, auto unlock when timeout
  - Suitable when there is time between user & user (mins)
  - E.g: select seat, concert booking ticket, ...

**What if**: USER HOLDING LOCK CRASH, WILL RESOURCE AUTO UNLOCK?

- Optimistic: N/A (No one hold lock)
- Pessimistic: App crash, no auto unlock -> Deadlock
- Redis lock: Auto release after TTL

**Applied to Project**:

- Use Redis Lock: User need an enough time to decide, select seat and payment (5 mins)

## Redis Distributed Lock

## 1. Problem

Many requests can currency book the same seat for 1 time.

Ex:

```
Request A ─┐
           ├──> Showtime S1 + Seat A1
Request B ─┘
```

If only execute _check-then-insert_, both transaction can be both inserted to db => race conditin

## 2. Basic Acquire lock

SET KEY VALUE NX PX {ttl}

WHERE:
NX: Only create when key not exists.
PX: set TTL by milliseconds.
VALUE: unique value for each acquire.
ttl: avoid locking foverer when owner crash.

Ex:

SET lock:seat:S1:A1 550e8400-e29b-41d4-a716-446655440000 NX PX 10000 4.
-> Why we should not unlock by using **DEL**?

Failure scenario:
A acquire lock with token-A
↓
A handle over the TTL
↓
Lock expires
↓
B acquire the same key but with token-B
↓
A finish and call DEL
↓
A delete lock of B

So, only owner with the right token can release lock.

## 3. Atomic unlock by Lua Script

```ts
   if redis.call("get", KEYS[1]) == ARGV[1] then
   return redis.call("del", KEYS[1])
   else
   return 0
   end
```

GET lock
→ compare token
→ DEL lock

=> No other command inserted between get and del.

## 4. Single Redis instance & replication failover

- A Redis instance can provide mutual exclusion in lock range with valid -> single point of failure.
- Primary–replica failover also not enough to ensure lock is safe if replication is asynchronous.

Failure scenario:

A acquire lock in primary
↓
Primary crash before replicate
↓
Replica promoted
↓
B acquire same lock in new primary
↓
A & B believe they are the owner of lock 7 => Redlock born

- Redlock use many independent Redis master: R1 R2 R3 R4 R5

- Client only seem to acquire success when:
  - Acquire is locked among 3/5 master.
  - Total time to acquired is less than TTL.
  - Lock still has valid time after minus acquire time.
  - If not reach enough quorum, client release other acquired locks.

=> Increase complexity & network overhead.

## 5. Watchdog

- TTL create liveness: owner dead then the last lock expired.
- However, critical section can run longer than TTL. Watchdog solve by extending expiration time when owner is active.

Acquire lock
↓
Renew TTL periodic
↓
Critical section finish
↓
Release lock

- If process died:

Renewal stop
↓
TTL end
↓
Lock leased

=> Watchdog is not only the mechanism for Redlock; It applied for common lease-based locks.

## 6. Redisson

- Redisson is a framework provide distributed synchronization primitives base on Redis.

- Related possibilities:

Distributed reentrant lock.
Ownership checking.
Atomic Lua operations.
Lock watchdog.
Waiting và notification.
Fair lock.
Fenced lock.
Semaphore & other synchronizers.
