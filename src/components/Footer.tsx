import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 py-6 text-center" style={{ background: "#2d0a0b" }}>
      <div className="flex items-center justify-center gap-6 mb-3">
        <Link
          href="/privacy"
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200"
        >
          個人情報保護方針
        </Link>
      </div>
      <p className="text-sm text-gray-500">
        &copy;{year} Delight Co., Ltd. All Rights Reserved.
      </p>
    </footer>
  );
}
