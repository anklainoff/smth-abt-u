// =============== НАСТРОЙКИ (редактируйте здесь) ===============
const CONFIG = {
  // Пароль для входа
  password: "немеция",
  
  // Приветствия (случайный выбор)
  greetings: [
    "Добро пожаловать",
    "Привет",
    "Рад тебя видеть",
    "С возвращением",
    "Ты прекрасна"
  ],
  
  // Имена (случайный выбор)
  names: [
    "Алёна",
    "Лисёна",
    "Любимая"
  ],
  
  // Фотографии и подписи к ним
  photos: [
    { src: "IMG_3213.jpeg", caption: "Когда-нибудь я обязательно тебя обниму" }
  ],
  
  // Текстовые блоки между фото (пусто)
  textBlocks: [],
  
  // Заголовок второй страницы
  loveTitle: "Для тебя",
  
  // Письмо внизу (пусто)
  letter: "",
  
  // Скорость смены приветствия (мс)
  greetingInterval: 4200,
  
  // Длительность анимации ошибки (мс)
  errorDuration: 2400,
};

// =============== ЛОГИКА ===============
document.addEventListener('DOMContentLoaded', () => {
  // DOM элементы
  const welcomeScreen = document.getElementById('welcome-screen');
  const loveScreen = document.getElementById('love-screen');
  const greetingText = document.getElementById('greeting-text');
  const nameText = document.getElementById('name-text');
  const passwordInput = document.getElementById('password-input');
  const submitBtn = document.getElementById('submit-password');
  const errorMsg = document.getElementById('error-message');
  const bgLayer = document.getElementById('bg-layer');
  const loveBgLayer = document.getElementById('love-bg-layer');
  const loveContent = document.getElementById('love-content');
  const loveTitle = document.getElementById('love-title');
  const cardsContainer = document.getElementById('cards-container');
  const letterContainer = document.getElementById('letter-container');
  const letterTextEl = document.querySelector('.letter-text');

  // Установка заголовка и письма из настроек
  loveTitle.textContent = CONFIG.loveTitle;
  if (letterTextEl) letterTextEl.textContent = CONFIG.letter;
  
  // Если письмо пустое — скрываем контейнер
  if (!CONFIG.letter) {
    letterContainer.style.display = 'none';
  }

  // =============== ГЕНЕРАЦИЯ ФОНОВЫХ ЧАСТИЦ ===============
  function createOrbs(layer, count = 5) {
    for (let i = 0; i < count; i++) {
      const orb = document.createElement('div');
      orb.className = 'orb';
      const size = Math.random() * 220 + 100;
      orb.style.width = size + 'px';
      orb.style.height = size + 'px';
      orb.style.background = `radial-gradient(circle at 30% 30%, rgba(167,139,250,0.25), rgba(80,60,130,0.15))`;
      orb.style.left = Math.random() * 100 + '%';
      orb.style.top = Math.random() * 100 + '%';
      layer.appendChild(orb);
    }
    
    for (let i = 0; i < 18; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const s = Math.random() * 5 + 2;
      particle.style.width = s + 'px';
      particle.style.height = s + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      layer.appendChild(particle);
    }
  }
  
  createOrbs(bgLayer, 6);
  createOrbs(loveBgLayer, 5);

  // =============== АНИМАЦИЯ ФОНА (плавная, медленная) ===============
  function animateBackground() {
    const orbs = document.querySelectorAll('.orb');
    const particles = document.querySelectorAll('.particle');
    
    const orbPositions = [];
    const particlePositions = [];
    
    orbs.forEach(() => {
      orbPositions.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        speedX: 0.005 + Math.random() * 0.01,
        speedY: 0.004 + Math.random() * 0.008
      });
    });
    
    particles.forEach(() => {
      particlePositions.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        speedX: 0.01 + Math.random() * 0.02,
        speedY: 0.008 + Math.random() * 0.015
      });
    });
    
    function move() {
      orbs.forEach((orb, idx) => {
        const pos = orbPositions[idx];
        pos.x += pos.speedX;
        pos.y += pos.speedY;
        
        if (pos.x > 130) pos.x = -30;
        if (pos.x < -30) pos.x = 130;
        if (pos.y > 130) pos.y = -30;
        if (pos.y < -30) pos.y = 130;
        
        const screenX = (pos.x - 50) * 0.6;
        const screenY = (pos.y - 50) * 0.5;
        orb.style.transform = `translate(${screenX}px, ${screenY}px)`;
      });
      
      particles.forEach((p, i) => {
        const pos = particlePositions[i];
        pos.x += pos.speedX;
        pos.y += pos.speedY;
        
        if (pos.x > 130) pos.x = -30;
        if (pos.x < -30) pos.x = 130;
        if (pos.y > 130) pos.y = -30;
        if (pos.y < -30) pos.y = 130;
        
        const screenX = (pos.x - 50) * 0.8;
        const screenY = (pos.y - 50) * 0.6;
        p.style.transform = `translate(${screenX}px, ${screenY}px)`;
      });
      
      requestAnimationFrame(move);
    }
    move();
  }
  animateBackground();

  // =============== СЛУЧАЙНАЯ СМЕНА ПРИВЕТСТВИЯ ===============
  function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function updateGreeting() {
    const newGreeting = getRandomItem(CONFIG.greetings);
    const newName = getRandomItem(CONFIG.names);
    
    greetingText.style.opacity = '0';
    greetingText.style.filter = 'blur(12px)';
    greetingText.style.transform = 'translateY(8px) scale(0.96)';
    nameText.style.opacity = '0';
    nameText.style.filter = 'blur(12px)';
    nameText.style.transform = 'translateY(8px) scale(0.96)';
    
    setTimeout(() => {
      greetingText.textContent = newGreeting;
      nameText.textContent = newName;
      
      greetingText.style.opacity = '1';
      greetingText.style.filter = 'blur(0)';
      greetingText.style.transform = 'translateY(0) scale(1)';
      nameText.style.opacity = '1';
      nameText.style.filter = 'blur(0)';
      nameText.style.transform = 'translateY(0) scale(1)';
    }, 350);
  }

  updateGreeting();
  setInterval(updateGreeting, CONFIG.greetingInterval);

  // =============== ОБРАБОТКА ПАРОЛЯ ===============
  function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.add('show');
    passwordInput.classList.add('shake');
    
    setTimeout(() => {
      passwordInput.classList.remove('shake');
      errorMsg.classList.remove('show');
    }, CONFIG.errorDuration);
  }

  function transitionToLove() {
    welcomeScreen.style.transition = 'opacity 0.7s ease, backdrop-filter 0.8s';
    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.backdropFilter = 'blur(20px)';
    
    setTimeout(() => {
      welcomeScreen.classList.remove('active');
      loveScreen.classList.add('active');
      
      loveScreen.style.opacity = '0';
      loveScreen.style.transition = 'opacity 0.9s ease';
      
      setTimeout(() => {
        loveScreen.style.opacity = '1';
      }, 60);
      
      buildLoveContent();
    }, 750);
  }

  submitBtn.addEventListener('click', () => {
    const entered = passwordInput.value.trim();
    if (entered === CONFIG.password) {
      transitionToLove();
    } else {
      showError('Неверный пароль');
    }
  });

  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      submitBtn.click();
    }
  });

  // =============== ПОСТРОЕНИЕ КОНТЕНТА ВТОРОЙ СТРАНИЦЫ ===============
  function buildLoveContent() {
    cardsContainer.innerHTML = '';
    
    const items = [];
    CONFIG.photos.forEach((photo, idx) => {
      items.push({ type: 'photo', data: photo, id: `photo-${idx}` });
      if (idx < CONFIG.textBlocks.length) {
        items.push({ type: 'text', data: CONFIG.textBlocks[idx], id: `text-${idx}` });
      }
    });
    
    items.forEach(item => {
      if (item.type === 'photo') {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-reveal', '');
        card.innerHTML = `
          <img src="${item.data.src}" alt="${item.data.caption}" loading="lazy">
          <div class="card-caption">${item.data.caption}</div>
        `;
        cardsContainer.appendChild(card);
      } else {
        const textBlock = document.createElement('div');
        textBlock.className = 'text-block';
        textBlock.setAttribute('data-reveal', '');
        textBlock.textContent = item.data;
        cardsContainer.appendChild(textBlock);
      }
    });
    
    // Сразу показываем все элементы (без ожидания прокрутки)
    setTimeout(() => {
      document.querySelectorAll('[data-reveal]').forEach(el => {
        el.classList.add('visible');
      });
      if (letterContainer && CONFIG.letter) {
        letterContainer.classList.add('visible');
      }
    }, 100);
  }

  // Начальная установка второй страницы
  loveScreen.style.opacity = '0';
});
