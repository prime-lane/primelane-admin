import { driver, type DriveStep, type Config } from 'driver.js'
import 'driver.js/dist/driver.css'
import { useMemo } from 'react'

const tourSteps: DriveStep[] = [
    {
        element: 'nav',
        popover: {
            title: 'Welcome to Primelane! 👋',
            description:
                'Let us show you around the dashboard. Click "Next" to begin the tour.',
            side: 'right',
            align: 'start',
        },
    },
    {
        element: '[data-tour="home"]',
        popover: {
            title: 'Home',
            description: 'Your dashboard overview with key metrics and insights.',
            side: 'right',
            align: 'center',
        },
    },
    {
        element: '[data-tour="customers"]',
        popover: {
            title: 'Customers',
            description: 'Manage all your customer accounts and view their details.',
            side: 'right',
            align: 'center',
        },
    },
    {
        element: '[data-tour="drivers"]',
        popover: {
            title: 'Drivers',
            description: 'Manage driver profiles, status, and assignments.',
            side: 'right',
            align: 'center',
        },
    },
    {
        element: '[data-tour="pricing-config"]',
        popover: {
            title: 'Pricing Configuration',
            description:
                'Configure pricing models and rates for different vehicle categories.',
            side: 'right',
            align: 'center',
        },
    },
    {
        element: '[data-tour="trips"]',
        popover: {
            title: 'Trips',
            description: 'View and manage all trip bookings and their statuses.',
            side: 'right',
            align: 'center',
        },
    },
    {
        element: '[data-tour="admin-mgmt"]',
        popover: {
            title: 'Admin Management',
            description:
                'Manage admin users, roles, and permissions for your organization.',
            side: 'right',
            align: 'center',
        },
    },
]

const driverConfig: Config = {
    showProgress: true,
    animate: true,
    smoothScroll: true,
    allowClose: true,
    popoverClass: 'primelane-tour-popover',
    progressText: '{{current}} of {{total}}',
    nextBtnText: 'Next',
    prevBtnText: 'Previous',
    doneBtnText: 'Done',
    steps: tourSteps,
}

export const useTour = () => {
    const driverObj = useMemo(() => driver(driverConfig), [])

    const startTour = () => {
        driverObj.drive()
    }

    return { startTour, driverObj }
}
