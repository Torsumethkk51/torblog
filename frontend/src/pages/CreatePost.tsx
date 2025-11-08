import { useEffect, useState, type ChangeEvent } from "react";
import type { Element, ElementType, Post, Size } from "../types/post";

export default function CreatePost() {

  {/*
    
    {
      element: "heading1-6" | "paragraph" | "link" | "list",
      value: content
    } 

    function changeToHTML() return html element

    map each and return changeToHTML()
    
  */}

  const [post, setPost] = useState<Post>({
    title: "",
    description: "",
    content: [{ element: "heading", size: 1, value: "abcde" },]
  });

  useEffect(() => console.log(post), [post]);

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    })
  }

  function handlePostElementValueChange(targetIndex: number, value: string, link?: string, listItemIndex?: number) {
    const newPostContent = [...post.content];
    console.log(value, listItemIndex);
    if (value || value === "") {
      if (listItemIndex !== undefined) {
        console.log("test")
        const newPostContentList = [...newPostContent[targetIndex].value];
        newPostContentList[listItemIndex] = value;
        newPostContent[targetIndex].value = newPostContentList;
      } else {
        newPostContent[targetIndex].value = value;
      }
    }
    if (link) {
      newPostContent[targetIndex].link = link;
    }
    setPost(prev => {
      return {
        ...prev,
        content: newPostContent
      }
    })
  }

  function addPostListItem(targetIndex: number) {
    const newPostContent = [...post.content];
    const newContentList = [...newPostContent[targetIndex].value];
    newContentList.push("");
    newPostContent[targetIndex].value = newContentList;
    setPost(prev => {
      return {
        ...prev,
        content: newPostContent
      }
    });
  }

  function removePostListItem(targetIndex: number, listItemIndex: number) {
    const newPostContent = [...post.content];
    const newPostListContentList = [...newPostContent[targetIndex].value];
    const filtered = newPostListContentList.filter((_, idx) => {
      return idx !== listItemIndex;
    });
    newPostContent[targetIndex].value = filtered;
    setPost(prev => {
      return {
        ...prev,
        content: newPostContent
      }
    });
  }

  function addPostElement(elementType: ElementType, size?: Size) {
    const newContent = [...post.content];
    
    switch (elementType) {
      case "heading":
        newContent.push({
          element: "heading",
          size: size,
          value: ""
        });
        break;
      case "paragraph":
        newContent.push({
          element: "paragraph",
          value: ""
        });
        break;
      case "link":
        newContent.push({
          element: "link",
          value: ""
        });
        break;
      case "list":
        newContent.push({
          element: "list",
          value: []
        });
        break;
      default:
        return;
    }

    setPost({
      ...post,
      content: newContent
    })
  }

  function removePostElement(targetIndex: number) {
    const newPostContent = [...post.content];
    const filtered = newPostContent.filter((_, idx) => {
      return idx !== targetIndex;
    });
    setPost(prev => {
      return {
        ...prev,
        content: filtered
      }
    });
  }

  function changeToHTML(element: Element, idx: number) {
    switch (element.element) {
      case "heading":
        return (
          <div key={idx}>
            <textarea 
              onChange={(e) => handlePostElementValueChange(idx, e.target.value)}
              placeholder="Heading text"
              value={element.value}
            />
            <button
              onClick={() => removePostElement(idx)}
            >
              Remove
            </button>
          </div>
        );
      case "paragraph":
        return (
          <div key={idx}>
            <textarea 
              onChange={(e) => handlePostElementValueChange(idx, e.target.value)}
              placeholder="Paragraph text"
              value={element.value}
              key={idx}
            />
            <button
              onClick={() => removePostElement(idx)}
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
                onChange={(e) => handlePostElementValueChange(idx, post.content[idx].value.toString(), e.target.value)}
                placeholder="Link Url"
                value={element.link}
              />
              <textarea 
                onChange={(e) => handlePostElementValueChange(idx, e.target.value ,post.content[idx].link)}
                placeholder="Link Placeholder"
                value={element.value}
              />
            </div>
            <div>
              <button
                onClick={() => removePostElement(idx)}
              >
                Remove
              </button>
            </div>
          </div>
        );
      case "list":
        return (
          <div key={idx}>
            <button
              onClick={() => addPostListItem(idx)}
            >
              Add Item
            </button>
            <ul>
              {[...element.value].map((item, itemIndex) => {
                console.log(item);
                return (
                  <li key={itemIndex}>
                    <textarea 
                      onChange={(e) => handlePostElementValueChange(idx, e.target.value , undefined, itemIndex)}
                      placeholder={`List Item ${itemIndex + 1}`}
                      value={item}
                    />
                    <button
                      onClick={() => removePostListItem(idx, itemIndex)}
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
    <>
      <main>
        <h1>Let's create your post!</h1>

        <div className="tools-bar">
          {/* 

            button -> add a blog content element (function)

          */}
          <button onClick={() => addPostElement("heading", 1)}>
            Heading
          </button>
          <button onClick={() => addPostElement("paragraph")}>
            Paragraph
          </button>
          <button onClick={() => addPostElement("link")}>
            Link
          </button>
          <button onClick={() => addPostElement("list")}>
            List
          </button>
        </div>

        <section className="result-preview">
          <div>
            <textarea
              name="title"
              onChange={handleChange}
              placeholder="Your post title here"
              value={post.title}
            />
          </div>
          <div>
            <textarea
              name="description"
              onChange={handleChange}
              placeholder="Your post description here"
              value={post.description}
            />
          </div>
          {post.content.map((element, index) => {
            return changeToHTML(element, index)
          })}
        </section>
      </main>
    </>
  );
}