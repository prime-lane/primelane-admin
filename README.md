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
- [ ] driver license from kyc
- [ ] vehicle details
- [ ] paginate from backend
- [ ] Price config page
- [ ] Finance
- [ ] Admin
- [ ] Home page (pending endpoint)
- [ ] improve loading screen (use skeleton)
- [ ] persist search params
- [ ] filter button
- [ ] trip status for trips/rides
- [ ] all reviews page



BACKEND
- [ ] update driver/vehicle (pending, awaiting for chijiooke response)
- [ ] Home/summary page (pending endpoint)
- [ ] identity details - (pending endpoint) /kyc/my-kyc is not for admin
- [ ] endpoint for admin to view customer ratings by id
- [ ] fetch wallet by id
- [ ] (de/a)ctivate user endpoint
- [ ] update user endpoint should allow intl passport
- [ ] disable nin on edit customer; submit empty string
- [ ] update vehicle category
- [ ] trip cancellation fee (pending)
- [ ] settlements