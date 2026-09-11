# 🐾 Paws & Hearts - Pet Adoption Website

A modern, responsive, and lightweight multi-page Pet Adoption website designed with clean HTML5, CSS3, and JavaScript.

---

## 🌟 Features

- **Multi-Page Experience**:
  - `index.html` (Home): Hero banner, live shelter stats, featured pets of the week, adoption workflow, and testimonials.
  - `pets.html` (Available Pets): Real-time category filtering (Dogs, Cats, Small Animals) and search bar by name, breed, or personality traits.
  - `pet-details.html` (Pet Profile): Detailed health checklists (vaccines, spayed/neutered, house training), background story, and direct link to adoption.
  - `adopt.html` (Adoption Application): Clean multi-section application form with pre-filled pet selection and interactive submission modal.
  - `about.html` (About & FAQ): Shelter mission, history, and interactive FAQ accordion.
  - `contact.html` (Contact & Visit): Shelter address, operating hours, phone numbers, and inquiry form with confirmation feedback.
- **Interactive JavaScript**:
  - Live search and species filtering without page reloads.
  - URL parameter support (`pet-details.html?id=luna` and `adopt.html?pet=Luna`).
  - Interactive modal dialogs for application submission and message inquiries.
  - FAQ accordion open/close animations.
  - Mobile hamburger navigation drawer.
- **Design & Polish**:
  - Warm, pet-friendly color palette (terracotta, forest sage, soft warm beige).
  - Fully responsive across desktop, tablet, and mobile screens.
  - Zero external dependencies or build tools needed.

---



---

## 📂 Project Structure

```
pet-adoption-website/
│
├── index.html            # Homepage
├── pets.html             # Available Pets Catalog (search & filters)
├── pet-details.html      # Individual Pet Profile View
├── adopt.html            # Adoption Application Form
├── about.html            # Mission, Team & Interactive FAQ
├── contact.html          # Contact info, shelter hours & inquiry form
│
└── assets/
    ├── css/
    │   └── style.css     # Clean, responsive styles & theme
    └── js/
        ├── pets-data.js  # Rich pet database (Dogs, Cats, Small Animals)
        └── main.js       # Search, filter, modal, and accordion logic
```
