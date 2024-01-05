import browser from "webextension-polyfill";

/**
 * If the click was on a link, send a message to the background page.
 * The message contains the link's URL.
 */
const handleClick: Parameters<typeof window.addEventListener<"click">>[1] = (
  event
) => {
  let target: any = event.target;

  while (target && target.tagName !== "A" && target.parentNode) {
    target = target.parentNode as Element;
  }

  if (target.tagName !== "A") return;

  console.log("content script sending message");
  browser.runtime.sendMessage({
    url: target.href,
  });
};

/**
 * Add notifyExtension() as a listener to click events.
 */
window.addEventListener("click", handleClick);
