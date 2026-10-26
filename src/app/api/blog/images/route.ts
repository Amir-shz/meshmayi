import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { uploadBlogImage } from "@/services/blogImageUpload";
import { BlogError } from "@/lib/blogErrors";
import { readBlogUpload } from "@/lib/readBlogUpload";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try { await requireAdmin(); } catch { return NextResponse.json({ message: "دسترسی ادمین لازم است." }, { status: 401 }); }
  const origin = request.headers.get("origin");
  if (!origin || !URL.canParse(origin) || new URL(origin).host !== request.headers.get("host")) return NextResponse.json({ message: "درخواست مجاز نیست." }, { status: 403 });
  if (Number(request.headers.get("content-length")) > 5 * 1024 * 1024 + 65536) return NextResponse.json({ message: "فایل بیش از حد بزرگ است." }, { status: 413 });
  try {
    const file = (await readBlogUpload(request)).get("image");
    if (!(file instanceof File) || file.size > 5 * 1024 * 1024) return NextResponse.json({ message: "تصویر حداکثر ۵ مگابایت مجاز است." }, { status: 400 });
    const url = await uploadBlogImage(Buffer.from(await file.arrayBuffer()));
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json({ message: error instanceof BlogError ? error.message : "فایل تصویر قابل خواندن نیست؛ تصویر JPEG، PNG یا WebP سالم انتخاب کنید." }, { status: error instanceof BlogError ? error.status : 400 });
  }
}
