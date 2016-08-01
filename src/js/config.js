var CONFIG = {
  base_url: '/api',
  methods: [
    {value: 'in_person', label: 'In Person', verb_past: 'met with', verb: 'meet with'},
    {value: 'call', label: 'Phone / Video', verb_past: 'called', verb: 'call'},
    {value: 'text', label: 'Text / Chat', verb_past: 'chatted/texted with', verb: 'chat/text'},
    {value: 'mail', label: 'Snail Mail', verb_past: 'wrote', verb: 'write'}
  ],
  rhythms: [
    {value: 'week_1', label: 'One Week'},
    {value: 'week_2', label: 'Two Weeks'},
    {value: 'month_1', label: 'One Month'},
    {value: 'month_2', label: 'Two Months'},
    {value: 'month_3', label: 'Three Months'},
    {value: 'month_4', label: 'Four Months'},
    {value: 'month_6', label: 'Six Months'},
    {value: 'year_1', label: 'One Year'}
  ],
  lights: [
    {value: 'workspace', label: 'Workspace'}
  ]
};
