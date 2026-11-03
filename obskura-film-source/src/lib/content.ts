import { asset } from "@/lib/asset";
/* ————————————————————————————————————————————————
   Контент сайта кинокомпании «ОБСКУРА»
   ———————————————————————————————————————————————— */

export const NAV_ITEMS = [
  { id: "about", num: "01", label: "О компании" },
  { id: "filmography", num: "02", label: "Фильмография" },
  { id: "projects", num: "03", label: "Проекты" },
  { id: "press", num: "04", label: "Пресса" },
  { id: "ai", num: "05", label: "AI-контент" },
  { id: "contacts", num: "06", label: "Контакты" },
] as const;

export type SectionId = (typeof NAV_ITEMS)[number]["id"];

/* ——— Первый экран: кадры-«шоурил» ——— */

export interface HeroFrame {
  src: string;
  caption: string;
}

export const HERO_FRAMES: HeroFrame[] = [
  { src: asset("/v2/hero-1.jpg"), caption: "«Полночный трамвай» · 2024" },
  { src: asset("/v2/hero-2.jpg"), caption: "«Тише снега» · 2025" },
  { src: asset("/v2/hero-3.jpg"), caption: "«Молчание апреля» · 2027, в производстве" },
  { src: asset("/v2/hero-4.jpg"), caption: "«Зимняя дорога» · 2026, пост-продакшн" },
  { src: asset("/v2/hero-5.jpg"), caption: "«Соль» · 2023" },
];

/* ——— 01 · О компании ——— */

export const ABOUT_STATEMENT = {
  before: "Мы производим кино, которое",
  italic: "не отпускает",
  after: "после финальных титров.",
};

export const ABOUT_PARAGRAPHS = [
  "«Обскура» — независимая кинокомпания, основанная в 2014 году продюсером Мариной Ланской. Мы снимаем авторское кино: камерное, точное, встроенное в контекст своего времени. Наши фильмы рождаются медленно — от литературной заявки до финального цвета проходит два-три года, и в этом нет компромиссов.",
  "Компания работает по полной производственной цепочке: развитие сценария, финансирование, съёмки, пост-продакшн и фестивальная стратегия. С 2023 года внутри «Обскуры» действует направление AI-производства — нейросетевые инструменты применяются там, где они усиливают замысел, а не заменяют авторский взгляд.",
  "Сегодня в портфеле компании девять полных метражей и документальных фильмов, сорок семь фестивальных отборов и три международные копродукции. Мы верим: тишина, выдержанная до конца, звучит громче любого крика.",
];

export const STATS = [
  { value: 12, suffix: "", label: "лет в кинопроизводстве" },
  { value: 9, suffix: "", label: "выпущенных фильмов" },
  { value: 47, suffix: "+", label: "фестивальных отборов" },
  { value: 6, suffix: "", label: "стран съёмок" },
];

export interface Producer {
  name: string;
  role: string;
  quote: string;
  image: string;
}

export const PRODUCERS: Producer[] = [
  {
    name: "Марина Ланская",
    role: "Основатель · продюсер",
    quote: "Кино начинается задолго до первого дубля — и не заканчивается титрами.",
    image: asset("/v2/producer-1.jpg"),
  },
  {
    name: "Игорь Савельев",
    role: "Партнёр · продюсер",
    quote: "Мой принцип — давать режиссёру право на тишину.",
    image: asset("/v2/producer-2.jpg"),
  },
  {
    name: "Дарья Крылова",
    role: "Исполнительный продюсер",
    quote: "Лучшая магия — та, что спланирована поминутно.",
    image: asset("/v2/producer-3.jpg"),
  },
];

/* ——— 02 · Фильмография ——— */

export interface Film {
  title: string;
  year: number;
  genre: string;
  duration: string;
  synopsis: string;
  image: string;
  laurels: string[];
  span: string; // класс сетки
}

