# SARYA Website UI

Static UI prototype for **سَرِيًّا - روح الدار**.

## Files

- `index.html` - Home page
- `sarya-store/index.html` - Product catalog and cart demo
- `sarya-story/index.html` - Extended brand story
- `sarya-contact/index.html` - Contact page
- `sarya-admin/index.html` - Demo admin page for adding pictures
- `assets/css/styles.css` - Shared responsive styling
- `assets/js/app.js` - Shared UI behavior, filters, cart demo, and local image uploads

## Notes

- This is stage 1 UI only. No database is connected yet.
- The admin page stores uploaded pictures in the browser using `localStorage`, so it is only for client preview.
- No product photos are bundled with the project. Images can be added from `admin.html` during the demo.
- The next stage can connect the same product/image fields to a real database, storage bucket, payments, and order tracking.
