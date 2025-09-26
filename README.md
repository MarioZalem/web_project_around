# Around The U.S.

## Project

Experience the live project here: [Around The U.S. Interactive Gallery](https://mariozalem.github.io/web_project_around/)

## Project Description

Around The U.S. is an interactive web application that showcases a curated collection of stunning landscapes from across the United States. The application features a responsive design that adapts seamlessly to different screen sizes, allowing users to manage their profile, add new locations, and interact with the photo gallery through likes and deletions. Built with modern web technologies and following BEM methodology, this project demonstrates proficiency in frontend development and user interface design.

## Technologies and Techniques Used

- HTML5 with semantic markup
- CSS3 implementing BEM methodology
- Vanilla JavaScript for DOM manipulation
- Responsive Design principles
- CSS Grid and Flexbox for layouts
- Modern JavaScript features

## Project Structure

### Core Files

- `index.html`: Main HTML document with semantic markup
- `index.css`: Primary CSS entry point importing all style modules
- `script.js`: JavaScript file handling all interactive functionality

### Style Organization (BEM Methodology)

The project follows BEM methodology with a flat file structure:

- `blocks/`: Individual CSS components
  - `content.css`: Styles for the photo grid and card layouts
  - `footer.css`: Footer section styling
  - `form.css`: Form elements and popup window styles
  - `header.css`: Header and logo styling
  - `page.css`: Global page layout and responsive containers
  - `profile.css`: User profile section styling

### Assets and Resources

- `images/`: Project images and SVG icons including:
  - User interface elements (buttons, icons)
  - Sample landscape photographs
  - Logo and decorative elements
- `vendor/`: Third-party files
  - `normalize.css`: CSS reset and cross-browser normalization
  - `fonts.css`: Custom font declarations and imports

## Features and Functionality

### JavaScript Implementation

The `script.js` file implements several key interactive features:

1. Profile Management

   - Edit user name and description through a modal form
   - Real-time form validation
   - Smooth data updates without page reload

2. Photo Gallery

   - Dynamic card creation and deletion
   - Interactive like/unlike functionality
   - Full-size image view on click
   - Smooth animations for all interactions

3. Modal Windows

   - Multiple modal support for different actions
   - Click-outside closure functionality
   - Keyboard support (ESC key to close)
   - Smooth open/close transitions

4. Responsive Design
   - Breakpoints at 320px, 580px, and 950px
   - Mobile-first approach
   - Optimized layouts for all screen sizes
   - Touch-friendly interface elements

## Installation and Development

1. Clone the repository:

```bash
git clone https://github.com/mariozalem/web_project_around.git
```

2. Navigate to the project directory:

```bash
cd web_project_around
```

3. Open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8080
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Improvements

- Image upload functionality for user-generated content
- User authentication and personal galleries
- Social features including comments and sharing
- Location tagging with interactive map integration
- Advanced image filtering and search capabilities

## Contact

Mario Zamora Alemán - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/mariozalem/web_project_around](https://github.com/mariozalem/web_project_around)

## Acknowledgments

- Design and requirements provided by Practicum
- Images sourced from public domain collections
- Icons and UI elements created with modern design principles

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Directory tree:

```
web_project_around
├─ .vscode
│  └─ settings.json
├─ blocks
│  ├─ content.css
│  ├─ footer.css
│  ├─ form.css
│  ├─ header.css
│  ├─ page.css
│  └─ profile.css
├─ favicon.ico
├─ images
│  ├─ add-btn.svg
│  ├─ add-btn_gde.svg
│  ├─ add-btn_peq.svg
│  ├─ avatar.png
│  ├─ close-icon.svg
│  ├─ edit-btn.svg
│  ├─ heart-filled.svg
│  ├─ heart.svg
│  ├─ lago-di-braies.png
│  ├─ lago-louise.png
│  ├─ latemar.png
│  ├─ logo.svg
│  ├─ montanas-care.png
│  ├─ parque-nacional-de-vanoise.png
│  ├─ trash.svg
│  └─ vale-yosemite.png
├─ index.css
├─ index.html
├─ pages
│  └─ index.css
├─ README.md
├─ scripts
│  └─ index.js
└─ vendor
   ├─ fonts.css
   └─ normalize.css

```
