# PingRight

> Other CRMs store your customers. PingRight tells you which one to call today.

A simple CRM for micro-entrepreneurs (home bakers, tiffin providers, tailors, tutors) who run their business over WhatsApp and lose money when they forget to follow up.

**Live demo:** <Base44 app link>
**Demo video:** <link, if you recorded one>
**Built at:** <hack day name>, <date>, in 90 minutes

---

## The Problem

Small sellers take orders in WhatsApp chats and track them from memory. When they forget to reply to a customer, the order is lost, and that's lost income. Normal CRMs are databases you have to keep updating, so these users never adopt them.

> "<Quote from a real micro-entrepreneur you spoke to>" - <first name, type of business>

> "<Second quote, if you have one>" - <first name, type of business>

*(Use only real conversations. Don't invent quotes or statistics.)*

## Our Solution

PingRight does the thinking for the seller:

- **Call these customers today:** every customer gets a Hot / Warm / Cooling / Cold health label, and the dashboard ranks who needs attention, with a plain-language reason (e.g., "Rs 1,800 order, no reply for 12 days").
- **Money at risk:** shows the total rupee value of orders going cold, so the cost of forgetting is visible.
- **Paste-a-Chat:** paste a WhatsApp conversation (English, Hindi, or Hinglish) and AI creates the contact, deal, and follow-up task in one click.
- **Pipeline with stuck alerts:** a Kanban board that flags deals sitting in one stage for more than 7 days.

## Who It's For

Micro-entrepreneurs who manage customers on WhatsApp: home bakers, tiffin and mess providers, tailors, home tutors, and small shop owners.

## Screenshots

| Dashboard | Pipeline | Paste-a-Chat |
|---|---|---|
| ![Dashboard](docs/screenshots/dashboard.png) | ![Pipeline](docs/screenshots/pipeline.png) | ![Paste Chat](docs/screenshots/paste-chat.png) |

## How It Works

1. Paste a customer chat, or add a contact manually.
2. The app extracts the customer, order, value, and a follow-up task.
3. Health scores update based on days since last contact and deal value.
4. The dashboard shows who to call today and how much money is at risk.

**What the AI does:** extracts structured data from chats (and drafts messages, if you added AI Next Step).
**What the app logic does:** health scoring, ranking, stuck-deal detection, and the money-at-risk totals.

## Built With

- [Base44](https://base44.com) for the database, authentication, and UI
- Base44's AI integration for chat extraction
- GitHub for the prompts, test data, and documentation

## Repository Contents
