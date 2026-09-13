/**
 * Quiz content — Singapore scam scenarios for senior players.
 *
 * 50 questions across 5 scam categories seniors in Singapore are most often
 * hit by (10 questions each):
 *   impersonation  🎭  bank officer / government official / family member
 *   blessing       🙏  stranger claims to remove a curse or "double your money"
 *   love           💕  online relationship builds over weeks, then asks for money
 *   investment     📈  high returns promised via a "trusted" contact
 *   ecommerce      🛍️  fake or too-good-to-be-true online purchases
 *
 * To add more scenarios later, just push more objects into QUESTIONS below —
 * nothing else needs to change. Keep `category` to one of the five keys
 * above so per-category analytics keeps working, and give every new
 * question a unique, permanent `id` (see the note on ids below).
 *
 * Shape:
 *   {
 *     category: 'impersonation' | 'blessing' | 'love' | 'investment' | 'ecommerce',
 *     id: 'imp-01',              // stable, unique — see below
 *     scenario: 'The situation described to the player',
 *     options: ['choice A', 'choice B', 'choice C', 'choice D'],
 *     correctIndex: 0,           // index into options[]
 *     explanation: 'Why that answer is right, shown after they answer',
 *   }
 *
 * `id` must be unique and must NEVER be reused or reassigned — every answer
 * saved to Firestore records it, and the translation files in i18n.js key
 * off it too, so changing an id silently breaks both the analytics link and
 * the translation lookup for that question. Convention is a three-letter
 * category prefix plus a number: imp-01, luv-03, ecm-02.
 *
 * IMPORTANT — don't give the answer away: the player is never shown which
 * scam category a question belongs to until after they've answered. Naming
 * the category up front ("Love Scam") tells them what to look for and makes
 * the question far easier than the real situation would be. Keep the
 * category out of the `scenario` text too.
 */

export const CATEGORIES = {
  impersonation: {
    label: 'Impersonation',
    emoji: '🎭',
    icon: '/assets/kps/categories/impersonation.png',
    color: '#dbeafe',
    colorDark: '#1d4ed8',
  },
  blessing: {
    label: 'Blessing Scam',
    emoji: '🙏',
    icon: null,
    color: '#ede9fe',
    colorDark: '#6d28d9',
  },
  love: {
    label: 'Love Scam',
    emoji: '💕',
    icon: '/assets/kps/categories/love.png',
    color: '#ffe4ef',
    colorDark: '#be185d',
  },
  investment: {
    label: 'Investment Scam',
    emoji: '📈',
    icon: '/assets/kps/categories/investment.png',
    color: '#fef3c7',
    colorDark: '#b45309',
  },
  ecommerce: {
    label: 'E-commerce Scam',
    emoji: '🛍️',
    icon: '/assets/kps/categories/ecommerce.png',
    color: '#ffe4d6',
    // #c2410c only reached 4.27:1 on this tint — below the WCAG AA 4.5
    // threshold. Keep new categories' colorDark at 4.5:1 or better.
    colorDark: '#9a3412',
  },
};

