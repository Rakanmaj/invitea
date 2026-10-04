import {paletteWords as originalWords,paletteSwatches} from './portfolio';

export const paletteWords = {
 en: {...originalWords.en, showMore: 'Show more colours', showLess: 'Show fewer colours', library: '{count} more shades to explore', family: 'Colour family', all: 'All shades', edit: 'Edit colour', hex: 'Hex code', hexHint: 'Use a 3- or 6-digit hex code, with or without #.', apply: 'Add to palette', save: 'Save colour', cancel: 'Cancel', invalid: 'Enter a valid hex code, such as #6E2F3A.', duplicate: 'This colour is already in your palette.', customIntro: 'Find your shade with the picker, or enter its hex code.', help: 'Select a shade below, or add your own. Selected colours can be edited.', inspiration: 'Find inspiration on Color Hunt', inspirationNote: 'Explore palettes, then bring your favourite hex codes here.'},
 ar: {...originalWords.ar, showMore: 'اكتشف ألواناً أكثر', showLess: 'اكتفِ بالألوان الأساسية', library: '{count} درجة إضافية بين يديك', family: 'عائلة الألوان', all: 'جميع الدرجات', edit: 'عدّل درجة اللون', hex: 'رمز اللون', hexHint: 'اكتب رمزاً من ٣ أو ٦ خانات، مع علامة # أو من دونها.', apply: 'أضف إلى لوحتك', save: 'احفظ الدرجة', cancel: 'إلغاء', invalid: 'أدخل رمز لون صحيحاً، مثل #6E2F3A.', duplicate: 'هذا اللون موجود بالفعل في لوحتك.', customIntro: 'اختر الدرجة من أداة الألوان، أو اكتب رمز اللون الذي أحببته.', help: 'اختر من الدرجات، أو أضف لونك الخاص. يمكنك تعديل أي لون تختاره.', inspiration: 'استلهم لوحتك من Color Hunt', inspirationNote: 'تصفّح التنسيقات، ثم أضف هنا رموز الألوان التي أحببتها.'}
};

type Shade = readonly [hex: string, en: string, ar: string];
export const colourSearchWords={
 en:{search:'Search colours',placeholder:'Colour name or hex, e.g. olive or #626047',clear:'Clear search',results:'{count} colours',empty:'No shades match your search. Try another name or hex code.',library:'500 shades to explore'},
 ar:{search:'ابحث عن لونك',placeholder:'اسم اللون أو رمزه، مثل زيتوني أو #626047',clear:'مسح البحث',results:'{count} لون',empty:'لم نجد درجة تطابق بحثك. جرّب اسم لون آخر أو رمز اللون.',library:'٥٠٠ درجة لتختار منها'}
};
type Family = {id: string; en: string; ar: string; shades: readonly Shade[]};

