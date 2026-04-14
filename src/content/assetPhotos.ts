import type { PhotoItem } from "@/content/siteContent";

type ImportedModule = {
  default: string;
};

const imported = import.meta.glob<ImportedModule>("/src/assets/fotos/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
});

function fileNameFromPath(path: string) {
  return path.split("/").pop() ?? path;
}

function baseName(file: string) {
  return file.replace(/\.[^.]+$/, "");
}

const entries = Object.entries(imported).sort(([a], [b]) => a.localeCompare(b));

export const featuredAssetPhoto: PhotoItem | null = (() => {
  const hit = entries.find(([p]) => baseName(fileNameFromPath(p)).toLowerCase() === "foto destaque");
  if (!hit) return null;
  const [path, mod] = hit;
  const file = fileNameFromPath(path);
  return { src: mod.default, alt: baseName(file) };
})();

export const assetPhotos: PhotoItem[] = entries
  .filter(([p]) => baseName(fileNameFromPath(p)).toLowerCase() !== "foto destaque")
  .map(([path, mod], index) => {
    const file = fileNameFromPath(path) ?? `foto-${index + 1}`;
    return {
      src: mod.default,
      alt: baseName(file),
    };
  });
