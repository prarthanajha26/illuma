export const analysisData = {
  bookMark: false,
  timestamp: {
    date: '15-Dec-2025',
    time: '18:20',
  },
  image: {
    url: 'path/to/image.jpg',
    false_image: 'path/to/image.jpg',
  },
  description: {
    title: 'Description',
    content:
      "The image you've provided features a dog sitting beside a river, with natural surroundings of grass and rocks.",
  },
  light_source_analysis: {
    title: 'Light Source Analysis',
    details: [
      {
        source: 'sunlight',
        description:
          'Natural sunlight coming from above and slightly to the left.',
      },
      {
        source: 'reflection_from_water',
        description:
          'Light reflected from the water below, providing softer, diffused light.',
      },
    ],
    summary: [
      {
        type: 'Sunlight',
        direction: 'left to right',
        angle: '45 degree',
      },
      {
        type: 'Reflection',
        direction: 'bottom to top',
        angle: '30 degree',
      },
    ],
  },
  lighting_condition_verdict: {
    title: 'Lighting Condition - Verdict',
    content:
      'The light is soft and diffused, possibly due to cloud cover or the position of the sun. This creates a natural and even illumination on the subject, with soft shadows.',
  },
};