// The original eight stay visible; this hand-picked library opens on request.
export const colourFamilies: Family[] = [
 {id: 'neutrals', en: 'Ivory & neutrals', ar: 'العاجي والدرجات الحيادية', shades: [
  ['#FFFCF5','Porcelain','خزفي'], ['#F5EBD7','Parchment','ورق عتيق'], ['#EDE2CE','Linen','كتّاني'], ['#E2D3BE','Oat','شوفاني'], ['#D5C9B8','Sandstone','حجر رملي'],
  ['#C3B6A5','Mushroom','بيج رمادي'], ['#B0A89B','Pebble','حصوي'], ['#968B7C','Stone','حجري'], ['#7E756B','Pewter','رمادي معتّق'], ['#625B53','Smoke','دخاني']
 ]},
 {id: 'pink', en: 'Rose & blush', ar: 'الوردي ودرجات الورد', shades: [
  ['#FBE8E4','Petal','بتلات'], ['#F3D5D0','Blush','وردي خجول'], ['#EBC2BF','Ballet pink','وردي الباليه'], ['#DDA7A5','Antique rose','ورد عتيق'], ['#CE999B','Rose quartz','كوارتز وردي'],
  ['#C38388','Tea rose','ورد الشاي'], ['#AD737C','Old rose','وردي معتّق'], ['#94626E','Muted mauve','موف هادئ'], ['#864E5E','Rosewood','خشب الورد'], ['#703F50','Rose velvet','مخمل وردي']
 ]},
 {id: 'wine', en: 'Wine & burgundy', ar: 'البرغندي والدرجات العميقة', shades: [
  ['#963F50','Garnet','عقيق'], ['#833A46','Claret','عنّابي'], ['#762E3D','Mulberry','توتي'], ['#672D32','Deep burgundy','برغندي عميق'], ['#5C2534','Merlot','عنّابي داكن'],
  ['#552330','Oxblood','أحمر معتّق'], ['#4D2433','Black cherry','كرزي داكن'], ['#722F4A','Berry','توت أحمر'], ['#8F5062','Fig','تيني'], ['#AF6B78','Cranberry','توت بري']
 ]},
 {id: 'earth', en: 'Earth & terracotta', ar: 'الترابي والطيني', shades: [
  ['#F0D2BD','Peach stone','خوخي ترابي'], ['#E5B89B','Apricot','مشمشي'], ['#D69F84','Desert rose','ورد الصحراء'], ['#C9856D','Clay','طيني'], ['#B87359','Terracotta','فخّاري'],
  ['#A7634B','Sienna','سيينا'], ['#955C47','Copper earth','نحاسي ترابي'], ['#824A3C','Cinnamon','قرفة'], ['#6E4335','Burnt umber','بني محروق'], ['#B48F75','Camel','جملي']
 ]},
 {id: 'green', en: 'Sage & olive', ar: 'المريمي والزيتوني', shades: [
  ['#E5E9D9','Willow mist','ضباب الصفصاف'], ['#CFD8BE','Pale sage','مريمي فاتح'], ['#BAC6A6','Sage','مريمي'], ['#A6B398','Eucalyptus','أوكالبتوس'], ['#919E81','Laurel','غاري'],
  ['#7C8B6C','Moss','طحلبي'], ['#69745A','Olive leaf','ورق الزيتون'], ['#626047','Antique olive','زيتوني عتيق'], ['#505B42','Fern','سرخسي'], ['#3B4738','Forest shade','ظل الغابة']
 ]},
 {id: 'teal', en: 'Emerald & teal', ar: 'الزمردي والأخضر المزرق', shades: [
  ['#C8DFD9','Sea glass','زجاج البحر'], ['#A8CBC0','Mint','نعناعي'], ['#89B4A6','Jade mist','يشمي ناعم'], ['#6D998D','Jade','يشمي'], ['#537C70','Evergreen','أخضر دائم'],
  ['#396556','Emerald','زمردي'], ['#284D41','Pine','صنوبري'], ['#1F3E35','Deep forest','غابة عميقة'], ['#3B7373','Teal','أخضر مزرق'], ['#295356','Peacock','طاووسي']
 ]},
 {id: 'blue', en: 'Blue & midnight', ar: 'الأزرق ودرجات الليل', shades: [
  ['#E1EAF0','Blue porcelain','خزفي أزرق'], ['#CADCE7','Powder blue','أزرق ناعم'], ['#AFCDDB','Mist blue','أزرق ضبابي'], ['#93B4C7','Hydrangea','كوبية زرقاء'], ['#7499B0','Cornflower','زهرة الذرة'],
  ['#587A94','Dusty blue','أزرق هادئ'], ['#48657D','Denim','أزرق دنيم'], ['#314B66','Ink blue','حبر أزرق'], ['#223A50','Midnight','منتصف الليل'], ['#162C38','Blue velvet','مخمل أزرق']
 ]},
 {id: 'purple', en: 'Lavender & plum', ar: 'اللافندر والبرقوقي', shades: [
  ['#EEE5F0','Lilac mist','ضباب الليلك'], ['#DBCDDF','Lilac','ليلكي'], ['#C3B3CC','Lavender','لافندر'], ['#A795B4','Wisteria','ويستيريا'], ['#8D789D','Heather','خلنجي'],
  ['#78617F','Orchid','أوركيد'], ['#69506B','Muted violet','بنفسجي هادئ'], ['#593C58','Plum','برقوقي'], ['#462B43','Aubergine','باذنجاني'], ['#342434','Amethyst night','جمشت داكن']
 ]},
 {id: 'gold', en: 'Gold & champagne', ar: 'الذهبي والشامبانيا', shades: [
  ['#F4E7C5','Champagne light','شامبانيا فاتح'], ['#EAD5A6','Vanilla gold','ذهبي فانيلا'], ['#DCC18A','Wheat','قمحي'], ['#C7AD7F','Soft gold','ذهبي ناعم'], ['#B49A68','Antique brass','نحاسي عتيق'],
  ['#A88C55','Honey gold','ذهبي عسلي'], ['#967B48','Old gold','ذهب معتّق'], ['#896D3F','Bronze','برونزي'], ['#766038','Golden olive','زيتوني ذهبي'], ['#604E30','Dark brass','نحاسي داكن']
 ]},
 {id: 'brown', en: 'Cocoa & espresso', ar: 'الكاكاو والبني', shades: [
  ['#E5D9CD','Almond','لوزي'], ['#D2BDA8','Café crème','قهوة بالحليب'], ['#BCA086','Latte','لاتيه'], ['#A5876D','Mocha','موكا'], ['#8C7059','Walnut','جوزي'],
  ['#755A46','Hazelnut','بندقي'], ['#614936','Cocoa','كاكاو'], ['#513D31','Chestnut','كستنائي'], ['#403128','Chocolate','شوكولاتة'], ['#302821','Dark espresso','قهوة داكنة']
 ]}
];

