# 📄 `/backend/README.md`

```markdown
# Lime Backend

🛡️ Backend för Lime-plattformen – byggd med [FastAPI](https://fastapi.tiangolo.com/) och PostgreSQL.

---

## Lokalt utvecklingsläge

```bash
# Gå till backend-mappen
cd backend

# Starta virtuellt Python-miljö
python -m venv venv
source venv/bin/activate  # På Mac/Linux
venv\Scripts\activate     # På Windows

# Installera beroenden
pip install -r requirements.txt

# Starta servern
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
Backend körs på: http://localhost:8000

Swagger-dokumentation finns på: http://localhost:8000/docs

Projektstruktur
Mapp	Beskrivning
/app/api	API routers (auth, checkout, admin)
/app/models	Databasmodeller
/app/schemas	Pydantic-scheman
/app/core	Konfigurationer och inställningar
/app/db	Databasanslutning och sessioner
/routers/admin	Separata admin-endpoints (notes, messages)
/schemas	Eventuella separata schemas
Funktioner
✅ JWT-baserad autentisering
✅ Admin questboard och real-time chatt backend
✅ PostgreSQL integration
✅ Klar för Docker deployment

Tech Stack
FastAPI

PostgreSQL

Alembic (migrations)

Docker (produktion)

Pydantic

Uvicorn

Byggt med ❤️ av Lime-teamet 2025.