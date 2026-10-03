import { useEffect, useId, useState, type ComponentType, type CSSProperties, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, Check, MapPin, Music2, RefreshCw } from 'lucide-react';
import './invitation.css';



type Language = 'en' | 'ar';
type Content = Record<string, unknown>;
export type InvitationSection = { id: string; type: string; enabled: boolean; content: Content };
export type InvitationData = {
  id: string; slug: string; title: string; eventType: string; eventDate: string | null;
  language: Language | 'bilingual'; themeKey: string; design: Content; content: Content;
  sections: InvitationSection[]; features: { rsvp: boolean; collectPhone: boolean; collectMessage: boolean; maxGuests: number };
};
type SectionProps = { invitation: InvitationData; content: Content; lang: Language; preview?: boolean };
type SectionRenderer = ComponentType<SectionProps>;
type InvitationTheme = { className: string; sections?: Record<string, SectionRenderer> };

const words = {
  en: {
    invited: 'You are warmly invited', details: 'The occasion', when: 'When', where: 'Where', countdown: 'Until we celebrate',
    days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds', arrived: 'The occasion has arrived.', story: 'Our story',
    gallery: 'A few beautiful moments', schedule: 'The day, thoughtfully planned', location: 'Find your way', map: 'Open location',
    rsvp: 'Will you join us?', rsvpIntro: 'A little reply. So much to look forward to.', name: 'Your name', attendance: 'Your reply',
    yes: 'Joyfully accept', no: 'Regretfully decline', count: 'Guests, including you', phone: 'Phone number', message: 'A note for your host',
    optional: 'Optional', submit: 'Send my reply', sending: 'Sending your reply…', thanks: 'Your reply is with your host.',
    thanksDetail: 'Thank you for letting us know.', privacy: 'I agree to the use of these details to manage my response and share it with the event organiser, as described in the',
    privacyLink: 'Privacy Policy', retention: 'Identifiable replies are normally deleted or anonymised 90 days after the event.',
    closed: 'Replies for this invitation are now closed.', unavailable: 'This invitation is not available.', unavailableDetail: 'Please check the link with your host. It may be private or no longer published.',
    offline: 'A moment, please.', offlineDetail: 'We could not open the invitation. Check your connection and try again.', retry: 'Try again', home: 'Visit Invitéa',
    loading: 'Opening your invitation…', formError: 'Please complete your name, reply and privacy consent.', sendError: 'Your reply could not be confirmed. Please try again or contact your host.',
    limit: 'Please choose a valid number of guests.', tooMany: 'Too many requests. Please wait a little before trying again.',
    dressCode: 'A note on dress', gift: 'A little note', giftLink: 'View details', music: 'Music for the moment', footer: 'An invitation, thoughtfully created.',
    madeBy: 'Created by Invitéa', switch: 'Switch invitation language', skip: 'Skip to invitation', preview: 'Private preview · Replies are disabled',
    previewRsvp: 'This is a private preview. Replies can be sent after the invitation is published.', restricted: 'This preview is private.', restrictedDetail: 'Sign in with the account authorised to view this invitation.', signIn: 'Sign in',
  },
  ar: {
    invited: 'بكل المحبة، ندعوكم', details: 'تفاصيل المناسبة', when: 'الموعد', where: 'المكان', countdown: 'حتى نحتفل معاً',
    days: 'أيام', hours: 'ساعات', minutes: 'دقائق', seconds: 'ثوانٍ', arrived: 'حان موعد المناسبة.', story: 'حكايتنا',
    gallery: 'لحظات تستحق أن تُحفظ', schedule: 'تفاصيل يومنا', location: 'في انتظاركم هنا', map: 'افتح الموقع',
    rsvp: 'هل تشاركنا الفرحة؟', rsvpIntro: 'رد صغير، وفرحة كبيرة بوجودكم.', name: 'اسمك', attendance: 'ردّك',
    yes: 'بكل سرور، سأحضر', no: 'أعتذر عن الحضور', count: 'عدد الضيوف، بما فيهم أنت', phone: 'رقم الهاتف', message: 'كلمة لصاحب الدعوة',
    optional: 'اختياري', submit: 'أرسل ردّي', sending: 'جارٍ إرسال ردّك…', thanks: 'وصل ردّك إلى صاحب الدعوة.',
    thanksDetail: 'شكراً لإخبارنا.', privacy: 'أوافق على استخدام هذه البيانات لإدارة ردّي ومشاركته مع منظم المناسبة وفق',
    privacyLink: 'سياسة الخصوصية', retention: 'تُحذف بيانات الردود المحددة للهوية أو تُخفى هويتها عادةً بعد 90 يوماً من المناسبة.',
    closed: 'انتهت فترة استقبال الردود لهذه الدعوة.', unavailable: 'هذه الدعوة غير متاحة.', unavailableDetail: 'يرجى التأكد من الرابط مع صاحب الدعوة. قد تكون خاصة أو لم تعد منشورة.',
    offline: 'لحظة من فضلك.', offlineDetail: 'تعذر فتح الدعوة. تحقق من اتصالك وحاول مجدداً.', retry: 'حاول مجدداً', home: 'تعرّف على Invitéa',
    loading: 'نفتح دعوتك…', formError: 'يرجى إدخال الاسم واختيار الرد والموافقة على الخصوصية.', sendError: 'لم نتمكن من تأكيد وصول ردّك. حاول مجدداً أو تواصل مع صاحب الدعوة.',
    limit: 'يرجى اختيار عدد صحيح للضيوف.', tooMany: 'طلبات كثيرة خلال وقت قصير. انتظر قليلاً ثم حاول مجدداً.',
    dressCode: 'إطلالة المناسبة', gift: 'كلمة من القلب', giftLink: 'شاهد التفاصيل', music: 'موسيقى لهذه اللحظة', footer: 'دعوة صُنعت بكل عناية.',
    madeBy: 'من تصميم Invitéa', switch: 'تغيير لغة الدعوة', skip: 'انتقل إلى الدعوة', preview: 'معاينة خاصة · إرسال الردود غير متاح',
    previewRsvp: 'هذه معاينة خاصة. يمكن إرسال الردود بعد نشر الدعوة.', restricted: 'هذه المعاينة خاصة.', restrictedDetail: 'سجّل الدخول بالحساب المخول لمشاهدة هذه الدعوة.', signIn: 'تسجيل الدخول',
  },
};

