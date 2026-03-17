# SweetCrumb Patisserie Website

A modern, responsive bakery landing page built with HTML, CSS, Bootstrap, and Lightbox. The site includes a hero carousel, gallery, testimonials, and a styled footer for a fictional bakery brand.

## Features

- Responsive design for desktop, tablet, and mobile
- Fixed glass-style navbar with section links
- Hero carousel with call-to-action buttons
- Image gallery with Lightbox preview
- Testimonials and contact/footer sections

## Tech Stack

- HTML5
- CSS3
- Bootstrap 5
- Font Awesome
- Lightbox2

## Project Structure

```text
bakery/
├── index.html
├── README.md
├── .gitignore
├── assets/
│   ├── fonts/
│   │   └── font-awesome.min.css
│   ├── img/
│   │   ├── cake1.jpg ... cake18.jpg
│   │   └── sweetcrumblogo.webp
├── js/
│   └── main.js
└── style/
    └── css/
        ├── Pretty-Footer-.css
        └── styles.css
```

## Run Locally

1. Download or clone this project.
2. Open the `bakery` folder.
3. Open `index.html` in your browser.

## Push This Project to GitHub

### Existing repository (your current case)

```bash
git status
git add -A
git commit -m "Update bakery website"
git push -u origin HEAD
```

`git push -u origin HEAD` pushes to your current branch automatically (`master` or `main`).

### Brand-new repository

```bash
git init
git add -A
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

If `origin` is already set:

```bash
git remote set-url origin https://github.com/<your-username>/<your-repo-name>.git
```

## Pre-Push Checklist

- Open `index.html` once and verify carousel, gallery, and testimonials interactions work.
- Confirm `js/main.js`, `style/css/styles.css`, and `style/css/Pretty-Footer-.css` are tracked.
- Run `git status` and ensure only intended files are listed.
- Confirm your remote is correct with `git remote -v`.
