import type { Meta, StoryObj } from '@storybook/vue3'

import LinkList from '../components/LinkList.vue'

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'LinkList',
  component: LinkList,
  render: (args: any) => ({
    components: { LinkList },
    setup() {
      return { args }
    },
    template: '<LinkList :rows="args.rows" />'
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs']
} satisfies Meta<typeof LinkList>

export default meta
type Story = StoryObj<typeof meta>

export const AllLinkList: Story = {
  args: {
    rows: [
      {
        _id: '655c8cc90b76bf546274f457',
        url: 'https://netzpolitik.org/2023/buergerrechtsorganisation-warnt-online-werbung-als-ernstes-sicherheitsrisiko/',
        path: 'online-werbung-sicherheitsrisiko',
        created: '2023-11-21T10:56:09.732Z',
        modified: '2023-11-21T10:56:09.732Z',
        __v: 0
      },
      {
        _id: '655c8d0d0b76bf546274f45a',
        url: 'https://docs.oracle.com/en/java/javase/20/install/installation-jdk-macos.html#GUID-E8A251B6-D9A9-4276-ABC8-CC0DAD62EA33',
        path: 'install-java-macos',
        created: '2023-11-21T10:57:17.821Z',
        modified: '2023-11-21T10:57:17.821Z',
        __v: 0
      },
      {
        _id: '655c8d230b76bf546274f45d',
        url: 'https://webreference.com/cheat-sheets/vscode/',
        path: 'vscode-cheatsheet',
        created: '2023-11-21T10:57:39.575Z',
        modified: '2023-11-21T10:57:39.575Z',
        __v: 0
      },
      {
        _id: '655c8d340b76bf546274f460',
        url: 'https://storybook.js.org/addons/msw-storybook-addon',
        path: 'msw-storybook-addon',
        created: '2023-11-21T10:57:56.727Z',
        modified: '2023-11-21T10:57:56.727Z',
        __v: 0
      },
      {
        _id: '655c8d630b76bf546274f463',
        url: 'https://www.spiegel.de/start/rezept-fuer-ramen-nudelsuppe-vegetarisch-oder-mit-fleisch-selbstgemacht-fuer-drei-euro-a-f0043d85-c41e-4558-b9cf-d17380a0d97b',
        path: 'ramen-nudelsuppe-rezept',
        created: '2023-11-21T10:58:43.906Z',
        modified: '2023-11-21T10:58:43.906Z',
        __v: 0
      },
      {
        _id: '655c908e5067dacbec4e989b',
        url: 'https://www.example.com',
        path: 'beispiel-pfad',
        created: '2023-11-21T11:12:14.015Z',
        modified: '2023-11-21T11:12:14.015Z',
        __v: 0
      },
      {
        _id: '655cb7371ee7f8ae974c8322',
        url: 'https://www.newurl.com',
        path: 'neuer-pfad',
        created: '2023-11-21T13:57:11.251Z',
        modified: '2023-11-21T13:57:39.695Z',
        __v: 0
      },
      {
        _id: '655cc9c2ef39f08e9cac8671',
        url: 'https://www.newurl.com',
        path: 'neuer-pfad1',
        created: '2023-11-21T15:16:18.073Z',
        modified: '2023-11-21T15:18:00.135Z',
        __v: 0
      }
    ]
  }
}
