/**
 * i18n — UI strings and question translations for the scam quiz.
 *
 * Supported languages: English (en), Chinese (zh), Malay (ms), Tamil (ta).
 * English is the source of truth — every other language falls back to it
 * automatically wherever a string or question translation is missing (see
 * getUIString() and translateQuestion() below), so a partial translation
 * never breaks the app; it just shows English for the missing piece.
 *
 * TRANSLATION QUALITY NOTE: the zh/ms/ta content below was produced by an
 * AI assistant, not reviewed by a native speaker. The English meaning and
 * the correct answer are preserved carefully, but because this is
 * safety-education content aimed at seniors, a native-speaker review pass
 * in each language is strongly recommended before relying on it in a real
 * deployment. Treat this as a complete, working first draft rather than
 * final, verified copy.
 */

export const LANGUAGES = {
  en: { code: 'en', label: 'English', nativeLabel: 'English' },
  zh: { code: 'zh', label: 'Chinese', nativeLabel: '中文' },
  ms: { code: 'ms', label: 'Malay', nativeLabel: 'Bahasa Melayu' },
  ta: { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
};

export const DEFAULT_LANGUAGE = 'en';

const LANGUAGE_STORAGE_KEY = 'kps_language';

/** Reads the player's saved language choice, defaulting to English. */
export function getStoredLanguage() {
  try {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved && LANGUAGES[saved] ? saved : DEFAULT_LANGUAGE;
  } catch {
    // localStorage can throw in private-browsing modes on some browsers.
    return DEFAULT_LANGUAGE;
  }
}

/** Persists the player's language choice for their next visit. */
export function setStoredLanguage(lang) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {
    // Non-fatal — the switch still works for the rest of this session.
  }
}

export const UI_STRINGS = {
  en: {
    signOut: 'Sign out',
    spotTheScam: 'Spot the scam',
    questionOf: 'Question {n} of {total}',
    quizProgressLabel: 'Quiz progress',
    next: 'Next question',
    seeResults: 'See results',
    correctVerdict: "That's right. ",
    incorrectVerdict: 'Not quite. ',
    resultTitlePerfect: 'Perfect score!',
    resultTitleGood: 'Well spotted!',
    resultTitleOk: 'Good start!',
    scoreLabel: 'scams correctly identified',
    breakdownTitle: 'How you did by scam type',
    completionRecorded: 'Completion recorded!',
    completionFailed: 'Could not record completion.',
    languageLabel: 'Language',
    categories: {
      impersonation: 'Impersonation',
      blessing: 'Blessing Scam',
      love: 'Love Scam',
      investment: 'Investment Scam',
      ecommerce: 'E-commerce Scam',
    },
    survey: {
      title: 'Quick survey',
      confidenceBeforeLegend: 'Before playing, how confident were you in spotting a scam?',
      confidenceAfterLegend: 'After playing, how confident do you feel now?',
      notConfident: 'Not confident',
      veryConfident: 'Very confident',
      feelsMoreAwareLegend: 'Do you feel more aware of common scam warning signs now?',
      yes: 'Yes',
      somewhat: 'Somewhat',
      notReally: 'Not really',
      mostWorryingLabel: 'Which scam worries you most in real life?',
      chooseOne: 'Choose one...',
      difficultyLabel: 'How did you find the activity?',
      easy: 'Easy',
      justRight: 'Just right',
      hard: 'Hard',
      wouldShareLegend: 'Would you share what you learned with family or friends?',
      maybe: 'Maybe',
      no: 'No',
      learningLabel: 'One thing you learned (optional)',
      learningPlaceholder: 'Type your answer...',
      submit: 'Submit',
      submitting: 'Submitting...',
      thanks: 'Thanks for your response!',
      submitFailed: 'Could not submit — try again.',
      somethingElse: 'Something else',
    },
  },

  zh: {
    signOut: '登出',
    spotTheScam: '找出骗局',
    questionOf: '第 {n} 题，共 {total} 题',
    quizProgressLabel: '测验进度',
    next: '下一题',
    seeResults: '查看结果',
    correctVerdict: '答对了。',
    incorrectVerdict: '不太对。',
    resultTitlePerfect: '满分！',
    resultTitleGood: '很不错！',
    resultTitleOk: '好的开始！',
    scoreLabel: '成功识破的骗局数',
    breakdownTitle: '各类骗局的表现',
    completionRecorded: '已记录完成情况！',
    completionFailed: '无法记录完成情况。',
    languageLabel: '语言',
    categories: {
      impersonation: '冒充诈骗',
      blessing: '消灾解难骗局',
      love: '爱情骗局',
      investment: '投资骗局',
      ecommerce: '网购骗局',
    },
    survey: {
      title: '简短问卷',
      confidenceBeforeLegend: '在游戏开始前，您对识别骗局有多大信心？',
      confidenceAfterLegend: '游戏结束后，您现在的信心如何？',
      notConfident: '没有信心',
      veryConfident: '非常有信心',
      feelsMoreAwareLegend: '您现在是否更了解常见的骗局警号？',
      yes: '是',
      somewhat: '有一点',
      notReally: '不太了解',
      mostWorryingLabel: '您在现实生活中最担心遇到哪种骗局？',
      chooseOne: '请选择...',
      difficultyLabel: '您觉得这个活动如何？',
      easy: '简单',
      justRight: '难度适中',
      hard: '有难度',
      wouldShareLegend: '您会将学到的知识分享给家人或朋友吗？',
      maybe: '也许会',
      no: '不会',
      learningLabel: '您学到的一件事（选填）',
      learningPlaceholder: '请输入您的答案...',
      submit: '提交',
      submitting: '提交中...',
      thanks: '感谢您的回复！',
      submitFailed: '提交失败，请重试。',
      somethingElse: '其他',
    },
  },

  ms: {
    signOut: 'Log keluar',
    spotTheScam: 'Kenal pasti penipuan',
    questionOf: 'Soalan {n} daripada {total}',
    quizProgressLabel: 'Kemajuan kuiz',
    next: 'Soalan seterusnya',
    seeResults: 'Lihat keputusan',
    correctVerdict: 'Betul. ',
    incorrectVerdict: 'Kurang tepat. ',
    resultTitlePerfect: 'Markah sempurna!',
    resultTitleGood: 'Anda perasan dengan baik!',
    resultTitleOk: 'Permulaan yang baik!',
    scoreLabel: 'penipuan berjaya dikenal pasti',
    breakdownTitle: 'Prestasi anda mengikut jenis penipuan',
    completionRecorded: 'Penyelesaian telah direkodkan!',
    completionFailed: 'Tidak dapat merekod penyelesaian.',
    languageLabel: 'Bahasa',
    categories: {
      impersonation: 'Penyamaran',
      blessing: 'Penipuan Berkat',
      love: 'Penipuan Cinta',
      investment: 'Penipuan Pelaburan',
      ecommerce: 'Penipuan E-dagang',
    },
    survey: {
      title: 'Tinjauan ringkas',
      confidenceBeforeLegend: 'Sebelum bermain, sejauh mana keyakinan anda untuk mengenal pasti penipuan?',
      confidenceAfterLegend: 'Selepas bermain, bagaimana keyakinan anda sekarang?',
      notConfident: 'Tidak yakin',
      veryConfident: 'Sangat yakin',
      feelsMoreAwareLegend: 'Adakah anda rasa lebih peka terhadap tanda-tanda amaran penipuan sekarang?',
      yes: 'Ya',
      somewhat: 'Sedikit sebanyak',
      notReally: 'Tidak juga',
      mostWorryingLabel: 'Penipuan jenis apa yang paling anda risaukan dalam kehidupan sebenar?',
      chooseOne: 'Pilih satu...',
      difficultyLabel: 'Bagaimana anda rasa tentang aktiviti ini?',
      easy: 'Mudah',
      justRight: 'Sesuai',
      hard: 'Sukar',
      wouldShareLegend: 'Adakah anda akan berkongsi apa yang telah anda pelajari dengan keluarga atau rakan?',
      maybe: 'Mungkin',
      no: 'Tidak',
      learningLabel: 'Satu perkara yang anda pelajari (pilihan)',
      learningPlaceholder: 'Taip jawapan anda...',
      submit: 'Hantar',
      submitting: 'Menghantar...',
      thanks: 'Terima kasih atas maklum balas anda!',
      submitFailed: 'Tidak dapat menghantar — sila cuba lagi.',
      somethingElse: 'Lain-lain',
    },
  },

  ta: {
    signOut: 'வெளியேறு',
    spotTheScam: 'மோசடியை கண்டறியுங்கள்',
    questionOf: 'கேள்வி {n} / {total}',
    quizProgressLabel: 'வினாடி வினா முன்னேற்றம்',
    next: 'அடுத்த கேள்வி',
    seeResults: 'முடிவுகளைக் காண',
    correctVerdict: 'சரியானது. ',
    incorrectVerdict: 'சரியில்லை. ',
    resultTitlePerfect: 'முழுமையான மதிப்பெண்!',
    resultTitleGood: 'நன்றாக கண்டறிந்தீர்கள்!',
    resultTitleOk: 'நல்ல தொடக்கம்!',
    scoreLabel: 'சரியாக அடையாளம் கண்ட மோசடிகள்',
    breakdownTitle: 'மோசடி வகை வாரியான உங்கள் செயல்திறன்',
    completionRecorded: 'நிறைவு பதிவு செய்யப்பட்டது!',
    completionFailed: 'நிறைவை பதிவு செய்ய முடியவில்லை.',
    languageLabel: 'மொழி',
    categories: {
      impersonation: 'போலியாக நடிக்கும் மோசடி',
      blessing: 'ஆசி / பரிகார மோசடி',
      love: 'காதல் மோசடி',
      investment: 'முதலீட்டு மோசடி',
      ecommerce: 'இணைய வணிக மோசடி',
    },
    survey: {
      title: 'விரைவு கருத்துக்கணிப்பு',
      confidenceBeforeLegend: 'விளையாடுவதற்கு முன், மோசடியை கண்டறிவதில் உங்களுக்கு எவ்வளவு நம்பிக்கை இருந்தது?',
      confidenceAfterLegend: 'விளையாடிய பிறகு, இப்போது உங்கள் நம்பிக்கை எப்படி உள்ளது?',
      notConfident: 'நம்பிக்கை இல்லை',
      veryConfident: 'மிகவும் நம்பிக்கையுடன்',
      feelsMoreAwareLegend: 'பொதுவான மோசடி எச்சரிக்கை அறிகுறிகள் பற்றி இப்போது உங்களுக்கு அதிக விழிப்புணர்வு இருக்கிறதா?',
      yes: 'ஆம்',
      somewhat: 'ஓரளவு',
      notReally: 'அவ்வளவாக இல்லை',
      mostWorryingLabel: 'நிஜ வாழ்க்கையில் எந்த மோசடி உங்களை அதிகம் கவலைப்படுத்துகிறது?',
      chooseOne: 'ஒன்றைத் தேர்ந்தெடுக்கவும்...',
      difficultyLabel: 'இந்த செயல்பாடு உங்களுக்கு எப்படி இருந்தது?',
      easy: 'எளிதானது',
      justRight: 'சரியான அளவு',
      hard: 'கடினமானது',
      wouldShareLegend: 'நீங்கள் கற்றுக்கொண்டதை குடும்பத்தினருடனோ நண்பர்களுடனோ பகிர்ந்து கொள்வீர்களா?',
      maybe: 'இருக்கலாம்',
      no: 'இல்லை',
      learningLabel: 'நீங்கள் கற்றுக்கொண்ட ஒரு விஷயம் (விரும்பினால்)',
      learningPlaceholder: 'உங்கள் பதிலை தட்டச்சு செய்யவும்...',
      submit: 'சமர்ப்பிக்கவும்',
      submitting: 'சமர்ப்பிக்கப்படுகிறது...',
      thanks: 'உங்கள் பதிலுக்கு நன்றி!',
      submitFailed: 'சமர்ப்பிக்க முடியவில்லை — மீண்டும் முயற்சிக்கவும்.',
      somethingElse: 'வேறு ஏதாவது',
    },
  },
};

/**
 * Looks up a UI string by dotted key path (e.g. 'survey.submit'), falling
 * back to English if the language or key is missing. `vars` fills in
 * {placeholder} tokens, e.g. getUIString('zh', 'questionOf', { n: 1, total: 6 }).
 */
export function getUIString(lang, keyPath, vars) {
  const path = keyPath.split('.');
  let node = UI_STRINGS[lang];
  for (const key of path) node = node?.[key];
  if (node === undefined) {
    node = UI_STRINGS[DEFAULT_LANGUAGE];
    for (const key of path) node = node?.[key];
  }
  if (typeof node !== 'string' || !vars) return node ?? '';
  return node.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : `{${k}}`));
}

/** Translated category label (no emoji) for the given language. */
export function getCategoryLabel(lang, categoryKey) {
  return getUIString(lang, `categories.${categoryKey}`);
}

// ============================================================================
// Question content translations — Chinese, Malay, Tamil.
// Generated from js/pages/game/questions.js (English is the source of truth).
// Each entry is keyed by question id and mirrors the English option order
// and correctIndex exactly — only display text is translated.
// ============================================================================

