# PrimeLane

Frontend repo for PrimeLane.

## Development

### Clone the repo

```bash
gh repo clone primelane/primelane
```

### Install dependencies

```bash
pnpm install
```

### Run the app
```bash
pnpm run dev
```

### Run tests
```bash
pnpm run test
```

### Run build
```bash
pnpm run build
```

## Storybook

The design system is available in Storybook at `http://localhost:6006`.

### Run Storybook

```bash
pnpm run storybook
```

## TODO:
### FE
- [x] Design system
- [x] Components
- [x] Auth page
- [x] Customers
- [x] adjust home bg(admin)
- [x] Driver
- [x] Improve Layout (set max width)
- [x] Trips
- [x] adjust customers bg(admin)
- [x] Customers details
- [x] Trips details
- [x] identity details - (pending endpoint) /kyc/my-kyc is not for admin. avail types: nin,dl,ip
- [x] review
- [x] improve loading screen (use skeleton)
- [x] Price config page
- [x] (de/a)ctivate user endpoint (backend)
- [x] vehicle details
- [x] driver license from kyc
- [x] paginate from backend
- [x] trip status for trips/rides
- [x] Home page (pending endpoint, dont' use this `/analytics/my-ride-stats`)
- [x] new endpoint for managing vehcile activation status (kycDetails.is_vehicle_set)
- [x] use kyc.is vehicle set to conditionally render vehicle details
- [x] update category dropdown , (list of categories)
- [x] add remaining summary card
- [x] filter button
- [x] updating vehicle category endpoint (dependent on chijiooke)

### BACKEND
- [x] update driver/vehicle (pending, awaiting for chijiooke response)
- [x] Home/summary page (pending endpoint)
- [x] identity details - (pending endpoint) /kyc/my-kyc is not for admin
- [x] endpoint for admin to view customer ratings by id
- [x] fetch wallet by id
- [x] update user endpoint should allow intl passport
- [x] disable nin on edit customer; submit empty string
- [x] update vehicle category
- [x] map the category id to the vehicle-category name (vehicle category column under driver)
- [ ] trip cancellation fee (pending)
- [ ] settlements

## AI Guidance

For automated code generation and AI assistance:

- See `/ai/frontend-architecture.md`
- Follow `/ai/prd.md`