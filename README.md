# ⚽️ NextLeague
Video of the project: https://youtu.be/qwrfvgCDzGg?si=Ecj13IvgSsLPGLbG
**NextLeague** is a modern full-stack web application for managing sports leagues, teams, matches, and player statistics. Built with **Next.js** and **FastAPI**, it provides a powerful and user-friendly interface for both administrators and participants.

---

## 🚀 Features

- 🏟️ **League Management** – Create, update, and delete leagues and seasons  
- 👥 **Team Management** – Add and manage teams, logos, and team details  
- 📊 **Statistics** – Track match results, team rankings, points, and performance  
- 🧑‍💻 **Admin Panel** – Secure admin dashboard for managing all data  
- 🔍 **Search & Filter** – Easily search and filter teams, matches, and standings  
- 🌐 **Responsive UI** – Optimized for desktop and mobile devices  

---

## 🧰 Tech Stack

**Frontend:**
- [Next.js](https://nextjs.org/)
- React, TypeScript
- Tailwind CSS or Bootstrap (depending on your setup)

**Backend:**
- [FastAPI](https://fastapi.tiangolo.com/)
- Python 3.11+
- PostgreSQL or MySQL (configurable)
- SQLAlchemy or Tortoise ORM

- ## 💳 Online Payments & VIP

- Users can upgrade to VIP plans for additional features and capacity.
- Payments are processed securely via [Stripe](https://stripe.com/).
- After payment, user accounts are automatically upgraded.
- See `frontend/src/components/vip_cards/vip_cards.jsx` and `backend/controllers/vip_controller.py` for implementation details.

### How it works

1. User selects a VIP plan and clicks "Upgrade".
2. The app creates a Stripe Checkout session and redirects the user.
3. After successful payment, the backend verifies the session and upgrades the user.

> **Note:** You must set your Stripe API keys in environment variables for both frontend and backend.

**Other:**
- REST API
- Git & GitHub
- Deployment: Vercel (frontend), Railway/Render/Docker (backend)

---

## 🛠️ Installation

### Backend (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
