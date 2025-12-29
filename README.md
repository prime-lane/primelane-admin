# PrimeLane

Frontend repo for PrimeLane.

## Development

### Clone the repo

```bash
gh repo clone primelane/primelane
```

### Install dependencies

```bash
npm install
```

### Run the app

## Storybook

The design system is available in Storybook at `http://localhost:6006`.

```bash
npm run dev
```

### Run Storybook

```bash
npm run storybook
```

## AI Guidance

For automated code generation and AI assistance:

- See `/ai/ai-instructions.md`
- Follow `/ai/prd.md`

TODO:

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
- [ ] all reviews page
- [x] Home page (pending endpoint, dont' use this `/analytics/my-ride-stats`)
- [x] new endpoint for managing vehcile activation status (kycDetails.is_vehicle_set)
- [x] use kyc.is vehicle set to conditionally render vehicle details
- [x] update category dropdown , (list of categories)
- [x] add remaining summary card
- [x] filter button
- [x] updating vehicle category endpoint (dependent on chijiooke)


BACKEND
- [x] update driver/vehicle (pending, awaiting for chijiooke response)
- [x] Home/summary page (pending endpoint)
- [x] identity details - (pending endpoint) /kyc/my-kyc is not for admin
- [x] endpoint for admin to view customer ratings by id
- [x] fetch wallet by id
- [x] update user endpoint should allow intl passport
- [x] disable nin on edit customer; submit empty string
- [x] update vehicle category
- [ ] trip cancellation fee (pending)
- [ ] settlements