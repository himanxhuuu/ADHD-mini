// Seed data for 6 starter lessons with 3 variants each
export const seedLessons = [
  {
    lessonId: "fractions_intro_v1",
    topic: "Basic Fractions",
    difficulty: "beginner",
    durationSeconds: 300,
    variants: {
      text: {
        sections: [
          {
            title: "What is a Fraction?",
            content:
              "A fraction represents parts of a whole. It has two numbers: a numerator (top) and denominator (bottom).",
            examples: ["1/2 means one half", "3/4 means three quarters"],
            quizPoints: [
              {
                question: "What does the numerator represent?",
                options: [
                  "Parts you have",
                  "Total parts",
                  "The whole",
                  "Nothing",
                ],
                correctIndex: 0,
              },
            ],
          },
          {
            title: "Visualizing Fractions",
            content:
              "Think of a pizza cut into equal slices. If you have 3 slices out of 8 total slices, you have 3/8 of the pizza.",
            examples: ["1/2 = half a pizza", "1/4 = quarter of a pizza"],
            quizPoints: [
              {
                question:
                  "If a pizza has 6 slices and you eat 2, what fraction did you eat?",
                options: ["2/6", "6/2", "1/3", "2/3"],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      visualAudio: {
        storyboard: [
          {
            slide: 1,
            title: "What is a Fraction?",
            image: "/images/fractions/pizza-whole.svg",
            caption: "A whole pizza represents 1",
            audioScript:
              "Look at this whole pizza. This represents the number 1, or one whole.",
            audioUrl: "/audio/fractions/slide1.mp3",
          },
          {
            slide: 2,
            title: "Cutting the Pizza",
            image: "/images/fractions/pizza-halves.svg",
            caption: "Cut into 2 equal parts",
            audioScript:
              "Now I cut the pizza into 2 equal parts. Each part is called one half.",
            audioUrl: "/audio/fractions/slide2.mp3",
          },
          {
            slide: 3,
            title: "Numerator and Denominator",
            image: "/images/fractions/fraction-parts.svg",
            caption: "Top number = numerator, bottom = denominator",
            audioScript:
              "The top number tells us how many parts we have. The bottom number tells us how many total parts there are.",
            audioUrl: "/audio/fractions/slide3.mp3",
          },
        ],
        microQuizzes: [
          {
            timeOffset: 90,
            type: "multiple_choice",
            prompt: "Which number is the numerator in 3/4?",
            options: ["3", "4", "Both", "Neither"],
            correctIndex: 0,
          },
          {
            timeOffset: 180,
            type: "multiple_choice",
            prompt: "What does the denominator tell us?",
            options: ["Parts we have", "Total parts", "The whole", "Nothing"],
            correctIndex: 1,
          },
        ],
      },
      gamified: {
        steps: [
          {
            step: 1,
            type: "drag_drop",
            prompt: "Drag the shaded part to show 1/2",
            successCriteria: "correct_placement",
            reward: 10,
            hint: "Half means 1 out of 2 parts",
            explanation:
              "Great! You correctly identified that 1/2 means one part out of two equal parts.",
          },
          {
            step: 2,
            type: "quick_tap",
            prompt: "Tap the correct fraction for 3 slices out of 8",
            successCriteria: "tap_3_8",
            reward: 15,
            hint: "Count the slices you have vs total slices",
            explanation:
              "Perfect! 3/8 means you have 3 slices out of 8 total slices.",
          },
          {
            step: 3,
            type: "matching",
            prompt: "Match each fraction to its meaning",
            successCriteria: "all_matches_correct",
            reward: 20,
            hint: "Think about parts vs whole",
            explanation:
              "Excellent matching! You understand how fractions represent parts of a whole.",
          },
        ],
        totalReward: 45,
      },
    },
    metadata: {
      lastUpdated: new Date(),
      author: "FocusFlow Team",
      tags: ["math", "fractions", "beginner"],
      accessibility: {
        captions: true,
        transcripts: true,
        keyboardNav: true,
      },
    },
  },
  {
    lessonId: "reading_main_idea_v1",
    topic: "Reading Comprehension - Main Idea",
    difficulty: "beginner",
    durationSeconds: 400,
    variants: {
      text: {
        sections: [
          {
            title: "What is the Main Idea?",
            content:
              "The main idea is the most important point the author wants to make. It's like the 'big picture' of what you're reading.",
            examples: [
              "If a paragraph talks about cats, dogs, and birds, the main idea might be 'pets are great companions'",
            ],
            quizPoints: [
              {
                question: "What is the main idea?",
                options: [
                  "A detail",
                  "The most important point",
                  "A random fact",
                  "The last sentence",
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
      },
      visualAudio: {
        storyboard: [
          {
            slide: 1,
            title: "Finding the Main Idea",
            image: "/images/reading/magnifying-glass.svg",
            caption: "Look for the big picture",
            audioScript:
              "When reading, look for the main point the author is trying to make. It's like finding the big picture.",
            audioUrl: "/audio/reading/slide1.mp3",
          },
        ],
        microQuizzes: [
          {
            timeOffset: 120,
            type: "multiple_choice",
            prompt: "What should you look for when finding the main idea?",
            options: [
              "Small details",
              "The big picture",
              "Random facts",
              "The title only",
            ],
            correctIndex: 1,
          },
        ],
      },
      gamified: {
        steps: [
          {
            step: 1,
            type: "sequence",
            prompt: "Put these sentences in order to find the main idea",
            successCriteria: "correct_sequence",
            reward: 12,
            hint: "Look for the sentence that sums up everything else",
            explanation:
              "Well done! You identified the sentence that captures the main point.",
          },
        ],
        totalReward: 12,
      },
    },
    metadata: {
      lastUpdated: new Date(),
      author: "FocusFlow Team",
      tags: ["reading", "comprehension", "beginner"],
      accessibility: {
        captions: true,
        transcripts: true,
        keyboardNav: true,
      },
    },
  },
  {
    lessonId: "multiplication_tables_v1",
    topic: "Short Multiplication",
    difficulty: "beginner",
    durationSeconds: 350,
    variants: {
      text: {
        sections: [
          {
            title: "Times Tables Basics",
            content:
              "Multiplication is repeated addition. 3 × 4 means 3 groups of 4, or 4 + 4 + 4 = 12.",
            examples: ["2 × 5 = 10", "4 × 3 = 12"],
            quizPoints: [
              {
                question: "What does 3 × 4 equal?",
                options: ["7", "12", "34", "43"],
                correctIndex: 1,
              },
            ],
          },
        ],
      },
      visualAudio: {
        storyboard: [
          {
            slide: 1,
            title: "Groups and Arrays",
            image: "/images/math/multiplication-array.svg",
            caption: "3 rows of 4 dots = 12 total",
            audioScript:
              "Look at this array: 3 rows with 4 dots each. We can count them or multiply 3 times 4.",
            audioUrl: "/audio/math/slide1.mp3",
          },
        ],
        microQuizzes: [
          {
            timeOffset: 100,
            type: "multiple_choice",
            prompt: "How many dots are in 2 rows of 6?",
            options: ["8", "12", "26", "62"],
            correctIndex: 1,
          },
        ],
      },
      gamified: {
        steps: [
          {
            step: 1,
            type: "quick_tap",
            prompt: "Tap the correct answer: 4 × 3 = ?",
            successCriteria: "tap_12",
            reward: 8,
            hint: "Think 4 groups of 3",
            explanation: "Correct! 4 × 3 = 12 because you have 4 groups of 3.",
          },
        ],
        totalReward: 8,
      },
    },
    metadata: {
      lastUpdated: new Date(),
      author: "FocusFlow Team",
      tags: ["math", "multiplication", "beginner"],
      accessibility: {
        captions: true,
        transcripts: true,
        keyboardNav: true,
      },
    },
  },
  {
    lessonId: "water_cycle_v1",
    topic: "Science: Water Cycle",
    difficulty: "intermediate",
    durationSeconds: 450,
    variants: {
      text: {
        sections: [
          {
            title: "The Water Cycle",
            content:
              "Water moves through our environment in a continuous cycle: evaporation, condensation, precipitation, and collection.",
            examples: [
              "Ocean water evaporates into clouds",
              "Clouds rain onto mountains",
              "Water flows back to oceans",
            ],
            quizPoints: [
              {
                question: "What happens when water evaporates?",
                options: [
                  "It freezes",
                  "It turns to gas",
                  "It disappears",
                  "It gets bigger",
                ],
                correctIndex: 1,
              },
            ],
          },
        ],
      },
      visualAudio: {
        storyboard: [
          {
            slide: 1,
            title: "Evaporation",
            image: "/images/science/evaporation.svg",
            caption: "Sun heats water, turning it to vapor",
            audioScript:
              "The sun heats water in oceans and lakes, turning it into invisible water vapor that rises into the air.",
            audioUrl: "/audio/science/slide1.mp3",
          },
          {
            slide: 2,
            title: "Condensation",
            image: "/images/science/condensation.svg",
            caption: "Water vapor cools and forms clouds",
            audioScript:
              "As the water vapor rises higher, it cools down and forms tiny water droplets that we see as clouds.",
            audioUrl: "/audio/science/slide2.mp3",
          },
          {
            slide: 3,
            title: "Precipitation",
            image: "/images/science/precipitation.svg",
            caption: "Clouds release water as rain or snow",
            audioScript:
              "When clouds get heavy with water droplets, they release the water as rain, snow, or hail.",
            audioUrl: "/audio/science/slide3.mp3",
          },
        ],
        microQuizzes: [
          {
            timeOffset: 120,
            type: "multiple_choice",
            prompt: "What causes water to evaporate?",
            options: ["Cold", "Heat from sun", "Wind", "Rain"],
            correctIndex: 1,
          },
        ],
      },
      gamified: {
        steps: [
          {
            step: 1,
            type: "sequence",
            prompt: "Put the water cycle steps in order",
            successCriteria:
              "evaporation_condensation_precipitation_collection",
            reward: 15,
            hint: "Start with the sun heating water",
            explanation:
              "Perfect! You understand the water cycle flows from evaporation to collection.",
          },
        ],
        totalReward: 15,
      },
    },
    metadata: {
      lastUpdated: new Date(),
      author: "FocusFlow Team",
      tags: ["science", "water-cycle", "intermediate"],
      accessibility: {
        captions: true,
        transcripts: true,
        keyboardNav: true,
      },
    },
  },
  {
    lessonId: "spelling_phonics_v1",
    topic: "Spelling & Phonics",
    difficulty: "beginner",
    durationSeconds: 300,
    variants: {
      text: {
        sections: [
          {
            title: "Short Vowel Sounds",
            content:
              "Short vowels make their basic sound: a as in cat, e as in bed, i as in sit, o as in hot, u as in cup.",
            examples: ["cat, bed, sit, hot, cup"],
            quizPoints: [
              {
                question: "Which word has a short 'a' sound?",
                options: ["cake", "cat", "car", "care"],
                correctIndex: 1,
              },
            ],
          },
        ],
      },
      visualAudio: {
        storyboard: [
          {
            slide: 1,
            title: "Short A Sound",
            image: "/images/spelling/cat.svg",
            caption: "A as in cat",
            audioScript:
              "Listen to the short 'a' sound in cat. C-A-T. The 'a' makes its short sound.",
            audioUrl: "/audio/spelling/slide1.mp3",
          },
        ],
        microQuizzes: [
          {
            timeOffset: 90,
            type: "multiple_choice",
            prompt: "Which word rhymes with 'cat'?",
            options: ["cake", "bat", "car", "care"],
            correctIndex: 1,
          },
        ],
      },
      gamified: {
        steps: [
          {
            step: 1,
            type: "matching",
            prompt: "Match words with the same short vowel sound",
            successCriteria: "all_matches_correct",
            reward: 10,
            hint: "Listen for the vowel sound",
            explanation:
              "Great matching! You can hear the same short vowel sounds in these words.",
          },
        ],
        totalReward: 10,
      },
    },
    metadata: {
      lastUpdated: new Date(),
      author: "FocusFlow Team",
      tags: ["spelling", "phonics", "beginner"],
      accessibility: {
        captions: true,
        transcripts: true,
        keyboardNav: true,
      },
    },
  },
  {
    lessonId: "study_skills_focus_v1",
    topic: "Study Skills - Focus and Breaks",
    difficulty: "intermediate",
    durationSeconds: 400,
    variants: {
      text: {
        sections: [
          {
            title: "The Pomodoro Technique",
            content:
              "Work for 25 minutes, then take a 5-minute break. This helps maintain focus and prevents mental fatigue.",
            examples: [
              "Set a timer for 25 minutes",
              "Focus only on your task",
              "Take a short break when timer rings",
            ],
            quizPoints: [
              {
                question: "How long should you work before taking a break?",
                options: ["10 minutes", "25 minutes", "1 hour", "All day"],
                correctIndex: 1,
              },
            ],
          },
        ],
      },
      visualAudio: {
        storyboard: [
          {
            slide: 1,
            title: "Focus Time",
            image: "/images/study/timer.svg",
            caption: "25 minutes of focused work",
            audioScript:
              "Set a timer for 25 minutes and focus only on your task. No distractions allowed!",
            audioUrl: "/audio/study/slide1.mp3",
          },
          {
            slide: 2,
            title: "Break Time",
            image: "/images/study/break.svg",
            caption: "5 minutes to rest and recharge",
            audioScript:
              "When the timer rings, take a 5-minute break. Stand up, stretch, or get some fresh air.",
            audioUrl: "/audio/study/slide2.mp3",
          },
        ],
        microQuizzes: [
          {
            timeOffset: 150,
            type: "multiple_choice",
            prompt: "What should you do during your break?",
            options: [
              "Keep working",
              "Rest and recharge",
              "Start a new task",
              "Check social media",
            ],
            correctIndex: 1,
          },
        ],
      },
      gamified: {
        steps: [
          {
            step: 1,
            type: "drag_drop",
            prompt: "Drag activities to 'Focus Time' or 'Break Time'",
            successCriteria: "correct_categorization",
            reward: 12,
            hint: "Focus time = work, Break time = rest",
            explanation:
              "Excellent! You understand what activities belong in focus time vs break time.",
          },
        ],
        totalReward: 12,
      },
    },
    metadata: {
      lastUpdated: new Date(),
      author: "FocusFlow Team",
      tags: ["study-skills", "focus", "intermediate"],
      accessibility: {
        captions: true,
        transcripts: true,
        keyboardNav: true,
      },
    },
  },
];

export default seedLessons;
