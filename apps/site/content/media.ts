/**
 * Sample call recording for the "Hear a sample call" player.
 *
 * Leave `sampleCall` as null until a real recording exists. It must be made
 * with the actual Voice Agent in an Enterprise Bot demo environment (staff
 * caller with consent), approved by product as representative. Never use a
 * text-to-speech mock-up that is not the product.
 */
export interface SampleCallMedia {
  src: string // e.g. '/media/sample-call-en.mp3' in public/
  title: string
  caption: string
  transcript: { who: 'Caller' | 'Voice Agent'; text: string }[]
}

export const sampleCall: SampleCallMedia | null = null
