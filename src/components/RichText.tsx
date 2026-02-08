import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RichText({ data }: { data: any }) {
  if (!data) return null
  return <PayloadRichText data={data} />
}
