# CFI-Work-Order-Scheduler

# VanillaJS-Vite

How to run:

1. cd vanilla-vite-app
2. npm install
3. Install FullCalendar dependencies
   - "npm install @fullcalendar/core @fullcalendar/adaptive @fullcalendar/interaction @fullcalendar/resource-timeline @fullcalendar/daygrid"
4. npm run dev

# Deploying to NS

1. npm run build
   - This will compile and generate bundle/build (html, js, css files) (see config > rollupOptions > output)
2. Load the bundled index.html file that sources the bundled js and css files into the suitelet

NOTE: execute "npm run build" everytime changes happen under vanilla-vite-app folder before deployment