export const zh = {
  'imp-01': {
    scenario: '一名来电者自称是警察，正在调查一起与您的银行账户有关的“洗钱”案件。他要求您将存款转到一个“安全账户”，以配合调查。',
    options: ['先向来电者索取警员编号，确认后再转账', '尽快转账，因为警方已经在调查了', '挂断电话，自行拨打警察热线（1800-255-0000）查证', '按照指示提取现金，等人来收取'],
    explanation: '真正的警察绝不会要求您把钱转到“安全账户”，也不会叫陌生人上门收现金。请挂断电话，自行拨打警察热线查证。',
  },
  'imp-02': {
    scenario: '您的“孙子”用一个新号码在WhatsApp上留言，说他手机丢了，急需您转账2000元到朋友的账户应急，之后再回电给您。',
    options: ['用孙子原本的号码致电确认，或联系其他家人求证', '要求他通过WhatsApp发送身份证照片证明身份', '立即转账，因为他听起来很紧急', '在WhatsApp上回复“你确定吗？”，如果他说是就转账'],
    explanation: '骗子经常用新号码冒充陷入困境的亲人。转账前，请务必用原本认识的号码直接联系家人求证。',
  },
  'imp-03': {
    scenario: '一名来电者自称是新加坡邮政海关人员，说一个以您名义寄送的包裹内有违禁品，您需要缴纳罚款。他要求您立即到便利店购买礼品卡付款，否则将被逮捕。',
    options: ['先用礼品卡支付一半，要求宽限时间支付余款', '先索取案件编号，再购买礼品卡', '购买礼品卡，并在电话中读出卡号', '挂断电话——新加坡邮政和海关绝不会用礼品卡收取罚款，这是骗局'],
    explanation: '任何政府机构或快递公司都不会要求用礼品卡付款。这是最常见的冒充诈骗手法之一——挂断电话，不予理会。',
  },
  'imp-04': {
    scenario: '您收到一条看似来自银行的短信，警告您的账户出现异常活动，要求您点击链接立即验证资料，否则账户将被冻结。',
    options: ['先转发给朋友询问他们是否也收到，再做决定', '删除短信，只通过自行输入网址进入银行官方应用程序或网站登录', '回复短信询问是否属实', '点击链接登录查看是否属实'],
    explanation: '银行不会通过短信中的链接要求您验证账户。切勿点击不明来源的链接——请直接前往官方应用程序或网站。',
  },
  'imp-05': {
    scenario: '一名自称来自国内税务局（IRAS）的来电者说您有欠税，并已发出逮捕令。他说只要您立即将款项转入他提供的银行账户，今天就能避免被捕。',
    options: ['立即转账以避免被捕', '先在电话中讨价还价，商量较低金额再付款', '请家人代为转账，自己不直接经手', '挂断电话，自行到IRAS官方网站或热线查询您的税务状况'],
    explanation: 'IRAS不会致电要求您立即付款以避免被捕。政府机构是通过正式信函联系，而非紧急电话威胁——请自行查证，切勿轻信。',
  },
  'imp-06': {
    scenario: '一名自称来自您电信公司的来电者说您的SIM卡已被入侵，黑客可能会盗取您的银行账户，要求您读出刚收到的一次性密码（OTP），以便“保护”您的号码。',
    options: ['赶快读出OTP，让他在黑客得手前修复问题', '先要求对方确认员工编号，再提供OTP', '拒绝提供OTP并挂断电话——电信公司绝不会索取您的OTP', '请他稍后再打来，到时候再提供OTP'],
    explanation: 'OTP只能给您自己使用。任何电信公司或银行职员都绝不会要求您在电话中读出OTP——这样做等于让骗子直接进入您的账户。',
  },
  'imp-07': {
    scenario: '一名来电者自称是公积金局（CPF Board）职员，说您的公积金账户涉及洗钱案件，要求您将公积金存款转入一个“监管账户”以便核实和保护。',
    options: ['将公积金存款转入他提供的账户', '先转一小笔金额，测试是否安全', '挂断电话——公积金局绝不会致电要求您把公积金转出', '先请他用电邮发送指示，再转账'],
    explanation: '公积金局绝不会致电要求您把公积金转到别处。这是冒充诈骗——请挂断电话，并自行拨打公积金局官方热线查证。',
  },
  'imp-08': {
    scenario: '您接到电话，说您的孙子在国外被移民局扣留，急需汇款请律师和缴付保释金，并叮嘱您不能告诉家人，否则会“使案情复杂化”。',
    options: ['挂断电话，直接联系孙子本人或其他家人求证是否属实', '要求来电者先用电邮发送正式扣留证明，再做决定', '先汇一小笔金额，争取时间', '按照指示尽快汇款，并对家人保密'],
    explanation: '要求您对家人保密是一个重大警讯——骗子这样做是为了让您无法向他人求证。遇到这种情况，请务必先直接联系家人确认。',
  },
  'imp-09': {
    scenario: '您收到一封自称来自海外律师的信件，说一位您素未谋面的远房亲戚留给您一大笔遗产，但您需要先支付一笔“手续费”才能领取。',
    options: ['支付手续费，因为遗产的价值更高', '回信询问更多关于该亲戚的详情', '不予理会——真正的遗产不需要受益人先付费才能领取', '请本地律师协商降低手续费'],
    explanation: '正规的遗产是由法院处理的，绝不会要求受益人预先付费。这是典型的预付费诈骗——请不予理会。',
  },
  'imp-10': {
    scenario: '一名自称来自知名科技公司的来电者说您的电脑不断发出病毒警报，提出可以远程为您修复，前提是您安装他发来的应用程序，之后再向您收取“维修费”。',
    options: ['挂断电话——科技公司不会主动致电通知病毒警报，也绝不安装陌生来电者提供的远程访问软件', '让他远程访问电脑，但先不透露付款资料', '安装应用程序并付费，尽快修复病毒问题', '先要求对方提供员工编号证明身份，再决定'],
    explanation: '正规科技公司不会主动致电通知病毒警报。为陌生人安装远程访问软件，可能让对方看到您电脑上的所有信息，包括银行资料。',
  },
  'bls-01': {
    scenario: '一名陌生老人接近您，说您家中有诅咒缠身，提出可以为您的黄金首饰和现金“作法净化”，但要求您先把这些物品交给她。',
    options: ['答应，但要求她当着您的面进行仪式', '把首饰和现金交给她，以便消除诅咒', '婉拒并离开——没有人能通过拿走您的贵重物品来消除诅咒', '只给首饰，不给现金'],
    explanation: '这是典型的消灾解难骗局。贵重物品一旦离手，就很难追回了。真正的宗教或灵性帮助绝不会要求您交出现金或首饰。',
  },
  'bls-02': {
    scenario: '一名“庙宇灵媒”来电，说您的健康问题是恶灵作祟所致。她提出，只要您先把存款转给她“作法”，就能通过特殊仪式让您的钱翻倍。',
    options: ['请家人代为转账', '挂断电话——没有任何仪式能让钱翻倍，这是骗局', '先转一小笔金额，测试是否真的能翻倍', '亲自见面并用现金支付，感觉会比较安全'],
    explanation: '没有任何仪式、祈福或灵媒能让您的钱“翻倍”。任何要求汇款以求增值或消灾的说法都是骗局——请挂断电话，不要再理会。',
  },
  'bls-03': {
    scenario: '一名打扮成僧人的人上门为庙宇募捐，在称赞您慷慨大方、“福气好”之后，坚持要您捐出比平常多得多的金额，以“配得上您的好福气”。',
    options: ['因为他说您福气好，就捐出较大金额', '先给这笔钱，但如果他无法证明自己是真正的僧人就要回来', '请他之后带收据簿再来，届时再决定', '婉拒这种额外的压力，只捐出您觉得自在的金额，或改为捐给正规注册慈善机构'],
    explanation: '真正的宗教团体不会用奉承的方式向人施压，要求更多捐款。如果您想捐款，请捐给您自行查证过的正规注册慈善机构。',
  },
  'bls-04': {
    scenario: '市场里一名陌生女子提出免费为您看手相，看着看着突然一脸担忧，说您家很快会遇上大灾祸——除非您现在向她购买一个特别的护身符。',
    options: ['买一个便宜一点的护身符，以防万一', '立即购买护身符以保护家人', '先讨价还价再购买', '转身离开——这是常见的施压手法，真正的警示不会靠卖护身符来解决'],
    explanation: '这是典型的施压手法：先制造恐惧，再推销“解决方案”。真正的预言不会恰好靠当场购物就能化解。',
  },
  'bls-05': {
    scenario: '在小贩中心，一名女子说她感应到您的儿子身处严重危险，提出为他祈福，但表示每次祈祷都必须支付越来越多的钱，祈福才会“有效”。',
    options: ['意识到这是利用您对孩子的担忧而设的骗局，停止付款并离开', '要求她当场打电话给儿子证明', '为了保护儿子，继续支付越来越多的钱', '再多付一次，如果情况没有改善就停止'],
    explanation: '骗子经常利用父母对子女的爱与担忧下手。真正的祈祷或祈福绝不会索价不断攀升——请立即离开。',
  },
  'bls-06': {
    scenario: '有人自称代表某间庙宇致电，说您的祖先“不高兴”，为家中带来厄运，必须尽快进行一场特定金额的祈福法事才能化解。',
    options: ['挂断电话——正规庙宇不会无故来电，要求付钱来“安抚”祖先', '先讨价还价，压低价格再付款', '尽快转账，以免祖先带来更多厄运', '请家人直接致电对方提供的号码向庙宇求证'],
    explanation: '真正的庙宇不会主动致电索取钱财来“处理”祖先相关的事。若有疑虑，请自行查找您认识且信任的庙宇的联系方式求证。',
  },
  'bls-07': {
    scenario: '一小群人在街上表演祈福仪式，递给您一个红包，说您必须“回礼”捐款。您给了一小笔钱，但他们坚持要更大笔的转账，祈福才算“圆满”。',
    options: ['再多给一点，但坚决拒绝更多要求', '转账较大金额，以免祈福不圆满', '要求他们写明这笔钱的用途，再决定是否多付', '转身离开——真正的祈福不是一场不断加码的金钱交易'],
    explanation: '先收取小额款项后再不断加码索取，是常见的街头骗局手法。根本没有所谓“不圆满”而需要额外付款的祈福——请转身离开。',
  },
  'bls-08': {
    scenario: '一名自称风水师的人提出免费为您看家宅风水，之后说您家中有邪灵，只有购买他碰巧在售卖的特定昂贵物品或水晶才能驱除。',
    options: ['购买他推荐的物品以驱除邪灵', '婉拒——真正的风水咨询不应该要求向顾问本人购买特定的昂贵物品', '要求他免费帮忙驱邪，因为您是年长者', '购买较便宜的替代品'],
    explanation: '当诊断问题的人正好也是昂贵解决方案的卖家时，要特别小心。这种利益冲突是常见的推销手法，用来促使人购买不必要的物品。',
  },
  'bls-09': {
    scenario: '一名来电者说您的彩票号码“被诅咒”带来厄运，提出通过一场仪式性的“交换”来净化——您把现金交出去“作法”，之后会双倍奉还，但归还的钱竟然是假钞。',
    options: ['可以尝试，但只用不要的旧钞票', '拒绝——没有任何仪式能祈福或让钱翻倍，交出真钞去“交换”很可能血本无归', '要求先把“作法”后的钱拿去银行检查', '先用一小笔金额试一试是否真的有效'],
    explanation: '这种“交换”手法是设计来在“仪式”过程中把您的真钞换成假钞。任何祈福都不会改变金钱的价值——切勿为此交出现金。',
  },
  'bls-10': {
    scenario: '一名打扮成僧人的男子在您家门口，提出送您一个“护身”手链，并坚持要您给予高额捐款作为回报，当您表示没有兴趣时，他变得咄咄逼人，让人不安。',
    options: ['收下手链，答应下次再付款', '坚决拒绝并关门；如果他不肯离开，联系邻居或保安协助', '妥协付款，让他离开', '提出少得多的金额，尽快结束对话'],
    explanation: '真正的宗教捐款绝不会是被强迫的。当您拒绝后对方变得咄咄逼人，本身就是一个警讯——请坚定拒绝，必要时寻求他人协助。',
  },
  'luv-01': {
    scenario: '您与一名在网上认识的男子聊了两个月，他自称是在海外工作的工程师。他从未与您视频通话，如今却说急需一笔钱支付“海关费”，才能飞来新加坡见您。',
    options: ['先汇一半金额，表示信任他', '坚持先进行实时视频通话，并拒绝向从未真正见过面的人汇款', '汇款给他——他在聊天中一直对您很体贴', '要求他拍一张手持当天报纸的照片作为证明'],
    explanation: '从未见面就一直回避视频通话，还要求支付各种“费用”，是典型的爱情骗局警号。真正交往的对象不会反复回避视频通话，也不会要钱“飞过来”。',
  },
  'luv-02': {
    scenario: '您新认识的网络对象向您介绍一位在投资公司工作的“朋友”，并建议你们两人一起把钱投入一个交易平台，共同“打造未来”。',
    options: ['意识到这是常见的爱情加投资骗局组合，拒绝通过只在网上认识的人进行投资', '因为对象推荐，就加入该平台', '先投入一小笔金额，试探对方的用心', '让对象先投资，自己再跟进'],
    explanation: '在网上认识的对象若介绍“投资机会”，是新加坡最常见的骗局手法之一。切勿因为只在网上认识的人的推荐而投入资金。',
  },
  'luv-03': {
    scenario: '您在交友软件上认识的一名男子自称是驻扎海外的美国军官，说要寄一份贵重礼物给您，但要求您先支付一笔“海关清关费”才能送达。',
    options: ['要求他降低费用后再付款', '支付清关费，让礼物能够送达', '先付一半费用，看礼物是否会送到', '拒绝——真正的礼物不需要收件人支付海关费用，这是常见的骗局套路'],
    explanation: '“军官寄送需要清关费的礼物”是最常见的爱情骗局套路之一。真正的礼物绝不需要您付钱才能收到。',
  },
  'luv-04': {
    scenario: '认识几个星期的网络对象突然留言说自己出了意外，急需一笔钱在海外做紧急手术，说没有别人可以求助，并承诺康复后会还钱。',
    options: ['先汇一小笔金额，表示诚意', '请他那位您同样未曾见过的朋友先确认，再汇款', '因为是医疗紧急情况，立即汇款', '保持警惕——先通过视频通话及其他独立方式核实，才考虑是否汇款给从未见过面的人'],
    explanation: '突发医疗紧急情况是爱情骗局中常见的施压手法。请先独立核实——例如实时视频通话，或直接联系当地医院——再考虑是否汇款。',
  },
  'luv-05': {
    scenario: '您的网络对象说自己国家的银行账户无法使用，要求您改为购买iTunes或Google Play礼品卡，并把卡号发给他，以此方式“汇钱”给他应急。',
    options: ['先要求对方进一步说明银行问题，再做决定', '购买礼品卡并按要求发送卡号', '拒绝——要求以礼品卡代码付款是重大骗局警号，正当的人绝不会这样要求', '购买面额较小的礼品卡，比较安全'],
    explanation: '无论是感情往来还是其他交易，正当的付款都不会通过礼品卡代码进行。这是最明显的骗局迹象之一——请拒绝并停止联系。',
  },
  'luv-06': {
    scenario: '您与一名网友聊了好几个月，对方总有各种理由无法见面或视频通话。最近，对方开始以各种紧急情况为由向您“借钱”，并承诺见面时会全数归还。',
    options: ['要求对方写下借据后再借款', '意识到对方反复找借口逃避见面是一个警号，停止汇款', '因为已经聊了几个月，信任对方，继续借钱', '只借一笔固定的小额金额，之后不再借'],
    explanation: '聊天时间长短并不能证明对方的真实身份。反复回避视频通话或见面，同时不断要钱，是爱情骗局最明显的特征之一。',
  },
  'luv-07': {
    scenario: '您的网络对象说自己经营进出口生意，要求您用自己的银行账户代收“客户”的付款，再转交给他，并提出会支付您一笔手续费作为报酬。',
    options: ['因为能赚取手续费，答应帮忙', '先试一次看是否合法，再决定', '拒绝——这可能让您成为诈骗或洗黑钱资金的“钱骡”，即使不知情也可能触犯法律', '先索取客户的联系方式，再答应'],
    explanation: '让钱款经过您的账户转给他人，可能使您在法律上成为“钱骡”而需负责，即使您并不知情。切勿让自己的银行账户被这样使用。',
  },
  'luv-08': {
    scenario: '您的网络对象发来一张看似躺在医院病床上的照片，说急需今天就汇一笔钱用于治疗，并表示康复后会解释一切。',
    options: ['先汇一部分金额，其余之后再说', '保持怀疑——照片可以在网上任意取得，先通过实时视频通话核实，再考虑是否汇款', '看到照片证据后，立即汇款', '先询问医院名称，之后直接汇款，不再进一步查证'],
    explanation: '单凭一张照片什么都无法证明——图片很容易从网上截取。对于声称的紧急情况，务必先独立核实，最好是通过实时视频通话，再考虑汇款。',
  },
  'luv-09': {
    scenario: '一名一直与您聊天的网络对象要求您分享私密照片，之后却以将照片发给您的家人和朋友为威胁，要求您支付一大笔钱。',
    options: ['尝试与对方协商降低金额', '付钱以阻止对方公开照片', '删除您的账号，希望对方因此放弃', '不要付钱——立即报警，这是犯罪行为，而且付钱往往无法阻止对方继续勒索'],
    explanation: '支付赎金很少能真正终止性勒索——往往会招致更多的要求。请立即停止一切联系，保留相关信息证据，并尽快报警。',
  },
  'luv-10': {
    scenario: '一名网络对象自称是海外的鳏夫或寡妇，独自抚养幼儿，说孩子出现医疗紧急状况，因目前无法动用自己的存款，要求您紧急汇款。',
    options: ['意识到涉及“孩子身处危险”的情感诉求是常见的骗局手法，先独立核实再决定是否汇款', '先汇一小笔金额，表示善意', '立即汇款以帮助孩子', '先索取孩子的照片，再做决定'],
    explanation: '骗子经常虚构一个身处险境的孩子，以制造紧迫感和愧疚感。无论故事听起来多么感人，请先通过视频通话或其他可信来源独立核实，再考虑汇款。',
  },
  'inv-01': {
    scenario: '一位旧同学把您加入一个WhatsApp群组，群内成员分享通过某加密货币平台获得巨额利润的截图，并鼓励大家“尽早加入”，保证每月20%的回报。',
    options: ['向群组管理员索取更多证明，再按建议投入金额', '保持警惕——保证高回报且毫无风险是重大警号，即使是朋友介绍的也一样', '立即加入——旧同学不会骗您', '先投入一小笔金额“试水”，看利润截图是否属实'],
    explanation: '任何正当投资都无法保证毫无风险的高额月回报。骗子经常利用可信联系人的WhatsApp或社交媒体，让骗局看起来更可信——投资前请务必向新加坡金融管理局（MAS）查证。',
  },
  'inv-02': {
    scenario: '您在面簿上看到一则广告，一位本地知名电视艺人“代言”一款投资应用程序，声称能在一个月内将500元变成5000元。该应用程序要求您先追加存款，才能提取“利润”。',
    options: ['因为应用程序显示已有利润，追加存款', '在应用程序的客服聊天中要求对方证明其合法性', '先提取一小笔金额，如果成功再追加存款', '意识到虚假名人代言和“先存款才能提款”是骗局警号，立即停止'],
    explanation: '虚假名人代言，以及要求先“追加存款”才能提取自己利润的应用程序，是投资骗局的典型特征。投资前请先查阅新加坡金融管理局的金融机构名录。',
  },
  'inv-03': {
    scenario: '一名Instagram网红推广一个未受监管的外汇交易平台，展示每日巨额利润的截图，声称只需小额资金即可加入，并保证有回报。',
    options: ['先查证该平台是否受新加坡金融管理局监管，并对“保证”回报保持警惕，因为真正的交易没有这种保证', '要求网红提供更多证明后再加入', '先用最小金额试一试', '因为网红看起来可信且成功，就加入'],
    explanation: '没有任何交易平台能保证获利——市场本来就有涨有跌。无论是谁推荐，投资前都应先查阅新加坡金融管理局的金融机构名录。',
  },
  'inv-04': {
    scenario: '您接到一通自称理财顾问的来电，提出让您独家参与一家公司上市前的“预上市”投资机会，声称股份很快就会大幅增值。',
    options: ['对不请自来的投资电话保持警惕，先独立查证顾问的执照以及该公司的说法，再考虑投资', '请同样有投资的朋友确认是否属实', '先投入一小笔“试探性”金额', '趁“机会”还在，尽快投资'],
    explanation: '真正的投资机会很少通过制造紧迫感的不请自来电话提供。投资前请先确认顾问是否在新加坡金融管理局注册，并自行查证该公司的资料。',
  },
  'inv-05': {
    scenario: '一位朋友向您介绍一个投资计划，早期投资者的丰厚回报是用后来加入者投入的资金支付的，并鼓励您邀请家人和朋友一起加入。',
    options: ['因为朋友已经从中获利，就加入并邀请他人', '加入，但不邀请其他人', '只投入朋友已经赚回来的那部分金额', '意识到这是一种“庞氏骗局”，一旦没有新投资者加入就会崩盘，应避免参与'],
    explanation: '用新投资者的钱支付旧投资者回报的计划注定无法持续，最终一定会崩盘，让最后加入的人承担损失。这种结构在新加坡属于违法行为。',
  },
  'inv-06': {
    scenario: '一名来电者声称有一项与SkillsFuture或公积金相关的特殊政府计划，只要将公积金存款转入一个私人账户“处理”，就能让存款翻倍，并表示优惠仅限一段时间内有效。',
    options: ['挂断电话——公积金局及政府计划绝不会要求您把存款转入私人账户来“翻倍”', '赶在优惠结束前，尽快转出公积金存款', '先要求对方以电邮发送正式文件，再转账', '先转一部分金额，测试是否真的有效'],
    explanation: '没有任何正规政府计划能通过私人转账让您的公积金存款翻倍。这是冒充加投资的复合型骗局——请只通过公积金局的官方网站或热线查证。',
  },
  'inv-07': {
    scenario: '您在住家附近看到贴有二维码的海报，宣称只要扫码投资一个声称支持本地商家的“社区基金”，就能获得固定的高回报。',
    options: ['先询问邻居是否投资过，再做决定', '对通过街头海报宣传的投资提议保持警惕，行动前先查证该“基金”是否受新加坡金融管理局监管', '不论回报如何，先投入一小笔以示支持', '因为是为了支持社区，扫码投资'],
    explanation: '正规的投资基金不会通过街头海报和二维码来宣传。在扫码或转账前，请务必确认任何投资机会是否受新加坡金融管理局监管。',
  },
  'inv-08': {
    scenario: '一名您从未见过面的网络联系人提供一个海外房地产投资的“优惠”，说必须尽快汇出定金，否则价格会上涨，且您无法亲自查看该房产。',
    options: ['尽快汇出定金，锁定优惠价格', '先汇出一半定金，其余再决定', '对要求尽快付款、却无法亲自查证的房产保持警惕，先独立核实中介和房产资料', '先索取更多房产照片，再汇款'],
    explanation: '对无法亲自查证的东西被要求尽快付款，是常见的骗局手法。汇出任何定金前，请务必独立核实中介的执照以及该房产是否真实存在。',
  },
  'inv-09': {
    scenario: '在社区活动中，有人提出协助您投资黄金，承诺几个月后以更高价格保证回购，并要求您直接把现金交给他本人，而不是通过任何公司。',
    options: ['先要求对方写下手写借据，再交出现金', '因为对方看起来友善，且是保证回购的交易，就交出现金', '先给较小金额，测试回购是否真的兑现', '婉拒——真正的黄金投资应通过持牌交易商进行，并附有正规收据，而不是把现金直接交给个人'],
    explanation: '任何要求直接把现金交给个人、没有持牌公司或正规收据的投资，风险都很高。黄金投资请务必通过受认可的持牌交易商进行。',
  },
  'inv-10': {
    scenario: '一名上门推销员提供一款兼具投资性质的保险计划，承诺不寻常的高额保证回报，并施压要求您当场签署合约并缴付首期保费，不留任何文件供您查阅。',
    options: ['因为回报诱人，当场签约并付款', '先缴付较低的首期保费，测试该计划', '先签约，等他下次来访时才付款', '拒绝当场签署任何文件；要求索取文件仔细查阅，并确认该代理及产品是否已在新加坡金融管理局注册'],
    explanation: '被施压要求立即签约付款、且没有时间查阅文件，是重大警号。正规代理都会在新加坡金融管理局注册，并会让您在承诺前先查阅保单内容。',
  },
  'ecm-01': {
    scenario: '您在Carousell上看到一台全新空气炸锅，售价只是市价的一半。卖家还没有任何评价，并要求您先用PayNow把全额款项汇到一个私人手机号码，且不提供货到付款的选项。',
    options: ['要求卖家进一步降价后再付款', '先付一半，收货后再付另一半，但不再进一步查证卖家', '对没有评价、只接受预先PayNow付款、又不提供买家保障的卖家保持警惕，考虑使用有货到付款或第三方担保的平台', '因为价格实惠，全额用PayNow付款'],
    explanation: '大幅折扣、没有评价，加上坚持预先PayNow到私人号码，都是常见的网购骗局迹象。请优先选择提供买家保障的平台，并对拒绝货到付款的卖家保持警惕。',
  },
  'ecm-02': {
    scenario: '一则面簿广告显示知名电子产品品牌正进行“清仓大减价”，八折优惠，链接指向一个与该品牌官网略有不同的网站，且只接受银行转账付款。',
    options: ['仔细核对网址是否与该品牌官网一致，并避免向不熟悉的网站进行银行转账付款', '先转一小笔定金，测试货物是否会送达', '赶在“优惠”结束前尽快购买', '先把链接分享给朋友，再决定是否购买'],
    explanation: '冒牌的“清仓大减价”广告，加上仿冒网址和只接受银行转账付款，是常见的网购骗局。请务必仔细核对网址，并优先使用有买家保障的安全付款方式。',
  },
  'ecm-03': {
    scenario: '您收到一条短信，说有一个包裹无法派送，需支付少许的重新派送费，并附上付款链接。链接页面要求您输入完整的银行卡号、有效期和安全码（CVC）来处理这笔“费用”。',
    options: ['先回复短信询问是否属实', '改用另一张卡付款，以防万一', '不要点击链接——直接通过快递公司的官方应用程序或网站查证，因为真正的重新派送通知不会这样索取完整卡号资料', '输入银行卡资料，支付这笔小额费用取回包裹'],
    explanation: '如有真正的重新派送费用，也应通过快递公司的官方应用程序或网站付款——绝不会通过短信链接输入完整的银行卡资料。',
  },
  'ecm-04': {
    scenario: '在一个面簿买卖群组中，一名卖家要求您在发货前先用PayNow全额付款，购买一件热门商品。付款后，卖家不再回复您的消息，个人主页也无法再找到。',
    options: ['向平台和警方举报该卖家及交易——往后请优先选择有评价的卖家，以及提供买家保障的平台', '尝试再多付一点钱，看能否“解除封锁”对话', '在群组里发帖，等卖家自己看到', '继续发消息，期望对方最终会回复'],
    explanation: '骗子在收款后消失，再发消息也无济于事。请尽快举报，往后应优先选择提供买家保障的平台，而非直接用PayNow转账给不熟悉的卖家。',
  },
  'ecm-05': {
    scenario: '一间网上药店以极低价格出售保健品，要求全额预付款。付款后却完全联系不上卖家询问进度，商品最终没有送达，或与广告描述完全不符。',
    options: ['先小额下单，即使没有做任何查证', '下次改用银行转账，认为这样比较可靠', '购买前先查核不熟悉的网上保健品卖家是否有正规商业注册、评价和联络方式', '因为价格实惠，继续耐心等待，认为一定是真的'],
    explanation: '价格异常低廉、又没有可查证的联络方式或注册资料，是虚假网店的常见迹象。尤其是保健品，请只向经过核实、持牌的卖家购买。',
  },
  'ecm-06': {
    scenario: '在市集的一个临时摊位，您扫描二维码付款购买商品。您不知道的是，有人已把假的二维码贴纸贴在摊位原本的二维码上，导致您的付款转入了骗子的账户，而不是摊主的账户。',
    options: ['以后一律改用现金付款，完全避免此问题', '换一个应用程序再扫一次，以策安全', '确认付款前，核对付款应用程序上显示的名称是否与摊主相符，如有疑问应向摊主询问', '认为既然是摊位上显示的二维码，应该没问题'],
    explanation: '确认付款前，请务必核对付款应用程序上显示的名称是否与摊主相符。二维码被调包是实体摊位中日益常见的真实骗局。',
  },
  'ecm-07': {
    scenario: '一名网购平台上的买家提出为高价物品“约在中途见面”交收，但坚持要先通过一个无法追踪的付款应用程序全额转账，之后才确定见面的时间和地点。',
    options: ['先接受付款，省去立即见面的麻烦', '对要求通过无法追踪的应用程序先付款保持警惕，宁可选择在安全的公共场所当面交收付款', '先通过同一应用程序收取较小额的定金', '接受付款，但要求对方先发送付款截图'],
    explanation: '在约定见面之前就坚持要求无法追踪的先付款方式，是常见的骗局设计。请优先选择安全的公共场所，并在交收当下才进行付款。',
  },
  'ecm-08': {
    scenario: '一则招聘广告提供轻松的居家兼职包装工作，薪资优厚，但要求您先支付“注册费”或“押金”，才能领取入门套件并加入发薪名单。',
    options: ['因为薪资吸引，支付这笔费用', '先支付较低的押金，看看这份工作是否真实', '保持警惕——正规雇主不会要求员工预先付费才能开始工作，这是常见的求职骗局', '要求从第一份薪水中扣除这笔费用'],
    explanation: '正规雇主绝不会要求新员工预先付款才能开始工作。任何要求预付注册费或押金的招聘广告，都应视为可能的骗局。',
  },
  'ecm-09': {
    scenario: '您找到一个看起来很专业的电子产品网店，价格实惠，还有安全认证标志和顾客评价。付款后商品却始终没有送达，客服也不再回应，最终整个网站消失不见。',
    options: ['在网站以外查找独立评价，并在不熟悉的网站购物时使用具有买家保障的安全付款方式', '下次改用银行转账，以为处理会更快', '尝试在同一网站再下一次订单，看这次是否成功', '因为网站看起来专业可信，继续耐心等待'],
    explanation: '网站看起来专业并不代表真实可靠——诈骗网站也能仿冒信任标志和虚假评价。请在网站以外查找独立评价，并使用具有买家保障的付款方式。',
  },
  'ecm-10': {
    scenario: '您在网上出售一件物品，一名“买家”发来一张显示多付款项的付款截图，随后急切要求您在核实款项是否真正到账之前，先把差额退款到另一个账户。',
    options: ['退还一半金额作为折衷', '先查看自己的银行账户或应用程序，确认款项确实已经到账，再考虑退款', '因为对方已发送付款证明，尽快退还差额', '要求对方先发送更清晰的截图，再退款'],
    explanation: '付款截图是可以伪造的。在退还任何款项之前，请务必先确认款项确实已经进入您自己的账户——这种“多付款”手法是常见的针对网络卖家的骗局。',
  },
};