const object = (value: unknown): Content => value && typeof value === 'object' && !Array.isArray(value) ? value as Content : {};
const string = (value: unknown) => typeof value === 'string' ? value : '';
const localized = (value: unknown, lang: Language): string => typeof value === 'string' ? value : string(object(value)[lang]) || string(object(value)[lang === 'en' ? 'ar' : 'en']);
const field = (content: Content, key: string, lang: Language, fallback = '') => localized(content[key], lang) || fallback;
const translatedContent = (content: Content, lang: Language): Content => ({ ...content, ...object(content[lang]) });
function url(value: unknown): string {
  if (typeof value !== 'string' || !value.trim()) return '';
  try { const parsed = new URL(value, window.location.origin); return ['https:', 'http:'].includes(parsed.protocol) ? parsed.href : ''; } catch { return ''; }
}
function timeZone(content: Content): string {
  const candidate = string(content.timeZone) || string(content.timezone) || 'Asia/Amman';
  try { new Intl.DateTimeFormat('en', { timeZone: candidate }).format(); return candidate; } catch { return 'Asia/Amman'; }
}
function dateParts(invitation: InvitationData, content: Content, lang: Language) {
  const date = invitation.eventDate ? new Date(invitation.eventDate) : null;
  if (!date || !Number.isFinite(date.getTime())) return null;
  const zone = timeZone(content);
  return {
    date: new Intl.DateTimeFormat(lang === 'ar' ? 'ar-JO' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: zone }).format(date),
    time: new Intl.DateTimeFormat(lang === 'ar' ? 'ar-JO' : 'en-GB', { hour: 'numeric', minute: '2-digit', timeZone: zone }).format(date),
    zone,
  };
}
function decodeInvitation(value: unknown): InvitationData | null {
  const item = object(value);
  if (!string(item.id) || !string(item.slug) || !string(item.title)) return null;
  const flags = object(item.features);
  return {
    id: string(item.id), slug: string(item.slug), title: string(item.title), eventType: string(item.eventType), eventDate: string(item.eventDate) || null,
    language: item.language === 'ar' || item.language === 'bilingual' ? item.language : 'en', themeKey: string(item.themeKey),
    design: object(item.design), content: object(item.content),
    sections: Array.isArray(item.sections) ? item.sections.slice(0, 30).map((raw, index) => { const section = object(raw); return { id: string(section.id) || `section-${index}`, type: string(section.type), enabled: section.enabled !== false, content: object(section.content) }; }) : [],
    features: { rsvp: flags.rsvp === true, collectPhone: flags.collectPhone === true, collectMessage: flags.collectMessage === true, maxGuests: typeof flags.maxGuests === 'number' && Number.isFinite(flags.maxGuests) ? Math.min(20, Math.max(1, Math.floor(flags.maxGuests))) : 10 },
  };
}

