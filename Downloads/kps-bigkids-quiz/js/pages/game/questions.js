/**
 * Quiz content — one object per question.
 *
 * To add more scenarios later, just push more objects into this array.
 * Nothing else needs to change: index.js reads this file and renders
 * however many questions are here.
 *
 * Shape:
 *   {
 *     scenario: 'The situation described to the player',
 *     options: ['choice A', 'choice B', 'choice C', 'choice D'],
 *     correctIndex: 0,           // index into options[]
 *     explanation: 'Why that answer is right, shown after they answer',
 *   }
 */

export const QUESTIONS = [
  {
    scenario:
      'You get a call from someone claiming to be from your bank. They say your account has been compromised and ask you to confirm your PIN and OTP over the phone to "verify your identity".',
    options: [
      'Give them the PIN and OTP since they already know your bank details',
      'Hang up and call your bank directly using the number on your bank card or statement',
      'Ask them to send you an SMS with the request instead',
      'Give the OTP but not the PIN',
    ],
    correctIndex: 1,
    explanation:
      'Banks never ask for your PIN or OTP over the phone. Always hang up and call the number printed on your card or official statement to check.',
  },
  {
    scenario:
      'You receive a text message saying you have an unpaid parcel delivery fee, with a link to "pay now" to release your package.',
    options: [
      'Click the link and pay quickly so the parcel isn\u2019t returned',
      'Reply to the text asking who sent it',
      'Delete the text and check directly with the courier\u2019s official app or website',
      'Forward the link to a friend to ask if it looks safe',
    ],
    correctIndex: 2,
    explanation:
      'Unexpected "unpaid fee" texts with links are a classic phishing scam. Go directly to the courier\u2019s official site or app instead of clicking the link.',
  },
  {
    scenario:
      'Someone messages you on social media claiming to be a long-lost relative overseas, urgently asking you to transfer money to help with a medical emergency.',
    options: [
      'Send money right away since it\u2019s an emergency',
      'Ask for proof of identity and verify with other family members before doing anything',
      'Ask them to call you on video, and if they refuse, send money anyway',
      'Give them your bank login so they can "show" you it\u2019s legitimate',
    ],
    correctIndex: 1,
    explanation:
      'Urgency and emotional pressure are common scam tactics. Always verify identity independently (e.g. call a shared family member) before sending any money.',
  },
  {
    scenario:
      'An email says you\u2019ve won a lucky draw prize, but you need to pay a small "processing fee" first to claim it.',
    options: [
      'Pay the fee \u2014 the prize is worth much more anyway',
      'Reply asking for more details about the prize',
      'Ignore or delete it \u2014 legitimate prizes don\u2019t require upfront payment',
      'Forward your bank details so they can deduct the fee directly',
    ],
    correctIndex: 2,
    explanation:
      'Real lucky draws and prizes never require you to pay a fee to receive them. Any request for upfront payment is a strong scam signal.',
  },
];
