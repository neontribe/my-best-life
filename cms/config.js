export default {
  cms_manual_init: true,
  backend: {
    name: 'github',
    repo: 'neontribe/my-best-life',
    branch: 'main',
  },
  publish_mode: 'editorial_workflow',
  media_folder: 'public/img',
  public_folder: 'img',
  editor: {
    preview: false,
  },
  collections: [
    {
      label: 'Services',
      label_singular: 'Service',
      name: 'service',
      folder: 'content/services',
      slug: '{{slug}}',
      create: true,
      summary: '{{organisation}}: {{title}}',
      fields: [
        {
          label: 'Organisation',
          name: 'organisation',
          widget: 'string',
          hint: 'The name of the organisation or charity that runs the service',
        },
        {
          label: 'Service or project name',
          name: 'title',
          widget: 'string',
        },
        {
          label: 'Short description',
          name: 'shortDescription',
          widget: 'string',
          hint: 'Friendly service name. This will be shown on the list view',
        },
        {
          label: 'Image',
          name: 'image',
          widget: 'image',
          required: false,
          hint: '',
        },
        {
          label: 'Description',
          name: 'description',
          widget: 'text',
          hint:
            'What I am going into and how could I get out? What does it do for me? We want to explain what it looks like when you take part and what are the benefits of being involved',
        },
        {
          label: 'Categories',
          name: 'categories',
          widget: 'object',
          fields: [
            {
              label: 'Category 1',
              name: 'category1',
              widget: 'select',
              required: false,
              hint: 'Displayed on list and details view',
              options: [
                { label: '-', value: '' },
                { label: 'Money', value: 'money' },
                { label: 'School and college', value: 'schoolAndCollege' },
                {
                  label: 'Sex and relationships',
                  value: 'sexAndRelationships',
                },
                { label: 'Mental health', value: 'mentalHealth' },
                { label: 'Keeping safe', value: 'keepingSafe' },
                { label: 'Job stuff', value: 'jobStuff' },
                { label: "Where I'm living", value: 'whereImLiving' },
                { label: 'Friends', value: 'friends' },
                { label: 'Family', value: 'family' },
                { label: 'Drink and drugs', value: 'drinkAndDrugs' },
                { label: 'My body', value: 'myBody' },
                {
                  label: 'My rights and the law',
                  value: 'myRightsAndTheLaw',
                },
              ],
            },
            {
              label: 'Category 2',
              name: 'category2',
              widget: 'select',
              required: false,
              hint: 'Displayed on list and details view',
              options: [
                { label: '-', value: '' },
                { label: 'Money', value: 'money' },
                { label: 'School and college', value: 'schoolAndCollege' },
                {
                  label: 'Sex and relationships',
                  value: 'sexAndRelationships',
                },
                { label: 'Mental health', value: 'mentalHealth' },
                { label: 'Keeping safe', value: 'keepingSafe' },
                { label: 'Job stuff', value: 'jobStuff' },
                { label: "Where I'm living", value: 'whereImLiving' },
                { label: 'Friends', value: 'friends' },
                { label: 'Family', value: 'family' },
                { label: 'Drink and drugs', value: 'drinkAndDrugs' },
                { label: 'My body', value: 'myBody' },
                {
                  label: 'My rights and the law',
                  value: 'myRightsAndTheLaw',
                },
              ],
            },
          ],
        },
        {
          label: 'Cost',
          name: 'cost',
          widget: 'object',
          fields: [
            {
              label: 'Cost value',
              name: 'costValue',
              widget: 'number',
              hint:
                'The numerical value used for filtering. Choose the lowest value if there are multiple prices',
              value_type: 'float',
              min: 0,
              step: 0.01,
            },
            {
              label: 'Cost qualifier',
              name: 'costQualifier',
              widget: 'string',
              required: false,
              hint:
                'A very short cost qualifier for the list view, eg "£5 per week", "£12 per session", "From £18.50"',
            },
            {
              label: 'Cost explanation',
              name: 'costExplanation',
              widget: 'string',
              required: false,
              hint:
                'A longer space for more cost explanation on the details view',
            },
          ],
        },
        {
          label: 'Age',
          name: 'age',
          widget: 'object',
          fields: [
            {
              label: 'Minimum age',
              name: 'minAge',
              widget: 'number',
              required: false,
              value_type: 'int',
              min: 0,
            },
            {
              label: 'Maximum age',
              name: 'maxAge',
              widget: 'number',
              required: false,
              value_type: 'int',
              min: 0,
            },
          ],
        },
        {
          label: 'Gender',
          name: 'gender',
          widget: 'string',
          hint:
            'Write this as the service refers to, so we can understand what terminology services are using',
          required: false,
        },
        {
          label: 'Eligibility',
          name: 'eligibility',
          widget: 'text',
          required: false,
          hint: 'Full eligibility requirements on the details view',
        },
        {
          label: 'Format',
          name: 'format',
          widget: 'select',
          required: false,
          options: [
            { label: '-', value: '' },
            { label: 'One to one chats', value: 'oneToOne' },
            { label: 'Meeting a group of people', value: 'meetingGroup' },
            { label: 'Online', value: 'online' },
            { label: 'Over the phone', value: 'overThePhone' },
          ],
        },
        {
          label: 'Location',
          name: 'location',
          widget: 'text',
          required: false,
          hint:
            'Where possible an actual address of the service, not the head office',
        },
      ],
    },
  ],
}
