import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Lead {
  id: string;
  name: string;
  phone: string;
  phoneFormatted: string;
  interest: string;
  products?: string[];
  comment?: string;
  utm?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    referrer?: string;
    page_url?: string;
  };
  createdAt: number;
}

const recentLeadsCache = new Map<string, number>();

const LEADS_FILE = path.join(process.cwd(), "leads.json");

const saveLeadToFile = (lead: Lead) => {
  try {
    let leads: Lead[] = [];
    if (fs.existsSync(LEADS_FILE)) {
      const fileData = fs.readFileSync(LEADS_FILE, "utf-8");
      leads = JSON.parse(fileData || "[]");
    }
    leads.push(lead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch {
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, phoneFormatted, interest, products, comment, utm } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { message: "Укажите корректное имя" },
        { status: 400 }
      );
    }

    const cleanPhone = (phone || "").replace(/\D/g, "");
    const isValidBY = /^375(25|29|33|44|17)\d{7}$/.test(cleanPhone);

    if (!isValidBY) {
      return NextResponse.json(
        {
          message:
            "Неверный номер. Поддерживаются номера Беларуси (+375 29, 33, 44, 25, 17)",
        },
        { status: 400 }
      );
    }

    const now = Date.now();
    const TEN_MINUTES_MS = 10 * 60 * 1000;
    const lastSubmitted = recentLeadsCache.get(cleanPhone);

    if (lastSubmitted && now - lastSubmitted < TEN_MINUTES_MS) {
      const minutesLeft = Math.ceil((TEN_MINUTES_MS - (now - lastSubmitted)) / 60000);
      return NextResponse.json(
        {
          message: `Заявка с этого номера уже получена. Менеджер свяжется с вами в ближайшее время (повторная отправка доступна через ${minutesLeft} мин).`,
        },
        { status: 429 }
      );
    }

    recentLeadsCache.set(cleanPhone, now);

    const newLead: Lead = {
      id: `lead_${now}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      phone: cleanPhone,
      phoneFormatted: phoneFormatted || cleanPhone,
      interest: interest || "Разовый заказ",
      products: products || [],
      comment: comment?.trim() || "",
      utm: utm || {},
      createdAt: now,
    };

    saveLeadToFile(newLead);

    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID;

    if (tgToken && tgChatId) {
      const messageText = `<b>Новая заявка «Кварта»</b>\n\n` +
        `<b>Имя:</b> ${newLead.name}\n` +
        `<b>Телефон:</b> <code>${newLead.phoneFormatted}</code>\n` +
        `<b>Интерес:</b> ${newLead.interest}\n` +
        (newLead.comment ? `<b>Комментарий:</b> ${newLead.comment}\n` : "") +
        `\n<b>Источник:</b>\n` +
        `• UTM Source: ${newLead.utm?.utm_source || "Прямой заход"}\n` +
        `• Campaign: ${newLead.utm?.utm_campaign || "—"}\n` +
        `• Referrer: ${newLead.utm?.referrer || "—"}`;

      await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: messageText,
          parse_mode: "HTML",
        }),
      }).catch(() => {});
    }

    return NextResponse.json(
      {
        success: true,
        message: "Заявка успешно принята",
        leadId: newLead.id,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера при обработке заявки" },
      { status: 500 }
    );
  }
}