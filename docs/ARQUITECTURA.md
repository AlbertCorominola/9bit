# 9bit Web Architecture

## 📁 Estructura de Carpetas

```
9bit/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Rutas dinámicas por idioma (CA/ES/EN)
│   │   ├── layout.tsx            # Layout root (navbar + footer + providers)
│   │   ├── page.tsx              # HOME - Página principal
│   │   ├── serveis/page.tsx      # SERVICES - Catálogo de servicios
│   │   ├── clients/page.tsx      # CLIENTS - Case studies
│   │   ├── qui-som/page.tsx      # ABOUT - Quiénes somos
│   │   ├── contacte/page.tsx     # CONTACT - Formulario
│   │   ├── cookies/page.tsx      # LEGAL - Política de cookies
│   │   ├── privacitat/page.tsx   # LEGAL - Privacidad (Catalán)
│   │   └── legal/page.tsx        # LEGAL - Términos legales
│   ├── api/
│   │   └── contact/route.ts      # POST endpoint - Envía a Formspree
│   ├── globals.css               # Estilos globales + CSS variables (dark mode)
│   ├── layout.tsx                # Layout root (i18n setup)
│   ├── robots.ts                 # SEO - robots.txt dinámico
│   └── sitemap.ts                # SEO - sitemap dinámico
│
├── components/
│   ├── sections/                 # Secciones de página (reutilizables)
│   │   ├── HeroSection.tsx       # Hero con shader aurora (THREE.js)
│   │   ├── TrustStripSection.tsx # Banda: "Empreses confien" (marquee)
│   │   ├── MetricsSection.tsx    # Métricas animadas (+24 años, etc)
│   │   ├── ServicesSection.tsx   # Grid de servicios (2-col sticky)
│   │   ├── PillarsSection.tsx    # "Com treballem" - 4 pilares
│   │   ├── TestimonialsSection.tsx # Testimonios (3-up grid)
│   │   ├── ClientsSection.tsx    # Marquee de clientes (home)
│   │   └── CtaSection.tsx        # CTA final - "Contactar"
│   │
│   ├── ui/                       # Componentes UI atómicos
│   │   ├── Navbar.tsx            # Header con navegación
│   │   ├── Footer.tsx            # Footer con links legales
│   │   ├── AnimatedHero.tsx      # Contenido hero animado (títulos, botones)
│   │   ├── AnimatedShaderBackground.tsx  # THREE.js aurora shader
│   │   ├── ParticleEffectHero.tsx        # Canvas partículas (alternativo)
│   │   ├── AnimatedHero.tsx      # Animaciones hero (Framer Motion)
│   │   ├── Button.tsx            # Botón reutilizable
│   │   ├── ServiceCard.tsx       # Card para servicios
│   │   ├── CTAPanel.tsx          # Panel CTA reutilizable
│   │   ├── ClientMarquee.tsx     # Marquee infinito de clientes
│   │   ├── CookieBanner.tsx      # Banner de cookies (localStorage)
│   │   ├── LegalLayout.tsx       # Template para páginas legales
│   │   ├── LanguageSelector.tsx  # Selector de idiomas
│   │   └── TestimonialCard.tsx   # Card para testimonios
│   │
│   └── providers.tsx             # Context: NextIntlClientProvider, ThemeProvider
│
├── messages/                     # Traducciones i18n (next-intl)
│   ├── ca.json                   # Catalán (idioma por defecto)
│   ├── es.json                   # Español
│   └── en.json                   # Inglés
│
├── middleware.ts                 # Enrutamiento de idiomas
├── tailwind.config.ts            # Configuración Tailwind (spacing, colors CSS vars)
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencias
├── next.config.js                # Next.js config (i18n routing)
└── .env.local                    # Variables env (FORMSPREE_ENDPOINT, etc)
```

---

## 🌐 Rutas y Páginas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `page.tsx` | HOME - Hero + métricas + servicios + pilares + testimonios + CTA |
| `/serveis` | `serveis/page.tsx` | SERVICIOS - Catálogo completo de 6 servicios |
| `/clients` | `clients/page.tsx` | CASOS DE ÉXITO - 6 case studies + testimonios + marquee |
| `/qui-som` | `qui-som/page.tsx` | ABOUT - Historia, valores, timeline (2001-2024) |
| `/contacte` | `contacte/page.tsx` | CONTACTO - Formulario + FAQ + info contacto |
| `/cookies` | `cookies/page.tsx` | LEGAL - Política de cookies |
| `/privacitat` | `privacitat/page.tsx` | LEGAL - Privacidad (Catalán) |
| `/legal` | `legal/page.tsx` | LEGAL - Aviso legal |
| `/api/contact` | `api/contact/route.ts` | POST endpoint - Valida + envía a Formspree |

**Nota**: Todas las rutas soportan 3 idiomas vía `[locale]` dynamic segment:
- `/ca/*` → Catalán
- `/es/*` → Español  
- `/en/*` → Inglés

---

## 🏗️ Arquitectura por Capas

