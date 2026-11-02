// Generated from official Engineering Bulletin sample schedules. Each plan's rows
// were checked against the PDF's printed per-term credit totals. Exceptions are
// stated in that plan's notes.

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
    "id": "mathematics-115-116-215-and",
    "group": "Subjects Required by all Programs",
    "label": "Mathematics 115, 116, 215, and",
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
    "id": "chem-125-126-130-or-210",
    "group": "Subjects Required by all Programs",
    "label": "CHEM 125/126, 130 or 210,",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/aero/"
   },
   {
    "id": "physics-140-with-lab",
    "group": "Subjects Required by all Programs",
    "label": "Physics 140 with Lab",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/aero/"
   },
   {
    "id": "physics-240-with-lab",
    "group": "Subjects Required by all Programs",
    "label": "Physics 240 with Lab",
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
    "id": "engineering-distribution",
    "group": "Related Technical Core Subjects",
    "label": "Engineering distribution",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/aero/"
   },
   {
    "id": "engineering-distribution-2",
    "group": "Related Technical Core Subjects",
    "label": "Engineering distribution",
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
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
    },
    {
     "label": "ENGR 100, Introduction to Engineering",
     "credits": 4,
     "req": "engr-100-introduction-to-engineering"
    },
    {
     "label": "CHEM 125/126, 130 or 210,",
     "credits": 5,
     "req": "chem-125-126-130-or-210"
    },
    {
     "label": "Intelectual Breadth",
     "credits": 3,
     "req": "intelectual-breadth"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
    },
    {
     "label": "ENGR 101, Introduction to Computers",
     "credits": 4,
     "req": "engr-101-introduction-to-computers"
    },
    {
     "label": "Physics 140 with Lab",
     "credits": 5,
     "req": "physics-140-with-lab"
    },
    {
     "label": "Intelectual Breadth",
     "credits": 3,
     "req": "intelectual-breadth"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
    },
    {
     "label": "Physics 240 with Lab",
     "credits": 5,
     "req": "physics-240-with-lab"
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
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
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
     "label": "Engineering distribution",
     "credits": 4,
     "req": "engineering-distribution"
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
     "label": "Engineering distribution",
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
  "id": "engineering-chemical-engineering",
  "name": "Chemical Engineering",
  "school": "College of Engineering (B.S.E.)",
  "sourceUrl": "https://bulletin.engin.umich.edu/che/",
  "sourceLabel": "Engineering Bulletin, sample schedule revised September 2023",
  "planIsOfficial": true,
  "planSourceUrl": "https://bulletin.engin.umich.edu/wp-content/uploads/sites/306/2024/03/Chemical_Engineering_BSE_Sample-Schedule.pdf",
  "notes": [
   "Other courses may replace CHEM 261; see the notes on the schedule.",
   "This follows the department's sample schedule revised September 2023. A plan may differ by when you started, so check the current Bulletin.",
   "It's only a sample: you don't have to follow it exactly, apart from prerequisite chains.",
   "Rows with several courses or choices are tracked by credits. The linked schedule has the details and footnotes."
  ],
  "requirements": [
   {
    "id": "mathematics-115-116-215",
    "group": "Subjects Required by all Programs",
    "label": "Mathematics 115, 116, 215,",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/che/"
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
    "id": "chemistry",
    "group": "Subjects Required by all Programs",
    "label": "Chemistry",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/che/"
   },
   {
    "id": "physics-140-with-lab-141-physics-240-with-lab",
    "group": "Subjects Required by all Programs",
    "label": "Physics 140 with Lab 141; Physics 240 with Lab",
    "target": 10,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/che/"
   },
   {
    "id": "intellectual-breadth-to-include-a-course-in-micr",
    "group": "Subjects Required by all Programs",
    "label": "Intellectual Breadth (to include a course in micro or macro economics)",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/che/"
   },
   {
    "id": "chemistry-210-211-structure-and-reactivity-i-and",
    "group": "Advanced Chemistry",
    "label": "Chemistry 210/211, Structure and Reactivity I and Lab",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/che/"
   },
   {
    "id": "chemistry-215-216-structure-and-reactivity-ii-an",
    "group": "Advanced Chemistry",
    "label": "Chemistry 215/216, Structure and Reactivity II and Lab",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/che/"
   },
   {
    "id": "biology-life-science-elective-typically-bio-172-",
    "group": "Related Technical Subjects",
    "label": "Biology/Life Science Elective (Typically Bio 172 or 174)",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/che/"
   },
   {
    "id": "materials-elective-mse-250-or-mse-220",
    "group": "Related Technical Subjects",
    "label": "Materials Elective (MSE 250 or MSE 220)",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/che/"
   },
   {
    "id": "engineering-electives",
    "group": "Related Technical Subjects",
    "label": "Engineering Electives",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/che/"
   },
   {
    "id": "che-230-material-and-energy-balances",
    "group": "Program Subjects",
    "label": "CHE 230 Material and Energy Balances",
    "credits": 4,
    "anyOf": [
     [
      "che-230"
     ]
    ]
   },
   {
    "id": "che-330-chemical-and-engineering-thermodynamics",
    "group": "Program Subjects",
    "label": "CHE 330 Chemical and Engineering Thermodynamics",
    "credits": 4,
    "anyOf": [
     [
      "che-330"
     ]
    ]
   },
   {
    "id": "che-341-fluid-mechanics",
    "group": "Program Subjects",
    "label": "CHE 341 Fluid Mechanics",
    "credits": 4,
    "anyOf": [
     [
      "che-341"
     ]
    ]
   },
   {
    "id": "che-342-mass-and-heat-transfer",
    "group": "Program Subjects",
    "label": "CHE 342 Mass and Heat Transfer",
    "credits": 4,
    "anyOf": [
     [
      "che-342"
     ]
    ]
   },
   {
    "id": "che-343-separation-processes",
    "group": "Program Subjects",
    "label": "CHE 343 Separation Processes",
    "credits": 4,
    "anyOf": [
     [
      "che-343"
     ]
    ]
   },
   {
    "id": "che-360-chemical-engineering-laboratory-i",
    "group": "Program Subjects",
    "label": "CHE 360 Chemical Engineering Laboratory I",
    "credits": 4,
    "anyOf": [
     [
      "che-360"
     ]
    ]
   },
   {
    "id": "che-460-chemical-engineering-laboratory-ii",
    "group": "Program Subjects",
    "label": "CHE 460 Chemical Engineering Laboratory II",
    "credits": 4,
    "anyOf": [
     [
      "che-460"
     ]
    ]
   },
   {
    "id": "che-485-chemical-engineering-process-economics",
    "group": "Program Subjects",
    "label": "CHE 485 Chemical Engineering Process Economics",
    "credits": 1,
    "anyOf": [
     [
      "che-485"
     ]
    ]
   },
   {
    "id": "che-487-chemical-process-simulation-and-design-o",
    "group": "Program Subjects",
    "label": "CHE 487 Chemical Process Simulation and Design, or CHE 488/489, Chemical Product Design...",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/che/"
   },
   {
    "id": "12-hours",
    "group": "Program Subjects",
    "label": "(12 Hours)",
    "target": 12,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/che/"
   },
   {
    "id": "chemistry-261-introduction-to-quantum-chemistry",
    "group": "Advanced Chemistry",
    "label": "Chemistry 261 Introduction to Quantum Chemistry",
    "credits": 1,
    "anyOf": [
     [
      "chem-261"
     ]
    ]
   },
   {
    "id": "che-344-reaction-engineering-and-design",
    "group": "Program subjects",
    "label": "CHE 344 Reaction Engineering and Design",
    "credits": 4,
    "anyOf": [
     [
      "che-344"
     ]
    ]
   },
   {
    "id": "che-466-process-dynamics-and-control",
    "group": "Program subjects",
    "label": "CHE 466 Process Dynamics and Control",
    "credits": 3,
    "anyOf": [
     [
      "che-466"
     ]
    ]
   }
  ],
  "plan": [
   [
    {
     "label": "Mathematics 115, 116, 215,",
     "credits": 4,
     "req": "mathematics-115-116-215"
    },
    {
     "label": "Engineering 100, Introduction to Engineering",
     "credits": 4,
     "req": "engineering-100-introduction-to-engineering"
    },
    {
     "label": "Chemistry",
     "credits": 3,
     "req": "chemistry"
    },
    {
     "label": "Intellectual Breadth (to include a course in micro or macro economics)",
     "credits": 4,
     "req": "intellectual-breadth-to-include-a-course-in-micr"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215,",
     "credits": 4,
     "req": "mathematics-115-116-215"
    },
    {
     "label": "Engineering 101, Introduction to Computers",
     "credits": 4,
     "req": "engineering-101-introduction-to-computers"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab"
    },
    {
     "label": "Chemistry 210/211, Structure and Reactivity I and Lab",
     "credits": 5,
     "req": "chemistry-210-211-structure-and-reactivity-i-and"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215,",
     "credits": 4,
     "req": "mathematics-115-116-215"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab"
    },
    {
     "label": "Chemistry 215/216, Structure and Reactivity II and Lab",
     "credits": 5,
     "req": "chemistry-215-216-structure-and-reactivity-ii-an"
    },
    {
     "label": "CHE 230 Material and Energy Balances",
     "credits": 4,
     "req": "che-230-material-and-energy-balances"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215,",
     "credits": 4,
     "req": "mathematics-115-116-215"
    },
    {
     "label": "CHE 330 Chemical and Engineering Thermodynamics",
     "credits": 4,
     "req": "che-330-chemical-and-engineering-thermodynamics"
    },
    {
     "label": "CHE 341 Fluid Mechanics",
     "credits": 4,
     "req": "che-341-fluid-mechanics"
    },
    {
     "label": "(12 Hours)",
     "credits": 3,
     "req": "12-hours"
    }
   ],
   [
    {
     "label": "Intellectual Breadth (to include a course in micro or macro economics)",
     "credits": 4,
     "req": "intellectual-breadth-to-include-a-course-in-micr"
    },
    {
     "label": "CHE 342 Mass and Heat Transfer",
     "credits": 4,
     "req": "che-342-mass-and-heat-transfer"
    },
    {
     "label": "CHE 343 Separation Processes",
     "credits": 4,
     "req": "che-343-separation-processes"
    },
    {
     "label": "(12 Hours)",
     "credits": 3,
     "req": "12-hours"
    },
    {
     "label": "Chemistry 261 Introduction to Quantum Chemistry",
     "credits": 1,
     "req": "chemistry-261-introduction-to-quantum-chemistry"
    }
   ],
   [
    {
     "label": "Biology/Life Science Elective (Typically Bio 172 or 174)",
     "credits": 4,
     "req": "biology-life-science-elective-typically-bio-172-"
    },
    {
     "label": "CHE 360 Chemical Engineering Laboratory I",
     "credits": 4,
     "req": "che-360-chemical-engineering-laboratory-i"
    },
    {
     "label": "CHE 485 Chemical Engineering Process Economics",
     "credits": 1,
     "req": "che-485-chemical-engineering-process-economics"
    },
    {
     "label": "(12 Hours)",
     "credits": 3,
     "req": "12-hours"
    },
    {
     "label": "CHE 344 Reaction Engineering and Design",
     "credits": 4,
     "req": "che-344-reaction-engineering-and-design"
    }
   ],
   [
    {
     "label": "Intellectual Breadth (to include a course in micro or macro economics)",
     "credits": 4,
     "req": "intellectual-breadth-to-include-a-course-in-micr"
    },
    {
     "label": "Materials Elective (MSE 250 or MSE 220)",
     "credits": 4,
     "req": "materials-elective-mse-250-or-mse-220"
    },
    {
     "label": "(12 Hours)",
     "credits": 3,
     "req": "12-hours"
    },
    {
     "label": "CHE 466 Process Dynamics and Control",
     "credits": 3,
     "req": "che-466-process-dynamics-and-control"
    }
   ],
   [
    {
     "label": "Intellectual Breadth (to include a course in micro or macro economics)",
     "credits": 4,
     "req": "intellectual-breadth-to-include-a-course-in-micr"
    },
    {
     "label": "Engineering Electives",
     "credits": 3,
     "req": "engineering-electives"
    },
    {
     "label": "CHE 460 Chemical Engineering Laboratory II",
     "credits": 4,
     "req": "che-460-chemical-engineering-laboratory-ii"
    },
    {
     "label": "CHE 487 Chemical Process Simulation and Design, or CHE 488/489, Chemical Product Design...",
     "credits": 5,
     "req": "che-487-chemical-process-simulation-and-design-o"
    }
   ]
  ]
 },
 {
  "id": "engineering-biomedical-engineering",
  "name": "Biomedical Engineering",
  "school": "College of Engineering (B.S.E.)",
  "sourceUrl": "https://bulletin.engin.umich.edu/bme/",
  "sourceLabel": "Engineering Bulletin, 2026-27 sample schedule",
  "planIsOfficial": true,
  "planSourceUrl": "https://bulletin.engin.umich.edu/wp-content/uploads/sites/306/2026/03/BME-UG-2026-2027-Sample-Schedule.pdf",
  "notes": [
   "This follows the BIOMEDE 451 and 452 path. BIOMEDE 450 is the alternative, and the schedule prints a credit range for terms 7 and 8.",
   "This follows the department's 2026-27 sample schedule. A plan may differ by when you started, so check the current Bulletin.",
   "It's only a sample: you don't have to follow it exactly, apart from prerequisite chains.",
   "Rows with several courses or choices are tracked by credits. The linked schedule has the details and footnotes."
  ],
  "requirements": [
   {
    "id": "math-115-116-215",
    "group": "Subjects Required by all Programs",
    "label": "Math 115, 116, 215,",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/bme/"
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
    "id": "chem-125-126-130-or-chem-210",
    "group": "Subjects Required by all Programs",
    "label": "CHEM 125, 126, & 130 OR CHEM 210 &",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/bme/"
   },
   {
    "id": "physics-140-141-physics-240-241",
    "group": "Subjects Required by all Programs",
    "label": "PHYSICS 140/141 & PHYSICS 240/241",
    "target": 10,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/bme/"
   },
   {
    "id": "intellectual-breadth",
    "group": "Subjects Required by all Programs",
    "label": "Intellectual Breadth",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/bme/"
   },
   {
    "id": "biology-172-174-or-195-introduction-to-biology",
    "group": "Life and Material Science in Engineering",
    "label": "BIOLOGY 172, 174, or 195, Introduction to Biology",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/bme/"
   },
   {
    "id": "matscie-220-or-250-principles-of-engineering-mat",
    "group": "Life and Material Science in Engineering",
    "label": "MATSCIE 220 or 250, Principles of Engineering Materials",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/bme/"
   },
   {
    "id": "biomede-211-circuits-systems-for-biomedical-engi",
    "group": "Required Program Subjects",
    "label": "BIOMEDE 211, Circuits & Systems for Biomedical Engineers",
    "credits": 4,
    "anyOf": [
     [
      "biomede-211"
     ]
    ]
   },
   {
    "id": "biomede-221-biophysical-chemistry-thermodynamics",
    "group": "Required Program Subjects",
    "label": "BIOMEDE 221, Biophysical Chemistry & Thermodynamics",
    "credits": 4,
    "anyOf": [
     [
      "biomede-221"
     ]
    ]
   },
   {
    "id": "biomede-231-introduction-to-biomechanics",
    "group": "Required Program Subjects",
    "label": "BIOMEDE 231, Introduction to Biomechanics",
    "credits": 4,
    "anyOf": [
     [
      "biomede-231"
     ]
    ]
   },
   {
    "id": "biomede-241-statistics-computation-and-data-anal",
    "group": "Required Program Subjects",
    "label": "BIOMEDE 241, Statistics, Computation, and Data Analysis",
    "credits": 4,
    "anyOf": [
     [
      "biomede-241"
     ]
    ]
   },
   {
    "id": "biomede-350-introduction-to-biomedical-engineeri",
    "group": "Required Program Subjects",
    "label": "BIOMEDE 350, Introduction to Biomedical Engineering",
    "credits": 4,
    "anyOf": [
     [
      "biomede-350"
     ]
    ]
   },
   {
    "id": "biomede-418-quantitative-cell-biology",
    "group": "Required Program Subjects",
    "label": "BIOMEDE 418, Quantitative Cell Biology",
    "credits": 3,
    "anyOf": [
     [
      "biomede-418"
     ]
    ]
   },
   {
    "id": "biomede-419-quantitative-physiology",
    "group": "Required Program Subjects",
    "label": "BIOMEDE 419, Quantitative Physiology",
    "credits": 4,
    "anyOf": [
     [
      "biomede-419"
     ]
    ]
   },
   {
    "id": "biomede-458-biomedical-instrumentation-design",
    "group": "Required Program Subjects",
    "label": "BIOMEDE 458, Biomedical Instrumentation & Design",
    "credits": 4,
    "anyOf": [
     [
      "biomede-458"
     ]
    ]
   },
   {
    "id": "biomede-451-biomedical-design-part-i-and",
    "group": "Required Program Subjects",
    "label": "BIOMEDE 451, Biomedical Design, Part I AND",
    "credits": 3,
    "anyOf": [
     [
      "biomede-451"
     ]
    ]
   },
   {
    "id": "biomede-452-biomedical-design-part-ii",
    "group": "Required Program Subjects",
    "label": "BIOMEDE 452, Biomedical Design, Part II ^^",
    "credits": 3,
    "anyOf": [
     [
      "biomede-452"
     ]
    ]
   },
   {
    "id": "engineering-expertise",
    "group": "Depth Requirements",
    "label": "Engineering Expertise",
    "target": 12,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/bme/"
   },
   {
    "id": "cross-disciplinary",
    "group": "Depth Requirements",
    "label": "Cross Disciplinary",
    "target": 6,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/bme/"
   },
   {
    "id": "profession-in-practice",
    "group": "Depth Requirements",
    "label": "Profession in Practice",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/bme/"
   },
   {
    "id": "9-hours",
    "group": "Depth Requirements",
    "label": "(9 hours)",
    "target": 9,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/bme/"
   }
  ],
  "plan": [
   [
    {
     "label": "Math 115, 116, 215,",
     "credits": 4,
     "req": "math-115-116-215"
    },
    {
     "label": "ENGR 100, Introduction to Engineering",
     "credits": 4,
     "req": "engr-100-introduction-to-engineering"
    },
    {
     "label": "CHEM 125, 126, & 130 OR CHEM 210 &",
     "credits": 5,
     "req": "chem-125-126-130-or-chem-210"
    },
    {
     "label": "BIOLOGY 172, 174, or 195, Introduction to Biology",
     "credits": 4,
     "req": "biology-172-174-or-195-introduction-to-biology"
    }
   ],
   [
    {
     "label": "Math 115, 116, 215,",
     "credits": 4,
     "req": "math-115-116-215"
    },
    {
     "label": "ENGR 101, Introduction to Computers",
     "credits": 4,
     "req": "engr-101-introduction-to-computers"
    },
    {
     "label": "PHYSICS 140/141 & PHYSICS 240/241",
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
     "label": "Math 115, 116, 215,",
     "credits": 4,
     "req": "math-115-116-215"
    },
    {
     "label": "PHYSICS 140/141 & PHYSICS 240/241",
     "credits": 5,
     "req": "physics-140-141-physics-240-241"
    },
    {
     "label": "BIOMEDE 221, Biophysical Chemistry & Thermodynamics",
     "credits": 4,
     "req": "biomede-221-biophysical-chemistry-thermodynamics"
    },
    {
     "label": "BIOMEDE 231, Introduction to Biomechanics",
     "credits": 4,
     "req": "biomede-231-introduction-to-biomechanics"
    }
   ],
   [
    {
     "label": "Math 115, 116, 215,",
     "credits": 4,
     "req": "math-115-116-215"
    },
    {
     "label": "MATSCIE 220 or 250, Principles of Engineering Materials",
     "credits": 4,
     "req": "matscie-220-or-250-principles-of-engineering-mat"
    },
    {
     "label": "BIOMEDE 211, Circuits & Systems for Biomedical Engineers",
     "credits": 4,
     "req": "biomede-211-circuits-systems-for-biomedical-engi"
    },
    {
     "label": "BIOMEDE 241, Statistics, Computation, and Data Analysis",
     "credits": 4,
     "req": "biomede-241-statistics-computation-and-data-anal"
    }
   ],
   [
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "BIOMEDE 350, Introduction to Biomedical Engineering",
     "credits": 4,
     "req": "biomede-350-introduction-to-biomedical-engineeri"
    },
    {
     "label": "BIOMEDE 418, Quantitative Cell Biology",
     "credits": 3,
     "req": "biomede-418-quantitative-cell-biology"
    },
    {
     "label": "Cross Disciplinary",
     "credits": 3,
     "req": "cross-disciplinary"
    },
    {
     "label": "Profession in Practice",
     "credits": 3,
     "req": "profession-in-practice"
    }
   ],
   [
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "BIOMEDE 458, Biomedical Instrumentation & Design",
     "credits": 4,
     "req": "biomede-458-biomedical-instrumentation-design"
    },
    {
     "label": "Engineering Expertise",
     "credits": 6,
     "req": "engineering-expertise"
    },
    {
     "label": "(9 hours)",
     "credits": 3,
     "req": "9-hours"
    }
   ],
   [
    {
     "label": "BIOMEDE 419, Quantitative Physiology",
     "credits": 4,
     "req": "biomede-419-quantitative-physiology"
    },
    {
     "label": "BIOMEDE 451, Biomedical Design, Part I AND",
     "credits": 3,
     "req": "biomede-451-biomedical-design-part-i-and"
    },
    {
     "label": "Engineering Expertise",
     "credits": 3,
     "req": "engineering-expertise"
    },
    {
     "label": "Cross Disciplinary",
     "credits": 3,
     "req": "cross-disciplinary"
    },
    {
     "label": "(9 hours)",
     "credits": 3,
     "req": "9-hours"
    }
   ],
   [
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "BIOMEDE 452, Biomedical Design, Part II ^^",
     "credits": 3,
     "req": "biomede-452-biomedical-design-part-ii"
    },
    {
     "label": "Engineering Expertise",
     "credits": 3,
     "req": "engineering-expertise"
    },
    {
     "label": "(9 hours)",
     "credits": 3,
     "req": "9-hours"
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
    "id": "mathematics",
    "group": "Subjects Required by all Programs",
    "label": "Mathematics",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
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
    "id": "physics-140-and-lab",
    "group": "Subjects Required by all Programs",
    "label": "Physics 140 and Lab",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "physics-240-and-lab",
    "group": "Subjects Required by all Programs",
    "label": "Physics 240 and Lab",
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
    "id": "discrete-mathematics-eecs-203-or-math",
    "group": "Program Core",
    "label": "Discrete Mathematics: EECS 203 or MATH",
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
    "id": "experience-course",
    "group": "Program Core",
    "label": "Experience Course",
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
    "id": "tchnclcm",
    "group": "Program Core",
    "label": "TCHNCLCM",
    "target": 1,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
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
    "id": "15-credits-see-note-above",
    "group": "Program Core",
    "label": "(15 credits) – See note above",
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
     "label": "Discrete Mathematics: EECS 203 or MATH",
     "credits": 4,
     "req": "discrete-mathematics-eecs-203-or-math"
    },
    {
     "label": "EECS 280, Programming and Elementary Data",
     "credits": 4,
     "req": "eecs-280-programming-and-elementary-data"
    }
   ],
   [
    {
     "label": "Mathematics",
     "credits": 4,
     "req": "mathematics"
    },
    {
     "label": "Physics 140 and Lab",
     "credits": 5,
     "req": "physics-140-and-lab"
    },
    {
     "label": "EECS 281, Data Structures and Algorithms",
     "credits": 4,
     "req": "eecs-281-data-structures-and-algorithms"
    },
    {
     "label": "(15 credits) – See note above",
     "credits": 3,
     "req": "15-credits-see-note-above"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, and (214 or 217)",
     "credits": 4,
     "req": "mathematics-115-116-and-214-or-217"
    },
    {
     "label": "Physics 240 and Lab",
     "credits": 5,
     "req": "physics-240-and-lab"
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
     "label": "TCHNCLCM",
     "credits": 1,
     "req": "tchnclcm"
    },
    {
     "label": "(15 credits) – See note above",
     "credits": 3,
     "req": "15-credits-see-note-above"
    }
   ],
   [
    {
     "label": "Experience Course",
     "credits": 4,
     "req": "experience-course"
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
     "label": "(15 credits) – See note above",
     "credits": 3,
     "req": "15-credits-see-note-above"
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
     "label": "(15 credits) – See note above",
     "credits": 6,
     "req": "15-credits-see-note-above"
    }
   ]
  ]
 },
 {
  "id": "engineering-civil-engineering",
  "name": "Civil Engineering",
  "school": "College of Engineering (B.S.E.)",
  "sourceUrl": "https://bulletin.engin.umich.edu/cee/",
  "sourceLabel": "Engineering Bulletin, 2025-26 sample schedule",
  "planIsOfficial": true,
  "planSourceUrl": "https://bulletin.engin.umich.edu/wp-content/uploads/sites/306/2025/06/Civil-Engineering-Sample-Schedule_AY202526_Final.pdf",
  "notes": [
   "CEE 230 or 375 and CEE 265 can be taken in either order, in terms 3 and 4.",
   "This follows the department's 2025-26 sample schedule. A plan may differ by when you started, so check the current Bulletin.",
   "It's only a sample: you don't have to follow it exactly, apart from prerequisite chains.",
   "Rows with several courses or choices are tracked by credits. The linked schedule has the details and footnotes."
  ],
  "requirements": [
   {
    "id": "math-115-116-215-216",
    "group": "Subjects Required by all Programs",
    "label": "MATH 115, 116, 215, 216",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/cee/"
   },
   {
    "id": "engr-100-intro-to-engineering",
    "group": "Subjects Required by all Programs",
    "label": "ENGR 100, Intro to Engineering",
    "credits": 4,
    "anyOf": [
     [
      "engr-100"
     ]
    ]
   },
   {
    "id": "engr-101-intro-to-computers",
    "group": "Subjects Required by all Programs",
    "label": "ENGR 101, Intro to Computers",
    "credits": 4,
    "anyOf": [
     [
      "engr-101"
     ]
    ]
   },
   {
    "id": "chem-130-125-126-or-chem-210-and",
    "group": "Subjects Required by all Programs",
    "label": "CHEM 130 & 125/126 or CHEM 210 and",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/cee/"
   },
   {
    "id": "physics-140-with-lab",
    "group": "Subjects Required by all Programs",
    "label": "PHYSICS 140 with Lab",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/cee/"
   },
   {
    "id": "physics-240-with-lab",
    "group": "Subjects Required by all Programs",
    "label": "PHYSICS 240 with Lab",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/cee/"
   },
   {
    "id": "intellectual-breadth-includes-econ-101-or-102",
    "group": "Subjects Required by all Programs",
    "label": "Intellectual Breadth (includes ECON 101 or 102)",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/cee/"
   },
   {
    "id": "cee-303-computational-methods",
    "group": "Mathematical Methods",
    "label": "CEE 303, Computational Methods",
    "credits": 4,
    "anyOf": [
     [
      "cee-303"
     ]
    ]
   },
   {
    "id": "cee-373-statistical-methods",
    "group": "Mathematical Methods",
    "label": "CEE 373, Statistical Methods",
    "credits": 3,
    "anyOf": [
     [
      "cee-373"
     ]
    ]
   },
   {
    "id": "cee-200-intro-to-civil-environmental-engineering",
    "group": "Required Program Subjects",
    "label": "CEE 200, Intro to Civil & Environmental Engineering",
    "credits": 1,
    "anyOf": [
     [
      "cee-200"
     ]
    ]
   },
   {
    "id": "cee-211-statics-and-dynamics",
    "group": "Required Program Subjects",
    "label": "CEE 211, Statics and Dynamics",
    "credits": 4,
    "anyOf": [
     [
      "cee-211"
     ]
    ]
   },
   {
    "id": "cee-212-solid-and-structural-mechanics",
    "group": "Required Program Subjects",
    "label": "CEE 212, Solid and Structural Mechanics",
    "credits": 3,
    "anyOf": [
     [
      "cee-212"
     ]
    ]
   },
   {
    "id": "cee-325-fluid-mechanics",
    "group": "Required Program Subjects",
    "label": "CEE 325, Fluid Mechanics",
    "credits": 4,
    "anyOf": [
     [
      "cee-325"
     ]
    ]
   },
   {
    "id": "cee-402-professional-issues-design",
    "group": "Required Program Subjects",
    "label": "CEE 402, Professional Issues & Design",
    "credits": 4,
    "anyOf": [
     [
      "cee-402"
     ]
    ]
   },
   {
    "id": "biology-171-or",
    "group": "Science Elective",
    "label": "Biology 171 or",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/cee/"
   },
   {
    "id": "12-hours",
    "group": "Technical Electives",
    "label": "(12 hours)",
    "target": 12,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/cee/"
   },
   {
    "id": "cee-230-thermodynamics-or-cee-375-sensors-and-ci",
    "group": "Required Program Subjects",
    "label": "CEE 230, Thermodynamics, or CEE 375, Sensors and Circuits",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/cee/"
   },
   {
    "id": "cee-265-sustainable-engineering-principles",
    "group": "Required Program Subjects",
    "label": "CEE 265, Sustainable Engineering Principles",
    "credits": 3,
    "anyOf": [
     [
      "cee-265"
     ]
    ]
   },
   {
    "id": "program-electives",
    "group": "Program Electives",
    "label": "Program Electives",
    "target": 20,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/cee/"
   },
   {
    "id": "technical-electives",
    "group": "Technical Electives",
    "label": "Technical Electives",
    "target": 9,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/cee/"
   }
  ],
  "plan": [
   [
    {
     "label": "MATH 115, 116, 215, 216",
     "credits": 4,
     "req": "math-115-116-215-216"
    },
    {
     "label": "ENGR 100, Intro to Engineering",
     "credits": 4,
     "req": "engr-100-intro-to-engineering"
    },
    {
     "label": "CHEM 130 & 125/126 or CHEM 210 and",
     "credits": 5,
     "req": "chem-130-125-126-or-chem-210-and"
    },
    {
     "label": "Intellectual Breadth (includes ECON 101 or 102)",
     "credits": 4,
     "req": "intellectual-breadth-includes-econ-101-or-102"
    }
   ],
   [
    {
     "label": "MATH 115, 116, 215, 216",
     "credits": 4,
     "req": "math-115-116-215-216"
    },
    {
     "label": "ENGR 101, Intro to Computers",
     "credits": 4,
     "req": "engr-101-intro-to-computers"
    },
    {
     "label": "PHYSICS 140 with Lab",
     "credits": 5,
     "req": "physics-140-with-lab"
    },
    {
     "label": "Intellectual Breadth (includes ECON 101 or 102)",
     "credits": 4,
     "req": "intellectual-breadth-includes-econ-101-or-102"
    }
   ],
   [
    {
     "label": "MATH 115, 116, 215, 216",
     "credits": 4,
     "req": "math-115-116-215-216"
    },
    {
     "label": "PHYSICS 240 with Lab",
     "credits": 5,
     "req": "physics-240-with-lab"
    },
    {
     "label": "CEE 211, Statics and Dynamics",
     "credits": 4,
     "req": "cee-211-statics-and-dynamics"
    },
    {
     "label": "CEE 230, Thermodynamics, or CEE 375, Sensors and Circuits",
     "credits": 3,
     "req": "cee-230-thermodynamics-or-cee-375-sensors-and-ci"
    }
   ],
   [
    {
     "label": "MATH 115, 116, 215, 216",
     "credits": 4,
     "req": "math-115-116-215-216"
    },
    {
     "label": "Intellectual Breadth (includes ECON 101 or 102)",
     "credits": 4,
     "req": "intellectual-breadth-includes-econ-101-or-102"
    },
    {
     "label": "CEE 200, Intro to Civil & Environmental Engineering",
     "credits": 1,
     "req": "cee-200-intro-to-civil-environmental-engineering"
    },
    {
     "label": "CEE 212, Solid and Structural Mechanics",
     "credits": 3,
     "req": "cee-212-solid-and-structural-mechanics"
    },
    {
     "label": "CEE 265, Sustainable Engineering Principles",
     "credits": 3,
     "req": "cee-265-sustainable-engineering-principles"
    }
   ],
   [
    {
     "label": "CEE 373, Statistical Methods",
     "credits": 3,
     "req": "cee-373-statistical-methods"
    },
    {
     "label": "CEE 325, Fluid Mechanics",
     "credits": 4,
     "req": "cee-325-fluid-mechanics"
    },
    {
     "label": "Program Electives",
     "credits": 8,
     "req": "program-electives"
    }
   ],
   [
    {
     "label": "CEE 303, Computational Methods",
     "credits": 4,
     "req": "cee-303-computational-methods"
    },
    {
     "label": "(12 hours)",
     "credits": 3,
     "req": "12-hours"
    },
    {
     "label": "Program Electives",
     "credits": 8,
     "req": "program-electives"
    }
   ],
   [
    {
     "label": "Biology 171 or",
     "credits": 3,
     "req": "biology-171-or"
    },
    {
     "label": "(12 hours)",
     "credits": 6,
     "req": "12-hours"
    },
    {
     "label": "Program Electives",
     "credits": 4,
     "req": "program-electives"
    },
    {
     "label": "Technical Electives",
     "credits": 3,
     "req": "technical-electives"
    }
   ],
   [
    {
     "label": "Intellectual Breadth (includes ECON 101 or 102)",
     "credits": 4,
     "req": "intellectual-breadth-includes-econ-101-or-102"
    },
    {
     "label": "CEE 402, Professional Issues & Design",
     "credits": 4,
     "req": "cee-402-professional-issues-design"
    },
    {
     "label": "(12 hours)",
     "credits": 3,
     "req": "12-hours"
    },
    {
     "label": "Technical Electives",
     "credits": 6,
     "req": "technical-electives"
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
    "id": "mathema-cs-115-116-215-and-216",
    "group": "Subjects Required by all Programs",
    "label": "Mathema\u0000cs 115, 116, 215, and 216",
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
    "id": "chemistry-125-126-and-130-or-chemistry-210-and",
    "group": "Subjects Required by all Programs",
    "label": "Chemistry 125/126 and 130 or Chemistry 210 and",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "physics-140-with-lab-141-physics-240-with-lab-24",
    "group": "Subjects Required by all Programs",
    "label": "Physics 140 with Lab 141; Physics 240 with Lab 2412",
    "target": 10,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "intellectual-breadth",
    "group": "Subjects Required by all Programs",
    "label": "Intellectual Breadth",
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
    "id": "technical-elec-ves",
    "group": "Meteorology",
    "label": "Technical Elec\u0000ves",
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
     "label": "Mathema\u0000cs 115, 116, 215, and 216",
     "credits": 4,
     "req": "mathema-cs-115-116-215-and-216"
    },
    {
     "label": "Engineering 100, Introduc\u0000on to Engineering",
     "credits": 4,
     "req": "engineering-100-introduc-on-to-engineering"
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
     "label": "Mathema\u0000cs 115, 116, 215, and 216",
     "credits": 4,
     "req": "mathema-cs-115-116-215-and-216"
    },
    {
     "label": "Engineering 101, Introduc\u0000on to Computers",
     "credits": 4,
     "req": "engineering-101-introduc-on-to-computers"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab 2412",
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
     "label": "Mathema\u0000cs 115, 116, 215, and 216",
     "credits": 4,
     "req": "mathema-cs-115-116-215-and-216"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab 2412",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab-24"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "CLIMATE 320, Earth and Space System Evolu\u0000on",
     "credits": 3,
     "req": "climate-320-earth-and-space-system-evolu-on"
    }
   ],
   [
    {
     "label": "Mathema\u0000cs 115, 116, 215, and 216",
     "credits": 4,
     "req": "mathema-cs-115-116-215-and-216"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
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
     "label": "Technical Elec\u0000ves",
     "credits": 4,
     "req": "technical-elec-ves"
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
     "label": "Technical Elec\u0000ves",
     "credits": 4,
     "req": "technical-elec-ves"
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
     "label": "Technical Elec\u0000ves",
     "credits": 5,
     "req": "technical-elec-ves"
    }
   ]
  ]
 },
 {
  "id": "engineering-computer-engineering",
  "name": "Computer Engineering",
  "school": "College of Engineering (B.S.E.)",
  "sourceUrl": "https://bulletin.engin.umich.edu/eecs/",
  "sourceLabel": "Engineering Bulletin, FA26 sample schedule",
  "planIsOfficial": true,
  "planSourceUrl": "https://bulletin.engin.umich.edu/wp-content/uploads/sites/306/2026/03/FA26-Computer-Engineering-Sample-Schedule-CoE-Bulletin.pdf",
  "notes": [
   "Statistics can be 3 or 4 credits, so term 6 may total 16.",
   "This follows the department's FA26 sample schedule. A plan may differ by when you started, so check the current Bulletin.",
   "It's only a sample: you don't have to follow it exactly, apart from prerequisite chains.",
   "Rows with several courses or choices are tracked by credits. The linked schedule has the details and footnotes."
  ],
  "requirements": [
   {
    "id": "math-115-116-and",
    "group": "CoE Common Core",
    "label": "MATH 115 , 116 , and",
    "target": 12,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "linear-algebra-math-214-215-217-417-or",
    "group": "CoE Common Core",
    "label": "Linear algebra: MATH 214, 215, 217, 417, or",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "engr",
    "group": "CoE Common Core",
    "label": "ENGR",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "engr-2",
    "group": "CoE Common Core",
    "label": "ENGR",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "chem-125-126",
    "group": "CoE Common Core",
    "label": "CHEM 125 / 126 /",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "physics-140-141-physics-240",
    "group": "CoE Common Core",
    "label": "PHYSICS 140 / 141 ; PHYSICS 240 /",
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
    "id": "eecs-203-discrete-math",
    "group": "CE Program Subjects",
    "label": "EECS 203 : Discrete Math",
    "credits": 4,
    "anyOf": [
     [
      "eecs-203"
     ]
    ]
   },
   {
    "id": "eecs-215-introduction-to-circuits",
    "group": "CE Program Subjects",
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
    "group": "CE Program Subjects",
    "label": "EECS 216 : Signals and Systems",
    "credits": 4,
    "anyOf": [
     [
      "eecs-216"
     ]
    ]
   },
   {
    "id": "eecs-270-introduction-to-logic-design",
    "group": "CE Program Subjects",
    "label": "EECS 270 : Introduction to Logic Design",
    "credits": 4,
    "anyOf": [
     [
      "eecs-270"
     ]
    ]
   },
   {
    "id": "eecs-280-programming-and-introductory-data-struc",
    "group": "CE Program Subjects",
    "label": "EECS 280 : Programming and Introductory Data Structures",
    "credits": 4,
    "anyOf": [
     [
      "eecs-280"
     ]
    ]
   },
   {
    "id": "eecs-370-introduction-to-computer-organization",
    "group": "CE Program Subjects",
    "label": "EECS 370 : Introduction to Computer Organization",
    "credits": 4,
    "anyOf": [
     [
      "eecs-370"
     ]
    ]
   },
   {
    "id": "eecs-400-ece-major-design-experience",
    "group": "CE Program Subjects",
    "label": "EECS 400 : ECE Major Design Experience",
    "credits": 2,
    "anyOf": [
     [
      "eecs-400"
     ]
    ]
   },
   {
    "id": "tchnclcm-300-technical-communication-for-eecs",
    "group": "CE Program Subjects",
    "label": "TCHNCLCM 300 : Technical Communication for EECS",
    "credits": 1,
    "anyOf": [
     [
      "tchnclcm-300"
     ]
    ]
   },
   {
    "id": "tchnclcm-496-advanced-technical-comm-for-ece",
    "group": "CE Program Subjects",
    "label": "TCHNCLCM 496 : Advanced Technical Comm. for ECE",
    "credits": 2,
    "anyOf": [
     [
      "tchnclcm-496"
     ]
    ]
   },
   {
    "id": "core-electives",
    "group": "General and Technical Electives",
    "label": "Core Electives",
    "target": 8,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "upper-level-ce-electives-including-mde",
    "group": "General and Technical Electives",
    "label": "Upper Level CE Electives (including MDE)",
    "target": 10,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "eecs-electives",
    "group": "General and Technical Electives",
    "label": "EECS Electives",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "flexible-technical-electives",
    "group": "General and Technical Electives",
    "label": "Flexible Technical Electives",
    "target": 7,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "general-electives",
    "group": "General and Technical Electives",
    "label": "General Electives",
    "target": 13,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "statistics-eecs-301-4-math-425-3-or-stats-412-3",
    "group": "CE Program Subjects",
    "label": "Statistics: EECS 301 (4), MATH 425 (3), or STATS 412 (3)",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   }
  ],
  "plan": [
   [
    {
     "label": "MATH 115 , 116 , and",
     "credits": 4,
     "req": "math-115-116-and"
    },
    {
     "label": "ENGR",
     "credits": 4,
     "req": "engr-2"
    },
    {
     "label": "PHYSICS 140 / 141 ; PHYSICS 240 /",
     "credits": 5,
     "req": "physics-140-141-physics-240"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "MATH 115 , 116 , and",
     "credits": 4,
     "req": "math-115-116-and"
    },
    {
     "label": "ENGR",
     "credits": 4,
     "req": "engr"
    },
    {
     "label": "CHEM 125 / 126 /",
     "credits": 5,
     "req": "chem-125-126"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "PHYSICS 140 / 141 ; PHYSICS 240 /",
     "credits": 5,
     "req": "physics-140-141-physics-240"
    },
    {
     "label": "EECS 203 : Discrete Math",
     "credits": 4,
     "req": "eecs-203-discrete-math"
    },
    {
     "label": "EECS 270 : Introduction to Logic Design",
     "credits": 4,
     "req": "eecs-270-introduction-to-logic-design"
    },
    {
     "label": "General Electives",
     "credits": 3,
     "req": "general-electives"
    }
   ],
   [
    {
     "label": "MATH 115 , 116 , and",
     "credits": 4,
     "req": "math-115-116-and"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "EECS 215 : Introduction to Circuits",
     "credits": 4,
     "req": "eecs-215-introduction-to-circuits"
    },
    {
     "label": "EECS 280 : Programming and Introductory Data Structures",
     "credits": 4,
     "req": "eecs-280-programming-and-introductory-data-struc"
    }
   ],
   [
    {
     "label": "Linear algebra: MATH 214, 215, 217, 417, or",
     "credits": 4,
     "req": "linear-algebra-math-214-215-217-417-or"
    },
    {
     "label": "EECS 216 : Signals and Systems",
     "credits": 4,
     "req": "eecs-216-signals-and-systems"
    },
    {
     "label": "EECS 370 : Introduction to Computer Organization",
     "credits": 4,
     "req": "eecs-370-introduction-to-computer-organization"
    },
    {
     "label": "TCHNCLCM 300 : Technical Communication for EECS",
     "credits": 1,
     "req": "tchnclcm-300-technical-communication-for-eecs"
    },
    {
     "label": "General Electives",
     "credits": 3,
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
     "label": "Core Electives",
     "credits": 8,
     "req": "core-electives"
    },
    {
     "label": "Statistics: EECS 301 (4), MATH 425 (3), or STATS 412 (3)",
     "credits": 3,
     "req": "statistics-eecs-301-4-math-425-3-or-stats-412-3"
    }
   ],
   [
    {
     "label": "Upper Level CE Electives (including MDE)",
     "credits": 4,
     "req": "upper-level-ce-electives-including-mde"
    },
    {
     "label": "EECS Electives",
     "credits": 3,
     "req": "eecs-electives"
    },
    {
     "label": "Flexible Technical Electives",
     "credits": 5,
     "req": "flexible-technical-electives"
    },
    {
     "label": "General Electives",
     "credits": 4,
     "req": "general-electives"
    }
   ],
   [
    {
     "label": "EECS 400 : ECE Major Design Experience",
     "credits": 2,
     "req": "eecs-400-ece-major-design-experience"
    },
    {
     "label": "TCHNCLCM 496 : Advanced Technical Comm. for ECE",
     "credits": 2,
     "req": "tchnclcm-496-advanced-technical-comm-for-ece"
    },
    {
     "label": "Upper Level CE Electives (including MDE)",
     "credits": 6,
     "req": "upper-level-ce-electives-including-mde"
    },
    {
     "label": "Flexible Technical Electives",
     "credits": 2,
     "req": "flexible-technical-electives"
    },
    {
     "label": "General Electives",
     "credits": 3,
     "req": "general-electives"
    }
   ]
  ]
 },
 {
  "id": "engineering-robotics",
  "name": "Robotics",
  "school": "College of Engineering (B.S.E.)",
  "sourceUrl": "https://bulletin.engin.umich.edu/depts/rob/",
  "sourceLabel": "Engineering Bulletin, sample schedule dated March 2026",
  "planIsOfficial": true,
  "planSourceUrl": "https://bulletin.engin.umich.edu/wp-content/uploads/sites/306/2026/03/Robotics-Undergraduate-Sample-Schedule-3.10.26.pdf",
  "notes": [
   "The published schedule prints 15 credits for term 7 and 128 total, but its rows add up to 14 and 127. This page shows the rows as published, so check with an advisor. ROB 320, 330, and 340 are samples: choose 3 of 6 intermediate courses.",
   "This follows the department's sample schedule dated March 2026. A plan may differ by when you started, so check the current Bulletin.",
   "It's only a sample: you don't have to follow it exactly, apart from prerequisite chains.",
   "Rows with several courses or choices are tracked by credits. The linked schedule has the details and footnotes."
  ],
  "requirements": [
   {
    "id": "rob-101-or-math",
    "group": "Requirements",
    "label": "ROB 101 or MATH",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "engr",
    "group": "Requirements",
    "label": "ENGR",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "engr-101-or-rob",
    "group": "Requirements",
    "label": "ENGR 101 or ROB",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "math-115-116-or-rob-201-alt",
    "group": "Requirements",
    "label": "MATH 115/116 or ROB 201/Alt",
    "target": 8,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "math-215-or-216-or-alt",
    "group": "Requirements",
    "label": "MATH 215 or 216 or Alt",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "physics-140-and-lab",
    "group": "Requirements",
    "label": "PHYSICS 140 and Lab",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "physics-240-and-lab",
    "group": "Requirements",
    "label": "PHYSICS 240 and Lab",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "chem-125-126-130-or-210-211",
    "group": "Requirements",
    "label": "CHEM 125/126/130 or 210/211",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "intellectual-breadth",
    "group": "Requirements",
    "label": "Intellectual Breadth",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "rob",
    "group": "Requirements",
    "label": "ROB",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "rob-2",
    "group": "Requirements",
    "label": "ROB",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "rob-3",
    "group": "Requirements",
    "label": "ROB",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "rob-4",
    "group": "Requirements",
    "label": "ROB",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "eecs",
    "group": "Requirements",
    "label": "EECS",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "ioe",
    "group": "Requirements",
    "label": "IOE",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "eecs-215-or-270-or-biomede",
    "group": "Requirements",
    "label": "EECS 215 or 270 or BIOMEDE",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "mecheng-240-or-biomede",
    "group": "Requirements",
    "label": "MECHENG 240 or BIOMEDE",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "navarch-270-or-other-approved-course",
    "group": "Requirements",
    "label": "NAVARCH 270 (or other approved course)",
    "credits": 4,
    "anyOf": [
     [
      "navarch-270"
     ]
    ]
   },
   {
    "id": "tchnclcm",
    "group": "Requirements",
    "label": "TCHNCLCM",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "rob-5",
    "group": "Requirements",
    "label": "ROB",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "upper-level-robotics-electives-min-6-crs",
    "group": "Requirements",
    "label": "Upper Level Robotics Electives (min. 6 crs)",
    "target": 12,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "flexible-technical-electives",
    "group": "",
    "label": "Flexible Technical Electives",
    "target": 7,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   },
   {
    "id": "general-electives",
    "group": "",
    "label": "General Electives",
    "target": 11,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/rob/"
   }
  ],
  "plan": [
   [
    {
     "label": "ROB 101 or MATH",
     "credits": 4,
     "req": "rob-101-or-math"
    },
    {
     "label": "ENGR 101 or ROB",
     "credits": 4,
     "req": "engr-101-or-rob"
    },
    {
     "label": "MATH 115/116 or ROB 201/Alt",
     "credits": 4,
     "req": "math-115-116-or-rob-201-alt"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "ENGR",
     "credits": 4,
     "req": "engr"
    },
    {
     "label": "MATH 115/116 or ROB 201/Alt",
     "credits": 4,
     "req": "math-115-116-or-rob-201-alt"
    },
    {
     "label": "PHYSICS 140 and Lab",
     "credits": 5,
     "req": "physics-140-and-lab"
    },
    {
     "label": "General Electives",
     "credits": 3,
     "req": "general-electives"
    }
   ],
   [
    {
     "label": "MATH 215 or 216 or Alt",
     "credits": 4,
     "req": "math-215-or-216-or-alt"
    },
    {
     "label": "PHYSICS 240 and Lab",
     "credits": 5,
     "req": "physics-240-and-lab"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "EECS",
     "credits": 4,
     "req": "eecs"
    }
   ],
   [
    {
     "label": "CHEM 125/126/130 or 210/211",
     "credits": 5,
     "req": "chem-125-126-130-or-210-211"
    },
    {
     "label": "ROB",
     "credits": 4,
     "req": "rob"
    },
    {
     "label": "IOE",
     "credits": 3,
     "req": "ioe"
    },
    {
     "label": "EECS 215 or 270 or BIOMEDE",
     "credits": 4,
     "req": "eecs-215-or-270-or-biomede"
    }
   ],
   [
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "ROB",
     "credits": 4,
     "req": "rob-3"
    },
    {
     "label": "ROB",
     "credits": 4,
     "req": "rob-4"
    },
    {
     "label": "NAVARCH 270 (or other approved course)",
     "credits": 4,
     "req": "navarch-270-or-other-approved-course"
    }
   ],
   [
    {
     "label": "ROB",
     "credits": 4,
     "req": "rob-2"
    },
    {
     "label": "MECHENG 240 or BIOMEDE",
     "credits": 4,
     "req": "mecheng-240-or-biomede"
    },
    {
     "label": "Flexible Technical Electives",
     "credits": 4,
     "req": "flexible-technical-electives"
    },
    {
     "label": "General Electives",
     "credits": 4,
     "req": "general-electives"
    }
   ],
   [
    {
     "label": "TCHNCLCM",
     "credits": 3,
     "req": "tchnclcm"
    },
    {
     "label": "Upper Level Robotics Electives (min. 6 crs)",
     "credits": 4,
     "req": "upper-level-robotics-electives-min-6-crs"
    },
    {
     "label": "Flexible Technical Electives",
     "credits": 3,
     "req": "flexible-technical-electives"
    },
    {
     "label": "General Electives",
     "credits": 4,
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
     "label": "ROB",
     "credits": 4,
     "req": "rob-5"
    },
    {
     "label": "Upper Level Robotics Electives (min. 6 crs)",
     "credits": 8,
     "req": "upper-level-robotics-electives-min-6-crs"
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
    "id": "mathematics-115-116-215-and",
    "group": "Subjects Required by All Programs",
    "label": "Mathematics 115, 116, 215, and",
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
    "id": "physics-140-with-lab-141-physics-240-with-lab",
    "group": "Subjects Required by All Programs",
    "label": "Physics 140 with Lab 141; Physics 240 with Lab",
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
    "credits": 4,
    "anyOf": [
     [
      "mecheng-211"
     ]
    ]
   },
   {
    "id": "me-240-introduction-to-dynamics",
    "group": "Related Technical Core Subjects",
    "label": "ME 240, Introduction to Dynamics",
    "credits": 4,
    "anyOf": [
     [
      "mecheng-240"
     ]
    ]
   },
   {
    "id": "me-235-thermodynamics",
    "group": "Related Technical Core Subjects",
    "label": "ME 235, Thermodynamics",
    "credits": 3,
    "anyOf": [
     [
      "mecheng-235"
     ]
    ]
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
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
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
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
    },
    {
     "label": "Engineering 101, Introduction to Computers",
     "credits": 4,
     "req": "engineering-101-introduction-to-computers"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab"
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
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
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
    "id": "mathematics-115-116-215-and-ners",
    "group": "Subjects required by all programs",
    "label": "Mathematics 115, 116, 215, and NERS",
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
    "id": "chemistry-125-126-and-130-or-chemistry-210-and",
    "group": "Subjects required by all programs",
    "label": "Chemistry 125/126 and 130 or Chemistry 210 and",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ners/"
   },
   {
    "id": "physics-140-with-lab-141-physics-240-with-lab",
    "group": "Subjects required by all programs",
    "label": "Physics 140 with Lab 141; Physics 240 with Lab",
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
    "id": "5-hours",
    "group": "Electives",
    "label": "(5 hours)",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ners/"
   },
   {
    "id": "12-hours",
    "group": "Electives",
    "label": "(12 hours)",
    "target": 12,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ners/"
   }
  ],
  "plan": [
   [
    {
     "label": "Mathematics 115, 116, 215, and NERS",
     "credits": 4,
     "req": "mathematics-115-116-215-and-ners"
    },
    {
     "label": "Engr 100, Intro to Engr",
     "credits": 4,
     "req": "engr-100-intro-to-engr"
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
     "label": "Mathematics 115, 116, 215, and NERS",
     "credits": 4,
     "req": "mathematics-115-116-215-and-ners"
    },
    {
     "label": "Engr 101, Intro to Computers",
     "credits": 4,
     "req": "engr-101-intro-to-computers"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and NERS",
     "credits": 4,
     "req": "mathematics-115-116-215-and-ners"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "(12 hours)",
     "credits": 3,
     "req": "12-hours"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and NERS",
     "credits": 4,
     "req": "mathematics-115-116-215-and-ners"
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
     "label": "(12 hours)",
     "credits": 3,
     "req": "12-hours"
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
     "label": "(5 hours)",
     "credits": 2,
     "req": "5-hours"
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
     "label": "(12 hours)",
     "credits": 3,
     "req": "12-hours"
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
     "label": "(12 hours)",
     "credits": 3,
     "req": "12-hours"
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
     "label": "(5 hours)",
     "credits": 3,
     "req": "5-hours"
    }
   ]
  ]
 },
 {
  "id": "engineering-space-sciences-and-engineering",
  "name": "Space Sciences and Engineering",
  "school": "College of Engineering (B.S.E.)",
  "sourceUrl": "https://bulletin.engin.umich.edu/clasp/",
  "sourceLabel": "Engineering Bulletin, 2023 sample schedule",
  "planIsOfficial": true,
  "planSourceUrl": "https://bulletin.engin.umich.edu/wp-content/uploads/sites/306/2023/02/Program-Plan-SSE-BSE-2023-Sheet1.pdf",
  "notes": [
   "This follows the Space Science concentration. The Space Instrumentation concentration differs, so see the schedule.",
   "This follows the department's 2023 sample schedule. A plan may differ by when you started, so check the current Bulletin.",
   "It's only a sample: you don't have to follow it exactly, apart from prerequisite chains.",
   "Rows with several courses or choices are tracked by credits. The linked schedule has the details and footnotes."
  ],
  "requirements": [
   {
    "id": "mathematics-115-116-215-and",
    "group": "Subjects Required by all Programs",
    "label": "Mathematics 115, 116, 215, and",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
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
    "label": "Chemistry 125/126 and 130 or Chemistry 210 and",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "physics-140-with-lab-141-physics-240-with-lab",
    "group": "Subjects Required by all Programs",
    "label": "Physics 140 with Lab 141; Physics 240 with Lab",
    "target": 10,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "intellectual-breadth",
    "group": "Subjects Required by all Programs",
    "label": "Intellectual Breadth",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "space-320-earth-and-space-system-evolution",
    "group": "Required Core Subjects",
    "label": "SPACE 320, Earth and Space System Evolution",
    "credits": 3,
    "anyOf": [
     [
      "space-320"
     ]
    ]
   },
   {
    "id": "space-321-earth-and-space-system-dynamics",
    "group": "Required Core Subjects",
    "label": "SPACE 321, Earth and Space System Dynamics",
    "credits": 3,
    "anyOf": [
     [
      "space-321"
     ]
    ]
   },
   {
    "id": "space-323-earth-system-analysis",
    "group": "Required Core Subjects",
    "label": "SPACE 323, Earth System Analysis",
    "credits": 4,
    "anyOf": [
     [
      "space-323"
     ]
    ]
   },
   {
    "id": "space-370-solar-terrestrial-relations",
    "group": "Required Core Subjects",
    "label": "SPACE 370, Solar-Terrestrial Relations",
    "credits": 4,
    "anyOf": [
     [
      "space-370"
     ]
    ]
   },
   {
    "id": "space-324-instrumentation-for-atmos-space-scienc",
    "group": "Required Core Subjects",
    "label": "SPACE 324, Instrumentation for Atmos & Space Sciences",
    "credits": 4,
    "anyOf": [
     [
      "space-324"
     ]
    ]
   },
   {
    "id": "space-478-space-environment",
    "group": "Required Core Subjects",
    "label": "SPACE 478, Space Environment",
    "credits": 4,
    "anyOf": [
     [
      "space-478"
     ]
    ]
   },
   {
    "id": "space-423-data-analysis-and-visualization",
    "group": "Required Core Subjects",
    "label": "SPACE 423, Data Analysis and Visualization",
    "credits": 4,
    "anyOf": [
     [
      "space-423"
     ]
    ]
   },
   {
    "id": "space-495-595-note-1-495-4-595-3",
    "group": "Required Core Subjects",
    "label": "SPACE 495/595 (Note 1) 495 (4) / 595 (3)",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "physics-340-waves-heat-and-light",
    "group": "Space Science",
    "label": "PHYSICS 340, Waves Heat and Light",
    "credits": 3,
    "anyOf": [
     [
      "physics-340"
     ]
    ]
   },
   {
    "id": "space-380-introduction-to-radiative-transfer",
    "group": "Space Science",
    "label": "SPACE 380, Introduction to Radiative Transfer",
    "credits": 3,
    "anyOf": [
     [
      "space-380"
     ]
    ]
   },
   {
    "id": "physics-405-intermediate-electricity-and-magneti",
    "group": "Space Science",
    "label": "PHYSICS 405, Intermediate Electricity and Magnetism (Note 4)",
    "credits": 4,
    "anyOf": [
     [
      "physics-405"
     ]
    ]
   },
   {
    "id": "physics-390-modern-physics",
    "group": "Space Science",
    "label": "PHYSICS 390, Modern Physics",
    "credits": 3,
    "anyOf": [
     [
      "physics-390"
     ]
    ]
   },
   {
    "id": "physics-391-lab",
    "group": "Space Science",
    "label": "PHYSICS 391, Lab",
    "credits": 2,
    "anyOf": [
     [
      "physics-391"
     ]
    ]
   },
   {
    "id": "ners-471-introduction-to-plasmas",
    "group": "Space Science",
    "label": "NERS 471, Introduction to Plasmas",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "space-499-455-capstone-research-note-2",
    "group": "Space Science",
    "label": "SPACE 499/455 Capstone Research (Note 2)",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "11-12-hours",
    "group": "Space Science",
    "label": "(11/12 hours)",
    "target": 11,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   },
   {
    "id": "10-hours",
    "group": "Space Science",
    "label": "(10 Hours)",
    "target": 10,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/clasp/"
   }
  ],
  "plan": [
   [
    {
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
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
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
    },
    {
     "label": "Engineering 101, Introduction to Computers",
     "credits": 4,
     "req": "engineering-101-introduction-to-computers"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "SPACE 320, Earth and Space System Evolution",
     "credits": 3,
     "req": "space-320-earth-and-space-system-evolution"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "SPACE 321, Earth and Space System Dynamics",
     "credits": 3,
     "req": "space-321-earth-and-space-system-dynamics"
    },
    {
     "label": "SPACE 323, Earth System Analysis",
     "credits": 4,
     "req": "space-323-earth-system-analysis"
    }
   ],
   [
    {
     "label": "SPACE 370, Solar-Terrestrial Relations",
     "credits": 4,
     "req": "space-370-solar-terrestrial-relations"
    },
    {
     "label": "PHYSICS 340, Waves Heat and Light",
     "credits": 3,
     "req": "physics-340-waves-heat-and-light"
    },
    {
     "label": "SPACE 380, Introduction to Radiative Transfer",
     "credits": 3,
     "req": "space-380-introduction-to-radiative-transfer"
    },
    {
     "label": "(11/12 hours)",
     "credits": 3,
     "req": "11-12-hours"
    },
    {
     "label": "(10 Hours)",
     "credits": 3,
     "req": "10-hours"
    }
   ],
   [
    {
     "label": "SPACE 324, Instrumentation for Atmos & Space Sciences",
     "credits": 4,
     "req": "space-324-instrumentation-for-atmos-space-scienc"
    },
    {
     "label": "PHYSICS 405, Intermediate Electricity and Magnetism (Note 4)",
     "credits": 4,
     "req": "physics-405-intermediate-electricity-and-magneti"
    },
    {
     "label": "PHYSICS 390, Modern Physics",
     "credits": 3,
     "req": "physics-390-modern-physics"
    },
    {
     "label": "PHYSICS 391, Lab",
     "credits": 2,
     "req": "physics-391-lab"
    },
    {
     "label": "(10 Hours)",
     "credits": 3,
     "req": "10-hours"
    }
   ],
   [
    {
     "label": "SPACE 478, Space Environment",
     "credits": 4,
     "req": "space-478-space-environment"
    },
    {
     "label": "NERS 471, Introduction to Plasmas",
     "credits": 3,
     "req": "ners-471-introduction-to-plasmas"
    },
    {
     "label": "(11/12 hours)",
     "credits": 4,
     "req": "11-12-hours"
    },
    {
     "label": "(10 Hours)",
     "credits": 4,
     "req": "10-hours"
    }
   ],
   [
    {
     "label": "SPACE 423, Data Analysis and Visualization",
     "credits": 4,
     "req": "space-423-data-analysis-and-visualization"
    },
    {
     "label": "SPACE 495/595 (Note 1) 495 (4) / 595 (3)",
     "credits": 4,
     "req": "space-495-595-note-1-495-4-595-3"
    },
    {
     "label": "SPACE 499/455 Capstone Research (Note 2)",
     "credits": 4,
     "req": "space-499-455-capstone-research-note-2"
    },
    {
     "label": "(11/12 hours)",
     "credits": 4,
     "req": "11-12-hours"
    }
   ]
  ]
 },
 {
  "id": "engineering-engineering-physics",
  "name": "Engineering Physics",
  "school": "College of Engineering (B.S.E.)",
  "sourceUrl": "https://bulletin.engin.umich.edu/engin-phys/",
  "sourceLabel": "Engineering Bulletin, sample schedule revised March 2025",
  "planIsOfficial": true,
  "planSourceUrl": "https://bulletin.engin.umich.edu/wp-content/uploads/sites/306/2025/09/Engineering-Physics-Sample-Schedule-Winter-2025-1.pdf",
  "notes": [
   "This follows the department's sample schedule revised March 2025. A plan may differ by when you started, so check the current Bulletin.",
   "It's only a sample: you don't have to follow it exactly, apart from prerequisite chains.",
   "Rows with several courses or choices are tracked by credits. The linked schedule has the details and footnotes."
  ],
  "requirements": [
   {
    "id": "mathematics-115-116-215-and",
    "group": "Required of all engineers",
    "label": "Mathematics 115, 116, 215, and",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/engin-phys/"
   },
   {
    "id": "engr-100-intro-to-engr",
    "group": "Required of all engineers",
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
    "group": "Required of all engineers",
    "label": "Engr 101, Intro to Computers",
    "credits": 4,
    "anyOf": [
     [
      "engr-101"
     ]
    ]
   },
   {
    "id": "chemistry-125-126-and-130-or-chemistry-210-and",
    "group": "Required of all engineers",
    "label": "Chemistry 125/126 and 130 or Chemistry 210 and",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/engin-phys/"
   },
   {
    "id": "physics-140-with-lab-141-physics-240-with-lab",
    "group": "Required of all engineers",
    "label": "Physics 140 with Lab 141; Physics 240 with Lab",
    "target": 10,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/engin-phys/"
   },
   {
    "id": "intellectual-breadth",
    "group": "Required of all engineers",
    "label": "Intellectual Breadth",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/engin-phys/"
   },
   {
    "id": "mathematics-elective-300-level-or-higher",
    "group": "Advanced Mathematics",
    "label": "Mathematics Elective (300-level or higher)",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/engin-phys/"
   },
   {
    "id": "matscie-250-or-matscie",
    "group": "Related Technical Subjects",
    "label": "MATSCIE 250 or MATSCIE",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/engin-phys/"
   },
   {
    "id": "eecs-314-or-eecs",
    "group": "Related Technical Subjects",
    "label": "EECS 314 or EECS",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/engin-phys/"
   },
   {
    "id": "physics-340-waves-heat-and-light",
    "group": "Physics",
    "label": "Physics 340, Waves, Heat and Light",
    "credits": 3,
    "anyOf": [
     [
      "physics-340"
     ]
    ]
   },
   {
    "id": "physics-316-mathematical-methods",
    "group": "Physics",
    "label": "Physics 316, Mathematical Methods",
    "credits": 3,
    "anyOf": [
     [
      "physics-316"
     ]
    ]
   },
   {
    "id": "physics-390-or-ners",
    "group": "Physics",
    "label": "Physics 390 or NERS",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/engin-phys/"
   },
   {
    "id": "physics-401-intermediate-mechanics",
    "group": "Physics",
    "label": "Physics 401, Intermediate Mechanics",
    "credits": 3,
    "anyOf": [
     [
      "physics-401"
     ]
    ]
   },
   {
    "id": "physics-405-intermediate-electricity-and-magneti",
    "group": "Physics",
    "label": "Physics 405, Intermediate Electricity and Magnetism",
    "credits": 3,
    "anyOf": [
     [
      "physics-405"
     ]
    ]
   },
   {
    "id": "physics-406-statistical-and-thermal-physics",
    "group": "Physics",
    "label": "Physics 406, Statistical and Thermal Physics",
    "credits": 3,
    "anyOf": [
     [
      "physics-406"
     ]
    ]
   },
   {
    "id": "physics-lab-elective-or-directed-study-with-rese",
    "group": "Physics",
    "label": "Physics Lab Elective or Directed Study with Research Lab",
    "target": 2,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/engin-phys/"
   },
   {
    "id": "physics-elective-300-level-or-higher",
    "group": "Physics",
    "label": "Physics Elective (300-level or higher)",
    "target": 3,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/engin-phys/"
   },
   {
    "id": "engineering-electives",
    "group": "Engineering Concentration",
    "label": "Engineering Electives",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/engin-phys/"
   },
   {
    "id": "engineering-laboratory-elective-400-level-or-hig",
    "group": "Engineering Concentration",
    "label": "Engineering Laboratory Elective (400-level or higher)",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/engin-phys/"
   },
   {
    "id": "300-level-or-higher",
    "group": "Technical Electives",
    "label": "(300-level or higher)",
    "target": 7,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/engin-phys/"
   },
   {
    "id": "general-electives",
    "group": "General Electives",
    "label": "General Electives",
    "target": 12,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/engin-phys/"
   }
  ],
  "plan": [
   [
    {
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
    },
    {
     "label": "Engr 100, Intro to Engr",
     "credits": 4,
     "req": "engr-100-intro-to-engr"
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
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
    },
    {
     "label": "Engr 101, Intro to Computers",
     "credits": 4,
     "req": "engr-101-intro-to-computers"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "MATSCIE 250 or MATSCIE",
     "credits": 4,
     "req": "matscie-250-or-matscie"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    },
    {
     "label": "EECS 314 or EECS",
     "credits": 4,
     "req": "eecs-314-or-eecs"
    },
    {
     "label": "Physics 340, Waves, Heat and Light",
     "credits": 3,
     "req": "physics-340-waves-heat-and-light"
    }
   ],
   [
    {
     "label": "Physics 316, Mathematical Methods",
     "credits": 3,
     "req": "physics-316-mathematical-methods"
    },
    {
     "label": "Physics 390 or NERS",
     "credits": 3,
     "req": "physics-390-or-ners"
    },
    {
     "label": "Physics Lab Elective or Directed Study with Research Lab",
     "credits": 2,
     "req": "physics-lab-elective-or-directed-study-with-rese"
    },
    {
     "label": "Engineering Electives",
     "credits": 4,
     "req": "engineering-electives"
    },
    {
     "label": "General Electives",
     "credits": 3,
     "req": "general-electives"
    }
   ],
   [
    {
     "label": "Physics 401, Intermediate Mechanics",
     "credits": 3,
     "req": "physics-401-intermediate-mechanics"
    },
    {
     "label": "Physics Elective (300-level or higher)",
     "credits": 3,
     "req": "physics-elective-300-level-or-higher"
    },
    {
     "label": "Engineering Electives",
     "credits": 4,
     "req": "engineering-electives"
    },
    {
     "label": "(300-level or higher)",
     "credits": 4,
     "req": "300-level-or-higher"
    },
    {
     "label": "General Electives",
     "credits": 3,
     "req": "general-electives"
    }
   ],
   [
    {
     "label": "Mathematics Elective (300-level or higher)",
     "credits": 3,
     "req": "mathematics-elective-300-level-or-higher"
    },
    {
     "label": "Physics 405, Intermediate Electricity and Magnetism",
     "credits": 3,
     "req": "physics-405-intermediate-electricity-and-magneti"
    },
    {
     "label": "Engineering Electives",
     "credits": 4,
     "req": "engineering-electives"
    },
    {
     "label": "(300-level or higher)",
     "credits": 3,
     "req": "300-level-or-higher"
    },
    {
     "label": "General Electives",
     "credits": 3,
     "req": "general-electives"
    }
   ],
   [
    {
     "label": "Physics 406, Statistical and Thermal Physics",
     "credits": 3,
     "req": "physics-406-statistical-and-thermal-physics"
    },
    {
     "label": "Engineering Electives",
     "credits": 4,
     "req": "engineering-electives"
    },
    {
     "label": "Engineering Laboratory Elective (400-level or higher)",
     "credits": 4,
     "req": "engineering-laboratory-elective-400-level-or-hig"
    },
    {
     "label": "General Electives",
     "credits": 3,
     "req": "general-electives"
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
    "id": "math-115-116-215",
    "group": "CoE Common Core",
    "label": "MATH 115 , 116 , 215 ,",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "engr",
    "group": "CoE Common Core",
    "label": "ENGR",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "engr-101-or",
    "group": "CoE Common Core",
    "label": "ENGR 101 or",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "chem-125-126-130-or-chem-210",
    "group": "CoE Common Core",
    "label": "CHEM 125 / 126 / 130 or CHEM 210 /",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   },
   {
    "id": "physics-140-141-physics-240",
    "group": "CoE Common Core",
    "label": "PHYSICS 140 / 141 , PHYSICS 240 /",
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
    "id": "11-credits",
    "group": "Technical Electives",
    "label": "(11 credits)",
    "target": 11,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/eecs/"
   }
  ],
  "plan": [
   [
    {
     "label": "MATH 115 , 116 , 215 ,",
     "credits": 4,
     "req": "math-115-116-215"
    },
    {
     "label": "ENGR",
     "credits": 4,
     "req": "engr"
    },
    {
     "label": "CHEM 125 / 126 / 130 or CHEM 210 /",
     "credits": 5,
     "req": "chem-125-126-130-or-chem-210"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "MATH 115 , 116 , 215 ,",
     "credits": 4,
     "req": "math-115-116-215"
    },
    {
     "label": "ENGR 101 or",
     "credits": 4,
     "req": "engr-101-or"
    },
    {
     "label": "PHYSICS 140 / 141 , PHYSICS 240 /",
     "credits": 5,
     "req": "physics-140-141-physics-240"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "MATH 115 , 116 , 215 ,",
     "credits": 4,
     "req": "math-115-116-215"
    },
    {
     "label": "PHYSICS 140 / 141 , PHYSICS 240 /",
     "credits": 5,
     "req": "physics-140-141-physics-240"
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
     "label": "MATH 115 , 116 , 215 ,",
     "credits": 4,
     "req": "math-115-116-215"
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
     "label": "(11 credits)",
     "credits": 3,
     "req": "11-credits"
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
     "label": "(11 credits)",
     "credits": 4,
     "req": "11-credits"
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
     "label": "(11 credits)",
     "credits": 4,
     "req": "11-credits"
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
    "id": "math-115-116-215",
    "group": "CoE Common Core",
    "label": "MATH 115 , 116 , 215 ,",
    "target": 16,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/mse-2/"
   },
   {
    "id": "engr",
    "group": "CoE Common Core",
    "label": "ENGR",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/mse-2/"
   },
   {
    "id": "engr-2",
    "group": "CoE Common Core",
    "label": "ENGR",
    "target": 4,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/mse-2/"
   },
   {
    "id": "chem-125-126-130-or-chem-210",
    "group": "CoE Common Core",
    "label": "CHEM 125 / 126 / 130 or CHEM 210 /",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/mse-2/"
   },
   {
    "id": "physics-140-141-physics-240",
    "group": "CoE Common Core",
    "label": "PHYSICS 140 / 141 , PHYSICS 240 /",
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
    "id": "12-credits",
    "group": "Science and Technical Electives",
    "label": "(12 credits)",
    "target": 12,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/mse-2/"
   }
  ],
  "plan": [
   [
    {
     "label": "MATH 115 , 116 , 215 ,",
     "credits": 4,
     "req": "math-115-116-215"
    },
    {
     "label": "ENGR",
     "credits": 4,
     "req": "engr"
    },
    {
     "label": "CHEM 125 / 126 / 130 or CHEM 210 /",
     "credits": 5,
     "req": "chem-125-126-130-or-chem-210"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "MATH 115 , 116 , 215 ,",
     "credits": 4,
     "req": "math-115-116-215"
    },
    {
     "label": "ENGR",
     "credits": 4,
     "req": "engr-2"
    },
    {
     "label": "PHYSICS 140 / 141 , PHYSICS 240 /",
     "credits": 5,
     "req": "physics-140-141-physics-240"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "MATH 115 , 116 , 215 ,",
     "credits": 4,
     "req": "math-115-116-215"
    },
    {
     "label": "PHYSICS 140 / 141 , PHYSICS 240 /",
     "credits": 5,
     "req": "physics-140-141-physics-240"
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
     "label": "MATH 115 , 116 , 215 ,",
     "credits": 4,
     "req": "math-115-116-215"
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
     "label": "(12 credits)",
     "credits": 3,
     "req": "12-credits"
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
     "label": "(12 credits)",
     "credits": 3,
     "req": "12-credits"
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
     "label": "(12 credits)",
     "credits": 6,
     "req": "12-credits"
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
    "id": "mathematics-115-116-215-and",
    "group": "Subjects required by all programs",
    "label": "Mathematics 115, 116, 215, and",
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
    "id": "chemistry-125-126-and-130-or-chemistry-210-and",
    "group": "Subjects required by all programs",
    "label": "Chemistry 125/126 and 130 or Chemistry 210 and",
    "target": 5,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ioe-2/"
   },
   {
    "id": "physics-140-with-lab-141-physics-240-with-lab",
    "group": "Subjects required by all programs",
    "label": "Physics 140 with Lab 141; Physics 240 with Lab",
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
    "id": "ioe-senior-design-course-ioe-424-481",
    "group": "Required Program Subjects",
    "label": "IOE Senior Design Course IOE 424, 481,",
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
    "id": "19",
    "group": "Required Program Subjects",
    "label": "(19)",
    "target": 19,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ioe-2/"
   },
   {
    "id": "9-12-hours-9-12",
    "group": "Required Program Subjects",
    "label": "(9-12 hours) 9-12",
    "target": 9,
    "unit": "credits",
    "browse": "https://bulletin.engin.umich.edu/depts/ioe-2/"
   }
  ],
  "plan": [
   [
    {
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
    },
    {
     "label": "Engr 100, Intro to Engr",
     "credits": 4,
     "req": "engr-100-intro-to-engr"
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
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
    },
    {
     "label": "Engr 101, Intro to Computers",
     "credits": 4,
     "req": "engr-101-intro-to-computers"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab"
    },
    {
     "label": "Intellectual Breadth",
     "credits": 4,
     "req": "intellectual-breadth"
    }
   ],
   [
    {
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
    },
    {
     "label": "Physics 140 with Lab 141; Physics 240 with Lab",
     "credits": 5,
     "req": "physics-140-with-lab-141-physics-240-with-lab"
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
     "label": "Mathematics 115, 116, 215, and",
     "credits": 4,
     "req": "mathematics-115-116-215-and"
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
     "label": "(19)",
     "credits": 3,
     "req": "19"
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
     "label": "(19)",
     "credits": 6,
     "req": "19"
    }
   ],
   [
    {
     "label": "IOE 474, Simulation",
     "credits": 4,
     "req": "ioe-474-simulation"
    },
    {
     "label": "(19)",
     "credits": 6,
     "req": "19"
    },
    {
     "label": "(9-12 hours) 9-12",
     "credits": 6,
     "req": "9-12-hours-9-12"
    }
   ],
   [
    {
     "label": "Non-IOE Engineering Courses (11-12 hours)",
     "credits": 4,
     "req": "non-ioe-engineering-courses-11-12-hours"
    },
    {
     "label": "IOE Senior Design Course IOE 424, 481,",
     "credits": 4,
     "req": "ioe-senior-design-course-ioe-424-481"
    },
    {
     "label": "(19)",
     "credits": 4,
     "req": "19"
    },
    {
     "label": "(9-12 hours) 9-12",
     "credits": 3,
     "req": "9-12-hours-9-12"
    }
   ]
  ]
 }
];
