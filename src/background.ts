import browser from "webextension-polyfill";
import icon from "@/icons/link-48.png";

/**
 * Log that we received the message.
 * Then display a notification. The notification contains the URL,
 * which we read from the message.
 */

const handleMessage: Parameters<
  typeof browser.runtime.onMessage.addListener
>[0] = (message, sender) => {
  console.log("background script received message");

  const title = browser.i18n.getMessage("notificationTitle");
  const content = browser.i18n.getMessage("notificationContent", message.url);

  browser.notifications.create({
    type: "basic",
    title,
    message: content,
    iconUrl: icon,
  });
};

/**
 * Assign `notify()` as a listener to messages from the content script.
 */
browser.runtime.onMessage.addListener(handleMessage);
