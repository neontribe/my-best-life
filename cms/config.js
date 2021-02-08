export default {
  cms_manual_init: true,
  backend: {
    name: 'github',
    repo: 'neontribe/my-best-life',
    branch: 'main',
    base_url: 'https://my-best-life.vercel.app',
    auth_endpoint: 'api/auth',
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
          widget: 'object',
          required: false,
          fields: [
            {
              label: 'Image file',
              name: 'image',
              widget: 'image',
            },
            {
              label: 'Image alt text',
              name: 'imageAlt',
              widget: 'string',
              hint:
                'A concise text description of the image, for screen readers and other assistive technology.',
            },
          ],
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
                { label: 'Money', value: 'Money' },
                { label: 'School and College', value: 'School and College' },
                {
                  label: 'Sex and Relationships',
                  value: 'Sex and Relationships',
                },
                { label: 'Mental Health', value: 'Mental Health' },
                { label: 'Keeping Safe', value: 'Keeping Safe' },
                { label: 'Job Stuff', value: 'Job Stuff' },
                { label: "Where I'm Living", value: "Where I'm Living" },
                { label: 'Friends', value: 'Friends' },
                { label: 'Family', value: 'Family' },
                { label: 'Drink and Drugs', value: 'Drink and Drugs' },
                { label: 'My Body', value: 'My Body' },
                {
                  label: 'My Rights and the Law',
                  value: 'My Rights and the Law',
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
                { label: 'Money', value: 'Money' },
                { label: 'School and College', value: 'School and College' },
                {
                  label: 'Sex and Relationships',
                  value: 'Sex and Relationships',
                },
                { label: 'Mental Health', value: 'Mental Health' },
                { label: 'Keeping Safe', value: 'Keeping Safe' },
                { label: 'Job Stuff', value: 'Job Stuff' },
                { label: "Where I'm Living", value: "Where I'm Living" },
                { label: 'Friends', value: 'Friends' },
                { label: 'Family', value: 'Family' },
                { label: 'Drink and Drugs', value: 'Drink and Drugs' },
                { label: 'My Body', value: 'My Body' },
                {
                  label: 'My Rights and the Law',
                  value: 'My Rights and the Law',
                },
              ],
            },
          ],
        },
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
          hint: 'A longer space for more cost explanation on the details view',
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
            { label: 'One to one chats', value: 'One to one chats' },
            {
              label: 'Meeting a group of people',
              value: 'Meeting a group of people',
            },
            { label: 'Online', value: 'Online' },
            { label: 'Over the phone', value: 'Over the phone' },
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
        {
          label: 'Time',
          name: 'time',
          widget: 'string',
          required: false,
          hint: 'The actual value, this may be complex for opening hours.',
        },
        {
          label: 'How to access',
          name: 'access',
          widget: 'text',
          required: false,
        },
      ],
    },
  ],
}