export const FILMS: Film[] = [
  {
    title: "Тише снега",
    year: 2025,
    genre: "Драма",
    duration: "106 мин",
    synopsis:
      "В глухую северную зиму учительница прячет в своём доме беглеца — и тишина становится испытанием на человечность.",
    image: asset("/v2/film-tishe-snega.jpg"),
    laurels: ["Гран-при «Кинотавра»", "Приз FIPRESCI", "Роттердам — официальная программа"],
    span: "md:col-span-7",
  },
  {
    title: "Полночный трамвай",
    year: 2024,
    genre: "Мелодрама",
    duration: "92 мин",
    synopsis:
      "Двое незнакомцев каждую ночь оказываются в одном трамвае — последнем, идущем через спящий город.",
    image: asset("/v2/film-tramvay.jpg"),
    laurels: ["Приз зрительских симпатий — «Окно»", "Участник 12 фестивалей"],
    span: "md:col-span-5",
  },
  {
    title: "Соль",
    year: 2023,
    genre: "Драма-притча",
    duration: "124 мин",
    synopsis:
      "Солевар умирающей приморской деревни отказывается уезжать последним — пока море не возвращается.",
    image: asset("/v2/film-sol.jpg"),
    laurels: ["Приз за операторскую работу", "Программа «Горизонты»"],
    span: "md:col-span-5",
  },
  {
    title: "Дети мая",
    year: 2022,
    genre: "Документальный",
    duration: "58 мин",
    synopsis:
      "Год в жизни сельской школы, где двадцать детей и четыре национальности говорят на одном языке — языке надежды.",
    image: asset("/v2/film-deti-maya.jpg"),
    laurels: ["Лучший документальный фильм", "Артдокфест — спецприз жюри"],
    span: "md:col-span-7",
  },
  {
    title: "Стеклянный лес",
    year: 2021,
    genre: "Мистический триллер",
    duration: "88 мин",
    synopsis:
      "Гидролог приезжает мерить исчезающее озеро и находит в лесу то, чего нет на картах.",
    image: asset("/v2/film-steklyanniy-les.jpg"),
    laurels: ["Приз жюри критиков", "Приз за лучшую музыку"],
    span: "md:col-span-6",
  },
  {
    title: "Апрель",
    year: 2019,
    genre: "Чёрно-белая драма · дебют",
    duration: "72 мин",
    synopsis:
      "Дебют компании: один месяц из жизни двора, снятый на статичную камеру — как свидетеля, а не рассказчика.",
    image: asset("/v2/film-aprel.jpg"),
    laurels: ["Дебют года — ассоциация киноведов", "Приз гильдии продюсеров"],
    span: "md:col-span-6",
  },
];

/* ——— 03 · Проекты в производстве ——— */

export type ProjectStatus = "production" | "post" | "development";

export interface Project {
  title: string;
  genre: string;
  status: ProjectStatus;
  statusLabel: string;
  premiere: string;
  progress: number; // 0–100
  description: string;
  image: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Молчание апреля",
    genre: "Психологическая драма",
    status: "production",
    statusLabel: "В производстве",
    premiere: "Премьера — 2027",
    progress: 62,
    description:
      "Хроника одной зимы в квартире на окраине: мать и взрослый сын впервые за десять лет вынуждены говорить. Съёмки — статичная камера, один павильон, естественный свет.",
    image: asset("/v2/proj-molchanie.jpg"),
  },
  {
    title: "Зимняя дорога",
    genre: "Роуд-муви",
    status: "post",
    statusLabel: "Пост-продакшн",
    premiere: "Премьера — 2026",
    progress: 84,
    description:
      "Дальнобойщик везёт через всю страну гроб с телом незнакомца. Двенадцать дней пути, двенадцать попутчиков, одна невозможная просьба. Монтаж и цветокоррекция — в работе.",
    image: asset("/v2/proj-zimnyaya-doroga.jpg"),
  },
  {
    title: "Кассиопея",
    genre: "Научно-фантастическая драма",
    status: "development",
    statusLabel: "В разработке",
    premiere: "Премьера — 2028",
    progress: 25,
    description:
      "Смотритель заброшенной обсерватории получает сигнал, которого не должно быть. Третья редакция сценария; международная копродукция в переговорах.",
    image: asset("/v2/proj-kassiogeya.jpg"),
  },
];

