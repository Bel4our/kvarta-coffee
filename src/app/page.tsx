import { Header } from "../components/Header";
import { Hero } from "../components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-craft-bg text-craft-text">
      <Header />
      <main className="flex-1">
        <Hero />
      </main>
    </div>
  );
}