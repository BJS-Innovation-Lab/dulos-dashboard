// Datos reales de dulos.io — sincronizados 15 mar 2026
// Fuente: scraping directo del sitio

export interface Zone {
  name: string;
  price: number;
  originalPrice?: number;
  available: number;
  sold: number;
  color: string;
}

export interface Event {
  id: string;
  name: string;
  city: string;
  venue: string;
  address: string;
  dates: string;
  startDate: string;
  endDate?: string;
  price: number;
  original?: number;
  image: string;
  slug: string;
  buyUrl: string;
  dashboardUrl: string;
  zones: Zone[
  {id: 'lucero',
    name: 'Lucero',
    city: 'Puebla',
    venue: 'Auditorio Arema Explanada',
    address: 'Calle Ignacio Allende 512, Cholula, Puebla',
    dates: '28 Mar 2026',
    startDate: '2026-03-28',
    price: 1499,
    original: 2300,
    image: 'https://boletera-assets-dev.s3.us-east-2.amazonaws.com/projects/lucero/events/auditorio-explanada-puebla/eedcb24a-a162-4fcb-8dd5-1e39e1f054b4.png',
    slug: '/lucero/auditorio-explanada-puebla',
    buyUrl: 'https://www.dulos.io/lucero/auditorio-explanada-puebla',
    dashboardUrl: 'https://dulos-app.vercel.app/lucero/auditorio-explanada-puebla',
    status: 'active',
    zones: [
      { name: 'Dorada', price: 1499, originalPrice: 2300, available: 49, sold: 0, color: '#FFD700' },
      { name: 'Blanca', price: 1725, originalPrice: 2700, available: 40, sold: 0, color: '#E0E0E0' },
      { name: 'Premium', price: 1950, originalPrice: 3000, available: 48, sold: 0, color: '#C0A0FF' },
    ],
  },,
  {id: 'mijares',
    name: 'Mijares Sinfónico',
    city: 'Toluca',
    venue: 'Teatro Morelos',
    address: 'Teatro Morelos, Toluca',
    dates: '13 Mar 2026',
    startDate: '2026-03-13',
    price: 1249,
    image: '/event2.jpg',
    slug: '/mijares-sinfonico/teatro-morelos-toluca',
    buyUrl: 'https://www.dulos.io/mijares-sinfonico/teatro-morelos-toluca',
    dashboardUrl: 'https://dulos-app.vercel.app/mijares-sinfonico/teatro-morelos-toluca',
    status: 'active',
    zones: [
      { name: 'General', price: 1249, available: 30, sold: 0, color: '#2A7AE8' },
      { name: 'Preferente', price: 1499, originalPrice: 3500, available: 119, sold: 0, color: '#E88D2A' },
      { name: 'VIP', price: 1749, originalPrice: 4100, available: 78, sold: 0, color: '#E63946' },
    ],
  },
];

// Helper: get event by slug
export function getEventBySlug(slug: string): Event | undefined {
  return EVENTS.find(e => e.slug === slug || e.dashboardUrl.includes(slug));
}

// Helper: get zones for event name (for EventDetail component)
export function getZonesForEvent(eventName: string): Zone[] {
  const event = EVENTS.find(e => e.name === eventName);
  return event?.zones || [,
  {id: 'asi-lo-veo-yo-libanes',
    name: 'Así Lo Veo Yo',
    city: 'CDMX',
    venue: 'Nuevo Teatro Libanés',
    address: 'Barranca del Muerto esq. Minerva, Col Crédito Constructor, CDMX',
    dates: '25 Feb — 25 Mar 2026',
    startDate: '2026-02-25',
    endDate: '2026-03-25',
    price: 299,
    original: 600,
    image: 'https://boletera-assets-dev.s3.us-east-2.amazonaws.com/projects/asi-lo-veo-yo/events/nuevo-teatro-libanes-cdmx/27a106e9-37e2-4d4b-a684-c5a9267e9f52.jpg',
    slug: '/asi-lo-veo-yo/nuevo-teatro-libanes-cdmx',
    buyUrl: 'https://www.dulos.io/asi-lo-veo-yo/nuevo-teatro-libanes-cdmx',
    dashboardUrl: 'https://dulos-app.vercel.app/asi-lo-veo-yo/nuevo-teatro-libanes-cdmx',
    status: 'active',
    zones: [
      { name: 'General', price: 299, originalPrice: 600, available: 434, sold: 97, color: '#2A7AE8' },
    ],
  },,
  {id: 'maleficio-mariposa',
    name: 'El Maleficio de la Mariposa',
    city: 'CDMX',
    venue: 'Foro Shakespeare',
    address: 'Zamora #7, Col Condesa, CDMX',
    dates: '7 Feb — 25 Abr 2026',
    startDate: '2026-02-07',
    endDate: '2026-04-25',
    price: 350,
    image: 'https://boletera-assets-dev.s3.us-east-2.amazonaws.com/projects/el-maleficio-de-la-mariposa/events/el-maleficio-de-la-mariposa/8a66ac9a-612e-4e38-a9da-379280e6e245.jpeg',
    slug: '/el-maleficio-de-la-mariposa/el-maleficio-de-la-mariposa-cdmx',
    buyUrl: 'https://www.dulos.io/el-maleficio-de-la-mariposa/el-maleficio-de-la-mariposa-cdmx',
    dashboardUrl: 'https://dulos-app.vercel.app',
    status: 'active',
    zones: [
      { name: 'Preferente', price: 350, available: 149, sold: 35, color: '#E88D2A' },
    ],
  },,
  {id: 'infierno',
    name: 'Infierno',
    city: 'CDMX',
    venue: 'Teatro Enrique Lizalde',
    address: 'Héroes del 47 #122, Coyoacán, CDMX',
    dates: '6 — 28 Mar 2026',
    startDate: '2026-03-06',
    endDate: '2026-03-28',
    price: 299,
    original: 710,
    image: 'https://boletera-assets-dev.s3.us-east-2.amazonaws.com/projects/infierno/events/infierno-cdmx/9a43e3dd-6807-44ba-af82-ba087e915c9f.jpg',
    slug: '/infierno/teatro-enrique-lizalde-cdmx',
    buyUrl: 'https://www.dulos.io/infierno/teatro-enrique-lizalde-cdmx',
    dashboardUrl: 'https://dulos-app.vercel.app/infierno/teatro-enrique-lizalde-cdmx',
    status: 'low_stock',
    zones: [
      { name: 'Preferente', price: 299, originalPrice: 710, available: 45, sold: 5, color: '#E88D2A' },
    ],
  },,
  {id: 'oh-karen',
    name: '¡Oh Karen!',
    city: 'CDMX',
    venue: 'Teatro Xola',
    address: 'Eje 4 Sur 809, Col del Valle Nte, CDMX',
    dates: '25 Mar — 28 Jun 2026',
    startDate: '2026-03-25',
    endDate: '2026-06-28',
    price: 199,
    image: 'https://boletera-assets-dev.s3.us-east-2.amazonaws.com/projects/oh-karen/events/teatro-xola-cdmx/edce1b1a-a6fb-4475-a785-e6bcb2feb710.png',
    slug: '/oh-karen/teatro-xola-cdmx',
    buyUrl: 'https://www.dulos.io/oh-karen/teatro-xola-cdmx',
    dashboardUrl: 'https://dulos-app.vercel.app/oh-karen/teatro-xola-cdmx',
    status: 'active',
    zones: [
      { name: 'Zona de Karen', price: 349, available: 83, sold: 0, color: '#E63946' },
      { name: 'Preferente', price: 299, available: 82, sold: 1, color: '#E88D2A' },
      { name: 'General', price: 199, available: 83, sold: 0, color: '#2A7AE8' },
    ],
  },
];
}
