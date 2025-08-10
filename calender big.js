$(document).ready(function () {
  const STORAGE_KEY = "customEvoCalendarEvents";

  // Fixed Indian calendar holidays and special days
  const fixedEvents = [
    {
      id: "event1",
      name: "New Year",
      date: "January/1/2020",
      type: "holiday",
      everyYear: true,
    },
    {
      id: "event1",
      name: "Republic Day",
      date: "January/26/2025",
      description:
        "Celebration of the Republic of India with parades and patriotic events.",
      type: "holiday",
      everyYear: true,
    },
    {
      id: "event2",
      name: "Independence Day",
      date: "August/15/2025",
      description:
        "Commemoration of India's independence from British rule in 1947.",
      type: "holiday",
      everyYear: true,
    },
    {
      id: "event3",
      name: "Gandhi Jayanti",
      date: "October/2/2025",
      description:
        "Birthday of Mahatma Gandhi, celebrated as a national holiday.",
      type: "holiday",
      everyYear: true,
    },
    {
      id: "event4",
      name: "Christmas",
      date: "December/25/2025",
      description: "Christian festival celebrating the birth of Jesus Christ.",
      type: "holiday",
      everyYear: true,
    },
    {
      id: "event5",
      name: "Children's Day",
      date: "November/14/2025",
      description:
        "Celebrates the rights, education, and welfare of children, marking Jawaharlal Nehru’s birthday.",
      type: "special_day",
      everyYear: true,
    },
    {
      id: "event6",
      name: "Father's Day",
      date: "June/15/2025",
      description:
        "Day honoring fathers and paternal bonds, celebrated on the third Sunday of June in India.",
      type: "special_day",
      everyYear: true,
    },
    {
      id: "event7",
      name: "Mother's Day",
      date: "May/11/2025",
      description:
        "Day honoring mothers and motherhood, observed on the second Sunday of May in India.",
      type: "special_day",
      everyYear: true,
    },
    {
      id: "event8",
      name: "Teachers' Day",
      date: "September/5/2025",
      description:
        "Celebration honoring teachers, marking the birthday of Dr. Sarvepalli Radhakrishnan.",
      type: "special_day",
      everyYear: true,
    },
  ];

  // Load custom events from localStorage or return empty array
  function loadCustomEvents() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  // Save custom events array to localStorage
  function saveCustomEvents(events) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }

  // Initialize custom events
  let customEvents = loadCustomEvents();

  // Initialize evoCalendar with fixed + custom events
  $("#calendar").evoCalendar({
    theme: "Midnight Blue",
    calendarEvents: fixedEvents.concat(customEvents),
  });

  // Double-click handler to add a custom event
  $(document).on("dblclick", ".calendar-day .day", function () {
    const day = $(this).text().trim();
    if (!day || isNaN(day)) return;

    const year = $(".calendar-year p").text().trim();
    const month = $(".calendar-months li.active-month").text().trim();

    if (!month || !year) {
      alert("Unable to detect month and year.");
      return;
    }

    const dateStr = `${month}/${day}/${year}`;

    // Prevent multiple custom events on the same date
    if (customEvents.some((evt) => evt.date === dateStr)) {
      alert(
        "A custom event already exists on this date. Please remove it before adding a new one."
      );
      return;
    }

    const eventName = prompt(`Add Event Name for date ${dateStr}:`);
    if (!eventName) return;

    const eventDescription =
      prompt("Add a description for this event (optional):") || "";

    const newEvent = {
      id: `customEvent${Date.now()}`,
      name: eventName,
      date: dateStr,
      description: eventDescription,
      type: "custom",
      everyYear: false,
      color: "#32CD32", // limegreen dot
    };

    $("#calendar").evoCalendar("addCalendarEvent", newEvent);
    customEvents.push(newEvent);
    saveCustomEvents(customEvents);
  });

  // Function to add remove-buttons and assign event IDs to each event container
  function updateEventContainers() {
    const allEvents = $("#calendar").evoCalendar("getAllEvents");

    $(".evo-calendar .event-container").each(function () {
      const $container = $(this);

      // Append remove button if not already added
      if ($container.find(".remove-event-btn").length === 0) {
        $container.append(
          '<span class="remove-event-btn" title="Remove event">&times;</span>'
        );
      }

      // Get event title from container
      const eventTitle = $container
        .find(".event-info > p.event-title")
        .text()
        .trim();

      // Find the matching event by name (assumes unique names)
      const matchedEvent = allEvents.find((evt) => evt.name === eventTitle);

      if (matchedEvent) {
        $container.attr("data-event-id", matchedEvent.id);
      }
    });
  }

  // Set up MutationObserver to catch dynamic event list updates and add remove buttons
  const eventListContainer = document.querySelector(
    ".evo-calendar .event-list"
  );
  if (eventListContainer) {
    const observer = new MutationObserver(() => {
      updateEventContainers();
    });
    observer.observe(eventListContainer, { childList: true, subtree: true });
  }
  // Initial call to add remove buttons on page load
  updateEventContainers();

  // Click handler for remove (×) button
  $(document).on(
    "click",
    ".evo-calendar .event-container .remove-event-btn",
    function (e) {
      e.stopPropagation();

      const $eventContainer = $(this).closest(".event-container");
      const eventId = $eventContainer.attr("data-event-id");

      if (!eventId) {
        alert("Cannot find event ID.");
        return;
      }

      const allEvents = $("#calendar").evoCalendar("getAllEvents");
      const matchedEvent = allEvents.find((evt) => evt.id === eventId);

      if (!matchedEvent) {
        alert("Event not found.");
        return;
      }

      if (
        !confirm(`Remove event "${matchedEvent.name}" on ${matchedEvent.date}?`)
      ) {
        return;
      }

      // Remove from calendar
      $("#calendar").evoCalendar("removeCalendarEvent", eventId);

      // Remove from localStorage array if it's a custom event
      if (eventId.startsWith("customEvent")) {
        customEvents = customEvents.filter((e) => e.id !== eventId);
        saveCustomEvents(customEvents);
      }
    }
  );
});

// -------------------------------------hide and visible---------------------------------------
const close = document.querySelector(".extension");
const calendarBig = document.querySelector(".calendar-big");
const cut = document.querySelector(".extension-close");

close.addEventListener("click", function () {
  calendarBig.style.display = "block";
  cut.style.display = "block";
});
cut.addEventListener("click", function () {
  calendarBig.style.display = "none";
});
