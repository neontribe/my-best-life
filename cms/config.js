const config = {
  cms_manual_init: true,
  backend: {
    name: 'github',
    repo: 'neontribe/my-best-life',
    branch: 'development',
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
      slug: '{{organisation}}-{{title}}',
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
          label: 'Promote this service',
          name: 'promoted',
          widget: 'boolean',
          required: false,
          hint: 'Check to move this service to the top of the list of all services',
        },
        {
          label: 'Image',
          name: 'image',
          widget: 'object',
          fields: [
            {
              label: 'Image file',
              name: 'image',
              widget: 'image',
              required: false,
            },
            {
              label: 'Image alt text',
              name: 'imageAlt',
              widget: 'string',
              required: false,
              hint: 'A concise text description of the image, for screen readers and other assistive technology.',
            },
          ],
        },
        {
          label: 'Description',
          name: 'description',
          widget: 'text',
          hint: 'What I am going into and how could I get out? What does it do for me? We want to explain what it looks like when you take part and what are the benefits of being involved',
        },
        {
          label: 'Categories',
          name: 'categories',
          widget: 'object',
          hint: 'Add categories for the service. Not currently displayed, but influences the quiz results',
          fields: [
            {
              label: 'Category 1',
              name: 'category1',
              widget: 'select',
              required: false,
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
                { label: 'Housing', value: 'Housing' },
                { label: 'Friends', value: 'Friends' },
                { label: 'Family', value: 'Family' },
                { label: 'Drink and Drugs', value: 'Drink and Drugs' },
                { label: 'Physical Health', value: 'Physical Health' },
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
                { label: 'Housing', value: 'Housing' },
                { label: 'Friends', value: 'Friends' },
                { label: 'Family', value: 'Family' },
                { label: 'Drink and Drugs', value: 'Drink and Drugs' },
                { label: 'Physical Health', value: 'Physical Health' },
                {
                  label: 'My Rights and the Law',
                  value: 'My Rights and the Law',
                },
              ],
            },
          ],
        },
        {
          label: 'Interest group',
          name: 'interests',
          widget: 'select',
          multiple: true,
          max: 3,
          hint: 'Maximum 3 - Add interest groups for the service. Not currently displayed, but influences the quiz results',
          required: false,
          options: [
            { label: '-', value: '' },
            { label: 'Sports', value: 'Sports' },
            { label: 'Music', value: 'Music' },
            { label: 'Films and TV', value: 'Films and TV' },
            { label: 'Art and Design', value: 'Art and Design' },
            { label: 'Drama', value: 'Drama' },
            { label: 'Reading', value: 'Reading' },
            { label: 'Writing', value: 'Writing' },
            { label: 'Cooking', value: 'Cooking' },
            { label: 'Volunteering', value: 'Volunteering' },
            { label: 'Outdoor Activities', value: 'Outdoor Activities' },
            { label: 'Activism', value: 'Activism' },
            { label: 'Fashion and Beauty', value: 'Fashion and Beauty' },
            { label: 'Gaming', value: 'Gaming' },
          ],
        },
        {
          label: 'Feelings',
          name: 'feelings',
          widget: 'select',
          hint: 'Add feelings the service addresses. Not currently displayed, but influences the quiz results',
          required: false,
          multiple: true,
          options: [
            { label: 'unsure', value: 'unsure' },
            { label: 'okay', value: 'okay' },
            { label: 'calm', value: 'calm' },
            { label: 'anxious', value: 'anxious' },
            { label: 'hopeful', value: 'hopeful' },
            { label: 'confused', value: 'confused' },
            { label: 'angry', value: 'angry' },
            { label: 'excited', value: 'excited' },
            { label: 'sad', value: 'sad' },
            { label: 'scared', value: 'scared' },
            { label: 'unsafe', value: 'unsafe' },
            { label: 'ignored', value: 'ignored' },
          ],
        },
        {
          label: 'Cost value',
          name: 'costValue',
          widget: 'number',
          hint: 'The numerical value used for filtering. Choose the lowest value if there are multiple prices',
          value_type: 'float',
          min: 0,
          step: 0.01,
        },
        {
          label: 'Cost qualifier',
          name: 'costQualifier',
          widget: 'string',
          required: false,
          hint: 'A very short cost qualifier for the list view, eg "£5 per week", "£12 per session", "From £18.50"',
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
          widget: 'select',
          multiple: true,
          required: false,
          hint: 'Specify if a service will only allow certain genders. Leave blank if unknown',
          options: [
            { label: 'male', value: 'male' },
            { label: 'female', value: 'female' },
            {
              label: 'non-binary / non-conforming',
              value: 'non-binary / non-conforming',
            },
            { label: 'transgender', value: 'transgender' },
          ],
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
          required: true,
          options: [
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
          hint: 'Where possible an actual address of the service, not the head office',
        },
        {
          label: 'Make map link from location',
          name: 'makeMapLink',
          widget: 'boolean',
          required: false,
          hint: 'Make a Google Maps link from the provided location, to be shown on the service page',
        },
        {
          label: 'Ward',
          name: 'area',
          widget: 'select',
          multiple: true,
          required: false,
          hint: 'Select the ward(s) the service operates in. Leave blank for online services',
          options: [
            { label: 'Brixton/Stockwell', value: 'Brixton/Stockwell' },
            { label: 'Brixton/Tulse Hill', value: 'Brixton/Tulse Hill' },
            {
              label: 'Clapham/Brixton Hill',
              value: 'Clapham/Brixton Hill',
            },
            { label: 'Norwood', value: 'Norwood' },
            { label: 'Streatham', value: 'Streatham' },
            { label: 'North Lambeth', value: 'North Lambeth' },
          ],
        },
        {
          label: 'Time',
          name: 'time',
          widget: 'string',
          required: false,
          hint: 'The actual value, this may be complex for opening hours.',
        },
        {
          label: 'What to expect',
          name: 'expectation',
          widget: 'text',
          hint: "Add some details to help set a service user's expectations before attending",
          required: false,
        },
        {
          label: 'How to get in touch',
          name: 'contactExplanation',
          widget: 'text',
          required: false,
        },
        {
          label: 'Email',
          name: 'email',
          widget: 'string',
          required: false,
        },
        {
          label: 'Form',
          name: 'form',
          widget: 'string',
          required: false,
        },
        {
          label: 'Phone',
          name: 'phone',
          widget: 'string',
          required: false,
        },
        {
          label: 'Website',
          name: 'website',
          widget: 'string',
          required: false,
        },
        {
          label: 'Reviews',
          name: 'reviews',
          widget: 'list',
          summary: '{{fields.comment}}',
          fields: [
            {
              label: 'Author',
              name: 'author',
              widget: 'string',
              required: false,
              hint: "Who wrote this review? Feel free to include more than the author's name, e.g. 'Isaac, age 17'",
            },
            {
              label: 'Comment',
              name: 'comment',
              widget: 'text',
              required: false,
              hint: 'What did they have to say about it?',
            },
            {
              label: 'Rating',
              name: 'rating',
              widget: 'number',
              required: false,
              hint: 'Rating out of 5 for this service',
              min: 1,
              max: 5,
              step: 1,
            },
          ],
          required: false,
          default: [],
        },
      ],
    },
    {
      label: 'Privacy Policy',
      label_singular: 'Privacy Policy',
      name: 'privacy',
      folder: 'content/privacy',
      slug: '{{title}}',
      create: false,
      fields: [
        {
          label: 'Content Name',
          name: 'title',
          widget: 'string',
        },
        {
          label: 'Privacy Policy',
          name: 'content',
          widget: 'markdown',
          buttons: [
            'bold',
            'italic',
            'link',
            'heading-two',
            'heading-three',
            'heading-four',
            'bulleted-list',
          ],
          hint: 'There will already be a heading level 1 in the page, so this content should use a maximum of heading level 2.',
        },
      ],
    },
    {
      label: 'About',
      label_singular: 'About',
      name: 'about',
      folder: 'content/about',
      slug: '{{title}}',
      create: false,
      fields: [
        {
          label: 'Content Name',
          name: 'title',
          widget: 'string',
        },
        {
          label: 'About',
          name: 'content',
          widget: 'markdown',
          buttons: [
            'bold',
            'italic',
            'link',
            'heading-two',
            'heading-three',
            'heading-four',
            'bulleted-list',
          ],
          hint: 'There will already be a heading level 1 in the page, so this content should use a maximum of heading level 2.',
        },
      ],
    },
  ],
}

export default config
