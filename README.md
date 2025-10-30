Here’s the simplest way to run this MERN app:
1) Start the React frontend
# In VS Code → Terminal → New Terminal
cd frontEnd
npm install     # first time only
npm start       # runs the React app
2) Start the Node/Express backend
# VS Code → Terminal → New Terminal (open a SECOND terminal)
cd backEnd
npm install     # first time only
node server.js  
Keep both terminals open.

# Open the page In your browser for Admin Panel → (http://localhost:3000/AdminPanel)



About MERN app  
Blog Website with admin panel
Built a dynamic MERN app (React, Node.js, Express, MongoDB) with 4 pages—Home, About, Categories, Contact—and an Admin panel.
Home: auto image slideshow; Trending blogs (image, title, age rating); full blog list with filters (Community, Company, Culture, Technology); blog cards show title, post-date, author, and text; Monetization section with rules.
About: header, text, and update cards (image, header, text).
Categories: same components as Home’s category section.
Contact: form (name, email, subject, message) saved to MongoDB + social links.
Admin: manage all text, components, colour theme, navBar logo, blogs, and cards with full CRUD.
