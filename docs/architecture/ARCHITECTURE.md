# Arkitektur för Lime

Den här dokumentationen beskriver projektet Limes övergripande arkitektur, moduler och tekniska vägval.

---

## 🔍 Översikt

Lime är ett modulärt, robust e-handelssystem med separata subsystem för CMS, E-commerce, CRM och Marketing.

**Teknisk stack:**

- **Frontend**: Svelte
- **Backend**: Supabase → FastAPI (Python)
- **Databas**: PostgreSQL (Supabase → Egenhostad)
- **Deployment**: Netlify/Vercel → Docker/Kubernetes

---

## 🧩 Modulär arkitektur

Varje modul är fristående med egna API-endpoints och datahantering för maximal skalbarhet.

| Modul      | Beskrivning                                        |
|------------|----------------------------------------------------|
| CMS        | Sidhantering, mediahantering, innehåll             |
| E-commerce | Produkter, lager, order, betalningar               |
| CRM        | Kundhantering, segmentering, kundsupport           |
| Marketing  | Kampanjhantering, automatisering, analytics        |

---

## 🛠️ Backend/API

### Initialt
- Supabase (Backend-as-a-Service, PostgreSQL, Authentication)

### Långsiktig lösning
- FastAPI (Python)
- SQLAlchemy ORM
- OpenAPI-dokumentation (Swagger UI)

---

## 🎨 Frontend (Svelte)

Frontend är uppbyggt kring SvelteKit med komponentbaserad arkitektur för hög återanvändbarhet.

```
frontend/
├── src/
│   ├── components/  # Återanvändbara komponenter
│   ├── modules/     # Feature-moduler (cms, ecommerce, crm, marketing)
│   ├── routes/      # Routing (SvelteKit)
│   └── utils/       # Gemensamma funktioner
```

---

## 💾 Databasstruktur (PostgreSQL)

- Tydliga, välstrukturerade tabeller med relationer och index.
- Namnkonvention: `modul_entitet` (t.ex. `ecommerce_orders`, `crm_customers`).

---

## 🚀 Deployment

Deployment sker i tre steg:

| Fas            | Teknik                          |
|----------------|---------------------------------|
| MVP            | Netlify/Vercel                  |
| Mellannivå     | Docker                          |
| Produktion     | Kubernetes med CI/CD            |

```
infrastructure/
├── docker-compose.yml
└── kubernetes/
    ├── manifests/
    └── helm-charts/
```

---

## 📐 Designprinciper

- **Separation of Concerns** – varje modul ansvarar för sin egen logik och datahantering.
- **Single Responsibility Principle (SRP)** – varje komponent har endast ett ansvarsområde.
- **Open/Closed Principle (OCP)** – kod öppen för utökning, stängd för modifiering.

---

**Senast uppdaterad:** 25/4-25  
**Författare:** Isak Cieslak  
**Version:** 1.0  
**Status:** Pågående  

**Ändringslogg:**
- Initial dokumentation skapad (25/4-25)