function Ornament() {
  return <span className="inv-ornament" aria-hidden="true"><span /><svg viewBox="0 0 32 40" fill="none"><path d="M16 37V7M16 27C4 28 3 17 4 14c7 1 12 6 12 13ZM16 33c12 0 13-11 12-14-7 1-12 6-12 14ZM16 19C7 12 12 4 16 1c4 3 9 11 0 18Z" /></svg><span /></span>;
}
function SectionHeading({ content, lang, label, title }: { content: Content; lang: Language; label?: string; title: string }) {
  return <header className="inv-section-heading">{(field(content, 'label', lang) || label) && <p className="inv-label">{field(content, 'label', lang, label)}</p>}<h2>{field(content, 'heading', lang, title)}</h2></header>;
}
function Hero({ invitation, content, lang }: SectionProps) {
  const details = dateParts(invitation, content, lang);
  const image = url(content.coverImage || content.image);
  const title = field(content, 'title', lang, invitation.title);
  const hosts = field(content, 'hosts', lang);
  const description = field(content, 'description', lang);
  return <section className={`inv-hero ${image ? 'inv-hero-with-image' : ''}`} aria-labelledby="inv-title">
    <div className="inv-hero-copy"><p className="inv-label">{field(content, 'eyebrow', lang, words[lang].invited)}</p><Ornament />
      <h1 id="inv-title">{title}</h1>{hosts && hosts !== title && <p className="inv-hosts">{hosts}</p>}{description && <p className="inv-description">{description}</p>}
      {details && <time className="inv-date" dateTime={invitation.eventDate || undefined}>{details.date}</time>}
      {invitation.features.rsvp && <a className="inv-button inv-button-outline" href="#inv-rsvp">{words[lang].rsvp}<ArrowUpRight size={16} aria-hidden="true" /></a>}
    </div>
    {image && <div className="inv-hero-image"><img src={image} alt={field(content, 'imageAlt', lang)} fetchPriority="high" /></div>}
  </section>;
}
function Details({ invitation, content, lang }: SectionProps) {
  const details = dateParts(invitation, content, lang);
  const venue = field(content, 'venueName', lang);
  const address = field(content, 'venueAddress', lang);
  if (!details && !venue && !address) return null;
  return <section className="inv-section inv-details"><SectionHeading content={content} lang={lang} title={words[lang].details} />
    <div className="inv-details-grid">{details && <div><p className="inv-label">{words[lang].when}</p><p className="inv-detail-main">{details.date}</p><p>{details.time}</p><span className="inv-timezone" dir="ltr">{details.zone.replaceAll('_', ' ')}</span></div>}
      {(venue || address) && <div><p className="inv-label">{words[lang].where}</p><p className="inv-detail-main">{venue}</p>{address && <p>{address}</p>}</div>}</div>
  </section>;
}
function Countdown({ invitation, content, lang }: SectionProps) {
  const [now, setNow] = useState(Date.now);
  const target = invitation.eventDate ? new Date(invitation.eventDate).getTime() : NaN;
  useEffect(() => { if (!Number.isFinite(target) || target <= Date.now()) return; const timer = window.setInterval(() => { const time = Date.now(); setNow(time); if (time >= target) clearInterval(timer); }, 1000); return () => clearInterval(timer); }, [target]);
  if (!Number.isFinite(target)) return null;
  const remaining = Math.max(0, Math.floor((target - now) / 1000));
  const parts = [Math.floor(remaining / 86400), Math.floor(remaining / 3600) % 24, Math.floor(remaining / 60) % 60, remaining % 60];
  const labels = [words[lang].days, words[lang].hours, words[lang].minutes, words[lang].seconds];
  return <section className="inv-section inv-countdown"><p className="inv-label">{field(content, 'heading', lang, words[lang].countdown)}</p>
    {remaining > 0 ? <div className="inv-countdown-grid" role="timer" aria-label={words[lang].countdown} aria-live="off">{parts.map((part, i) => <div key={labels[i]}><span className="inv-countdown-number">{new Intl.NumberFormat(lang, { minimumIntegerDigits: 2, useGrouping: false }).format(part)}</span><span className="inv-label">{labels[i]}</span></div>)}</div> : <p className="inv-arrived">{field(content, 'completeText', lang, words[lang].arrived)}</p>}
  </section>;
}
function Story({ content, lang }: SectionProps) {
  const body = field(content, 'body', lang) || field(content, 'story', lang);
  const image = url(content.image);
  if (!body && !image) return null;
  return <section className={`inv-section inv-story ${image ? 'inv-story-with-image' : ''}`}>{image && <img src={image} alt={field(content, 'imageAlt', lang)} loading="lazy" />}<div><SectionHeading content={content} lang={lang} title={words[lang].story} />{body && <p className="inv-prose">{body}</p>}</div></section>;
}
function Gallery({ content, lang }: SectionProps) {
  const raw = Array.isArray(content.images) ? content.images : Array.isArray(content.gallery) ? content.gallery : [];
  const images = raw.slice(0, 30).map(item => typeof item === 'string' ? { src: url(item), alt: '' } : { src: url(object(item).src || object(item).url), alt: localized(object(item).alt, lang) }).filter(item => item.src);
  if (!images.length) return null;
  return <section className="inv-section inv-gallery"><SectionHeading content={content} lang={lang} title={words[lang].gallery} /><div className="inv-gallery-grid">{images.map((image, i) => <figure key={`${image.src}-${i}`}><img src={image.src} alt={image.alt} loading="lazy" />{image.alt && <figcaption>{image.alt}</figcaption>}</figure>)}</div></section>;
}
function Schedule({ content, lang }: SectionProps) {
  const raw = Array.isArray(content.items) ? content.items : Array.isArray(content.schedule) ? content.schedule : [];
  const items = raw.slice(0, 40).map(object).filter(item => localized(item.title, lang) || localized(item.description, lang));
  if (!items.length) return null;
  return <section className="inv-section inv-schedule"><SectionHeading content={content} lang={lang} title={words[lang].schedule} /><ol>{items.map((item, i) => <li key={i}><span className="inv-schedule-time">{localized(item.time, lang)}</span><div><h3>{localized(item.title, lang)}</h3>{item.description != null && <p>{localized(item.description, lang)}</p>}</div></li>)}</ol></section>;
}
function Location({ content, lang }: SectionProps) {
  const venue = field(content, 'venueName', lang);
  const address = field(content, 'venueAddress', lang);
  const map = url(content.mapUrl);
  if (!map && !venue && !address) return null;
  return <section className="inv-section inv-location"><MapPin size={26} strokeWidth={1} aria-hidden="true" /><SectionHeading content={content} lang={lang} title={words[lang].location} />{venue && <p className="inv-detail-main">{venue}</p>}{address && <p>{address}</p>}{map && <a className="inv-button inv-button-outline" href={map} target="_blank" rel="noopener noreferrer">{words[lang].map}<ArrowUpRight size={16} aria-hidden="true" /></a>}</section>;
}

