import {
  DateSettings,
  FormalityControls,
  FormalityData,
  RangeOptions,
} from './app/formality/formality-data-structures';
export const Form: FormalityData = {
  label: 'Formality - optimise productivity!',
  name: 'baseGroup',
  type: 'group',
  controls: [
    {
      name: 'firstGroup',
      label: 'Prallel elements test',
      type: 'group',
      controls: [
        {
          name: 'radioGroup',
          label: 'This is a radio',
          type: 'radioGroup',
          value: '1',
          controls: [
            {
              label: 'One',
              value: '1',
              name: 'radio1',
              type: 'radio',
            },
            {
              label: 'Two',
              value: '2',
              name: 'radio2',
              type: 'radio',
            },
            {
              label: 'Three',
              value: '3',
              name: 'radio3',
              type: 'radio',
            },
          ],
          validators: {},
        },
        {
          name: 'agreesdsTerms',
          label: 'Another',
          value: [
            {
              name: 'yourAge',
              label: 'Whats your age',
              value: '10',
              type: 'text',
              settings: {
                min: 0,
                max: 100,
                step: 1,
                icon: 'sunny',
              },
              validators: {
                required: true,
                minlength: 2,
              },
            },
            {
              name: 'lightDark',
              label: 'Do you like switches?',
              value: false,
              type: 'switch',
              validators: {
                requiredTrue: true,
              },
            },
          ] as FormalityControls,
          type: 'form',
          validators: {},
        },
      ],
    },
    {
      name: 'secondGroup',
      label: 'ments test',
      type: 'group',
      controls: [
        {
          name: 'yourAge',
          label: 'Whats your age',
          value: 20,
          type: 'range',
          settings: {
            min: 0,
            max: 100,
            step: 1,
          } as RangeOptions,
          validators: {},
        },
        {
          name: 'switchesLike',
          label: 'Do you like switches?',
          value: false,
          type: 'switch',
          validators: {},
        },
        {
          name: 'fileUpload',
          label: 'Choose file',
          value: null,
          type: 'file',
          validators: {},
        },
        {
          name: 'date',
          label: 'Meeting date',
          value: null,
          type: 'date',
          validators: {},
          settings: {
            format: 'dd/MM/yyyy hh:mm',
            time: {
              seconds: true,
              meridian: false,
            },
          } as DateSettings,
        },
      ],
    },
    {
      name: 'thirdGroup',
      label: 'elements test',
      type: 'group',
      controls: [
        {
          name: 'countryselect',
          label: 'Country select',
          value: ['LT'],
          type: 'country',
          settings: {
            multiple: true,
          },
          validators: {},
        },
        {
          name: 'multi',
          label: 'Multi select',
          value: [],
          type: 'select',
          settings: {
            multiple: true,
          },
          options: ['Alpha', 'Beta', 'Gamma'],
          validators: {},
        },
        {
          name: 'single',
          label: 'Single select',
          value: 'Gamma',
          type: 'select',
          settings: {
            multiple: false,
          },
          options: ['Alpha', 'Beta', 'Gamma'],
          validators: {},
        },
      ],
    },
    {
      name: 'articleText',
      label: 'Write a parahraph',
      value: 'php in tags',
      type: 'article',
      validators: {},
    },
  ],
};
