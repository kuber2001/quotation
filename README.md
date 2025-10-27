# 🪔 Marble Murti Quotation Generator

A beautiful, modern, and fully responsive web application for generating professional quotation PDFs for marble moorti businesses. Built with React, TailwindCSS, Framer Motion, and jsPDF.

## ✨ Features

- 🎨 **Beautiful UI**: Elegant, marble-themed design with glass morphism effects
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop
- 🎭 **Smooth Animations**: Powered by Framer Motion for delightful interactions
- 📄 **PDF Generation**: Professional quotations with jsPDF
- 🏢 **Multi-Firm Support**: Handles two marble moorti businesses
- 🔄 **Live Preview**: See items before generating PDF
- ✅ **Form Validation**: Ensures data integrity
- 🌈 **Modern Design**: Soft colors, rounded cards, and subtle shadows

## 🏢 Supported Firms

### 1. MARBLE MOORTIS
- **GST**: 08CEYPV0867EIZP
- **Location**: Jaipur, Rajasthan
- **Contact**: Mr. Jitendra Vajpayee

### 2. SURAJ MOORTI KALA KENDRA
- **Location**: Pink City, Jaipur, Rajasthan
- **Contact**: Multiple phone lines

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd quotation
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist` folder.

## 🌐 Deploy to GitHub Pages

### Setup

1. Update `vite.config.js` if your repository name is different:
```javascript
base: '/your-repo-name/'
```

2. Add your repository as a git remote (if not already done):
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
```

### Deploy

Run the deploy command:
```bash
npm run deploy
```

This will:
- Build the project
- Create a `gh-pages` branch
- Push the build to GitHub Pages

Your app will be live at: `https://yourusername.github.io/your-repo-name/`

## 📁 Project Structure

```
quotation/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header with title and icon
│   │   ├── FirmSelect.jsx      # Firm selection dropdown
│   │   ├── MurtiForm.jsx       # Form for adding murti items
│   │   ├── MurtiList.jsx       # Table/list of added items
│   │   └── PDFGenerator.jsx    # PDF generation logic
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles + Tailwind
├── index.html                  # HTML template
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind configuration
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## 🎨 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **jsPDF** - PDF generation
- **jsPDF-AutoTable** - Table plugin for jsPDF

## 💡 Usage

1. **Select Firm**: Choose between the two marble moorti firms
2. **Fill Form**: Enter god name, quality, size, price, and optional notes
3. **Add Items**: Click "Add Murti" to add to the quotation
4. **Review**: Check the live preview table
5. **Generate PDF**: Click "Create PDF Quotation" to download

## 🎯 Features in Detail

### Form Validation
- Required fields: God Name, Size, Price
- Custom god name validation
- Numeric validation for size and price
- Real-time error messages

### PDF Features
- Professional header with firm details
- Formatted table with all items
- Auto-calculated total
- Date stamp
- Thank you footer
- Filename: `Quotation_FirmName_Date.pdf`

### Responsive Design
- Mobile-first approach
- Card layout on mobile
- Table layout on desktop
- Touch-friendly buttons
- Optimized for all screen sizes

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:
- Marble tones: `marble-50` to `marble-900`
- Gold accents: `gold-50` to `gold-700`

### Fonts
The app uses Google Fonts (Poppins). Change in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your-Font&display=swap" rel="stylesheet">
```

### Animations
Modify Framer Motion animations in component files for different effects.

## 🐛 Troubleshooting

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Clear cache: `rm -rf node_modules && npm install`

### GitHub Pages 404
- Check `base` path in `vite.config.js` matches your repo name
- Ensure GitHub Pages is enabled in repository settings

### PDF Not Downloading
- Check browser console for errors
- Ensure jsPDF and autoTable are properly installed

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for marble moorti businesses in Jaipur
- Icon: 🪔 (Diya - Oil Lamp)

## 📞 Support

For issues or questions:
1. Check the documentation above
2. Review existing issues
3. Create a new issue with details

---

**Made with ❤️ for Marble Moortis & Suraj Moorti Kala Kendra**

