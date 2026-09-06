// Paws & Hearts - Main JavaScript Functionality

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFeaturedPets();
  initCatalogPage();
  initPetDetailsPage();
  initAdoptionForm();
  initContactForm();
  initFaqAccordion();
});

/* ==========================================================================
   1. Mobile Navigation
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('show');
      }
    });
  }
}

/* ==========================================================================
   2. Pet Card HTML Generator
   ========================================================================== */
function createPetCardHTML(pet) {
  const speciesBadgeClass = pet.species === 'dog' ? 'badge-dog' : pet.species === 'cat' ? 'badge-cat' : 'badge-other';
  const speciesLabel = pet.species.charAt(0).toUpperCase() + pet.species.slice(1);
  const tagsHTML = pet.tags.map(tag => `<span class="badge badge-pill">${tag}</span>`).join('');

  return `
    <article class="pet-card" data-species="${pet.species}" data-name="${pet.name.toLowerCase()}" data-breed="${pet.breed.toLowerCase()}">
      <div class="pet-card-image-wrap">
        <img src="${pet.image}" alt="${pet.name}" loading="lazy" />
        <div class="pet-card-badges">
          <span class="badge ${speciesBadgeClass}">${speciesLabel}</span>
          <span class="badge badge-status">${pet.status}</span>
        </div>
      </div>
      <div class="pet-card-body">
        <div class="pet-header">
          <h3 class="pet-name">${pet.name}</h3>
          <span class="pet-age">${pet.age}</span>
        </div>
        <div class="pet-breed">${pet.breed}</div>
        <p class="pet-desc">${pet.shortDescription}</p>
        <div class="pet-tags">
          ${tagsHTML}
        </div>
        <div class="pet-card-footer">
          <span style="font-size: 0.85rem; color: var(--color-text-muted);">📍 Local Shelter</span>
          <a href="pet-details.html?id=${pet.id}" class="btn btn-outline btn-sm">Meet ${pet.name} &rarr;</a>
        </div>
      </div>
    </article>
  `;
}

/* ==========================================================================
   3. Featured Pets on Home Page
   ========================================================================== */
function initFeaturedPets() {
  const featuredContainer = document.getElementById('featuredPetsContainer');
  if (!featuredContainer || typeof getFeaturedPets !== 'function') return;

  const featured = getFeaturedPets();
  featuredContainer.innerHTML = featured.map(createPetCardHTML).join('');
}

/* ==========================================================================
   4. Catalog Page (Search & Filters)
   ========================================================================== */
