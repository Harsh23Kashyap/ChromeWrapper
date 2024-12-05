document.addEventListener("DOMContentLoaded", () => {
  const exploreButton = document.getElementById("explore-button");

  // Set the current year dynamically
  const currentYear = new Date().getFullYear();
  exploreButton.textContent = `Explore Chrome Wrapped ${currentYear}`;

  // Open the detailed Chrome Wrapped page in a new tab
  exploreButton.addEventListener("click", () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("wrapped.html") });
  });
});
