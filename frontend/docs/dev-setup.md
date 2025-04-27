# Lime - Dev Setup Guide 🚀

Så här kommer du snabbt igång med Lime-projektet på din dator!

---

## 1️⃣ Klona projektet

```bash
git clone https://github.com/flourishing1337/lime.git
cd lime
2️⃣ Starta backend
2.1 Gå till backend-mappen
bash
Copy code
cd backend
2.2 Skapa virtuellt Python-miljö
bash
Copy code
python -m venv venv
source venv/bin/activate  # På Mac/Linux
venv\Scripts\activate     # På Windows
2.3 Installera beroenden
bash
Copy code
pip install -r requirements.txt
2.4 Starta FastAPI-servern
bash
Copy code
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
✅ Backend körs på: http://localhost:8000

3️⃣ Starta frontend
3.1 Gå till frontend-mappen
bash
Copy code
cd ../frontend
3.2 Installera beroenden
bash
Copy code
npm install
3.3 Skapa .env-fil
plaintext
Copy code
VITE_API_BASE=http://localhost:8000
VITE_APP_VERSION=1.0.0
Spara .env i /frontend/.

3.4 Starta utvecklingsserver
bash
Copy code
npm run dev
✅ Frontend körs på: http://localhost:5173

4️⃣ Vad du kan testa
URL	Funktion
/	Startsida
/admin/notes	Tavern Quest Board + Chatt
/admin/files	Fil-hantering (placeholder)
/admin/profile	Användarprofil (placeholder)
🎯 Klar!
Nu är både backend och frontend igång och du kan börja utveckla eller testa.

Byggt med ❤️ av Lime Teamet.