export const guestPhotoAddon = {
 amount: 20,
 currency: 'JOD',
 name: {en: 'Guest Photo Collection', ar: 'مشاركة صور الضيوف'},
 optional: {en: 'Optional addition', ar: 'إضافة اختيارية'},
 fee: {en: '+20 JOD', ar: '+20 د.أ'}
} as const;

export const guestPhotoRequestLabel = (lang: 'en' | 'ar') => `${guestPhotoAddon.name[lang]} (${guestPhotoAddon.fee[lang]})`;
