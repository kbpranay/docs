export interface CallHandlers {
  onSpeaking: (who: 'agent' | 'caller' | null) => void
  onCaption: (delta: string, reset?: boolean) => void
  onEnded: (reason: string) => void
}
export interface ActiveCall {
  maxSeconds: number
  close: () => void
}
export class DemoError extends Error {}
