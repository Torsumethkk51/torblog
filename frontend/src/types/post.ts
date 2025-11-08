export type ElementType = "heading" | "paragraph" | "link" | "list"

export type Size = 1 | 2 | 3

export type Element = {
  element: ElementType
  size?: Size
  value: string | string[]
  link?: string
}

export type Post = {
  title: string
  description?: string
  content: Element[] | []
}