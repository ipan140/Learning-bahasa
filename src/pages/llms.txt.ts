import { site } from '../data/site';

// llms.txt: a plain-text map of the site for AI assistants and agents.
export async function GET({ site: base }: { site: URL }) {
  const u = (p: string) => new URL(p, base).href;
  const body = [
    `# ${site.name}`, '', `> ${site.description}`, '',
    '## Fitur Utama',
    `- [Studio Belajar Aksara Dunia](${u('/belajar')}): Belajar huruf Hiragana, Katakana, Hangul, Hijaiyah, Cyrillic, Greek, dll dengan audio suara Google.`,
    `- [Katalog 250 Negara Lengkap](${u('/katalog')}): Katalog 250 negara dengan nama resmi, ibukota, bahasa resmi, dan penanda target belajar.`,
    `- [Pembuat Tabel Mandiri](${u('/belajar#buat-tabel')}): Fitur dinamis membuat tabel aksara sendiri dan impor dari file CSV/Excel.`,
    `- [Panduan & Sinkronisasi Cloud](${u('/#panduan')}): Panduan interaktif dan sinkronisasi data antar perangkat.`,
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
