import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = "t.momose@delight-x.co.jp";

export async function POST(req: Request) {
  const body = await req.json();
  const {
    name, kana, gender, age,
    zip, prefecture, city, addressRest,
    phone, email,
    school, department, graduationYear, graduationMonth,
    remarks,
  } = body;

  const address = [zip ? `〒${zip}` : "", prefecture, city, addressRest]
    .filter(Boolean).join(" ");
  const graduation = graduationYear && graduationMonth
    ? `${graduationYear}年 ${graduationMonth}月`
    : "未入力";

  const { error } = await resend.emails.send({
    from: "Delight Website <onboarding@resend.dev>",
    to: TO,
    replyTo: email,
    subject: `【エントリー】${name}（${kana}）様`,
    text: [
      `■ お名前：${name}（${kana}）`,
      `■ 性別：${gender}`,
      `■ 年齢：${age}歳`,
      `■ 住所：${address}`,
      `■ 電話番号：${phone}`,
      `■ メールアドレス：${email}`,
      `■ 最終学歴：${school || "未入力"} ${department || ""}`,
      `■ 卒業年月：${graduation}`,
      `■ 特記事項：\n${remarks || "なし"}`,
    ].join("\n\n"),
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
