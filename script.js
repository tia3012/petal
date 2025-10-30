
// ✅ ====== القائمة الجانبية ======
function toggleMenu() {
  document.getElementById("sideMenu").classList.toggle("active");
}

// ✅ ====== البحث ======
function openSearch() {
  const box = document.getElementById("searchBox");
  box.style.display = "flex";
  box.setAttribute("aria-hidden", "false");
  document.getElementById("searchInput").focus();
}

function closeSearch() {
  const box = document.getElementById("searchBox");
  box.style.display = "none";
  box.setAttribute("aria-hidden", "true");
  resetSearch();
}

function performSearch() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const products = document.querySelectorAll(".product-card");
  const resultsContainer = document.getElementById("searchItems");

  if (!q) {
    resultsContainer.innerHTML = "<p>اكتبي كلمة للبحث أو اضغطي عرض الكل.</p>";
    return;
  }

  let matches = [];
  products.forEach((p) => {
    const nameEl = p.querySelector("h3");
    const name = nameEl ? nameEl.textContent.trim().toLowerCase() : "";
    if (name.includes(q)) {
      p.style.display = "block";
      matches.push({ name: nameEl.textContent.trim() });
    } else {
      p.style.display = "none";
    }
  });

  if (matches.length) {
    resultsContainer.innerHTML =
      `<p>النتائج (${matches.length}):</p>` +
      matches.map((m) => `<p>• ${m.name}</p>`).join("");
  } else {
    resultsContainer.innerHTML = "<p>لا توجد نتائج مطابقة.</p>";
  }
}

function resetSearch() {
  document.querySelectorAll(".product-card").forEach((p) => (p.style.display = "block"));
  document.getElementById("searchItems").innerHTML = "";
  document.getElementById("searchInput").value = "";
}

let cart = [];

function openCart() {
  document.getElementById("cartBox").style.display = "flex";
}

function closeCart() {
  document.getElementById("cartBox").style.display = "none";
}

function addToCart(name, price) {
  cart.push({ name, price });
  document.getElementById("cartCount").textContent = cart.length;
  document.getElementById("cartItems").textContent = cart
    .map((item) => `${item.name} - ${item.price} ريال`)
    .join(", ");
  showNotification(`${name} تمت إضافته إلى السلة!`);
}

let users = JSON.parse(localStorage.getItem("users")) || [];

function openLogin() {
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (currentUser) {
    openProfile();
    return;
  }
  hideAllPopups();
  document.getElementById("loginBox").style.display = "flex";
  toggleForm("login");
}

function closeLogin() {
  document.getElementById("loginBox").style.display = "none";
}

function toggleForm(type) {
  document.getElementById("loginForm").style.display = type === "login" ? "block" : "none";
  document.getElementById("signupForm").style.display = type === "signup" ? "block" : "none";
  document.getElementById("welcomeMessage").style.display = "none";
}

function handleSignup() {
  const name = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirm = document.getElementById("signupConfirm").value.trim();

  if (!name || !email || !password || !confirm) {
    alert("يرجى ملء جميع الحقول.");
    return;
  }
  if (password !== confirm) {
    alert("كلمتا المرور غير متطابقتين.");
    return;
  }

  const exists = users.find((u) => u.name === name);
  if (exists) {
    alert("❌ هذا الاسم مستخدم بالفعل.");
    return;
  }

  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedInUser", JSON.stringify(newUser));

  showWelcome(newUser.name);
  showNotification("✅ تم إنشاء الحساب بنجاح!");
}

function handleLogin() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!username || !password) {
    alert("يرجى إدخال جميع البيانات.");
    return;
  }

  const existingUser = users.find(
    (user) => user.name === username && user.password === password
  );

  if (existingUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(existingUser));
    showWelcome(existingUser.name);
  } else {
    alert("❌ اسم المستخدم أو كلمة المرور غير صحيحة.");
  }
}

function showWelcome(name) {
  hideAllPopups();
  document.getElementById("loginBox").style.display = "flex";
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("welcomeMessage").style.display = "block";
  document.getElementById("welcomeText").textContent = `مرحبًا ${name}!`;
}

function logout() {
  localStorage.removeItem("loggedInUser");
  hideAllPopups();
  openLogin();
  showNotification("تم تسجيل الخروج بنجاح.");
}
 function openSubscribe() {
    document.getElementById("subscribePopup").style.display = "flex";
  }

  function closeSubscribe() {
    document.getElementById("subscribePopup").style.display = "none";
  }

  function subscribeNow() {
    alert("تم الاشتراك بنجاح! 🎉");
    closeSubscribe();
  }
// ✅ ====== عرض معلومات الحساب ======
function openProfile() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  hideAllPopups();
  const box = document.getElementById("profileBox");

  if (user) {
    document.getElementById("profileName").textContent = `👋 مرحبًا، ${user.name}`;
    document.getElementById("profileEmail").textContent = `📧 البريد: ${user.email}`;
    document.getElementById("profilePassword").textContent = `🔒 كلمة المرور: ${user.password}`;
    box.style.display = "flex";
  } else {
    openLogin();
  }
}

function closeProfile() {
  document.getElementById("profileBox").style.display = "none";
}

// ✅ إغلاق كل البوكسات أولاً قبل فتح أي بوكس جديد
function hideAllPopups() {
  document.querySelectorAll(".popup").forEach(p => p.style.display = "none");
}

window.onload = function () {
  hideAllPopups();
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (currentUser) showWelcome(currentUser.name);
};
function showNotification(message, color = "#4CAF50") {
  const box = document.getElementById("notifyBox");
  box.textContent = message;
  box.style.backgroundColor = color;
  box.classList.add("show");
  setTimeout(() => {
    box.classList.remove("show");
  }, 3000);
}
let currentSlide = 0;
  const slides = document.querySelectorAll('.benefit-slide');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  document.querySelector('.next').addEventListener('click', nextSlide);
  document.querySelector('.prev').addEventListener('click', prevSlide);

  // تشغيل تلقائي كل 5 ثوانٍ
  setInterval(nextSlide, 5000);
  document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    showNotification('تم إرسال رسالتك بنجاح! سنقوم بالرد قريبًا 💌');
    this.reset();
  });
 // ✅ ====== فورم الاشتراك الشهري ======
function openSubscribe() {
  hideAllPopups(); // عشان ما تتفتحش فورم تانية في نفس الوقت
  document.getElementById("subscribePopup").style.display = "flex";
}

function closeSubscribe() {
  document.getElementById("subscribePopup").style.display = "none";
}

function submitSubscription() {
  const name = document.getElementById("subName").value.trim();
  const email = document.getElementById("subEmail").value.trim();
  const plan = document.getElementById("subPlan").value.trim();

  if (!name || !email || !plan) {
    alert("من فضلك أدخلي جميع البيانات المطلوبة.");
    return;
  }

  showNotification(`تم الاشتراك بنجاح في باقة ${plan} 🎉`);
  closeSubscribe();
}
