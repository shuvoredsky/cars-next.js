import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import HowItWorks from "@/components/HowItWorks";
import ReviewCar from "@/components/ReviewCar";

export default function Home() {
  return (
    <div className="bg-slate-800 text-white">
      <Hero></Hero>
      <ProductList></ProductList>
      <HowItWorks></HowItWorks>
      <ReviewCar></ReviewCar>
    </div>
  );
}
