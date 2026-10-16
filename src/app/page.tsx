import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Catalog } from "../components/Catalog";
import { AboutDelivery } from "../components/AboutDelivery";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-craft-bg text-craft-text">
      <Header />
      <main className="flex-1">
        <Hero />
        <Catalog />
        <AboutDelivery />
      </main>
    </div>
  );
}