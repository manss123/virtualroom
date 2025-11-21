// composables/useAssetUrl.ts
// รวบรวมรูปทั้งหมดใต้ ~/assets/images/** เป็น URL ที่ build แล้ว
const assetMap = import.meta.glob(
  "~/assets/images/**/*.{png,jpg,jpeg,svg,gif,webp,avif}",
  { eager: true, import: "default" }
) as Record<string, string>;

export function useAssetUrl() {
  /**
   * รับ path แบบ:
   *   'hero/mascot.png' หรือ '/images/hero/mascot.png'
   * แล้วคืน URL ที่พร้อมใช้ใน <img :src="...">
   */
  const getImageURL = (path: string) => {
    // รองรับทั้งที่ใส่ 'images/...' หรือ '/images/...'
    const clean = path.startsWith("/") ? path.slice(1) : path;
    const candidates = [
      `~/assets/${clean}`,
      `/assets/${clean}`,
      `../assets/${clean}`, // เผื่อกรณีบาง bundler key ออกมาเป็นแบบนี้
      `~/assets/images/${clean.replace(/^images\//, "")}`,
    ];
    for (const key of candidates) {
      if (assetMap[key]) return assetMap[key];
    }
    if (import.meta.env.DEV) console.warn(`[useAssetUrl] Not found: ${path}`);
    return "";
  };

  return { getImageURL };
}
