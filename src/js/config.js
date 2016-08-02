var CONFIG = {
  base_url: '/api',
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
    {value: 'workspace', label: 'Workspace', hueLightId: 1}
  ]
};
