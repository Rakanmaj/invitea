import {useId,useRef,useState} from 'react';
import {Plus,X,Check,Pencil,ChevronDown,Palette,Search} from 'lucide-react';
import {ArrowUpRight} from './EditorialArrow';
import {useLanguage} from '../i18n';
import {useRequestPreferences} from '../RequestPreferences';
import {paletteSwatches} from '../content/portfolio';
import {colourFamilies,colourSearchWords,searchColours,normalizeHex,paletteWords,swatchInk} from '../content/colors';

export default function ColorPalette() {
 const {lang} = useLanguage();
 const words = paletteWords[lang];
 const searchWords=colourSearchWords[lang];
 const {colors,setColors} = useRequestPreferences();
 const id = useId();
 const hexInput = useRef<HTMLInputElement>(null);
 const addButton = useRef<HTMLButtonElement>(null);
 const [expanded,setExpanded] = useState(false);
 const [family,setFamily] = useState('all');
 const [query,setQuery]=useState('');
 const [editor,setEditor] = useState<{index: number | null} | null>(null);
 const [draft,setDraft] = useState('#6E2F3A');
 const [error,setError] = useState('');
 const normalized = normalizeHex(draft);
 const library=searchColours(query,family);
 const libraryTitle=searchWords.library;
 const results=searchWords.results.replace('{count}',new Intl.NumberFormat(lang).format(library.length));

 function toggle(hex: string) {
  if (colors.includes(hex)) setColors(colors.filter(color => color !== hex));
  else if (colors.length < 3) setColors([...colors,hex]);
  setEditor(null);
  setError('');
 }

 function openEditor(index: number | null) {
  setDraft(index === null ? '#6E2F3A' : colors[index]);
  setError('');
  setEditor({index});
 }

 function closeEditor() {
  setEditor(null);
  setError('');
  if (editor?.index !== null && editor?.index !== undefined) {
   document.getElementById(`${id}-edit-${editor.index}`)?.focus();
  } else addButton.current?.focus();
 }

 function applyColour() {
  const hex = normalizeHex(draft);
  if (!editor) return;
  if (!hex) {setError(words.invalid); hexInput.current?.focus(); return;}
  if (colors.some((color,index) => color === hex && index !== editor.index)) {setError(words.duplicate); return;}
  if (editor.index === null) {
   if (colors.length >= 3) {setError(words.colorLimit); return;}
   setColors([...colors,hex]);
  } else setColors(colors.map((color,index) => index === editor.index ? hex : color));
  closeEditor();
 }

 function renderSwatches(swatches: {hex: string; en: string; ar: string}[]) {
  return swatches.map(swatch => <button key={swatch.hex} type="button" className={`palette-swatch ${colors.includes(swatch.hex) ? 'selected' : ''}`} disabled={colors.length >= 3 && !colors.includes(swatch.hex)} aria-pressed={colors.includes(swatch.hex)} aria-label={`${swatch[lang]} ${swatch.hex}`} onClick={() => toggle(swatch.hex)}>
   <span style={{background:swatch.hex}}>{colors.includes(swatch.hex) && <Check size={17} style={{color:swatchInk(swatch.hex)}} aria-hidden="true"/>}</span><small>{swatch[lang]}</small>
  </button>);
 }

 return <fieldset className="theme-palette">
  <legend>{words.colors}<span className="field-optional">{lang === 'ar' ? 'اختياري' : 'Optional'}</span></legend><p>{words.colorIntro}</p>
  <div className="palette-top"><span className="palette-count" aria-live="polite" dir="ltr">{colors.length} / 3</span><span>{words.presets}</span></div>
  <div className="palette-swatches" role="group" aria-label={words.presets}>{renderSwatches(paletteSwatches)}</div>
  <button type="button" className="palette-disclosure" aria-expanded={expanded} aria-controls={`${id}-library`} onClick={() => setExpanded(!expanded)}>{expanded ? words.showLess : words.showMore}<ChevronDown size={17} className={expanded ? 'is-expanded' : ''} aria-hidden="true"/></button>
  {expanded && <div className="palette-library" id={`${id}-library`}>
   <div className="palette-library-heading"><span>{libraryTitle}</span><label className="palette-family">{words.family}<select value={family} onChange={e => setFamily(e.target.value)}><option value="all">{words.all}</option>{colourFamilies.map(group => <option key={group.id} value={group.id}>{group[lang]}</option>)}</select></label></div>
   <label className="palette-search-label" htmlFor={`${id}-search`}>{searchWords.search}</label>
   <div className="palette-search"><Search size={18} aria-hidden="true"/><input id={`${id}-search`} type="search" value={query} onChange={event=>setQuery(event.target.value)} onKeyDown={event=>{if(event.key==='Enter')event.preventDefault();}} placeholder={searchWords.placeholder} dir="auto" autoComplete="off" spellCheck={false}/>{query&&<button type="button" aria-label={searchWords.clear} onClick={()=>setQuery('')}><X size={17} aria-hidden="true"/></button>}</div>
   <span className="palette-search-results" role="status">{results}</span>
   <div className="palette-library-scroll" tabIndex={0} role="region" aria-label={libraryTitle}>{library.length?<div className="palette-swatches" role="group" aria-label={words.all}>{renderSwatches(library)}</div>:<p className="palette-search-empty">{searchWords.empty}</p>}</div>
  </div>}
  <div className="chosen-colors">
   {colors.map((color,index) => <div className="chosen-color" key={index}>
    <button type="button" className="chosen-color-edit" id={`${id}-edit-${index}`} aria-label={`${words.edit} ${color}`} aria-expanded={editor?.index === index} onClick={() => openEditor(index)}><span className="chosen-color-dot" style={{background:color}}/><span dir="ltr">{color}</span><Pencil size={13} aria-hidden="true"/></button>
    <button type="button" className="remove-color" aria-label={`${words.remove} ${color}`} onClick={() => {setColors(colors.filter((_,i) => i !== index)); setEditor(null); setError('');}}><X size={16} aria-hidden="true"/></button>
   </div>)}
   {colors.length < 3 && <button ref={addButton} type="button" className="add-color" aria-expanded={editor?.index === null} aria-controls={`${id}-editor`} onClick={() => openEditor(null)}><Plus size={16} aria-hidden="true"/>{words.add}</button>}
  </div>
  {editor && <div className="palette-editor" id={`${id}-editor`} onKeyDown={e => {if (e.key === 'Enter' && e.target === hexInput.current) {e.preventDefault(); applyColour();} else if (e.key === 'Escape') {e.preventDefault(); closeEditor();}}}>
   <div className="palette-editor-heading"><strong>{editor.index === null ? words.customColor : words.edit}</strong><button type="button" className="palette-editor-close" aria-label={words.cancel} onClick={closeEditor}><X size={18}/></button></div>
   <p>{words.customIntro}</p>
   <div className="palette-editor-fields"><label className="palette-native-picker" style={{background:normalized ?? '#6E2F3A'}}><input type="color" value={normalized ?? '#6E2F3A'} aria-label={words.customColor} onChange={e => {setDraft(e.target.value.toUpperCase()); setError('');}}/><Pencil size={16} style={{color:swatchInk(normalized ?? '#6E2F3A')}} aria-hidden="true"/></label>
    <label className="palette-hex-label" htmlFor={`${id}-hex`}>{words.hex}<input ref={hexInput} autoFocus id={`${id}-hex`} type="text" value={draft} placeholder="#6E2F3A" dir="ltr" autoComplete="off" spellCheck={false} maxLength={7} aria-invalid={!!error} aria-describedby={`${id}-hex-help ${id}-hex-error`} onChange={e => {setDraft(e.target.value); setError('');}}/></label>
    <button type="button" className="button secondary palette-apply" onClick={applyColour}>{editor.index === null ? words.apply : words.save}<Check size={16}/></button>
   </div>
   <small id={`${id}-hex-help`}>{words.hexHint}</small><span className="palette-error" id={`${id}-hex-error`} role="status">{error}</span>
  </div>}
  <span className="palette-help" aria-live="polite">{colors.length === 3 ? words.colorLimit : words.help}</span>
  <div className="palette-inspiration"><div className="palette-inspiration-heading"><Palette size={23} aria-hidden="true"/><strong>{lang === 'ar' ? 'تبحث عن تنسيق ألوان تحبّه؟' : 'Need colour inspiration?'}</strong></div><p>{words.inspirationNote}</p><a href="https://colorhunt.co/" target="_blank" rel="noopener noreferrer" className="button secondary palette-inspiration-link">{lang === 'ar' ? 'اكتشف لوحات Color Hunt' : 'Explore Color Hunt'}<ArrowUpRight size={22}/><span className="sr-only">{lang === 'ar' ? ' (يفتح في نافذة جديدة)' : ' (opens in a new tab)'}</span></a></div>
 </fieldset>;
}
