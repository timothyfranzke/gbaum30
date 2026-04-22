export interface PlanConfig {
  id: string;
  name: string;
  tag: string;
  fallbackPrice: number;
  unit: string;
  desc: string;
  items: string[];
  featured?: boolean;
  href: string;
  type: 'monthly' | 'pack';
}

export type PlanPrices = Record<string, number>;

export const PLANS: PlanConfig[] = [
  {
    id: 'plan_32a943f127892b',
    name: 'BASIC',
    tag: 'MONTHLY · UNLIMITED',
    fallbackPrice: 250,
    unit: 'PER MONTH',
    desc: 'Perfect for getting started with unlimited training. Expert coaching staff with training footage included.',
    items: ['Unlimited training', 'Training footage'],
    href: 'https://gbaum30.pushpress.com/landing/plans/plan_32a943f127892b',
    type: 'monthly',
  },
  {
    id: 'plan_dd502c798cda1a',
    name: 'PREMIER',
    tag: 'MONTHLY · MOST POPULAR',
    fallbackPrice: 295,
    unit: 'PER MONTH',
    desc: 'Enhanced training with detailed game analysis. Performance tracking included.',
    items: ['Unlimited training', 'Training footage', 'Game analysis'],
    featured: true,
    href: 'https://gbaum30.pushpress.com/landing/plans/plan_dd502c798cda1a/login',
    type: 'monthly',
  },
  {
    id: 'plan_4710938d74a2e1',
    name: 'ELITE',
    tag: 'MONTHLY · ULTIMATE',
    fallbackPrice: 375,
    unit: 'PER MONTH',
    desc: 'Ultimate package with personalized 1-on-1 analysis sessions and two game analysis reviews per cycle.',
    items: ['Unlimited training', 'Training footage', '2 Game analysis', '1-on-1 analysis'],
    href: 'https://gbaum30.pushpress.com/landing/plans/plan_4710938d74a2e1/login',
    type: 'monthly',
  },
  {
    id: 'plan_8ce3a432e8614c',
    name: 'GRASSROOTS',
    tag: '8 SESSION PACK',
    fallbackPrice: 280,
    unit: '8 SESSIONS',
    desc: 'Essential training sessions for developing goalkeepers. 8 sessions with 12-month validity.',
    items: ['8 Sessions', 'Ages 8–11', '12-month validity', 'Unless staff advances'],
    href: 'https://gbaum30.pushpress.com/landing/plans/plan_8ce3a432e8614c/login',
    type: 'pack',
  },
  {
    id: 'plan_2712bdfae4953b',
    name: 'BASIC PACK',
    tag: '8 SESSION PACK · MOST POPULAR',
    fallbackPrice: 320,
    unit: '8 SESSIONS',
    desc: 'Training sessions with comprehensive footage review, performance analysis, and technique breakdown.',
    items: ['8 Sessions', 'Training footage', 'Performance analysis', '12-month validity'],
    href: 'https://gbaum30.pushpress.com/landing/plans/plan_2712bdfae4953b',
    type: 'pack',
  },
];

export const MONTHLY_PLANS = PLANS.filter((p) => p.type === 'monthly');
export const SESSION_PACKS = PLANS.filter((p) => p.type === 'pack');
