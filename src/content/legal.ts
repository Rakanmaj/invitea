export const legalVersion = '2026-10-01';
export const privacyVersion = '2026-10-03';

export type LegalSection = { title: string; paragraphs: string[] };
export type LegalDocument = { title: string; intro: string; sections: LegalSection[] };

export const legalContent: Record<'en' | 'ar', { terms: LegalDocument; privacy: LegalDocument }> = {
  en: {
    terms: {
      title: 'Terms & Conditions',
      intro: 'Last updated: 1 October 2026 · Version 2026-10-01. These terms describe the custom invitation service offered by Invitéa, a digital invitation studio based in Jordan. Your written quotation confirms the scope and price of your order.',
      sections: [
        {
          title: 'A website, created for your occasion',
          paragraphs: [
            'Invitéa designs and develops custom invitation websites. We create your invitation from the details and materials you provide; this is a personal design service, not a self-service editor. Features, languages, delivery dates and any additions are agreed in your quotation.',
            'An inquiry does not confirm an order. Work is scheduled after we agree the scope, you accept the applicable terms and we confirm receipt of the required payment. The order record should identify the accepted terms version and acceptance date.',
          ],
        },
        {
          title: 'Payments in Jordan',
          paragraphs: [
            'A 40% booking payment is required before work begins. The remaining 60% is due after your final approval and before production publication or delivery of the usable invitation link. You may preview the invitation before paying the balance.',
            'Jordan payments are made through CliQ using the instructions supplied with your confirmed order. Invitéa currently charges no CliQ transfer fee. The agreed currency is JOD or USD, as stated in your quotation.',
          ],
        },
        {
          title: 'International orders',
          paragraphs: [
            'Orders from outside Jordan require 100% payment in advance. Work begins after the full payment is received and confirmed. The available payment method, agreed currency and any applicable charges must be confirmed with you before payment; no international payment provider is assumed.',
          ],
        },
        {
          title: 'Revisions and additional work',
          paragraphs: [
            'Two revision rounds are included. Each round is one grouped set of reasonable minor changes, such as wording, colours, image replacements or small spacing and layout adjustments. Each additional minor revision round costs 5 JOD.',
            'A new design direction, change of event type, major section, new functionality or rebuilding approved work requires a separate quotation and your agreement before the additional work begins. Errors made by Invitéa are corrected without charge and do not count as a revision round.',
          ],
        },
        {
          title: 'Delivery and urgent requests',
          paragraphs: [
            'Standard delivery is up to 7 days, starting only when the required payment, event details and all necessary content and assets have been received. Waiting for your information, feedback or approval may extend the schedule; any revised timing will be discussed with you.',
            'Delivery within 3 days or less is subject to availability and an urgent surcharge of 10 JOD. Same-day or next-day delivery may require a separate quotation. Urgent delivery is confirmed individually, never guaranteed by submitting an inquiry.',
          ],
        },
        {
          title: 'Cancellation and refunds',
          paragraphs: [
            'Payments may be refunded if you cancel before work begins. For Jordan orders, once custom work has begun, the 40% booking payment is normally non-refundable because time and resources have been committed, subject to your mandatory legal rights.',
            'For international orders cancelled after work begins, any eligible refund is assessed fairly against the project stage, completed work, time spent and reasonable expenses. We will explain the calculation. If Invitéa cannot complete an accepted order for a reason caused by Invitéa, the appropriate unearned amount will be refunded. These policies do not restrict remedies required by law.',
          ],
        },
        {
          title: 'Your information and final approval',
          paragraphs: [
            'Please provide accurate names, dates, times, venue and map information, contact details, text, photographs, music and RSVP requirements. You are responsible for checking the preview carefully and expressly approving the information and design before publication. Approval should identify the order, approved version and date.',
            'Corrections to inaccurate information supplied or approved by you may incur an agreed revision charge after approval or publication. An error introduced by Invitéa will be corrected free of charge.',
          ],
        },
        {
          title: 'Hosting and availability',
          paragraphs: [
            'Hosting is included with no scheduled expiry and no current annual renewal fee. Continued hosting depends on the reasonable continued availability of Invitéa, its infrastructure and hosting providers. This is not a promise of permanent or uninterrupted hosting.',
            'We may move infrastructure when necessary. Maintenance, provider outages and events outside reasonable control may temporarily affect availability. We will take reasonable steps to restore service and communicate material disruption. You may ask for your invitation to be removed.',
          ],
        },
        {
          title: 'Your invitation and creative materials',
          paragraphs: [
            'You receive exclusive use of your completed invitation website for your event and a link to share with your guests. Your supplied photographs, text, logos and other materials remain yours. You give Invitéa the permission needed to use them to fulfil your order and confirm that you have the necessary rights and permissions, including for music and material depicting other people.',
            'Invitéa retains its pre-existing and reusable source code, components, frameworks, layouts, design systems, backend, administration systems and internal tools. The purchase does not transfer the platform or source code. We may ask you to replace content we reasonably believe infringes another person’s rights.',
          ],
        },
        {
          title: 'RSVP and guest privacy',
          paragraphs: [
            'If RSVP is included, the agreed form collects only information needed for your event. Guest responses belong to that invitation and are not published on the public invitation. Access is restricted to authorised Invitéa administrators and any event organiser access or delivery method expressly agreed for the order.',
            'Our normal policy is to delete identifiable RSVP data, or irreversibly anonymise it, 90 days after the event date. Arrange any needed guest-list export before then. The Privacy Policy explains data use and requests. Please handle any list you receive responsibly and only for the disclosed event purpose.',
          ],
        },
        {
          title: 'Portfolio permission is your choice',
          paragraphs: [
            'Publishing your invitation so you can share it with guests does not give Invitéa permission to promote it. Showing selected screenshots, names, photographs or invitation details in our portfolio or social media requires separate, optional permission specifying what may be shown. Declining has no effect on your service. You may contact us to withdraw that permission for future use and request removal from channels we control.',
          ],
        },
        {
          title: 'Third-party services and responsibility',
          paragraphs: [
            'Maps, messaging, media, hosting and payment services may be provided by third parties and can be subject to their own terms. We cannot guarantee their continuous availability or the delivery of messages through them. We remain responsible for our own obligations under the order and applicable law.',
            'To the extent permitted by law, Invitéa is not responsible for loss caused solely by inaccurate client-supplied details, client misuse or circumstances beyond reasonable control. No blanket exclusion or fixed liability cap overrides responsibility that the law does not allow us to exclude. We will seek a fair, practical resolution to any service concern.',
          ],
        },
        {
          title: 'Applicable law and updates',
          paragraphs: [
            'These terms are governed by the applicable laws of the Hashemite Kingdom of Jordan. Nothing in them limits consumer, privacy or other rights that cannot legally be excluded under applicable law.',
            'Updates will carry a new version and date. The version accepted with your order applies to that order unless a change is required by law or separately agreed with you. For an order question, cancellation, hosting removal or complaint, contact Invitéa through the contact details provided with your order.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      intro: 'Last updated: 3 October 2026 · Version 2026-10-03. This policy explains the intended handling of customer, inquiry and guest information for Invitéa’s custom invitation service in Jordan. The details collected depend on the form you use and the features agreed for your invitation.',
      sections: [
        {
          title: 'What you share with us',
          paragraphs: [
            'An inquiry may contain your name, contact details, country, occasion, date, preferred language and style, requested features and notes. An order may also contain event content, photographs, approved designs, payment status and references, correspondence, approvals and the terms version and acceptance date. Please avoid including unrelated sensitive information in free-text fields.',
            'An RSVP may ask for a guest name, attendance choice and guest count, with a phone number or message only where needed for that event. The form should identify the information requested before submission. Hosting and security systems may process limited technical information, such as connection details and request logs, to operate and protect the service.',
          ],
        },
        {
          title: 'Guest Photo Collection',
          paragraphs: [
            'Photo sharing is optional and is available only when included and enabled for an invitation. Guests choose their own photos and confirm their right to share them with the event hosts and Invitéa for that event. Each browser guest identity may contribute up to ten photos. Uploaded photos are private: authorised studio administrators and the assigned event organiser can view and download them. They are not automatically published or used for marketing.',
            'Images are resized, compressed and stripped of EXIF and GPS metadata before storage in a private, event-specific Google Drive folder. PostgreSQL stores the invitation mapping, photo references, upload time, consent version and an opaque guest identity rather than the image files. A necessary HttpOnly cookie identifies the browser for upload limits; clearing cookies or changing devices creates a new identity.',
            'Upload access closes four days after the event time. This closes new submissions without automatically deleting existing photos. Folder deletion is handled manually by the studio; organisers should arrange downloads and any deletion request with Invitéa. Expiry is not a promise that stored photos have been erased.',
          ],
        },
        {
          title: 'Why information is needed',
          paragraphs: [
            'Information is used to respond to your request, quote and manage an order, create and host your invitation, record approval and payment, organise event responses, provide support and protect the service. Where consent is required, it must be obtained for the stated purpose before processing. Optional promotional permission is separate from the service request.',
            'Before sending another person’s photograph or details, make sure you have permission to share them for the intended use. Obtain parent or guardian permission where required for a child’s information. Invitéa does not need guests’ payment-card details for RSVP; do not enter card numbers or banking passwords in forms or messages.',
          ],
        },
        {
          title: 'Who can see information',
          paragraphs: [
            'Customer and order information is intended for authorised people providing and administering the service. An event organiser receives only the RSVP information needed for their event through the method agreed with Invitéa. RSVP responses are not public portfolio content.',
            'Content approved for a live invitation can be seen by people who have or receive its link. A shareable link is not an access password: guests may forward it, and messaging services may generate a preview of the published title, description and cover. Avoid publishing details that should not be shared this way. Portfolio and social promotion require separate permission.',
          ],
        },
        {
          title: 'Service providers and external links',
          paragraphs: [
            'The configured deployment uses Vercel for the public frontend, Railway for the API and PostgreSQL database, and Google Drive for private guest photo files when that feature is activated. These providers process the information needed to deliver the service. Actual processing regions should be confirmed before launch and supplied on request; a specific storage country is not assumed here.',
            'Opening a map, live external example, payment service or WhatsApp sends you to another service with its own privacy practices. A prepared WhatsApp request is sent only when you choose to send it there. Review the message before sending and avoid unnecessary personal details.',
          ],
        },
        {
          title: 'How long information is kept',
          paragraphs: [
            'Identifiable RSVP information is normally retained until 90 days after the event date, then deleted or irreversibly anonymised. An authorised organiser should arrange any needed export before this deadline. Anonymous attendance totals may be kept where useful without retaining guest names, phone numbers or identifiable messages.',
            'Invitation content is needed while the invitation remains hosted; clients may request removal. Inquiry, order, consent, payment-reference and support records should be retained only for the stated service purpose and applicable legal obligations, then deleted or anonymised. Any necessary exception to ordinary deletion must have a lawful reason. Backup retention must be bounded and reflected in the operational retention schedule; deletion from active systems does not imply immediate removal from every backup.',
          ],
        },
        {
          title: 'Cookies, preferences and analytics',
          paragraphs: [
            'Essential session storage or cookies may be needed for secure administration, and local storage may remember your selected language. These are separate from advertising. Analytics or marketing technologies are not assumed by this policy; if introduced, their purpose, provider and choices must be explained and any required consent obtained before activation.',
          ],
        },
        {
          title: 'Security and your rights',
          paragraphs: [
            'Service safeguards should include restricted administrative access, validation, secure connections and appropriate database and backup protection. No online service can promise absolute security. Security incidents and any required notifications must be handled under applicable law.',
            'Subject to applicable law, you may request access or a copy, correction, deletion, a restriction on processing or transfer of your data, object to processing and withdraw consent. You may also raise a complaint with the competent Jordanian authority. We may ask for proportionate identity checks to protect your information before responding.',
          ],
        },
        {
          title: 'Contact and policy updates',
          paragraphs: [
            'For a privacy request, contact Invitéa through the contact details provided with your order. Guests may use the contact details supplied with their invitation and ask for the request to reach Invitéa. Include the invitation or order reference where possible, but do not send unnecessary identification documents.',
            'This policy will be updated when the service’s data practices change. Material changes should be communicated as appropriate and fresh consent sought when required. The date and version above identify this text.',
          ],
        },
      ],
    },
  },
  ar: {
    terms: {
      title: 'الشروط والأحكام',
      intro: 'آخر تحديث: 1 أكتوبر 2026 · الإصدار 2026-10-01. توضح هذه الشروط خدمة مواقع الدعوات المخصصة التي تقدمها Invitéa، وهي استوديو دعوات إلكترونية مقره الأردن. يحدد عرض السعر المكتوب نطاق طلبك وقيمته.',
      sections: [
        {
          title: 'موقع دعوة مصمم لمناسبتك',
          paragraphs: [
            'تصمم Invitéa وتطور مواقع دعوات مخصصة انطلاقاً من التفاصيل والمواد التي تقدمها. هذه خدمة تصميم تُنفذ لك، وليست أداة تحرير ذاتية. تُتفق الميزات واللغات وموعد التسليم وأي إضافات في عرض السعر.',
            'إرسال استفسار لا يؤكد الطلب. يُحدد موعد العمل بعد الاتفاق على النطاق، وقبول الشروط المعمول بها، وتأكيد استلام الدفعة المطلوبة. ينبغي أن يحدد سجل الطلب إصدار الشروط المقبول وتاريخ القبول.',
          ],
        },
        {
          title: 'الدفع داخل الأردن',
          paragraphs: [
            'تُدفع نسبة 40% لحجز المشروع قبل بدء العمل. تستحق نسبة 60% المتبقية بعد موافقتك النهائية وقبل النشر الفعلي أو تسليم رابط الدعوة القابل للاستخدام. يمكنك معاينة الدعوة قبل دفع الرصيد المتبقي.',
            'يكون الدفع داخل الأردن عبر CliQ وفق التعليمات المقدمة مع طلبك المؤكد. لا تفرض Invitéa حالياً رسوم تحويل عبر CliQ. تكون العملة المتفق عليها الدينار الأردني أو الدولار الأمريكي، كما يوضح عرض السعر.',
          ],
        },
        {
          title: 'الطلبات من خارج الأردن',
          paragraphs: [
            'تتطلب الطلبات من خارج الأردن دفع كامل القيمة مقدماً. يبدأ العمل بعد استلام المبلغ كاملاً وتأكيده. يجب تأكيد وسيلة الدفع المتاحة والعملة وأي رسوم مطبقة معك قبل الدفع؛ ولا تفترض هذه الشروط استخدام مزود دفع دولي معين.',
          ],
        },
        {
          title: 'التعديلات والأعمال الإضافية',
          paragraphs: [
            'يشمل الطلب جولتين من التعديلات. تعني الجولة مجموعة واحدة مجمعة من التغييرات البسيطة المعقولة، مثل النصوص والألوان واستبدال الصور أو التعديلات المحدودة على المسافات والتنسيق. تبلغ تكلفة كل جولة إضافية من التعديلات البسيطة 5 دنانير أردنية.',
            'يتطلب تغيير اتجاه التصميم أو نوع المناسبة، أو إضافة قسم كبير أو وظيفة جديدة، أو إعادة بناء عمل معتمد، عرض سعر منفصلاً وموافقتك قبل تنفيذ العمل الإضافي. تُصحح أخطاء Invitéa مجاناً ولا تُحتسب ضمن جولات التعديل.',
          ],
        },
        {
          title: 'التسليم والطلبات العاجلة',
          paragraphs: [
            'تصل مدة التسليم المعتادة إلى 7 أيام، وتبدأ فقط بعد استلام الدفعة المطلوبة وتفاصيل المناسبة وجميع المحتويات والمواد اللازمة. قد يمدد انتظار معلوماتك أو ملاحظاتك أو موافقتك الجدول الزمني، ويُناقش معك أي موعد معدل.',
            'يتاح التسليم خلال 3 أيام أو أقل حسب توفر الوقت، مقابل رسم استعجال قدره 10 دنانير أردنية. قد يحتاج التسليم في اليوم نفسه أو اليوم التالي إلى عرض سعر منفصل. يُؤكد الطلب العاجل بشكل فردي ولا يضمن إرسال الاستفسار توفره.',
          ],
        },
        {
          title: 'الإلغاء واسترداد المدفوعات',
          paragraphs: [
            'قد تُرد المدفوعات عند الإلغاء قبل بدء العمل. في الطلبات داخل الأردن، تصبح دفعة الحجز البالغة 40% غير قابلة للاسترداد عادةً بعد بدء العمل المخصص، نظراً لتخصيص الوقت والموارد، مع مراعاة حقوقك القانونية التي لا يجوز استبعادها.',
            'في الطلبات الدولية الملغاة بعد بدء العمل، يُقيّم أي مبلغ مستحق للاسترداد بإنصاف وفق مرحلة المشروع والعمل المنجز والوقت المبذول والمصروفات المعقولة، مع توضيح طريقة الحساب. إذا تعذر على Invitéa إتمام طلب مقبول لسبب يعود إليها، يُرد المبلغ المناسب مقابل العمل غير المنجز. لا تقيد هذه السياسة وسائل الإنصاف التي يوجبها القانون.',
          ],
        },
        {
          title: 'تفاصيلك والموافقة النهائية',
          paragraphs: [
            'يرجى تقديم أسماء وتواريخ وأوقات ومعلومات مكان وخريطة وبيانات اتصال ونصوص وصور وموسيقى ومتطلبات حضور صحيحة. تقع عليك مسؤولية مراجعة المعاينة بعناية والموافقة الصريحة على المعلومات والتصميم قبل النشر. ينبغي أن تحدد الموافقة الطلب والإصدار المعتمد وتاريخ الاعتماد.',
            'قد تخضع التعديلات بعد الاعتماد أو النشر على معلومات غير صحيحة قدمتها أو وافقت عليها لرسوم تعديل متفق عليها. أما الخطأ الذي تسببت به Invitéa فيُصحح مجاناً.',
          ],
        },
        {
          title: 'الاستضافة والتوفر',
          paragraphs: [
            'الاستضافة مشمولة دون موعد انتهاء محدد، ولا توجد حالياً رسوم تجديد سنوية. يعتمد استمرارها على التوفر المعقول لخدمات Invitéa وبنيتها التحتية ومزودي الاستضافة. لا يُعد ذلك وعداً باستضافة دائمة أو خدمة بلا انقطاع.',
            'قد ننقل البنية التحتية عند الحاجة. وقد تؤثر الصيانة أو أعطال المزودين أو الظروف الخارجة عن السيطرة المعقولة على التوفر مؤقتاً. سنتخذ خطوات معقولة لاستعادة الخدمة وإبلاغك بالانقطاعات الجوهرية. يمكنك طلب إزالة دعوتك.',
          ],
        },
        {
          title: 'دعوتك والمواد الإبداعية',
          paragraphs: [
            'تحصل على الاستخدام الحصري لموقع دعوتك المكتمل لمناسبتك، ورابط لمشاركته مع ضيوفك. تبقى الصور والنصوص والشعارات وغيرها من المواد التي تقدمها ملكاً لك. تمنح Invitéa الإذن اللازم لاستخدامها لتنفيذ طلبك، وتؤكد امتلاكك الحقوق والأذونات اللازمة، بما فيها الموسيقى والمواد التي تظهر أشخاصاً آخرين.',
            'تحتفظ Invitéa بحقوق الشيفرة والمكونات والأطر والتخطيطات وأنظمة التصميم والأنظمة الخلفية والإدارية والأدوات الداخلية السابقة والقابلة لإعادة الاستخدام. لا ينقل الشراء ملكية المنصة أو الشيفرة المصدرية. قد نطلب استبدال محتوى نعتقد بصورة معقولة أنه ينتهك حقوق الآخرين.',
          ],
        },
        {
          title: 'تأكيد الحضور وخصوصية الضيوف',
          paragraphs: [
            'عند تضمين تأكيد الحضور، يجمع النموذج المتفق عليه المعلومات اللازمة لمناسبتك فقط. ترتبط الردود بتلك الدعوة ولا تُعرض في صفحة الدعوة العامة. يقتصر الوصول عليها على مسؤولي Invitéa المخولين وأي وصول أو وسيلة تسليم للمنظم متفق عليها صراحةً في الطلب.',
            'سياستنا المعتادة هي حذف بيانات تأكيد الحضور المحددة للهوية أو إخفاء هويتها بصورة لا يمكن عكسها بعد 90 يوماً من تاريخ المناسبة. يرجى ترتيب تصدير قائمة الضيوف قبل ذلك عند الحاجة. توضح سياسة الخصوصية استخدام البيانات وطرق تقديم الطلبات. تعامل مع أي قائمة تتسلمها بمسؤولية ولغرض المناسبة المعلن فقط.',
          ],
        },
        {
          title: 'عرض أعمالنا بموافقتك',
          paragraphs: [
            'نشر دعوتك لمشاركتها مع الضيوف لا يمنح Invitéa إذناً للترويج لها. يتطلب عرض لقطات مختارة أو أسماء أو صور أو تفاصيل الدعوة في معرض أعمالنا أو وسائل التواصل موافقة منفصلة واختيارية تحدد ما يجوز عرضه. لا يؤثر رفضك في الخدمة. يمكنك التواصل معنا لسحب الإذن للاستخدامات المستقبلية وطلب الإزالة من القنوات التي نتحكم بها.',
          ],
        },
        {
          title: 'خدمات الأطراف الأخرى والمسؤولية',
          paragraphs: [
            'قد يقدم أطراف آخرون خدمات الخرائط والمراسلة والوسائط والاستضافة والدفع وفق شروطهم الخاصة. لا يمكننا ضمان استمرار توفرها أو وصول الرسائل من خلالها. ونظل مسؤولين عن التزاماتنا بموجب الطلب والقانون المعمول به.',
            'بالقدر الذي يسمح به القانون، لا تتحمل Invitéa مسؤولية خسائر ناتجة حصراً عن تفاصيل غير صحيحة قدمها العميل، أو إساءة استخدامه، أو ظروف خارجة عن السيطرة المعقولة. لا يستبعد أي إعفاء شامل أو حد ثابت للمسؤولية التزامات لا يسمح القانون باستبعادها. نسعى إلى حل عادل وعملي لأي مشكلة في الخدمة.',
          ],
        },
        {
          title: 'القانون المعمول به وتحديث الشروط',
          paragraphs: [
            'تخضع هذه الشروط للقوانين المعمول بها في المملكة الأردنية الهاشمية. لا يحد أي نص فيها من حقوق المستهلك أو الخصوصية أو غيرها من الحقوق التي لا يجوز استبعادها قانوناً.',
            'يحمل كل تحديث إصداراً وتاريخاً جديدين. يسري على طلبك الإصدار الذي وافقت عليه، ما لم يتطلب القانون تغييراً أو نتفق عليه معك بشكل منفصل. للاستفسار عن الطلب أو الإلغاء أو إزالة الاستضافة أو تقديم شكوى، تواصل مع Invitéa عبر بيانات الاتصال المقدمة مع طلبك.',
          ],
        },
      ],
    },
    privacy: {
      title: 'سياسة الخصوصية',
      intro: 'آخر تحديث: 3 أكتوبر 2026 · الإصدار 2026-10-03. توضح هذه السياسة كيفية التعامل المقصودة مع بيانات العملاء والاستفسارات والضيوف ضمن خدمة مواقع الدعوات المخصصة من Invitéa في الأردن. تعتمد البيانات المطلوبة على النموذج المستخدم والميزات المتفق عليها لدعوتك.',
      sections: [
        {
          title: 'المعلومات التي تقدمها',
          paragraphs: [
            'قد يتضمن الاستفسار اسمك وبيانات الاتصال والبلد والمناسبة وتاريخها واللغة والأسلوب المفضلين والميزات المطلوبة والملاحظات. وقد يشمل الطلب محتوى المناسبة والصور والتصاميم المعتمدة وحالة الدفع ومراجعه والمراسلات والموافقات وإصدار الشروط وتاريخ قبولها. يرجى عدم إضافة معلومات حساسة غير مرتبطة بالطلب في الحقول النصية.',
            'قد يطلب نموذج تأكيد الحضور اسم الضيف وخيار الحضور وعدد الضيوف، ورقم الهاتف أو رسالة عند الحاجة للمناسبة فقط. ينبغي أن يوضح النموذج البيانات المطلوبة قبل الإرسال. وقد تعالج أنظمة الاستضافة والحماية معلومات تقنية محدودة، مثل بيانات الاتصال وسجلات الطلبات، لتشغيل الخدمة وحمايتها.',
          ],
        },
        {
          title: 'مشاركة صور الضيوف',
          paragraphs: [
            'مشاركة الصور ميزة اختيارية، تتاح عندما تكون مشمولة ومفعّلة في الدعوة. يختار الضيف صوره ويؤكد حقه في مشاركتها مع أصحاب المناسبة وInvitéa لغرض تلك المناسبة. يمكن لهوية الضيف في كل متصفح مشاركة ما يصل إلى عشر صور. تبقى الصور خاصة، ويقتصر عرضها وتنزيلها على مسؤولي الاستوديو المخولين ومنظم المناسبة المرتبط بالدعوة. لا تُنشر تلقائياً ولا تُستخدم للترويج.',
            'تُصغّر الصور وتُضغط وتُزال منها بيانات EXIF والموقع الجغرافي قبل حفظها في مجلد خاص بالمناسبة على Google Drive. تحفظ قاعدة PostgreSQL ارتباط الدعوة ومراجع الصور ووقت الرفع وإصدار الموافقة وهوية ضيف غير مباشرة، ولا تحفظ ملفات الصور نفسها. يُستخدم ملف ارتباط أساسي من نوع HttpOnly لتحديد المتصفح وضبط عدد الصور؛ ويُنشئ حذف ملفات الارتباط أو استخدام جهاز آخر هوية جديدة.',
            'تُغلق مشاركة الصور بعد أربعة أيام من وقت المناسبة. يمنع ذلك استقبال صور جديدة، ولا يحذف الصور السابقة تلقائياً. يتولى الاستوديو حذف المجلد يدوياً؛ يرجى تنسيق تنزيل الصور وأي طلب حذف مع Invitéa. انتهاء فترة المشاركة لا يعني أن الصور المحفوظة قد مُسحت.',
          ],
        },
        {
          title: 'لماذا نحتاج المعلومات',
          paragraphs: [
            'تُستخدم المعلومات للرد على طلبك وتسعيره وإدارته، وإنشاء دعوتك واستضافتها، وتسجيل الموافقات والمدفوعات، وتنظيم ردود الحضور، وتقديم الدعم وحماية الخدمة. عندما تتطلب المعالجة موافقة، يجب الحصول عليها للغرض المحدد قبل المعالجة. وتبقى الموافقة الترويجية الاختيارية منفصلة عن طلب الخدمة.',
            'قبل إرسال صورة شخص آخر أو بياناته، تأكد من حصولك على إذنه لاستخدامها المقصود. واحصل على إذن الوالد أو الولي عند الحاجة لبيانات طفل. لا تحتاج Invitéa إلى بيانات بطاقات دفع الضيوف لتأكيد الحضور؛ لا تدخل أرقام البطاقات أو كلمات المرور المصرفية في النماذج أو الرسائل.',
          ],
        },
        {
          title: 'من يمكنه الاطلاع على المعلومات',
          paragraphs: [
            'تُتاح معلومات العملاء والطلبات للأشخاص المخولين بتقديم الخدمة وإدارتها. ويتلقى منظم المناسبة فقط معلومات الحضور اللازمة لمناسبته بالوسيلة المتفق عليها مع Invitéa. ولا تُعد ردود الحضور محتوى عاماً لمعرض الأعمال.',
            'يمكن لمن يملك رابط الدعوة المنشورة أو يتلقاه مشاهدة المحتوى المعتمد. الرابط القابل للمشاركة ليس كلمة مرور: قد يعيد الضيوف إرساله، وقد تُنشئ خدمات المراسلة معاينة للعنوان والوصف والغلاف المنشور. تجنب نشر معلومات لا ترغب بمشاركتها بهذه الطريقة. ويتطلب الترويج في معرض الأعمال ووسائل التواصل إذناً منفصلاً.',
          ],
        },
        {
          title: 'مزودو الخدمة والروابط الخارجية',
          paragraphs: [
            'يعتمد إعداد الاستضافة على Vercel للواجهة العامة، وRailway للخادم وقاعدة PostgreSQL، وGoogle Drive لملفات صور الضيوف الخاصة عند تفعيل الميزة. يعالج هؤلاء المزودون المعلومات اللازمة لتقديم الخدمة. ينبغي تأكيد مناطق المعالجة الفعلية قبل الإطلاق وتوضيحها عند الطلب؛ ولا نفترض هنا دولة تخزين محددة.',
            'يؤدي فتح خريطة أو مثال مباشر خارجي أو خدمة دفع أو WhatsApp إلى الانتقال إلى خدمة أخرى لها ممارسات خصوصية خاصة بها. لا تُرسل رسالة WhatsApp المُعدة إلا عندما تختار إرسالها هناك. راجع الرسالة وتجنب البيانات الشخصية غير الضرورية قبل الإرسال.',
          ],
        },
        {
          title: 'مدة الاحتفاظ بالمعلومات',
          paragraphs: [
            'يُحتفظ عادةً ببيانات تأكيد الحضور المحددة للهوية حتى 90 يوماً بعد تاريخ المناسبة، ثم تُحذف أو تُخفى هويتها بصورة لا يمكن عكسها. ينبغي أن يرتب المنظم المخول أي تصدير لازم قبل هذا الموعد. يمكن الاحتفاظ بإجماليات حضور مجهولة الهوية عند الحاجة، دون أسماء أو أرقام هواتف أو رسائل تكشف هوية أصحابها.',
            'يلزم محتوى الدعوة طوال فترة استضافتها، ويمكن للعميل طلب إزالتها. ينبغي الاحتفاظ بسجلات الاستفسارات والطلبات والموافقات ومراجع الدفع والدعم فقط لغرض الخدمة المحدد والالتزامات القانونية المطبقة، ثم حذفها أو إخفاء هويتها. يتطلب أي استثناء ضروري للحذف سبباً قانونياً. ويجب تحديد مدة الاحتفاظ بالنسخ الاحتياطية في جدول الاحتفاظ التشغيلي؛ فالحذف من الأنظمة النشطة لا يعني الإزالة الفورية من كل نسخة احتياطية.',
          ],
        },
        {
          title: 'ملفات الارتباط والتفضيلات والتحليلات',
          paragraphs: [
            'قد يلزم استخدام تخزين الجلسة أو ملفات ارتباط أساسية للإدارة الآمنة، وقد يُستخدم التخزين المحلي لتذكر لغتك المختارة. وهذه وظائف منفصلة عن الإعلانات. لا تفترض هذه السياسة تشغيل أدوات تحليل أو تسويق؛ وإذا أُضيفت، يجب شرح غرضها ومزودها وخياراتها والحصول على أي موافقة لازمة قبل تفعيلها.',
          ],
        },
        {
          title: 'الحماية وحقوقك',
          paragraphs: [
            'ينبغي أن تشمل وسائل الحماية تقييد الوصول الإداري والتحقق من المدخلات والاتصالات الآمنة والحماية المناسبة لقواعد البيانات والنسخ الاحتياطية. لا تستطيع أي خدمة إلكترونية ضمان حماية مطلقة. يجب التعامل مع الحوادث الأمنية وأي إخطارات لازمة وفق القانون المطبق.',
            'وفق القانون المطبق، يمكنك طلب الاطلاع على بياناتك أو الحصول على نسخة منها أو تصحيحها أو حذفها أو تقييد معالجتها أو نقلها، والاعتراض على المعالجة وسحب الموافقة. ويمكنك تقديم شكوى إلى الجهة الأردنية المختصة. قد نطلب تحققاً متناسباً من الهوية لحماية معلوماتك قبل الرد.',
          ],
        },
        {
          title: 'التواصل وتحديث السياسة',
          paragraphs: [
            'لطلب يتعلق بالخصوصية، تواصل مع Invitéa عبر بيانات الاتصال المقدمة مع طلبك. يمكن للضيوف استخدام بيانات الاتصال المرفقة بالدعوة وطلب إيصال طلبهم إلى Invitéa. أرفق مرجع الدعوة أو الطلب إن أمكن، دون إرسال وثائق تعريف غير ضرورية.',
            'تُحدث هذه السياسة عند تغير ممارسات التعامل مع البيانات. ينبغي إبلاغك بالتغييرات الجوهرية حسب الاقتضاء وطلب موافقة جديدة عند الحاجة. يحدد التاريخ والإصدار أعلاه هذه النسخة من النص.',
          ],
        },
      ],
    },
  },
};
