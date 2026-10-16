export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <span className="text-xs uppercase tracking-widest text-craft-accent font-semibold mb-3">
        Мастерская кофе в Минске
      </span>
      <h1 className="text-4xl md:text-6xl font-serif text-craft-espresso mb-4">
        Обжарка «Кварта»
      </h1>
      <p className="text-craft-muted max-w-md">
        Жарим партиями по 5 кг по четвергам. Зерно у вас на 1–3 день после обжарки.
      </p>
    </main>
  );
}