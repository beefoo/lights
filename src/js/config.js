var CONFIG = {
  base_url: '/api',
  base_image_url: '/',
  methods: [
    {value: 'in_person', label: 'In Person', verb_past: 'met with', verb: 'meet with'},
    {value: 'call', label: 'Phone / Video', verb_past: 'called', verb: 'call'},
    {value: 'text', label: 'Text / Chat', verb_past: 'chatted/texted with', verb: 'chat/text'},
    {value: 'mail', label: 'Snail Mail', verb_past: 'wrote', verb: 'write'}
  ],
  rhythms: [
    {value: 'week_1', label: 'One Week', unit: 'week', amount: 1},
    {value: 'week_2', label: 'Two Weeks', unit: 'week', amount: 2},
    {value: 'month_1', label: 'One Month', unit: 'month', amount: 1},
    {value: 'month_2', label: 'Two Months', unit: 'month', amount: 2},
    {value: 'month_3', label: 'Three Months', unit: 'month', amount: 3},
    {value: 'month_4', label: 'Four Months', unit: 'month', amount: 4},
    {value: 'month_6', label: 'Six Months', unit: 'month', amount: 6},
    {value: 'year_1', label: 'One Year', unit: 'year', amount: 1}
  ],
  lights: [
    {value: 'bedroom', label: 'Bedroom', hueLightId: 1, image: 'img/lights/bedroom/light{level}.jpg'},
    {value: 'corridor', label: 'Corridor', hueLightId: 2, image: 'img/lights/corridor/light{level}.jpg'},
    {value: 'dining', label: 'Dining', hueLightId: 3, image: 'img/lights/dining/light{level}.jpg'},
    {value: 'dining2', label: '2nd Dining', hueLightId: 4, image: 'img/lights/dining2/light{level}.jpg'},
    {value: 'kitchen', label: 'Kitchen', hueLightId: 5, image: 'img/lights/kitchen/light{level}.jpg'},
    {value: 'kitchen2', label: '2nd Kitchen', hueLightId: 6, image: 'img/lights/kitchen2/light{level}.jpg'},
    {value: 'stairway', label: 'Stairway', hueLightId: 7, image: 'img/lights/stairway/light{level}.jpg'},
    {value: 'stove', label: 'Stove', hueLightId: 8, image: 'img/lights/stove/light{level}.jpg'},
    {value: 'workspace', label: 'Workspace', hueLightId: 9, image: 'img/lights/workspace/light{level}.jpg'},
    {value: 'workspace2', label: '2nd Workspace', hueLightId: 10, image: 'img/lights/workspace2/light{level}.jpg'}
  ]
};
