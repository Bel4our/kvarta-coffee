import { Sparkles, Calendar, Truck, Flame } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-6 pb-6 md:pt-10 md:pb-8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-craft-surface border border-craft-border text-craft-espresso text-xs sm:text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Жарим маленькими партиями по 5 кг с 2019 года</span>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-craft-espresso tracking-tight leading-[1.15] mb-6">
            Кофе в чашке на 1–3 день после обжарки. Не с полки супермаркета.
          </h1>
          <p className="text-base sm:text-lg text-craft-muted leading-relaxed max-w-2xl mx-auto font-normal">
            Мы Аня и Дима, бывшие бариста. Каждую неделю обжариваем спешелти-зерно ровно столько, сколько заказали. Без пыли на складе и старого зерна.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#catalog"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-craft-accent hover:bg-craft-accent-hover text-white text-sm sm:text-base font-medium transition-all shadow-md active:scale-95 text-center"
            >
              Выбрать сорт свежей обжарки
            </a>
            <a
              href="#subscription"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-craft-card border border-craft-border hover:border-craft-accent text-craft-espresso text-sm sm:text-base font-medium transition-all text-center"
            >
              Подписка на кофе
            </a>
          </div>
        </div>

        <div id="schedule" className="mt-8 bg-craft-card rounded-2xl border border-craft-border p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-craft-muted">
              Как устроен наш недельный цикл свежести
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-craft-surface/50 border border-craft-border/60">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-craft-accent uppercase tracking-wider mb-1">
                  Четверг
                </div>
                <h3 className="font-serif font-bold text-base text-craft-espresso">День обжарки</h3>
                <p className="text-xs sm:text-sm text-craft-muted mt-1 leading-snug">
                  Загружаем 5-килограммовый ростер строго под заказы недели.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-craft-surface/50 border border-craft-border/60">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-craft-accent uppercase tracking-wider mb-1">
                  Пятница
                </div>
                <h3 className="font-serif font-bold text-base text-craft-espresso">Развоз по Минску</h3>
                <p className="text-xs sm:text-sm text-craft-muted mt-1 leading-snug">
                  Свежие пачки курьер доставляет вам в руки или на ул. Короля, 9.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-craft-surface/50 border border-craft-border/60">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-craft-accent uppercase tracking-wider mb-1">
                  1–3 день
                </div>
                <h3 className="font-serif font-bold text-base text-craft-espresso">Пик вкуса и аромата</h3>
                <p className="text-xs sm:text-sm text-craft-muted mt-1 leading-snug">
                  Зерно дегазировалось и раскрывает сочные ягодные и карамельные ноты.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}