function Rsvp({ invitation, content, lang, preview = false }: SectionProps) {
  const id = useId();
  const [attendance, setAttendance] = useState<'yes' | 'no' | ''>('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');
  const [closed, setClosed] = useState(false);
  const t = words[lang];
  const eventTime = invitation.eventDate ? new Date(invitation.eventDate).getTime() : NaN;
  const expired = !Number.isFinite(eventTime) || Date.now() > eventTime + 90 * 86400000;
  if (!invitation.features.rsvp) return null;
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (preview || status === 'sending' || status === 'done') return;
    const data = new FormData(event.currentTarget);
    const guestName = string(data.get('guestName')).trim();
    const guestCount = attendance === 'yes' ? Number(data.get('guestCount')) : 0;
    if (!guestName || !attendance || data.get('privacyAccepted') !== 'on') { setError(t.formError); return; }
    if (!Number.isInteger(guestCount) || (attendance === 'yes' && (guestCount < 1 || guestCount > invitation.features.maxGuests))) { setError(t.limit); return; }
    setError(''); setStatus('sending');
    try {
      const response = await fetch(`/api/invitations/${encodeURIComponent(invitation.slug)}/rsvp`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestName, attendance, guestCount, privacyAccepted: true, website: string(data.get('website')), ...(invitation.features.collectPhone ? { phone: string(data.get('phone')).trim() } : {}), ...(invitation.features.collectMessage ? { message: string(data.get('message')).trim() } : {}) }),
      });
      if (response.status === 410 || response.status === 404) { setClosed(true); setStatus('idle'); return; }
      if (!response.ok) { setError(response.status === 429 ? t.tooMany : response.status === 422 ? t.limit : t.sendError); setStatus('idle'); return; }
      const result: unknown = await response.json();
      if (object(result).received !== true) throw new Error('Reply not confirmed');
      setStatus('done');
    } catch { setError(t.sendError); setStatus('idle'); }
  }
  return <section className="inv-section inv-rsvp" id="inv-rsvp"><Ornament /><SectionHeading content={content} lang={lang} title={t.rsvp} />
    {preview ? <p className="inv-rsvp-closed">{t.previewRsvp}</p> : closed || expired ? <p className="inv-rsvp-closed" role="status">{t.closed}</p> : status === 'done' ? <div className="inv-reply-success" role="status" tabIndex={-1}><Check size={32} strokeWidth={1} aria-hidden="true" /><h3>{t.thanks}</h3><p>{t.thanksDetail}</p></div> : <>
      <p className="inv-rsvp-intro">{field(content, 'intro', lang, t.rsvpIntro)}</p>
      <form onSubmit={submit} className="inv-rsvp-form" aria-busy={status === 'sending'}>
        <label htmlFor={`${id}-name`}>{t.name}<input id={`${id}-name`} name="guestName" autoComplete="name" required maxLength={120} /></label>
        <fieldset className="inv-attendance"><legend>{t.attendance}</legend>{(['yes', 'no'] as const).map(value => <label key={value}><input type="radio" name="attendance" value={value} checked={attendance === value} onChange={() => setAttendance(value)} required /><span>{t[value]}</span></label>)}</fieldset>
        {attendance === 'yes' && <label htmlFor={`${id}-count`}>{t.count}<select id={`${id}-count`} name="guestCount" defaultValue="1">{Array.from({ length: invitation.features.maxGuests }, (_, i) => <option key={i} value={i + 1}>{new Intl.NumberFormat(lang).format(i + 1)}</option>)}</select></label>}
        {invitation.features.collectPhone && <label htmlFor={`${id}-phone`}>{t.phone} <span className="inv-optional">{t.optional}</span><input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>}
        {invitation.features.collectMessage && <label htmlFor={`${id}-message`}>{t.message} <span className="inv-optional">{t.optional}</span><textarea id={`${id}-message`} name="message" rows={3} maxLength={1000} /></label>}
        <div className="inv-honeypot" aria-hidden="true"><label htmlFor={`${id}-website`}>Website<input id={`${id}-website`} name="website" autoComplete="off" tabIndex={-1} /></label></div>
        <label className="inv-consent" htmlFor={`${id}-privacy`}><input id={`${id}-privacy`} name="privacyAccepted" type="checkbox" required /><span>{t.privacy} <Link to={`/${lang}/privacy`} target="_blank" rel="noopener noreferrer">{t.privacyLink}</Link>.</span></label>
        <p className="inv-retention">{t.retention}</p>
        {error && <p className="inv-form-error" role="alert">{error}</p>}
        <button className="inv-button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? t.sending : t.submit}<ArrowUpRight size={16} aria-hidden="true" /></button>
      </form>
    </>}
  </section>;
}
function DressCode({ content, lang }: SectionProps) {
  const body = field(content, 'body', lang) || field(content, 'dressCode', lang);
  if (!body) return null;
  return <section className="inv-section inv-note"><SectionHeading content={content} lang={lang} title={words[lang].dressCode} /><p className="inv-prose">{body}</p></section>;
}
function Gift({ content, lang }: SectionProps) {
  const body = field(content, 'body', lang) || field(content, 'gift', lang);
  const href = url(content.giftUrl || content.url);
  if (!body && !href) return null;
  return <section className="inv-section inv-note"><SectionHeading content={content} lang={lang} title={words[lang].gift} />{body && <p className="inv-prose">{body}</p>}{href && <a className="inv-button inv-button-outline" href={href} target="_blank" rel="noopener noreferrer">{field(content, 'linkLabel', lang, words[lang].giftLink)}<ArrowUpRight size={16} aria-hidden="true" /></a>}</section>;
}
function Music({ content, lang }: SectionProps) {
  const src = url(content.src || content.musicUrl);
  if (!src) return null;
  return <section className="inv-section inv-music"><Music2 size={24} strokeWidth={1} aria-hidden="true" /><SectionHeading content={content} lang={lang} title={words[lang].music} /><audio controls preload="none" src={src} aria-label={field(content, 'heading', lang, words[lang].music)} /></section>;
}
function Footer({ content, lang }: SectionProps) {
  return <footer className="inv-footer"><Ornament /><p>{field(content, 'message', lang, words[lang].footer)}</p><Link to={`/${lang}`} className="inv-credit">{words[lang].madeBy}</Link></footer>;
}

