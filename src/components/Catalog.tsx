"use client";

import { Sparkles, Coffee, PackageCheck, Check } from "lucide-react";

export interface CoffeeItem {
  id: string;
  name: string;
  flavor: string;
  tags: string[];
  weight: string;
  price: number;
  popular?: boolean;
}

export const COFFEE_ITEMS: CoffeeItem[] = [
  {
    id: "ethiopia",
    name: "Эфиопия Иргачеффе",
    flavor: "Цветочный аромат, ноты бергамота, легкая цитрусовая кислинка",
    tags: ["Цветочный", "Бергамот", "Светлая обжарка"],
    weight: "250 г",
    price: 32,
    popular: true,
  },
  {
    id: "colombia",
    name: "Колумбия Уила",
    flavor: "Сладкая тягучая карамель, спелое красное яблоко, мягкий баланс",
    tags: ["Карамель", "Красное яблоко", "Универсально"],
    weight: "250 г",
    price: 29,
  },
  {
    id: "brazil",
    name: "Бразилия Серрадо",
    flavor: "Классический плотный вкус: жареный лесной орех, темный шоколад",
    tags: ["Орех", "Шоколад", "Под эспрессо"],
    weight: "250 г",
    price: 26,
  },
  {
    id: "drip",
    name: "Дрип-пакеты, ассорти",
    flavor: "Удобно в офисе и в поездке. Нужен только кипяток и кружка",
    tags: ["10 штук", "Все сорта", "Быстро заваривать"],
    weight: "10 шт",
    price: 18,
  },
];

interface CatalogProps {
  onSelectItem?: (itemName: string) => void;
}

export function Catalog({ onSelectItem }: CatalogProps) {
  const handleSelect = (name: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("select-coffee", { detail: name }));
    }
    const formElement = document.getElementById("order");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="catalog" className="py-16 md:py-24 border-t border-craft-border/60">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-craft-accent font-semibold mb-2 block">
            Свежий урожай и ростер
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-craft-espresso mb-4">
            Сорта этой недели
          </h2>
          <p className="text-sm sm:text-base text-craft-muted leading-relaxed">
            Обжариваем в четверг под ваш заказ. Зерно упаковываем в крафтовые пачки с клапаном дегазации и зиплоком.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COFFEE_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`relative flex flex-col justify-between bg-craft-card rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                item.popular
                  ? "border-craft-accent/50 ring-1 ring-craft-accent/20"
                  : "border-craft-border hover:border-craft-accent/40"
              }`}
            >
              {item.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-craft-accent text-white text-[11px] font-medium tracking-wide flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  Хит сезона
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-craft-surface flex items-center justify-center text-craft-espresso">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-craft-surface text-craft-muted">
                    {item.weight}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-craft-espresso mb-2">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-craft-muted leading-relaxed mb-4">
                  {item.flavor}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-craft-surface/80 text-craft-espresso border border-craft-border/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-craft-border/60 flex items-center justify-between">
                <div>
                  <span className="text-xs text-craft-muted block">Цена</span>
                  <span className="font-serif font-bold text-xl text-craft-espresso">
                    {item.price} BYN
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelect(`Разовый заказ: ${item.name}`)}
                  className="px-4 py-2 rounded-xl bg-craft-surface hover:bg-craft-accent hover:text-white text-craft-espresso text-xs font-semibold transition-colors active:scale-95 cursor-pointer"
                >
                  Заказать
                </button>
              </div>
            </div>
          ))}
        </div>

        <div id="subscription" className="mt-12 bg-craft-surface/70 rounded-3xl border border-craft-border p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-craft-accent/15 text-craft-accent text-xs font-semibold mb-3">
                <PackageCheck className="w-3.5 h-3.5" />
                Ежемесячная подписка
              </div>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-craft-espresso mb-3">
                Кофе дома никогда не заканчивается
              </h3>
              <p className="text-sm sm:text-base text-craft-muted leading-relaxed mb-4 max-w-xl">
                Каждый месяц привозим 2 пачки по 250 г свежего зерна разных сортов. Вы всегда пьете пиковый по вкусу кофе без лишних напоминаний.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-craft-espresso">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  2 разные пачки свежей обжарки
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  Бесплатная доставка по Минску
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  Экономия до 15% каждый месяц
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  Можно приостановить в любой момент
                </li>
              </ul>
            </div>

            <div className="bg-craft-card rounded-2xl p-6 border border-craft-border text-center shadow-sm">
              <span className="text-xs text-craft-muted uppercase tracking-wider block mb-1">
                Стоимость подписки
              </span>
              <div className="font-serif font-bold text-3xl sm:text-4xl text-craft-espresso mb-1">
                54 BYN <span className="text-base font-sans font-normal text-craft-muted">/ месяц</span>
              </div>
              <span className="text-[12px] text-emerald-600 font-medium block mb-4">
                Доставка включена в стоимость
              </span>
              <button
                type="button"
                onClick={() => handleSelect("Подписка: 2 пачки в месяц (54 BYN)")}
                className="w-full py-3 rounded-full bg-craft-accent hover:bg-craft-accent-hover text-white text-sm font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Оформить подписку
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}