import { Resend } from "resend";
import { NextResponse } from "next/server";

const TO = "t.momose@delight-x.co.jp";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { type, company, name, email, phone, message } = await req.json();

  const { error } = await resend.emails.send({
    from: "Delight Website <onboarding@resend.dev>",
    to: TO,
    replyTo: email,
    subject: `【お問い合わせ】${type} - ${name}様`,
    text: [
      `■ お問い合わせ種別：${type}`,
      `■ 法人名：${company || "未入力"}`,
      `■ お名前：${name}`,
      `■ メールアドレス：${email}`,
      `■ 電話番号：${phone || "未入力"}`,
      `■ お問い合わせ内容：\n${message}`,
    ].join("\n\n"),
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