### 1. **Capa de Routing (Next.js App Router)**
```
app/[locale]/layout.tsx
    ↓
    └─→ Navbar (header)
    └─→ [Page Component] (dynamic)
    └─→ Footer
    └─→ CookieBanner (overlay)
```

### 2. **Capa de Secciones (Page Composition)**
Ejemplo: `app/[locale]/page.tsx` (HOME)
```
<HeroSection />           ← THREE.js shader aurora
<TrustStripSection />     ← Marquee de clientes
<MetricsSection />        ← Números animados
<ServicesSection />       ← 6 servicios (2-col grid)
<PillarsSection />        ← 4 pilares ("Com treballem")
<TestimonialsSection />   ← Testimonios cliente
<CtaSection />            ← Call-to-action final
```

### 3. **Capa de Componentes UI**
- **Layouts**: Navbar, Footer, LegalLayout
- **Feedback**: CookieBanner, Button, CTAPanel
- **Content**: ServiceCard, TestimonialCard, ClientMarquee
- **Animaciones**: AnimatedHero, AnimatedShaderBackground, ParticleEffectHero
- **Selectors**: LanguageSelector

### 4. **Capa de Datos (Translations)**
- **messages/ca.json**: ~250 claves (hero, services, pillars, clients, FAQ, legal, etc)
- **messages/es.json**: Españo
- **messages/en.json**: Inglés

Acceso vía `useTranslations('namespace')`:
```tsx
const t = useTranslations('hero');
t('badge')        // → "Solucions tecnològiques des del 2001"
t('words.0')      // → "innovadores"
t('featured_case.title')  // → "Restaurant Arest Estanyol"
```

### 5. **Capa de API**
```
POST /api/contact
  Input: { name, email, phone, message, website (honeypot) }
  Validación:
    - Rate limit: 3 requests/min/IP
    - Honeypot check (website field empty)
    - Email regex validation
    - Length bounds (name ≤200, message 5-5000)
  Output: 
    - ✅ 200 OK → enviado a Formspree
    - ❌ 429 → rate limited
    - ❌ 400 → validación fallida
    - ❌ 502 → error Formspree
```

---

## 🎨 Estilos y Theming

### CSS Architecture
- **Dark mode global**: `globals.css` defines `:root` CSS variables
  - `--background: #0a0a0f`
  - `--primary-container: #0066ff`
  - `--on-surface: #e2e2e2`
  - etc. (20+ variables)

- **Ambient background**: `.ambient-bg` class
  - 4 radial gradients (blue, purple, pink, blue)
  - Masked grid pattern (48px)
  - Applied to `<body>` globally

- **Tailwind**: Extends dark mode colors from CSS vars
  ```js
  extend: {
    colors: {
      background: 'var(--background)',
      'primary-container': 'var(--primary-container)',
      // ...
    }
  }
  ```

### Animation Framework
- **Framer Motion**: Entrada, scroll reveal, stagger children
  - `.animate-*` custom animations (float, fade-in-up)
  - `useInView` hook para reveal on scroll
  - `whileInView` para animaciones en viewport

- **Canvas**: 
  - ParticleEffectHero: 2D canvas + physics (spring, collision)
  - AnimatedShaderBackground: THREE.js + WebGL shaders

---

## 📦 Stack Tecnológico

| Categoría | Tecnología | Uso |
|-----------|-----------|-----|
| **Framework** | Next.js 14 | App Router, SSR, API routes |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS 3 | Utility-first CSS |
| **i18n** | next-intl | Multiidioma (CA/ES/EN) |
| **Animation** | Framer Motion | Component animations |
| **3D/Graphics** | THREE.js | WebGL shader hero |
| **Icons** | lucide-react | SVG icons |
| **Email** | Formspree | Form submissions |
| **HTTP Client** | fetch (native) | API calls |
| **State** | React Context | Cookie consent |
| **SEO** | next-intl + robots.ts + sitemap.ts | Metadata, sitemaps |

---

## 🔄 Data Flow Examples

### Ejemplo 1: Cargar página HOME en Español
```
1. User visita /es/
2. middleware.ts detecta idioma "es"
3. app/[locale]/layout.tsx:
   - useLocale() → "es"
   - NextIntlClientProvider wrap con messages/es.json
4. app/[locale]/page.tsx renderiza home:
   - <HeroSection /> → useTranslations('hero') → t('badge')
   - <ServicesSection /> → useTranslations('services')
   - etc.
5. Browser renderiza:
   - AnimatedShaderBackground (THREE.js WebGL) como fondo
   - AnimatedHero con títulos y botones
   - Secciones estáticas con contenido traducido
```

### Ejemplo 2: Enviar contacto
```
1. User rellena form en /en/contacte
2. Click "Send message" → onSubmit()
3. Validación client-side:
   - Email regex, campo requerido
4. POST /api/contact:
   - checkRateLimit(ip) → 3 requests/min
   - stripCRLF(name) → sanitizar CRLF injection
   - escapeHtml(email, phone, message) → XSS prevention
   - Fetch POST a Formspree
5. Si OK (200):
   - Mostrar "Message sent!" success screen
   - Reset form
6. Si error (429, 400, 502):
   - Mostrar error message específico
   - user puede retry
```

