import U30Nav from "./components/U30Nav";
import U30Hero from "./components/U30Hero";
import U30About from "./components/U30About";
import U30Programs from "./components/U30Programs";
import U30Locations from "./components/U30Locations";
import U30HowWeTrain from "./components/U30HowWeTrain";
import U30Staff from "./components/U30Staff";
import U30Testimonials from "./components/U30Testimonials";
import U30Gallery from "./components/U30Gallery";
import U30Booking from "./components/U30Booking";
import U30Footer from "./components/U30Footer";
import { fetchAllPrices } from "@/app/lib/pushpress";
import { fetchStaff, fetchPlans, fetchGallery } from "@/app/lib/firestore";

export const revalidate = 3600;

export default async function Home() {
  const [prices, staff, plans, gallery] = await Promise.all([
    fetchAllPrices(),
    fetchStaff(),
    fetchPlans(),
    fetchGallery(),
  ]);

  return (
    <div className="bg-ink font-sans">
      <U30Nav />
      <U30Hero />
      <U30About />
      <U30Programs plans={plans} prices={prices} />
      <U30Locations />
      <U30HowWeTrain />
      <U30Staff staff={staff} />
      <U30Testimonials />
      <U30Gallery gallery={gallery} />
      <U30Booking />
      <U30Footer />
    </div>
  );
}
