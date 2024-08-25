document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Apply animation based on the data-animate-effect attribute
          const effect = entry.target.getAttribute("data-animate-effect");
          if (effect) {
            entry.target.classList.add(effect);
          }
        } else if (entry.target.classList.contains("passed-through")) {
          // If the section has passed through the viewport, disable the animation
          const effect = entry.target.getAttribute("data-animate-effect");
          if (effect) {
            entry.target.classList.remove(effect);
          }
          entry.target.classList.add("static-view"); // Add class for static view
        }
      });
    },
    {
      threshold: 0.1, // Adjust the threshold as needed
    }
  );

  // Observer to track when an element has passed through the viewport
  const passThroughObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Mark the element as passed through the viewport
          entry.target.classList.add("passed-through");
          // Stop observing this entry for the passed-through observer
          passThroughObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Adjust the threshold as needed
    }
  );

  const event = new Event("scroll", {
    bubbles: true,
    cancelable: true,
  });

  // Dispatch the event on the window
  window.dispatchEvent(event);

  document.querySelectorAll(".animate-box").forEach((section) => {
    observer.observe(section); // Observe for animation
    passThroughObserver.observe(section); // Observe for passing through the viewport
  });
});