function initCatalogPage() {
  const catalogContainer = document.getElementById('catalogPetsContainer');
  const searchInput = document.getElementById('petSearchInput');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const countIndicator = document.getElementById('petsCountIndicator');

  if (!catalogContainer || typeof getAllPets !== 'function') return;

  const allPets = getAllPets();
  let currentFilter = 'all';
  let searchQuery = '';

  function renderFiltered() {
    const filtered = allPets.filter(pet => {
      const matchesFilter = currentFilter === 'all' || pet.species === currentFilter;
      const matchesSearch = !searchQuery || 
        pet.name.toLowerCase().includes(searchQuery) ||
        pet.breed.toLowerCase().includes(searchQuery) ||
        pet.tags.some(t => t.toLowerCase().includes(searchQuery));
      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      catalogContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <div style="font-size: 3rem; margin-bottom: 12px;">🐾</div>
          <h3 style="font-size: 1.4rem; margin-bottom: 8px;">No furry friends found</h3>
          <p style="color: var(--color-text-muted);">Try loosening your search terms or choosing another category.</p>
        </div>
      `;
    } else {
      catalogContainer.innerHTML = filtered.map(createPetCardHTML).join('');
    }

    if (countIndicator) {
      countIndicator.textContent = `Showing ${filtered.length} of ${allPets.length} pets`;
    }
  }

  // Filter button clicks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      renderFiltered();
    });
  });

  // Search input typing
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderFiltered();
    });
  }

  // Initial render
  renderFiltered();
}

/* ==========================================================================
   5. Pet Details Page Loader
   ========================================================================== */
function initPetDetailsPage() {
  const detailsContainer = document.getElementById('petDetailsContainer');
  if (!detailsContainer || typeof getPetById !== 'function') return;

  const urlParams = new URLSearchParams(window.location.search);
  const petId = urlParams.get('id') || 'luna'; // Fallback to Luna if no id is passed
  const pet = getPetById(petId) || getPetById('luna');

  if (!pet) return;

  // Update page title
  document.title = `${pet.name} | Adopt at Paws & Hearts`;

  const speciesLabel = pet.species.charAt(0).toUpperCase() + pet.species.slice(1);
  const speciesBadgeClass = pet.species === 'dog' ? 'badge-dog' : pet.species === 'cat' ? 'badge-cat' : 'badge-other';

  detailsContainer.innerHTML = `
    <div class="pet-details-layout">
      <div class="pet-details-image">
        <img src="${pet.image}" alt="${pet.name}" />
      </div>
      
      <div class="pet-details-info">
        <div class="pet-details-header">
          <div class="pet-details-title-row">
            <h1 class="section-title" style="margin-bottom: 0;">${pet.name}</h1>
            <span class="badge ${speciesBadgeClass}" style="font-size: 0.95rem; padding: 6px 14px;">${speciesLabel}</span>
          </div>
          <p style="font-size: 1.1rem; color: var(--color-secondary); font-weight: 600;">${pet.breed}</p>
        </div>

        <div class="pet-spec-grid">
          <div class="spec-item">
            <span class="spec-label">Age</span>
            <span class="spec-value">${pet.age}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Gender</span>
            <span class="spec-value">${pet.gender}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Size / Weight</span>
            <span class="spec-value">${pet.size}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Adoption Status</span>
            <span class="spec-value" style="color: var(--color-success);">● ${pet.status}</span>
          </div>
        </div>

        <div class="pet-story-block">
          <h3>Meet ${pet.name}</h3>
          <p style="color: var(--color-text-muted); line-height: 1.7; margin-bottom: 16px;">${pet.story}</p>
          <p style="color: var(--color-text-muted); line-height: 1.7;"><strong>Personality:</strong> ${pet.personality}</p>
        </div>

        <div class="pet-story-block">
          <h3>Health & Readiness</h3>
          <ul class="pet-checklist">
            <li><span class="icon">✓</span> ${pet.vaccinated ? 'Fully Vaccinated' : 'Vaccinations Pending'}</li>
            <li><span class="icon">✓</span> ${pet.neutered ? 'Spayed / Neutered' : 'Spay/Neuter Scheduled'}</li>
            <li><span class="icon">✓</span> ${pet.houseTrained ? 'House / Litter Trained' : 'Training in Progress'}</li>
            <li><span class="icon">✓</span> ${pet.goodWithKids ? 'Great with Children' : 'Best with Teens / Adults'}</li>
            <li><span class="icon">✓</span> ${pet.goodWithPets ? 'Friendly with other pets' : 'Prefers solo pet home'}</li>
            <li><span class="icon">✓</span> Microchipped & ID tagged</li>
          </ul>
          <p style="font-size: 0.88rem; color: var(--color-text-light);">${pet.healthNotes}</p>
        </div>

        <div style="margin-top: 32px; display: flex; gap: 16px; flex-wrap: wrap;">
          <a href="adopt.html?pet=${encodeURIComponent(pet.name)}" class="btn btn-primary btn-lg" style="flex: 1;">
            Apply to Adopt ${pet.name}
          </a>
          <a href="pets.html" class="btn btn-outline">
            &larr; Back to All Pets
          </a>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   6. Adoption Application Form
   ========================================================================== */
function initAdoptionForm() {
  const form = document.getElementById('adoptionApplicationForm');
  const petSelect = document.getElementById('petSelect');
  const modal = document.getElementById('confirmationModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (petSelect && typeof getAllPets === 'function') {
    const pets = getAllPets();
    // Populate dropdown
    pets.forEach(pet => {
      const opt = document.createElement('option');
      opt.value = pet.name;
      opt.textContent = `${pet.name} (${pet.breed})`;
      petSelect.appendChild(opt);
    });

    // Check URL parameter for pre-selection
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedPet = urlParams.get('pet');
    if (preselectedPet) {
      for (let i = 0; i < petSelect.options.length; i++) {
        if (petSelect.options[i].value.toLowerCase() === preselectedPet.toLowerCase()) {
          petSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const petName = petSelect ? petSelect.value : 'a pet';
      const applicantName = document.getElementById('applicantName')?.value || 'Applicant';

      // Update modal text
      const modalDesc = document.getElementById('modalMessage');
      if (modalDesc) {
        modalDesc.innerHTML = `Thank you, <strong>${applicantName}</strong>! Your application for <strong>${petName}</strong> has been received. Our adoption counselors review requests within 24 to 48 hours.`;
      }

      // Show modal
      if (modal) {
        modal.classList.add('active');
      }

      form.reset();
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   7. Contact Form
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactInquiryForm');
  const modal = document.getElementById('contactModal');
  const closeModalBtn = document.getElementById('closeContactModalBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contactName')?.value || 'Friend';
      const modalDesc = document.getElementById('contactModalMessage');
      if (modalDesc) {
        modalDesc.innerHTML = `Thank you, <strong>${name}</strong>! We have received your inquiry and our team will get back to you shortly.`;
      }

      if (modal) {
        modal.classList.add('active');
      }

      contactForm.reset();
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   8. FAQ Accordion (About Page)
   ========================================================================== */
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const isActive = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}