export const QUESTIONS = [
  {
    category: 'impersonation',
    id: 'imp-01',
    scenario:
      'A caller says he is a police officer investigating a case linked to your bank account, which has been used for “money laundering”. He tells you to transfer your savings to a “safe account” while investigations continue.',
    options: [
      'Ask the caller for his badge number and transfer once he gives it',
      'Transfer the money quickly since the police are already investigating',
      'Hang up and call the police hotline (1800-255-0000) yourself to check',
      'Withdraw cash and wait for someone to collect it, as instructed',
    ],
    correctIndex: 2,
    explanation:
      'The real police will never ask you to transfer money to a “safe account” or hand over cash to a stranger. Hang up and verify by calling the police hotline yourself.',
  },
  {
    category: 'impersonation',
    id: 'imp-02',
    scenario:
      'Your “grandson” messages you on WhatsApp from a new number saying he lost his phone and urgently needs $2,000 transferred to a friend’s account to pay for something before he can call you back.',
    options: [
      'Call your grandson on his old number or ask another family member to confirm it’s really him',
      'Ask him to prove it by sending a photo of his NRIC over WhatsApp',
      'Transfer the money immediately since he sounds urgent',
      'Reply on WhatsApp asking “Are you sure?” and transfer if he says yes',
    ],
    correctIndex: 0,
    explanation:
      'Scammers often message from a new number pretending to be a relative in urgent need. Always verify by calling the family member directly on a known number before sending anything.',
  },
  {
    category: 'impersonation',
    id: 'imp-03',
    scenario:
      'A caller claims to be from SingPost customs, saying a parcel with your name has illegal items inside and you owe a fine. He tells you to pay immediately using gift cards from a convenience store to avoid arrest.',
    options: [
      'Pay half in gift cards and ask for more time for the rest',
      'Ask for a case number first, then buy the gift cards',
      'Buy the gift cards and read out the codes over the phone',
      'Hang up — SingPost and customs never collect fines through gift cards, and this is a scam',
    ],
    correctIndex: 3,
    explanation:
      'No government agency or courier ever asks for payment in gift cards. This is one of the most common impersonation scam tactics — hang up and ignore any such request.',
  },
  {
    category: 'impersonation',
    id: 'imp-04',
    scenario:
      'You get an SMS that looks like it’s from your bank, warning that unusual activity was detected on your account and asking you to click a link to verify your details immediately or your account will be suspended.',
    options: [
      'Forward the SMS to a friend to ask if they got one too before deciding',
      'Delete the SMS and log in only via the bank’s official app or website, typed in yourself',
      'Reply to the SMS asking if it’s genuine',
      'Click the link and log in to check if it’s true',
    ],
    correctIndex: 1,
    explanation:
      'Banks don’t ask you to verify your account through a link in an SMS. Never click links in unexpected messages — go directly to the official app or website instead.',
  },
  {
    category: 'impersonation',
    id: 'imp-05',
    scenario:
      'A caller claiming to be from IRAS says you have unpaid taxes and a warrant of arrest has been issued. He says you can avoid arrest today by transferring the amount immediately to a bank account he provides.',
    options: [
      'Transfer the money right away to avoid being arrested',
      'Negotiate for a lower amount over the phone before paying',
      'Ask a family member to transfer instead so you’re not directly involved',
      'Hang up and check your tax status yourself on the official IRAS website or hotline',
    ],
    correctIndex: 3,
    explanation:
      'IRAS does not call to demand instant payment to avoid arrest. Government agencies communicate through official letters, not urgent phone threats — verify independently before doing anything.',
  },
  {
    category: 'impersonation',
    id: 'imp-06',
    scenario:
      'Someone calling from your mobile network says your SIM card has been compromised and hackers may access your bank accounts. He asks you to read out the one-time password (OTP) just sent to your phone so he can “secure” your line.',
    options: [
      'Read out the OTP quickly so he can fix it before hackers get in',
      'Share the OTP but ask him to confirm his staff number first',
      'Refuse to share the OTP and hang up — telcos never ask for your OTP',
      'Ask him to call back later and share the OTP then instead',
    ],
    correctIndex: 2,
    explanation:
      'An OTP is meant only for you. No telco or bank staff will ever ask you to read one out over the phone — doing so lets a scammer straight into your account.',
  },
  {
    category: 'impersonation',
    id: 'imp-07',
    scenario:
      'A caller claims to be from the CPF Board and says your CPF account has been linked to a money laundering case. He asks you to transfer your CPF savings to a “monitoring account” so it can be verified and protected.',
    options: [
      'Transfer your CPF savings to the account he provides',
      'Transfer a small amount first to see if it is safe',
      'Hang up — CPF Board never asks you to transfer money out of your CPF account over the phone',
      'Ask him to email you the instructions first, then transfer',
    ],
    correctIndex: 2,
    explanation:
      'CPF Board will never call asking you to transfer your CPF savings elsewhere. This is an impersonation scam — hang up and verify by calling CPF’s official hotline yourself.',
  },
  {
    category: 'impersonation',
    id: 'imp-08',
    scenario:
      'You receive a call saying your grandson has been detained overseas by immigration authorities and needs money wired immediately for a lawyer and bail, and that you must not tell anyone in the family or it will “complicate the case”.',
    options: [
      'Hang up and call your grandson or another family member directly to check if it’s true',
      'Ask the caller to send an official detention letter by email before deciding',
      'Wire a smaller amount first to buy time',
      'Wire the money quickly and keep it secret as instructed',
    ],
    correctIndex: 0,
    explanation:
      'Being told to keep it secret from family is a major warning sign — scammers isolate you so no one can check the story. Always verify directly with family first.',
  },
  {
    category: 'impersonation',
    id: 'imp-09',
    scenario:
      'You receive a letter claiming to be from a lawyer overseas saying a distant relative you’ve never heard of has left you a large inheritance, but you must pay a “processing fee” first to release the funds.',
    options: [
      'Pay the processing fee since the inheritance is worth much more',
      'Reply asking for more details about the relative first',
      'Ignore the letter — genuine inheritances don’t require you to pay money upfront to receive them',
      'Ask a lawyer here to negotiate a smaller processing fee',
    ],
    correctIndex: 2,
    explanation:
      'Legitimate inheritances are handled by the courts and never require the beneficiary to pay a fee upfront. This is a classic advance-fee scam — ignore it.',
  },
  {
    category: 'impersonation',
    id: 'imp-10',
    scenario:
      'A caller claiming to be from a well-known tech company says your computer is sending out virus alerts and offers to fix it remotely if you install an app he sends you, then asks for payment for the “repair”.',
    options: [
      'Hang up — tech companies don’t call you first about virus alerts, and never install remote-access apps from unknown callers',
      'Let him access your computer but don’t give payment details yet',
      'Install the app and pay for the repair to fix the virus quickly',
      'Ask him to prove he’s from the company by giving his employee ID first',
    ],
    correctIndex: 0,
    explanation:
      'Genuine tech companies don’t cold-call about virus alerts. Installing remote-access software for a stranger can let them see everything on your computer, including banking details.',
  },
  {
    category: 'blessing',
    id: 'bls-01',
    scenario:
      'An elderly stranger approaches you and says your family has bad luck because of a curse, and offers to “cleanse” your gold jewellery and cash by praying over them — but you must hand the items over first.',
    options: [
      'Agree, but ask them to do the ritual in front of you first',
      'Hand over the jewellery and cash so the curse can be removed',
      'Politely decline and walk away — no one can remove a curse by taking your valuables',
      'Give only the jewellery, keep the cash',
    ],
    correctIndex: 2,
    explanation:
      'This is a classic blessing scam. Once your valuables leave your hands, they are gone. Genuine religious or spiritual help never requires handing over your cash or jewellery.',
  },
  {
    category: 'blessing',
    id: 'bls-02',
    scenario:
      'A “temple medium” calls and says your health problems are caused by evil spirits. She offers to double your money through a special ritual if you first transfer your savings to her for “blessing”.',
    options: [
      'Ask a family member to transfer on your behalf instead',
      'Hang up — no ritual can double your money, and this is a scam',
      'Transfer a small amount first to test if it really doubles',
      'Meet her in person and pay in cash so it feels safer',
    ],
    correctIndex: 1,
    explanation:
      'No ritual, blessing, or medium can “double” your money. Any request to send money to have it multiplied or blessed is a scam — hang up and do not engage further.',
  },
  {
    category: 'blessing',
    id: 'bls-03',
    scenario:
      'A person dressed as a monk comes to your door collecting donations for a temple, and after praising your generosity and “good fortune”, insists you should give a much larger amount than usual to “match your blessed fate”.',
    options: [
      'Give the larger amount since he says you\'re blessed with good fortune',
      'Give the amount but ask for it back if he can\'t prove he\'s a real monk',
      'Ask him to come back later with a receipt book before deciding',
      'Politely decline the extra pressure and only give what you\'re comfortable with, or nothing, to a registered charity instead',
    ],
    correctIndex: 3,
    explanation:
      'Genuine religious organisations don\'t pressure people into larger donations using flattery. If you want to donate, do so to a registered charity you\'ve verified yourself.',
  },
  {
    category: 'blessing',
    id: 'bls-04',
    scenario:
      'A stranger at the market offers to read your palm for free, then suddenly looks worried and says a serious disaster will happen to your family soon — unless you buy a special protective charm from her right now.',
    options: [
      'Buy a cheaper charm just in case it\'s true',
      'Buy the charm immediately to protect your family',
      'Ask her to lower the price before buying',
      'Walk away — this is a common pressure tactic, and a real warning wouldn\'t be sold as a charm',
    ],
    correctIndex: 3,
    explanation:
      'This is a classic pressure tactic: create fear, then sell a “solution”. No genuine reading predicts disaster that\'s conveniently fixed by buying something on the spot.',
  },
  {
    category: 'blessing',
    id: 'bls-05',
    scenario:
      'At a hawker centre, a woman tells you she can sense that your son is in serious danger, and offers to pray for his safety — but says the prayer only works if you pay her an increasing amount each time you meet.',
    options: [
      'Recognise this as a scam preying on your worry for your child, and stop paying and walk away',
      'Ask her to prove it by calling your son right there',
      'Keep paying more each time to protect your son',
      'Pay once more, then stop if nothing changes',
    ],
    correctIndex: 0,
    explanation:
      'Scammers often target a parent\'s love and worry for their children. Genuine prayer or blessing is never sold with an ever-increasing price tag — walk away.',
  },
  {
    category: 'blessing',
    id: 'bls-06',
    scenario:
      'You get a phone call from someone claiming to represent a temple, saying your ancestors are “unhappy” and causing bad luck in your family, and that a special prayer costing a specific sum of money must be done urgently to fix it.',
    options: [
      'Hang up — no legitimate temple calls out of the blue demanding money to “fix” ancestor unhappiness',
      'Negotiate the price down before paying',
      'Transfer the money quickly so your ancestors won\'t cause more bad luck',
      'Ask a family member to verify with the temple directly by calling the number given',
    ],
    correctIndex: 0,
    explanation:
      'Real temples don\'t cold-call demanding money for ancestor-related prayers. If concerned, visit or call a temple you already know and trust, using a number you look up yourself.',
  },
  {
    category: 'blessing',
    id: 'bls-07',
    scenario:
      'A small group performs a blessing ritual on the street and hands you a red packet, saying you must “return the blessing” with a donation. You give a small amount, but they insist a much larger transfer is needed for the blessing to be “complete”.',
    options: [
      'Give a little more, but firmly refuse anything beyond that',
      'Transfer the larger amount so the blessing isn\'t left incomplete',
      'Ask them to write down how the money will be used before paying more',
      'Walk away — a real blessing isn\'t a financial transaction with escalating demands',
    ],
    correctIndex: 3,
    explanation:
      'Escalating demands after an initial small payment is a common street scam pattern. There\'s no such thing as an “incomplete” blessing that requires more money — walk away.',
  },
  {
    category: 'blessing',
    id: 'bls-08',
    scenario:
      'A self-proclaimed feng shui master offers a free home inspection, then tells you there are bad spirits in your house that can only be removed by purchasing specific expensive items or crystals that he happens to be selling.',
    options: [
      'Buy the items he recommends to remove the bad spirits',
      'Decline — a real feng shui consultation shouldn\'t require buying specific pricey items from the consultant himself',
      'Ask him to remove the spirits for free since you\'re a senior',
      'Buy a cheaper version of the item instead',
    ],
    correctIndex: 1,
    explanation:
      'Be wary whenever the person diagnosing a problem is also the one selling the expensive solution. This conflict of interest is a common way to pressure people into buying unnecessary items.',
  },
  {
    category: 'blessing',
    id: 'bls-09',
    scenario:
      'A caller says your lottery numbers are “cursed” with bad luck and offers to cleanse them through a ritual exchange — you hand over your cash to be “blessed” and get it back doubled, but the money returned turns out to be fake.',
    options: [
      'Do it, but only with old, unwanted notes',
      'Refuse — no ritual can bless or double money, and handing over real cash for an “exchange” risks losing it entirely',
      'Ask for the blessed money to be checked by a bank first',
      'Try it once with a small amount to test if it\'s real',
    ],
    correctIndex: 1,
    explanation:
      'This exchange trick is designed to swap your real money for fake notes during the “ritual”. No blessing changes the value of money — never hand over cash for such an exchange.',
  },
  {
    category: 'blessing',
    id: 'bls-10',
    scenario:
      'A man dressed as a monk at your doorstep offers you a charm bracelet for “protection” and insists on a large donation in return, becoming pushy and uncomfortable when you try to say you\'re not interested.',
    options: [
      'Take the bracelet and promise to pay him next time',
      'Firmly say no and close the door; call a neighbour or security if he won\'t leave',
      'Give in and pay to make him leave',
      'Offer a much smaller amount to end the conversation',
    ],
    correctIndex: 1,
    explanation:
      'Genuine religious donations are never forced. Aggressive or pushy behaviour when you decline is itself a warning sign — stand firm and get help if someone won\'t leave.',
  },
  {
    category: 'love',
    id: 'luv-01',
    scenario:
      'You have been chatting for two months with someone you met online who says he’s an engineer working overseas. He has never video called you, and now says he needs money urgently for a “customs fee” to fly to Singapore to meet you.',
    options: [
      'Send half the amount to show you trust him',
      'Insist on a live video call first, and refuse to send money to someone you’ve never actually seen or met',
      'Send the money — he’s been so caring in your chats',
      'Ask him to send a photo holding today’s newspaper as proof',
    ],
    correctIndex: 1,
    explanation:
      'Avoiding video calls and asking for money for “fees” before ever meeting are classic love scam signs. Genuine partners won’t repeatedly avoid a live video call or ask for money to “fly over”.',
  },
  {
    category: 'love',
    id: 'luv-02',
    scenario:
      'Your new online partner introduces you to a “friend” who works at an investment company, and suggests you both put money into a trading platform “together” to build your future.',
    options: [
      'Recognise this as a common love-and-investment scam combo, and decline to invest through anyone you’ve only met online',
      'Join the platform since your partner recommended it',
      'Invest a small amount just to see the relationship’s intentions',
      'Ask your partner to invest first, then you’ll follow',
    ],
    correctIndex: 0,
    explanation:
      'Online partners who introduce “investment opportunities” are one of the most common scam patterns in Singapore. Never invest money based on a recommendation from someone you’ve only met online.',
  },
  {
    category: 'love',
    id: 'luv-03',
    scenario:
      'Someone you matched with on a dating app says he\'s a US military officer stationed overseas and wants to send you a valuable gift package, but you\'re told to pay a “customs clearance fee” before it can be delivered.',
    options: [
      'Ask him to reduce the fee before paying',
      'Pay the customs fee so the gift can be delivered',
      'Pay half the fee and see if the gift arrives',
      'Refuse — real gifts don\'t require the recipient to pay customs fees, and this is a common scam script',
    ],
    correctIndex: 3,
    explanation:
      'The “military officer sending a gift that needs a customs fee” story is one of the most common romance scam scripts. No genuine gift requires you to pay to receive it.',
  },
  {
    category: 'love',
    id: 'luv-04',
    scenario:
      'Your online partner of a few weeks suddenly messages that they\'ve been in an accident and urgently need money for emergency surgery overseas, saying they have no one else to turn to and will pay you back once they recover.',
    options: [
      'Send a small amount first as a show of good faith',
      'Ask their friend (whom you\'ve also never met) to confirm before sending',
      'Send the money immediately since it\'s a medical emergency',
      'Be cautious — verify through a video call and independent means before sending money to someone you\'ve never met in person',
    ],
    correctIndex: 3,
    explanation:
      'Sudden medical emergencies are a common pressure tactic in romance scams. Verify independently — through a live video call, or by contacting a hospital directly — before sending any money.',
  },
  {
    category: 'love',
    id: 'luv-05',
    scenario:
      'Your online partner says their bank account isn\'t working in their country and asks you to instead buy iTunes or Google Play gift cards and send the codes as a way to help them with money.',
    options: [
      'Ask them to explain more about the bank issue before deciding',
      'Buy the gift cards and send the codes as requested',
      'Refuse — asking for payment in gift card codes is a major scam red flag no legitimate person would ever use',
      'Send a smaller value gift card to be safe',
    ],
    correctIndex: 2,
    explanation:
      'No legitimate transaction, romantic or otherwise, is done through gift card codes. This is one of the clearest signs of a scam — refuse and stop communicating.',
  },
  {
    category: 'love',
    id: 'luv-06',
    scenario:
      'You\'ve been chatting for months with someone online who always has an excuse for why they can\'t meet in person or video call. Recently, they\'ve started asking to “borrow” money for various emergencies, promising to pay it all back when you finally meet.',
    options: [
      'Ask for a written IOU before lending more',
      'Recognise the repeated excuses to avoid meeting as a red flag, and stop sending money',
      'Keep lending money since you trust them after months of chatting',
      'Lend a small, fixed amount only, and stop after that',
    ],
    correctIndex: 1,
    explanation:
      'Time spent chatting doesn\'t prove someone is who they say they are. Repeatedly avoiding video calls or meetings while asking for money is one of the clearest romance scam patterns.',
  },
  {
    category: 'love',
    id: 'luv-07',
    scenario:
      'Your online partner says they run an import/export business and asks you to receive payments from their “clients” into your bank account, then transfer the money onward to them, offering you a small fee for helping.',
    options: [
      'Agree to help since you\'ll earn a small fee for the favour',
      'Do it once to see if it\'s legitimate, then decide',
      'Refuse — this can make you a “money mule” for scammed or laundered funds, which is a crime even if you didn\'t know',
      'Ask for the client\'s contact details first before agreeing',
    ],
    correctIndex: 2,
    explanation:
      'Letting money pass through your account for someone else can make you legally responsible as a money mule, even unknowingly. Never let your bank account be used this way.',
  },
  {
    category: 'love',
    id: 'luv-08',
    scenario:
      'Your online partner sends a photo of themselves lying in what looks like a hospital bed, saying they urgently need money wired today for treatment, and that they\'ll explain everything once they recover.',
    options: [
      'Wire a partial amount and ask for the rest later',
      'Be skeptical — photos can be taken from anywhere online, and verify through a live video call before sending anything',
      'Wire the money right away given the photo evidence',
      'Ask for a hospital name, then wire the money without checking further',
    ],
    correctIndex: 1,
    explanation:
      'A photo alone proves nothing — images are easily copied from the internet. Always verify independently, ideally through a live video call, before sending money for a claimed emergency.',
  },
  {
    category: 'love',
    id: 'luv-09',
    scenario:
      'An online partner you\'ve been chatting with asks you to share intimate photos, then afterwards threatens to send them to your family and friends unless you pay a large sum of money.',
    options: [
      'Try to negotiate a lower amount',
      'Pay the money to stop them from sharing the photos',
      'Delete your accounts and hope they lose interest',
      'Do not pay — contact the police, as this is a crime, and paying often doesn\'t stop further demands',
    ],
    correctIndex: 3,
    explanation:
      'Paying rarely ends sextortion — it often leads to repeated demands. Stop all contact, keep evidence of the messages, and report it to the police straight away.',
  },
  {
    category: 'love',
    id: 'luv-10',
    scenario:
      'An online partner claims to be a widow or widower with a young child overseas, and says the child has had a medical emergency, asking you to wire money urgently since they can\'t access their own funds right now.',
    options: [
      'Recognise the emotional appeal involving a “child in danger” as a common scam tactic, and verify independently before sending anything',
      'Wire a small amount as a gesture of goodwill',
      'Wire the money immediately to help the child',
      'Ask for the child\'s photo before deciding',
    ],
    correctIndex: 0,
    explanation:
      'Scammers often invent a vulnerable child to create urgency and guilt. However heartfelt the story sounds, verify independently — through a video call or another trusted source — before sending money.',
  },
  {
    category: 'investment',
    id: 'inv-01',
    scenario:
      'A former schoolmate adds you to a WhatsApp group where members share screenshots of huge profits from a cryptocurrency platform, and encourages everyone to “join early” with a guaranteed 20% monthly return.',
    options: [
      'Ask the group admin for more proof, then invest the amount they suggest',
      'Be cautious — guaranteed high returns with no risk is a major red flag, even if a friend recommends it',
      'Join immediately — your schoolmate wouldn’t lie to you',
      'Invest a small “test” amount to see if the profit screenshots are real',
    ],
    correctIndex: 1,
    explanation:
      'No legitimate investment can guarantee high monthly returns with no risk. Scammers often use a trusted contact’s WhatsApp or social media to make the scheme look credible — verify with MAS before ever investing.',
  },
  {
    category: 'investment',
    id: 'inv-02',
    scenario:
      'You see a Facebook ad featuring a well-known local TV personality “endorsing” an investment app that promises to turn $500 into $5,000 in a month. The app asks you to top up more funds before you can withdraw your “profits”.',
    options: [
      'Top up more funds since your profits are already showing in the app',
      'Ask the app’s customer service chat to prove it’s legitimate',
      'Withdraw a small amount first, then top up if it works',
      'Recognise the fake celebrity endorsement and “pay to withdraw” request as scam signs, and stop immediately',
    ],
    correctIndex: 3,
    explanation:
      'Fake celebrity endorsements and apps that ask you to “top up” before you can withdraw your own profits are hallmark signs of an investment scam. Check the MAS Financial Institutions Directory before investing anywhere.',
  },
  {
    category: 'investment',
    id: 'inv-03',
    scenario:
      'An Instagram influencer promotes an unlicensed forex trading platform, showing screenshots of huge daily profits and saying anyone can join with a small starting amount and “guaranteed” returns.',
    options: [
      'Check if the platform is licensed by MAS before considering it, and be wary of “guaranteed” returns, which don\'t exist in real trading',
      'Ask the influencer for more proof before joining',
      'Start with the smallest amount just to try it out',
      'Join because the influencer seems trustworthy and successful',
    ],
    correctIndex: 0,
    explanation:
      'No trading platform can guarantee profits — markets go up and down. Always check the MAS Financial Institutions Directory before investing, regardless of who is promoting it.',
  },
  {
    category: 'investment',
    id: 'inv-04',
    scenario:
      'You receive a call from someone claiming to be a financial advisor, offering you an exclusive “pre-IPO” opportunity to invest in a company before it goes public, promising the shares will multiply in value very soon.',
    options: [
      'Be cautious of unsolicited investment calls and verify the advisor\'s license and the company\'s claims independently before investing',
      'Ask a friend who also invests to confirm it\'s real',
      'Invest a small “trial” amount to test the opportunity',
      'Invest quickly before the “opportunity” closes',
    ],
    correctIndex: 0,
    explanation:
      'Genuine investment opportunities are rarely offered through unsolicited cold calls creating urgency. Verify the advisor is licensed with MAS and research the company independently before investing anything.',
  },
  {
    category: 'investment',
    id: 'inv-05',
    scenario:
      'A friend introduces you to an investment scheme where early investors are paid attractive returns from the money brought in by newer investors, and you\'re encouraged to recruit family and friends to join too.',
    options: [
      'Join and recruit others since your friend is already earning from it',
      'Join but don\'t recruit anyone else',
      'Invest only the amount your friend has already earned back',
      'Recognise this as a Ponzi-style scheme that collapses once new investors stop joining, and avoid it',
    ],
    correctIndex: 3,
    explanation:
      'Schemes that pay old investors using new investors\' money are unsustainable and always collapse eventually, leaving the latest investors with the losses. This structure is illegal in Singapore.',
  },
  {
    category: 'investment',
    id: 'inv-06',
    scenario:
      'A caller claims there is a special government scheme linked to SkillsFuture or CPF that can double your CPF savings if you transfer them to a private account “for processing”, saying the offer is only available for a limited time.',
    options: [
      'Hang up — CPF and government schemes never ask you to transfer your savings to a private account to “double” them',
      'Transfer your CPF savings quickly before the offer ends',
      'Ask for official documents by email before transferring',
      'Transfer a portion first to test if it works',
    ],
    correctIndex: 0,
    explanation:
      'There is no legitimate government scheme that doubles your CPF savings through a private transfer. This is an impersonation-investment scam — verify only through CPF\'s official website or hotline.',
  },
  {
    category: 'investment',
    id: 'inv-07',
    scenario:
      'You see posters around your neighbourhood with a QR code, promising fixed high returns if you scan and invest in a “community fund” that claims to support local businesses.',
    options: [
      'Ask a neighbour if they\'ve invested before deciding',
      'Be cautious of investment offers advertised through street posters, and check if the “fund” is licensed by MAS before doing anything',
      'Invest a small amount to support the community regardless of the returns',
      'Scan the QR code and invest since it\'s for the local community',
    ],
    correctIndex: 1,
    explanation:
      'Legitimate investment funds are not advertised through street posters with a QR code. Always verify any investment opportunity is licensed by MAS before scanning or transferring money.',
  },
  {
    category: 'investment',
    id: 'inv-08',
    scenario:
      'An online contact you\'ve never met in person offers a great deal on an overseas property investment, saying you need to wire a deposit quickly before the price increases, with no option to view the property in person first.',
    options: [
      'Wire the deposit quickly to lock in the good price',
      'Wire half the deposit first, then decide on the rest',
      'Be wary of pressure to pay quickly for property you can\'t inspect, and verify the agent and property independently first',
      'Ask for more photos of the property before wiring the money',
    ],
    correctIndex: 2,
    explanation:
      'Pressure to pay quickly for something you can\'t verify in person is a common scam tactic. Always verify the agent\'s license and the property\'s existence independently before wiring any deposit.',
  },
  {
    category: 'investment',
    id: 'inv-09',
    scenario:
      'At a community centre activity, someone offers to help you invest in gold, promising a guaranteed buyback at a higher price after a few months, and asks you to hand over cash directly to them rather than through any company.',
    options: [
      'Ask for a handwritten IOU before handing over the cash',
      'Hand over the cash since he seems friendly and it\'s a guaranteed deal',
      'Give a smaller amount to test if the buyback really happens',
      'Decline — genuine gold investment is done through licensed dealers with proper receipts, not by handing cash to an individual',
    ],
    correctIndex: 3,
    explanation:
      'Any investment involving handing cash directly to an individual, with no licensed company or proper receipt involved, is high risk. Only invest in gold through recognised, licensed dealers.',
  },
  {
    category: 'investment',
    id: 'inv-10',
    scenario:
      'A door-to-door salesperson offers an insurance plan that doubles as an investment, promising unusually high guaranteed returns, and pressures you to sign and pay a first premium on the spot without leaving any documents to review.',
    options: [
      'Sign and pay on the spot since the returns sound attractive',
      'Pay a smaller first premium to test the plan',
      'Sign but pay only after his next visit',
      'Decline signing anything on the spot; ask for documents to review and check if the agent and product are registered with MAS',
    ],
    correctIndex: 3,
    explanation:
      'Being pressured to sign and pay immediately without time to review documents is a major warning sign. Legitimate agents are registered with MAS and will always let you review a policy before committing.',
  },
  {
    category: 'ecommerce',
    id: 'ecm-01',
    scenario:
      'You find a brand-new air fryer on Carousell for half the usual price. The seller has no reviews yet and asks you to PayNow the full amount to a personal mobile number before shipping, with no option to pay on delivery.',
    options: [
      'Ask the seller to lower the price further before paying',
      'Pay half first, half after delivery, without checking the seller further',
      'Be wary of no-review sellers who only accept upfront PayNow with no buyer protection, and consider a platform with delivery-on-payment or escrow instead',
      'Pay in full by PayNow since the price is so good',
    ],
    correctIndex: 2,
    explanation:
      'Deep discounts, no reviews, and insisting on upfront PayNow to a personal number are common e-commerce scam signs. Prefer platforms with buyer protection and be cautious of sellers who avoid any pay-on-delivery option.',
  },
  {
    category: 'ecommerce',
    id: 'ecm-02',
    scenario:
      'A Facebook ad shows a well-known electronics brand having a “warehouse clearance sale” at 80% off, linking to a site that looks slightly different from the brand’s real website and only accepts bank transfer.',
    options: [
      'Check the web address carefully against the brand’s official site, and avoid paying by bank transfer to an unfamiliar site',
      'Transfer a small deposit first to test if the item arrives',
      'Buy quickly before the “sale” ends',
      'Share the link with friends so they can buy too, then decide',
    ],
    correctIndex: 0,
    explanation:
      'Fake “clearance sale” ads with look-alike web addresses and bank-transfer-only payment are a common e-commerce scam. Always check the URL carefully and prefer secure payment methods with buyer protection.',
  },
  {
    category: 'ecommerce',
    id: 'ecm-03',
    scenario:
      'You get an SMS saying a parcel couldn\'t be delivered and a small redelivery fee is needed, with a link to pay. The linked page asks for your full card number, expiry date, and CVC to process the “fee”.',
    options: [
      'Reply to the SMS asking if it\'s genuine first',
      'Pay using a different card just in case',
      'Don\'t click the link — check directly with the courier\'s official app or website instead, since real redelivery notices don\'t ask for full card details this way',
      'Enter your card details to pay the small fee and get your parcel',
    ],
    correctIndex: 2,
    explanation:
      'Legitimate redelivery fees, if any, are paid through the courier\'s official app or website — never by entering full card details through a link in a text message.',
  },
  {
    category: 'ecommerce',
    id: 'ecm-04',
    scenario:
      'In a Facebook buy-and-sell group, a seller asks for full payment via PayNow before shipping a popular item. After you pay, the seller stops responding to messages and you can no longer find their profile.',
    options: [
      'Report the seller and the transaction to the platform and police — and in future, prefer sellers with reviews and platforms with buyer protection',
      'Try paying a bit more to “unblock” the conversation',
      'Post about it in the group and wait for the seller to see it',
      'Keep messaging and hope they eventually respond',
    ],
    correctIndex: 0,
    explanation:
      'Once a scammer disappears after payment, messaging won\'t help. Report it promptly, and in future prefer marketplaces with buyer protection over direct PayNow transfers to unknown sellers.',
  },
  {
    category: 'ecommerce',
    id: 'ecm-05',
    scenario:
      'An online pharmacy advertises health supplements at very low prices, requiring full payment upfront. After paying, there is no way to contact the seller for updates, and the items either never arrive or look different from what was advertised.',
    options: [
      'Order a small amount first even without checking anything',
      'Pay by bank transfer next time since it might be more reliable',
      'Check for a proper business registration, reviews, and contact details before buying from unfamiliar online health product sellers',
      'Keep waiting since the price was so good it must be genuine',
    ],
    correctIndex: 2,
    explanation:
      'Unusually low prices with no verifiable contact details or registration are a common sign of a fake online store. Especially for health products, only buy from verified, licensed sellers.',
  },
  {
    category: 'ecommerce',
    id: 'ecm-06',
    scenario:
      'At a temporary stall at a market, you scan a QR code to pay for your purchase. Unknown to you, someone had pasted a fake QR code sticker over the stall\'s real one, sending your payment to a scammer instead of the stallholder.',
    options: [
      'Pay by cash instead every single time to avoid this entirely',
      'Scan again with a different app to be safe',
      'Before confirming payment, check the name shown on your payment app matches the stallholder, and ask if unsure',
      'Assume it\'s fine since you scanned the code shown at the stall',
    ],
    correctIndex: 2,
    explanation:
      'Always check that the name shown on your payment app matches the stallholder before confirming payment. QR code swapping is a real and increasingly common scam at physical stalls.',
  },
  {
    category: 'ecommerce',
    id: 'ecm-07',
    scenario:
      'A buyer on an online marketplace offers to “meet halfway” for a high-value item, but insists on transferring the full payment first through an untraceable payment app before agreeing on a meeting time or place.',
    options: [
      'Accept the payment first since it saves you the trouble of meeting immediately',
      'Be cautious of payment-first requests through untraceable apps, and prefer meeting in a safe, public place with payment on handover instead',
      'Ask for a smaller deposit first through the same app',
      'Accept but ask them to send a screenshot of the payment first',
    ],
    correctIndex: 1,
    explanation:
      'Insisting on untraceable payment before any meeting is arranged is a common scam setup. Prefer safe, public meet-ups where payment happens at the point of handover.',
  },
  {
    category: 'ecommerce',
    id: 'ecm-08',
    scenario:
      'A job advertisement offers easy part-time packing work from home with good pay, but asks you to first pay a “registration” or “deposit” fee to receive the starter kit and be added to the payroll.',
    options: [
      'Pay the fee since the pay offered is attractive',
      'Pay a smaller deposit and see if the job is real',
      'Be wary — legitimate employers do not ask employees to pay upfront fees to start work, and this is a common job scam',
      'Ask for the fee to be deducted from your first pay cheque instead',
    ],
    correctIndex: 2,
    explanation:
      'A genuine employer never asks a new hire to pay money upfront to start working. Any job offer requiring an initial fee or deposit should be treated as a likely scam.',
  },
  {
    category: 'ecommerce',
    id: 'ecm-09',
    scenario:
      'You find what looks like a professional electronics store website with good prices, security badges, and customer reviews. After paying, the items never arrive, customer service goes silent, and eventually the whole website disappears.',
    options: [
      'Check independent reviews outside the site itself, and use secure payment methods with buyer protection when buying from unfamiliar websites',
      'Pay by bank transfer next time for faster processing',
      'Try ordering again from the same site to see if it works this time',
      'Keep waiting, since the website looked professional and trustworthy',
    ],
    correctIndex: 0,
    explanation:
      'A professional-looking website doesn\'t guarantee legitimacy — scam sites can copy trust badges and fake reviews. Search for independent reviews and use payment methods that offer buyer protection.',
  },
  {
    category: 'ecommerce',
    id: 'ecm-10',
    scenario:
      'You\'re selling an item online and a “buyer” sends a payment screenshot showing they\'ve overpaid, then urgently asks you to refund the difference to another account before you\'ve checked that the payment has actually arrived in your own account.',
    options: [
      'Refund half the amount as a compromise',
      'Check your own bank account or app to confirm the money has actually arrived before refunding anything',
      'Refund the difference quickly since they\'ve already sent proof of payment',
      'Ask them to send a clearer screenshot before refunding',
    ],
    correctIndex: 1,
    explanation:
      'Screenshots can be faked. Always confirm the money has genuinely landed in your own account before refunding anything — this overpayment trick is a common scam targeting online sellers.',
  },
];

