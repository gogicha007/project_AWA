# project_AWA

## Authorization

- **Frontend** authorization done by firebase, sign up stores name to firebase.
- request to have bearer with token.
- **Backend** authorization has auth.guard and interceptor(user-sync.interceptor)
  - auth guard
    1. checks if bearer containes the token
    2. checks if is cached and not expired.
    3. if it is not cached, it accesses firebase to verify the authorization of the token.
    4. adds user credentials(firebase uid, name, email) to the request.
  - interceptor
    - it caches user
    - if not cached checks if requested user is in db and updates with firebase credentials.

## Backend logger

## Tables
### Material group

- Pipe
- Fitting
- Valve
- Strainer
- Other

### Material type

- PE100 PIPE : pipe
- PE100 BEND : fitting
- PE100 REDUCER : fitting
- PE100 TEE : fitting
- PE100 COUPLER : fitting
- PE100 END CAP : fitting
- PE100 CROSS : fitting
- PE100 VALVE : valve
- STEEL PIPE : pipe
- STEEL FLANGE : fitting
- CI PIPE : pipe
- CI REDUCER : fitting
- CI TEE : fitting
- CI CROSS : fitting
- CI VALVE : valve
- CI DISMANTLING JOINT : fitting
