export const MOCK_DATA = [
    {
        id: '1',
        company: 'Neuralink',
        role: 'Full Stack Engineer',
        status: 'applied',
        date: '2026-01-25',
        salary: '$180k - $220k',
        nextStep: 'Awaiting Response',
        notes: 'Direct referral from Elon... just kidding.',
        contacts: [{ name: 'Siobhan Zilis', role: 'HR', email: 'sz@neuralink.com' }]
    },
    {
        id: '2',
        company: 'OpenAI',
        role: 'Product Designer',
        status: 'phone-screen',
        date: '2026-01-20',
        salary: '$190k - $240k',
        nextStep: 'Tech Interview scheduled for Friday',
        notes: 'Focused on UI for agentic workflows.',
        contacts: [{ name: 'Greg Brockman', role: 'CTO', email: 'greg@openai.com' }]
    },
    {
        id: '3',
        company: 'Anthropic',
        role: 'frontend Architect',
        status: 'onsite',
        date: '2026-01-15',
        salary: '$200k - $250k',
        nextStep: 'Final Culture Fit',
        notes: 'Claude team seems great. Aesthetic focus is high.',
        contacts: []
    },
    {
        id: '4',
        company: 'Stripe',
        role: 'Lead UI Engineer',
        status: 'offer',
        date: '2026-01-10',
        salary: '$210k + equity',
        nextStep: 'Negotiate Signing Bonus',
        notes: 'Premium design culture. High bar.',
        contacts: [{ name: 'Lachy Groom', role: 'Strategic Partner', email: 'l@stripe.com' }]
    },
    {
        id: '5',
        company: 'Meta',
        role: 'VR Engineering Manager',
        status: 'rejected',
        date: '2026-01-05',
        salary: '$250k+',
        nextStep: 'Try again in 6 months',
        notes: 'Technical round went okay, but not perfect.',
        contacts: []
    },
    {
        id: '6',
        company: 'Vercel',
        role: 'DX Engineer',
        status: 'applied',
        date: '2026-01-28',
        salary: '$170k - $200k',
        nextStep: 'Reviewing Resume',
        notes: 'Perfect fit for my Next.js expertise.',
        contacts: []
    }
];

export const STAGES = [
    { id: 'applied', label: 'APPLIED', color: 'var(--text-secondary)' },
    { id: 'phone-screen', label: 'PHONE_SCREEN', color: 'var(--accent-cyan)' },
    { id: 'onsite', label: 'ONSITE', color: 'var(--accent-magenta)' },
    { id: 'offer', label: 'OFFER', color: 'var(--accent-green)' },
    { id: 'rejected', label: 'REJECTED', color: 'var(--accent-rejected)' }
];