/**
 * Fisher-Yates shuffle — returns a new shuffled array, doesn't mutate the input.
 */
function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Builds one random quiz run from the question bank.
 *
 * Distributes across categories round-robin rather than a fixed count per
 * category, so it works cleanly regardless of how `total` compares to the
 * number of categories:
 *
 *   1. Shuffle the category order, and shuffle each category's own
 *      question pool independently.
 *   2. Walk the shuffled categories in a round: take one not-yet-used
 *      question from each. This guarantees maximum category coverage —
 *      with 5 categories and total=6, all 5 appear at least once.
 *   3. If `total` isn't reached after one round (as with 6 > 5), start a
 *      new round: reshuffle the category order and take one more from
 *      each until `total` is hit. Which category gets the "extra"
 *      question(s) is different every playthrough.
 *   4. Shuffle the final list so categories don't always appear in the
 *      same sequence.
 *
 * As you add more questions to QUESTIONS above, this automatically starts
 * drawing from a bigger pool — nothing here needs to change.
 */
export function getRandomQuiz(total = 6) {
  const byCategory = {};
  QUESTIONS.forEach((q) => {
    if (!byCategory[q.category]) byCategory[q.category] = [];
    byCategory[q.category].push(q);
  });

  // Independent shuffled queues per category — we pop from each as we go.
  const queues = {};
  Object.keys(byCategory).forEach((cat) => {
    queues[cat] = shuffle(byCategory[cat]);
  });

  const picked = [];
  while (picked.length < total) {
    const categoriesWithQuestions = Object.keys(queues).filter((c) => queues[c].length > 0);
    if (categoriesWithQuestions.length === 0) break; // bank exhausted

    for (const cat of shuffle(categoriesWithQuestions)) {
      if (picked.length >= total) break;
      picked.push(queues[cat].shift());
    }
  }

  return shuffle(picked);
}
