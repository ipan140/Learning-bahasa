import { site } from '../data/site';

// llms.txt: a plain-text map of the site for AI assistants and agents.
export async function GET({ site: base }: { site: URL }) {
  const u = (p: string) => new URL(p, base).href;
  const body = [
    `# ${site.name}`, '', `> ${site.description}`, '',
    '## Fitur Utama',
    `- [Studio Belajar Aksara Dunia](${u('/belajar')}): Belajar huruf Hiragana, Katakana, Hangul, Hijaiyah, Cyrillic, Greek, dll dengan audio suara Google.`,
    `- [Katalog Semua Negara Dunia](${u('/katalog')}): Katalog lengkap semua negara di dunia dengan nama resmi, ibukota, bahasa resmi, dan penanda target belajar.`,
    `- [Pembuat Tabel Mandiri](${u('/belajar#buat-tabel')}): Fitur dinamis membuat tabel aksara sendiri dan impor dari file CSV/Excel.`,
    `- [Panduan Lengkap & FAQ](${u('/panduan')}): Panduan tata cara ekspor/impor Excel, pembuatan tabel kustom bahasa global, audio TTS, dan unduh berkas template.`,
    `- [Sinkronisasi Cloud](${u('/#panduan')}): Panduan interaktif dan sinkronisasi data antar perangkat.`,
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
