"use client";

import { useState, useEffect, useRef } from "react";
import { Send, CheckCircle2 } from "lucide-react";

type InterestType = "order" | "subscription" | "question";

interface CoffeeOption {
  id: string;
  name: string;
  price: string;
}

const COFFEE_OPTIONS: CoffeeOption[] = [
  { id: "ethiopia", name: "Эфиопия Иргачеффе", price: "32 BYN" },
  { id: "colombia", name: "Колумбия Уила", price: "29 BYN" },
  { id: "brazil", name: "Бразилия Серрадо", price: "26 BYN" },
  { id: "drip", name: "Дрип-пакеты, ассорти", price: "18 BYN" },
];

const formatDigits = (digits: string) => {
  let res = "";
  if (digits.length > 0) res = "(" + digits.slice(0, 2);
  if (digits.length >= 2) res += ") " + digits.slice(2, 5);
  if (digits.length >= 5) res += "-" + digits.slice(5, 7);
  if (digits.length >= 7) res += "-" + digits.slice(7, 9);
  return res;
};

const getCursorPosForDigitCount = (formatted: string, digitCount: number) => {
  if (digitCount <= 0) return 0;
  let counted = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i])) {
      counted++;
      if (counted === digitCount) {
        let nextIdx = i + 1;
        while (nextIdx < formatted.length && /\D/.test(formatted[nextIdx])) {
          nextIdx++;
        }
        return nextIdx;
      }
    }
  }
  return formatted.length;
};

