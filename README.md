# PingRight: Smart Mini CRM

> A modern, responsive mini CRM for freelancers, startups, and small businesses. Manage contacts, deals, follow-ups, and customer interactions from one clean dashboard.

![Status](https://img.shields.io/badge/status-hackathon%20ready-16A34A)
![Currency](https://img.shields.io/badge/currency-INR%20(%E2%82%B9)-F97316)
![License](https://img.shields.io/badge/license-MIT-0F172A)

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Modules in Detail](#modules-in-detail)
- [Authentication and Data Security](#authentication-and-data-security)
- [Data Model](#data-model)
- [Demo Walkthrough](#demo-walkthrough)
- [Seed Data](#seed-data)
- [UX Requirements](#ux-requirements)
- [Getting Started](#getting-started)
- [Suggested Project Structure](#suggested-project-structure)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

**PingRight** helps small teams answer one question every morning: **"Who should I contact today?"**

It brings contacts, sales deals, follow-up tasks, and interaction history into a single workspace, with a polished dashboard whose numbers are calculated from real application data, never hardcoded.

**Built for:** freelancers, startups, agencies, and small businesses.

---

## Key Features

| Area | What you get |
|---|---|
| **Dashboard** | KPI cards, pipeline overview, recent activity, upcoming follow-ups, deal performance chart, "Who Should I Contact Today?" |
| **Contacts** | Add, edit, view, delete; search and filter; related deals and interaction history |
| **Deals / Pipeline** | Kanban board with drag-and-drop (or stage selector fallback), pipeline value, stage summaries |
| **Tasks & Follow-ups** | Due today, upcoming, and overdue views; priorities; mark complete; visual reminders |
| **Activity History** | Chronological timeline of calls, emails, meetings, and notes |
| **Auth** | Email sign-up, login, logout, password recovery |
| **Security** | Per-user data isolation enforced in the backend (Row-Level Security) |
| **Responsive** | Table on desktop, cards on mobile, collapsible sidebar |

---

## Modules in Detail

### 1. Dashboard

**Metric cards (all computed from live data):**

- Total Contacts
- Active Deals
- Total Pipeline Value (₹, Indian number formatting)
- Follow-ups Due Today
- Overdue Tasks
- Deals Won

**Panels:**

- Sales pipeline overview (by stage)
- Recent activities
- Upcoming follow-ups
- Deal performance chart
- **Who Should I Contact Today?** (see below)
- Friendly empty state with onboarding steps for new users

### 2. Navigation

**Collapsible left sidebar:** Dashboard · Contacts · Deals / Sales Pipeline · Tasks & Follow-ups · Activity History · Settings

**Top bar:** PingRight logo · global search · notification icon · user profile menu (profile, settings, logout)

### 3. Contact Management

- **Fields:** name, email, phone, company, source, tags, created date, last-contacted date
- **Sources:** Referral, Website, Social Media, Cold Outreach, Other
- **Actions:** add, edit, view, delete (with confirmation dialog)
- **Search and filters:** by name, company, email, source, and tag
- **Contact detail view:** profile, related deals, and full interaction timeline
- **Layout:** table on desktop, responsive cards on mobile

### 4. Deals and Sales Pipeline

- **Fields:** title, linked contact, value (₹), stage, expected closing date, notes, status
- **Stages:** `New` → `Contacted` → `Negotiation` → `Won` / `Lost`
- **Kanban board** with draggable cards (stage dropdown fallback for touch and accessibility)
- **Status indicators:**
  - Blue: active stages
  - Orange: deals needing attention (e.g., stale or past expected close date)
  - Green: won deals
- **Summaries:** total pipeline value and per-stage count and value

### 5. Tasks and Smart Follow-ups

- Create tasks linked to a contact and/or a deal
- Due date, priority (Low / Medium / High), completion status
- Tabs/sections: **Due Today · Upcoming · Overdue · Completed**
- One-click "Mark as complete"
- Clear visual reminders for pending follow-ups

#### "Who Should I Contact Today?"

- Surfaces contacts whose follow-up date is **due today or overdue**, sorted by urgency
- ⚠️ Contacts with **no follow-up date are never marked overdue**
- **Quick actions:** `View Contact` · `Log Interaction` · `Schedule Follow-up`

### 6. Customer Interaction History

- Log **calls, emails, meetings, and notes** against a contact
- Each entry stores date, type, and description
- Displayed on a **chronological activity timeline**
- Logging an interaction **automatically updates the contact's last-contacted date**

---

## Authentication and Data Security

- Email sign-up, login, logout, and password recovery
- Every record (contacts, deals, tasks, interactions) carries a `user_id`
- **Access is enforced in the backend** using the platform's database and auth features, with Row-Level Security (RLS) policies or equivalent permissions
- Frontend filtering is **never** the only protection

Example RLS policy pattern (PostgreSQL / Supabase style):

```sql
alter table contacts enable row level security;

create policy "Users manage their own contacts"
on contacts for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

Apply the same pattern to `deals`, `tasks`, and `interactions`.

---

## Data Model

```text
users (managed by auth)
  │
  ├── contacts
  │     id, user_id, name, email, phone, company,
  │     source, tags[], created_at, last_contacted_at
  │
  ├── deals
  │     id, user_id, contact_id → contacts, title, value_inr,
  │     stage, expected_close_date, notes, status, created_at
  │
  ├── tasks
  │     id, user_id, contact_id → contacts (nullable),
  │     deal_id → deals (nullable), title, due_date (nullable),
  │     priority, completed, completed_at, created_at
  │
  └── interactions
        id, user_id, contact_id → contacts,
        type (call | email | meeting | note),
        description, occurred_at, created_at
```

---

## Demo Walkthrough

The full user journey works end to end:

1. ➕ Add a new contact
2. 💼 Create a deal linked to that contact
3. 📅 Schedule a follow-up
4. 🏠 See the follow-up on the dashboard
5. 📝 Record an interaction
6. 🏆 Move the deal stage to **Won**
7. 📊 Watch dashboard metrics update automatically

> All dashboard figures are derived from stored data, so every change is reflected immediately.

---

## Seed Data

The app ships with realistic Indian business sample data so judges can understand the workflow instantly.

- **Contacts:** Indian names, companies, and cities (e.g., Aarav Sharma, Priya Nair, Rohan Mehta)
- **Deals:** spread across all five stages with ₹ values, e.g. ₹45,000 to ₹12,50,000
- **Tasks:** a mix of due today, upcoming, overdue, and completed
- **Interactions:** calls, emails, meetings, and notes across multiple contacts

Currency is formatted with the Indian numbering system:

```js
new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(1250000);
// → ₹12,50,000.00
```

---

## UX Requirements

- ✅ Functional search, filters, forms, and validation
- ✅ Confirmation dialogs for destructive actions
- ✅ Success, error, loading, and empty states
- ✅ Tooltips and clear iconography
- ✅ Fully responsive: desktop, tablet, mobile
- ✅ Fast, accessible, beginner-friendly
- ✅ Every button and action works

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/PURNIMA1006/pingright.git
cd pingright

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Add your backend URL and public key

# 4. Run database migrations and seed data
npm run db:migrate
npm run db:seed

# 5. Start the development server
npm run dev
```

**.env.example**

```env
VITE_BACKEND_URL=your-backend-url
VITE_BACKEND_ANON_KEY=your-public-anon-key
```

---

## Suggested Project Structure

```text
pingright/
├── src/
│   ├── components/       # Cards, tables, modals, sidebar, topbar
│   ├── pages/            # Dashboard, Contacts, Deals, Tasks, Activity, Settings
│   ├── lib/              # API client, auth, formatters (INR, dates)
│   ├── hooks/            # Data hooks and metric calculations
│   └── styles/           # Global styles
├── supabase/ (or db/)
│   ├── migrations/       # Schema and RLS policies
│   └── seed.sql          # Demo data
├── .env.example
└── README.md
```

---

## Roadmap

- [ ] Email and calendar integrations
- [ ] CSV import/export for contacts
- [ ] Team workspaces and roles
- [ ] Reminder notifications (email / push)
- [ ] Custom pipeline stages
- [ ] Reports and revenue forecasting

---

## License

Released under the [MIT License](LICENSE).

---

<p align="center">Built with 💙 for freelancers and small businesses · <strong>PingRight</strong></p>
