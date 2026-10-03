import {Plus,X,Check} from 'lucide-react';
import {useLanguage} from '../i18n';
import {useRequestPreferences} from '../RequestPreferences';
import {paletteSwatches,paletteWords} from '../content/portfolio';

export default function ColorPalette(){
 const {lang}=useLanguage();const words=paletteWords[lang];const {colors,setColors}=useRequestPreferences();
 function toggle(hex:string){if(colors.includes(hex))setColors(colors.filter(color=>color!==hex));else if(colors.length<3)setColors([...colors,hex]);}
 function update(index:number,hex:string){const next=hex.toUpperCase();if(colors.some((color,i)=>i!==index&&color===next))return;setColors(colors.map((color,i)=>i===index?next:color));}
 return <fieldset className="theme-palette"><legend>{words.colors}<span className="field-optional">{lang==='ar'?'اختياري':'Optional'}</span></legend><p>{words.colorIntro}</p>
  <div className="palette-top"><span className="palette-count" aria-live="polite">{colors.length} / 3</span><span>{words.presets}</span></div>
  <div className="palette-swatches" role="group" aria-label={words.presets}>{paletteSwatches.map(swatch=><button key={swatch.hex} type="button" className={`palette-swatch ${colors.includes(swatch.hex)?'selected':''}`} disabled={colors.length===3&&!colors.includes(swatch.hex)} aria-pressed={colors.includes(swatch.hex)} aria-label={`${swatch[lang]} ${swatch.hex}`} onClick={()=>toggle(swatch.hex)}><span style={{background:swatch.hex}}>{colors.includes(swatch.hex)&&<Check size={16} style={{color:['#F8F3EC','#D8C2A8','#AEA391'].includes(swatch.hex)?'#6E2F3A':'#F8F3EC'}}/>}</span><small>{swatch[lang]}</small></button>)}</div>
  <div className="chosen-colors">{colors.map((color,index)=><div className="chosen-color" key={index}><label className="custom-color-swatch" style={{background:color}}><input type="color" value={color} aria-label={`${words.customColor} ${index+1}`} onChange={e=>update(index,e.target.value)}/></label><span dir="ltr">{color}</span><button type="button" className="remove-color" aria-label={`${words.remove} ${color}`} onClick={()=>setColors(colors.filter((_,i)=>i!==index))}><X size={15}/></button></div>)}{colors.length<3&&<button type="button" className="add-color" onClick={()=>{const next=paletteSwatches.find(swatch=>!colors.includes(swatch.hex));if(next)setColors([...colors,next.hex]);}}><Plus size={16}/>{words.add}</button>}</div>
  <span className="palette-help" aria-live="polite">{colors.length===3?words.colorLimit:lang==='ar'?'اضغط على اللون المختار لضبط درجته.':'Click a selected colour to fine-tune its shade.'}</span>
 </fieldset>;
}
