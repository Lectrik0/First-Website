# Digital Ronin Portfolio 🥋

A personal portfolio website combining **Vagabond manga aesthetics** with **cybersecurity themes**. Built with Next.js, featuring a strict monochrome "Ink & Blade" design system with authentic paper grain textures.

![Digital Ronin](https://img.shields.io/badge/Theme-Ink%20%26%20Blade-black?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-black?style=for-the-badge&logo=typescript)

## 🎨 Design Philosophy

**"The Digital Ronin"** - Walking the path between tradition and innovation.

- **Strict Monochrome Palette**: No corporate blues, only black/white with minimal blood-red accents
- **Heavy Textures**: Pure CSS paper grain (light) and charcoal dust (dark) for authentic manga feel
- **Manga Panel Layouts**: Asymmetric grids inspired by Takehiko Inoue's visual storytelling
- **Brush Stroke Effects**: Custom hover animations mimicking hand-drawn calligraphy
- **Japanese Typography**: Playfair Display for sharpness, Noto Serif JP for cultural depth

## 🚀 Features

### Complete Personal Website
- **Hero**: Manga-style introduction with vertical ink splash
- **The Path**: CV section (education, certifications, skills)
- **The Archives**: Blog with cybersecurity articles
- **The Dojo**: Projects showcase & CTF achievements
- **Connect**: Contact form & social links

### Interactive Elements
- ⚡ Light/Dark mode toggle (Rice Paper ↔ Void Black)
- 🖌️ Brush stroke underlines on hover
- 📄 Torn paper edge effects on blog cards
- 🎯 Smooth scroll-triggered animations
- 📱 Fully responsive design

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (custom Ink & Blade theme)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes for seamless dark mode

## 📦 Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/Lectrik0/First-Website.git

# Navigate to the directory
cd First-Website

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🎯 Customization Guide

### Update Personal Information

1. **Hero Section** (`components/Hero.tsx`):
   - Replace name and title
   - Update social links
   - Modify philosophical quote

2. **The Path** (`components/ThePath.tsx`):
   - Add your education details
   - List your certifications
   - Update skills and expertise

3. **The Archives** (`components/TheArchives.tsx`):
   - Replace with your blog posts
   - Update dates, tags, and excerpts

4. **The Dojo** (`components/TheDojo.tsx`):
   - Add your GitHub projects
   - Update CTF achievements
   - Modify tech stack badges

5. **Contact** (`components/Contact.tsx`):
   - Update email and social links
   - Configure form submission endpoint

### Customize Colors

Edit `tailwind.config.ts`:
\`\`\`typescript
colors: {
  'paper': '#F0F0F0',    // Light mode background
  'void': '#121212',     // Dark mode background
  'ink': '#000000',      // Light mode text
  'bone': '#EFEFEF',     // Dark mode text
  'blood': '#8B0000',    // Accent color
}
\`\`\`

### Adjust Textures

Edit `app/globals.css` - modify the radial gradients in `body::before` for different grain intensity.

## 📝 Scripts

\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Run ESLint
\`\`\`

## 🎭 Design Credits

- **Aesthetic Inspiration**: Vagabond by Takehiko Inoue
- **Typography**: Playfair Display, Noto Serif JP
- **Theme**: Custom "Ink & Blade" monochrome system

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use!

---

**"Every master was once a beginner. Every expert started as a student."** - Digital Ronin Philosophy

Built with ⚔️ by Ibrahim Elhaddad
