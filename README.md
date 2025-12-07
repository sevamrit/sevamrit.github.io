# 🙏 Sevaamrit - NGO Website

**Preserving Dignity, Nourishing Lives**

A modern, responsive website for Sevaamrit NGO focused on food distribution, clothing donation, and disaster relief across India.

![Sevaamrit Banner](https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## 🌟 Features

- **Modern Design**: Clean, emotional design inspired by leading NGOs like Akshaya Patra and UNICEF
- **Fully Responsive**: Works beautifully on desktop, tablet, and mobile devices
- **Animated Sections**: Smooth scroll animations using AOS library
- **Interactive Elements**: 
  - Animated impact counters
  - Donation amount selector
  - Mobile hamburger menu
  - Back to top button
- **Accessibility Ready**: Skip links, proper focus states, reduced motion support
- **Performance Optimized**: Lazy loading images, optimized animations

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Saffron Orange | `#FF9933` | Primary accent, CTAs, highlights |
| Earth Brown | `#8B4513` | Secondary accent, warmth |
| Forest Green | `#2E8B57` | Success states, nature connection |
| Cream | `#FDFBF7` | Background, light sections |
| Deep Navy | `#1a1a2e` | Dark sections, footer |

## 📁 Project Structure

```
sevamrit/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── main.js         # JavaScript functionality
├── images/             # Local images (if needed)
└── README.md           # This file
```

## 🚀 Quick Start

### Option 1: Direct Open
Simply open `index.html` in your web browser.

### Option 2: Local Server (Recommended)

Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Using Node.js:
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```

Then visit: `http://localhost:8000`

## 📦 Dependencies (CDN)

The website uses the following CDN-hosted libraries:

- **Google Fonts**: Lora, League Spartan, Open Sans
- **Font Awesome 6.5.1**: Icons
- **AOS 2.3.1**: Animate on Scroll

No npm install required!

## 📱 Sections

1. **Hero**: Full-screen video background with main CTA
2. **About**: Mission and vision with imagery
3. **Impact Dashboard**: Animated statistics counters
4. **Initiatives**: Three main programs - Amrit Aahar, Vastra Samman, Sanjeevani
5. **Reach/Map**: India map with active regions
6. **Testimonials**: Stories from beneficiaries and volunteers
7. **Donate**: Interactive donation form
8. **Partners**: Logo showcase
9. **Footer**: Contact info, links, newsletter signup

## ⚙️ Customization

### Changing Colors
Edit the CSS variables in `css/style.css`:

```css
:root {
    --saffron: #FF9933;
    --earth-brown: #8B4513;
    --forest-green: #2E8B57;
    --cream: #FDFBF7;
    --deep-navy: #1a1a2e;
}
```

### Updating Content
All content is in `index.html`. Update:
- Text content directly in HTML
- Image URLs (currently using Unsplash)
- Contact information in footer
- Social media links

### Adding Payment Gateway
Replace the donate button click handler in `js/main.js` with your actual payment gateway integration (Razorpay, PayU, etc.)

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## 📄 License

This project is created for Sevaamrit NGO. Please contact for usage rights.

## 🤝 Contributing

Contributions welcome! Areas for improvement:
- Multi-language support (Hindi, regional languages)
- Blog/News section
- Volunteer registration form
- Event calendar
- Admin dashboard

## 📞 Contact

- **Website**: [sevaamrit.org](https://sevaamrit.org)
- **Email**: namaste@sevaamrit.org
- **Phone**: +91 98765 43210
- **Address**: 123 Seva Marg, Near Gandhi Ashram, New Delhi - 110001

---

*"Service to humanity is service to God"* 🙏

