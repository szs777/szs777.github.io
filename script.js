(() => {
  'use strict';
  const translations = {
    skip: 'Skip to main content',
    navAbout: 'About', navPapers: 'Publications', navEducation: 'Education', navInternship: 'Internship', navContact: 'Contact',
    eyebrow: 'LARGE LANGUAGE MODELS · REINFORCEMENT LEARNING · ZEROTH-ORDER OPTIMIZATION',
    intro: 'I am a master’s student in <strong>Management Science and Engineering</strong> at the School of Management, <strong>Xi’an Jiaotong University</strong>. I received my undergraduate education at XJTU’s School of Mathematics and Statistics. My research focuses on <strong>mathematical reasoning in large language models</strong>, with an emphasis on memory-efficient post-training using zeroth-order optimization and reinforcement learning.',
    introResearch: 'I also study <strong>reasoning robustness and model privacy</strong>, and am interested in preference alignment methods such as RLHF and DPO.',
    researchTitle: 'Research Interests',
    efficientTitle: 'LLM Reinforcement Learning and Zeroth-Order Fine-Tuning Algorithms',
    efficientText: 'Evolution strategies and zeroth-order optimization for full-parameter fine-tuning with lower memory and compute costs, and stronger mathematical reasoning.',
    trustTitle: 'Robustness & Privacy',
    trustText: 'Understanding how input perturbations affect LLM reasoning and how adversarial examples reveal membership information, to evaluate model reliability and privacy.',
    publicationsTitle: 'Publications & Preprints', paper: 'Paper', code: 'Code',
    equalContribution: '(* Co-First Author)',
    essamSummary: 'Studies full-parameter post-training for mathematical reasoning in LLMs by combining evolution strategies with sharpness-aware maximization.',
    mscrSummary: 'Uses word-level candidate replacement from embedding similarity, WordNet, and masked language models to study the robustness of LLM mathematical reasoning to text perturbations.',
    imiaSummary: 'Studies membership inference using the number of iterations required to generate adversarial examples to determine whether a sample belongs to a model’s training data.',
    dartSummary: 'Studies training-data allocation in evolution strategies through dynamic difficulty estimation, sample reweighting, and targeted replay for full-parameter LLM fine-tuning.',
    educationTitle: 'Education', present: 'Present',
    mastersSchool: 'School of Management, Xi’an Jiaotong University',
    mastersDegree: '<strong>Master’s student</strong> in Management Science and Engineering. Expected graduation: June 2028.',
    bachelorsSchool: 'School of Mathematics and Statistics, Xi’an Jiaotong University',
    bachelorsDegree: '<strong>Undergraduate</strong>, Strong Foundation Program in Mathematics.',
    internshipTitle: 'Internship Experience',
    internSchool: 'SGIT AI Lab, State Grid Corporation of China',
    internRole: '<strong>Research Intern</strong>, mentored by Associate Prof. <a href="https://xuejing0203.github.io/" target="_blank" rel="noopener noreferrer"><strong>Haishan Ye</strong></a>.',
    contactTitle: 'Let’s Connect', contactText: 'I welcome discussions on LLM optimization, reasoning robustness, and AI security.',
    footerAffiliation: 'Xi’an Jiaotong University', updated: 'Updated October 2026', backTop: 'Back to top ↑'
  };
  const textElements = [...document.querySelectorAll('[data-i18n]')];
  const chinese = new Map(textElements.map(element => [element, element.innerHTML]));
  const languageToggle = document.getElementById('language-toggle');
  const menuButton = document.querySelector('.menu-button');
  const navigation = document.getElementById('navigation');
  let language = 'zh';

  function setLanguage(nextLanguage) {
    language = nextLanguage === 'en' ? 'en' : 'zh';
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    for (const element of textElements) {
      element.innerHTML = language === 'en' ? (translations[element.dataset.i18n] ?? chinese.get(element)) : chinese.get(element);
    }
    languageToggle.textContent = language === 'en' ? '中 / EN' : 'EN / 中';
    languageToggle.setAttribute('aria-label', language === 'en' ? '切换到中文' : 'Switch to English');
    navigation.setAttribute('aria-label', language === 'en' ? 'Main navigation' : '主要导航');
    menuButton.setAttribute('aria-label', language === 'en' ? 'Toggle navigation menu' : '切换导航菜单');
    document.querySelector('.portrait img').alt = language === 'en' ? 'Portrait of Zhishen Sun' : '孙志深的个人照片';
    document.querySelector('meta[name="description"]').content = language === 'en' ? 'Zhishen Sun’s academic homepage. Research on efficient LLM fine-tuning, mathematical reasoning robustness, and AI security.' : '孙志深（Zhishen Sun）的个人学术主页。研究大语言模型的高效微调、数学推理鲁棒性与人工智能安全。';
    try { localStorage.setItem('zhishen-site-language', language); } catch (_) { /* The site also works when browser storage is unavailable. */ }
  }
  let savedLanguage;
  try { savedLanguage = localStorage.getItem('zhishen-site-language'); } catch (_) { /* Chinese remains the default. */ }
  if (savedLanguage === 'en') setLanguage('en');
  languageToggle.addEventListener('click', () => setLanguage(language === 'zh' ? 'en' : 'zh'));

  function closeMenu() {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  const navLinks = [...navigation.querySelectorAll('a')];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
  let scrollPending = false;
  function updateNavigation() {
    let current = 0;
    sections.forEach((section, index) => { if (section.getBoundingClientRect().top <= 140) current = index; });
    navLinks.forEach((link, index) => {
      link.classList.toggle('active', index === current);
      if (index === current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
    scrollPending = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateNavigation); }
  }, { passive: true });
  updateNavigation();

})();
