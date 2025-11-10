import { useReducer } from "react";
import type { Element, ElementType, Post, PostAction, UpdateListAction } from "../types/post";
import AppLayout from "../Layout";

export default function CreatePost() {
  function postListReducer(list: string[], action: UpdateListAction): string[] {
    switch (action.type) {
      case "addListItem":
        return [...list, ""];
      case "updateListItem":
        return [...list].map((item, index) => {
          if (action.childIndex !== undefined && (index === action.childIndex)) {
            return action.updateText!;
          }
          return item;
        });
      case "removeListItem":
        return [...list].filter((_, index) => {
          return index !== action.childIndex;
        })
      default:
        return list;
    }
  }

  function postReducer(postState: Post, action: PostAction): Post {
    switch (action.type) {
      case "updateTitle":
        return {
          ...postState,
          title: action.newTitle
        }
      case "updateDescription":
        return {
          ...postState,
          description: action.newDescription
        }
      case "addElement": {
        return {
          ...postState,
          content: [...postState.content, action.newElement]
        }
      }
      case "removeElement":
        return {
          ...postState,
          content: [...postState.content.filter((_, index) => {
            return index !== action.removeId;
          })]
        }
      case "updateHeading": {
        return {
          ...postState,
          content: [...postState.content].map((content, index) => {
            if (index === action.updateId && content.name === "heading") {
              if (action.updateText !== undefined) {
                content.text = action.updateText;
              } else if (action.updateSize !== undefined) {
                content.size = action.updateSize;
              }
            }
            return content;
          })
        }
      }
      case "updateParagraph": {
        return {
          ...postState,
          content: [...postState.content].map((content, index) => {
            if (index === action.updateId && content.name === "paragraph") {
              content.text = action.updateText;
            }
            return content;
          })
        }
      }
      case "updateLink": {
        return {
          ...postState,
          content: [...postState.content].map((content, index) => {
            if (index === action.updateId && content.name === "link") {
              if (action.updateText !== undefined) {
                content.text = action.updateText;
              } else if (action.updateHref !== undefined) {
                content.href = action.updateHref;
              }
            }
            return content;
          })
        }
      }
      case "updateList":
        return {
          ...postState,
          content: [...postState.content].map((content, index) => {
            if (content.name === "list" && index === action.state.parentIndex) {
              const newContent = { ...content }
              newContent.list = postListReducer(content.list, action.action);
              return newContent;
            }
            return content
          })
        }
      default:
        throw new Error("This case is not handling at postReducer");
    }
  }

  const [postState, postDispatch] = useReducer(postReducer, {
    title: "",
    description: "",
    content: []
  });

  function addElement(newElement: ElementType) {
    postDispatch({ 
      type: "addElement",
      newElement: newElement
    })
  }

  function removeElement(removeId: number) {
    postDispatch({
      type: "removeElement",
      removeId: removeId
    });
  }

  function changeToHTML(element: Element, idx: number) {
    switch (element.name) {
      case "heading":
        return (
          <div key={idx}>
            <textarea 
              onChange={(e) => postDispatch({
                type: "updateHeading", 
                updateId: idx,
                updateText: e.target.value
              })}
              placeholder="Heading text"
              value={element.text}
            />
            <button
              onClick={() => removeElement(idx)}
            >
              Remove
            </button>
          </div>
        );
      case "paragraph":
        return (
          <div key={idx}>
            <textarea 
              onChange={(e) => postDispatch({
                type: "updateParagraph", 
                updateId: idx,
                updateText: e.target.value
              })}
              placeholder="Paragraph text"
              value={element.text}
              key={idx}
            />
            <button
              onClick={() => removeElement(idx)}
            >
              Remove
            </button>
          </div>
        );
      case "link":
        return (
          <div key={idx}>
            <div>
              <textarea 
                onChange={(e) => postDispatch({ type: "updateLink", updateId: idx ,updateHref: e.target.value })}
                placeholder="Link Url"
                value={element.href}
              />
              <textarea 
                onChange={(e) => postDispatch({ type: "updateLink", updateId: idx ,updateText: e.target.value })}
                placeholder="Link Placeholder"
                value={element.text}
              />
            </div>
            <div>
              <button
                onClick={() => removeElement(idx)}
              >
                Remove
              </button>
            </div>
          </div>
        );
      case "list":
        return (
          <div key={idx}>
            <div>
              <button
                onClick={() => postDispatch({
                  type: "updateList",
                  state: {
                    parentIndex: idx
                  },
                  action: {
                    type: "addListItem"
                  }
                })}
              >
                Add Item
              </button>
              <button
                  onClick={() => removeElement(idx)}
                >
                  Remove
                </button>
            </div>
            <ul>
              {element.list.map((item, itemIndex) => {
                return (
                  <li key={itemIndex}>
                    <textarea 
                      onChange={(e) => {
                        postDispatch({
                        type: "updateList",
                        state: {
                          parentIndex:  idx,
                        },
                        action: {
                          type: "updateListItem",
                          childIndex: itemIndex,
                          updateText: e.target.value
                        }
                      })
                      }}
                      placeholder={`List Item ${itemIndex + 1}`}
                      value={item}
                    />
                    <button
                      onClick={() => {
                        postDispatch({
                          type: "updateList",
                          state: {
                            parentIndex:  idx,
                          },
                          action: {
                            type: "removeListItem",
                            childIndex: itemIndex,
                          }
                        })
                      }}
                    >
                      Remove
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        );
      default:
        return;
    }
  }
  
  return (
    <AppLayout>
      <main>
        <h1>Let's create your post!</h1>

        <div className="tools-bar">

          <button onClick={() => addElement({
            name: "heading",
            text: "",
            size: 1
          })}>
            Heading
          </button>
          <button onClick={() => addElement({
            name: "paragraph",
            text: ""
          })}>
            Paragraph
          </button>
          <button onClick={() => addElement({
            name: "link",
            text: "",
            href: ""
          })}>
            Link
          </button>
          <button onClick={() => addElement({
            name: "list",
            list: []
          })}>
            List
          </button>
        </div>

        <section className="result-preview">
          <div>
            <textarea
              name="title"
              onChange={(e) => postDispatch({ type: "updateTitle", newTitle: e.target.value })}
              placeholder="Your post title here"
              value={postState.title}
            />
          </div>
          <div>
            <textarea
              name="description"
              onChange={(e) => postDispatch({ type: "updateDescription", newDescription: e.target.value })}
              placeholder="Your post description here"
              value={postState.description}
            />
          </div>
          {postState.content.map((element, index) => {
            return changeToHTML(element, index)
          })}
        </section>
      </main>
    </AppLayout>
  );
}