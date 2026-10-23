// Brand + navigation
import settings from './site-settings.json';

export const site = {
  ...settings,
  url: 'https://learning-bahasa-nine.vercel.app',
  secondary: { label: 'Katalog Negara', href: '#katalog-negara' },
  pro: '/',
  nav: [
    { label: 'Tabel Aksara', href: '#tabel-section' },
    { label: 'Katalog Negara & Target', href: '#katalog-section' },
    { label: '+ Buat Tabel', href: '#buat-tabel' },
  ],
  menu: [
    { label: 'Tabel Aksara', href: '#tabel-section' },
    { label: 'Katalog Negara & Target', href: '#katalog-section' },
    { label: '+ Buat Tabel', href: '#buat-tabel' },
  ],
  footer: [
    { title: 'Aksara Pilihan', links: [['Jepang (Hiragana)', '#tabel-section'], ['Jerman (Umlaut)', '#tabel-section'], ['Korea (Hangul)', '#tabel-section'], ['Arab (Hijaiyah)', '#tabel-section']] },
    { title: 'Daftar Negara', links: [['Asia (Jepang, Korea, Tiongkok)', '#katalog-section'], ['Eropa (Jerman, Prancis, Spanyol)', '#katalog-section'], ['Timur Tengah (Arab Saudi, Mesir)', '#katalog-section']] },
    { title: 'Fitur', links: [['Tabel Teks Interaktif', '#tabel-section'], ['Audio Web Speech', '#tabel-section'], ['Target Belajar Mandiri', '#katalog-section']] },
  ],
} as const;
