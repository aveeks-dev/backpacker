// Generated from official Engineering Bulletin sample schedules. Each plan's rows
// were checked against the PDF's printed per-term credit totals.

import type { Major } from "./majors.ts";

export const ENGINEERING_PLANS: Major[] = [
 {
  "id": "engineering-aerospace-engineering",
  "name": "Aerospace Engineering",
  "school": "College of Engineering (B.S.E.)",
  "sourceUrl": "https://bulletin.engin.umich.edu/aero/",
  "sourceLabel": "Engineering Bulletin, 2025-26 sample schedule",
  "planIsOfficial": true,
  "planSourceUrl": "https://bulletin.engin.umich.edu/wp-content/uploads/sites/306/2025/04/AEROSP-BSE-Sample-Schedule_4.21.25.pdf",
  "notes": [
   "This follows the department's 2025-26 sample schedule. A plan may differ by when you started, so check the current Bulletin.",
   "It's only a sample: you don't have to follow it exactly, apart from prerequisite chains.",
   "Rows with several courses or choices are tracked by credits. The linked schedule has the details and footnotes."
  ],
  "requirements": [
   {
    "id": "mathematics-115-116-215-and-216",
    "group": "Subjects Required by all Programs",
    "label": "Mathematics 115, 116, 215, and 216",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/aero/"
   },
   {
    "id": "engr-100-introduction-to-engineering",
    "group": "Subjects Required by all Programs",
    "label": "ENGR 100, Introduction to Engineering",
    "credits": 4,
    "anyOf": [
     [
      "engr-100"
     ]
    ]
   },
   {
    "id": "engr-101-introduction-to-computers",
    "group": "Subjects Required by all Programs",
    "label": "ENGR 101, Introduction to Computers",
    "credits": 4,
    "anyOf": [
     [
      "engr-101"
     ]
    ]
   },
   {
    "id": "chem-125-126-130-or-210-211",
    "group": "Subjects Required by all Programs",
    "label": "CHEM 125/126, 130 or 210, 211",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/aero/"
   },
   {
    "id": "physics-140-with-lab-141",
    "group": "Subjects Required by all Programs",
    "label": "Physics 140 with Lab 141",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/aero/"
   },
   {
    "id": "physics-240-with-lab-241",
    "group": "Subjects Required by all Programs",
    "label": "Physics 240 with Lab 241",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/aero/"
   },
   {
    "id": "intelectual-breadth",
    "group": "Subjects Required by all Programs",
    "label": "Intelectual Breadth",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/aero/"
   },
   {
    "id": "mecheng-240-intro-to-dynamics-and-vibrations",
    "group": "Related Technical Core Subjects",
    "label": "MECHENG 240, Intro to Dynamics and Vibrations",
    "credits": 4,
    "anyOf": [
     [
      "mecheng-240"
     ]
    ]
   },
   {
    "id": "engineering-distribution-1",
    "group": "Related Technical Core Subjects",
    "label": "Engineering distribution 1",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/aero/"
   },
   {
    "id": "engineering-distribution-2",
    "group": "Related Technical Core Subjects",
    "label": "Engineering distribution 2",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/aero/"
   },
   {
    "id": "aerosp-201-introduction-to-aerospace-science",
    "group": "Aerospace Science Subjects",
    "label": "AEROSP 201, Introduction to Aerospace Science",
    "credits": 2,
    "anyOf": [
     [
      "aerosp-201"
     ]
    ]
   },
   {
    "id": "aerosp-215-introduction-to-solid-mechanics-and-a",
    "group": "Aerospace Science Subjects",
    "label": "AEROSP 215, Introduction to Solid Mechanics and Aerospace Structures",
    "credits": 3,
    "anyOf": [
     [
      "aerosp-215"
     ]
    ]
   },
   {
    "id": "aerosp-225-introduction-to-gas-dynamics",
    "group": "Aerospace Science Subjects",
    "label": "AEROSP 225, Introduction to Gas Dynamics",
    "credits": 3,
    "anyOf": [
     [
      "aerosp-225"
     ]
    ]
   },
   {
    "id": "aerosp-315-aircraft-and-spacecraft-structures",
    "group": "Aerospace Science Subjects",
    "label": "AEROSP 315, Aircraft and Spacecraft Structures",
    "credits": 3,
    "anyOf": [
     [
      "aerosp-315"
     ]
    ]
   },
   {
    "id": "aerosp-325-aerodynamics",
    "group": "Aerospace Science Subjects",
    "label": "AEROSP 325, Aerodynamics",
    "credits": 3,
    "anyOf": [
     [
      "aerosp-325"
     ]
    ]
   },
   {
    "id": "aerosp-335-aircraft-and-spacecraft-propulsion",
    "group": "Aerospace Science Subjects",
    "label": "AEROSP 335, Aircraft and Spacecraft Propulsion",
    "credits": 3,
    "anyOf": [
     [
      "aerosp-335"
     ]
    ]
   },
   {
    "id": "aerosp-341-aircraft-dynamics-w-or-aerosp-343-spa",
    "group": "Aerospace Science Subjects",
    "label": "AEROSP 341, Aircraft Dynamics (W) or AEROSP 343, Spacecraft Dynamics (F)",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/aero/"
   },
   {
    "id": "aerosp-350-introduction-to-aerospace-computing",
    "group": "Aerospace Science Subjects",
    "label": "AEROSP 350, Introduction to Aerospace Computing",
    "credits": 3,
    "anyOf": [
     [
      "aerosp-350"
     ]
    ]
   },
   {
    "id": "aerosp-470-control-of-aerospace-vehicles",
    "group": "Aerospace Science Subjects",
    "label": "AEROSP 470, Control of Aerospace Vehicles",
    "credits": 3,
    "anyOf": [
     [
      "aerosp-470"
     ]
    ]
   },
   {
    "id": "aerosp-200-introduction-to-the-aerospace-enterpr",
    "group": "Aerospace Engineering Subjects",
    "label": "AEROSP 200, Introduction to the Aerospace Enterprise",
    "credits": 2,
    "anyOf": [
     [
      "aerosp-200"
     ]
    ]
   },
   {
    "id": "aerosp-388-or-aerosp-205-4-credits-tech-elective",
    "group": "Aerospace Engineering Subjects",
    "label": "AEROSP 388 or (AEROSP 205  4 credits Tech Electives)",
    "target": 7,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/aero/"
   },
   {
    "id": "aerosp-305-aerospace-engineering-lab-i",
    "group": "Aerospace Engineering Subjects",
    "label": "AEROSP 305, Aerospace Engineering Lab I",
    "credits": 4,
    "anyOf": [
     [
      "aerosp-305"
     ]
    ]
   },
   {
    "id": "aerosp-481-aircraft-design-f-or-aerosp-483-space",
    "group": "Aerospace Engineering Subjects",
    "label": "AEROSP 481, Aircraft Design (F) or AEROSP 483, Space System Design (W)",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/aero/"
   },
   {
    "id": "technical-electives",
    "group": "Electives",
    "label": "Technical Electives",
    "target": 9,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/aero/"
   },
   {
    "id": "general-electives",
    "group": "Electives",
    "label": "General Electives",
    "target": 9,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/aero/"
   }
  ],
  "plan": [
   [
    {
     "label": "Mathematics 115, 116, 215, and 216",
     "credits": 4,
     "req": "mathematics-115-116-215-and-216"
    },
    {
     "label": "ENGR 100, Introduction to Engineering",
     "credits": 4,
     "req": "engr-100-introduction-to-engineering"
    },
    {
     "label": "CHEM 125/126, 130 or 210, 211",
     "credits": 5,
     "req": "chem-125-126-130-or-210-211"
    },
    {
     "label": "Intelectual Breadth",
     "credits": 3,
     "req": "intelectual-breadth"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and 216",
     "credits": 4,
     "req": "mathematics-115-116-215-and-216"
    },
    {
     "label": "ENGR 101, Introduction to Computers",
     "credits": 4,
     "req": "engr-101-introduction-to-computers"
    },
    {
     "label": "Physics 140 with Lab 141",
     "credits": 5,
     "req": "physics-140-with-lab-141"
    },
    {
     "label": "Intelectual Breadth",
     "credits": 3,
     "req": "intelectual-breadth"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and 216",
     "credits": 4,
     "req": "mathematics-115-116-215-and-216"
    },
    {
     "label": "Physics 240 with Lab 241",
     "credits": 5,
     "req": "physics-240-with-lab-241"
    },
    {
     "label": "Intelectual Breadth",
     "credits": 2,
     "req": "intelectual-breadth"
    },
    {
     "label": "AEROSP 201, Introduction to Aerospace Science",
     "credits": 2,
     "req": "aerosp-201-introduction-to-aerospace-science"
    },
    {
     "label": "AEROSP 225, Introduction to Gas Dynamics",
     "credits": 3,
     "req": "aerosp-225-introduction-to-gas-dynamics"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and 216",
     "credits": 4,
     "req": "mathematics-115-116-215-and-216"
    },
    {
     "label": "MECHENG 240, Intro to Dynamics and Vibrations",
     "credits": 4,
     "req": "mecheng-240-intro-to-dynamics-and-vibrations"
    },
    {
     "label": "AEROSP 215, Introduction to Solid Mechanics and Aerospace Structures",
     "credits": 3,
     "req": "aerosp-215-introduction-to-solid-mechanics-and-a"
    },
    {
     "label": "AEROSP 200, Introduction to the Aerospace Enterprise",
     "credits": 2,
     "req": "aerosp-200-introduction-to-the-aerospace-enterpr"
    },
    {
     "label": "Technical Electives",
     "credits": 3,
     "req": "technical-electives"
    }
   ],
   [
    {
     "label": "Engineering distribution 1",
     "credits": 4,
     "req": "engineering-distribution-1"
    },
    {
     "label": "AEROSP 315, Aircraft and Spacecraft Structures",
     "credits": 3,
     "req": "aerosp-315-aircraft-and-spacecraft-structures"
    },
    {
     "label": "AEROSP 325, Aerodynamics",
     "credits": 3,
     "req": "aerosp-325-aerodynamics"
    },
    {
     "label": "AEROSP 350, Introduction to Aerospace Computing",
     "credits": 3,
     "req": "aerosp-350-introduction-to-aerospace-computing"
    },
    {
     "label": "AEROSP 388 or (AEROSP 205  4 credits Tech Electives)",
     "credits": 3,
     "req": "aerosp-388-or-aerosp-205-4-credits-tech-elective"
    }
   ],
   [
    {
     "label": "Engineering distribution 2",
     "credits": 4,
     "req": "engineering-distribution-2"
    },
    {
     "label": "AEROSP 335, Aircraft and Spacecraft Propulsion",
     "credits": 3,
     "req": "aerosp-335-aircraft-and-spacecraft-propulsion"
    },
    {
     "label": "AEROSP 341, Aircraft Dynamics (W) or AEROSP 343, Spacecraft Dynamics (F)",
     "credits": 3,
     "req": "aerosp-341-aircraft-dynamics-w-or-aerosp-343-spa"
    },
    {
     "label": "AEROSP 388 or (AEROSP 205  4 credits Tech Electives)",
     "credits": 4,
     "req": "aerosp-388-or-aerosp-205-4-credits-tech-elective"
    },
    {
     "label": "General Electives",
     "credits": 2,
     "req": "general-electives"
    }
   ],
   [
    {
     "label": "Intelectual Breadth",
     "credits": 4,
     "req": "intelectual-breadth"
    },
    {
     "label": "AEROSP 470, Control of Aerospace Vehicles",
     "credits": 3,
     "req": "aerosp-470-control-of-aerospace-vehicles"
    },
    {
     "label": "AEROSP 305, Aerospace Engineering Lab I",
     "credits": 4,
     "req": "aerosp-305-aerospace-engineering-lab-i"
    },
    {
     "label": "Technical Electives",
     "credits": 3,
     "req": "technical-electives"
    },
    {
     "label": "General Electives",
     "credits": 2,
     "req": "general-electives"
    }
   ],
   [
    {
     "label": "Intelectual Breadth",
     "credits": 4,
     "req": "intelectual-breadth"
    },
    {
     "label": "AEROSP 481, Aircraft Design (F) or AEROSP 483, Space System Design (W)",
     "credits": 4,
     "req": "aerosp-481-aircraft-design-f-or-aerosp-483-space"
    },
    {
     "label": "Technical Electives",
     "credits": 3,
     "req": "technical-electives"
    },
    {
     "label": "General Electives",
     "credits": 5,
     "req": "general-electives"
    }
   ]
  ]
 },
 {
  "id": "engineering-data-science",
  "name": "Data Science",
  "school": "College of Engineering (B.S.E.)",
  "sourceUrl": "https://bulletin.engin.umich.edu/eecs/",
  "sourceLabel": "Engineering Bulletin, FA26-WN27 sample schedule",
  "planIsOfficial": true,
  "planSourceUrl": "https://bulletin.engin.umich.edu/wp-content/uploads/sites/306/2026/03/FA26-WN27-DS-Eng-Sample-Schedule-.pdf",
  "notes": [
   "This follows the department's FA26-WN27 sample schedule. A plan may differ by when you started, so check the current Bulletin.",
   "It's only a sample: you don't have to follow it exactly, apart from prerequisite chains.",
   "Rows with several courses or choices are tracked by credits. The linked schedule has the details and footnotes."
  ],
  "requirements": [
   {
    "id": "mathematics-115-116-and-214-or-217",
    "group": "Subjects Required by all Programs",
    "label": "Mathematics 115, 116, and (214 or 217)",
    "target": 12,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "mathematics-215",
    "group": "Subjects Required by all Programs",
    "label": "Mathematics 215",
    "credits": 4,
    "anyOf": [
     [
      "math-215"
     ]
    ]
   },
   {
    "id": "engineering-100-introduction-to-engineering",
    "group": "Subjects Required by all Programs",
    "label": "Engineering 100, Introduction to Engineering",
    "credits": 4,
    "anyOf": [
     [
      "engr-100"
     ]
    ]
   },
   {
    "id": "engineering-101-introduction-to-computers",
    "group": "Subjects Required by all Programs",
    "label": "Engineering 101, Introduction to Computers",
    "credits": 4,
    "anyOf": [
     [
      "engr-101"
     ]
    ]
   },
   {
    "id": "chemistry-125-126-and-130-or-chemistry-210-and",
    "group": "Subjects Required by all Programs",
    "label": "Chemistry 125/126 and 130, or Chemistry 210 and",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "physics-140-and-lab-141",
    "group": "Subjects Required by all Programs",
    "label": "Physics 140 and Lab 141",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "physics-240-and-lab-241",
    "group": "Subjects Required by all Programs",
    "label": "Physics 240 and Lab 241",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "intellectual-breadth",
    "group": "Subjects Required by all Programs",
    "label": "Intellectual Breadth",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "discrete-mathematics-eecs-203-or-math-465",
    "group": "Program Core",
    "label": "Discrete Mathematics: EECS 203 or MATH 465",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "eecs-280-programming-and-elementary-data",
    "group": "Program Core",
    "label": "EECS 280, Programming and Elementary Data",
    "credits": 4,
    "anyOf": [
     [
      "eecs-280"
     ]
    ]
   },
   {
    "id": "eecs-281-data-structures-and-algorithms",
    "group": "Program Core",
    "label": "EECS 281, Data Structures and Algorithms",
    "credits": 4,
    "anyOf": [
     [
      "eecs-281"
     ]
    ]
   },
   {
    "id": "stats-412-introduction-to-probability-statistics",
    "group": "Program Core",
    "label": "STATS 412, Introduction to Probability & Statistics",
    "credits": 3,
    "anyOf": [
     [
      "stats-412"
     ]
    ]
   },
   {
    "id": "stats-datasci-413-applied-regression-analysis",
    "group": "Program Core",
    "label": "STATS/DATASCI 413, Applied Regression Analysis",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "databases-and-applications-eecs-484-or-eecs",
    "group": "Program Core",
    "label": "Databases and Applications: EECS 484 or EECS",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "machine-learning-data-mining-eecs-445-or",
    "group": "Program Core",
    "label": "Machine Learning/Data Mining: EECS 445 or",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "data-science-applications-elective-see-online-li",
    "group": "Program Core",
    "label": "Data Science Applications elective (see online list)",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "advanced-technical-electives-in-data-science",
    "group": "Program Core",
    "label": "Advanced Technical Electives in Data Science.",
    "target": 8,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "capstone-experience-course",
    "group": "Program Core",
    "label": "Capstone Experience Course",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "other-requirements",
    "group": "Program Core",
    "label": "Other Requirements",
    "target": 11,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "tchnclcm-300",
    "group": "Program Core",
    "label": "TCHNCLCM 300",
    "credits": 1,
    "anyOf": [
     [
      "tchnclcm-300"
     ]
    ]
   },
   {
    "id": "eecs-496-eecs-295-or-engr-499-002-or",
    "group": "Program Core",
    "label": "EECS 496, EECS 295, (or ENGR 499-002, or",
    "credits": 2,
    "anyOf": [
     [
      "eecs-496"
     ]
    ]
   },
   {
    "id": "tchnclcm-497-tchnclcm-499-stats-404-or",
    "group": "Program Core",
    "label": "TCHNCLCM 497, TCHNCLCM 499, STATS 404, or",
    "credits": 2,
    "anyOf": [
     [
      "tchnclcm-497"
     ]
    ]
   },
   {
    "id": "general-electives-15-credits-see-note-above",
    "group": "Program Core",
    "label": "General Electives (15 credits) – See note above",
    "target": 15,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   }
  ],
  "plan": [
   [
    {
     "label": "Mathematics 115, 116, and (214 or 217)",
     "credits": 4,
     "req": "mathematics-115-116-and-214-or-217"
    },
    {
     "label": "Engineering 101, Introduction to Computers",
     "credits": 4,
     "req": "engineering-101-introduction-to-computers"
    },
    {
     "label": "Chemistry 125/126 and 130, or Chemistry 210 and",
     "credits": 5,
     "req": "chemistry-125-126-and-130-or-chemistry-210-and"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, and (214 or 217)",
     "credits": 4,
     "req": "mathematics-115-116-and-214-or-217"
    },
    {
     "label": "Engineering 100, Introduction to Engineering",
     "credits": 4,
     "req": "engineering-100-introduction-to-engineering"
    },
    {
     "label": "Discrete Mathematics: EECS 203 or MATH 465",
     "credits": 4,
     "req": "discrete-mathematics-eecs-203-or-math-465"
    },
    {
     "label": "EECS 280, Programming and Elementary Data",
     "credits": 4,
     "req": "eecs-280-programming-and-elementary-data"
    }
   ],
   [
    {
     "label": "Mathematics 215",
     "credits": 4,
     "req": "mathematics-215"
    },
    {
     "label": "Physics 140 and Lab 141",
     "credits": 5,
     "req": "physics-140-and-lab-141"
    },
    {
     "label": "EECS 281, Data Structures and Algorithms",
     "credits": 4,
     "req": "eecs-281-data-structures-and-algorithms"
    },
    {
     "label": "General Electives (15 credits) – See note above",
     "credits": 3,
     "req": "general-electives-15-credits-see-note-above"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, and (214 or 217)",
     "credits": 4,
     "req": "mathematics-115-116-and-214-or-217"
    },
    {
     "label": "Physics 240 and Lab 241",
     "credits": 5,
     "req": "physics-240-and-lab-241"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "STATS 412, Introduction to Probability & Statistics",
     "credits": 3,
     "req": "stats-412-introduction-to-probability-statistics"
    }
   ],
   [
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "STATS/DATASCI 413, Applied Regression Analysis",
     "credits": 4,
     "req": "stats-datasci-413-applied-regression-analysis"
    },
    {
     "label": "Machine Learning/Data Mining: EECS 445 or",
     "credits": 4,
     "req": "machine-learning-data-mining-eecs-445-or"
    },
    {
     "label": "Other Requirements",
     "credits": 4,
     "req": "other-requirements"
    }
   ],
   [
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "Databases and Applications: EECS 484 or EECS",
     "credits": 4,
     "req": "databases-and-applications-eecs-484-or-eecs"
    },
    {
     "label": "Advanced Technical Electives in Data Science.",
     "credits": 4,
     "req": "advanced-technical-electives-in-data-science"
    },
    {
     "label": "TCHNCLCM 300",
     "credits": 1,
     "req": "tchnclcm-300"
    },
    {
     "label": "General Electives (15 credits) – See note above",
     "credits": 3,
     "req": "general-electives-15-credits-see-note-above"
    }
   ],
   [
    {
     "label": "Capstone Experience Course",
     "credits": 4,
     "req": "capstone-experience-course"
    },
    {
     "label": "Other Requirements",
     "credits": 4,
     "req": "other-requirements"
    },
    {
     "label": "EECS 496, EECS 295, (or ENGR 499-002, or",
     "credits": 2,
     "req": "eecs-496-eecs-295-or-engr-499-002-or"
    },
    {
     "label": "TCHNCLCM 497, TCHNCLCM 499, STATS 404, or",
     "credits": 2,
     "req": "tchnclcm-497-tchnclcm-499-stats-404-or"
    },
    {
     "label": "General Electives (15 credits) – See note above",
     "credits": 3,
     "req": "general-electives-15-credits-see-note-above"
    }
   ],
   [
    {
     "label": "Data Science Applications elective (see online list)",
     "credits": 3,
     "req": "data-science-applications-elective-see-online-li"
    },
    {
     "label": "Advanced Technical Electives in Data Science.",
     "credits": 4,
     "req": "advanced-technical-electives-in-data-science"
    },
    {
     "label": "Other Requirements",
     "credits": 3,
     "req": "other-requirements"
    },
    {
     "label": "General Electives (15 credits) – See note above",
     "credits": 6,
     "req": "general-electives-15-credits-see-note-above"
    }
   ]
  ]
 },
 {
  "id": "engineering-climate-and-meteorology",
  "name": "Climate and Meteorology",
  "school": "College of Engineering (B.S.E.)",
  "sourceUrl": "https://bulletin.engin.umich.edu/clasp/",
  "sourceLabel": "Engineering Bulletin, sample schedule dated February 2023",
  "planIsOfficial": true,
  "planSourceUrl": "https://bulletin.engin.umich.edu/wp-content/uploads/sites/306/2023/02/Program-Plan-CM-BSE-2.24.2023-Google-Sheets.pdf",
  "notes": [
   "This follows the department's sample schedule dated February 2023. A plan may differ by when you started, so check the current Bulletin.",
   "It's only a sample: you don't have to follow it exactly, apart from prerequisite chains.",
   "Rows with several courses or choices are tracked by credits. The linked schedule has the details and footnotes."
  ],
  "requirements": [
   {
    "id": "mathema-cs-115-116-215-and-216-16",
    "group": "Subjects Required by all Programs",
    "label": "Mathema\u0000cs 115, 116, 215, and 216 16",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "engineering-100-introduc-on-to-engineering",
    "group": "Subjects Required by all Programs",
    "label": "Engineering 100, Introduc\u0000on to Engineering",
    "credits": 4,
    "anyOf": [
     [
      "engr-100"
     ]
    ]
   },
   {
    "id": "engineering-101-introduc-on-to-computers",
    "group": "Subjects Required by all Programs",
    "label": "Engineering 101, Introduc\u0000on to Computers",
    "credits": 4,
    "anyOf": [
     [
      "engr-101"
     ]
    ]
   },
   {
    "id": "chemistry-125-126-and-130-or-chemistry-210-and-2",
    "group": "Subjects Required by all Programs",
    "label": "Chemistry 125/126 and 130 or Chemistry 210 and 2111",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "physics-140-with-lab-141-physics-240-with-lab-24",
    "group": "Subjects Required by all Programs",
    "label": "Physics 140 with Lab 141; Physics 240 with Lab 2412 10",
    "target": 10,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "intellectual-breadth-16",
    "group": "Subjects Required by all Programs",
    "label": "Intellectual Breadth 16",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "climate-320-earth-and-space-system-evolu-on",
    "group": "Required Core Subjects",
    "label": "CLIMATE 320, Earth and Space System Evolu\u0000on",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "climate-321-earth-and-space-system-dynamics",
    "group": "Required Core Subjects",
    "label": "CLIMATE 321, Earth and Space System Dynamics",
    "credits": 3,
    "anyOf": [
     [
      "climate-321"
     ]
    ]
   },
   {
    "id": "climate-323-earth-system-analysis",
    "group": "Required Core Subjects",
    "label": "CLIMATE 323, Earth System Analysis",
    "credits": 4,
    "anyOf": [
     [
      "climate-323"
     ]
    ]
   },
   {
    "id": "climate-350-atmospheric-thermodynamics",
    "group": "Required Core Subjects",
    "label": "CLIMATE 350, Atmospheric Thermodynamics",
    "credits": 3,
    "anyOf": [
     [
      "climate-350"
     ]
    ]
   },
   {
    "id": "climate-380-introduc-on-to-radia-ve-transfer",
    "group": "Required Core Subjects",
    "label": "CLIMATE 380, Introduc\u0000on to Radia\u0000ve Transfer",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "climate-401-geophysical-fluid-dynamics",
    "group": "Required Core Subjects",
    "label": "CLIMATE 401, Geophysical Fluid Dynamics",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "climate-410-earth-system-modeling",
    "group": "Required Core Subjects",
    "label": "CLIMATE 410, Earth System Modeling",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "climate-414-weather-systems",
    "group": "Required Core Subjects",
    "label": "CLIMATE 414, Weather Systems",
    "credits": 3,
    "anyOf": [
     [
      "climate-414"
     ]
    ]
   },
   {
    "id": "climate-324-instrumenta-on-for-atmos-space-scien",
    "group": "Required Core Subjects",
    "label": "CLIMATE 324, Instrumenta\u0000on for Atmos & Space Sciences",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "climate-423-data-analysis-and-visualiza-on",
    "group": "Required Core Subjects",
    "label": "CLIMATE 423, Data Analysis and Visualiza\u0000on",
    "credits": 4,
    "anyOf": [
     [
      "climate-423"
     ]
    ]
   },
   {
    "id": "climate-455-capstone-design4",
    "group": "Required Core Subjects",
    "label": "CLIMATE 455, Capstone Design4",
    "credits": 4,
    "anyOf": [
     [
      "climate-455"
     ]
    ]
   },
   {
    "id": "climate-411-cloud-and-precipita-on-process",
    "group": "Meteorology",
    "label": "CLIMATE 411, Cloud and Precipita\u0000on Process",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "climate-485-remote-sensing",
    "group": "Meteorology",
    "label": "CLIMATE 485, Remote Sensing",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "climate-463-boundary-layer-meteorology",
    "group": "Meteorology",
    "label": "CLIMATE 463, Boundary Layer Meteorology",
    "credits": 3,
    "anyOf": [
     [
      "climate-463"
     ]
    ]
   },
   {
    "id": "climate-440-meteorological-analysis-laboratory",
    "group": "Meteorology",
    "label": "CLIMATE 440, Meteorological Analysis Laboratory",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "technical-elec-ves-13",
    "group": "Meteorology",
    "label": "Technical Elec\u0000ves 13",
    "target": 13,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "general-elec-ves",
    "group": "Meteorology",
    "label": "General Elec\u0000ves",
    "target": 9,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   }
  ],
  "plan": [
   [
    {
     "label": "Mathema\u0000cs 115, 116, 215, and 216 16",
     "credits": 4,
     "req": "mathema-cs-115-116-215-and-216-16"
    },
    {
     "label": "Engineering 100, Introduc\u0000on to Engineering",
     "credits": 4,
     "req": "engineering-100-introduc-on-to-engineering"
    },
    {
     "label": "Chemistry 125/126 and 130 or Chemistry 210 and 2111",
     "credits": 5,
     "req": "chemistry-125-126-and-130-or-chemistry-210-and-2"
    },
    {
     "label": "Intellectual Breadth 16",
     "credits": 4,
     "req": "intellectual-breadth-16"
    }
   ],
   [
    {
     "label": "Mathema\u0000cs 115, 116, 215, and 216 16",
     "credits": 4,
     "req": "mathema-cs-115-116-215-and-216-16"
    },
    {
     "label": "Engineering 101, Introduc\u0000on to Computers",
     "credits": 4,
     "req": "engineering-101-introduc-on-to-computers"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab 2412 10",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab-24"
    },
    {
     "label": "Intellectual Breadth 16",
     "credits": 4,
     "req": "intellectual-breadth-16"
    }
   ],
   [
    {
     "label": "Mathema\u0000cs 115, 116, 215, and 216 16",
     "credits": 4,
     "req": "mathema-cs-115-116-215-and-216-16"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab 2412 10",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab-24"
    },
    {
     "label": "Intellectual Breadth 16",
     "credits": 4,
     "req": "intellectual-breadth-16"
    },
    {
     "label": "CLIMATE 320, Earth and Space System Evolu\u0000on",
     "credits": 3,
     "req": "climate-320-earth-and-space-system-evolu-on"
    }
   ],
   [
    {
     "label": "Mathema\u0000cs 115, 116, 215, and 216 16",
     "credits": 4,
     "req": "mathema-cs-115-116-215-and-216-16"
    },
    {
     "label": "Intellectual Breadth 16",
     "credits": 4,
     "req": "intellectual-breadth-16"
    },
    {
     "label": "CLIMATE 321, Earth and Space System Dynamics",
     "credits": 3,
     "req": "climate-321-earth-and-space-system-dynamics"
    },
    {
     "label": "CLIMATE 323, Earth System Analysis",
     "credits": 4,
     "req": "climate-323-earth-system-analysis"
    }
   ],
   [
    {
     "label": "CLIMATE 380, Introduc\u0000on to Radia\u0000ve Transfer",
     "credits": 3,
     "req": "climate-380-introduc-on-to-radia-ve-transfer"
    },
    {
     "label": "CLIMATE 401, Geophysical Fluid Dynamics",
     "credits": 3,
     "req": "climate-401-geophysical-fluid-dynamics"
    },
    {
     "label": "CLIMATE 463, Boundary Layer Meteorology",
     "credits": 3,
     "req": "climate-463-boundary-layer-meteorology"
    },
    {
     "label": "Technical Elec\u0000ves 13",
     "credits": 4,
     "req": "technical-elec-ves-13"
    },
    {
     "label": "General Elec\u0000ves",
     "credits": 3,
     "req": "general-elec-ves"
    }
   ],
   [
    {
     "label": "CLIMATE 350, Atmospheric Thermodynamics",
     "credits": 3,
     "req": "climate-350-atmospheric-thermodynamics"
    },
    {
     "label": "CLIMATE 414, Weather Systems",
     "credits": 3,
     "req": "climate-414-weather-systems"
    },
    {
     "label": "CLIMATE 324, Instrumenta\u0000on for Atmos & Space Sciences",
     "credits": 4,
     "req": "climate-324-instrumenta-on-for-atmos-space-scien"
    },
    {
     "label": "CLIMATE 423, Data Analysis and Visualiza\u0000on",
     "credits": 4,
     "req": "climate-423-data-analysis-and-visualiza-on"
    },
    {
     "label": "General Elec\u0000ves",
     "credits": 3,
     "req": "general-elec-ves"
    }
   ],
   [
    {
     "label": "CLIMATE 410, Earth System Modeling",
     "credits": 4,
     "req": "climate-410-earth-system-modeling"
    },
    {
     "label": "CLIMATE 440, Meteorological Analysis Laboratory",
     "credits": 4,
     "req": "climate-440-meteorological-analysis-laboratory"
    },
    {
     "label": "Technical Elec\u0000ves 13",
     "credits": 4,
     "req": "technical-elec-ves-13"
    },
    {
     "label": "General Elec\u0000ves",
     "credits": 3,
     "req": "general-elec-ves"
    }
   ],
   [
    {
     "label": "CLIMATE 455, Capstone Design4",
     "credits": 4,
     "req": "climate-455-capstone-design4"
    },
    {
     "label": "CLIMATE 411, Cloud and Precipita\u0000on Process",
     "credits": 3,
     "req": "climate-411-cloud-and-precipita-on-process"
    },
    {
     "label": "CLIMATE 485, Remote Sensing",
     "credits": 3,
     "req": "climate-485-remote-sensing"
    },
    {
     "label": "Technical Elec\u0000ves 13",
     "credits": 5,
     "req": "technical-elec-ves-13"
    }
   ]
  ]
 },
 {
  "id": "engineering-naval-architecture-and-marine-engineering",
  "name": "Naval Architecture and Marine Engineering",
  "school": "College of Engineering (B.S.E.)",
  "sourceUrl": "https://bulletin.engin.umich.edu/depts/name/",
  "sourceLabel": "Engineering Bulletin, sample schedule updated March 2025",
  "planIsOfficial": true,
  "planSourceUrl": "https://bulletin.engin.umich.edu/wp-content/uploads/sites/306/2025/04/NAME-Sample-Schedule-updated-3_28_25.pdf",
  "notes": [
   "This follows the department's sample schedule updated March 2025. A plan may differ by when you started, so check the current Bulletin.",
   "It's only a sample: you don't have to follow it exactly, apart from prerequisite chains.",
   "Rows with several courses or choices are tracked by credits. The linked schedule has the details and footnotes."
  ],
  "requirements": [
   {
    "id": "mathematics-115-116-215-and-216",
    "group": "Subjects Required by All Programs",
    "label": "Mathematics 115, 116, 215, and 216",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "engineering-100-introduction-to-engineering",
    "group": "Subjects Required by All Programs",
    "label": "Engineering 100, Introduction to Engineering",
    "credits": 4,
    "anyOf": [
     [
      "engr-100"
     ]
    ]
   },
   {
    "id": "engineering-101-introduction-to-computers",
    "group": "Subjects Required by All Programs",
    "label": "Engineering 101, Introduction to Computers",
    "credits": 4,
    "anyOf": [
     [
      "engr-101"
     ]
    ]
   },
   {
    "id": "chemistry-125-126-and-130-or-chemistry-210-and",
    "group": "Subjects Required by All Programs",
    "label": "Chemistry 125/126 and 130 or Chemistry 210 and",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "physics-140-with-lab-141-physics-240-with-lab-24",
    "group": "Subjects Required by All Programs",
    "label": "Physics 140 with Lab 141; Physics 240 with Lab 241",
    "target": 10,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "intellectual-breadth",
    "group": "Subjects Required by All Programs",
    "label": "Intellectual Breadth",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "me-211-solid-mechanics",
    "group": "Related Technical Core Subjects",
    "label": "ME 211, Solid Mechanics",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "me-240-introduction-to-dynamics",
    "group": "Related Technical Core Subjects",
    "label": "ME 240, Introduction to Dynamics",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "me-235-thermodynamics",
    "group": "Related Technical Core Subjects",
    "label": "ME 235, Thermodynamics",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "na-270-vessel-platform-design",
    "group": "Program Subjects",
    "label": "NA 270, Vessel/Platform Design",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "na-280-probability-for-marine-engineers",
    "group": "Program Subjects",
    "label": "NA 280, Probability for Marine Engineers",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "na-310-marine-structures-i",
    "group": "Program Subjects",
    "label": "NA 310, Marine Structures I",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "me-na-320-intro-to-fluid-mechanics",
    "group": "Program Subjects",
    "label": "ME/NA 320, Intro to Fluid Mechanics",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "na-321-marine-hydrodynamics",
    "group": "Program Subjects",
    "label": "NA 321, Marine Hydrodynamics",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "navarch-331-marine-power-and-energy-i",
    "group": "Program Subjects",
    "label": "NAVARCH 331, Marine Power and Energy I",
    "credits": 4,
    "anyOf": [
     [
      "navarch-331"
     ]
    ]
   },
   {
    "id": "na-332-marine-power-and-energy-ii",
    "group": "Program Subjects",
    "label": "NA 332, Marine Power and Energy II",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "na-340-marine-dynamics-i",
    "group": "Program Subjects",
    "label": "NA 340, Marine Dynamics I",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "na-370-conceptual-vessel-platform-design",
    "group": "Program Subjects",
    "label": "NA 370 Conceptual Vessel/Platform Design",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "na-461-marine-structures-construction",
    "group": "Program Subjects",
    "label": "NA 461, Marine Structures Construction",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "na-470-foundations-of-ship-design",
    "group": "Program Subjects",
    "label": "NA 470, Foundations of Ship Design",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "na-475-marine-design-team-project",
    "group": "Program Subjects",
    "label": "NA 475, Marine Design Team Project",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "na-492-marine-engineering-laboratory",
    "group": "Program Subjects",
    "label": "NA 492, Marine Engineering Laboratory",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "technical-electives",
    "group": "Program Subjects",
    "label": "Technical Electives",
    "target": 7,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   },
   {
    "id": "general-electives",
    "group": "Program Subjects",
    "label": "General Electives",
    "target": 8,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/name/"
   }
  ],
  "plan": [
   [
    {
     "label": "Mathematics 115, 116, 215, and 216",
     "credits": 4,
     "req": "mathematics-115-116-215-and-216"
    },
    {
     "label": "Engineering 100, Introduction to Engineering",
     "credits": 4,
     "req": "engineering-100-introduction-to-engineering"
    },
    {
     "label": "Chemistry 125/126 and 130 or Chemistry 210 and",
     "credits": 5,
     "req": "chemistry-125-126-and-130-or-chemistry-210-and"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and 216",
     "credits": 4,
     "req": "mathematics-115-116-215-and-216"
    },
    {
     "label": "Engineering 101, Introduction to Computers",
     "credits": 4,
     "req": "engineering-101-introduction-to-computers"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab 241",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab-24"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and 216",
     "credits": 4,
     "req": "mathematics-115-116-215-and-216"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab 241",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab-24"
    },
    {
     "label": "ME 235, Thermodynamics",
     "credits": 3,
     "req": "me-235-thermodynamics"
    },
    {
     "label": "NA 270, Vessel/Platform Design",
     "credits": 4,
     "req": "na-270-vessel-platform-design"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and 216",
     "credits": 4,
     "req": "mathematics-115-116-215-and-216"
    },
    {
     "label": "ME 211, Solid Mechanics",
     "credits": 4,
     "req": "me-211-solid-mechanics"
    },
    {
     "label": "ME 240, Introduction to Dynamics",
     "credits": 4,
     "req": "me-240-introduction-to-dynamics"
    },
    {
     "label": "NA 280, Probability for Marine Engineers",
     "credits": 3,
     "req": "na-280-probability-for-marine-engineers"
    },
    {
     "label": "General Electives",
     "credits": 2,
     "req": "general-electives"
    }
   ],
   [
    {
     "label": "ME/NA 320, Intro to Fluid Mechanics",
     "credits": 3,
     "req": "me-na-320-intro-to-fluid-mechanics"
    },
    {
     "label": "NAVARCH 331, Marine Power and Energy I",
     "credits": 4,
     "req": "navarch-331-marine-power-and-energy-i"
    },
    {
     "label": "NA 340, Marine Dynamics I",
     "credits": 4,
     "req": "na-340-marine-dynamics-i"
    },
    {
     "label": "General Electives",
     "credits": 4,
     "req": "general-electives"
    }
   ],
   [
    {
     "label": "NA 310, Marine Structures I",
     "credits": 4,
     "req": "na-310-marine-structures-i"
    },
    {
     "label": "NA 321, Marine Hydrodynamics",
     "credits": 4,
     "req": "na-321-marine-hydrodynamics"
    },
    {
     "label": "NA 332, Marine Power and Energy II",
     "credits": 4,
     "req": "na-332-marine-power-and-energy-ii"
    },
    {
     "label": "NA 370 Conceptual Vessel/Platform Design",
     "credits": 3,
     "req": "na-370-conceptual-vessel-platform-design"
    },
    {
     "label": "General Electives",
     "credits": 2,
     "req": "general-electives"
    }
   ],
   [
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "NA 470, Foundations of Ship Design",
     "credits": 4,
     "req": "na-470-foundations-of-ship-design"
    },
    {
     "label": "NA 492, Marine Engineering Laboratory",
     "credits": 3,
     "req": "na-492-marine-engineering-laboratory"
    },
    {
     "label": "Technical Electives",
     "credits": 3,
     "req": "technical-electives"
    }
   ],
   [
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "NA 461, Marine Structures Construction",
     "credits": 3,
     "req": "na-461-marine-structures-construction"
    },
    {
     "label": "NA 475, Marine Design Team Project",
     "credits": 4,
     "req": "na-475-marine-design-team-project"
    },
    {
     "label": "Technical Electives",
     "credits": 4,
     "req": "technical-electives"
    }
   ]
  ]
 },
 {
  "id": "engineering-nuclear-engineering-and-radiological-sciences",
  "name": "Nuclear Engineering and Radiological Sciences",
  "school": "College of Engineering (B.S.E.)",
  "sourceUrl": "https://bulletin.engin.umich.edu/depts/ners/",
  "sourceLabel": "Engineering Bulletin, sample schedule dated April 2026",
  "planIsOfficial": true,
  "planSourceUrl": "https://bulletin.engin.umich.edu/wp-content/uploads/sites/306/2026/04/NERS-Sample-Schedule-4-2026.pdf",
  "notes": [
   "This follows the department's sample schedule dated April 2026. A plan may differ by when you started, so check the current Bulletin.",
   "It's only a sample: you don't have to follow it exactly, apart from prerequisite chains.",
   "Rows with several courses or choices are tracked by credits. The linked schedule has the details and footnotes."
  ],
  "requirements": [
   {
    "id": "mathematics-115-116-215-and-ners-320",
    "group": "Subjects required by all programs",
    "label": "Mathematics 115, 116, 215, and NERS 320",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ners/"
   },
   {
    "id": "engr-100-intro-to-engr",
    "group": "Subjects required by all programs",
    "label": "Engr 100, Intro to Engr",
    "credits": 4,
    "anyOf": [
     [
      "engr-100"
     ]
    ]
   },
   {
    "id": "engr-101-intro-to-computers",
    "group": "Subjects required by all programs",
    "label": "Engr 101, Intro to Computers",
    "credits": 4,
    "anyOf": [
     [
      "engr-101"
     ]
    ]
   },
   {
    "id": "chemistry-125-126-and-130-or-chemistry-210-and-2",
    "group": "Subjects required by all programs",
    "label": "Chemistry 125/126 and 130 or Chemistry 210 and 211",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ners/"
   },
   {
    "id": "physics-140-with-lab-141-physics-240-with-lab-24",
    "group": "Subjects required by all programs",
    "label": "Physics 140 with Lab 141; Physics 240 with Lab 241",
    "target": 10,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ners/"
   },
   {
    "id": "intellectual-breadth",
    "group": "Subjects required by all programs",
    "label": "Intellectual Breadth",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ners/"
   },
   {
    "id": "matscie-250-princ-of-eng-materials-or-mse-220-in",
    "group": "Related Technical Subjects",
    "label": "MATSCIE 250, Princ of Eng Materials or MSE 220, Intro to Materials and Manf",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ners/"
   },
   {
    "id": "eecs-215-intro-to-circuits-or-eecs-314-electrica",
    "group": "Related Technical Subjects",
    "label": "EECS 215, Intro to Circuits or EECS 314,Electrical Circuits, Systems, and Applications",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ners/"
   },
   {
    "id": "mecheng-235-thermodynamics-i",
    "group": "Related Technical Subjects",
    "label": "MECHENG 235, Thermodynamics I",
    "credits": 3,
    "anyOf": [
     [
      "mecheng-235"
     ]
    ]
   },
   {
    "id": "ners-250-fundamentals-of-nuclear-eng-and-rad-sci",
    "group": "Program Subjects",
    "label": "NERS 250, Fundamentals of Nuclear Eng and Rad Sci",
    "credits": 4,
    "anyOf": [
     [
      "ners-250"
     ]
    ]
   },
   {
    "id": "ners-311-ele-of-nuc-eng-rad-sci-i",
    "group": "Program Subjects",
    "label": "NERS 311, Ele of Nuc Eng & Rad Sci I",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ners/"
   },
   {
    "id": "ners-312-ele-of-nuc-eng-rad-sci-ii",
    "group": "Program Subjects",
    "label": "NERS 312, Ele of Nuc Eng & Rad Sci II",
    "credits": 3,
    "anyOf": [
     [
      "ners-312"
     ]
    ]
   },
   {
    "id": "ners-315-nuclear-instr-lab",
    "group": "Program Subjects",
    "label": "NERS 315, Nuclear Instr Lab",
    "credits": 4,
    "anyOf": [
     [
      "ners-315"
     ]
    ]
   },
   {
    "id": "ners-344-fluid-mech-nucl-eng",
    "group": "Program Subjects",
    "label": "NERS 344, Fluid Mech Nucl Eng",
    "credits": 3,
    "anyOf": [
     [
      "ners-344"
     ]
    ]
   },
   {
    "id": "ners-420-applied-mathematics-for-engineering-phy",
    "group": "Program Subjects",
    "label": "NERS 420, Applied Mathematics for Engineering Physics II",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ners/"
   },
   {
    "id": "ners-441-nuclear-reactor-theory-i",
    "group": "Program Subjects",
    "label": "NERS 441, Nuclear Reactor Theory I",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ners/"
   },
   {
    "id": "ners-444-fundamentals-of-heat-and-mass-transfer",
    "group": "Program Subjects",
    "label": "NERS 444, Fundamentals of Heat and Mass Transfer",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ners/"
   },
   {
    "id": "laboratory-course-above-ners-315",
    "group": "Program Subjects",
    "label": "Laboratory Course (above NERS 315)",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ners/"
   },
   {
    "id": "ners-491-nuclear-engineering-and-radiological-sc",
    "group": "Program Subjects",
    "label": "NERS 491, Nuclear Engineering and Radiological Sciences Design I",
    "target": 1,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ners/"
   },
   {
    "id": "ners-492-nuclear-engineering-and-radiological-sc",
    "group": "Program Subjects",
    "label": "NERS 492, Nuclear Engineering and Radiological Sciences Design II",
    "credits": 3,
    "anyOf": [
     [
      "ners-492"
     ]
    ]
   },
   {
    "id": "ners-electives",
    "group": "Program Subjects",
    "label": "NERS Electives",
    "target": 9,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ners/"
   },
   {
    "id": "technical-electives-5-hours",
    "group": "Electives",
    "label": "Technical Electives (5 hours)",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ners/"
   },
   {
    "id": "general-electives-12-hours",
    "group": "Electives",
    "label": "General Electives (12 hours)",
    "target": 12,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ners/"
   }
  ],
  "plan": [
   [
    {
     "label": "Mathematics 115, 116, 215, and NERS 320",
     "credits": 4,
     "req": "mathematics-115-116-215-and-ners-320"
    },
    {
     "label": "Engr 100, Intro to Engr",
     "credits": 4,
     "req": "engr-100-intro-to-engr"
    },
    {
     "label": "Chemistry 125/126 and 130 or Chemistry 210 and 211",
     "credits": 5,
     "req": "chemistry-125-126-and-130-or-chemistry-210-and-2"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and NERS 320",
     "credits": 4,
     "req": "mathematics-115-116-215-and-ners-320"
    },
    {
     "label": "Engr 101, Intro to Computers",
     "credits": 4,
     "req": "engr-101-intro-to-computers"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab 241",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab-24"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and NERS 320",
     "credits": 4,
     "req": "mathematics-115-116-215-and-ners-320"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab 241",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab-24"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "General Electives (12 hours)",
     "credits": 3,
     "req": "general-electives-12-hours"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and NERS 320",
     "credits": 4,
     "req": "mathematics-115-116-215-and-ners-320"
    },
    {
     "label": "MATSCIE 250, Princ of Eng Materials or MSE 220, Intro to Materials and Manf",
     "credits": 4,
     "req": "matscie-250-princ-of-eng-materials-or-mse-220-in"
    },
    {
     "label": "NERS 250, Fundamentals of Nuclear Eng and Rad Sci",
     "credits": 4,
     "req": "ners-250-fundamentals-of-nuclear-eng-and-rad-sci"
    },
    {
     "label": "General Electives (12 hours)",
     "credits": 3,
     "req": "general-electives-12-hours"
    }
   ],
   [
    {
     "label": "EECS 215, Intro to Circuits or EECS 314,Electrical Circuits, Systems, and Applications",
     "credits": 4,
     "req": "eecs-215-intro-to-circuits-or-eecs-314-electrica"
    },
    {
     "label": "MECHENG 235, Thermodynamics I",
     "credits": 3,
     "req": "mecheng-235-thermodynamics-i"
    },
    {
     "label": "NERS 311, Ele of Nuc Eng & Rad Sci I",
     "credits": 3,
     "req": "ners-311-ele-of-nuc-eng-rad-sci-i"
    },
    {
     "label": "NERS 420, Applied Mathematics for Engineering Physics II",
     "credits": 4,
     "req": "ners-420-applied-mathematics-for-engineering-phy"
    },
    {
     "label": "Technical Electives (5 hours)",
     "credits": 2,
     "req": "technical-electives-5-hours"
    }
   ],
   [
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "NERS 312, Ele of Nuc Eng & Rad Sci II",
     "credits": 3,
     "req": "ners-312-ele-of-nuc-eng-rad-sci-ii"
    },
    {
     "label": "NERS 315, Nuclear Instr Lab",
     "credits": 4,
     "req": "ners-315-nuclear-instr-lab"
    },
    {
     "label": "NERS 344, Fluid Mech Nucl Eng",
     "credits": 3,
     "req": "ners-344-fluid-mech-nucl-eng"
    },
    {
     "label": "General Electives (12 hours)",
     "credits": 3,
     "req": "general-electives-12-hours"
    }
   ],
   [
    {
     "label": "NERS 441, Nuclear Reactor Theory I",
     "credits": 4,
     "req": "ners-441-nuclear-reactor-theory-i"
    },
    {
     "label": "NERS 444, Fundamentals of Heat and Mass Transfer",
     "credits": 3,
     "req": "ners-444-fundamentals-of-heat-and-mass-transfer"
    },
    {
     "label": "NERS 491, Nuclear Engineering and Radiological Sciences Design I",
     "credits": 1,
     "req": "ners-491-nuclear-engineering-and-radiological-sc"
    },
    {
     "label": "NERS Electives",
     "credits": 3,
     "req": "ners-electives"
    },
    {
     "label": "General Electives (12 hours)",
     "credits": 3,
     "req": "general-electives-12-hours"
    }
   ],
   [
    {
     "label": "Laboratory Course (above NERS 315)",
     "credits": 4,
     "req": "laboratory-course-above-ners-315"
    },
    {
     "label": "NERS 492, Nuclear Engineering and Radiological Sciences Design II",
     "credits": 3,
     "req": "ners-492-nuclear-engineering-and-radiological-sc"
    },
    {
     "label": "NERS Electives",
     "credits": 6,
     "req": "ners-electives"
    },
    {
     "label": "Technical Electives (5 hours)",
     "credits": 3,
     "req": "technical-electives-5-hours"
    }
   ]
  ]
 },
 {
  "id": "engineering-electrical-engineering",
  "name": "Electrical Engineering",
  "school": "College of Engineering (B.S.E.)",
  "sourceUrl": "https://bulletin.engin.umich.edu/eecs/",
  "sourceLabel": "Engineering Bulletin, FA26 sample schedule",
  "planIsOfficial": true,
  "planSourceUrl": "https://bulletin.engin.umich.edu/wp-content/uploads/sites/306/2026/03/FA26-Electrical-Engineering-Sample-Schedule-CoE-Bulletin.pdf",
  "notes": [
   "This follows the department's FA26 sample schedule. A plan may differ by when you started, so check the current Bulletin.",
   "It's only a sample: you don't have to follow it exactly, apart from prerequisite chains.",
   "Rows with several courses or choices are tracked by credits. The linked schedule has the details and footnotes."
  ],
  "requirements": [
   {
    "id": "math-115-116-215-216",
    "group": "CoE Common Core",
    "label": "MATH 115 , 116 , 215 , 216",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "engr-100",
    "group": "CoE Common Core",
    "label": "ENGR 100",
    "credits": 4,
    "anyOf": [
     [
      "engr-100"
     ]
    ]
   },
   {
    "id": "engr-101-or-151",
    "group": "CoE Common Core",
    "label": "ENGR 101 or 151",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "chem-125-126-130-or-chem-210-211",
    "group": "CoE Common Core",
    "label": "CHEM 125 / 126 / 130 or CHEM 210 / 211",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "physics-140-141-physics-240-241",
    "group": "CoE Common Core",
    "label": "PHYSICS 140 / 141 , PHYSICS 240 / 241",
    "target": 10,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "intellectual-breadth",
    "group": "CoE Common Core",
    "label": "Intellectual Breadth",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "eecs-200-ee-systems-design-i",
    "group": "EE Program Subjects",
    "label": "EECS 200 : EE Systems Design I",
    "credits": 2,
    "anyOf": [
     [
      "eecs-200"
     ]
    ]
   },
   {
    "id": "eecs-215-introduction-to-circuits",
    "group": "EE Program Subjects",
    "label": "EECS 215 : Introduction to Circuits",
    "credits": 4,
    "anyOf": [
     [
      "eecs-215"
     ]
    ]
   },
   {
    "id": "eecs-216-signals-and-systems",
    "group": "EE Program Subjects",
    "label": "EECS 216 : Signals and Systems",
    "credits": 4,
    "anyOf": [
     [
      "eecs-216"
     ]
    ]
   },
   {
    "id": "eecs-230-electromagnetics-i",
    "group": "EE Program Subjects",
    "label": "EECS 230 : Electromagnetics I",
    "credits": 4,
    "anyOf": [
     [
      "eecs-230"
     ]
    ]
   },
   {
    "id": "eecs-280-prog-and-intro-data-structures",
    "group": "EE Program Subjects",
    "label": "EECS 280 : Prog. and Intro. Data Structures",
    "credits": 4,
    "anyOf": [
     [
      "eecs-280"
     ]
    ]
   },
   {
    "id": "eecs-300-ee-systems-design-ii",
    "group": "EE Program Subjects",
    "label": "EECS 300 : EE Systems Design II",
    "credits": 3,
    "anyOf": [
     [
      "eecs-300"
     ]
    ]
   },
   {
    "id": "eecs-301-probabilistic-methods-in-engr",
    "group": "EE Program Subjects",
    "label": "EECS 301 : Probabilistic Methods in Engr.",
    "credits": 4,
    "anyOf": [
     [
      "eecs-301"
     ]
    ]
   },
   {
    "id": "eecs-400-ece-major-design-experience",
    "group": "EE Program Subjects",
    "label": "EECS 400 : ECE Major Design Experience",
    "credits": 2,
    "anyOf": [
     [
      "eecs-400"
     ]
    ]
   },
   {
    "id": "tchnclcm-300-tech-comm-for-eecs",
    "group": "EE Program Subjects",
    "label": "TCHNCLCM 300 : Tech. Comm. for EECS",
    "credits": 1,
    "anyOf": [
     [
      "tchnclcm-300"
     ]
    ]
   },
   {
    "id": "tchnclcm-496-adv-tech-comm-for-ece",
    "group": "EE Program Subjects",
    "label": "TCHNCLCM 496 : Adv. Tech. Comm. for ECE",
    "credits": 2,
    "anyOf": [
     [
      "tchnclcm-496"
     ]
    ]
   },
   {
    "id": "upper-level-ee-electives",
    "group": "Technical Electives",
    "label": "Upper Level EE Electives",
    "target": 19,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "major-design-experience",
    "group": "Technical Electives",
    "label": "Major Design Experience",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "flexible-technical-electives",
    "group": "Technical Electives",
    "label": "Flexible Technical Electives",
    "target": 9,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "general-electives-11-credits",
    "group": "Technical Electives",
    "label": "General Electives (11 credits)",
    "target": 11,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   }
  ],
  "plan": [
   [
    {
     "label": "MATH 115 , 116 , 215 , 216",
     "credits": 4,
     "req": "math-115-116-215-216"
    },
    {
     "label": "ENGR 100",
     "credits": 4,
     "req": "engr-100"
    },
    {
     "label": "CHEM 125 / 126 / 130 or CHEM 210 / 211",
     "credits": 5,
     "req": "chem-125-126-130-or-chem-210-211"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "MATH 115 , 116 , 215 , 216",
     "credits": 4,
     "req": "math-115-116-215-216"
    },
    {
     "label": "ENGR 101 or 151",
     "credits": 4,
     "req": "engr-101-or-151"
    },
    {
     "label": "PHYSICS 140 / 141 , PHYSICS 240 / 241",
     "credits": 5,
     "req": "physics-140-141-physics-240-241"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "MATH 115 , 116 , 215 , 216",
     "credits": 4,
     "req": "math-115-116-215-216"
    },
    {
     "label": "PHYSICS 140 / 141 , PHYSICS 240 / 241",
     "credits": 5,
     "req": "physics-140-141-physics-240-241"
    },
    {
     "label": "EECS 215 : Introduction to Circuits",
     "credits": 4,
     "req": "eecs-215-introduction-to-circuits"
    },
    {
     "label": "EECS 280 : Prog. and Intro. Data Structures",
     "credits": 4,
     "req": "eecs-280-prog-and-intro-data-structures"
    }
   ],
   [
    {
     "label": "MATH 115 , 116 , 215 , 216",
     "credits": 4,
     "req": "math-115-116-215-216"
    },
    {
     "label": "EECS 200 : EE Systems Design I",
     "credits": 2,
     "req": "eecs-200-ee-systems-design-i"
    },
    {
     "label": "EECS 216 : Signals and Systems",
     "credits": 4,
     "req": "eecs-216-signals-and-systems"
    },
    {
     "label": "EECS 230 : Electromagnetics I",
     "credits": 4,
     "req": "eecs-230-electromagnetics-i"
    },
    {
     "label": "General Electives (11 credits)",
     "credits": 3,
     "req": "general-electives-11-credits"
    }
   ],
   [
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "EECS 301 : Probabilistic Methods in Engr.",
     "credits": 4,
     "req": "eecs-301-probabilistic-methods-in-engr"
    },
    {
     "label": "TCHNCLCM 300 : Tech. Comm. for EECS",
     "credits": 1,
     "req": "tchnclcm-300-tech-comm-for-eecs"
    },
    {
     "label": "Upper Level EE Electives",
     "credits": 4,
     "req": "upper-level-ee-electives"
    },
    {
     "label": "Flexible Technical Electives",
     "credits": 3,
     "req": "flexible-technical-electives"
    }
   ],
   [
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "EECS 300 : EE Systems Design II",
     "credits": 3,
     "req": "eecs-300-ee-systems-design-ii"
    },
    {
     "label": "Upper Level EE Electives",
     "credits": 8,
     "req": "upper-level-ee-electives"
    }
   ],
   [
    {
     "label": "Upper Level EE Electives",
     "credits": 7,
     "req": "upper-level-ee-electives"
    },
    {
     "label": "Flexible Technical Electives",
     "credits": 3,
     "req": "flexible-technical-electives"
    },
    {
     "label": "General Electives (11 credits)",
     "credits": 4,
     "req": "general-electives-11-credits"
    }
   ],
   [
    {
     "label": "EECS 400 : ECE Major Design Experience",
     "credits": 2,
     "req": "eecs-400-ece-major-design-experience"
    },
    {
     "label": "TCHNCLCM 496 : Adv. Tech. Comm. for ECE",
     "credits": 2,
     "req": "tchnclcm-496-adv-tech-comm-for-ece"
    },
    {
     "label": "Major Design Experience",
     "credits": 4,
     "req": "major-design-experience"
    },
    {
     "label": "Flexible Technical Electives",
     "credits": 3,
     "req": "flexible-technical-electives"
    },
    {
     "label": "General Electives (11 credits)",
     "credits": 4,
     "req": "general-electives-11-credits"
    }
   ]
  ]
 },
 {
  "id": "engineering-materials-science-and-engineering",
  "name": "Materials Science and Engineering",
  "school": "College of Engineering (B.S.E.)",
  "sourceUrl": "https://bulletin.engin.umich.edu/depts/mse-2/",
  "sourceLabel": "Engineering Bulletin, sample schedule posted March 2026",
  "planIsOfficial": true,
  "planSourceUrl": "https://bulletin.engin.umich.edu/wp-content/uploads/sites/306/2026/03/Materials-Science-and-Engineering-Sample-Schedule.pdf",
  "notes": [
   "This follows the department's sample schedule posted March 2026. A plan may differ by when you started, so check the current Bulletin.",
   "It's only a sample: you don't have to follow it exactly, apart from prerequisite chains.",
   "Rows with several courses or choices are tracked by credits. The linked schedule has the details and footnotes."
  ],
  "requirements": [
   {
    "id": "math-115-116-215-216",
    "group": "CoE Common Core",
    "label": "MATH 115 , 116 , 215 , 216",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/mse-2/"
   },
   {
    "id": "engr-100",
    "group": "CoE Common Core",
    "label": "ENGR 100",
    "credits": 4,
    "anyOf": [
     [
      "engr-100"
     ]
    ]
   },
   {
    "id": "engr-101",
    "group": "CoE Common Core",
    "label": "ENGR 101",
    "credits": 4,
    "anyOf": [
     [
      "engr-101"
     ]
    ]
   },
   {
    "id": "chem-125-126-130-or-chem-210-211",
    "group": "CoE Common Core",
    "label": "CHEM 125 / 126 / 130 or CHEM 210 / 211",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/mse-2/"
   },
   {
    "id": "physics-140-141-physics-240-241",
    "group": "CoE Common Core",
    "label": "PHYSICS 140 / 141 , PHYSICS 240 / 241",
    "target": 10,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/mse-2/"
   },
   {
    "id": "intellectual-breadth",
    "group": "CoE Common Core",
    "label": "Intellectual Breadth",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/mse-2/"
   },
   {
    "id": "matscie-250-manufacturing-principles-of-engineer",
    "group": "MSE Program Subjects",
    "label": "MATSCIE 250 : Manufacturing Principles of Engineering Materials",
    "credits": 4,
    "anyOf": [
     [
      "matscie-250"
     ]
    ]
   },
   {
    "id": "matscie-242-physics-of-materials",
    "group": "MSE Program Subjects",
    "label": "MATSCIE 242 : Physics of Materials",
    "credits": 4,
    "anyOf": [
     [
      "matscie-242"
     ]
    ]
   },
   {
    "id": "matscie-330-thermodynamics-of-materials",
    "group": "MSE Program Subjects",
    "label": "MATSCIE 330: Thermodynamics of Materials",
    "credits": 4,
    "anyOf": [
     [
      "matscie-330"
     ]
    ]
   },
   {
    "id": "matscie-335-kinetics-and-transport-in-materials-",
    "group": "MSE Program Subjects",
    "label": "MATSCIE 335 : Kinetics and Transport in Materials Engineering",
    "credits": 4,
    "anyOf": [
     [
      "matscie-335"
     ]
    ]
   },
   {
    "id": "matscie-350-structures-of-materials",
    "group": "MSE Program Subjects",
    "label": "MATSCIE 350 : Structures of Materials",
    "credits": 4,
    "anyOf": [
     [
      "matscie-350"
     ]
    ]
   },
   {
    "id": "matscie-360-materials-laboratory-i",
    "group": "MSE Program Subjects",
    "label": "MATSCIE 360 : Materials Laboratory I",
    "credits": 3,
    "anyOf": [
     [
      "matscie-360"
     ]
    ]
   },
   {
    "id": "matscie-365-materials-laboratory-ii",
    "group": "MSE Program Subjects",
    "label": "MATSCIE 365 : Materials Laboratory II",
    "credits": 3,
    "anyOf": [
     [
      "matscie-365"
     ]
    ]
   },
   {
    "id": "matscie-420-mechanical-properties-of-materials",
    "group": "MSE Program Subjects",
    "label": "MATSCIE 420 : Mechanical properties of Materials",
    "credits": 3,
    "anyOf": [
     [
      "matscie-420"
     ]
    ]
   },
   {
    "id": "matscie-481-sustainable-design-of-materials-and-",
    "group": "MSE Program Subjects",
    "label": "MATSCIE 481 : Sustainable Design of Materials and Engineering",
    "credits": 3,
    "anyOf": [
     [
      "matscie-481"
     ]
    ]
   },
   {
    "id": "matscie-482-materials-processing-design",
    "group": "MSE Program Subjects",
    "label": "MATSCIE 482 : Materials Processing Design",
    "credits": 3,
    "anyOf": [
     [
      "matscie-482"
     ]
    ]
   },
   {
    "id": "four-mse-electives",
    "group": "MSE Program Subjects",
    "label": "Four MSE Electives",
    "target": 12,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/mse-2/"
   },
   {
    "id": "mecheng-211-introduction-to-solid-mechanics",
    "group": "Science and Technical Electives",
    "label": "MECHENG 211 : Introduction to Solid Mechanics",
    "credits": 4,
    "anyOf": [
     [
      "mecheng-211"
     ]
    ]
   },
   {
    "id": "matscie-254-mathematical-models-of-materials-sci",
    "group": "Science and Technical Electives",
    "label": "MATSCIE 254 : Mathematical Models of Materials Science",
    "credits": 3,
    "anyOf": [
     [
      "matscie-254"
     ]
    ]
   },
   {
    "id": "science-and-technical-electives",
    "group": "Science and Technical Electives",
    "label": "Science and Technical Electives",
    "target": 7,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/mse-2/"
   },
   {
    "id": "general-electives-12-credits",
    "group": "Science and Technical Electives",
    "label": "General Electives (12 credits)",
    "target": 12,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/mse-2/"
   }
  ],
  "plan": [
   [
    {
     "label": "MATH 115 , 116 , 215 , 216",
     "credits": 4,
     "req": "math-115-116-215-216"
    },
    {
     "label": "ENGR 100",
     "credits": 4,
     "req": "engr-100"
    },
    {
     "label": "CHEM 125 / 126 / 130 or CHEM 210 / 211",
     "credits": 5,
     "req": "chem-125-126-130-or-chem-210-211"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "MATH 115 , 116 , 215 , 216",
     "credits": 4,
     "req": "math-115-116-215-216"
    },
    {
     "label": "ENGR 101",
     "credits": 4,
     "req": "engr-101"
    },
    {
     "label": "PHYSICS 140 / 141 , PHYSICS 240 / 241",
     "credits": 5,
     "req": "physics-140-141-physics-240-241"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "MATH 115 , 116 , 215 , 216",
     "credits": 4,
     "req": "math-115-116-215-216"
    },
    {
     "label": "PHYSICS 140 / 141 , PHYSICS 240 / 241",
     "credits": 5,
     "req": "physics-140-141-physics-240-241"
    },
    {
     "label": "MATSCIE 250 : Manufacturing Principles of Engineering Materials",
     "credits": 4,
     "req": "matscie-250-manufacturing-principles-of-engineer"
    },
    {
     "label": "MATSCIE 254 : Mathematical Models of Materials Science",
     "credits": 3,
     "req": "matscie-254-mathematical-models-of-materials-sci"
    }
   ],
   [
    {
     "label": "MATH 115 , 116 , 215 , 216",
     "credits": 4,
     "req": "math-115-116-215-216"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "MATSCIE 242 : Physics of Materials",
     "credits": 4,
     "req": "matscie-242-physics-of-materials"
    },
    {
     "label": "MECHENG 211 : Introduction to Solid Mechanics",
     "credits": 4,
     "req": "mecheng-211-introduction-to-solid-mechanics"
    }
   ],
   [
    {
     "label": "MATSCIE 330: Thermodynamics of Materials",
     "credits": 4,
     "req": "matscie-330-thermodynamics-of-materials"
    },
    {
     "label": "MATSCIE 350 : Structures of Materials",
     "credits": 4,
     "req": "matscie-350-structures-of-materials"
    },
    {
     "label": "MATSCIE 360 : Materials Laboratory I",
     "credits": 3,
     "req": "matscie-360-materials-laboratory-i"
    },
    {
     "label": "Four MSE Electives",
     "credits": 3,
     "req": "four-mse-electives"
    }
   ],
   [
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "MATSCIE 335 : Kinetics and Transport in Materials Engineering",
     "credits": 4,
     "req": "matscie-335-kinetics-and-transport-in-materials-"
    },
    {
     "label": "MATSCIE 365 : Materials Laboratory II",
     "credits": 3,
     "req": "matscie-365-materials-laboratory-ii"
    },
    {
     "label": "Four MSE Electives",
     "credits": 3,
     "req": "four-mse-electives"
    },
    {
     "label": "General Electives (12 credits)",
     "credits": 3,
     "req": "general-electives-12-credits"
    }
   ],
   [
    {
     "label": "MATSCIE 420 : Mechanical properties of Materials",
     "credits": 3,
     "req": "matscie-420-mechanical-properties-of-materials"
    },
    {
     "label": "MATSCIE 481 : Sustainable Design of Materials and Engineering",
     "credits": 3,
     "req": "matscie-481-sustainable-design-of-materials-and-"
    },
    {
     "label": "Four MSE Electives",
     "credits": 3,
     "req": "four-mse-electives"
    },
    {
     "label": "Science and Technical Electives",
     "credits": 4,
     "req": "science-and-technical-electives"
    },
    {
     "label": "General Electives (12 credits)",
     "credits": 3,
     "req": "general-electives-12-credits"
    }
   ],
   [
    {
     "label": "MATSCIE 482 : Materials Processing Design",
     "credits": 3,
     "req": "matscie-482-materials-processing-design"
    },
    {
     "label": "Four MSE Electives",
     "credits": 3,
     "req": "four-mse-electives"
    },
    {
     "label": "Science and Technical Electives",
     "credits": 3,
     "req": "science-and-technical-electives"
    },
    {
     "label": "General Electives (12 credits)",
     "credits": 6,
     "req": "general-electives-12-credits"
    }
   ]
  ]
 },
 {
  "id": "engineering-industrial-and-operations-engineering",
  "name": "Industrial and Operations Engineering",
  "school": "College of Engineering (B.S.E.)",
  "sourceUrl": "https://bulletin.engin.umich.edu/depts/ioe-2/",
  "sourceLabel": "Engineering Bulletin, sample schedule dated April 2026",
  "planIsOfficial": true,
  "planSourceUrl": "https://bulletin.engin.umich.edu/wp-content/uploads/sites/306/2026/04/IOE-Sample-Schedule_4.17.26.pdf",
  "notes": [
   "This follows the department's sample schedule dated April 2026. A plan may differ by when you started, so check the current Bulletin.",
   "It's only a sample: you don't have to follow it exactly, apart from prerequisite chains.",
   "Rows with several courses or choices are tracked by credits. The linked schedule has the details and footnotes."
  ],
  "requirements": [
   {
    "id": "mathematics-115-116-215-and-214",
    "group": "Subjects required by all programs",
    "label": "Mathematics 115, 116, 215, and 214",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ioe-2/"
   },
   {
    "id": "engr-100-intro-to-engr",
    "group": "Subjects required by all programs",
    "label": "Engr 100, Intro to Engr",
    "credits": 4,
    "anyOf": [
     [
      "engr-100"
     ]
    ]
   },
   {
    "id": "engr-101-intro-to-computers",
    "group": "Subjects required by all programs",
    "label": "Engr 101, Intro to Computers",
    "credits": 4,
    "anyOf": [
     [
      "engr-101"
     ]
    ]
   },
   {
    "id": "chemistry-125-126-and-130-or-chemistry-210-and-2",
    "group": "Subjects required by all programs",
    "label": "Chemistry 125/126 and 130 or Chemistry 210 and 211",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ioe-2/"
   },
   {
    "id": "physics-140-with-lab-141-physics-240-with-lab-24",
    "group": "Subjects required by all programs",
    "label": "Physics 140 with Lab 141; Physics 240 with Lab 241",
    "target": 10,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ioe-2/"
   },
   {
    "id": "intellectual-breadth",
    "group": "Subjects required by all programs",
    "label": "Intellectual Breadth",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ioe-2/"
   },
   {
    "id": "non-ioe-engineering-courses-11-12-hours",
    "group": "Related Engineering Subjects",
    "label": "Non-IOE Engineering Courses (11-12 hours)",
    "target": 12,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ioe-2/"
   },
   {
    "id": "ioe-201-industrial-operations-modeling",
    "group": "Required Program Subjects",
    "label": "IOE 201, Industrial, Operations Modeling",
    "credits": 2,
    "anyOf": [
     [
      "ioe-201"
     ]
    ]
   },
   {
    "id": "ioe-202-operations-modeling",
    "group": "Required Program Subjects",
    "label": "IOE 202, Operations Modeling",
    "credits": 2,
    "anyOf": [
     [
      "ioe-202"
     ]
    ]
   },
   {
    "id": "ioe-265-engr-probability-and-statistics",
    "group": "Required Program Subjects",
    "label": "IOE 265, Engr Probability and Statistics",
    "credits": 3,
    "anyOf": [
     [
      "ioe-265"
     ]
    ]
   },
   {
    "id": "ioe-310-intro-to-optim-methods",
    "group": "Required Program Subjects",
    "label": "IOE 310, Intro to Optim Methods",
    "credits": 3,
    "anyOf": [
     [
      "ioe-310"
     ]
    ]
   },
   {
    "id": "ioe-333-ergonomics",
    "group": "Required Program Subjects",
    "label": "IOE 333, Ergonomics",
    "credits": 3,
    "anyOf": [
     [
      "ioe-333"
     ]
    ]
   },
   {
    "id": "ioe-316-intro-to-markov-processes",
    "group": "Required Program Subjects",
    "label": "IOE 316, Intro to Markov Processes",
    "credits": 3,
    "anyOf": [
     [
      "ioe-316"
     ]
    ]
   },
   {
    "id": "ioe-366-linear-statistical-models",
    "group": "Required Program Subjects",
    "label": "IOE 366, Linear Statistical Models",
    "credits": 3,
    "anyOf": [
     [
      "ioe-366"
     ]
    ]
   },
   {
    "id": "ioe-373-data-processing",
    "group": "Required Program Subjects",
    "label": "IOE 373, Data Processing",
    "credits": 4,
    "anyOf": [
     [
      "ioe-373"
     ]
    ]
   },
   {
    "id": "ioe-474-simulation",
    "group": "Required Program Subjects",
    "label": "IOE 474, Simulation",
    "credits": 4,
    "anyOf": [
     [
      "ioe-474"
     ]
    ]
   },
   {
    "id": "ioe-senior-design-course-ioe-424-481-499",
    "group": "Required Program Subjects",
    "label": "IOE Senior Design Course IOE 424, 481, 499",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ioe-2/"
   },
   {
    "id": "tc-380-technical-communication-in-ioe",
    "group": "Required Program Subjects",
    "label": "TC 380, Technical Communication in IOE",
    "target": 2,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ioe-2/"
   },
   {
    "id": "technical-electives-19",
    "group": "Required Program Subjects",
    "label": "Technical Electives (19)",
    "target": 19,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ioe-2/"
   },
   {
    "id": "general-electives-9-12-hours-9-12",
    "group": "Required Program Subjects",
    "label": "General Electives (9-12 hours) 9-12",
    "target": 9,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ioe-2/"
   }
  ],
  "plan": [
   [
    {
     "label": "Mathematics 115, 116, 215, and 214",
     "credits": 4,
     "req": "mathematics-115-116-215-and-214"
    },
    {
     "label": "Engr 100, Intro to Engr",
     "credits": 4,
     "req": "engr-100-intro-to-engr"
    },
    {
     "label": "Chemistry 125/126 and 130 or Chemistry 210 and 211",
     "credits": 5,
     "req": "chemistry-125-126-and-130-or-chemistry-210-and-2"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and 214",
     "credits": 4,
     "req": "mathematics-115-116-215-and-214"
    },
    {
     "label": "Engr 101, Intro to Computers",
     "credits": 4,
     "req": "engr-101-intro-to-computers"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab 241",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab-24"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and 214",
     "credits": 4,
     "req": "mathematics-115-116-215-and-214"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab 241",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab-24"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "IOE 201, Industrial, Operations Modeling",
     "credits": 2,
     "req": "ioe-201-industrial-operations-modeling"
    },
    {
     "label": "IOE 202, Operations Modeling",
     "credits": 2,
     "req": "ioe-202-operations-modeling"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and 214",
     "credits": 4,
     "req": "mathematics-115-116-215-and-214"
    },
    {
     "label": "Non-IOE Engineering Courses (11-12 hours)",
     "credits": 4,
     "req": "non-ioe-engineering-courses-11-12-hours"
    },
    {
     "label": "IOE 265, Engr Probability and Statistics",
     "credits": 3,
     "req": "ioe-265-engr-probability-and-statistics"
    },
    {
     "label": "IOE 333, Ergonomics",
     "credits": 3,
     "req": "ioe-333-ergonomics"
    }
   ],
   [
    {
     "label": "Non-IOE Engineering Courses (11-12 hours)",
     "credits": 4,
     "req": "non-ioe-engineering-courses-11-12-hours"
    },
    {
     "label": "IOE 310, Intro to Optim Methods",
     "credits": 3,
     "req": "ioe-310-intro-to-optim-methods"
    },
    {
     "label": "IOE 316, Intro to Markov Processes",
     "credits": 3,
     "req": "ioe-316-intro-to-markov-processes"
    },
    {
     "label": "IOE 366, Linear Statistical Models",
     "credits": 3,
     "req": "ioe-366-linear-statistical-models"
    },
    {
     "label": "Technical Electives (19)",
     "credits": 3,
     "req": "technical-electives-19"
    }
   ],
   [
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "IOE 373, Data Processing",
     "credits": 4,
     "req": "ioe-373-data-processing"
    },
    {
     "label": "TC 380, Technical Communication in IOE",
     "credits": 2,
     "req": "tc-380-technical-communication-in-ioe"
    },
    {
     "label": "Technical Electives (19)",
     "credits": 6,
     "req": "technical-electives-19"
    }
   ],
   [
    {
     "label": "IOE 474, Simulation",
     "credits": 4,
     "req": "ioe-474-simulation"
    },
    {
     "label": "Technical Electives (19)",
     "credits": 6,
     "req": "technical-electives-19"
    },
    {
     "label": "General Electives (9-12 hours) 9-12",
     "credits": 6,
     "req": "general-electives-9-12-hours-9-12"
    }
   ],
   [
    {
     "label": "Non-IOE Engineering Courses (11-12 hours)",
     "credits": 4,
     "req": "non-ioe-engineering-courses-11-12-hours"
    },
    {
     "label": "IOE Senior Design Course IOE 424, 481, 499",
     "credits": 4,
     "req": "ioe-senior-design-course-ioe-424-481-499"
    },
    {
     "label": "Technical Electives (19)",
     "credits": 4,
     "req": "technical-electives-19"
    },
    {
     "label": "General Electives (9-12 hours) 9-12",
     "credits": 3,
     "req": "general-electives-9-12-hours-9-12"
    }
   ]
  ]
 }
];