/* ——— 04 · Пресса ——— */

export interface PressQuote {
  text: string;
  source: string;
  film: string;
}

export const PRESS_QUOTES: PressQuote[] = [
  {
    text: "Кинокомпания, которая научилась говорить тихо — и быть услышанной.",
    source: "«Искусство кино»",
    film: "о компании",
  },
  {
    text: "«Тише снега» — самое точное высказывание о северном одиночестве за последние годы.",
    source: "Афиша",
    film: "о фильме «Тише снега»",
  },
  {
    text: "Дебютная «Обскура» заявляет новый масштаб авторского кино.",
    source: "Коммерсантъ",
    film: "о фильме «Апрель»",
  },
  {
    text: "Пронзительно, точно, без единого лишнего кадра.",
    source: "Кинопоиск",
    film: "о фильме «Полночный трамвай»",
  },
];

export const MEDIA_NAMES = [
  "Искусство кино",
  "Афиша",
  "Коммерсантъ",
  "Кинопоиск",
  "Variety",
  "Screen Daily",
];

export interface PressKit {
  title: string;
  meta: string;
}

export const PRESS_KITS: PressKit[] = [
  { title: "Пресс-кит компании", meta: "PDF · 8,4 МБ · обновлён 09.2026" },
  { title: "«Тише снега» — материалы для СМИ", meta: "PDF · 12,2 МБ · синопсис, кадры, цитаты" },
  { title: "Фотоархив: кадры и постеры", meta: "ZIP · 146 МБ · 9 фильмов" },
];

/* ——— 05 · Производство AI-контента ——— */

export interface AiService {
  num: string;
  title: string;
  description: string;
}

export const AI_SERVICES: AiService[] = [
  {
    num: "01",
    title: "AI-превиз и раскадровки",
    description:
      "Проверяем драматургию кадра до съёмочного дня: генеративные раскадровки, аниматики и поисковые концепты вместо дорогих пилотов.",
  },
  {
    num: "02",
    title: "Генеративные окружения и VFX",
    description:
      "Расширяем локации, достраиваем миры и воссоздаём эпохи там, где натурные съёмки невозможны или избыточны по бюджету.",
  },
  {
    num: "03",
    title: "Синтетическая озвучка",
    description:
      "Клонирование голоса с согласия актёра, дубляж, дикторские дорожки и локализация на десятки языков без потери интонации.",
  },
  {
    num: "04",
    title: "Реставрация архивов",
    description:
      "Расшумление, апскейл до 4K и бережная колоризация архивных материалов для документальных и музейных проектов.",
  },
  {
    num: "05",
    title: "Промо и трейлерные пакеты",
    description:
      "Вариативные версии трейлеров и рекламных нарезок под площадки, форматы и аудитории — за дни, а не недели.",
  },
];

export const AI_PROCESS = [
  { num: "01", title: "Бриф и референсы", note: "Замысел, стиль, ограничения" },
  { num: "02", title: "Генерация прототипов", note: "Сотни вариантов за часы" },
  { num: "03", title: "Отбор и доработка", note: "Художественный контроль" },
  { num: "04", title: "Интеграция в продакшн", note: "Финальный кадр на экране" },
];

/* ——— 06 · Контакты ——— */

export const CONTACT_EMAIL = "hello@obskura.film";
export const PRESS_EMAIL = "press@obskura.film";
export const CONTACT_PHONE = "+7 (495) 120-40-90";
export const CONTACT_ADDRESS = "Москва, Нижняя Сыромятническая, 10, стр. 9";

export const SOCIALS = [
  { label: "Telegram", href: "https://t.me/obskura_film" },
  { label: "VK", href: "https://vk.com/obskura_film" },
  { label: "YouTube", href: "https://youtube.com/@obskura_film" },
  { label: "Vimeo", href: "https://vimeo.com/obskura" },
];

export const MARQUEE_ITEMS = [
  "Независимое кино",
  "Гран-при «Кинотавра»",
  "9 полных метражей",
  "47 фестивалей",
  "Копродукция · 3 страны",
  "Авторское кино",
  "С 2014 года",
];
