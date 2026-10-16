import Link from "next/link";
import { Coffee, MapPin, Clock, Phone, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-craft-espresso text-craft-bg pt-14 pb-10 border-t border-craft-border/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-craft-accent flex items-center justify-center text-white">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-white">
                Кварта
              </span>
            </div>
            <p className="text-xs sm:text-sm text-craft-bg/70 max-w-sm leading-relaxed">
              Небольшая мастерская спешелти кофе в Минске. Обжариваем партиями по 5 кг по четвергам. Доставляем на 1–3 день после ростера.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-craft-accent">
              Мастерская и самовывоз
            </h4>
            <div className="space-y-2 text-xs text-craft-bg/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-craft-accent shrink-0 mt-0.5" />
                <span>Минск, ул. Короля, 9</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-craft-accent shrink-0 mt-0.5" />
                <span>Пн–Пт 8:00–20:00<br />Сб–Вс 10:00–18:00</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-craft-accent">
              Связь с основателями
            </h4>
            <div className="space-y-2 text-xs text-craft-bg/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-craft-accent shrink-0" />
                <span>+375 (29) 123-45-67</span>
              </div>
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-craft-accent shrink-0" />
                <span>Telegram: @kvarta_coffee</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-craft-bg/50 gap-3">
          <span>© 2019–2026 Обжарка «Кварта». Минск. Все права защищены.</span>
          <span>Доставка по Минску каждую пятницу</span>
        </div>
      </div>
    </footer>
  );
}