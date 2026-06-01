/**
 * Shared constants for GreenCity E2E tests.
 * Single source of truth for tag names, timeouts, and selectors.
 */

/** News tags available in the Create News form (Ukrainian UI labels). */
export const NEWS_TAGS = {
  NEWS: 'News',
  EVENTS: 'Events',
  EDUCATION: 'Education',
  INITIATIVES: 'Initiatives',
  ADS: 'Ads',
} as const;

/** All tag values as an ordered array. */
export const ALL_TAGS = Object.values(NEWS_TAGS);

/** Maximum number of tags selectable in the Create News form. */
export const MAX_TAGS = 3;

/** Create News form field constraints. */
export const FORM_LIMITS = {
  TITLE_MAX_LENGTH: 170,
  CONTENT_MIN_LENGTH: 20,
  CONTENT_MAX_LENGTH: 63206,
} as const;

/** Default timeouts (ms) used across page objects. */
export const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 20000,
  NAVIGATION: 15000,
  SPA_HYDRATION: 1500,
} as const;

/** Routes relative to the hash base (e.g., #/greenCity). */
export const ROUTES = {
  HOME: '#/greenCity',
  NEWS: '#/greenCity/news',
  CREATE_NEWS: '#/greenCity/news/create-news',
  PROFILE: '#/greenCity/profile',
} as const;

/** Common error/validation messages (may vary by locale). */
export const MESSAGES = {
  CANCEL_MODAL_TITLE: /all created content will be lost|весь створений контент буде втрачено/i,
  IMAGE_UPLOAD_ERROR: /upload only png or jpeg|file size must be less than 10mb|завантажуйте лише png або jpeg/i,
  CONTENT_MIN_ERROR: /must be a minimum of 20|мінімум 20 символів/i,
  SOURCE_URL_ERROR: /link must start with http|посилання має починатися з http/i,
} as const;
