const storageKeys = {
  cart: "sarya.cart",
  images: "sarya.images"
};

const categories = [
  {
    id: "cosmetics",
    name: "العناية والتجميل",
    icon: "sparkles",
    description: "سيروم وشامبو طبيعي خال من السلفات والكيماويات القاسية."
  },
  {
    id: "cleaners",
    name: "منظفات المطبخ",
    icon: "spray-can",
    description: "منظفات قوية على الدهون ولطيفة على الأيدي والبيئة."
  },
  {
    id: "soap",
    name: "صابون علاجي",
    icon: "droplets",
    description: "صابون يدوي من زيوت نباتية ومستخلصات عشبية."
  },
  {
    id: "candles",
    name: "شموع طبيعية",
    icon: "flame",
    description: "شموع صويا ونحل بزيوت عطرية مهدئة."
  },
  {
    id: "pottery",
    name: "فخار صحي",
    icon: "bowl",
    description: "قطع من طمي أسواني أصيل خالية من الرصاص."
  },
  {
    id: "wood",
    name: "أخشاب مستدامة",
    icon: "tree-pine",
    description: "إكسسوارات منزلية مصنوعة من أخشاب طبيعية."
  },
  {
    id: "decoupage",
    name: "ديكوباج وأشغال",
    icon: "palette",
    description: "قطع فنية يدوية متفردة يستحيل تكرارها."
  },
  {
    id: "herbs",
    name: "أعشاب صحية",
    icon: "sprout",
    description: "توليفات أعشاب ونباتات عطرية للصحة والهدوء."
  }
];

const products = [
  {
    id: "herbal-serum",
    name: "سيروم عشبي مغذي",
    category: "cosmetics",
    use: "skin",
    price: 420,
    rating: 4.9,
    story: "تركيبة خفيفة بمستخلصات عشبية صافية تساعد البشرة والشعر على استعادة توازنهما الطبيعي."
  },
  {
    id: "natural-shampoo",
    name: "شامبو علاجي طبيعي",
    category: "cosmetics",
    use: "skin",
    price: 360,
    rating: 4.8,
    story: "خيار يومي خال من السلفات والمواد القاسية، مناسب لفروة الرأس الحساسة."
  },
  {
    id: "kitchen-cleaner",
    name: "منظف مطبخ حيوي",
    category: "cleaners",
    use: "home",
    price: 210,
    rating: 4.7,
    story: "مصمم للمطابخ النشطة، قوي على الدهون وقابل للتحلل بالكامل."
  },
  {
    id: "therapy-soap",
    name: "صابون زيتون علاجي",
    category: "soap",
    use: "skin",
    price: 160,
    rating: 4.9,
    story: "قطعة صابون يدوية من زيوت نباتية نقية تمنح البشرة تغذية رقيقة."
  },
  {
    id: "calm-candle",
    name: "شمعة سكينة",
    category: "candles",
    use: "wellness",
    price: 290,
    rating: 4.6,
    story: "شمعة طبيعية من شمع الصويا ممزوجة بزيوت عطرية هادئة."
  },
  {
    id: "aswan-pot",
    name: "إناء طمي أسواني",
    category: "pottery",
    use: "craft",
    price: 680,
    rating: 4.8,
    story: "قطعة فخار صحية تشكل يدويا من الطمي الأسواني الطبيعي."
  },
  {
    id: "wood-tray",
    name: "صينية خشب طبيعي",
    category: "wood",
    use: "home",
    price: 540,
    rating: 4.7,
    story: "إكسسوار منزلي من كتلة خشبية مستدامة يضيف دفء الطبيعة."
  },
  {
    id: "decoupage-box",
    name: "علبة ديكوباج فنية",
    category: "decoupage",
    use: "craft",
    price: 470,
    rating: 4.9,
    story: "قطعة تزين يدويا بتفاصيل فنية تجعل كل نسخة مختلفة عن الأخرى."
  },
  {
    id: "calm-herbs",
    name: "توليفة أعشاب هدوء",
    category: "herbs",
    use: "wellness",
    price: 190,
    rating: 4.8,
    story: "مزيج أعشاب عطرية منتقى بعناية لدعم الهدوء النفسي وروح الدار."
  }
];

