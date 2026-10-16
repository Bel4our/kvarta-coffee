import { MapPin, Clock, Truck, Users, ShieldCheck } from "lucide-react";

export function AboutDelivery() {
  return (
    <section id="about" className="py-16 md:py-20 bg-craft-surface/30 border-t border-craft-border/60">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-craft-accent mb-3">
              <Users className="w-4 h-4" />
              Маленькая мастерская с 2019 года
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-craft-espresso mb-5 leading-tight">
              «Мы не фабрика. Мы знаем профиль каждой обжарки»
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-craft-muted leading-relaxed">
              <p>
                Привет! Мы Аня и Дмитрий. Много лет мы стояли за стойкой кофеен в качестве бариста и каждый день наблюдали, как быстро кофе теряет богатство аромата, если лежит на полке больше месяца.
              </p>
              <p>
                В 2019 году мы открыли «Кварту» с простым правилом: жарить небольшими партиями строго по 5 кг. Мы не копим зерно на складе: в четверг обжариваем, в пятницу развозим свежие пачки по Минску.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-6 pt-4 border-t border-craft-border/60">
              <div>
                <span className="font-serif font-bold text-2xl text-craft-espresso block">5 кг</span>
                <span className="text-xs text-craft-muted">максимальный размер одной партии</span>
              </div>
              <div className="h-8 w-px bg-craft-border" />
              <div>
                <span className="font-serif font-bold text-2xl text-craft-espresso block">1–3 дня</span>
                <span className="text-xs text-craft-muted">от ростера до первой чашки</span>
              </div>
            </div>
          </div>

          <div id="delivery" className="bg-craft-card rounded-3xl p-6 sm:p-8 border border-craft-border shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-xl text-craft-espresso">
              Как забрать кофе
            </h3>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-craft-surface flex items-center justify-center text-craft-accent shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-craft-espresso">
                  Курьерская доставка по Минску
                </h4>
                <p className="text-xs sm:text-sm text-craft-muted mt-1 leading-snug">
                  Развозим по пятницам сразу после обжарки.
                  <br />
                  <strong className="text-craft-espresso">Бесплатно при заказе от 50 BYN</strong> (или по подписке). При заказе до 50 BYN — 6 BYN.
                </p>
              </div>
            </div>

            <div className="h-px bg-craft-border/60" />

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-craft-surface flex items-center justify-center text-craft-accent shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-craft-espresso">
                  Самовывоз из мастерской
                </h4>
                <p className="text-xs sm:text-sm text-craft-muted mt-1 leading-snug">
                  г. Минск, ул. Короля, 9 (центр города, рядом с метро Фрунзенская / Юбилейная площадь).
                </p>
                <div className="flex items-center gap-1.5 text-xs text-craft-muted mt-2 font-medium">
                  <Clock className="w-3.5 h-3.5 text-craft-accent" />
                  <span>Пн–Пт: 8:00–20:00, Сб–Вс: 10:00–18:00</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-craft-surface/60 border border-craft-border/60 flex items-center gap-3 text-xs text-craft-muted">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Оплата при получении (картой или наличными) после согласования с менеджером.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}