const additionalShades: Record<string, readonly Shade[]> = {
 neutrals: [
  ['#FFFFFF','Pure white','أبيض نقي'], ['#FAFAF7','Chalk','طباشيري'], ['#F4F1E9','Pearl','لؤلؤي'], ['#EFECE3','Shell','صدفي'], ['#DBD8CF','Silver sand','رمل فضي'],
  ['#CBC7BF','Dove','رمادي حمامي'], ['#B7B5AE','Soft grey','رمادي ناعم'], ['#9C9A96','Ash','رمادي الرماد'], ['#6F6E6A','Graphite','غرافيتي'], ['#252522','Charcoal','فحمي']
 ],
 pink: [
  ['#FFF1F4','Pink cloud','غيمة وردية'], ['#FBDCE5','Cherry blossom','زهر الكرز'], ['#F4BED0','Peony','فاوانيا'], ['#ED9FBB','Pink satin','ساتان وردي'], ['#D87F9E','Camellia','كاميليا'],
  ['#C15C83','Raspberry','توت العليق'], ['#AC406B','Dahlia','داليا'], ['#95365D','Fuchsia velvet','مخمل فوشي'], ['#7E2E52','Wild berry','توت برّي عميق'], ['#62233E','Berry dusk','غروب توتي']
 ],
 wine: [
  ['#B7464A','Ruby','ياقوتي'], ['#A3353C','Crimson','قرمزي'], ['#8D2730','Pomegranate','رماني'], ['#781F28','Rouge','أحمر كلاسيكي'], ['#661B26','Velvet red','مخملي أحمر'],
  ['#501923','Cabernet','عنّابي معتّق'], ['#3E1620','Wine night','عنّابي ليلي'], ['#C36B69','Faded red','أحمر هادئ'], ['#A85454','Brick rose','وردي آجري'], ['#873C3B','Redwood','خشب أحمر']
 ],
 earth: [
  ['#FFE4D0','Peach cream','خوخي كريمي'], ['#F6C5A4','Melon','شمّامي'], ['#EDA47A','Sunset peach','خوخي الغروب'], ['#E58C62','Coral','مرجاني'], ['#D7774A','Warm orange','برتقالي دافئ'],
  ['#C46439','Paprika','بابريكا'], ['#B25430','Rust','صدئي'], ['#9C4529','Burnt orange','برتقالي محروق'], ['#853B28','Cedar','أرزي'], ['#713729','Deep clay','طيني عميق']
 ],
 green: [
  ['#EDF2DA','Green silk','حرير أخضر'], ['#DCE5BA','Pistachio','فستقي'], ['#C9D598','Spring leaf','ورق الربيع'], ['#B3C27A','Pear','كمثري'], ['#9AAB62','Meadow','أخضر المروج'],
  ['#83914E','Olive grove','بستان الزيتون'], ['#6E7C3D','Avocado','أفوكادو'], ['#5A6930','Bay leaf','ورق الغار'], ['#455428','Woodland','أخضر الغابات'], ['#334322','Deep moss','طحلبي عميق']
 ],
 teal: [
  ['#E0F1ED','Mint porcelain','خزفي نعناعي'], ['#BEE4DA','Celadon','سيلادون'], ['#97D2C3','Aquamarine','أكوامارين'], ['#71BCAD','Lagoon','أخضر البحيرة'], ['#4D9F94','Turquoise','فيروزي'],
  ['#318579','Malachite','ملاكيتي'], ['#236B63','Juniper','عرعري'], ['#1D554F','Deep teal','فيروزي عميق'], ['#16413C','Green midnight','أخضر ليلي'], ['#10332F','Bottle green','أخضر زجاجي']
 ],
 blue: [
  ['#EEF5FC','Ice blue','أزرق ثلجي'], ['#D7E8F7','Sky silk','حرير سماوي'], ['#BAD8F0','Forget-me-not','زهرة لا تنسني'], ['#95BCE2','Periwinkle blue','أزرق ونكي'], ['#729CCE','Azure','لازوردي'],
  ['#5079B2','French blue','أزرق فرنسي'], ['#3B5E91','Sapphire','ياقوت أزرق'], ['#2C4573','Royal navy','كحلي ملكي'], ['#213354','Oxford blue','أزرق أكسفورد'], ['#18253B','Night ink','حبر ليلي']
 ],
 purple: [
  ['#F6EDF9','Violet porcelain','خزفي بنفسجي'], ['#E8D6F0','Iris mist','ضباب السوسن'], ['#D4BCE4','Lavender silk','حرير اللافندر'], ['#BE9BD4','Verbena','لويزة'], ['#A57DC0','Iris','سوسني'],
  ['#8C60A8','Violet','بنفسجي'], ['#754D90','Amethyst','جمشتي'], ['#5F3B78','Purple velvet','مخمل بنفسجي'], ['#4A2E5E','Damson','برقوق داكن'], ['#362246','Purple night','ليلي بنفسجي']
 ],
 gold: [
  ['#FFF5D6','Buttercream','كريمة الزبدة'], ['#F9E8AE','Primrose','زهرة الربيع'], ['#F0D885','Golden silk','حرير ذهبي'], ['#E4C45F','Marigold','قطيفة ذهبية'], ['#D4AC43','Saffron','زعفراني'],
  ['#BE9331','Mustard','خردلي'], ['#A87D2B','Ochre','مغرة'], ['#926926','Amber','كهرماني'], ['#7A5825','Honey bronze','برونزي عسلي'], ['#634825','Golden dusk','غروب ذهبي']
 ],
 brown: [
  ['#F0E2D5','Cashmere','كشميري'], ['#E0C9B2','Biscuit','بسكويتي'], ['#CBAA8D','Caramel','كراميل'], ['#B98D68','Toffee','توفي'], ['#A57952','Cognac','بني عنبري'],
  ['#8E623E','Saddle','جلدي'], ['#775032','Coffee bean','حبوب القهوة'], ['#603F2B','Mahogany','ماهوجني'], ['#4A3024','Truffle','بني الكمأة'], ['#35221C','Black coffee','قهوة سوداء']
 ]
};

