import { useEffect } from "react";

/**
 * Execute a callback when click outside an DOM element.
 *
 * @param {Node} domNode A DOM node.
 * @param {function()} callback The function to execute when click outside the element.
 */
function useOnClickOutsideElement(domNode, callback) {
  useEffect(() => {
    function handler(event) {
      if (domNode && !domNode.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
}

export { useOnClickOutsideElement };
