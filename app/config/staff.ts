import type { StaffDoc } from '@/app/lib/types';

export const FALLBACK_STAFF: StaffDoc[] = [
  {
    id: 'andy',
    name: 'ANDY GRUENEBAUM',
    role: 'Founder',
    tag: 'Ex-MLS keeper · Founder · Curriculum lead',
    bio: 'With over 15 years of professional goalkeeping experience and 8 years of coaching, Andy brings elite-level expertise to Union30. Former MLS goalkeeper with a passion for developing the next generation of shot-stoppers. When he hung up the gloves, he had one mission: give keepers the kind of pro-level development that used to mean leaving the state.',
    certifications: ['USSF "A" License', 'Goalkeeper Coaching Specialist'],
    achievements: ['19 years MLS/USL', 'Columbus Crew · Chivas USA · Sporting KC · Indy Eleven', 'UK Hall of Fame'],
    sortOrder: 1,
  },
  {
    id: 'maddie',
    name: 'MADDIE DOBYNS',
    role: 'Goalkeeper Coach',
    tag: 'NCAA D1 coaching · Former Kansas GK · NWSL development',
    bio: 'A native of Kansas City, Mo., Dobyns played at Kansas from 2013-2017 appearing in 60 matches and serving as the Jayhawks\' primary starter for her final three seasons. She helped KU reach the second round of the NCAA Tournament in 2016 and left the program ranked second in goals against average (1.06), third in shutouts (14) and fourth in wins (29).',
    certifications: ['NCAA D1 Coaching Experience', 'Cincinnati · Kentucky · Iowa State · Kansas State'],
    achievements: [
      'Coached Jordan Silkowitz — 18th overall NWSL Draft pick (KC Current)',
      'Silkowitz: first player ever drafted from Iowa State, now starter for Bay FC',
      'Silkowitz: regular US Women\'s National Team call-up',
    ],
    imageUrl: '/00d74623-maddiedobyns202313_abc-scaled.webp',
    quote: "I'm so excited to be joining Andy at Union 30. We have known each other for a long time and have always talked about doing something big together, so it is pretty cool to finally make it happen. What he has built is different from any other GK environment and you can see that in everything he does. With his experience, reputation, and how much he cares about continuing to build it, I could not pass up the chance to be part of it. Pumped to be back home and get to work.",
    sortOrder: 2,
  },
];