export function LeadForm() {
  const [name, setName] = useState("");
  const [phonePart, setPhonePart] = useState("");
  const [interestType, setInterestType] = useState<InterestType>("order");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  const [phoneError, setPhoneError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const phoneInputRef = useRef<HTMLInputElement>(null);

  const [utmData, setUtmData] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
    referrer: "",
    page_url: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setUtmData({
        utm_source: params.get("utm_source") || "",
        utm_medium: params.get("utm_medium") || "",
        utm_campaign: params.get("utm_campaign") || "",
        utm_content: params.get("utm_content") || "",
        utm_term: params.get("utm_term") || "",
        referrer: document.referrer || "Прямой переход",
        page_url: window.location.href,
      });
    }
  }, []);

  useEffect(() => {
    const handleProductSelect = (e: CustomEvent<string>) => {
      const raw = e.detail;
      if (raw.includes("Подписка")) {
        setInterestType("subscription");
      } else {
        setInterestType("order");
        const found = COFFEE_OPTIONS.find((c) => raw.includes(c.name));
        if (found) {
          const itemTitle = `${found.name} (${found.price})`;
          setSelectedProducts((prev) =>
            prev.includes(itemTitle) ? prev : [...prev, itemTitle]
          );
        }
      }
    };

    window.addEventListener("select-coffee" as any, handleProductSelect);
    return () => {
      window.removeEventListener("select-coffee" as any, handleProductSelect);
    };
  }, []);

  const toggleProduct = (itemTitle: string) => {
    setSelectedProducts((prev) =>
      prev.includes(itemTitle)
        ? prev.filter((p) => p !== itemTitle)
        : [...prev, itemTitle]
    );
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const input = phoneInputRef.current;
      if (!input) return;
      const { selectionStart, selectionEnd } = input;
      if (selectionStart === null || selectionEnd === null) return;
      if (selectionStart !== selectionEnd) return;

      const prevChar = phonePart[selectionStart - 1];
      if (prevChar && /\D/.test(prevChar)) {
        e.preventDefault();
        const chars = phonePart.split("");
        let digitIndexToDelete = -1;
        for (let i = selectionStart - 1; i >= 0; i--) {
          if (/\d/.test(chars[i])) {
            digitIndexToDelete = i;
            break;
          }
        }

        if (digitIndexToDelete !== -1) {
          let digitOrdinal = 0;
          for (let i = 0; i <= digitIndexToDelete; i++) {
            if (/\d/.test(chars[i])) digitOrdinal++;
          }

          const digits = phonePart.replace(/\D/g, "").split("");
          digits.splice(digitOrdinal - 1, 1);
          const newFormatted = formatDigits(digits.join(""));
          setPhonePart(newFormatted);

          requestAnimationFrame(() => {
            if (!phoneInputRef.current) return;
            const newPos = getCursorPosForDigitCount(newFormatted, digitOrdinal - 1);
            phoneInputRef.current.setSelectionRange(newPos, newPos);
          });
        }
      }
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneError(false);
    const target = e.target;
    const cursorPos = target.selectionStart || 0;
    const rawBeforeCursor = target.value.slice(0, cursorPos);
    const digitsBeforeCursor = rawBeforeCursor.replace(/\D/g, "").length;

    let digits = target.value.replace(/\D/g, "");
    if (digits.startsWith("375")) digits = digits.slice(3);
    else if (digits.startsWith("80")) digits = digits.slice(2);
    digits = digits.slice(0, 9);

    const formatted = formatDigits(digits);
    setPhonePart(formatted);

    requestAnimationFrame(() => {
      if (!phoneInputRef.current) return;
      const newPos = getCursorPosForDigitCount(formatted, digitsBeforeCursor);
      phoneInputRef.current.setSelectionRange(newPos, newPos);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!name.trim()) {
      setNameError(true);
      return;
    }

    const digits = phonePart.replace(/\D/g, "");
    const operatorCode = digits.substring(0, 2);
    const validCodes = ["25", "29", "33", "44", "17"];

    if (digits.length !== 9 || !validCodes.includes(operatorCode)) {
      setPhoneError(true);
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setServerErrorMessage("");

    let interestSummary = "Разовый заказ";
    if (interestType === "subscription") {
      interestSummary = "Ежемесячная подписка (54 BYN)";
    } else if (interestType === "question") {
      interestSummary = "Вопрос / Консультация";
    } else if (selectedProducts.length > 0) {
      interestSummary = `Заказ (${selectedProducts.length}): ${selectedProducts.join(", ")}`;
    }

    const fullPhoneDigits = `375${digits}`;
    const fullPhoneFormatted = `+375 ${phonePart}`;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: fullPhoneDigits,
          phoneFormatted: fullPhoneFormatted,
          interest: interestSummary,
          products: selectedProducts,
          comment: comment.trim(),
          utm: utmData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Ошибка отправки");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setServerErrorMessage(
        err.message || "Не удалось отправить заявку. Попробуйте еще раз или позвоните нам."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order" className="py-8 md:py-12 border-t border-craft-border/60">
      <div className="max-w-xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-craft-accent font-semibold mb-2 block">
            Заявка без предоплаты
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-craft-espresso mb-2">
            Свежий кофе к вам в руки
          </h2>
          <p className="text-xs sm:text-sm text-craft-muted">
            Перезвоним за 15 минут, согласуем детали и привезём в пятницу.
          </p>
        </div>

        <div className="bg-craft-card rounded-2xl p-6 sm:p-8 border border-craft-border shadow-sm">
          {status === "success" ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-craft-espresso">
                Заявка отправлена!
              </h3>
              <p className="text-xs sm:text-sm text-craft-muted max-w-sm mx-auto">
                Спасибо, {name}. Мы уже получили уведомление и скоро свяжемся с вами.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setName("");
                  setPhonePart("");
                  setSelectedProducts([]);
                  setComment("");
                }}
                className="mt-2 text-xs font-semibold text-craft-accent hover:underline cursor-pointer"
              >
                Отправить ещё одну заявку
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-craft-muted mb-2">
                  Что вас интересует?
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setInterestType("order")}
                    className={`h-11 px-1 sm:px-2 rounded-xl text-[11px] sm:text-xs font-medium tracking-tight transition-all flex items-center justify-center text-center leading-tight cursor-pointer ${
                      interestType === "order"
                        ? "bg-craft-espresso text-white shadow-sm"
                        : "bg-craft-surface text-craft-espresso hover:bg-craft-border/70"
                    }`}
                  >
                    Разовый заказ
                  </button>
                
                  <button
                    type="button"
                    onClick={() => {
                      setInterestType("subscription");
                      setSelectedProducts([]);
                    }}
                    className={`h-11 px-1 sm:px-2 rounded-xl text-[11px] sm:text-xs font-medium tracking-tight transition-all flex items-center justify-center text-center leading-tight cursor-pointer ${
                      interestType === "subscription"
                        ? "bg-craft-espresso text-white shadow-sm"
                        : "bg-craft-surface text-craft-espresso hover:bg-craft-border/70"
                    }`}
                  >
                    Подписка
                  </button>
                
                  <button
                    type="button"
                    onClick={() => {
                      setInterestType("question");
                      setSelectedProducts([]);
                    }}
                    className={`h-11 px-1 sm:px-2 rounded-xl text-[11px] sm:text-xs font-medium tracking-tight transition-all flex items-center justify-center text-center leading-tight cursor-pointer ${
                      interestType === "question"
                        ? "bg-craft-espresso text-white shadow-sm"
                        : "bg-craft-surface text-craft-espresso hover:bg-craft-border/70"
                    }`}
                  >
                    Консультация
                  </button>
                </div>

                {interestType === "order" && (
                  <div className="mt-3">
                    <span className="text-[11px] font-medium text-craft-muted block mb-2">
                      Выберите сорта:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {COFFEE_OPTIONS.map((item) => {
                        const itemTitle = `${item.name} (${item.price})`;
                        const isSelected = selectedProducts.includes(itemTitle);

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleProduct(itemTitle)}
                            className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? "bg-craft-espresso text-white border-craft-espresso shadow-sm"
                                : "bg-craft-surface/50 text-craft-espresso border-craft-border hover:border-craft-espresso/60"
                            }`}
                          >
                            <span className="text-xs font-medium leading-tight">{item.name}</span>
                            <div className="flex items-center gap-2 shrink-0 ml-2">
                              <span className={`text-[11px] ${isSelected ? "text-craft-surface/80" : "text-craft-muted"}`}>
                                {item.price}
                              </span>
                              <span
                                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                  isSelected
                                    ? "bg-white text-craft-espresso"
                                    : "border border-craft-border text-transparent"
                                }`}
                              >
                                ✓
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-craft-muted mb-1.5">
                  Ваше имя
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (nameError) setNameError(false);
                  }}
                  placeholder="Имя"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-craft-surface/40 border text-sm text-craft-espresso placeholder:text-craft-muted/50 focus:bg-white focus:outline-none transition-colors cursor-text ${
                    nameError
                      ? "border-red-400 bg-red-50/20"
                      : "border-craft-border focus:border-craft-espresso"
                  }`}
                />
                {nameError && (
                  <span className="text-[11px] text-red-500 mt-1 block">
                    Пожалуйста, укажите имя
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-craft-muted mb-1.5">
                  Телефон
                </label>
                <div
                  className={`w-full flex items-center rounded-xl bg-craft-surface/40 border transition-colors focus-within:bg-white focus-within:border-craft-espresso ${
                    phoneError
                      ? "border-red-400 bg-red-50/20"
                      : "border-craft-border"
                  }`}
                >
                  <span className="select-none font-mono text-sm text-craft-espresso pl-3.5 pr-1 font-medium">
                    +375
                  </span>
                  <input
                    ref={phoneInputRef}
                    type="tel"
                    value={phonePart}
                    onKeyDown={handlePhoneKeyDown}
                    onChange={handlePhoneChange}
                    placeholder="(__) ___-__-__"
                    className="w-full py-2.5 pr-3.5 bg-transparent border-0 text-sm font-mono text-craft-espresso placeholder:text-craft-muted/40 focus:outline-none cursor-text"
                  />
                </div>
                {phoneError && (
                  <span className="text-[11px] text-red-500 mt-1 block">
                    Введите номер полностью с кодом оператора (29, 33, 44, 25 или 17)
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-craft-muted mb-1.5">
                  Комментарий к заказу
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-craft-surface/40 border border-craft-border text-sm text-craft-espresso focus:border-craft-espresso focus:bg-white focus:outline-none resize-y min-h-[80px] transition-colors cursor-text"
                />
              </div>

              {status === "error" && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                  {serverErrorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-craft-accent hover:bg-craft-accentHover text-white text-sm font-medium transition-all active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Отправить заказ</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}