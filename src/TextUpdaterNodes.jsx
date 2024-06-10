import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function TextUpdaterNode({ isConnectable, data }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setText(event.target.textContent);
    handleInput(event);
  };

  const handleInput = (event) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    if (event.inputType === 'insertParagraph') {
      event.preventDefault();
      const currentNode = range.startContainer;
      if (currentNode && currentNode.tagName !== 'BR') {
        const textBeforeCursor = currentNode.textContent.substring(0, range.startOffset);
        const textAfterCursor = currentNode.textContent.substring(range.startOffset);
        currentNode.textContent = textBeforeCursor + '\n' + textAfterCursor;
        range.setStart(currentNode, textBeforeCursor.length + 1);
        range.setEnd(currentNode, textBeforeCursor.length + 1);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };


  const handleClick = (event) => {
    const selection = window.getSelection();
    if (selection.isCollapsed) {
        if (event.detail === 1) {
            inputRef.current.focus();
            const range = document.createRange();
            range.selectNodeContents(inputRef.current);
            range.collapse(false); 
            selection.removeAllRanges();
            selection.addRange(range);
        } else if (event.detail === 2) {
            const range = document.createRange();
            range.selectNodeContents(inputRef.current);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    } else { 
        const selectionRects = selection.getRangeAt(0).getClientRects();
        let isInsideSelection = false;
        for (let i = 0; i < selectionRects.length; i++) {
            const rect = selectionRects[i];
            if (
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom
            ) {
                isInsideSelection = true;
                break;
            }
        }
        if (!isInsideSelection) {
            selection.removeAllRanges();
            inputRef.current.focus();
            const range = document.createRange();
            range.selectNodeContents(inputRef.current);
            range.collapse(false);
            selection.addRange(range);
        }
    }
};
useEffect(() => {
    if (data.color) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(inputRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('styleWithCSS', false, true);
      document.execCommand('foreColor', false, data.color);
      selection.removeAllRanges();
    }
  }, [data.color]);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <label htmlFor="text">Text:</label>
        <div
          ref={inputRef}
          className="custom-input"
          contentEditable="true"
          value={text}
          onInput={handleInputChange}
          onClick={handleClick}
          style={{
            whiteSpace: 'pre-wrap',
            minWidth: '170px',
            color: 'black',
            outline: 'none',
            backgroundColor: 'lightgrey',
            cursor: 'text'
          }}
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default TextUpdaterNode;

