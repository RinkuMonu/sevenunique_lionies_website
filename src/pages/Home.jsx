import HeroBanner from "../components/Home/HeroBanner";
import TopProducts from "../components/Home/TopProducts";
import PopularProducts from "../components/Home/PopularProducts";
import JoggersSection from "../components/Home/JoggersSection";
import TrendingCategorie from "../components/Home/TrendingCategorie";
import CategoriesSection from "../components/Home/CategoriesSection";
import HoddiesSection from "../components/Home/HoddiesSection";
import CasualTrousers from "../components/Home/CasualTrousers";
import Blazercoat from "../components/Home/Blazercoat";
import KurtaSets from "../components/Home/Kurtasets";
export default function Home() {
  return (
    <>
      <HeroBanner />
      <TopProducts />
      <PopularProducts />
      <JoggersSection />
      <TrendingCategorie />
      <CategoriesSection />
      <HoddiesSection />
      <CasualTrousers />
      <Blazercoat />
      <KurtaSets />
    </>
  )
}