export const ms = {
  'imp-01': {
    scenario: 'Seorang pemanggil mengatakan dia seorang pegawai polis yang sedang menyiasat kes berkaitan akaun bank anda yang digunakan untuk “pengubahan wang haram”. Dia meminta anda memindahkan simpanan anda ke “akaun selamat” semasa siasatan diteruskan.',
    options: ['Minta nombor lencana pemanggil dan pindahkan selepas diberikan', 'Pindahkan wang dengan segera kerana polis sudah menyiasat', 'Letakkan telefon dan hubungi talian polis (1800-255-0000) sendiri untuk semak', 'Keluarkan wang tunai dan tunggu seseorang mengambilnya, seperti diarahkan'],
    explanation: 'Polis sebenar tidak akan sesekali meminta anda memindahkan wang ke “akaun selamat” atau menyerahkan wang tunai kepada orang asing. Letakkan telefon dan sahkan sendiri melalui talian polis.',
  },
  'imp-02': {
    scenario: '“Cucu” anda menghantar mesej WhatsApp daripada nombor baharu, mengatakan telefonnya hilang dan perlu segera $2,000 dipindahkan ke akaun rakannya untuk membayar sesuatu sebelum dia dapat menelefon anda semula.',
    options: ['Telefon cucu anda menggunakan nombor lamanya atau minta ahli keluarga lain sahkan sama ada ia benar-benar dia', 'Minta dia membuktikannya dengan menghantar gambar NRIC melalui WhatsApp', 'Pindahkan wang serta-merta kerana dia kedengaran tergesa-gesa', 'Balas di WhatsApp bertanya “Adakah kamu pasti?” dan pindahkan jika dia kata ya'],
    explanation: 'Penipu sering menghantar mesej daripada nombor baharu berlagak sebagai saudara yang dalam kecemasan. Sentiasa sahkan dengan menelefon terus ahli keluarga menggunakan nombor yang diketahui sebelum menghantar apa-apa.',
  },
  'imp-03': {
    scenario: 'Seorang pemanggil mendakwa dia daripada kastam SingPost, mengatakan bungkusan atas nama anda mengandungi barang haram dan anda berhutang denda. Dia meminta anda membayar segera menggunakan kad hadiah dari kedai serbaneka untuk mengelak ditangkap.',
    options: ['Bayar separuh dengan kad hadiah dan minta lanjutan masa untuk selebihnya', 'Minta nombor kes dahulu, kemudian beli kad hadiah', 'Beli kad hadiah dan bacakan kod melalui telefon', 'Letakkan telefon — SingPost dan kastam tidak pernah mengutip denda melalui kad hadiah, ini adalah penipuan'],
    explanation: 'Tiada agensi kerajaan atau syarikat penghantaran meminta bayaran melalui kad hadiah. Ini antara taktik penipuan penyamaran yang paling biasa — letakkan telefon dan abaikan permintaan sebegini.',
  },
  'imp-04': {
    scenario: 'Anda menerima SMS yang kelihatan seperti daripada bank anda, memberi amaran bahawa aktiviti luar biasa dikesan pada akaun anda dan meminta anda klik pautan untuk mengesahkan butiran anda serta-merta atau akaun akan digantung.',
    options: ['Hantar SMS itu kepada rakan untuk bertanya jika mereka juga menerimanya sebelum membuat keputusan', 'Padam SMS itu dan log masuk hanya melalui aplikasi atau laman web rasmi bank, ditaip sendiri', 'Balas SMS bertanya sama ada ia sah', 'Klik pautan dan log masuk untuk semak sama ada ia benar'],
    explanation: 'Bank tidak meminta anda mengesahkan akaun melalui pautan dalam SMS. Jangan sesekali klik pautan dalam mesej yang tidak dijangka — pergi terus ke aplikasi atau laman web rasmi.',
  },
  'imp-05': {
    scenario: 'Seorang pemanggil yang mendakwa daripada IRAS mengatakan anda mempunyai cukai tertunggak dan waran tangkap telah dikeluarkan. Dia berkata anda boleh mengelak ditangkap hari ini dengan memindahkan jumlah tersebut serta-merta ke akaun bank yang dia berikan.',
    options: ['Pindahkan wang segera untuk mengelak ditangkap', 'Berunding untuk jumlah yang lebih rendah melalui telefon sebelum membayar', 'Minta ahli keluarga memindahkan wang supaya anda tidak terlibat secara langsung', 'Letakkan telefon dan semak status cukai anda sendiri di laman web atau talian rasmi IRAS'],
    explanation: 'IRAS tidak menelefon untuk menuntut bayaran segera bagi mengelak penangkapan. Agensi kerajaan berkomunikasi melalui surat rasmi, bukan ugutan telefon segera — sahkan sendiri sebelum berbuat apa-apa.',
  },
  'imp-06': {
    scenario: 'Seseorang yang menelefon dari syarikat telefon bimbit anda berkata kad SIM anda telah dikompromi dan penggodam mungkin mengakses akaun bank anda. Dia meminta anda membacakan kata laluan sekali guna (OTP) yang baharu diterima supaya dia boleh “mengamankan” talian anda.',
    options: ['Bacakan OTP dengan cepat supaya dia dapat membetulkannya sebelum penggodam masuk', 'Kongsi OTP tetapi minta dia sahkan nombor kakitangannya dahulu', 'Enggan berkongsi OTP dan letakkan telefon — syarikat telefon tidak pernah meminta OTP anda', 'Minta dia telefon semula kemudian dan kongsi OTP pada waktu itu'],
    explanation: 'OTP hanya untuk anda sahaja. Tiada kakitangan syarikat telefon atau bank akan meminta anda membacakannya melalui telefon — berbuat demikian membuka jalan terus kepada akaun anda untuk penipu.',
  },
  'imp-07': {
    scenario: 'Seorang pemanggil mendakwa daripada Lembaga CPF dan berkata akaun CPF anda dikaitkan dengan kes pengubahan wang haram. Dia meminta anda memindahkan simpanan CPF ke “akaun pemantauan” supaya dapat disahkan dan dilindungi.',
    options: ['Pindahkan simpanan CPF anda ke akaun yang dia berikan', 'Pindahkan sedikit dahulu untuk melihat sama ada ia selamat', 'Letakkan telefon — Lembaga CPF tidak pernah meminta anda memindahkan wang keluar dari akaun CPF melalui telefon', 'Minta dia e-mel arahan dahulu, kemudian pindahkan wang'],
    explanation: 'Lembaga CPF tidak akan menelefon meminta anda memindahkan simpanan CPF ke tempat lain. Ini penipuan penyamaran — letakkan telefon dan sahkan melalui talian rasmi CPF sendiri.',
  },
  'imp-08': {
    scenario: 'Anda menerima panggilan mengatakan cucu anda ditahan pihak imigresen di luar negara dan memerlukan wang segera dihantar untuk peguam dan jaminan, dan anda tidak boleh memberitahu sesiapa dalam keluarga kerana ia akan “rumitkan kes”.',
    options: ['Letakkan telefon dan hubungi cucu anda atau ahli keluarga lain terus untuk sahkan sama ada ia benar', 'Minta pemanggil menghantar surat tahanan rasmi melalui e-mel sebelum membuat keputusan', 'Hantar jumlah yang lebih kecil dahulu untuk membeli masa', 'Hantar wang segera dan rahsiakannya seperti diarahkan'],
    explanation: 'Diarahkan merahsiakannya daripada keluarga adalah amaran besar — penipu mengasingkan anda supaya tiada siapa dapat menyemak cerita itu. Sentiasa sahkan terus dengan keluarga dahulu.',
  },
  'imp-09': {
    scenario: 'Anda menerima surat yang mendakwa daripada peguam di luar negara mengatakan seorang saudara jauh yang anda tidak pernah dengar telah meninggalkan warisan besar untuk anda, tetapi anda perlu membayar “yuran pemprosesan” dahulu untuk melepaskan dana tersebut.',
    options: ['Bayar yuran pemprosesan kerana warisan itu bernilai lebih tinggi', 'Balas untuk meminta lebih maklumat tentang saudara tersebut dahulu', 'Abaikan surat itu — warisan sebenar tidak memerlukan anda membayar wang terlebih dahulu untuk menerimanya', 'Minta peguam di sini berunding untuk yuran pemprosesan yang lebih rendah'],
    explanation: 'Warisan sah diuruskan oleh mahkamah dan tidak pernah memerlukan penerima membayar yuran terlebih dahulu. Ini penipuan yuran pendahuluan klasik — abaikan sahaja.',
  },
  'imp-10': {
    scenario: 'Seorang pemanggil yang mendakwa daripada syarikat teknologi terkenal berkata komputer anda menghantar amaran virus dan menawarkan untuk membaikinya dari jauh jika anda memasang aplikasi yang dihantarnya, kemudian meminta bayaran untuk “pembaikan” itu.',
    options: ['Letakkan telefon — syarikat teknologi tidak menelefon dahulu tentang amaran virus, dan jangan sesekali pasang aplikasi akses jauh daripada pemanggil tidak dikenali', 'Biarkan dia mengakses komputer anda tetapi jangan berikan butiran pembayaran lagi', 'Pasang aplikasi dan bayar pembaikan untuk membetulkan virus dengan cepat', 'Minta dia buktikan dia daripada syarikat itu dengan memberikan ID pekerja dahulu'],
    explanation: 'Syarikat teknologi sebenar tidak menelefon secara tiba-tiba tentang amaran virus. Memasang perisian akses jauh untuk orang asing boleh membenarkan mereka melihat segala-galanya dalam komputer anda, termasuk butiran perbankan.',
  },
  'bls-01': {
    scenario: 'Seorang wanita tua yang tidak dikenali menghampiri anda dan berkata keluarga anda dilanda nasib malang akibat sumpahan, dan menawarkan untuk “membersihkan” barang kemas emas dan wang tunai anda dengan berdoa ke atasnya — tetapi anda mesti menyerahkan barang tersebut dahulu.',
    options: ['Setuju, tetapi minta mereka lakukan upacara di hadapan anda dahulu', 'Serahkan barang kemas dan wang tunai supaya sumpahan boleh dihapuskan', 'Tolak dengan sopan dan berjalan pergi — tiada siapa boleh menghapuskan sumpahan dengan mengambil barang berharga anda', 'Berikan barang kemas sahaja, simpan wang tunai'],
    explanation: 'Ini penipuan berkat klasik. Sebaik sahaja barang berharga anda meninggalkan tangan anda, ia hilang. Bantuan agama atau kerohanian sebenar tidak pernah memerlukan anda menyerahkan wang tunai atau barang kemas.',
  },
  'bls-02': {
    scenario: 'Seorang “bomoh kuil” menelefon dan berkata masalah kesihatan anda disebabkan oleh roh jahat. Dia menawarkan untuk menggandakan wang anda melalui upacara khas jika anda memindahkan dahulu simpanan anda kepadanya untuk “diberkati”.',
    options: ['Minta ahli keluarga memindahkan wang bagi pihak anda sebaliknya', 'Letakkan telefon — tiada upacara boleh menggandakan wang anda, ini penipuan', 'Pindahkan jumlah kecil dahulu untuk menguji sama ada ia benar-benar berganda', 'Jumpa dia secara peribadi dan bayar tunai supaya terasa lebih selamat'],
    explanation: 'Tiada upacara, berkat, atau bomoh boleh “menggandakan” wang anda. Sebarang permintaan menghantar wang untuk digandakan atau diberkati adalah penipuan — letakkan telefon dan jangan layan lagi.',
  },
  'bls-03': {
    scenario: 'Seorang yang berpakaian seperti sami datang ke rumah anda mengutip derma untuk kuil, dan selepas memuji kemurahan hati serta “nasib baik” anda, mendesak anda memberi jumlah yang jauh lebih besar daripada biasa untuk “selari dengan nasib baik anda”.',
    options: ['Berikan jumlah yang lebih besar kerana dia berkata anda bernasib baik', 'Berikan jumlah itu tetapi minta semula jika dia tidak dapat buktikan dia sami sebenar', 'Minta dia datang semula kemudian dengan buku resit sebelum membuat keputusan', 'Tolak dengan sopan tekanan tambahan itu dan hanya beri jumlah yang selesa untuk anda, atau tiada langsung, kepada badan amal berdaftar sebaliknya'],
    explanation: 'Organisasi agama sebenar tidak menekan orang untuk memberi derma lebih besar menggunakan pujian. Jika anda ingin menderma, buatlah kepada badan amal berdaftar yang telah anda sahkan sendiri.',
  },
  'bls-04': {
    scenario: 'Seorang asing di pasar menawarkan untuk membaca tapak tangan anda secara percuma, kemudian tiba-tiba kelihatan risau dan berkata satu bencana besar akan menimpa keluarga anda tidak lama lagi — melainkan anda membeli azimat pelindung khas daripadanya sekarang.',
    options: ['Beli azimat yang lebih murah untuk berjaga-jaga', 'Beli azimat itu segera untuk melindungi keluarga anda', 'Minta dia turunkan harga sebelum membeli', 'Berjalan pergi — ini taktik tekanan biasa, dan amaran sebenar tidak dijual sebagai azimat'],
    explanation: 'Ini taktik tekanan klasik: cipta ketakutan, kemudian jual “penyelesaian”. Tiada bacaan sebenar meramalkan bencana yang kebetulan boleh diselesaikan dengan membeli sesuatu di situ juga.',
  },
  'bls-05': {
    scenario: 'Di pusat penjaja, seorang wanita memberitahu anda dia dapat merasakan anak lelaki anda dalam bahaya serius, dan menawarkan untuk berdoa demi keselamatannya — tetapi berkata doa itu hanya berkesan jika anda membayarnya jumlah yang semakin meningkat setiap kali bertemu.',
    options: ['Sedar ini penipuan yang memanfaatkan kerisauan anda terhadap anak, dan berhenti membayar serta berjalan pergi', 'Minta dia membuktikannya dengan menelefon anak anda di situ juga', 'Terus membayar lebih setiap kali untuk melindungi anak anda', 'Bayar sekali lagi, kemudian berhenti jika tiada perubahan'],
    explanation: 'Penipu sering menyasarkan kasih sayang dan kerisauan ibu bapa terhadap anak-anak mereka. Doa atau berkat sebenar tidak pernah dijual dengan harga yang semakin meningkat — berjalan pergi.',
  },
  'bls-06': {
    scenario: 'Anda menerima panggilan telefon daripada seseorang yang mendakwa mewakili sebuah kuil, mengatakan nenek moyang anda “tidak gembira” dan menyebabkan nasib malang dalam keluarga anda, dan satu doa khas berkos sejumlah wang tertentu perlu dilakukan segera untuk membetulkannya.',
    options: ['Letakkan telefon — tiada kuil sah menelefon secara tiba-tiba menuntut wang untuk “membetulkan” ketidakgembiraan nenek moyang', 'Berunding untuk menurunkan harga sebelum membayar', 'Pindahkan wang segera supaya nenek moyang anda tidak membawa lebih nasib malang', 'Minta ahli keluarga sahkan terus dengan kuil dengan menelefon nombor yang diberikan'],
    explanation: 'Kuil sebenar tidak menelefon secara tiba-tiba menuntut wang untuk doa berkaitan nenek moyang. Jika risau, kunjungi atau telefon kuil yang anda sudah kenal dan percayai, menggunakan nombor yang anda cari sendiri.',
  },
  'bls-07': {
    scenario: 'Sekumpulan kecil orang melakukan upacara berkat di jalan dan menghulurkan angpau kepada anda, mengatakan anda mesti “membalas berkat” dengan derma. Anda memberi jumlah kecil, tetapi mereka mendesak pemindahan yang jauh lebih besar diperlukan supaya berkat itu “lengkap”.',
    options: ['Berikan sedikit lagi, tetapi tegas menolak apa-apa selebihnya', 'Pindahkan jumlah yang lebih besar supaya berkat itu tidak tergantung', 'Minta mereka menulis bagaimana wang itu akan digunakan sebelum membayar lagi', 'Berjalan pergi — berkat sebenar bukan urus niaga kewangan dengan tuntutan yang semakin meningkat'],
    explanation: 'Tuntutan yang semakin meningkat selepas bayaran kecil awal adalah corak penipuan jalanan yang biasa. Tiada apa yang dipanggil berkat “tidak lengkap” yang memerlukan lebih banyak wang — berjalan pergi.',
  },
  'bls-08': {
    scenario: 'Seorang yang mendakwa diri sebagai ahli feng shui menawarkan pemeriksaan rumah percuma, kemudian memberitahu anda ada roh jahat di rumah anda yang hanya boleh dihapuskan dengan membeli barang atau kristal mahal tertentu yang kebetulan dijualnya sendiri.',
    options: ['Beli barang yang disyorkannya untuk menghapuskan roh jahat', 'Tolak — rundingan feng shui sebenar tidak sepatutnya memerlukan pembelian barang mahal tertentu daripada perunding itu sendiri', 'Minta dia menghapuskan roh secara percuma kerana anda warga emas', 'Beli versi yang lebih murah bagi barang itu'],
    explanation: 'Berhati-hati apabila orang yang mendiagnosis masalah juga orang yang menjual penyelesaian mahalnya. Konflik kepentingan ini adalah cara biasa untuk menekan orang membeli barang yang tidak diperlukan.',
  },
  'bls-09': {
    scenario: 'Seorang pemanggil berkata nombor loteri anda “disumpah” dengan nasib malang dan menawarkan untuk membersihkannya melalui pertukaran upacara — anda menyerahkan wang tunai untuk “diberkati” dan mendapatnya kembali berganda, tetapi wang yang dikembalikan didapati palsu.',
    options: ['Lakukan, tetapi hanya dengan wang kertas lama yang tidak diperlukan', 'Tolak — tiada upacara boleh memberkati atau menggandakan wang, dan menyerahkan wang tunai sebenar untuk “pertukaran” berisiko kehilangannya sepenuhnya', 'Minta wang yang diberkati disemak oleh bank dahulu', 'Cuba sekali dengan jumlah kecil untuk menguji sama ada ia benar'],
    explanation: 'Helah pertukaran ini direka untuk menukar wang sebenar anda dengan wang palsu semasa “upacara”. Tiada berkat mengubah nilai wang — jangan sesekali serahkan wang tunai untuk pertukaran sebegini.',
  },
  'bls-10': {
    scenario: 'Seorang lelaki berpakaian seperti sami di pintu rumah anda menawarkan gelang azimat untuk “perlindungan” dan mendesak derma besar sebagai balasan, menjadi mendesak dan tidak selesa apabila anda cuba mengatakan anda tidak berminat.',
    options: ['Ambil gelang itu dan berjanji membayarnya lain kali', 'Tegas berkata tidak dan tutup pintu; hubungi jiran atau pengawal keselamatan jika dia tidak mahu pergi', 'Mengalah dan membayar supaya dia pergi', 'Tawarkan jumlah yang jauh lebih kecil untuk menamatkan perbualan'],
    explanation: 'Derma agama sebenar tidak pernah dipaksa. Sikap agresif atau mendesak apabila anda menolak adalah amaran itu sendiri — tegas dan dapatkan bantuan jika seseorang enggan pergi.',
  },
  'luv-01': {
    scenario: 'Anda telah berbual selama dua bulan dengan seseorang yang anda kenali dalam talian yang mendakwa dia jurutera yang bekerja di luar negara. Dia tidak pernah membuat panggilan video dengan anda, dan kini berkata dia memerlukan wang segera untuk “yuran kastam” bagi terbang ke Singapura menemui anda.',
    options: ['Hantar separuh jumlah untuk menunjukkan anda mempercayainya', 'Desak panggilan video secara langsung dahulu, dan enggan menghantar wang kepada seseorang yang anda tidak pernah benar-benar lihat atau temui', 'Hantar wang — dia sangat penyayang dalam perbualan anda', 'Minta dia menghantar gambar memegang surat khabar hari ini sebagai bukti'],
    explanation: 'Mengelak panggilan video dan meminta wang untuk “yuran” sebelum pernah bertemu adalah tanda penipuan cinta klasik. Pasangan sebenar tidak akan berulang kali mengelak panggilan video langsung atau meminta wang untuk “terbang ke sini”.',
  },
  'luv-02': {
    scenario: 'Pasangan baharu dalam talian anda memperkenalkan anda kepada seorang “rakan” yang bekerja di sebuah syarikat pelaburan, dan mencadangkan kamu berdua meletakkan wang dalam satu platform dagangan “bersama-sama” untuk membina masa depan.',
    options: ['Sedar ini kombinasi penipuan cinta dan pelaburan yang biasa, dan enggan melabur melalui sesiapa yang anda hanya kenali dalam talian', 'Sertai platform itu kerana pasangan anda mencadangkannya', 'Labur jumlah kecil sahaja untuk melihat niat hubungan itu', 'Minta pasangan anda melabur dahulu, kemudian anda ikut'],
    explanation: 'Pasangan dalam talian yang memperkenalkan “peluang pelaburan” adalah antara corak penipuan paling biasa di Singapura. Jangan sesekali melabur wang berdasarkan cadangan seseorang yang anda hanya kenali dalam talian.',
  },
  'luv-03': {
    scenario: 'Seseorang yang anda temui di aplikasi temu janji berkata dia pegawai tentera Amerika Syarikat yang ditempatkan di luar negara dan mahu menghantar bungkusan hadiah berharga kepada anda, tetapi anda diberitahu untuk membayar “yuran kelegaan kastam” dahulu sebelum ia boleh dihantar.',
    options: ['Minta dia mengurangkan yuran sebelum membayar', 'Bayar yuran kastam supaya hadiah boleh dihantar', 'Bayar separuh yuran dan lihat sama ada hadiah tiba', 'Enggan membayar — hadiah sebenar tidak memerlukan penerima membayar yuran kastam, dan ini skrip penipuan biasa'],
    explanation: 'Cerita “pegawai tentera menghantar hadiah yang memerlukan yuran kastam” adalah antara skrip penipuan cinta paling biasa. Tiada hadiah sebenar memerlukan anda membayar untuk menerimanya.',
  },
  'luv-04': {
    scenario: 'Pasangan dalam talian anda selama beberapa minggu tiba-tiba menghantar mesej bahawa mereka mengalami kemalangan dan segera memerlukan wang untuk pembedahan kecemasan di luar negara, mengatakan mereka tiada sesiapa lain untuk diminta bantuan dan akan membayar balik selepas pulih.',
    options: ['Hantar jumlah kecil dahulu sebagai tanda ikhlas', 'Minta rakan mereka (yang juga anda tidak pernah temui) sahkan sebelum menghantar', 'Hantar wang serta-merta kerana ia kecemasan perubatan', 'Berhati-hati — sahkan melalui panggilan video dan cara bebas lain sebelum menghantar wang kepada seseorang yang anda tidak pernah temui secara peribadi'],
    explanation: 'Kecemasan perubatan yang tiba-tiba adalah taktik tekanan biasa dalam penipuan cinta. Sahkan secara bebas — melalui panggilan video langsung, atau menghubungi hospital terus — sebelum menghantar sebarang wang.',
  },
  'luv-05': {
    scenario: 'Pasangan dalam talian anda berkata akaun bank mereka tidak berfungsi di negara mereka dan meminta anda membeli kad hadiah iTunes atau Google Play sebaliknya dan menghantar kod tersebut sebagai cara membantu mereka dengan wang.',
    options: ['Minta mereka menerangkan lebih lanjut tentang isu bank sebelum membuat keputusan', 'Beli kad hadiah dan hantar kod seperti diminta', 'Enggan — meminta bayaran dalam bentuk kod kad hadiah adalah bendera merah penipuan utama yang tidak pernah digunakan oleh orang sah', 'Hantar kad hadiah bernilai lebih rendah untuk lebih selamat'],
    explanation: 'Tiada urus niaga sah, sama ada berkaitan percintaan atau lain-lain, dilakukan melalui kod kad hadiah. Ini antara tanda penipuan paling jelas — enggan dan hentikan komunikasi.',
  },
  'luv-06': {
    scenario: 'Anda telah berbual selama beberapa bulan dengan seseorang dalam talian yang sentiasa mempunyai alasan mengapa mereka tidak dapat bertemu secara peribadi atau membuat panggilan video. Baru-baru ini, mereka mula meminta untuk “meminjam” wang bagi pelbagai kecemasan, berjanji akan membayar semula apabila kamu akhirnya bertemu.',
    options: ['Minta IOU bertulis sebelum meminjamkan lagi', 'Kenali alasan berulang untuk mengelak pertemuan sebagai bendera merah, dan berhenti menghantar wang', 'Terus memberi pinjaman wang kerana anda mempercayai mereka selepas berbulan-bulan berbual', 'Pinjamkan jumlah tetap yang kecil sahaja, dan berhenti selepas itu'],
    explanation: 'Masa yang dihabiskan berbual tidak membuktikan seseorang itu benar-benar seperti yang mereka dakwa. Berulang kali mengelak panggilan video atau pertemuan sambil meminta wang adalah antara corak penipuan cinta paling jelas.',
  },
  'luv-07': {
    scenario: 'Pasangan dalam talian anda berkata mereka menjalankan perniagaan import/eksport dan meminta anda menerima bayaran daripada “pelanggan” mereka ke dalam akaun bank anda, kemudian memindahkan wang itu kepada mereka, menawarkan anda yuran kecil sebagai balasan bantuan.',
    options: ['Setuju membantu kerana anda akan mendapat yuran kecil untuk bantuan itu', 'Buat sekali untuk melihat sama ada ia sah, kemudian putuskan', 'Enggan — ini boleh menjadikan anda “kurier wang” bagi dana yang ditipu atau diubah, yang merupakan jenayah walaupun anda tidak tahu', 'Minta butiran hubungan pelanggan dahulu sebelum bersetuju'],
    explanation: 'Membenarkan wang melalui akaun anda untuk orang lain boleh menjadikan anda bertanggungjawab dari segi undang-undang sebagai kurier wang, walaupun tanpa disedari. Jangan sesekali biarkan akaun bank anda digunakan sebegini.',
  },
  'luv-08': {
    scenario: 'Pasangan dalam talian anda menghantar gambar dirinya kelihatan berbaring di sesuatu yang seperti katil hospital, mengatakan mereka segera memerlukan wang dihantar hari ini untuk rawatan, dan akan menerangkan semuanya selepas pulih.',
    options: ['Hantar sebahagian jumlah dan minta selebihnya kemudian', 'Bersikap skeptikal — gambar boleh diambil dari mana-mana dalam talian, dan sahkan melalui panggilan video langsung sebelum menghantar apa-apa', 'Hantar wang segera berdasarkan bukti gambar itu', 'Minta nama hospital, kemudian hantar wang tanpa semakan lanjut'],
    explanation: 'Gambar semata-mata tidak membuktikan apa-apa — imej mudah disalin dari internet. Sentiasa sahkan secara bebas, sebaik-baiknya melalui panggilan video langsung, sebelum menghantar wang untuk kecemasan yang didakwa.',
  },
  'luv-09': {
    scenario: 'Seorang pasangan dalam talian yang anda berbual dengannya meminta anda berkongsi gambar peribadi, kemudian selepas itu mengugut untuk menghantarnya kepada keluarga dan rakan anda melainkan anda membayar sejumlah besar wang.',
    options: ['Cuba berunding untuk jumlah yang lebih rendah', 'Bayar wang itu untuk menghalang mereka daripada berkongsi gambar', 'Padam akaun anda dan berharap mereka hilang minat', 'Jangan bayar — hubungi polis, kerana ini jenayah, dan pembayaran selalunya tidak menghentikan tuntutan selanjutnya'],
    explanation: 'Membayar jarang menamatkan sekstortion — ia sering membawa kepada tuntutan berulang. Hentikan semua hubungan, simpan bukti mesej, dan laporkan kepada polis dengan segera.',
  },
  'luv-10': {
    scenario: 'Seorang pasangan dalam talian mendakwa dia balu atau duda dengan seorang anak kecil di luar negara, dan berkata anak itu mengalami kecemasan perubatan, meminta anda segera menghantar wang kerana mereka tidak dapat mengakses dana mereka sendiri sekarang.',
    options: ['Kenali daya tarikan emosi yang melibatkan “anak dalam bahaya” sebagai taktik penipuan biasa, dan sahkan secara bebas sebelum menghantar apa-apa', 'Hantar jumlah kecil sebagai tanda muhibah', 'Hantar wang segera untuk membantu anak itu', 'Minta gambar anak itu sebelum membuat keputusan'],
    explanation: 'Penipu sering mereka-reka seorang kanak-kanak yang terdedah untuk mencipta rasa segera dan bersalah. Walau bagaimanapun sedih kedengaran cerita itu, sahkan secara bebas — melalui panggilan video atau sumber dipercayai lain — sebelum menghantar wang.',
  },
  'inv-01': {
    scenario: 'Seorang bekas rakan sekolah menambah anda ke dalam kumpulan WhatsApp di mana ahli berkongsi tangkapan skrin keuntungan besar daripada platform mata wang kripto, dan menggalakkan semua orang “menyertai awal” dengan pulangan bulanan dijamin 20%.',
    options: ['Minta pentadbir kumpulan untuk lebih bukti, kemudian labur jumlah yang disyorkan', 'Berhati-hati — pulangan tinggi yang dijamin tanpa risiko adalah bendera merah utama, walaupun disyorkan oleh rakan', 'Sertai serta-merta — bekas rakan sekolah anda tidak akan menipu anda', 'Labur jumlah “ujian” kecil untuk melihat sama ada tangkapan skrin keuntungan itu benar'],
    explanation: 'Tiada pelaburan sah boleh menjamin pulangan bulanan tinggi tanpa risiko. Penipu sering menggunakan WhatsApp atau media sosial kenalan dipercayai untuk menjadikan skim itu kelihatan boleh dipercayai — sahkan dengan MAS sebelum melabur.',
  },
  'inv-02': {
    scenario: 'Anda melihat iklan Facebook menampilkan seorang tokoh TV tempatan terkenal “menyokong” aplikasi pelaburan yang menjanjikan menukar $500 kepada $5,000 dalam sebulan. Aplikasi itu meminta anda menambah lagi dana sebelum anda boleh mengeluarkan “keuntungan” anda.',
    options: ['Tambah lagi dana kerana keuntungan anda sudah ditunjukkan dalam aplikasi', 'Minta khidmat pelanggan aplikasi membuktikan ia sah', 'Keluarkan sedikit dahulu, kemudian tambah dana jika berjaya', 'Kenali sokongan selebriti palsu dan permintaan “bayar untuk keluarkan” sebagai tanda penipuan, dan berhenti serta-merta'],
    explanation: 'Sokongan selebriti palsu dan aplikasi yang meminta anda “tambah dana” sebelum boleh mengeluarkan keuntungan anda sendiri adalah tanda utama penipuan pelaburan. Semak Direktori Institusi Kewangan MAS sebelum melabur di mana-mana.',
  },
  'inv-03': {
    scenario: 'Seorang pempengaruh Instagram mempromosikan platform dagangan forex tanpa lesen, menunjukkan tangkapan skrin keuntungan harian yang besar dan berkata sesiapa sahaja boleh menyertai dengan jumlah permulaan kecil dan pulangan “dijamin”.',
    options: ['Semak sama ada platform itu dilesenkan oleh MAS sebelum mempertimbangkannya, dan berhati-hati dengan pulangan “dijamin”, yang tidak wujud dalam dagangan sebenar', 'Minta pempengaruh itu untuk lebih bukti sebelum menyertai', 'Mula dengan jumlah paling kecil sekadar mencuba', 'Sertai kerana pempengaruh itu kelihatan boleh dipercayai dan berjaya'],
    explanation: 'Tiada platform dagangan boleh menjamin keuntungan — pasaran naik dan turun. Sentiasa semak Direktori Institusi Kewangan MAS sebelum melabur, tidak kira siapa yang mempromosikannya.',
  },
  'inv-04': {
    scenario: 'Anda menerima panggilan daripada seseorang yang mendakwa penasihat kewangan, menawarkan peluang eksklusif “pra-IPO” untuk melabur dalam sebuah syarikat sebelum ia disenaraikan awam, menjanjikan saham akan meningkat nilai dengan cepat.',
    options: ['Berhati-hati dengan panggilan pelaburan tanpa diminta dan sahkan lesen penasihat serta dakwaan syarikat itu secara bebas sebelum melabur', 'Minta rakan yang juga melabur untuk sahkan ia benar', 'Labur jumlah “percubaan” kecil untuk menguji peluang itu', 'Labur segera sebelum “peluang” itu tamat'],
    explanation: 'Peluang pelaburan sebenar jarang ditawarkan melalui panggilan tanpa diminta yang mencipta rasa segera. Sahkan penasihat itu dilesenkan dengan MAS dan siasat syarikat itu secara bebas sebelum melabur apa-apa.',
  },
  'inv-05': {
    scenario: 'Seorang rakan memperkenalkan anda kepada skim pelaburan di mana pelabur awal dibayar pulangan menarik daripada wang yang dibawa masuk oleh pelabur baharu, dan anda digalakkan merekrut keluarga dan rakan untuk turut menyertai.',
    options: ['Sertai dan rekrut orang lain kerana rakan anda sudah mendapat keuntungan daripadanya', 'Sertai tetapi jangan rekrut sesiapa lagi', 'Labur hanya jumlah yang rakan anda telah perolehi semula', 'Kenali ini sebagai skim gaya Ponzi yang runtuh apabila pelabur baharu berhenti menyertai, dan elakkannya'],
    explanation: 'Skim yang membayar pelabur lama menggunakan wang pelabur baharu tidak lestari dan pasti runtuh akhirnya, meninggalkan pelabur terbaharu menanggung kerugian. Struktur ini menyalahi undang-undang di Singapura.',
  },
  'inv-06': {
    scenario: 'Seorang pemanggil mendakwa terdapat skim kerajaan khas berkaitan SkillsFuture atau CPF yang boleh menggandakan simpanan CPF anda jika dipindahkan ke akaun peribadi “untuk pemprosesan”, berkata tawaran itu hanya tersedia untuk masa terhad.',
    options: ['Letakkan telefon — CPF dan skim kerajaan tidak pernah meminta anda memindahkan simpanan ke akaun peribadi untuk “menggandakannya”', 'Pindahkan simpanan CPF anda dengan cepat sebelum tawaran tamat', 'Minta dokumen rasmi melalui e-mel sebelum memindahkan', 'Pindahkan sebahagian dahulu untuk menguji sama ada ia berfungsi'],
    explanation: 'Tiada skim kerajaan sah yang menggandakan simpanan CPF anda melalui pemindahan peribadi. Ini penipuan penyamaran-pelaburan — sahkan hanya melalui laman web atau talian rasmi CPF.',
  },
  'inv-07': {
    scenario: 'Anda melihat poster di sekitar kejiranan anda dengan kod QR, menjanjikan pulangan tinggi tetap jika anda mengimbas dan melabur dalam “dana komuniti” yang mendakwa menyokong perniagaan tempatan.',
    options: ['Tanya jiran sama ada mereka telah melabur sebelum membuat keputusan', 'Berhati-hati dengan tawaran pelaburan yang diiklankan melalui poster jalanan, dan semak sama ada “dana” itu dilesenkan oleh MAS sebelum berbuat apa-apa', 'Labur jumlah kecil untuk menyokong komuniti tanpa mengira pulangan', 'Imbas kod QR dan labur kerana ia untuk komuniti tempatan'],
    explanation: 'Dana pelaburan sah tidak diiklankan melalui poster jalanan dengan kod QR. Sentiasa sahkan sebarang peluang pelaburan dilesenkan oleh MAS sebelum mengimbas atau memindahkan wang.',
  },
  'inv-08': {
    scenario: 'Seorang kenalan dalam talian yang anda tidak pernah temui secara peribadi menawarkan tawaran hebat untuk pelaburan hartanah luar negara, mengatakan anda perlu memindahkan deposit dengan cepat sebelum harga meningkat, tanpa pilihan untuk melihat hartanah itu sendiri dahulu.',
    options: ['Pindahkan deposit dengan cepat untuk mengunci harga baik itu', 'Pindahkan separuh deposit dahulu, kemudian putuskan bakinya', 'Berhati-hati dengan tekanan untuk membayar cepat bagi hartanah yang tidak boleh anda periksa, dan sahkan ejen serta hartanah secara bebas', 'Minta lebih gambar hartanah sebelum memindahkan wang'],
    explanation: 'Tekanan untuk membayar cepat bagi sesuatu yang tidak boleh anda sahkan secara peribadi adalah taktik penipuan biasa. Sentiasa sahkan lesen ejen dan kewujudan hartanah secara bebas sebelum memindahkan sebarang deposit.',
  },
  'inv-09': {
    scenario: 'Di satu aktiviti pusat komuniti, seseorang menawarkan untuk membantu anda melabur dalam emas, menjanjikan belian semula dijamin pada harga lebih tinggi selepas beberapa bulan, dan meminta anda menyerahkan wang tunai terus kepadanya dan bukan melalui mana-mana syarikat.',
    options: ['Minta IOU bertulis tangan sebelum menyerahkan wang tunai', 'Serahkan wang tunai kerana dia kelihatan mesra dan ia tawaran dijamin', 'Berikan jumlah lebih kecil untuk menguji sama ada belian semula benar-benar berlaku', 'Tolak — pelaburan emas sebenar dilakukan melalui peniaga berlesen dengan resit yang betul, bukan menyerahkan wang tunai kepada individu'],
    explanation: 'Sebarang pelaburan yang melibatkan penyerahan wang tunai terus kepada individu, tanpa syarikat berlesen atau resit yang betul, adalah berisiko tinggi. Hanya labur dalam emas melalui peniaga yang diiktiraf dan berlesen.',
  },
  'inv-10': {
    scenario: 'Seorang jurujual dari rumah ke rumah menawarkan pelan insurans yang turut berfungsi sebagai pelaburan, menjanjikan pulangan dijamin yang luar biasa tinggi, dan menekan anda untuk menandatangani serta membayar premium pertama di tempat kejadian tanpa meninggalkan sebarang dokumen untuk disemak.',
    options: ['Tandatangan dan bayar di tempat kejadian kerana pulangan kedengaran menarik', 'Bayar premium pertama yang lebih kecil untuk menguji pelan itu', 'Tandatangan tetapi bayar hanya selepas kunjungannya yang seterusnya', 'Tolak menandatangani apa-apa di tempat kejadian; minta dokumen untuk disemak dan semak sama ada ejen serta produk berdaftar dengan MAS'],
    explanation: 'Ditekan untuk menandatangani dan membayar serta-merta tanpa masa menyemak dokumen adalah amaran besar. Ejen sah berdaftar dengan MAS dan sentiasa membenarkan anda menyemak polisi sebelum komited.',
  },
  'ecm-01': {
    scenario: 'Anda menjumpai penggoreng udara baharu di Carousell dengan harga separuh daripada biasa. Penjual belum mempunyai ulasan dan meminta anda PayNow jumlah penuh ke nombor telefon bimbit peribadi sebelum penghantaran, tanpa pilihan bayar semasa penghantaran.',
    options: ['Minta penjual menurunkan harga lagi sebelum membayar', 'Bayar separuh dahulu, separuh selepas penghantaran, tanpa menyemak penjual lebih lanjut', 'Berhati-hati dengan penjual tanpa ulasan yang hanya menerima PayNow pendahuluan tanpa perlindungan pembeli, dan pertimbangkan platform dengan penghantaran-bayar atau escrow sebaliknya', 'Bayar penuh melalui PayNow kerana harganya sangat baik'],
    explanation: 'Diskaun besar, tiada ulasan, dan mendesak PayNow pendahuluan ke nombor peribadi adalah tanda penipuan e-dagang biasa. Utamakan platform dengan perlindungan pembeli dan berhati-hati dengan penjual yang mengelak pilihan bayar-semasa-hantar.',
  },
  'ecm-02': {
    scenario: 'Iklan Facebook menunjukkan jenama elektronik terkenal mengadakan “jualan pelupusan gudang” 80% diskaun, memaut ke laman yang kelihatan sedikit berbeza daripada laman web sebenar jenama itu dan hanya menerima pindahan bank.',
    options: ['Semak alamat web dengan teliti berbanding laman rasmi jenama itu, dan elak membayar melalui pindahan bank ke laman yang tidak dikenali', 'Pindahkan deposit kecil dahulu untuk menguji sama ada barang tiba', 'Beli cepat sebelum “jualan” tamat', 'Kongsi pautan dengan rakan supaya mereka juga boleh membeli, kemudian putuskan'],
    explanation: 'Iklan “jualan pelupusan” palsu dengan alamat web serupa dan pembayaran pindahan-bank-sahaja adalah penipuan e-dagang biasa. Sentiasa semak URL dengan teliti dan utamakan kaedah pembayaran selamat dengan perlindungan pembeli.',
  },
  'ecm-03': {
    scenario: 'Anda menerima SMS mengatakan bungkusan tidak dapat dihantar dan yuran penghantaran semula kecil diperlukan, dengan pautan untuk membayar. Halaman berpaut itu meminta nombor kad penuh, tarikh luput, dan CVC anda untuk memproses “yuran” itu.',
    options: ['Balas SMS bertanya sama ada ia sah dahulu', 'Bayar menggunakan kad lain untuk berjaga-jaga', 'Jangan klik pautan itu — semak terus dengan aplikasi atau laman web rasmi syarikat penghantaran sebaliknya, kerana notis penghantaran semula sebenar tidak meminta butiran kad penuh sebegini', 'Masukkan butiran kad anda untuk membayar yuran kecil dan dapatkan bungkusan anda'],
    explanation: 'Yuran penghantaran semula sah, jika ada, dibayar melalui aplikasi atau laman web rasmi syarikat penghantaran — tidak pernah dengan memasukkan butiran kad penuh melalui pautan dalam mesej teks.',
  },
  'ecm-04': {
    scenario: 'Dalam kumpulan jual-beli Facebook, seorang penjual meminta bayaran penuh melalui PayNow sebelum menghantar barang popular. Selepas anda membayar, penjual berhenti membalas mesej dan anda tidak lagi dapat menemui profil mereka.',
    options: ['Laporkan penjual dan transaksi itu kepada platform serta polis — dan pada masa hadapan, utamakan penjual dengan ulasan serta platform dengan perlindungan pembeli', 'Cuba bayar sedikit lagi untuk “buka sekatan” perbualan', 'Hantar mesej dalam kumpulan itu dan tunggu penjual melihatnya', 'Terus menghantar mesej dan berharap mereka akhirnya membalas'],
    explanation: 'Sebaik sahaja penipu hilang selepas pembayaran, menghantar mesej tidak akan membantu. Laporkan dengan segera, dan pada masa hadapan utamakan pasaran dengan perlindungan pembeli berbanding pindahan PayNow terus kepada penjual yang tidak dikenali.',
  },
  'ecm-05': {
    scenario: 'Sebuah farmasi dalam talian mengiklankan suplemen kesihatan pada harga sangat rendah, memerlukan bayaran penuh pendahuluan. Selepas membayar, tiada cara menghubungi penjual untuk kemas kini, dan barang sama ada tidak pernah tiba atau kelihatan berbeza daripada yang diiklankan.',
    options: ['Pesan jumlah kecil dahulu walaupun tanpa sebarang semakan', 'Bayar melalui pindahan bank pada masa akan datang kerana mungkin lebih dipercayai', 'Semak pendaftaran perniagaan yang betul, ulasan, dan butiran hubungan sebelum membeli daripada penjual produk kesihatan dalam talian yang tidak dikenali', 'Terus menunggu kerana harga yang sangat baik pasti tulen'],
    explanation: 'Harga yang luar biasa rendah tanpa butiran hubungan atau pendaftaran yang boleh disahkan adalah tanda biasa kedai dalam talian palsu. Terutamanya untuk produk kesihatan, hanya beli daripada penjual yang disahkan dan berlesen.',
  },
  'ecm-06': {
    scenario: 'Di gerai sementara di pasar, anda mengimbas kod QR untuk membayar pembelian anda. Tanpa disedari, seseorang telah menampal pelekat kod QR palsu ke atas kod sebenar gerai itu, menghantar pembayaran anda kepada penipu dan bukan pemilik gerai.',
    options: ['Bayar tunai sebaliknya setiap kali untuk mengelakkan ini sepenuhnya', 'Imbas semula dengan aplikasi berbeza untuk lebih selamat', 'Sebelum mengimbas, semak kod QR itu sepadan dengan nama pemilik gerai pada skrin aplikasi pembayaran, dan tanya pemilik gerai jika tidak pasti', 'Anggap ia okey kerana anda mengimbas kod yang ditunjukkan di gerai'],
    explanation: 'Sentiasa semak nama yang ditunjukkan pada aplikasi pembayaran anda sepadan dengan pemilik gerai sebelum mengesahkan pembayaran. Pertukaran kod QR adalah penipuan sebenar dan semakin biasa di gerai fizikal.',
  },
  'ecm-07': {
    scenario: 'Seorang pembeli di pasaran dalam talian menawarkan untuk “bertemu di tengah jalan” bagi barang bernilai tinggi, tetapi mendesak memindahkan bayaran penuh dahulu melalui aplikasi pembayaran yang tidak dapat dikesan sebelum bersetuju masa atau tempat pertemuan.',
    options: ['Terima bayaran dahulu kerana ia menjimatkan masa bertemu serta-merta', 'Berhati-hati dengan permintaan bayaran-dahulu melalui aplikasi tidak dapat dikesan, dan utamakan bertemu di tempat awam yang selamat dengan bayaran semasa penyerahan sebaliknya', 'Minta deposit lebih kecil dahulu melalui aplikasi yang sama', 'Terima tetapi minta mereka menghantar tangkapan skrin bayaran dahulu'],
    explanation: 'Mendesak bayaran tidak dapat dikesan sebelum sebarang pertemuan diatur adalah persediaan penipuan biasa. Utamakan pertemuan awam yang selamat di mana bayaran berlaku semasa penyerahan.',
  },
  'ecm-08': {
    scenario: 'Satu iklan pekerjaan menawarkan kerja pembungkusan sambilan mudah dari rumah dengan gaji baik, tetapi meminta anda membayar dahulu yuran “pendaftaran” atau “deposit” untuk menerima kit permulaan dan dimasukkan ke dalam senarai gaji.',
    options: ['Bayar yuran itu kerana gaji yang ditawarkan menarik', 'Bayar deposit lebih kecil dan lihat sama ada pekerjaan itu benar', 'Berhati-hati — majikan sah tidak meminta pekerja membayar yuran pendahuluan untuk mula bekerja, dan ini penipuan pekerjaan biasa', 'Minta yuran itu ditolak daripada gaji pertama sebaliknya'],
    explanation: 'Majikan sebenar tidak pernah meminta pekerja baharu membayar wang pendahuluan untuk mula bekerja. Sebarang tawaran pekerjaan yang memerlukan yuran atau deposit awal harus dianggap kemungkinan penipuan.',
  },
  'ecm-09': {
    scenario: 'Anda menemui laman web kedai elektronik yang kelihatan profesional dengan harga baik, lencana keselamatan, dan ulasan pelanggan. Selepas membayar, barang tidak pernah tiba, khidmat pelanggan senyap, dan akhirnya seluruh laman web hilang.',
    options: ['Semak ulasan bebas di luar laman itu sendiri, dan gunakan kaedah pembayaran selamat dengan perlindungan pembeli semasa membeli daripada laman web yang tidak dikenali', 'Bayar melalui pindahan bank pada masa akan datang untuk pemprosesan lebih cepat', 'Cuba membuat pesanan sekali lagi daripada laman yang sama untuk melihat sama ada berjaya kali ini', 'Terus menunggu, kerana laman web itu kelihatan profesional dan boleh dipercayai'],
    explanation: 'Laman web yang kelihatan profesional tidak menjamin kesahihan — laman penipuan boleh menyalin lencana amanah dan ulasan palsu. Cari ulasan bebas dan gunakan kaedah pembayaran yang menawarkan perlindungan pembeli.',
  },
  'ecm-10': {
    scenario: 'Anda menjual barang dalam talian dan seorang “pembeli” menghantar tangkapan skrin pembayaran menunjukkan mereka telah membayar lebih, kemudian segera meminta anda membayar balik lebihan itu ke akaun lain sebelum anda menyemak sama ada bayaran itu benar-benar tiba dalam akaun anda sendiri.',
    options: ['Bayar balik separuh jumlah sebagai jalan tengah', 'Semak akaun bank atau aplikasi anda sendiri untuk mengesahkan wang itu benar-benar tiba sebelum membayar balik apa-apa', 'Bayar balik lebihan itu dengan cepat kerana mereka sudah menghantar bukti pembayaran', 'Minta mereka menghantar tangkapan skrin yang lebih jelas sebelum membayar balik'],
    explanation: 'Tangkapan skrin boleh dipalsukan. Sentiasa sahkan wang itu benar-benar telah masuk ke akaun anda sendiri sebelum membayar balik apa-apa — helah bayaran-lebih ini adalah penipuan biasa yang menyasarkan penjual dalam talian.',
  },
};

