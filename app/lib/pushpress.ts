import { PLANS, type PlanPrices } from '@/app/config/plans';

const BASE_URL = 'https://gbaum30.pushpress.com/landing/plans';

async function fetchPlanPrice(planId: string): Promise<number | null> {
  try {
    const res = await fetch(`${BASE_URL}/${planId}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;

    const html = await res.text();
    const match = html.match(
      /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/,
    );
    if (!match) return null;

    const data = JSON.parse(match[1]);
    const amount: unknown = data?.props?.pageProps?.plan?.amount;
    return typeof amount === 'number' ? amount : null;
  } catch (err) {
    console.warn(`[pushpress] Failed to fetch price for ${planId}:`, err);
    return null;
  }
}

export async function fetchAllPrices(): Promise<PlanPrices> {
  const results = await Promise.allSettled(
    PLANS.map(async (plan) => {
      const price = await fetchPlanPrice(plan.id);
      return { id: plan.id, price };
    }),
  );

  const prices: PlanPrices = {};
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value.price !== null) {
      prices[result.value.id] = result.value.price;
    }
  }
  return prices;
}
