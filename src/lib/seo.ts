export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://delight-corp.jp";

export const COMPANY = {
  name: "Delight株式会社",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description:
    "一人ひとりのエンジニアが持つ無限の可能性を信じ、その才能が最大限に輝くための舞台を創り出す企業です。Web開発・インフラ・AIシステム開発を通じてお客様のビジネスを支援します。",
  address: {
    streetAddress: "東池袋1-34-5 いちご東池袋ビル6階",
    addressLocality: "豊島区",
    addressRegion: "東京都",
    postalCode: "170-0013",
    addressCountry: "JP",
  },
  knowsAbout: [
    "Web開発",
    "Next.js",
    "React",
    "TypeScript",
    "Go",
    "インフラ開発",
    "AWS",
    "GCP",
    "Terraform",
    "Kubernetes",
    "AIシステム開発",
    "LLM",
    "RAG",
    "機械学習",
    "DX推進",
    "ITコンサルティング",
    "PMO",
  ],
  contactEmail: "info@delight-corp.jp",
  foundingDate: "2020",
};
