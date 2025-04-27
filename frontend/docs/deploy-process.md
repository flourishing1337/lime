# Lime - Deploy Process 🚀

Denna guide beskriver exakt hur du bygger, testar och deployar frontend för Lime-plattformen.

---

## 1️⃣ Lokalt: Bygg och testa frontend

```bash
# Gå till frontend-mappen
cd frontend

# Installera beroenden om det behövs
npm install

# Bygg frontend
npm run build
✅ Se till att npm run build körs utan fel innan du går vidare.

2️⃣ Lokalt: Kontrollera kodstatus
bash
Copy code
git status
git diff
✅ Kontrollera att endast avsiktliga ändringar är med.

3️⃣ Commit och push till GitHub
bash
Copy code
git add -A
git commit -m "Tydlig beskrivning av ändringar"
git push origin main
✅ Skicka ändringarna till GitHub main-branchen.

4️⃣ Vercel: Deployment
Deployment sker automatiskt på Vercel när du pushar till main.

Gå till Vercel Dashboard.

Kontrollera att senaste deployen är "Ready".

Om deployen failar:

Klicka på deployment-loggar.

Läs av felmeddelandet och åtgärda problemet.

Gör en ny commit och push.

5️⃣ Test på live URL
Öppna din Vercel URL (ex: https://lime-frontend.vercel.app).

Testa:

Sida	Funktion
/	Startsida laddar korrekt
/admin/notes	Tavern/Questboard & Chatt synkar
/admin/files	Placeholder syns
/admin/profile	Placeholder syns
Kolla DevTools Console och Network → inga 404 eller API-fel.

6️⃣ Om du behöver ändra API-URL
Ändra .env i frontend:

plaintext
Copy code
VITE_API_BASE=https://din-backend-url.com
Sätt också VITE_API_BASE på Vercel Environment Variables.

💬 Tips för proffsigare deployer:
Ha alltid en ren git status innan push.

Ha alltid en lokal .env som matchar produktion.

Ha alltid frontend och backend i synk när du deployar.

Byggt med ❤️ av Lime Teamet.