function MidnightGardenHero(props:SectionProps){
  return <div className="inv-midnight-hero"><Hero {...props}/></div>;
}
// A custom design can override individual sections here without duplicating the application.
export const invitationThemes: Record<string, InvitationTheme> = {
  stationery: { className: 'inv-theme-stationery' },
  editorial: { className: 'inv-theme-editorial' },
  'midnight-garden': { className:'inv-theme-midnight',sections:{hero:MidnightGardenHero} },
};
export const invitationSections: Record<string, SectionRenderer> = {
  hero: Hero, details: Details, countdown: Countdown, story: Story, gallery: Gallery, schedule: Schedule,
  location: Location, rsvp: Rsvp, dressCode: DressCode, 'dress-code': DressCode, gift: Gift, music: Music, footer: Footer,
};
function composedSections(invitation: InvitationData): InvitationSection[] {
  if (invitation.sections.length) return invitation.sections.filter(section => section.enabled);
  return ['hero', 'details', 'countdown', 'story', 'gallery', 'schedule', 'location', 'dressCode', 'gift', 'music', ...(invitation.features.rsvp ? ['rsvp'] : []), 'footer'].map(type => ({ id: `default-${type}`, type, enabled: true, content: {} }));
}
function designStyle(design: Content, lang: Language): CSSProperties {
  const color = (value: unknown, fallback: string) => /^#[\da-f]{6}$/i.test(string(value)) ? string(value) : fallback;
  const fonts: Record<string, string> = { 'Playfair Display': '"Playfair Display", Georgia, serif', Georgia: 'Georgia, serif', Manrope: 'Manrope, sans-serif', 'Noto Naskh Arabic': '"Noto Naskh Arabic", serif', 'IBM Plex Sans Arabic': '"IBM Plex Sans Arabic", sans-serif' };
  const font = Object.hasOwn(fonts, string(design.font)) ? fonts[string(design.font)] : fonts['Playfair Display'];
  return { '--inv-paper': color(design.background, '#F8F3EC'), '--inv-ink': color(design.text, '#6E2F3A'), '--inv-accent': color(design.accent, '#D8C2A8'), '--inv-heading': lang === 'ar' ? fonts['Noto Naskh Arabic'] : font } as CSSProperties;
}