type ColourSwatch = {hex:string;en:string;ar:string;family:string};
// Five distinct hues per family, each with a considered range from pale to deep.
const hueDirections: Record<string, readonly (readonly [number,number,string,string])[]> = {
 neutrals: [[210,8,'Silver linen','كتان فضي'],[38,20,'Warm alabaster','رخام دافئ'],[52,10,'Oyster grey','رمادي صدفي'],[22,9,'Ash linen','كتان رمادي'],[32,15,'Greige','بيج رمادي دافئ']],
 pink: [[350,48,'Shell pink','وردي صدفي'],[340,48,'French rose','ورد فرنسي'],[358,40,'Rosewater','ماء الورد'],[326,34,'Magnolia','ماغنوليا'],[345,64,'Flamingo','وردي فلامنغو']],
 wine: [[350,57,'Velvet cherry','كرز مخملي'],[329,37,'Blackcurrant','كشمش أسود'],[358,59,'Red velvet','مخمل أحمر'],[7,43,'Maroon','عنابي بني'],[337,54,'Cranberry silk','حرير التوت']],
 earth: [[18,53,'Tuscany','ترابي توسكانا'],[12,62,'Coral clay','طين مرجاني'],[24,58,'Burnt sienna','سيينا دافئة'],[29,67,'Apricot silk','حرير مشمشي'],[35,42,'Desert sand','رمال الصحراء']],
 green: [[112,22,'Rosemary','إكليل الجبل'],[96,25,'Meadow sage','مريمي المروج'],[74,33,'Fresh olive','زيتوني نضر'],[139,27,'Cypress','أخضر السرو'],[88,18,'Thyme','أخضر الزعتر']],
 teal: [[181,35,'Ocean teal','فيروز المحيط'],[158,39,'Emerald silk','حرير زمردي'],[168,31,'Seafoam','زبد البحر'],[187,46,'Aqua','أزرق مائي'],[194,34,'Petrol','أزرق بترولي']],
 blue: [[218,36,'French navy','كحلي فرنسي'],[205,57,'Cerulean','أزرق سماوي'],[197,26,'Duck egg','أزرق صدفي'],[212,20,'Steel blue','أزرق فولاذي'],[225,33,'Misty denim','دنيم ضبابي']],
 purple: [[274,37,'Iris silk','حرير السوسن'],[304,28,'Plum blossom','زهر البرقوق'],[290,42,'Orchid velvet','مخمل الأوركيد'],[260,22,'Smoky lavender','لافندر دخاني'],[316,31,'Mulberry dusk','توت الغسق']],
 gold: [[50,65,'Lemon chiffon','شيفون ليموني'],[39,63,'Amber silk','حرير كهرماني'],[44,45,'Antique honey','عسلي معتق'],[46,72,'Marigold silk','حرير القطيفة'],[54,30,'Old brass','نحاس معتق']],
 brown: [[27,32,'Hazelnut silk','حرير بندقي'],[19,33,'Copper cocoa','كاكاو نحاسي'],[31,24,'Warm coffee','قهوة دافئة'],[36,29,'Toasted almond','لوز محمص'],[14,27,'Chestnut suede','شمواه كستنائي']]
};
const toneDirections = [
 {light:95,saturation:.65,en:'Mist',ar:'ضبابي'}, {light:85,saturation:.85,en:'Pale',ar:'فاتح'},
 {light:72,saturation:.95,en:'Soft',ar:'ناعم'}, {light:55,saturation:1,en:'Classic',ar:'كلاسيكي'},
 {light:37,saturation:.95,en:'Deep',ar:'عميق'}, {light:20,saturation:.85,en:'Midnight',ar:'ليلي'}
];
function shadeHex(hue:number,saturation:number,lightness:number) {
 const s=saturation/100,l=lightness/100,a=s*Math.min(l,1-l);
 return '#'+[0,8,4].map(offset=>{
  const k=(offset+hue/30)%12;
  const channel=l-a*Math.max(-1,Math.min(k-3,9-k,1));
  return Math.round(channel*255).toString(16).padStart(2,'0');
 }).join('').toUpperCase();
}
function buildColourLibrary():ColourSwatch[] {
 const defaultFamilies=['wine','neutrals','gold','pink','neutrals','green','blue','brown'];
 const shades:ColourSwatch[]=paletteSwatches.map((swatch,index)=>({...swatch,family:defaultFamilies[index]}));
 const seen=new Set(shades.map(shade=>shade.hex));
 function add(shade:ColourSwatch){if(shades.length<500&&!seen.has(shade.hex)){seen.add(shade.hex);shades.push(shade);}}
 for(const family of colourFamilies)for(const [hex,en,ar] of [...family.shades,...additionalShades[family.id]])add({hex,en,ar,family:family.id});
 // Interleave families so the full collection stays balanced across colour ranges.
 for(const tone of toneDirections)for(const family of colourFamilies)for(const [hue,saturation,en,ar] of hueDirections[family.id]) {
  add({hex:shadeHex(hue,saturation*tone.saturation,tone.light),en:`${en} · ${tone.en}`,ar:`${ar} · ${tone.ar}`,family:family.id});
 }
 return shades;
}
export const extendedSwatches=buildColourLibrary();

function searchText(value:string){return value.normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/#/g,'').trim();}
export function searchColours(query:string,family='all') {
 const terms=searchText(query).split(/\s+/).filter(Boolean);
 return extendedSwatches.filter(shade=>{
  if(family!=='all'&&shade.family!==family)return false;
  const group=colourFamilies.find(group=>group.id===shade.family)!;
  const searchable=searchText(`${shade.en} ${shade.ar} ${shade.hex} ${group.en} ${group.ar}`);
  return terms.every(term=>searchable.includes(term));
 });
}

export function normalizeHex(value: string): string | null {
 const raw = value.trim().replace(/^#/, '');
 if (!/^(?:[\da-f]{3}|[\da-f]{6})$/i.test(raw)) return null;
 return '#' + (raw.length === 3 ? [...raw].map(char => char + char).join('') : raw).toUpperCase();
}

export function swatchInk(hex: string): string {
 const channels = [1,3,5].map(index => parseInt(hex.slice(index,index + 2),16) / 255);
 const [r,g,b] = channels.map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
 return .2126 * r + .7152 * g + .0722 * b > .35 ? '#352E2C' : '#F8F3EC';
}
