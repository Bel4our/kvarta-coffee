import Link from "next/link";
import { Coffee, MapPin } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-craft-bg/90 backdrop-blur-md border-b border-craft-border/60">
      <div className="max-w-6xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-craft-espresso flex items-center justify-center text-white transition-transform group-hover:scale-105">
            <Coffee className="w-5 h-5 text-craft-bg" />
          </div>
          <div>
            <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-craft-espresso block leading-none">
              Кварта
            </span>
            <span className="text-[10px] uppercase tracking-wider text-craft-muted font-medium block">
              Минская обжарка
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-craft-muted">
          <a href="#schedule" className="hover:text-craft-accent transition-colors">
            Свежесть и график
          </a>
          <a href="#catalog" className="hover:text-craft-accent transition-colors">
            Сорта кофе
          </a>
          <a href="#subscription" className="hover:text-craft-accent transition-colors">
            Подписка
          </a>
          <a href="#about" className="hover:text-craft-accent transition-colors">
            О нас
          </a>
          <a href="#delivery" className="hover:text-craft-accent transition-colors">
            Доставка
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-craft-muted font-medium">
            <MapPin className="w-3.5 h-3.5 text-craft-accent" />
            <span>Минск, ул. Короля, 9</span>
          </div>

          <a
            href="#order"
            className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-craft-accent hover:bg-craft-accent-hover text-white text-xs sm:text-sm font-medium transition-all shadow-sm active:scale-95"
          >
            Заказать кофе
          </a>
        </div>
      </div>
    </header>
  );
}