### Ejemplo 3: Cambiar idioma
```
1. User clickea "EN" en LanguageSelector
2. Client-side: router.replace(`/en${pathname}`)
3. URL cambia a /en/[page]
4. middleware.ts redirige si es necesario
5. Layout recibe nuevo locale
6. useTranslations() se rerender con messages/en.json
7. Página se traduce al inglés
```

---

## 🔐 Seguridad

| Threat | Mitigation | Ubicación |
|--------|-----------|-----------|
| **CRLF Injection** | `stripCRLF()` en subject line | `/api/contact` |
| **XSS** | `escapeHtml()` en fields | `/api/contact` |
| **Spam bots** | Honeypot `website` field | `/api/contact` |
| **Rate limiting** | In-memory map, 3 req/min/IP | `/api/contact` |
| **Email spoofing** | Validación regex email | `/api/contact` |
| **Bruteforce contact** | Rate limit 429 response | `/api/contact` |
| **Dark mode light leak** | CSS-only dark theme | `globals.css` |
| **Cookie tracking** | Manual localStorage, no third-party | `CookieBanner.tsx` |

---

## 📊 Component Dependency Graph

```
Navbar.tsx
    ↓
    └─→ LanguageSelector
    └─→ Button

HeroSection.tsx
    ├─→ AnimatedShaderBackground (THREE.js)
    └─→ AnimatedHero
        ├─→ Button
        └─→ Framer Motion

TrustStripSection.tsx
    └─→ ClientMarquee

MetricsSection.tsx
    └─→ MetricItem (animated counter)

ServicesSection.tsx
    ├─→ ServiceCard
    └─→ Button (link)

PillarsSection.tsx
    └─→ lucide-react Icons

TestimonialsSection.tsx
    └─→ TestimonialCard

ClientsSection.tsx (clients/page.tsx)
    ├─→ ClientMarquee
    └─→ [6 Case cards] (hardcoded in page, use translations)

CtaSection.tsx
    ├─→ Button
    └─→ CTAPanel

Footer.tsx
    ├─→ Link (to legal pages)
    └─→ lucide-react Icons

CookieBanner.tsx
    ├─→ Button
    └─→ localStorage

LegalLayout.tsx
    └─→ Template for /cookies, /privacitat, /legal
```

---

## 🚀 Performance Optimizations

1. **Code Splitting**: Pages auto-split via Next.js App Router
2. **Image Optimization**: No images (pure CSS/shader backgrounds)
3. **Animation Debouncing**: Framer Motion handles render optimization
4. **Lazy Loading**: `useInView` only triggers animations when visible
5. **CSS Variables**: Single repaint for dark mode (no theme switch)
6. **WebGL Shaders**: GPU-accelerated animations (THREE.js)
7. **Canvas**: 2D canvas for particle effects (lighter than DOM)
8. **Caching**: Translations (messages) bundled at build time
9. **Static Generation**: Most pages are SSG (no dynamic content except contact form)

---

## 📝 Key Files to Know

| Archivo | Propósito |
|---------|-----------|
| `middleware.ts` | Enrutamiento dinámico por idioma |
| `app/globals.css` | CSS vars + ambient background + animations |
| `tailwind.config.ts` | Espaciado, colores, extensiones |
| `messages/*.json` | Traducciones (500+ claves) |
| `components/providers.tsx` | Context: i18n + theme |
| `app/api/contact/route.ts` | Validación + Formspree |
| `app/[locale]/page.tsx` | Home (7 secciones) |
| `app/[locale]/clients/page.tsx` | Case studies (6 cases, traducidos) |

---

## 🔄 Typical Page Load Sequence

1. Browser: `GET /en/`
2. middleware.ts: Detecta locale "en"
3. app/[locale]/layout.tsx: Renderiza
   - NextIntlClientProvider (messages/en.json)
   - Navbar
   - Page children
   - Footer
   - CookieBanner
4. app/[locale]/page.tsx: Renderiza home
   - HeroSection → THREE.js shader inicia
   - AnimatedHero → Framer Motion entra
   - Secciones → Aparecen al scroll
5. Browser: Pinta ambientBG + shader + contenido
6. JS: Inicia animaciones, event listeners (resize, mouse, scroll)
7. Usuario ve: Dark UI, aurora shader, contenido traducido

---

## 📱 Responsive Design

- **Mobile**: 1-col layout, reduced animations
- **Tablet**: 2-col grids, sticky headers
- **Desktop**: 3-4 col grids, full animations, shader at 60 FPS

Breakpoints via Tailwind: `sm`, `md`, `lg`, `xl`, `2xl`

---

## 🎯 Future Improvements

- [ ] Add Page transitions (Framer Shared Layout)
- [ ] Add skeleton loaders for slow networks
- [ ] Add PWA support (service worker)
- [ ] Add analytics (Vercel Web Analytics)
- [ ] Add A/B testing framework
- [ ] Migrate to Server Components where possible
- [ ] Add CMS (Strapi, Sanity) for case studies
- [ ] Add real-time stats dashboard
