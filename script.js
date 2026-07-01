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
  
  // Фотографии и подписи к ним (просто замените файлы на свои)
  photos: [
    { src: "https://placehold.co/600x450/3a2a4a/d8c9ff?text=Фото+1", caption: "Тот самый день" },
    { src: "https://placehold.co/600x450/4a3860/e9ddff?text=Фото+2", caption: "Твоя улыбка" },
    { src: "https://placehold.co/600x450/2f2540/c7b2ff?text=Фото+3", caption: "Нежность" }
  ],
  
  // Текстовые блоки между фото
  textBlocks: [
    "Самые тёплые воспоминания",
    "Ценные моменты"
  ],
  
  // Заголовок второй страницы
  loveTitle: "Для тебя",
  
  // Письмо внизу
  letter: 
    "Дорогая,\n\nЭтот маленький сайт — просто напоминание о том, как много ты значишь. Здесь собраны тёплые моменты и светлые воспоминания.\n\nСпасибо, что ты есть.",
  
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

  // =============== ГЕНЕРАЦИЯ ФОНОВЫХ ЧАСТИЦ ===============
  function createOrbs(layer, count = 5) {
    // Создаём большие светящиеся шары
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
    
    // Создаём маленькие частицы
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

  // =============== АНИМАЦИЯ ФОНА ===============
  function animateBackground() {
    const orbs = document.querySelectorAll('.orb');
    const particles = document.querySelectorAll('.particle');
    
    function move() {
      // Двигаем шары
      orbs.forEach((orb, idx) => {
        const speed = 0.0002 + idx * 0.002;
        const x = Math.sin(Date.now() * speed + idx) * 30;
        const y = Math.cos(Date.now() * speed * 0.7 + idx) * 25;
        orb.style.transform = `translate(${x}px, ${y}px)`;
      });
      
      // Двигаем частицы
      particles.forEach((p, i) => {
        const sp = 0.0004 + i * 0.0003;
        const x = Math.sin(Date.now() * sp + i) * 45;
        const y = Math.cos(Date.now() * sp * 0.8) * 35;
        p.style.transform = `translate(${x}px, ${y}px)`;
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
    
    // Анимация исчезновения: fade + blur + scale
    greetingText.style.opacity = '0';
    greetingText.style.filter = 'blur(12px)';
    greetingText.style.transform = 'translateY(8px) scale(0.96)';
    nameText.style.opacity = '0';
    nameText.style.filter = 'blur(12px)';
    nameText.style.transform = 'translateY(8px) scale(0.96)';
    
    // Меняем текст и показываем снова
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

  // Первый запуск и установка интервала
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
    // Плавный переход: затемнение + размытие
    welcomeScreen.style.transition = 'opacity 0.7s ease, backdrop-filter 0.8s';
    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.backdropFilter = 'blur(20px)';
    
    setTimeout(() => {
      welcomeScreen.classList.remove('active');
      loveScreen.classList.add('active');
      
      // Плавное появление второй страницы
      loveScreen.style.opacity = '0';
      loveScreen.style.transition = 'opacity 0.9s ease';
      
      setTimeout(() => {
        loveScreen.style.opacity = '1';
      }, 60);
      
      // Строим карточки и текстовые блоки
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
    
    // Перемешиваем фото и текстовые блоки
    const items = [];
    CONFIG.photos.forEach((photo, idx) => {
      items.push({ type: 'photo', data: photo, id: `photo-${idx}` });
      if (idx < CONFIG.textBlocks.length) {
        items.push({ type: 'text', data: CONFIG.textBlocks[idx], id: `text-${idx}` });
      }
    });
    
    // Создаём элементы
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
    
    // Анимируем письмо
    letterContainer.classList.remove('visible');
    setTimeout(() => {
      letterContainer.classList.add('visible');
    }, 200);
    
    // Запускаем отслеживание появления элементов
    observeReveal();
  }

  // =============== АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ ПРОКРУТКЕ ===============
  function observeReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { 
      threshold: 0.2, 
      rootMargin: "0px 0px -20px 0px" 
    });
    
    revealElements.forEach(el => observer.observe(el));
    
    // Отдельно отслеживаем письмо
    if (letterContainer && !letterContainer.classList.contains('visible')) {
      const letterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            letterContainer.classList.add('visible');
            letterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      letterObserver.observe(letterContainer);
    }
  }

  // =============== ПАРАЛЛАКС ПРИ ПРОКРУТКЕ ===============
  loveContent.addEventListener('scroll', () => {
    const scrolled = loveContent.scrollTop;
    
    // Двигаем картинки с разной скоростью
    const cards = document.querySelectorAll('.card img');
    cards.forEach((img, index) => {
      const speed = 0.03 + index * 0.01;
      img.style.transform = `translateY(${scrolled * speed}px) scale(1.01)`;
    });
    
    // Лёгкое смещение фона
    if (loveBgLayer) {
      loveBgLayer.style.transform = `translateY(${scrolled * 0.015}px)`;
    }
  });

  // Начальная установка второй страницы
  loveScreen.style.opacity = '0';
});