export default function Invitation() {
  const { slug = '', id } = useParams();
  const preview = Boolean(id);
  const access = new URLSearchParams(window.location.search).get('access') === 'client' ? 'client' : 'admin';
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'missing' | 'restricted' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);

  const [preferredLang, setPreferredLang] = useState<Language>(() => new URLSearchParams(window.location.search).get('lang') === 'ar' ? 'ar' : 'en');
  const lang: Language = invitation?.language === 'bilingual' ? preferredLang : invitation?.language === 'ar' ? 'ar' : 'en';
  const t = words[lang];
  useEffect(() => {
    const controller = new AbortController();
    setState('loading'); setInvitation(null);
    const endpoint = id ? `/api/${access}/invitations/${encodeURIComponent(id)}/preview` : `/api/invitations/${encodeURIComponent(slug)}`;
    fetch(endpoint, { signal: controller.signal, cache: 'no-store' })
      .then(async response => {
        if (controller.signal.aborted) return;
        if (response.status === 401 || response.status === 403) { setState('restricted'); return; }
        if (response.status === 404 || response.status === 410) { setState('missing'); return; }
        if (!response.ok) throw new Error('Invitation unavailable');
        const data: unknown = await response.json(); const decoded = decodeInvitation(object(data).invitation);
        if (!decoded) throw new Error('Invalid invitation');
        if (!controller.signal.aborted) { setInvitation(decoded); setState('ready'); }
      })
      .catch(() => { if (!controller.signal.aborted) setState('error'); });
    return () => controller.abort();
  }, [slug, id, access, attempt]);
  useEffect(() => {
    const previous = { lang: document.documentElement.lang, dir: document.documentElement.dir, title: document.title };
    document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if (invitation) document.title = `${field(translatedContent(invitation.content, lang), 'title', lang, invitation.title)} · Invitéa`;
    return () => { document.documentElement.lang = previous.lang; document.documentElement.dir = previous.dir; document.title = previous.title; };
  }, [lang, invitation]);
  function switchLanguage() {
    const next = lang === 'en' ? 'ar' : 'en'; setPreferredLang(next);
    const nextUrl = new URL(window.location.href); nextUrl.searchParams.set('lang', next); window.history.replaceState(null, '', nextUrl);
  }
  if (state !== 'ready' || !invitation) return <main className="invitation-page inv-state" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang}><span className="inv-wordmark" dir="ltr">Invitéa</span><Ornament />
    {state === 'loading' ? <p role="status">{t.loading}</p> : <><h1>{state === 'missing' ? t.unavailable : state === 'restricted' ? t.restricted : t.offline}</h1><p>{state === 'missing' ? t.unavailableDetail : state === 'restricted' ? t.restrictedDetail : t.offlineDetail}</p>{state === 'error' && <button className="inv-button" onClick={() => setAttempt(value => value + 1)}><RefreshCw size={15} aria-hidden="true" />{t.retry}</button>}{state === 'restricted' && <Link className="inv-button" to={`/${access}`}>{t.signIn}</Link>}<Link className="inv-text-link" to={`/${lang}`}>{t.home}</Link></>}
  </main>;
  const theme = Object.hasOwn(invitationThemes, invitation.themeKey) ? invitationThemes[invitation.themeKey] : invitationThemes.stationery;

  const templateDesign = invitation.themeKey==='midnight-garden'?{background:'#162C38',text:'#F1EDE4',accent:'#C7AD7F'}:{};
  const sections = composedSections(invitation);
  return <div className={`invitation-page ${theme.className}`} lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} style={designStyle({...templateDesign,...invitation.design}, lang)}>
    <a className="inv-skip" href="#inv-content">{t.skip}</a>
    {preview && <div className="inv-preview-banner" role="status">{t.preview}</div>}
    <header className="inv-topbar"><Link to={`/${lang}`} className="inv-wordmark" dir="ltr" aria-label="Invitéa">Invitéa</Link>{invitation.language === 'bilingual' && <button onClick={switchLanguage} aria-label={t.switch} className="inv-language"><span className={lang === 'en' ? 'is-active' : ''} lang="en">EN</span><span aria-hidden="true">/</span><span className={lang === 'ar' ? 'is-active' : ''} lang="ar">عربي</span></button>}</header>
    <main id="inv-content">{sections.map((section, index) => {
      const Renderer = theme.sections && Object.hasOwn(theme.sections, section.type) ? theme.sections[section.type] : Object.hasOwn(invitationSections, section.type) ? invitationSections[section.type] : null;
      if (!Renderer) return null;
      const content = { ...translatedContent(invitation.content, lang), ...translatedContent(section.content, lang) };
      return <Renderer key={`${section.id}-${index}`} invitation={invitation} content={content} lang={lang} preview={preview} />;
    })}</main>
  </div>;
}