const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function routeTo(path) {
  const nested = /\/sarya-[^/]+\/(?:index\.html)?$/.test(window.location.pathname);
  return `${nested ? "../" : ""}${path}`;
}

function readStore(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getImages() {
  return readStore(storageKeys.images, { hero: "", gallery: [], products: {} });
}

function setImages(images) {
  writeStore(storageKeys.images, images);
}

function formatPrice(price) {
  return `${price.toLocaleString("ar-EG")} ج.م`;
}

function categoryById(id) {
  return categories.find((category) => category.id === id);
}

function icon(name) {
  return `<i data-lucide="${name}"></i>`;
}

function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function initNav() {
  const toggle = qs("[data-nav-toggle]");
  const menu = qs("[data-nav-menu]");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

function initCartCount() {
  const cart = readStore(storageKeys.cart, []);
  qsa("[data-cart-count]").forEach((node) => {
    node.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  });
}

function renderCategories() {
  const grid = qs("[data-category-grid]");
  if (!grid) return;
  grid.innerHTML = categories.map((category) => `
    <a class="category-tile" href="${routeTo(`sarya-store/?category=${category.id}`)}">
      <span class="category-icon">${icon(category.icon)}</span>
      <span>
        <h3>${category.name}</h3>
        <p>${category.description}</p>
      </span>
    </a>
  `).join("");
}

function productImage(productId, label) {
  const images = getImages();
  const src = images.products?.[productId];
  if (src) {
    return `<div class="product-image"><img src="${src}" alt="${label}"></div>`;
  }
  return `<div class="product-image"><span>صورة ${label}<br>من لوحة الإدارة</span></div>`;
}

function renderProducts() {
  const grid = qs("[data-product-grid]");
  if (!grid) return;

  const categoryFilter = qs("[data-category-filter]");
  const useFilter = qs("[data-use-filter]");
  const priceFilter = qs("[data-price-filter]");
  const sortFilter = qs("[data-sort-filter]");
  const priceValue = qs("[data-price-value]");
  const count = qs("[data-product-count]");

  categoryFilter.innerHTML = `<option value="all">كل الأقسام</option>${categories.map((category) => (
    `<option value="${category.id}">${category.name}</option>`
  )).join("")}`;

  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get("category");
  if (categoryParam) categoryFilter.value = categoryParam;

  const apply = () => {
    priceValue.textContent = priceFilter.value;
    let result = products.filter((product) => {
      const byCategory = categoryFilter.value === "all" || product.category === categoryFilter.value;
      const byUse = useFilter.value === "all" || product.use === useFilter.value;
      const byPrice = product.price <= Number(priceFilter.value);
      return byCategory && byUse && byPrice;
    });

    if (sortFilter.value === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortFilter.value === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortFilter.value === "rating") result.sort((a, b) => b.rating - a.rating);

    count.textContent = result.length;
    grid.innerHTML = result.map((product) => {
      const category = categoryById(product.category);
      return `
        <article class="product-card">
          ${productImage(product.id, product.name)}
          <div class="product-body">
            <div class="product-meta">
              <span>${category.name}</span>
              <span class="price">${formatPrice(product.price)}</span>
            </div>
            <h3>${product.name}</h3>
            <div class="rating-row">
              <span>تقييم ${product.rating}</span>
              <span>${useLabel(product.use)}</span>
            </div>
            <div class="product-actions">
              <button class="button primary" type="button" data-add-cart="${product.id}">
                ${icon("shopping-basket")}
                أضف إلى السلة
              </button>
              <button class="icon-button" type="button" data-product-open="${product.id}" aria-label="تفاصيل ${product.name}">
                ${icon("eye")}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");
    initIcons();
  };

  [categoryFilter, useFilter, priceFilter, sortFilter].forEach((control) => {
    control.addEventListener("input", apply);
  });
  grid.addEventListener("click", handleProductGridClick);
  apply();
}

function useLabel(use) {
  return {
    skin: "العناية",
    home: "المنزل",
    craft: "الحرفة",
    wellness: "الصحة والهدوء"
  }[use] || use;
}

function handleProductGridClick(event) {
  const addButton = event.target.closest("[data-add-cart]");
  const openButton = event.target.closest("[data-product-open]");
  if (addButton) addToCart(addButton.dataset.addCart);
  if (openButton) openProductDialog(openButton.dataset.productOpen);
}

function addToCart(productId) {
  const cart = readStore(storageKeys.cart, []);
  const item = cart.find((entry) => entry.id === productId);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  writeStore(storageKeys.cart, cart);
  initCartCount();
  renderCart();
}

function renderCart() {
  const list = qs("[data-cart-list]");
  if (!list) return;
  const cart = readStore(storageKeys.cart, []);
  if (!cart.length) {
    list.innerHTML = `<p>السلة فارغة في نسخة العرض.</p>`;
    return;
  }
  const total = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
  list.innerHTML = cart.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    if (!product) return "";
    return `
      <div class="cart-item">
        <strong>${product.name}</strong>
        <span>${item.qty} × ${formatPrice(product.price)}</span>
      </div>
    `;
  }).join("") + `
    <div class="cart-item">
      <strong>الإجمالي</strong>
      <span class="price">${formatPrice(total)}</span>
    </div>
    <button class="button ghost small" type="button" data-clear-cart>
      ${icon("trash-2")}
      إفراغ السلة
    </button>
  `;
  initIcons();
}

function initCartActions() {
  const list = qs("[data-cart-list]");
  if (!list) return;
  list.addEventListener("click", (event) => {
    if (!event.target.closest("[data-clear-cart]")) return;
    writeStore(storageKeys.cart, []);
    initCartCount();
    renderCart();
  });
}

function openProductDialog(productId) {
  const dialog = qs("[data-product-dialog]");
  const content = qs("[data-dialog-content]");
  const product = products.find((entry) => entry.id === productId);
  if (!dialog || !content || !product) return;
  const category = categoryById(product.category);
  content.innerHTML = `
    <div class="dialog-layout">
      ${productImage(product.id, product.name)}
      <div class="dialog-copy">
        <p class="eyebrow">${category.name}</p>
        <h2>${product.name}</h2>
        <p>${product.story}</p>
        <p><strong>المكونات:</strong> خامات طبيعية مختارة، خالية من المواد القاسية، ومناسبة للاستخدام المستدام.</p>
        <p><strong>العناية:</strong> يحفظ في مكان جاف وبعيد عن الحرارة المباشرة.</p>
        <button class="button primary" type="button" data-add-cart="${product.id}">
          ${icon("shopping-basket")}
          أضف إلى السلة
        </button>
      </div>
    </div>
  `;
  content.addEventListener("click", handleProductGridClick, { once: true });
  dialog.showModal();
  initIcons();
}

function initDialog() {
  const dialog = qs("[data-product-dialog]");
  const close = qs("[data-dialog-close]");
  if (!dialog || !close) return;
  close.addEventListener("click", () => dialog.close());
}

function initSearch() {
  const panel = qs("[data-search-panel]");
  const open = qs("[data-search-open]");
  const close = qs("[data-search-close]");
  const input = qs("#global-search");
  const results = qs("[data-search-results]");
  if (!panel || !open || !close || !input || !results) return;

  open.addEventListener("click", () => {
    panel.hidden = false;
    input.focus();
  });
  close.addEventListener("click", () => {
    panel.hidden = true;
    input.value = "";
    results.innerHTML = "";
  });
  input.addEventListener("input", () => {
    const term = input.value.trim();
    if (!term) {
      results.innerHTML = "";
      return;
    }
    const found = products.filter((product) => product.name.includes(term) || categoryById(product.category).name.includes(term));
    results.innerHTML = found.length ? found.map((product) => `
      <a class="search-result" href="${routeTo(`sarya-store/?category=${product.category}`)}">
        <strong>${product.name}</strong>
        <span>${formatPrice(product.price)}</span>
      </a>
    `).join("") : `<div class="search-result">لا توجد نتائج مطابقة</div>`;
  });
}

function renderManagedImages() {
  const images = getImages();
  const heroSlot = qs("[data-image-slot='hero']");
  if (heroSlot && images.hero) {
    heroSlot.classList.add("has-image");
    heroSlot.innerHTML = `<img src="${images.hero}" alt="الصورة الرئيسية لسَرِيًّا">`;
  }

  const strip = qs("[data-gallery-strip]");
  if (strip && images.gallery?.length) {
    strip.innerHTML = images.gallery.slice(0, 6).map((src, index) => (
      `<div class="empty-slot"><img src="${src}" alt="صورة إيفنت ${index + 1}"></div>`
    )).join("");
  }
}

function initContactForm() {
  const form = qs("[data-contact-form]");
  const status = qs("[data-form-status]");
  if (!form || !status) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "تم تجهيز الرسالة في نسخة العرض. سيتم ربط الإرسال الحقيقي في المرحلة التالية.";
    form.reset();
  });
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function renderAdmin() {
  const productGrid = qs("[data-product-admin-grid]");
  if (!productGrid) return;
  const images = getImages();

  const heroPreview = qs("[data-admin-preview='hero']");
  heroPreview.innerHTML = images.hero ? `<img src="${images.hero}" alt="الصورة الرئيسية">` : `<span>لا توجد صورة</span>`;

  const gallery = qs("[data-admin-gallery]");
  gallery.innerHTML = images.gallery?.length ? images.gallery.map((src, index) => (
    `<div class="admin-thumb"><img src="${src}" alt="صورة إيفنت ${index + 1}"></div>`
  )).join("") : `
    <div class="admin-thumb">صورة إيفنت</div>
    <div class="admin-thumb">صورة منتج</div>
    <div class="admin-thumb">صورة ورشة</div>
  `;

  productGrid.innerHTML = products.map((product) => {
    const src = images.products?.[product.id];
    return `
      <article class="product-admin-item">
        <strong>${product.name}</strong>
        <div class="upload-preview">${src ? `<img src="${src}" alt="${product.name}">` : `<span>لا توجد صورة</span>`}</div>
        <label class="file-control">
          ${icon("image-plus")}
          اختيار صورة
          <input type="file" accept="image/*" data-product-image-upload="${product.id}">
        </label>
      </article>
    `;
  }).join("");
  initIcons();
}

function initAdminUploads() {
  if (!qs("[data-product-admin-grid]")) return;
  renderAdmin();

  const heroInput = qs("[data-image-upload='hero']");
  heroInput.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const images = getImages();
    images.hero = await readFile(file);
    setImages(images);
    renderAdmin();
  });

  const galleryInput = qs("[data-gallery-upload]");
  galleryInput.addEventListener("change", async (event) => {
    const files = [...(event.target.files || [])];
    if (!files.length) return;
    const images = getImages();
    const nextImages = await Promise.all(files.map(readFile));
    images.gallery = [...(images.gallery || []), ...nextImages].slice(0, 12);
    setImages(images);
    renderAdmin();
  });

  qs("[data-product-admin-grid]").addEventListener("change", async (event) => {
    const input = event.target.closest("[data-product-image-upload]");
    if (!input) return;
    const file = input.files?.[0];
    if (!file) return;
    const images = getImages();
    images.products = images.products || {};
    images.products[input.dataset.productImageUpload] = await readFile(file);
    setImages(images);
    renderAdmin();
  });

  qs("[data-reset-images]").addEventListener("click", () => {
    setImages({ hero: "", gallery: [], products: {} });
    renderAdmin();
  });
}

function init() {
  initNav();
  initCartCount();
  renderCategories();
  renderProducts();
  renderCart();
  initCartActions();
  initDialog();
  initSearch();
  renderManagedImages();
  initContactForm();
  initAdminUploads();
  initIcons();
}

document.addEventListener("DOMContentLoaded", init);
