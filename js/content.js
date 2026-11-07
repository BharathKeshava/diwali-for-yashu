/* ==========================================================================
   CONTENT CONFIGURATION — the only file you need to edit to personalise
   the whole website. Every heading, message, letter and photo path lives
   here. Use {her} and {me} anywhere in a text and they will be replaced
   with the names below automatically.
   ========================================================================== */

const SITE_CONTENT = {
  names: {
    her: "Yashu",
    me: "Bharath",
  },

  /* ------------------------------------------------------------------
     ASSETS — swap files or point to new ones here.
     anime.type: "gif" keeps an animated GIF as-is;
                 "sheet" animates a PNG spritesheet frame by frame
                 (never showing the raw sheet) using frameWidth/Height/frames.
     ------------------------------------------------------------------ */
  assets: {
    music: {
      src: "assets/music/background-music.m4a",
      title: "Play our little song",
    },
    anime: {
      src: "assets/images/our-anime-love.gif",
      type: "gif", // "gif" or "sheet"
      frameWidth: 0, // only needed for "sheet"
      frameHeight: 0,
      frames: 0,
      fps: 12,
      alt: "Anime couple under cherry blossoms — a flower crown being placed with love",
    },
    photos: {
      her: "assets/images/her-photo.jpg",
      me: "assets/images/my-photo.jpg",
      us: "assets/images/our-photo.jpg",
      chapter4: "assets/images/chapter4-photo.jpg",
      chapter5: "assets/images/chapter5-photo.jpg",
    },
  },

  nav: {
    wordmark: "Yashu ❤",
    pages: [
      { id: "welcome", file: "index.html", label: "Welcome", short: "Home" },
      { id: "story", file: "story.html", label: "Our Love Story", short: "Story" },
      { id: "anime", file: "anime-love.html", label: "Anime Love", short: "Anime" },
      { id: "diwali", file: "diwali.html", label: "Diwali Wish", short: "Diwali" },
      { id: "letter", file: "letter.html", label: "The Letter", short: "Letter" },
      { id: "forever", file: "forever.html", label: "Our Forever", short: "Forever" },
    ],
  },

  footer: {
    line: "Made with all my heart, for my favourite person",
    signature: "— {me}",
  },

  /* ---------------- PAGE 1 · index.html ---------------- */
  welcome: {
    title: "To My Favourite Person ❤️",
    subtitle: "This Diwali, I wanted to give you something a little more special than just a wish...",
    button: "Open Your Surprise ✨",
    revealTitle: "Happy Diwali, {her} ✨",
    revealMessage:
      "A little surprise, made with lots of thought and a little piece of my heart, just for you. As you turn each page, I hope you find a smile, a little happiness and a glimpse of how special you are becoming in my life. So, take your time, my soon-to-be wife. This little world is made just for you. ❤️",
    revealButton: "Walk Into Our Story ✨",
  },

  /* ---------------- PAGE 2 · story.html ---------------- */
  story: {
    title: "Our Little Love Story",
    intro: "Every beautiful journey has a beginning, and ours is a special one. Two people, brought together by destiny and family, with a beautiful opportunity to turn a new beginning into a lifetime of togetherness. I don't know everything about the chapters ahead, but I am genuinely excited to discover them with you...",
    chapters: [
      {
        title: "A Beautiful Beginning",
        text: "Sometimes, life brings two people together in the most unexpected way. What begins as an introduction slowly becomes something meaningful. I look forward to knowing you better, understanding your dreams and discovering all the little things that make you who you are.",
        photo: "her",
        photoAlt: "{her}, glowing in her traditional attire",
      },
      {
        title: "Getting to Know Each Other",
        text: "Every conversation gives us another reason to understand each other a little more. From sharing our thoughts and dreams to talking about the simplest things, I hope we create a bond where we can always be ourselves.",
        photo: "us",
        photoAlt: "The two of us together",
      },
      {
        title: "A Thousand Reasons to Smile",
        text: "I hope to be one of the reasons behind your beautiful smile. I want us to share happiness, encourage each other during difficult days and find joy even in the smallest moments of life.",
        photo: "me",
        photoAlt: "{me}, smiling",
      },
      {
        title: "Building Something Beautiful",
        text: "A beautiful relationship isn't about being perfect. It is about understanding, patience, respect and choosing to stand beside each other. I look forward to building a relationship where we both feel valued, comfortable and happy.",
        photo: "chapter4",
        photoAlt: "Anime couple beneath falling cherry blossoms — building something beautiful together",
      },
      {
        title: "Our Journey Ahead",
        text: "There are festivals to celebrate, dreams to fulfil, places to explore and countless memories waiting to be created. We may not know exactly what tomorrow holds, but I hope we make every tomorrow beautiful together.",
        photo: "chapter5",
        photoAlt: "Anime couple wearing flower crowns in a garden — the beautiful journey ahead",
      },
    ],
    photoPlaceholderText: "This chapter is waiting for its photograph",
  },

  /* ---------------- PAGE 3 · anime-love.html ---------------- */
  anime: {
    title: "Our Anime Love Story 🌸",
    intro: "In every story, two people find their way to each other. I'm glad our story is beginning, and I can't wait to see where it takes us. ❤️",
    caption: "If I could choose someone to share all the little moments of life with, I would be happy to discover that journey with you.",
    message:
      "You are becoming a beautiful part of my future, and I look forward to making our story one worth remembering. ❤️",
  },

  /* ---------------- PAGE 4 · diwali.html ---------------- */
  diwali: {
    title: "Happy Diwali, My Love ❤️",
    tapHint: "Tap a little diya to wake its flame",
    message: [
      "May this Deepavali bring you endless happiness, good health, peace and countless reasons to smile.",
      "Just as these little diyas brighten every corner, I hope our journey together brings warmth, happiness and light into each other's lives.",
      "May all your dreams come true, may every step take you closer to your goals, and may we always encourage each other to become the best versions of ourselves.",
      "Among all the celebrations, I look forward to the Deepavalis, festivals and special occasions we will celebrate together in the years ahead.",
      "Wishing you a beautiful and joyful Deepavali, my soon-to-be wife. ❤️",
    ],
    lightButton: "Light a Diya for Us 🪔",
    litMessage: [
      "This little diya represents a beautiful wish for our future — may its light remind us to bring happiness, warmth and understanding into each other's lives, through every season and every chapter.",
      "Happy Deepavali, {her}. ❤️",
    ],
  },

  /* ---------------- PAGE 5 · letter.html ---------------- */
  letter: {
    title: "A Little Letter From My Heart 💌",
    teaser: "Someone has written something special for you...",
    teaserNote: "Sealed with a kiss and opened only by you",
    button: "Open My Letter 💌",
    skipText: "reveal it all at once",
    greeting: "My Dear {her},",
    paragraphs: [
      "As we begin this new chapter of our lives, I just wanted to take a moment to tell you something from my heart.",
      "We may still have so much to learn about each other, so many conversations to share and countless memories to create. But one thing I know is that I am genuinely happy and excited about the journey ahead.",
      "I look forward to the everyday moments — random conversations, silly jokes, little disagreements, laughter, supporting each other's dreams and making even ordinary days special.",
      "I don't expect us to be perfect. I hope we learn, grow, understand and stand beside each other through every high and low in life.",
      "I wish that our relationship is always filled with friendship, trust, respect, patience and a happiness that grows stronger with time.",
      "This Deepavali, I wish for a future filled with beautiful celebrations, shared dreams and countless memories together.",
      "Thank you for being a part of this beautiful new beginning.",
    ],
    signatureName: "With warm wishes and lots of affection,",
    signature: "Your Soon-to-Be Husband ❤️",
  },

  /* ---------------- PAGE 6 · forever.html ---------------- */
  forever: {
    title: "One More Thing...",
    message: [
      "Life will bring us different seasons, new experiences and unexpected adventures.",
      "There will be beautiful days, challenging days and countless little moments in between.",
      "What I look forward to most is having someone to share all those moments with, someone with whom we can grow, dream and build a beautiful life.",
      "Today, tomorrow and in all the Deepavalis ahead...",
      "I look forward to choosing you, understanding you and building our forever together. ❤️",
    ],
    finalButton: "One Last Surprise ❤️",
    finalTitle: "Happy Diwali, My Love",
    finalMessage: [
      "Here's to our new beginning, our shared dreams, countless celebrations and a beautiful lifetime together.",
      "Our story is just beginning. ❤️",
    ],
    replayButton: "Live it again ✨",
  },
};
