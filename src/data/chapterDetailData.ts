import type { ChapterEntry } from '@/types'

export interface ChapterDetailData {
  chapterId: string
  description: string
  entries: ChapterEntry[]
}

const chapterDetails: Record<string, ChapterDetailData> = {
  'ch-early': {
    chapterId: 'ch-early',
    description:
      'The earliest years of my life were shaped by the people and places that surrounded me. Growing up in Charleston, every corner of our neighborhood held a story. These are the moments I carry with me — small, quiet memories that built the foundation of who I became.',
    entries: [
      {
        id: 'ce-early-1',
        date: 'March 12, 2025',
        title: 'The House on Maple Street',
        body: 'We lived in a small brick house on Maple Street with a screened-in porch that faced the setting sun. I remember the way the light came through in the evenings, casting long shadows across the floorboards. Dad would sit in his chair with the newspaper, and Mom would hum something from the kitchen. It was nothing remarkable and everything at the same time. That house was the center of my world for eighteen years.',
      },
      {
        id: 'ce-early-2',
        date: 'March 14, 2025',
        title: 'Summer at the Lake',
        body: 'Every July, we packed up the station wagon and drove three hours to Lake Hartwell. Uncle Thomas had a cabin there with a dock that leaned slightly to the left. I learned to swim off that dock, swallowing half the lake in the process. James and I would fish all morning and come back sunburned and empty-handed. Those summers felt endless, like time moved differently out on the water.',
      },
      {
        id: 'ce-early-3',
        date: 'March 18, 2025',
        title: 'First Day of School',
        body: 'I still remember the knot in my stomach walking into Jefferson Elementary. Mom had pressed my shirt the night before and packed a sandwich I was too nervous to eat. My teacher was Mrs. Calloway — tall, kind, with glasses that sat on the tip of her nose. She told me I could sit wherever I liked, and I chose the desk by the window. I spent that whole first day watching the oak tree outside and wondering if I would ever feel like I belonged there. By the end of the week, I did.',
      },
    ],
  },
}

const EMPTY_DETAIL: ChapterDetailData = {
  chapterId: '',
  description: 'No entries recorded for this chapter yet.',
  entries: [],
}

export function getChapterDetailData(chapterId: string): ChapterDetailData {
  return chapterDetails[chapterId] ?? { ...EMPTY_DETAIL, chapterId }
}