export const ta = {
  'imp-01': {
    scenario: 'ஒரு அழைப்பாளர் தான் ஒரு போலீஸ் அதிகாரி என்றும், “பணமோசடி” வழக்கில் தொடர்புடைய உங்கள் வங்கிக் கணக்கை விசாரிக்கிறேன் என்றும் கூறுகிறார். விசாரணை தொடரும் வரை உங்கள் சேமிப்பை ஒரு “பாதுகாப்பான கணக்கிற்கு” மாற்றுமாறு கேட்கிறார்.',
    options: ['முதலில் அழைப்பாளரிடம் பேட்ஜ் நம்பரைக் கேட்டு, கொடுத்தபின் பணத்தை மாற்றுவது', 'போலீஸார் ஏற்கனவே விசாரணை செய்கிறார்கள் என்பதால், விரைவாக பணத்தை மாற்றுவது', 'தொலைபேசியை துண்டித்துவிட்டு, 1800-255-0000 போலீஸ் ஹாட்லைனை நேரடியாக அழைத்து உறுதிப்படுத்திக் கொள்வது', 'பணத்தை ரொக்கமாக எடுத்து, யாரேனும் வந்து எடுத்துச் செல்லக் காத்திருப்பது'],
    explanation: 'நிஜ போலீஸார் ஒருபோதும் உங்களை “பாதுகாப்பான கணக்கிற்கு” பணத்தை மாற்றச் சொல்ல மாட்டார்கள், அல்லது அந்நியருக்கு பணத்தை ஒப்படைக்கச் சொல்ல மாட்டார்கள். தொலைபேசியை துண்டித்து, நீங்களே போலீஸ் ஹாட்லைனை அழைத்து உறுதிப்படுத்திக் கொள்ளுங்கள்.',
  },
  'imp-02': {
    scenario: 'உங்கள் “பேரன்” ஒரு புதிய நம்பரிலிருந்து WhatsApp இல் செய்தி அனுப்பி, தன் தொலைபேசி தொலைந்துவிட்டது என்றும், உடனடியாக $2,000-ஐ ஒரு நண்பரின் கணக்கிற்கு அனுப்ப வேண்டும் என்றும், பின்னர் உங்களை திரும்ப அழைப்பதாகவும் கூறுகிறார்.',
    options: ['பேரனின் பழைய நம்பருக்கு அழைத்து, அல்லது வேறு குடும்ப உறுப்பினரிடம் கேட்டு, இது உண்மையில் அவரா என்று உறுதிப்படுத்துவது', 'அவரது அடையாள அட்டையின் (NRIC) புகைப்படத்தை WhatsApp வழியாக அனுப்பச் சொல்வது', 'அவசரமாகத் தோன்றுவதால் உடனடியாக பணத்தை அனுப்புவது', '“நிச்சயமா?” என்று WhatsApp இல் கேட்டு, ஆம் என்றால் பணம் அனுப்புவது'],
    explanation: 'மோசடி செய்பவர்கள் பெரும்பாலும் புதிய நம்பரிலிருந்து செய்தி அனுப்பி, அவசரத் தேவையில் உள்ள உறவினர் போல் நடிக்கிறார்கள். எதையும் அனுப்பும் முன், அறியப்பட்ட நம்பரில் குடும்ப உறுப்பினரை நேரடியாக அழைத்து உறுதிப்படுத்திக் கொள்ளுங்கள்.',
  },
  'imp-03': {
    scenario: 'ஒரு அழைப்பாளர் தான் SingPost சுங்க அதிகாரி என்று கூறி, உங்கள் பெயரில் வந்த ஒரு பார்சலில் தடைசெய்யப்பட்ட பொருட்கள் உள்ளன என்றும், அபராதம் செலுத்த வேண்டும் என்றும் கூறுகிறார். கைது தவிர்க்க, ஒரு வசதிக் கடையிலிருந்து பரிசு அட்டைகள் (gift cards) வாங்கி உடனடியாக பணம் செலுத்தச் சொல்கிறார்.',
    options: ['பாதி தொகையை பரிசு அட்டையில் செலுத்தி, மீதிக்கு கால அவகாசம் கேட்பது', 'முதலில் வழக்கு எண்ணைக் கேட்டு, பின்னர் பரிசு அட்டைகளை வாங்குவது', 'பரிசு அட்டைகளை வாங்கி, அதன் குறியீட்டை (code) தொலைபேசியில் படித்துக் காட்டுவது', 'தொலைபேசியை துண்டிப்பது — SingPost மற்றும் சுங்கத்துறை ஒருபோதும் பரிசு அட்டைகள் மூலம் அபராதம் வசூலிக்காது, இது ஒரு மோசடி'],
    explanation: 'எந்த அரசு நிறுவனமும் அல்லது கூரியர் நிறுவனமும் பரிசு அட்டைகள் மூலம் பணம் செலுத்தச் சொல்லாது. இது மிகவும் பொதுவான போலி அடையாள மோசடி உத்தி — தொலைபேசியை துண்டித்து, இதுபோன்ற கோரிக்கைகளை புறக்கணியுங்கள்.',
  },
  'imp-04': {
    scenario: 'உங்கள் வங்கியிலிருந்து வந்ததைப் போன்ற ஒரு SMS உங்களுக்கு வருகிறது, உங்கள் கணக்கில் அசாதாரண செயல்பாடு கண்டறியப்பட்டதாகவும், உடனடியாக ஒரு இணைப்பைக் கிளிக் செய்து உங்கள் விவரங்களை உறுதிப்படுத்தாவிட்டால் கணக்கு முடக்கப்படும் எனவும் எச்சரிக்கிறது.',
    options: ['இது போன்ற SMS வேறு யாருக்காவது வந்ததா என்று நண்பரிடம் கேட்டு, பின் முடிவெடுப்பது', 'SMS-ஐ நீக்கிவிட்டு, நீங்களே தட்டச்சு செய்த முகவரி மூலம் மட்டுமே வங்கியின் அதிகாரப்பூர்வ ஆப் அல்லது வலைத்தளத்தில் உள்நுழைவது', 'இது உண்மையா என்று SMS-க்கு பதிலளிப்பது', 'இணைப்பைக் கிளிக் செய்து, உண்மையா என்று உள்நுழைந்து பார்ப்பது'],
    explanation: 'வங்கிகள் SMS-இல் உள்ள இணைப்பு மூலம் உங்கள் கணக்கை உறுதிப்படுத்தச் சொல்லாது. எதிர்பாராத செய்திகளில் உள்ள இணைப்புகளை ஒருபோதும் கிளிக் செய்யாதீர்கள் — அதிகாரப்பூர்வ ஆப் அல்லது வலைத்தளத்திற்கு நேரடியாகச் செல்லுங்கள்.',
  },
  'imp-05': {
    scenario: 'IRAS-இலிருந்து வந்ததாகக் கூறும் ஒரு அழைப்பாளர், உங்களிடம் செலுத்தப்படாத வரி உள்ளது என்றும், கைது வாரண்ட் பிறப்பிக்கப்பட்டுள்ளது என்றும் கூறுகிறார். அவர் தரும் வங்கிக் கணக்கிற்கு உடனடியாக தொகையை அனுப்பினால், இன்றே கைது தவிர்க்கலாம் என்கிறார்.',
    options: ['கைது செய்யப்படுவதைத் தவிர்க்க உடனடியாக பணத்தை அனுப்புவது', 'தொலைபேசியிலேயே குறைந்த தொகைக்கு பேரம் பேசி, பின் செலுத்துவது', 'நேரடியாக ஈடுபடாமல் இருக்க, குடும்ப உறுப்பினரைப் பணத்தை அனுப்பச் சொல்வது', 'தொலைபேசியை துண்டித்து, அதிகாரப்பூர்வ IRAS வலைத்தளம் அல்லது ஹாட்லைன் மூலம் உங்கள் வரி நிலையை நீங்களே சரிபார்ப்பது'],
    explanation: 'கைது தவிர்க்க உடனடியாக பணம் செலுத்தச் சொல்லி IRAS தொலைபேசியில் அழைக்காது. அரசு நிறுவனங்கள் அதிகாரப்பூர்வ கடிதங்கள் மூலமே தொடர்பு கொள்கின்றன, அவசர தொலைபேசி மிரட்டல் மூலமல்ல — எதையும் செய்யும் முன் சுயமாக உறுதிப்படுத்திக் கொள்ளுங்கள்.',
  },
  'imp-06': {
    scenario: 'உங்கள் மொபைல் நெட்வொர்க் நிறுவனத்திலிருந்து அழைப்பதாகக் கூறும் ஒருவர், உங்கள் SIM கார்டு பாதிக்கப்பட்டுள்ளது என்றும், ஹேக்கர்கள் உங்கள் வங்கிக் கணக்குகளை அணுகலாம் என்றும் கூறுகிறார். உங்கள் தொலைபேசிக்கு இப்போது வந்த ஒரு முறை கடவுச்சொல்லை (OTP) படித்துக் கூறச் சொல்கிறார், அதனால் உங்கள் இணைப்பை “பாதுகாக்க” முடியும் என்கிறார்.',
    options: ['ஹேக்கர்கள் நுழையும் முன் அவர் சரி செய்யும்படி, விரைவாக OTP-ஐ படித்துக் கூறுவது', 'அவரது ஊழியர் எண்ணை உறுதிப்படுத்தச் சொல்லிவிட்டு, பின் OTP-ஐ பகிர்வது', 'OTP-ஐ பகிர மறுத்து தொலைபேசியை துண்டிப்பது — தொலைத்தொடர்பு நிறுவனங்கள் ஒருபோதும் உங்கள் OTP-ஐ கேட்காது', 'அவரை பின்னர் திரும்ப அழைக்கச் சொல்லி, அப்போது OTP-ஐ கொடுப்பது'],
    explanation: 'OTP உங்களுக்கு மட்டுமே. எந்த தொலைத்தொடர்பு நிறுவன அல்லது வங்கி ஊழியரும் தொலைபேசியில் அதைப் படித்துச் சொல்லச் சொல்ல மாட்டார் — அவ்வாறு செய்தால், மோசடி செய்பவர் நேரடியாக உங்கள் கணக்கிற்குள் நுழைந்துவிடுவார்.',
  },
  'imp-07': {
    scenario: 'CPF வாரியத்திலிருந்து அழைப்பதாகக் கூறும் ஒருவர், உங்கள் CPF கணக்கு பணமோசடி வழக்குடன் தொடர்புடையது என்று கூறி, உறுதிப்படுத்தி பாதுகாக்க உங்கள் CPF சேமிப்பை ஒரு “கண்காணிப்பு கணக்கிற்கு” மாற்றச் சொல்கிறார்.',
    options: ['அவர் தரும் கணக்கிற்கு உங்கள் CPF சேமிப்பை மாற்றுவது', 'பாதுகாப்பானதா என்று சோதிக்க முதலில் ஒரு சிறிய தொகையை மாற்றுவது', 'தொலைபேசியை துண்டிப்பது — CPF வாரியம் ஒருபோதும் உங்கள் CPF கணக்கிலிருந்து பணத்தை தொலைபேசியில் மாற்றச் சொல்லாது', 'முதலில் அவரிடம் மின்னஞ்சல் மூலம் அறிவுறுத்தல் கேட்டு, பின் மாற்றுவது'],
    explanation: 'CPF வாரியம் உங்கள் CPF சேமிப்பை வேறு இடத்திற்கு மாற்றச் சொல்லி ஒருபோதும் தொலைபேசியில் அழைக்காது. இது ஒரு போலி அடையாள மோசடி — தொலைபேசியை துண்டித்து, CPF-இன் அதிகாரப்பூர்வ ஹாட்லைனை அழைத்து உறுதிப்படுத்திக் கொள்ளுங்கள்.',
  },
  'imp-08': {
    scenario: 'உங்கள் பேரன் வெளிநாட்டில் குடியேற்ற அதிகாரிகளால் தடுத்து வைக்கப்பட்டுள்ளார் என்றும், வழக்கறிஞர் மற்றும் ஜாமீன் கட்டணத்திற்காக உடனடியாக பணம் அனுப்ப வேண்டும் என்றும், இதை குடும்பத்தில் யாருக்கும் சொல்லக்கூடாது, இல்லையெனில் “வழக்கு சிக்கலாகிவிடும்” என்றும் கூறி ஒரு அழைப்பு வருகிறது.',
    options: ['தொலைபேசியை துண்டித்து, உண்மையா என்று உறுதிப்படுத்த பேரனை நேரடியாக அல்லது வேறு குடும்ப உறுப்பினரை தொடர்பு கொள்வது', 'முடிவெடுக்கும் முன் அதிகாரப்பூர்வ தடுப்பு கடிதத்தை மின்னஞ்சல் மூலம் அனுப்பச் சொல்வது', 'நேரத்தைப் பெற முதலில் ஒரு சிறிய தொகையை அனுப்புவது', 'கூறியபடி விரைவாக பணத்தை அனுப்பி, இதை ரகசியமாக வைத்திருப்பது'],
    explanation: 'குடும்பத்திடம் ரகசியமாக வைக்கச் சொல்வது ஒரு பெரிய எச்சரிக்கை அறிகுறி — யாரும் கதையை சரிபார்க்க முடியாதபடி மோசடி செய்பவர்கள் உங்களை தனிமைப்படுத்துகிறார்கள். எப்போதும் முதலில் நேரடியாக குடும்பத்துடன் உறுதிப்படுத்திக் கொள்ளுங்கள்.',
  },
  'imp-09': {
    scenario: 'வெளிநாட்டு வழக்கறிஞர் ஒருவரிடமிருந்து வந்ததாகக் கூறும் கடிதம் ஒன்று, நீங்கள் கேள்விப்பட்டிராத ஒரு தொலைதூர உறவினர் உங்களுக்கு ஒரு பெரிய சொத்தை விட்டுச் சென்றுள்ளார் என்று கூறுகிறது, ஆனால் அதை பெறுவதற்கு முன் ஒரு “செயலாக்க கட்டணத்தை” செலுத்த வேண்டும்.',
    options: ['சொத்தின் மதிப்பு அதிகம் என்பதால் செயலாக்க கட்டணத்தை செலுத்துவது', 'அந்த உறவினரைப் பற்றி மேலும் விவரங்களைக் கேட்டு பதிலளிப்பது', 'கடிதத்தை புறக்கணிப்பது — உண்மையான சொத்துரிமைகளுக்கு பெறுவதற்கு முன் பணம் செலுத்த வேண்டியதில்லை', 'இங்குள்ள வழக்கறிஞரிடம் குறைவான செயலாக்க கட்டணத்திற்கு பேரம் பேசச் சொல்வது'],
    explanation: 'உண்மையான சொத்துரிமைகள் நீதிமன்றங்களால் கையாளப்படுகின்றன, பயனாளி முன்கூட்டியே கட்டணம் செலுத்த வேண்டியதில்லை. இது ஒரு பொதுவான முன்கூட்டிய கட்டண மோசடி — புறக்கணித்துவிடுங்கள்.',
  },
  'imp-10': {
    scenario: 'ஒரு பிரபலமான தொழில்நுட்ப நிறுவனத்திலிருந்து அழைப்பதாகக் கூறும் ஒருவர், உங்கள் கணினியிலிருந்து வைரஸ் எச்சரிக்கைகள் வருகின்றன என்று கூறி, தான் அனுப்பும் ஒரு ஆப்பை நிறுவினால் தொலைவிலிருந்தே சரிசெய்வதாகக் கூறி, பின் “பழுதுபார்ப்பு” கட்டணத்தைக் கேட்கிறார்.',
    options: ['தொலைபேசியை துண்டிப்பது — தொழில்நுட்ப நிறுவனங்கள் வைரஸ் எச்சரிக்கை பற்றி முதலில் அழைக்காது, தெரியாத அழைப்பாளர்களிடமிருந்து தொலைவு அணுகல் ஆப்களை ஒருபோதும் நிறுவக்கூடாது', 'அவரை கணினியை அணுக அனுமதித்து, ஆனால் இன்னும் கட்டண விவரங்களை கொடுக்காதிருப்பது', 'ஆப்பை நிறுவி, வைரஸை விரைவாக சரிசெய்ய கட்டணம் செலுத்துவது', 'அவர் நிறுவனத்திலிருந்து வந்தவர் என்பதை நிரூபிக்க முதலில் ஊழியர் ஐடி கேட்பது'],
    explanation: 'உண்மையான தொழில்நுட்ப நிறுவனங்கள் வைரஸ் எச்சரிக்கைகள் பற்றி திடீரென அழைக்காது. அந்நியருக்கு தொலைவு அணுகல் மென்பொருளை நிறுவினால், உங்கள் கணினியில் உள்ள வங்கி விவரங்கள் உட்பட அனைத்தையும் அவர்கள் பார்க்க முடியும்.',
  },
  'bls-01': {
    scenario: 'அறிமுகமில்லாத ஒரு முதியவர் உங்களை அணுகி, சாபத்தால் உங்கள் குடும்பத்திற்கு துர்பாக்கியம் ஏற்பட்டுள்ளது எனக் கூறி, உங்கள் தங்க நகைகள் மற்றும் பணத்தை பிரார்த்தனை செய்து “சுத்திகரிக்க” முன்வருகிறார் — ஆனால் முதலில் அந்த பொருட்களை அவரிடம் ஒப்படைக்க வேண்டும் என்கிறார்.',
    options: ['சம்மதித்து, ஆனால் அவர்கள் உங்கள் முன்னிலையில் சடங்கை செய்யச் சொல்வது', 'சாபத்தை நீக்க நகைகள் மற்றும் பணத்தை ஒப்படைப்பது', 'மரியாதையுடன் மறுத்து அப்புறப்படுவது — உங்கள் மதிப்புமிக்க பொருட்களை எடுப்பதன் மூலம் யாரும் சாபத்தை நீக்க முடியாது', 'நகைகளை மட்டும் கொடுத்து, பணத்தை வைத்திருப்பது'],
    explanation: 'இது ஒரு பொதுவான ஆசி/பரிகார மோசடி. உங்கள் மதிப்புமிக்க பொருட்கள் உங்கள் கையை விட்டு விலகியதும், அவை போய்விடும். உண்மையான மத அல்லது ஆன்மீக உதவிக்கு ஒருபோதும் பணத்தையோ நகைகளையோ ஒப்படைக்க வேண்டியதில்லை.',
  },
  'bls-02': {
    scenario: 'ஒரு “கோவில் ஊடகர்” அழைத்து, உங்கள் உடல்நல பிரச்சினைகளுக்கு தீய ஆவிகள் காரணம் எனக் கூறுகிறார். “ஆசி” பெற முதலில் உங்கள் சேமிப்பை அவரிடம் மாற்றினால், ஒரு சிறப்பு சடங்கு மூலம் உங்கள் பணத்தை இரட்டிப்பாக்குவதாக கூறுகிறார்.',
    options: ['பதிலாக ஒரு குடும்ப உறுப்பினரை பணத்தை மாற்றச் சொல்வது', 'தொலைபேசியை துண்டிப்பது — எந்த சடங்கும் உங்கள் பணத்தை இரட்டிப்பாக்க முடியாது, இது ஒரு மோசடி', 'உண்மையில் இரட்டிப்பாகுமா என சோதிக்க முதலில் ஒரு சிறிய தொகையை மாற்றுவது', 'அவரை நேரில் சந்தித்து, பாதுகாப்பாக உணர ரொக்கமாக செலுத்துவது'],
    explanation: 'எந்த சடங்கு, ஆசி, அல்லது ஊடகரும் உங்கள் பணத்தை “இரட்டிப்பாக்க” முடியாது. பணத்தை பெருக்க அல்லது ஆசி பெற அனுப்பச் சொல்லும் எந்த கோரிக்கையும் ஒரு மோசடியே — தொலைபேசியை துண்டித்து, மேலும் ஈடுபடாதீர்கள்.',
  },
  'bls-03': {
    scenario: 'துறவி போல் உடையணிந்த ஒருவர் உங்கள் வீட்டு வாசலுக்கு வந்து கோவிலுக்கு நன்கொடை வசூலிக்கிறார், உங்கள் தாராள மனப்பான்மையையும் “நல்ல அதிர்ஷ்டத்தையும்” புகழ்ந்த பிறகு, உங்கள் “ஆசீர்வதிக்கப்பட்ட விதிக்கு ஏற்ப” வழக்கத்தை விட மிகப் பெரிய தொகையை கொடுக்க வேண்டும் என வலியுறுத்துகிறார்.',
    options: ['அவர் உங்களை அதிர்ஷ்டசாலி என்று சொல்வதால், அதிக தொகையை கொடுப்பது', 'தொகையை கொடுத்துவிட்டு, அவர் உண்மையான துறவி என நிரூபிக்கவில்லை எனில் திரும்பக் கேட்பது', 'பின்னர் ரசீது புத்தகத்துடன் திரும்ப வரச் சொல்லிவிட்டு முடிவெடுப்பது', 'கூடுதல் அழுத்தத்தை மரியாதையுடன் மறுத்து, உங்களுக்கு வசதியான தொகையை மட்டும், அல்லது பதிவுசெய்யப்பட்ட தொண்டு நிறுவனத்திற்கு நன்கொடை கொடுப்பது'],
    explanation: 'உண்மையான மத நிறுவனங்கள் புகழ்ச்சி மூலம் அதிக நன்கொடைக்கு அழுத்தம் தராது. நீங்கள் நன்கொடை கொடுக்க விரும்பினால், நீங்களே சரிபார்த்த பதிவுசெய்யப்பட்ட தொண்டு நிறுவனத்திற்கு கொடுங்கள்.',
  },
  'bls-04': {
    scenario: 'சந்தையில் ஒரு அந்நியர் இலவசமாக உங்கள் கை ரேகையைப் பார்ப்பதாகக் கூறி, திடீரென கவலையான முகத்துடன், உடனடியாக ஒரு சிறப்பு பாதுகாப்பு தாயத்தை வாங்கவில்லையெனில் விரைவில் உங்கள் குடும்பத்திற்கு பெரிய ஆபத்து ஏற்படும் என்கிறார்.',
    options: ['உண்மையாக இருந்தால் என்ன செய்வது என எண்ணி, மலிவான தாயத்தை வாங்குவது', 'குடும்பத்தை பாதுகாக்க உடனடியாக தாயத்தை வாங்குவது', 'வாங்குவதற்கு முன் விலையை குறைக்கச் சொல்வது', 'அப்புறப்படுவது — இது ஒரு பொதுவான அழுத்த உத்தி, உண்மையான எச்சரிக்கை ஒரு தாயத்தை விற்பதன் மூலம் தீராது'],
    explanation: 'இது ஒரு பொதுவான அழுத்த உத்தி: பயத்தை உருவாக்கி, பின் “தீர்வை” விற்பது. அப்போதே ஏதாவது வாங்குவதன் மூலம் வசதியாக தீரக்கூடிய பேரழிவை உண்மையான ஜோதிடம் ஒருபோதும் கணிக்காது.',
  },
  'bls-05': {
    scenario: 'ஒரு உணவகத்தில், ஒரு பெண் உங்கள் மகன் பெரிய ஆபத்தில் இருப்பதாக உணர்வதாகக் கூறி, அவனுடைய பாதுகாப்புக்காக பிரார்த்தனை செய்வதாக முன்வருகிறார் — ஆனால் ஒவ்வொரு முறை சந்திக்கும்போதும் அதிகரிக்கும் தொகையை செலுத்தினால் மட்டுமே பிரார்த்தனை பலிக்கும் என்கிறார்.',
    options: ['இது உங்கள் குழந்தையின் மீதான கவலையை பயன்படுத்தும் மோசடி என்று உணர்ந்து, செலுத்துவதை நிறுத்தி விலகிச் செல்வது', 'அவரிடம் அங்கேயே மகனை அழைக்கச் சொல்லி நிரூபிக்கச் சொல்வது', 'மகனை பாதுகாக்க ஒவ்வொரு முறையும் அதிகமாக செலுத்துவது', 'இன்னொரு முறை மட்டும் செலுத்தி, மாற்றமில்லையெனில் நிறுத்துவது'],
    explanation: 'மோசடி செய்பவர்கள் பெரும்பாலும் பெற்றோரின் பிள்ளைகள் மீதான அன்பையும் கவலையையும் இலக்காகக் கொள்கிறார்கள். உண்மையான பிரார்த்தனை அல்லது ஆசி ஒருபோதும் தொடர்ந்து அதிகரிக்கும் விலையுடன் விற்கப்படாது — உடனே அப்புறப்படுங்கள்.',
  },
  'bls-06': {
    scenario: 'ஒரு கோவிலை பிரதிநிதித்துவப்படுத்துவதாகக் கூறும் ஒருவரிடமிருந்து தொலைபேசி அழைப்பு வருகிறது, உங்கள் முன்னோர்கள் “மகிழ்ச்சியற்று” இருப்பதாகவும், அதனால் குடும்பத்தில் துர்பாக்கியம் ஏற்படுவதாகவும், அதை சரிசெய்ய ஒரு குறிப்பிட்ட தொகை செலவாகும் சிறப்பு பிரார்த்தனை உடனடியாக செய்யப்பட வேண்டும் எனவும் கூறுகிறார்.',
    options: ['தொலைபேசியை துண்டிப்பது — உண்மையான கோவில் எதுவும் திடீரென அழைத்து முன்னோர் தொடர்பான பிரச்சினையை “சரிசெய்ய” பணம் கேட்காது', 'செலுத்தும் முன் விலையை குறைக்க பேரம் பேசுவது', 'முன்னோர்கள் மேலும் துர்பாக்கியம் தராமல் இருக்க விரைவாக பணத்தை மாற்றுவது', 'கொடுக்கப்பட்ட எண்ணை அழைத்து கோவிலிடமே நேரடியாக உறுதிப்படுத்தச் சொல்வது ஒரு குடும்ப உறுப்பினரிடம்'],
    explanation: 'உண்மையான கோவில்கள் முன்னோர் தொடர்பான பிரார்த்தனைகளுக்கு பணம் கேட்டு திடீரென அழைக்காது. கவலையாக இருந்தால், நீங்கள் ஏற்கனவே அறிந்து நம்பும் கோவிலை, நீங்களே தேடிய எண் மூலம் தொடர்பு கொள்ளுங்கள்.',
  },
  'bls-07': {
    scenario: 'ஒரு சிறு குழு தெருவில் ஆசி சடங்கு செய்து, உங்களிடம் ஒரு சிவப்பு பாக்கெட் கொடுத்து, “ஆசியை திருப்பிக் கொடுக்க” நன்கொடை கொடுக்க வேண்டும் என்கிறார்கள். நீங்கள் ஒரு சிறிய தொகையை கொடுக்கிறீர்கள், ஆனால் ஆசி “முழுமையாக” இருக்க இன்னும் அதிக தொகை தேவை எனக் கூறுகிறார்கள்.',
    options: ['இன்னும் கொஞ்சம் கொடுத்து, அதற்கு மேல் உறுதியாக மறுப்பது', 'ஆசி முழுமையடையாமல் இருக்காதவாறு அதிக தொகையை மாற்றுவது', 'பணம் எப்படி பயன்படுத்தப்படும் என எழுதிக் கொடுக்கச் சொல்லிவிட்டு மேலும் செலுத்துவது', 'அப்புறப்படுவது — உண்மையான ஆசி என்பது அதிகரிக்கும் கோரிக்கைகளுடன் கூடிய நிதி பரிவர்த்தனை அல்ல'],
    explanation: 'ஆரம்ப சிறிய கட்டணத்திற்குப் பிறகு அதிகரிக்கும் கோரிக்கைகள் ஒரு பொதுவான தெரு மோசடி முறை. மேலும் பணம் தேவைப்படும் “முழுமையடையாத” ஆசி என்று எதுவும் இல்லை — அப்புறப்படுங்கள்.',
  },
  'bls-08': {
    scenario: 'தன்னை ஃபெங் ஷுயி வல்லுநர் என அறிவிக்கும் ஒருவர் இலவச வீட்டு ஆய்வு செய்வதாக முன்வந்து, பின் உங்கள் வீட்டில் தீய ஆவிகள் உள்ளன என்றும், அவர் விற்கும் குறிப்பிட்ட விலையுயர்ந்த பொருட்கள் அல்லது படிகங்களை வாங்கினால் மட்டுமே அவற்றை அகற்ற முடியும் என்றும் கூறுகிறார்.',
    options: ['தீய ஆவிகளை அகற்ற அவர் பரிந்துரைக்கும் பொருட்களை வாங்குவது', 'மறுப்பது — உண்மையான ஃபெங் ஷுயி ஆலோசனைக்கு, ஆலோசகரிடமிருந்தே குறிப்பிட்ட விலையுயர்ந்த பொருட்களை வாங்க வேண்டியதில்லை', 'நீங்கள் மூத்த குடிமகன் என்பதால் இலவசமாக ஆவிகளை அகற்றச் சொல்வது', 'மலிவான பதிப்பை வாங்குவது'],
    explanation: 'பிரச்சினையை கண்டறியும் நபரே விலையுயர்ந்த தீர்வையும் விற்கும்போது எச்சரிக்கையாக இருங்கள். இந்த நலன் முரண்பாடு, தேவையற்ற பொருட்களை வாங்க மக்களை வற்புறுத்தும் ஒரு பொதுவான வழி.',
  },
  'bls-09': {
    scenario: 'ஒரு அழைப்பாளர் உங்கள் லாட்டரி எண்கள் துர்பாக்கியத்தால் “சபிக்கப்பட்டுள்ளன” என்று கூறி, ஒரு சடங்கு பரிமாற்றம் மூலம் அதை சுத்திகரிக்க முன்வருகிறார் — நீங்கள் “ஆசி” பெற உங்கள் பணத்தை கொடுக்கிறீர்கள், இரட்டிப்பாக திரும்பக் கிடைக்கும் என்கிறார், ஆனால் திரும்பக் கிடைத்த பணம் போலியானதாக இருக்கிறது.',
    options: ['பழைய, தேவையற்ற நோட்டுகளை மட்டும் கொண்டு செய்வது', 'மறுப்பது — எந்த சடங்கும் பணத்தை ஆசீர்வதிக்கவோ இரட்டிப்பாக்கவோ முடியாது, “பரிமாற்றத்திற்காக” உண்மையான பணத்தை கொடுத்தால் முழுவதையும் இழக்க நேரிடும்', 'ஆசி பெற்ற பணத்தை முதலில் வங்கியில் சரிபார்க்கச் சொல்வது', 'உண்மையா என்று சோதிக்க ஒரு முறை சிறிய தொகையுடன் முயற்சிப்பது'],
    explanation: 'இந்த பரிமாற்ற தந்திரம் “சடங்கின்” போது உங்கள் உண்மையான பணத்தை போலி நோட்டுகளாக மாற்றும் வகையில் வடிவமைக்கப்பட்டுள்ளது. எந்த ஆசியும் பணத்தின் மதிப்பை மாற்றாது — இதுபோன்ற பரிமாற்றத்திற்கு ஒருபோதும் பணத்தை கொடுக்காதீர்கள்.',
  },
  'bls-10': {
    scenario: 'துறவி போல் உடையணிந்த ஒருவர் உங்கள் வீட்டு வாசலில், “பாதுகாப்பிற்காக” ஒரு தாயத்து வளையலைத் தந்து, பதிலுக்கு பெரிய நன்கொடையை வலியுறுத்துகிறார், நீங்கள் ஆர்வமில்லை என்று சொல்ல முயலும்போது கடுமையாகவும் அசௌகரியமாகவும் நடந்துகொள்கிறார்.',
    options: ['வளையலை வாங்கி, அடுத்த முறை பணம் தருவதாக உறுதியளிப்பது', 'உறுதியாக இல்லை என்று சொல்லி கதவை மூடுவது; அவர் போகவில்லையெனில் அண்டை வீட்டாரையோ பாதுகாவலரையோ அழைப்பது', 'அவரை அனுப்ப, விட்டுக்கொடுத்து பணம் கொடுப்பது', 'உரையாடலை முடிக்க மிகக் குறைந்த தொகையை வழங்குவது'],
    explanation: 'உண்மையான மத நன்கொடைகள் ஒருபோதும் கட்டாயப்படுத்தப்படாது. நீங்கள் மறுக்கும்போது ஆக்ரோஷமாகவோ வற்புறுத்தலாகவோ நடந்துகொள்வது தானே ஒரு எச்சரிக்கை அறிகுறி — உறுதியாக இருங்கள், தேவைப்பட்டால் உதவி பெறுங்கள்.',
  },
  'luv-01': {
    scenario: 'நீங்கள் ஆன்லைனில் அறிமுகமான ஒருவருடன் இரண்டு மாதங்களாக பேசி வருகிறீர்கள், அவர் தன்னை வெளிநாட்டில் பணிபுரியும் பொறியாளர் என்கிறார். அவர் ஒருபோதும் வீடியோ அழைப்பு செய்ததில்லை, இப்போது சிங்கப்பூர் வந்து உங்களை சந்திக்க “சுங்க கட்டணத்திற்காக” உடனடியாக பணம் தேவை என்கிறார்.',
    options: ['நம்பிக்கையைக் காட்ட பாதி தொகையை அனுப்புவது', 'முதலில் நேரடி வீடியோ அழைப்பை வலியுறுத்தி, நீங்கள் ஒருபோதும் நேரில் பார்க்காத அல்லது சந்திக்காத ஒருவருக்கு பணம் அனுப்ப மறுப்பது', 'பணத்தை அனுப்புவது — அவர் உங்கள் அரட்டைகளில் மிகவும் அக்கறையுடன் இருந்திருக்கிறார்', 'இன்றைய செய்தித்தாளை பிடித்துக்கொண்ட புகைப்படத்தை ஆதாரமாக அனுப்பச் சொல்வது'],
    explanation: 'வீடியோ அழைப்புகளை தவிர்ப்பதும், சந்திப்பதற்கு முன் “கட்டணங்களுக்கு” பணம் கேட்பதும் காதல் மோசடியின் அடிப்படை அறிகுறிகள். உண்மையான துணை ஒருபோதும் தொடர்ந்து வீடியோ அழைப்பை தவிர்க்காது, “பறந்து வர” பணம் கேட்காது.',
  },
  'luv-02': {
    scenario: 'உங்கள் புதிய ஆன்லைன் துணை, முதலீட்டு நிறுவனத்தில் பணிபுரியும் ஒரு “நண்பரை” அறிமுகப்படுத்தி, உங்கள் எதிர்காலத்தை உருவாக்க இருவரும் சேர்ந்து ஒரு டிரேடிங் தளத்தில் பணத்தை போட வேண்டும் என பரிந்துரைக்கிறார்.',
    options: ['இது ஒரு பொதுவான காதல்-மற்றும்-முதலீடு மோசடி கலவை என்பதை உணர்ந்து, ஆன்லைனில் மட்டும் அறிமுகமான யாருடனும் முதலீடு செய்ய மறுப்பது', 'துணை பரிந்துரைத்ததால் அந்த தளத்தில் சேருவது', 'உறவின் நோக்கத்தை பார்க்க ஒரு சிறிய தொகையை முதலீடு செய்வது', 'துணை முதலில் முதலீடு செய்யட்டும், பின் நீங்கள் பின்பற்றுவது'],
    explanation: '“முதலீட்டு வாய்ப்புகளை” அறிமுகப்படுத்தும் ஆன்லைன் துணைகள் சிங்கப்பூரில் மிகவும் பொதுவான மோசடி முறைகளில் ஒன்று. ஆன்லைனில் மட்டும் அறிமுகமான ஒருவரின் பரிந்துரையின் அடிப்படையில் ஒருபோதும் பணத்தை முதலீடு செய்யாதீர்கள்.',
  },
  'luv-03': {
    scenario: 'டேட்டிங் ஆப்பில் அறிமுகமான ஒருவர் தன்னை வெளிநாட்டில் நிலைகொண்ட அமெரிக்க இராணுவ அதிகாரி என்று கூறி, ஒரு மதிப்புமிக்க பரிசு பொதியை உங்களுக்கு அனுப்ப விரும்புவதாகக் கூறுகிறார், ஆனால் அது வழங்கப்படுவதற்கு முன் நீங்கள் ஒரு “சுங்க அனுமதி கட்டணத்தை” செலுத்த வேண்டும் என்கிறார்.',
    options: ['செலுத்தும் முன் கட்டணத்தை குறைக்கச் சொல்வது', 'பரிசு வழங்கப்பட, சுங்க கட்டணத்தை செலுத்துவது', 'பாதி கட்டணத்தை செலுத்தி, பரிசு வருகிறதா என்று பார்ப்பது', 'மறுப்பது — உண்மையான பரிசுகளுக்கு பெறுநர் சுங்க கட்டணம் செலுத்த வேண்டியதில்லை, இது ஒரு பொதுவான மோசடி வசனம்'],
    explanation: '“சுங்க கட்டணம் தேவைப்படும் பரிசை அனுப்பும் இராணுவ அதிகாரி” கதை மிகவும் பொதுவான காதல் மோசடி வசனங்களில் ஒன்று. உண்மையான பரிசு எதற்கும் நீங்கள் பெற பணம் செலுத்த வேண்டியதில்லை.',
  },
  'luv-04': {
    scenario: 'சில வாரங்களாக பேசி வரும் உங்கள் ஆன்லைன் துணை திடீரென ஒரு விபத்தில் சிக்கியதாகவும், வெளிநாட்டில் அவசர அறுவை சிகிச்சைக்கு உடனடியாக பணம் தேவை என்றும், வேறு யாரும் இல்லை என்றும், குணமடைந்தவுடன் திருப்பிக் கொடுப்பதாகவும் செய்தி அனுப்புகிறார்.',
    options: ['நல்லெண்ணத்தை காட்ட முதலில் ஒரு சிறிய தொகையை அனுப்புவது', 'நீங்கள் அறியாத அவரது நண்பரிடம் உறுதிப்படுத்தச் சொல்லிவிட்டு அனுப்புவது', 'அது ஒரு மருத்துவ அவசரநிலை என்பதால் உடனடியாக பணத்தை அனுப்புவது', 'எச்சரிக்கையாக இருப்பது — நேரில் சந்திக்காத ஒருவருக்கு பணம் அனுப்பும் முன், வீடியோ அழைப்பு மற்றும் சுயாதீன வழிகள் மூலம் உறுதிப்படுத்துவது'],
    explanation: 'திடீர் மருத்துவ அவசரநிலைகள் காதல் மோசடிகளில் ஒரு பொதுவான அழுத்த உத்தி. எந்த பணத்தையும் அனுப்பும் முன், வீடியோ அழைப்பு மூலமோ அல்லது மருத்துவமனையை நேரடியாக தொடர்பு கொண்டோ சுயாதீனமாக உறுதிப்படுத்துங்கள்.',
  },
  'luv-05': {
    scenario: 'உங்கள் ஆன்லைன் துணை, தன் நாட்டில் வங்கிக் கணக்கு வேலை செய்யவில்லை என்று கூறி, அதற்கு பதிலாக iTunes அல்லது Google Play பரிசு அட்டைகளை வாங்கி, அதன் குறியீடுகளை அனுப்பி பணமாக உதவும்படி கேட்கிறார்.',
    options: ['முடிவெடுப்பதற்கு முன் வங்கி பிரச்சினையைப் பற்றி மேலும் விளக்கச் சொல்வது', 'பரிசு அட்டைகளை வாங்கி, கேட்டபடி குறியீடுகளை அனுப்புவது', 'மறுப்பது — பரிசு அட்டை குறியீடுகளில் பணம் கேட்பது ஒரு பெரிய மோசடி எச்சரிக்கை அறிகுறி, உண்மையான நபர் ஒருபோதும் இதை பயன்படுத்த மாட்டார்', 'பாதுகாப்பாக இருக்க குறைந்த மதிப்புள்ள பரிசு அட்டையை அனுப்புவது'],
    explanation: 'காதல் தொடர்பானதாக இருந்தாலும் இல்லாவிட்டாலும், எந்த சட்டபூர்வ பரிவர்த்தனையும் பரிசு அட்டை குறியீடுகள் மூலம் நடக்காது. இது மிகத் தெளிவான மோசடி அறிகுறிகளில் ஒன்று — மறுத்து தொடர்பை நிறுத்துங்கள்.',
  },
  'luv-06': {
    scenario: 'பல மாதங்களாக ஒரு ஆன்லைன் நபருடன் பேசி வருகிறீர்கள், நேரில் சந்திக்க அல்லது வீடியோ அழைக்க முடியாததற்கு அவருக்கு எப்போதும் ஒரு காரணம் இருக்கிறது. சமீபத்தில், பல்வேறு அவசரநிலைகளுக்கு பணத்தை “கடன்” வாங்க தொடங்கியுள்ளார், இறுதியில் சந்திக்கும்போது முழுவதும் திருப்பிக் கொடுப்பதாக உறுதியளிக்கிறார்.',
    options: ['மேலும் கடன் கொடுப்பதற்கு முன் எழுத்துப்பூர்வ உறுதிமொழி கேட்பது', 'சந்திப்பதைத் தவிர்க்க திரும்பத் திரும்ப காரணங்கள் சொல்வதை ஒரு எச்சரிக்கை அறிகுறியாக அடையாளம் கண்டு, பணம் அனுப்புவதை நிறுத்துவது', 'பல மாதங்களாக பேசியதால் அவரை நம்பி தொடர்ந்து பணம் கொடுப்பது', 'ஒரு நிலையான சிறிய தொகையை மட்டும் கடனாக கொடுத்து, பின் நிறுத்துவது'],
    explanation: 'பேசிய நேரம் ஒருவர் தான் சொல்வது போன்று உண்மையாக இருக்கிறார் என்பதை நிரூபிக்காது. வீடியோ அழைப்புகள் அல்லது சந்திப்புகளை திரும்பத் திரும்ப தவிர்த்து பணம் கேட்பது காதல் மோசடியின் மிகத் தெளிவான அறிகுறிகளில் ஒன்று.',
  },
  'luv-07': {
    scenario: 'உங்கள் ஆன்லைன் துணை இறக்குமதி/ஏற்றுமதி வணிகம் நடத்துவதாகக் கூறி, தன் “வாடிக்கையாளர்களிடமிருந்து” பணத்தை உங்கள் வங்கிக் கணக்கில் பெற்று, பின்னர் அதை தனக்கு அனுப்பச் சொல்கிறார், இதற்காக ஒரு சிறிய கட்டணத்தை உங்களுக்கு வழங்குவதாகக் கூறுகிறார்.',
    options: ['சிறு கட்டணம் கிடைப்பதால் உதவ சம்மதிப்பது', 'சட்டபூர்வமானதா என்று பார்க்க ஒரு முறை செய்துவிட்டு, பின் முடிவெடுப்பது', 'மறுப்பது — இது உங்களை ஏமாற்றப்பட்ட அல்லது சட்டவிரோதமாக பெறப்பட்ட பணத்திற்கான “பண கழுதையாக” ஆக்கலாம், தெரியாமல் இருந்தாலும் இது ஒரு குற்றமாகும்', 'சம்மதிக்கும் முன் வாடிக்கையாளரின் தொடர்பு விவரங்களைக் கேட்பது'],
    explanation: 'மற்றொருவருக்காக உங்கள் கணக்கின் வழியாக பணம் செல்ல அனுமதிப்பது, தெரியாமல் இருந்தாலும் உங்களை சட்டப்படி பண கழுதையாக பொறுப்பேற்கச் செய்யலாம். உங்கள் வங்கிக் கணக்கு இவ்வாறு பயன்படுத்தப்பட ஒருபோதும் அனுமதிக்காதீர்கள்.',
  },
  'luv-08': {
    scenario: 'உங்கள் ஆன்லைன் துணை மருத்துவமனை படுக்கையில் இருப்பது போன்ற ஒரு புகைப்படத்தை அனுப்பி, சிகிச்சைக்காக இன்றே பணம் அனுப்ப வேண்டும் என்றும், குணமடைந்தவுடன் எல்லாவற்றையும் விளக்குவதாகவும் கூறுகிறார்.',
    options: ['ஒரு பகுதி தொகையை அனுப்பி, மீதியை பின்னர் கேட்பது', 'சந்தேகப்படுவது — புகைப்படங்களை ஆன்லைனில் எங்கிருந்தும் எடுக்கலாம், எதையும் அனுப்பும் முன் நேரடி வீடியோ அழைப்பு மூலம் உறுதிப்படுத்துவது', 'புகைப்பட ஆதாரத்தைக் கண்டு உடனடியாக பணத்தை அனுப்புவது', 'மருத்துவமனையின் பெயரைக் கேட்டு, மேலும் சரிபார்க்காமல் பணத்தை அனுப்புவது'],
    explanation: 'ஒரு புகைப்படம் மட்டும் எதையும் நிரூபிக்காது — படங்களை இணையத்திலிருந்து எளிதாக நகலெடுக்க முடியும். கூறப்படும் அவசரநிலைக்கு பணம் அனுப்பும் முன், நேரடி வீடியோ அழைப்பு மூலம் சுயாதீனமாக உறுதிப்படுத்துங்கள்.',
  },
  'luv-09': {
    scenario: 'நீங்கள் பேசி வரும் ஒரு ஆன்லைன் துணை உங்களிடம் தனிப்பட்ட புகைப்படங்களை பகிரச் சொல்கிறார், பின்னர் நீங்கள் ஒரு பெரிய தொகையை செலுத்தாவிட்டால் அவற்றை உங்கள் குடும்பத்திற்கும் நண்பர்களுக்கும் அனுப்புவதாக மிரட்டுகிறார்.',
    options: ['குறைந்த தொகைக்கு பேரம் பேச முயற்சிப்பது', 'புகைப்படங்களை பகிராமல் இருக்க பணத்தை செலுத்துவது', 'உங்கள் கணக்குகளை நீக்கிவிட்டு, அவர்கள் ஆர்வம் இழக்க வேண்டும் என நம்புவது', 'பணம் செலுத்தக்கூடாது — இது ஒரு குற்றம் என்பதால் போலீஸை தொடர்பு கொள்வது, பணம் செலுத்துவது பெரும்பாலும் மேலும் கோரிக்கைகளை நிறுத்தாது'],
    explanation: 'பணம் செலுத்துவது பாலியல் மிரட்டலை (sextortion) அரிதாகவே முடிவுக்குக் கொண்டு வரும் — பெரும்பாலும் மேலும் கோரிக்கைகளுக்கு வழிவகுக்கும். அனைத்து தொடர்பையும் நிறுத்தி, செய்திகளின் ஆதாரங்களை வைத்திருந்து, உடனே போலீஸில் புகார் அளியுங்கள்.',
  },
  'luv-10': {
    scenario: 'ஒரு ஆன்லைன் துணை தன்னை வெளிநாட்டில் இளம் குழந்தையுடன் இருக்கும் விதவை அல்லது விதுரர் என்று கூறி, குழந்தைக்கு மருத்துவ அவசரநிலை ஏற்பட்டதாகவும், தற்போது தன் சொந்த பணத்தை அணுக முடியாததாலும் உடனடியாக பணம் அனுப்பச் சொல்கிறார்.',
    options: ['“ஆபத்தில் உள்ள குழந்தை” என்ற உணர்ச்சிகரமான வேண்டுகோளை ஒரு பொதுவான மோசடி உத்தியாக அடையாளம் கண்டு, எதையும் அனுப்பும் முன் சுயாதீனமாக உறுதிப்படுத்துவது', 'நல்லெண்ண சைகையாக ஒரு சிறிய தொகையை அனுப்புவது', 'குழந்தைக்கு உதவ உடனடியாக பணத்தை அனுப்புவது', 'முடிவெடுப்பதற்கு முன் குழந்தையின் புகைப்படத்தைக் கேட்பது'],
    explanation: 'மோசடி செய்பவர்கள் பெரும்பாலும் அவசரத்தையும் குற்ற உணர்வையும் உருவாக்க பாதிக்கப்படக்கூடிய குழந்தையை கற்பனை செய்கிறார்கள். கதை எவ்வளவு உணர்ச்சிகரமாக இருந்தாலும், பணம் அனுப்பும் முன் வீடியோ அழைப்பு அல்லது நம்பகமான மற்றொரு ஆதாரம் மூலம் சுயாதீனமாக உறுதிப்படுத்துங்கள்.',
  },
  'inv-01': {
    scenario: 'ஒரு முன்னாள் பள்ளித் தோழர் உங்களை ஒரு WhatsApp குழுவில் சேர்க்கிறார், அங்கு உறுப்பினர்கள் ஒரு கிரிப்டோகரன்சி தளத்திலிருந்து பெரும் லாபங்களின் ஸ்கிரீன்ஷாட்களை பகிர்ந்து, மாதம் 20% உத்தரவாதமான வருமானத்துடன் “விரைவில் சேருங்கள்” என அனைவரையும் ஊக்குவிக்கிறார்கள்.',
    options: ['குழு நிர்வாகியிடம் மேலும் ஆதாரம் கேட்டு, பின் அவர்கள் பரிந்துரைக்கும் தொகையை முதலீடு செய்வது', 'எச்சரிக்கையாக இருப்பது — எந்த ஆபத்தும் இல்லாத உத்தரவாத அதிக வருமானம் ஒரு பெரிய எச்சரிக்கை அறிகுறி, நண்பர் பரிந்துரைத்தாலும் சரி', 'உடனடியாக சேருவது — உங்கள் பள்ளித் தோழர் பொய் சொல்ல மாட்டார்', 'லாப ஸ்கிரீன்ஷாட்கள் உண்மையா என்று பார்க்க ஒரு சிறிய “சோதனை” தொகையை முதலீடு செய்வது'],
    explanation: 'எந்த சட்டபூர்வ முதலீடும் ஆபத்து இல்லாமல் அதிக மாத வருமானத்தை உத்தரவாதம் அளிக்க முடியாது. மோசடி செய்பவர்கள் பெரும்பாலும் நம்பகமான தொடர்பாளரின் WhatsApp அல்லது சமூக ஊடகத்தைப் பயன்படுத்தி திட்டத்தை நம்பகமானதாகக் காட்டுகிறார்கள் — முதலீடு செய்வதற்கு முன் MAS உடன் உறுதிப்படுத்திக் கொள்ளுங்கள்.',
  },
  'inv-02': {
    scenario: 'பிரபலமான உள்ளூர் தொலைக்காட்சி நபர் ஒருவர் “ஆதரவளிக்கும்” ஒரு முதலீட்டு ஆப்பை ஃபேஸ்புக் விளம்பரத்தில் காண்கிறீர்கள், அது $500-ஐ ஒரு மாதத்தில் $5,000 ஆக மாற்றுவதாக உறுதியளிக்கிறது. உங்கள் “லாபத்தை” திரும்பப் பெற முன், மேலும் பணத்தை சேர்க்க ஆப் கேட்கிறது.',
    options: ['ஆப்பில் ஏற்கனவே லாபம் காட்டப்படுவதால் மேலும் பணத்தை சேர்ப்பது', 'இது சட்டபூர்வமானது என்பதை நிரூபிக்க ஆப்பின் வாடிக்கையாளர் சேவை அரட்டையிடம் கேட்பது', 'முதலில் ஒரு சிறிய தொகையை திரும்பப் பெற்று, வேலை செய்தால் மேலும் பணம் சேர்ப்பது', 'போலி பிரபல ஆதரவையும், “திரும்பப் பெற பணம் செலுத்து” கோரிக்கையையும் மோசடி அறிகுறிகளாக அடையாளம் கண்டு உடனே நிறுத்துவது'],
    explanation: 'போலி பிரபல ஆதரவும், சொந்த லாபத்தை திரும்பப் பெற முன் “மேலும் பணம் சேர்” என்று கேட்கும் ஆப்களும் முதலீட்டு மோசடியின் முக்கிய அறிகுறிகள். எங்கும் முதலீடு செய்வதற்கு முன் MAS நிதி நிறுவனங்கள் அடைவை சரிபார்க்கவும்.',
  },
  'inv-03': {
    scenario: 'ஒரு இன்ஸ்டாகிராம் இன்ஃப்ளூயன்சர் உரிமம் பெறாத ஒரு அந்நிய செலாவணி (forex) டிரேடிங் தளத்தை விளம்பரப்படுத்துகிறார், தினசரி பெரும் லாபங்களின் ஸ்கிரீன்ஷாட்களைக் காண்பித்து, சிறிய தொடக்கத் தொகையுடன் யார் வேண்டுமானாலும் சேரலாம் என்றும் “உத்தரவாத” வருமானம் என்றும் கூறுகிறார்.',
    options: ['கருத்தில் கொள்வதற்கு முன் தளம் MAS-ஆல் உரிமம் பெற்றதா என சரிபார்ப்பது, மேலும் “உத்தரவாத” வருமானம் என்பது உண்மையான டிரேடிங்கில் இல்லை என்பதை நினைவில் கொள்வது', 'சேருவதற்கு முன் இன்ஃப்ளூயன்சரிடம் மேலும் ஆதாரம் கேட்பது', 'முயற்சிக்க மிகச் சிறிய தொகையில் தொடங்குவது', 'இன்ஃப்ளூயன்சர் நம்பகமாகவும் வெற்றிகரமாகவும் தோன்றுவதால் சேருவது'],
    explanation: 'எந்த டிரேடிங் தளமும் லாபத்தை உத்தரவாதம் செய்ய முடியாது — சந்தைகள் ஏறி இறங்கும். யார் விளம்பரப்படுத்தினாலும், முதலீடு செய்வதற்கு முன் எப்போதும் MAS நிதி நிறுவனங்கள் அடைவை சரிபார்க்கவும்.',
  },
  'inv-04': {
    scenario: 'நிதி ஆலோசகர் என தன்னை அறிமுகப்படுத்தும் ஒருவரிடமிருந்து அழைப்பு வருகிறது, ஒரு நிறுவனம் பொதுச் சந்தையில் பட்டியலிடப்படுவதற்கு முன் அதில் முதலீடு செய்ய பிரத்யேக “பிரீ-ஐபிஓ” வாய்ப்பை வழங்குகிறார், பங்குகள் விரைவில் பெரிதும் மதிப்பு உயரும் என உறுதியளிக்கிறார்.',
    options: ['கோரப்படாத முதலீட்டு அழைப்புகளில் எச்சரிக்கையாக இருந்து, முதலீடு செய்வதற்கு முன் ஆலோசகரின் உரிமத்தையும் நிறுவனத்தின் கூற்றுகளையும் சுயாதீனமாக உறுதிப்படுத்துவது', 'முதலீடு செய்யும் ஒரு நண்பரிடம் இது உண்மையா என்று உறுதிப்படுத்தச் சொல்வது', 'வாய்ப்பை சோதிக்க ஒரு சிறிய “பரிசோதனை” தொகையை முதலீடு செய்வது', '“வாய்ப்பு” முடிவதற்கு முன் விரைவாக முதலீடு செய்வது'],
    explanation: 'உண்மையான முதலீட்டு வாய்ப்புகள் அவசரத்தை உருவாக்கும் கோரப்படாத அழைப்புகள் மூலம் அரிதாகவே வழங்கப்படும். ஆலோசகர் MAS-இல் உரிமம் பெற்றவரா என உறுதிப்படுத்தி, எதையும் முதலீடு செய்வதற்கு முன் நிறுவனத்தை சுயாதீனமாக ஆராயுங்கள்.',
  },
  'inv-05': {
    scenario: 'ஒரு நண்பர் உங்களை ஒரு முதலீட்டு திட்டத்திற்கு அறிமுகப்படுத்துகிறார், அதில் புதிய முதலீட்டாளர்கள் கொண்டு வரும் பணத்திலிருந்து ஆரம்ப முதலீட்டாளர்களுக்கு கவர்ச்சிகரமான வருமானம் வழங்கப்படுகிறது, மேலும் குடும்பத்தினரையும் நண்பர்களையும் சேர்க்குமாறு ஊக்குவிக்கப்படுகிறீர்கள்.',
    options: ['நண்பர் ஏற்கனவே லாபம் பெறுவதால் சேர்ந்து மற்றவர்களை சேர்ப்பது', 'சேர்ந்து, ஆனால் யாரையும் சேர்க்காமல் இருப்பது', 'நண்பர் ஏற்கனவே திரும்பப் பெற்ற தொகையை மட்டும் முதலீடு செய்வது', 'புதிய முதலீட்டாளர்கள் சேர்வதை நிறுத்தியவுடன் சரிந்துவிடும் பொன்சி பாணி திட்டமாக இதை அடையாளம் கண்டு தவிர்ப்பது'],
    explanation: 'பழைய முதலீட்டாளர்களுக்கு புதிய முதலீட்டாளர்களின் பணத்தைக் கொண்டு செலுத்தும் திட்டங்கள் நீடிக்க முடியாதவை, இறுதியில் எப்போதும் சரிந்து, கடைசியாக சேர்ந்தவர்களுக்கு நஷ்டத்தை விட்டுவிடும். இந்த அமைப்பு சிங்கப்பூரில் சட்டவிரோதமானது.',
  },
  'inv-06': {
    scenario: 'SkillsFuture அல்லது CPF-உடன் தொடர்புடைய ஒரு சிறப்பு அரசு திட்டம் உள்ளது என்றும், அதை ஒரு தனியார் கணக்கிற்கு “செயலாக்கத்திற்காக” மாற்றினால் உங்கள் CPF சேமிப்பை இரட்டிப்பாக்கலாம் என்றும் ஒரு அழைப்பாளர் கூறுகிறார், இந்த சலுகை குறிப்பிட்ட காலத்திற்கு மட்டுமே கிடைக்கும் என்கிறார்.',
    options: ['தொலைபேசியை துண்டிப்பது — CPF மற்றும் அரசு திட்டங்கள் ஒருபோதும் உங்கள் சேமிப்பை “இரட்டிப்பாக்க” தனியார் கணக்கிற்கு மாற்றச் சொல்லாது', 'சலுகை முடிவதற்கு முன் விரைவாக CPF சேமிப்பை மாற்றுவது', 'மாற்றுவதற்கு முன் மின்னஞ்சல் மூலம் அதிகாரப்பூர்வ ஆவணங்களைக் கேட்பது', 'வேலை செய்கிறதா என்று சோதிக்க முதலில் ஒரு பகுதியை மாற்றுவது'],
    explanation: 'தனியார் பரிமாற்றம் மூலம் உங்கள் CPF சேமிப்பை இரட்டிப்பாக்கும் சட்டபூர்வ அரசு திட்டம் எதுவும் இல்லை. இது போலி அடையாள-முதலீட்டு மோசடி — CPF-இன் அதிகாரப்பூர்வ வலைத்தளம் அல்லது ஹாட்லைன் மூலம் மட்டுமே உறுதிப்படுத்திக் கொள்ளுங்கள்.',
  },
  'inv-07': {
    scenario: 'உங்கள் அக்கம்பக்கத்தில் QR குறியீட்டுடன் கூடிய போஸ்டர்களை காண்கிறீர்கள், உள்ளூர் வணிகங்களுக்கு ஆதரவளிப்பதாகக் கூறும் ஒரு “சமூக நிதியில்” ஸ்கேன் செய்து முதலீடு செய்தால் நிலையான உயர் வருமானம் என உறுதியளிக்கிறது.',
    options: ['முடிவெடுப்பதற்கு முன் அண்டை வீட்டாரிடம் அவர்கள் முதலீடு செய்துள்ளார்களா எனக் கேட்பது', 'தெரு போஸ்டர்கள் மூலம் விளம்பரப்படுத்தப்படும் முதலீட்டு சலுகைகளில் எச்சரிக்கையாக இருந்து, எதையும் செய்வதற்கு முன் அந்த “நிதி” MAS-ஆல் உரிமம் பெற்றதா எனச் சரிபார்ப்பது', 'வருமானம் எப்படி இருந்தாலும் சமூகத்தை ஆதரிக்க ஒரு சிறிய தொகையை முதலீடு செய்வது', 'இது உள்ளூர் சமூகத்திற்காக என்பதால் QR குறியீட்டை ஸ்கேன் செய்து முதலீடு செய்வது'],
    explanation: 'சட்டபூர்வ முதலீட்டு நிதிகள் QR குறியீட்டுடன் தெரு போஸ்டர்கள் மூலம் விளம்பரப்படுத்தப்படாது. ஸ்கேன் செய்வதற்கு முன் அல்லது பணத்தை மாற்றுவதற்கு முன் எந்த முதலீட்டு வாய்ப்பும் MAS-ஆல் உரிமம் பெற்றதா எனச் சரிபார்க்கவும்.',
  },
  'inv-08': {
    scenario: 'நீங்கள் நேரில் ஒருபோதும் சந்திக்காத ஒரு ஆன்லைன் தொடர்பாளர் வெளிநாட்டு சொத்து முதலீட்டில் ஒரு சிறந்த ஒப்பந்தத்தை வழங்குகிறார், விலை உயருவதற்கு முன் விரைவாக டெபாசிட்டை மாற்ற வேண்டும் என்றும், சொத்தை நேரில் பார்க்க வாய்ப்பு இல்லை என்றும் கூறுகிறார்.',
    options: ['நல்ல விலையை உறுதி செய்ய விரைவாக டெபாசிட்டை மாற்றுவது', 'பாதி டெபாசிட்டை முதலில் மாற்றி, மீதியை பின் முடிவெடுப்பது', 'நேரில் ஆய்வு செய்ய முடியாத சொத்திற்கு விரைவாக பணம் செலுத்த அழுத்தம் தருவதில் எச்சரிக்கையாக இருந்து, முகவரையும் சொத்தையும் சுயாதீனமாக உறுதிப்படுத்துவது', 'பணத்தை மாற்றுவதற்கு முன் சொத்தின் மேலும் புகைப்படங்களைக் கேட்பது'],
    explanation: 'நேரில் உறுதிப்படுத்த முடியாத ஒன்றிற்கு விரைவாக பணம் செலுத்த அழுத்தம் தருவது ஒரு பொதுவான மோசடி உத்தி. எந்த டெபாசிட்டையும் மாற்றுவதற்கு முன் முகவரின் உரிமத்தையும் சொத்தின் இருப்பையும் சுயாதீனமாக உறுதிப்படுத்தவும்.',
  },
  'inv-09': {
    scenario: 'ஒரு சமூக மைய நடவடிக்கையில், ஒருவர் தங்கத்தில் முதலீடு செய்ய உதவுவதாகக் கூறி, சில மாதங்களுக்குப் பிறகு அதிக விலையில் உத்தரவாத மறுவாங்குதலை உறுதியளித்து, எந்த நிறுவனத்தின் மூலமும் இல்லாமல் நேரடியாக அவரிடம் பணத்தை ஒப்படைக்கச் சொல்கிறார்.',
    options: ['பணத்தை ஒப்படைப்பதற்கு முன் கையால் எழுதிய உறுதிமொழி கேட்பது', 'அவர் நட்பாகவும் உத்தரவாத ஒப்பந்தமாகவும் தோன்றுவதால் பணத்தை ஒப்படைப்பது', 'மறுவாங்குதல் உண்மையில் நடக்கிறதா என சோதிக்க குறைந்த தொகையை கொடுப்பது', 'மறுப்பது — உண்மையான தங்க முதலீடு உரிமம் பெற்ற வியாபாரிகள் மூலம், சரியான ரசீதுகளுடன் செய்யப்படுகிறது, ஒரு தனிநபரிடம் நேரடியாக பணம் கொடுப்பதன் மூலம் அல்ல'],
    explanation: 'உரிமம் பெற்ற நிறுவனமோ சரியான ரசீதோ இல்லாமல், ஒரு தனிநபரிடம் நேரடியாக பணத்தை ஒப்படைக்கும் எந்த முதலீடும் அதிக ஆபத்துடையது. அங்கீகரிக்கப்பட்ட, உரிமம் பெற்ற வியாபாரிகள் மூலம் மட்டுமே தங்கத்தில் முதலீடு செய்யுங்கள்.',
  },
  'inv-10': {
    scenario: 'வீடு வீடாக விற்பனை செய்பவர் ஒரு காப்பீட்டு திட்டத்தை முதலீடாகவும் இருக்கும் என வழங்கி, அசாதாரணமாக அதிக உத்தரவாத வருமானத்தை உறுதியளித்து, ஆவணங்களை பார்வையிட விடாமல் அப்போதே ஒப்பந்தத்தில் கையெழுத்திட்டு முதல் பிரீமியத்தை செலுத்த அழுத்தம் தருகிறார்.',
    options: ['வருமானம் கவர்ச்சிகரமாக இருப்பதால் அப்போதே கையெழுத்திட்டு பணம் செலுத்துவது', 'திட்டத்தை சோதிக்க குறைந்த முதல் பிரீமியத்தை செலுத்துவது', 'கையெழுத்திட்டு, அவரது அடுத்த வருகைக்குப் பிறகுதான் பணம் செலுத்துவது', 'அப்போது எதிலும் கையெழுத்திட மறுத்து, ஆவணங்களை பார்வையிட கேட்டு, முகவரும் தயாரிப்பும் MAS-இல் பதிவு செய்யப்பட்டதா என சரிபார்ப்பது'],
    explanation: 'ஆவணங்களை பார்வையிட நேரமின்றி உடனடியாக கையெழுத்திட்டு பணம் செலுத்த அழுத்தம் கொடுப்பது ஒரு பெரிய எச்சரிக்கை அறிகுறி. உண்மையான முகவர்கள் MAS-இல் பதிவு செய்யப்பட்டவர்கள், உறுதி செய்வதற்கு முன் எப்போதும் பாலிசியை பார்வையிட அனுமதிப்பார்கள்.',
  },
  'ecm-01': {
    scenario: 'Carousell-இல் ஒரு புதிய ஏர் ஃப்ரையரை வழக்கமான விலையில் பாதி விலைக்கு காண்கிறீர்கள். விற்பனையாளருக்கு இன்னும் மதிப்பீடுகள் இல்லை, டெலிவரிக்கு முன் தனிப்பட்ட மொபைல் நம்பருக்கு PayNow மூலம் முழு தொகையையும் செலுத்தச் சொல்கிறார், டெலிவரியில் பணம் செலுத்தும் வழி இல்லை.',
    options: ['விற்பனையாளரிடம் மேலும் விலையை குறைக்கச் சொல்வது', 'விற்பனையாளரை மேலும் சரிபார்க்காமல் பாதி முன்பணமாகவும் பாதி டெலிவரிக்குப் பின்னும் செலுத்துவது', 'மதிப்பீடுகள் இல்லாத, பாதுகாப்பு இல்லாமல் முன்கூட்டியே PayNow மட்டும் ஏற்கும் விற்பனையாளர்களிடம் எச்சரிக்கையாக இருந்து, டெலிவரியில் பணம் அல்லது எஸ்க்ரோ வசதியுள்ள தளத்தை பரிசீலிப்பது', 'விலை மிகவும் நல்லதாக இருப்பதால் PayNow மூலம் முழுவதும் செலுத்துவது'],
    explanation: 'பெரிய தள்ளுபடி, மதிப்பீடுகள் இல்லாதது, மற்றும் தனிப்பட்ட நம்பருக்கு முன்கூட்டியே PayNow வலியுறுத்துவது பொதுவான இணைய வணிக மோசடி அறிகுறிகள். வாங்குபவர் பாதுகாப்புள்ள தளங்களை விரும்பி, டெலிவரியில் பணம் செலுத்தும் வழியை தவிர்க்கும் விற்பனையாளர்களிடம் எச்சரிக்கையாக இருங்கள்.',
  },
  'ecm-02': {
    scenario: 'ஒரு பிரபலமான எலக்ட்ரானிக்ஸ் பிராண்ட் “கிடங்கு அகற்றும் விற்பனை” 80% தள்ளுபடியில் நடத்துவதாக ஃபேஸ்புக் விளம்பரம் காட்டுகிறது, அது பிராண்டின் உண்மையான வலைத்தளத்தில் இருந்து சற்று வித்தியாசமாக இருக்கும் தளத்திற்கு இணைக்கிறது, வங்கி பரிமாற்றத்தை மட்டுமே ஏற்றுக்கொள்கிறது.',
    options: ['பிராண்டின் அதிகாரப்பூர்வ தளத்துடன் வலை முகவரியை கவனமாக ஒப்பிட்டு, அறிமுகமில்லாத தளத்திற்கு வங்கி பரிமாற்றம் மூலம் செலுத்துவதை தவிர்ப்பது', 'பொருள் வருகிறதா என்று சோதிக்க முதலில் ஒரு சிறிய டெபாசிட்டை மாற்றுவது', '“விற்பனை” முடிவதற்கு முன் விரைவாக வாங்குவது', 'நண்பர்களும் வாங்க இணைப்பை பகிர்ந்து, பின் முடிவெடுப்பது'],
    explanation: 'போலி வலை முகவரிகளுடனும் வங்கி-பரிமாற்றம்-மட்டும் பணம் செலுத்தும் விதத்துடனும் கூடிய போலி “அகற்றும் விற்பனை” விளம்பரங்கள் பொதுவான இணைய வணிக மோசடி. எப்போதும் URL-ஐ கவனமாக சரிபார்த்து, பாதுகாப்புள்ள பணம் செலுத்தும் முறைகளை விரும்புங்கள்.',
  },
  'ecm-03': {
    scenario: 'ஒரு பார்சல் டெலிவரி செய்ய முடியவில்லை என்றும், சிறிய மறு-டெலிவரி கட்டணம் தேவை என்றும் SMS வருகிறது, செலுத்த ஒரு இணைப்புடன். இணைக்கப்பட்ட பக்கம் அந்த “கட்டணத்தை” செயலாக்க உங்கள் முழு கார்டு எண், காலாவதி தேதி, CVC ஆகியவற்றைக் கேட்கிறது.',
    options: ['இது உண்மையா என்று முதலில் SMS-க்கு பதிலளிப்பது', 'முன்னெச்சரிக்கையாக வேறு கார்டைப் பயன்படுத்தி செலுத்துவது', 'இணைப்பை கிளிக் செய்யாமல் — கூரியர் நிறுவனத்தின் அதிகாரப்பூர்வ ஆப் அல்லது வலைத்தளத்தில் நேரடியாக சரிபார்ப்பது, ஏனெனில் உண்மையான மறு-டெலிவரி அறிவிப்புகள் இப்படி முழு கார்டு விவரங்களைக் கேட்காது', 'சிறிய கட்டணத்தை செலுத்தி பார்சலை பெற கார்டு விவரங்களை உள்ளிடுவது'],
    explanation: 'உண்மையான மறு-டெலிவரி கட்டணங்கள், இருந்தால், கூரியர் நிறுவனத்தின் அதிகாரப்பூர்வ ஆப் அல்லது வலைத்தளம் மூலமே செலுத்தப்படும் — ஒரு உரை செய்தியில் உள்ள இணைப்பு மூலம் முழு கார்டு விவரங்களை உள்ளிடுவதன் மூலம் ஒருபோதும் அல்ல.',
  },
  'ecm-04': {
    scenario: 'ஒரு ஃபேஸ்புக் வாங்கல்-விற்பனை குழுவில், ஒரு பிரபலமான பொருளை அனுப்பும் முன் ஒரு விற்பனையாளர் PayNow மூலம் முழு பணத்தையும் கேட்கிறார். நீங்கள் செலுத்திய பிறகு, விற்பனையாளர் செய்திகளுக்கு பதிலளிப்பதை நிறுத்திவிடுகிறார், அவரது சுயவிவரத்தையும் இனி காண முடியவில்லை.',
    options: ['விற்பனையாளரையும் பரிவர்த்தனையையும் தளத்திற்கும் போலீஸுக்கும் புகாரளிப்பது — எதிர்காலத்தில், மதிப்பீடுகளுள்ள விற்பனையாளர்களையும் வாங்குபவர் பாதுகாப்புள்ள தளங்களையும் விரும்புவது', 'உரையாடலை “தடை நீக்க” கொஞ்சம் மேலும் பணம் செலுத்த முயற்சிப்பது', 'குழுவில் இது பற்றி பதிவிட்டு, விற்பனையாளர் பார்க்கும் வரை காத்திருப்பது', 'தொடர்ந்து செய்தி அனுப்பி, இறுதியில் பதிலளிப்பார் என்று நம்புவது'],
    explanation: 'பணம் பெற்றபின் மோசடி செய்பவர் மறைந்துவிட்டால், செய்தி அனுப்புவதால் பயனில்லை. உடனே புகாரளியுங்கள், எதிர்காலத்தில் தெரியாத விற்பனையாளர்களுக்கு நேரடி PayNow பரிமாற்றத்தை விட வாங்குபவர் பாதுகாப்புள்ள சந்தைகளை விரும்புங்கள்.',
  },
  'ecm-05': {
    scenario: 'ஒரு ஆன்லைன் மருந்தகம் மிகக் குறைந்த விலையில் சுகாதார சப்ளிமெண்ட்களை விளம்பரப்படுத்துகிறது, முழு முன்பணம் தேவை. செலுத்திய பிறகு, புதுப்பிப்புகளுக்கு விற்பனையாளரை தொடர்பு கொள்ள வழியில்லை, பொருட்கள் வரவே இல்லை அல்லது விளம்பரப்படுத்தப்பட்டதிலிருந்து வித்தியாசமாக தெரிகின்றன.',
    options: ['எதையும் சரிபார்க்காமல் முதலில் ஒரு சிறிய தொகையை ஆர்டர் செய்வது', 'அடுத்த முறை வங்கி பரிமாற்றம் மூலம் செலுத்துவது, அது அதிக நம்பகமானதாக இருக்கலாம் என்று', 'அறிமுகமில்லாத ஆன்லைன் சுகாதார பொருள் விற்பனையாளர்களிடமிருந்து வாங்குவதற்கு முன் சரியான வணிக பதிவு, மதிப்பீடுகள், தொடர்பு விவரங்களை சரிபார்ப்பது', 'விலை மிகவும் நல்லதாக இருந்ததால் அது உண்மையாக இருக்க வேண்டும் என்று காத்திருப்பது'],
    explanation: 'சரிபார்க்கக்கூடிய தொடர்பு விவரங்கள் அல்லது பதிவு இல்லாத அசாதாரணமாக குறைந்த விலைகள் ஒரு போலி ஆன்லைன் கடையின் பொதுவான அறிகுறி. குறிப்பாக சுகாதார பொருட்களுக்கு, சரிபார்க்கப்பட்ட, உரிமம் பெற்ற விற்பனையாளர்களிடமிருந்து மட்டுமே வாங்குங்கள்.',
  },
  'ecm-06': {
    scenario: 'சந்தையில் ஒரு தற்காலிக கடையில், உங்கள் வாங்குதலுக்கு பணம் செலுத்த QR குறியீட்டை ஸ்கேன் செய்கிறீர்கள். உங்களுக்கு தெரியாமல், யாரோ ஒரு போலி QR குறியீட்டு ஸ்டிக்கரை கடையின் உண்மையான குறியீட்டின் மேல் ஒட்டியிருந்தார், இதனால் உங்கள் பணம் கடைக்காரருக்கு பதிலாக மோசடி செய்பவருக்கு சென்றது.',
    options: ['இதை முழுவதுமாக தவிர்க்க ஒவ்வொரு முறையும் பணமாகவே செலுத்துவது', 'பாதுகாப்பாக இருக்க வேறு ஆப்பில் மீண்டும் ஸ்கேன் செய்வது', 'பணம் செலுத்துவதை உறுதிப்படுத்தும் முன், பணம் செலுத்தும் ஆப்பில் காட்டப்படும் பெயர் கடைக்காரருடன் பொருந்துகிறதா எனச் சரிபார்த்து, சந்தேகம் இருந்தால் கடைக்காரரிடம் கேட்பது', 'கடையில் காட்டப்பட்ட குறியீட்டை ஸ்கேன் செய்ததால் பரவாயில்லை என்று நினைப்பது'],
    explanation: 'பணம் செலுத்துவதை உறுதிப்படுத்தும் முன், பணம் செலுத்தும் ஆப்பில் காட்டப்படும் பெயர் கடைக்காரருடன் பொருந்துகிறதா என எப்போதும் சரிபார்க்கவும். QR குறியீடு மாற்றுவது உண்மையான, இயற்பியல் கடைகளில் அதிகரித்து வரும் ஒரு மோசடி.',
  },
  'ecm-07': {
    scenario: 'ஒரு ஆன்லைன் சந்தையில் ஒரு வாங்குபவர் அதிக மதிப்புள்ள பொருளுக்கு “பாதி வழியில் சந்திக்க” முன்வருகிறார், ஆனால் சந்திப்பு நேரம் அல்லது இடத்தை ஒப்புக்கொள்வதற்கு முன் ஒரு கண்காணிக்க முடியாத பணம் செலுத்தும் ஆப் மூலம் முழு பணத்தையும் முதலில் மாற்ற வலியுறுத்துகிறார்.',
    options: ['உடனடியாக சந்திக்கும் சிரமத்தை தவிர்க்க முதலில் பணத்தை ஏற்றுக்கொள்வது', 'கண்காணிக்க முடியாத ஆப்கள் மூலம் முதலில்-பணம் கோரிக்கைகளில் எச்சரிக்கையாக இருந்து, பதிலாக பாதுகாப்பான, பொது இடத்தில் சந்தித்து பணம் கையளிப்பதை விரும்புவது', 'அதே ஆப் மூலம் முதலில் ஒரு சிறிய டெபாசிட்டைக் கேட்பது', 'ஏற்றுக்கொண்டு, ஆனால் முதலில் பணம் செலுத்திய ஸ்கிரீன்ஷாட்டை அனுப்பச் சொல்வது'],
    explanation: 'சந்திப்பு ஏற்பாடு செய்யப்படுவதற்கு முன் கண்காணிக்க முடியாத பணம் செலுத்துதலை வலியுறுத்துவது ஒரு பொதுவான மோசடி அமைப்பு. பணம் கையளிக்கும் நேரத்தில் செலுத்தப்படும் பாதுகாப்பான, பொது சந்திப்புகளை விரும்புங்கள்.',
  },
  'ecm-08': {
    scenario: 'ஒரு வேலை விளம்பரம் நல்ல ஊதியத்துடன் வீட்டிலிருந்து எளிதான பகுதி நேர பேக்கிங் வேலையை வழங்குகிறது, ஆனால் தொடக்க கிட் பெறவும் ஊதிய பட்டியலில் சேர்க்கவும் முதலில் ஒரு “பதிவு” அல்லது “டெபாசிட்” கட்டணத்தை செலுத்தச் சொல்கிறது.',
    options: ['வழங்கப்படும் ஊதியம் கவர்ச்சிகரமாக இருப்பதால் கட்டணத்தை செலுத்துவது', 'குறைந்த டெபாசிட்டை செலுத்தி, வேலை உண்மையானதா என்று பார்ப்பது', 'எச்சரிக்கையாக இருப்பது — உண்மையான முதலாளிகள் வேலை தொடங்குவதற்கு முன் ஊழியர்களிடம் முன்கூட்டிய கட்டணங்களை கேட்க மாட்டார்கள், இது ஒரு பொதுவான வேலை மோசடி', 'முதல் ஊதியத்திலிருந்து இந்த கட்டணத்தை கழிக்கச் சொல்வது'],
    explanation: 'உண்மையான முதலாளி ஒருபோதும் புதிய பணியாளரிடம் வேலை தொடங்க முன்கூட்டியே பணம் கேட்க மாட்டார். ஆரம்ப கட்டணம் அல்லது டெபாசிட் தேவைப்படும் எந்த வேலை வாய்ப்பும் மோசடியாக இருக்கக்கூடும் என கருதப்பட வேண்டும்.',
  },
  'ecm-09': {
    scenario: 'நல்ல விலைகள், பாதுகாப்பு பேட்ஜ்கள், வாடிக்கையாளர் மதிப்பீடுகளுடன் தொழில்முறையாகத் தெரியும் ஒரு எலக்ட்ரானிக்ஸ் கடை வலைத்தளத்தை காண்கிறீர்கள். செலுத்திய பிறகு, பொருட்கள் ஒருபோதும் வரவில்லை, வாடிக்கையாளர் சேவை பதிலளிக்கவில்லை, இறுதியில் முழு வலைத்தளமும் மறைந்துவிடுகிறது.',
    options: ['தளத்திற்கு வெளியே சுயாதீன மதிப்பீடுகளை சரிபார்த்து, அறிமுகமில்லாத வலைத்தளங்களிலிருந்து வாங்கும்போது வாங்குபவர் பாதுகாப்புள்ள பணம் செலுத்தும் முறைகளைப் பயன்படுத்துவது', 'விரைவான செயலாக்கத்திற்காக அடுத்த முறை வங்கி பரிமாற்றம் மூலம் செலுத்துவது', 'இந்த முறை வேலை செய்கிறதா என்று பார்க்க அதே தளத்தில் மீண்டும் ஆர்டர் செய்வது', 'வலைத்தளம் தொழில்முறையாகவும் நம்பகமாகவும் தெரிந்ததால் காத்திருப்பது'],
    explanation: 'தொழில்முறையாகத் தெரியும் வலைத்தளம் நம்பகத்தன்மையை உறுதிசெய்யாது — மோசடி தளங்கள் நம்பிக்கை பேட்ஜ்களையும் போலி மதிப்பீடுகளையும் நகலெடுக்க முடியும். சுயாதீன மதிப்பீடுகளைத் தேடி, வாங்குபவர் பாதுகாப்பை வழங்கும் பணம் செலுத்தும் முறைகளைப் பயன்படுத்துங்கள்.',
  },
  'ecm-10': {
    scenario: 'நீங்கள் ஆன்லைனில் ஒரு பொருளை விற்கிறீர்கள், ஒரு “வாங்குபவர்” அதிகமாக செலுத்தியதை காட்டும் பணம் செலுத்திய ஸ்கிரீன்ஷாட்டை அனுப்புகிறார், பின்னர் பணம் உண்மையில் உங்கள் சொந்த கணக்கில் வந்து சேர்ந்ததா என்று நீங்கள் சரிபார்க்கும் முன், வித்தியாசத்தை மற்றொரு கணக்கிற்கு திருப்பித் தரும்படி அவசரமாகக் கேட்கிறார்.',
    options: ['சமரசமாக பாதி தொகையை திருப்பித் தருவது', 'எதையும் திருப்பித் தருவதற்கு முன், பணம் உண்மையில் வந்து சேர்ந்ததா என்று உங்கள் சொந்த வங்கிக் கணக்கு அல்லது ஆப்பில் உறுதிப்படுத்துவது', 'அவர்கள் ஏற்கனவே பணம் செலுத்திய ஆதாரத்தை அனுப்பியிருப்பதால் வித்தியாசத்தை விரைவாக திருப்பித் தருவது', 'திருப்பித் தருவதற்கு முன் தெளிவான ஸ்கிரீன்ஷாட்டை அனுப்பச் சொல்வது'],
    explanation: 'ஸ்கிரீன்ஷாட்களை போலியாக்க முடியும். எதையும் திருப்பித் தருவதற்கு முன், பணம் உண்மையிலேயே உங்கள் சொந்த கணக்கில் வந்து சேர்ந்துள்ளதா என எப்போதும் உறுதிப்படுத்திக் கொள்ளுங்கள் — இந்த அதிக-பணம்-செலுத்தும் தந்திரம் ஆன்லைன் விற்பனையாளர்களை இலக்காகக் கொண்ட ஒரு பொதுவான மோசடி.',
  },
};

const QUESTION_TRANSLATIONS = { zh, ms, ta };

/**
 * Returns a translated copy of a question for display, falling back to the
 * English original for any field (or the whole question) that has no
 * translation yet. `correctIndex` and `category` are never translated —
 * they're scoring/analytics data, not display text — so callers should keep
 * using the original question object for those.
 */
export function translateQuestion(question, lang) {
  if (lang === DEFAULT_LANGUAGE) return question;
  const dict = QUESTION_TRANSLATIONS[lang];
  const t = dict?.[question.id];
  if (!t) return question; // no translation yet — show English rather than break
  return {
    ...question,
    scenario: t.scenario ?? question.scenario,
    options: t.options ?? question.options,
    explanation: t.explanation ?? question.explanation,
  };
}
