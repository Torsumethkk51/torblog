export type Size = 1 | 2 | 3

export type ElementType = {
  name: "heading"
  text: string
  size: Size
} | {
  name: "paragraph"
  text: string
} | {
  name: "link"
  text: string
  href: string
} | {
  name: "list"
  list: string[]
}

export type Element = ElementType

export type Post = {
  title: string
  description?: string
  content: Element[] | []
}

export type UpdateListState = {
  parentIndex: number
}

export type UpdateListAction = {
  type: "addListItem"
} | {
  type: "updateListItem"
  childIndex: number
  updateText: string
} | {
  type: "removeListItem"
  childIndex: number
}

export type PostAction = {
  type: "updateTitle"
  newTitle: string
} | {
  type: "updateDescription"
  newDescription: string
} | {
  type: "addElement"
  newElement: ElementType
} | {
  type: "removeElement"
  removeId: number
} | {
  type: "updateHeading"
  updateId: number
  updateText?: string
  updateSize?: Size
} | {
  type: "updateParagraph"
  updateId: number
  updateText: string
} | {
  type: "updateLink"
  updateId: number
  updateText?: string
  updateHref?: string
} | {
  type: "updateList"
  state: UpdateListState
  action: UpdateListAction
} | {
  type: "reset"
}

export type ErrorFrom = "title" | "content"

export type CreatePostError = {
  from: ErrorFrom
  message: string
}