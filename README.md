# Eng. Yaseen Zaqut Portfolio - YaseenOmar.github.io

This repository hosts the source code for the professional portfolio of **Eng. Yaseen Zaqut**, a Mobile App Developer specializing in Flutter, Android development, and Clean Software Architecture.

The website is modern, accessible, responsive, and performance-optimized (designed for 95+ scores in Lighthouse). Built entirely with native web standard technologies (HTML5, CSS3, Vanilla JS), it requires no compile build processes and launches instantly by opening `index.html`.

## 🔗 Live Site
Explore the live website hosted on GitHub Pages: [https://yaseenomar.github.io/](https://yaseenomar.github.io/)

---

## 🚀 Key Features

* **Sleek, Premium Design**: Curated SaaS-inspired dark theme matching Yaseen's mobile branding.
* **Animated Title Banner**: Dynamic hero typewriter animation highlighting professional developer roles.
* **Interactive Project Grid**: Live category filters (`All`, `Flutter`, `Android`, `Architecture`, `Learning Projects`) with fluid transition animations.
* **Robust Fallback Images**: If WebP screenshots are missing, custom vector gradients are dynamically rendered in CSS.
* **Double-Layer Spam Defense**: Form validation checks + honeypot anti-spam filters configured directly for Formspree.
* **Timeline Chronology**: Elegant vertical timeline marking experiences, workshops, and learning items.
* **Accessibility Compliant (A11y)**: Built with proper semantic markup, descriptive focus rings, hidden labels, and `prefers-reduced-motion` compliance.
* **Fully Configured SEO**: Page title tags, Open Graph meta previews, Twitter social cards, Person Schema JSON-LD metadata, and sitemaps are pre-built.

---

## 📂 Repository File Structure

```
YaseenOmar.github.io/
│
├── index.html            # Main markup and SEO configurations
├── styles.css            # Stylesheets with design system variables
├── script.js             # Interaction events, validations, and animations
├── 404.html              # Custom pages for broken page routing
├── robots.txt            # Crawling directives for web bots
├── sitemap.xml           # Structured map of pages for search engines
│
└── assets/               # Branding resources
    ├── icons/
    │   └── favicon.svg   # Custom YZ initials logo favicon
    ├── images/           # Square placeholders for project previews
    │   ├── profile-placeholder.webp
    │   ├── project-cashiri.webp
    │   ├── project-weather.webp
    │   ├── project-athkar.webp
    │   ├── project-electricity.webp
    │   ├── project-paging.webp
    │   └── social-preview.webp
    └── documents/
        └── Yaseen-Zaqut-CV.pdf   # Developer Curriculum Vitae
```

---

## 💻 How to Run Locally

Since this project uses no heavy node frameworks, running it locally is simple:

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/YaseenOmar/YaseenOmar.github.io.git
   cd YaseenOmar.github.io
   ```
2. Run a simple static file server. You can double-click `index.html` to open it in your browser directly, or run:
   * **Python 3**:
     ```bash
     python3 -m http.server 8000
     ```
     Then navigate to `http://localhost:8000`.
   * **VS Code Extension**: Right-click `index.html` and click **Open with Live Server**.

---

## 🌎 How to Deploy to GitHub Pages

To deploy this portfolio to your own GitHub Pages sub-domain:

1. Create a repository named `YaseenOmar.github.io` on GitHub.
2. Initialize and push your local files:
   ```bash
   git init
   git add .
   git commit -m "Create personal portfolio"
   git branch -M main
   git remote add origin https://github.com/YaseenOmar/YaseenOmar.github.io.git
   git push -u origin main
   ```
3. Enable GitHub Pages in your repository settings:
   * Go to **Settings** (tab at the top of the repository interface).
   * Click **Pages** under the "Code and automation" left sidebar.
   * Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
   * Under **Branch**, select `main` and directory `/ (root)`.
   * Click **Save**.
   * Within a couple of minutes, your portfolio will go live at [https://yaseenomar.github.io/](https://yaseenomar.github.io/).

---

## ⚙️ Customization Guide

### 🧑‍💼 1. Updating Personal Details & Text
Open [index.html](file:///home/yaseen/portfolio/index.html) and search for comment hooks to edit:
* **LinkedIn/Email**: Replace placeholders (e.g. `YOUR-LINKEDIN-USERNAME`, `yaseen.zaqut.developer@gmail.com`) in the social links, about cards, and contact options.
* **Bio Statistics**: Edit target counts in the `.stats-grid` section (Projects completed, Workshops, Techs).
* **Experience Dates**: Update the timelines labeled `placeholder-date-exp1`, etc.

### 🖼️ 2. Replacing the Profile Image
1. Prepare a square professional photo (suggested size: `500x500` pixels, webp format).
2. Save it as `profile-placeholder.webp` in `assets/images/`.
3. In [index.html](file:///home/yaseen/portfolio/index.html), go to the `#hero` section. Comment out the `<div class="phone-mockup">` mockup code blocks, and uncomment the profile image card element to switch layouts.

### 📁 3. Adding the CV (Resume)
1. Export your latest CV as a PDF named `Yaseen-Zaqut-CV.pdf`.
2. Move it to the `assets/documents/` folder.
3. The "Download CV" action button on the landing page will link to this file.

### 🔗 4. Updating Project Details & Screenshots
* **Screenshot replacement**: Place actual screenshot images named `project-cashiri.webp`, `project-weather.webp`, etc., in the `assets/images/` folder. The image tags contain an `onerror` handler to hide broken items automatically, letting the design fall back onto beautiful CSS vector panels when images are missing.
* **Project links**: In the `index.html` card footer tags, replace the default profile URLs (`https://github.com/YaseenOmar`) with the actual source code repository sub-links.

### 📧 5. Connecting Formspree for Contact Form Emails
1. Sign up for a free account at [Formspree](https://formspree.io/).
2. Create a target form and copy the endpoint token ID (e.g., `https://formspree.io/f/mqkvlqbz`).
3. Open `index.html`, find the `<form id="contact-form">` tag inside the Contact section.
4. Replace `https://formspree.io/f/placeholder-id` with your real endpoint URL. Save.

### 🎨 6. Customizing Branding Colors
All styling parameters are driven by CSS Variables defined at the top of [styles.css](file:///home/yaseen/portfolio/styles.css). Adjust color hexes inside the `:root` selector:
```css
:root {
  --bg-primary: #070B14;
  --bg-secondary: #0D1424;
  --bg-card: #111A2E;
  
  --color-primary: #3B82F6;
  --color-secondary: #22D3EE;
  /* change other colors below... */
}
```

---

## 📄 License
This project is open-source. Feel free to copy, modify, and style it as your own personal portfolio.
