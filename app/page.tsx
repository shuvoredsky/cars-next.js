import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <div className="bg-slate-800 text-white">
      <Hero></Hero>
      <h2 className="w-full text-center text-2xl md:text-4xl font-semibold py-6">
        All Products
      </h2>
      <ProductList></ProductList>
      <HowItWorks></HowItWorks>
    </div>
  );
}
