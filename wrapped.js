const showLoadingScreen = () => {
    const loadingScreen = document.getElementById("loading-screen");
    const historyContainer = document.getElementById("history-container");
    if (loadingScreen) loadingScreen.style.display = "block";
    if (historyContainer) historyContainer.style.display = "none";
  };
  
  const hideLoadingScreen = () => {
    const loadingScreen = document.getElementById("loading-screen");
    const historyContainer = document.getElementById("history-container");
    if (loadingScreen) loadingScreen.style.display = "none";
    if (historyContainer) historyContainer.style.display = "block";
  };
  
  const backgroundStyles = [
    {
      name: "Wavy",
      style: `background-color: #e5e5f7; opacity: 0.8; background-image: repeating-radial-gradient(circle at 0 0, transparent 0, #e5e5f7 10px), repeating-linear-gradient(#FCC12055, #FCC120);`,
    }
    // {
    //   name: "ZigZag",
    //   style: `background-color: #e5e5f7; opacity: 0.8; background-image: linear-gradient(135deg, #FCC120 25%, transparent 25%), linear-gradient(225deg, #FCC120 25%, transparent 25%), linear-gradient(45deg, #FCC120 25%, transparent 25%), linear-gradient(315deg, #FCC120 25%, #e5e5f7 25%); background-position: 10px 0, 10px 0, 0 0, 0 0; background-size: 20px 20px; background-repeat: repeat;`,
    // },
    // {
    //   name: "ZigZag 3D",
    //   style: `background-color: #e5e5f7; opacity: 0.8; background: linear-gradient(135deg, #FCC12055 25%, transparent 25%) -10px 0/20px 20px, linear-gradient(225deg, #FCC120 25%, transparent 25%) -10px 0/20px 20px, linear-gradient(315deg, #FCC12055 25%, transparent 25%) 0px 0/20px 20px, linear-gradient(45deg, #FCC120 25%, #e5e5f7 25%) 0px 0/20px 20px;`,
    // },
    // Add the remaining designs here...
  ];
  const backgroundColors = ["#202124", "#4285F4", "#EA4435", "#01AC47"];

  const applyRandomBackground = () => {
    // Pick a random background style
    const randomStyle = backgroundStyles[Math.floor(Math.random() * backgroundStyles.length)];
    
    // Pick a random color from the specified colors
    const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    
    // Apply the selected background style and color
    document.body.style.cssText = randomStyle.style.replace(/#e5e5f7/g, randomColor); // Replace base color
    console.log(`Applied background: ${randomStyle.name} with color: ${randomColor}`);
  };
  
  // Call the function on page load
  document.addEventListener("DOMContentLoaded", () => {
    applyRandomBackground();
  });
  
  
  // Call the function on page load
  document.addEventListener("DOMContentLoaded", () => {
    applyRandomBackground();
  });
    
  const uniqueFonts = [
    "Arial, sans-serif",
    "'Courier New', monospace",
    "'Times New Roman', serif",
    "'Georgia', serif",
    "'Comic Sans MS', cursive, sans-serif",
    "'Trebuchet MS', sans-serif",
    "'Verdana', sans-serif",
    "'Lucida Console', Monaco, monospace",
    "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    "'Impact', Charcoal, sans-serif",
    "'Roboto', sans-serif",
    "'Open Sans', sans-serif",
    "'Lato', sans-serif",
    "'Montserrat', sans-serif",
    "'Raleway', sans-serif",
    "'Ubuntu', sans-serif",
    "'Oswald', sans-serif",
    "'Dancing Script', cursive",
    "'Pacifico', cursive",
    "'Cinzel', serif",
  ];
  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  const shuffledFonts = shuffleArray([...uniqueFonts]);
  
async function fetchHintsFromGemini(prompt, apiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt, // Pass the problem prompt here
                  },
                ],
              },
            ],
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Gemini API Response:", data);
  
      // Assuming the response contains a field like 'contents' with the generated text
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  
      // Parse hints, algorithm, and time complexity
      return { steps: content.split("\n").filter(Boolean) }; // Split into lines for clarity
    } catch (error) {
      console.error("Error in fetchHintsFromGemini:", error);
      return {
        steps: ["No hint available for this problem. Try yourself. All the best!!!"],
      };
    }
  }
  

document.addEventListener("DOMContentLoaded", () => {
    console.log("We aee gere")
    const historyContainer = document.getElementById("history-container");
  
    // Predefined top 20 websites
    const top20Websites = [
      "www.google.com", "www.linkedin.com", "leetcode.com", "www.youtube.com", "mail.google.com",
      "www.github.com", "www.reddit.com", "twitter.com", "www.facebook.com", "www.instagram.com",
      "stackoverflow.com", "medium.com", "quora.com", "amazon.com", "flipkart.com", "netflix.com",
      "spotify.com", "pinterest.com", "zoom.us", "web.whatsapp.com"
    ];
  
    // Quirky messages for generic searches
    const domainMessages = {
        "www.google.com": "You Googled {count} times. Apparently, Google is your second brain.",
        "www.linkedin.com": "LinkedIn was your go-to {count} times. Still waiting for that recruiter call, huh?",
        "leetcode.com": "You tortured yourself on LeetCode {count} times. Masochist much?",
        "www.youtube.com": "You binged YouTube {count} times. Cat videos or productivity hacks?",
        "mail.google.com": "You checked Gmail {count} times. Inbox zero? Dream on.",
        "www.github.com": "You committed on GitHub {count} times. Is the code even working though?",
        "www.reddit.com": "You scrolled Reddit {count} times. Memes or serious debates? We both know the answer.",
        "twitter.com": "You scrolled Twitter {count} times. Hot takes or doomscrolling? You decide.",
        "www.facebook.com": "Facebook got your attention {count} times. Grandma’s posts never get old.",
        "www.instagram.com": "You liked Instagram {count} times. Influencer in the making?",
        "stackoverflow.com": "You searched StackOverflow {count} times. Copy-pasting code like a pro.",
        "medium.com": "You read Medium {count} times. Deep thinker, or just procrastinating?",
        "quora.com": "You asked Quora {count} times. Did you actually find the answers?",
        "amazon.com": "You shopped Amazon {count} times. Your wallet is crying.",
        "flipkart.com": "You browsed Flipkart {count} times. Retail therapy, huh?",
        "netflix.com": "You binged Netflix {count} times. Are you the 'continue watching' person?",
        "spotify.com": "You jammed on Spotify {count} times. Playlist or chaos? Who knows.",
        "pinterest.com": "You pinned Pinterest {count} times. DIY, but did you do it though?",
        "zoom.us": "You Zoomed {count} times. Pants or pajamas for those meetings?",
        "web.whatsapp.com": "WhatsApp Web {count} times. Typing... and deleting?",
        "canva.com": "You Canva-ed {count} times. Designer vibes or template addict?",
        "ebay.com": "You explored eBay {count} times. Auctions are just adrenaline shopping.",
        "bing.com": "You Bing-ed {count} times. Wait...you actually used Bing?",
        "wikipedia.org": "You Wikipedia-ed {count} times. Knowledge is power, right?",
        "apple.com": "You browsed Apple {count} times. Living that expensive dream.",
        "yahoo.com": "Yahoo got {count} visits. A blast from the past, huh?",
        "zomato.com": "You Zomato-ed {count} times. Decisions, decisions...what to eat?",
        "swiggy.com": "Swiggy got your cravings {count} times. MasterChef in another life?",
        "uber.com": "You Uber-ed {count} times. Fancy a chauffeur, don’t you?",
        "airbnb.com": "You searched Airbnb {count} times. Planning vacations or just dreaming?"
      };
  
    const defaultMessages = [
        "{domain} got {count} visits. Your new online obsession?",
        "You and {domain}? That’s {count} visits of love.",
        "Exploring {domain} {count} times. A hobby, perhaps?",
        "{domain} with {count} visits. Curious much?",
        "Browsed {domain} {count} times. What’s cooking there?",
        "{domain} is your hidden gem. {count} visits and counting.",
        "{domain} got {count} hits. Mystery solved?",
        "You visited {domain} {count} times. We’ll let you keep your secrets.",
        "{count} visits to {domain}. Is it a best-kept secret?",
        "{domain} made it to your list with {count} visits. Intriguing!"
      ];
  
    const getDefaultMessage = (domain, count) => {
      const randomIndex = Math.floor(Math.random() * defaultMessages.length);
      return defaultMessages[randomIndex].replace("{domain}", domain).replace("{count}", count);
    };
  
    const renderTop5MostSearched = (data) => {
      const topHeading = document.createElement("h1");
      topHeading.textContent = "Top 5 Generic Searches";
      topHeading.style.fontSize = "60px"; // Set font size to 60px
      topHeading.style.color = "white"; // Set text color to white
      topHeading.style.textAlign = "center";
      topHeading.style.marginBottom = "20px";
      historyContainer.appendChild(topHeading);
  
      data.forEach((item, index) => {
        const fontSize = 48 - index * 4;
        const message = domainMessages[item.domain]
          ? domainMessages[item.domain].replace("{count}", item.count)
          : getDefaultMessage(item.domain, item.count);
  
        const messageElement = document.createElement("p");
        messageElement.textContent = message;
        messageElement.style.fontSize = `${Math.max(fontSize, 12)}px`;
        messageElement.style.fontFamily = uniqueFonts[Math.floor(Math.random() * uniqueFonts.length)]; // Assign unique font
        messageElement.style.margin = "10px 0";
        messageElement.style.textAlign = "center";
  
        historyContainer.appendChild(messageElement);
      });
    };
  
    const renderTop5UniqueSearches = (data) => {
      const uniqueHeading = document.createElement("h1");
      uniqueHeading.textContent = "Top 5 Unique Searches";
      uniqueHeading.style.fontSize = "60 px";
      uniqueHeading.style.color = "white";
      uniqueHeading.style.textAlign = "center";
      uniqueHeading.style.marginBottom = "20px";
      historyContainer.appendChild(uniqueHeading);
  
      data.forEach((item, index) => {
        const fontSize = 48 - index * 4;
        const message = getDefaultMessage(item.domain, item.count);
  
        const messageElement = document.createElement("p");
        messageElement.textContent = message;
        messageElement.style.fontSize = `${Math.max(fontSize, 12)}px`;
        messageElement.style.fontFamily = uniqueFonts[Math.floor(Math.random() * uniqueFonts.length)]; // Assign unique font
        messageElement.style.margin = "10px 0";
        messageElement.style.textAlign = "center";
  
        historyContainer.appendChild(messageElement);
      });
    };
  
    const renderTop5Days = (data) => {
      const daysHeading = document.createElement("h1");
      daysHeading.textContent = "Top 5 Days with Most Searches";
      daysHeading.style.fontSize = "60px"; // Set font size to 60px
      daysHeading.style.color = "white"; // Set text color to white
      daysHeading.style.textAlign = "center";
      daysHeading.style.marginBottom = "20px";
      historyContainer.appendChild(daysHeading);
      const dayMessages = [
        "you searched {count} times. What were you up to?",
        "you Googled {count} times. Curiosity overload!",
        "you dove into {count} searches. Detective vibes?",
        "you explored {count} searches. A quest for knowledge?",
        "you looked up {count} things. Researching or procrastinating?",
        "you uncovered {count} answers. Busy bee!",
        "you searched {count} times. Brain on fire?",
        "you clicked through {count} queries. A thinker in action!",
        "you browsed {count} times. Information hoarder?",
        "you typed {count} queries. An inquisitive soul.",
        "you racked up {count} searches. On a mission?",
        "you needed {count} answers. Sleuthing success?",
        "you explored {count} queries. Internet detective?",
        "you smashed {count} searches. Curiosity won.",
        "you hunted down {count} things. Sherlock mode?",
        "you hit enter {count} times. A productive binge?",
        "you unearthed {count} answers. Digging deep?",
        "you fired off {count} queries. Busy solving mysteries?",
        "you cracked {count} questions. Brainstorming champ!",
        "you churned through {count} searches. Multitasking pro!",
      ];

      const getDayMessage = (count) => {
        const randomIndex = Math.floor(Math.random() * dayMessages.length);
        return dayMessages[randomIndex].replace("{count}", count);
      };
      
      data.forEach((item, index) => {
        const fontSize = 32 - index * 4;
        const formattedDate = new Date(item.day).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
        });
        const message = `On ${formattedDate}, ${getDayMessage(item.count)}`;
  
        const dayMessageElement = document.createElement("p");
        dayMessageElement.textContent = message;
        dayMessageElement.style.fontSize = `${Math.max(fontSize, 12)}px`;
        dayMessageElement.style.fontFamily = uniqueFonts[Math.floor(Math.random() * uniqueFonts.length)]; // Assign unique font
        dayMessageElement.style.margin = "10px 0";
        dayMessageElement.style.textAlign = "center";
  
        historyContainer.appendChild(dayMessageElement);
      });
    };

    
    // Helper: Extract valid English words from a URL
    const extractValidWordsFromUrl = (url) => {
        const stopWords = [
          "www", "com", "http", "https", "org", "net", "html", "php", "jsp", "aspx",
          "about", "the", "of", "and", "in", "to", "on", "at", "for", "with", "by",
          "a", "an", "is", "this", "that", "it", "you", "we", "they", "are", "be",
        ];
      
        const validEnglishWordRegex = /^[a-zA-Z]+$/; // Match valid English words
        const rawWords = url
          .replace(/https?:\/\/(www\.)?/gi, "") // Remove protocol and www
          .split(/[\/\-\_\.\?\&\=\#\:\+]/) // Split by common URL delimiters
          .map((word) => word.toLowerCase()) // Convert to lowercase
          .filter(
            (word) =>
              word.length > 2 &&
              !stopWords.includes(word) &&
              validEnglishWordRegex.test(word) // Ensure it's a valid English word
          );
      
        console.log(`Extracted words from URL (${url}):`, Array.from(new Set(rawWords)));
        return new Set(rawWords); // Return unique words
      };
      
  
  // Group words into topics
  const groupUrlsBySharedWordsOptimized = (urls) => {
    const wordToUrlMap = new Map();
    const groups = [];
    const used = new Set();
  
    // Step 1: Build an index of words to URLs
    urls.forEach((url, index) => {
      const words = extractValidWordsFromUrl(url);
  
      words.forEach((word) => {
        if (!wordToUrlMap.has(word)) {
          wordToUrlMap.set(word, new Set());
        }
        wordToUrlMap.get(word).add(index); // Map word to URL index
      });
    });
  
    console.log("Word to URL Map:", wordToUrlMap);
  
    // Step 2: Use the index to group URLs
    for (let i = 0; i < urls.length; i++) {
      if (used.has(i)) continue;
  
      const currentGroup = new Set([i]);
      const keywords = extractValidWordsFromUrl(urls[i]);
  
      keywords.forEach((word) => {
        if (wordToUrlMap.has(word)) {
          const relatedUrls = wordToUrlMap.get(word);
          relatedUrls.forEach((urlIndex) => {
            if (urlIndex !== i && !used.has(urlIndex)) {
              currentGroup.add(urlIndex);
            }
          });
        }
      });
  
      // Filter groups where 3 or more common words are shared
      const finalGroup = Array.from(currentGroup).filter((urlIndex) => {
        const commonWords = new Set(
          [...extractValidWordsFromUrl(urls[i])].filter((word) =>
            extractValidWordsFromUrl(urls[urlIndex]).has(word)
          )
        );
        return commonWords.size >= 3;
      });
  
      // Mark all URLs in the group as used
      finalGroup.forEach((urlIndex) => used.add(urlIndex));
      groups.push(finalGroup.map((urlIndex) => urls[urlIndex]));
    }
  
    console.log("Optimized Grouped URLs:", groups);
    return groups;
  };
  

  const rankUrlGroups = (groups) => {
    return groups
      .map((group) => ({ group, count: group.length })) // Map to objects with count
      .sort((a, b) => b.count - a.count); // Sort by count in descending order
  };
  
  const renderCache = {
    groupedUrls: null, // Cache for grouped URLs
    rankedGroups: null, // Cache for ranked groups
    processedGroups: null, // Cache for processed groups
  };

  
// Function to check if a topic can be converted to a statement
const canBeConvertedToStatement = async (topic) => {
    console.log(`Checking if the topic can be converted to a statement: "${topic}"`);
    const prompt = `Can the following topic be converted into a relevant statement or question: "${topic}"? Respond with 'Yes' or 'No'.`;
  
    const apiKey = "AIzaSyB18rjganJojF2eAn5hzaRRz_Gy0E0VPA4";
    const response = await fetchHintsFromGemini(prompt, apiKey);
  
    const result = response.steps?.[0]?.toLowerCase() || "no"; // Default to 'No' if no response
    console.log(`Response for topic convertibility (${topic}):`, result);
  
    return result.includes("yes");
  };
  
  // Function to generate a relevant statement for the topic
  const generateStatementForTopic = async (topic) => {
    console.log(`Generating a statement for the topic: "${topic}"`);
    const prompt = `Convert the following topic into a concise and relevant statement or question: "${topic}"`;
  
    const apiKey = "AIzaSyB18rjganJojF2eAn5hzaRRz_Gy0E0VPA4";
    const response = await fetchHintsFromGemini(prompt, apiKey);
  
    const statement = response.steps?.[0] || "Unable to generate a statement.";
    console.log(`Generated statement for topic (${topic}):`, statement);
  
    return statement;
  };
  // Cache for extracted words to avoid redundant computation
const wordCache = new Map();


// Process URLs in batches
const processUrlsInBatches = async (urls, batchSize = 100000) => {
  const groups = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    console.log(`Processing batch ${i / batchSize + 1} of ${Math.ceil(urls.length / batchSize)}`);
    const batchGroups = groupUrlsBySharedWordsOptimized(batch);
    groups.push(...batchGroups);
  }
  return groups;
};
const renderGroupedTopics = async (urls, isBackground = false) => {
    console.log(isBackground ? "Starting background processing for grouped topics..." : "Rendering grouped topics...");
  
    if (renderCache.processedGroups) {
      console.log("Grouped topics already processed. Skipping computation.");
      if (!isBackground) {
        hideLoadingScreen(); // Hide loading screen and show content
        displayGroupedTopics(renderCache.processedGroups);
      }
      return;
    }
  
    if (!isBackground) {
      showLoadingScreen(); // Show loading screen during processing
    }
  
    try {
      // Step 1: Process URLs in batches
      const groupedUrls = await processUrlsInBatches(urls, 100000);
      renderCache.groupedUrls = groupedUrls;
  
      // Step 2: Rank groups
      const rankedGroups = rankUrlGroups(groupedUrls);
      renderCache.rankedGroups = rankedGroups;
  
      // Step 3: Process the top 10 groups
      const topGroups = rankedGroups.slice(0, 10);
      const processedGroups = await Promise.all(
        topGroups.map(async (group) => {
          const combinedWords = [...new Set(group.group.flatMap((url) => Array.from(extractValidWordsFromUrl(url))))].join(", ");
          const isConvertible = await canBeConvertedToStatement(combinedWords);
          if (isConvertible) {
            const statement = await generateStatementForTopic(combinedWords);
            return { statement, count: group.count };
          }
          return null;
        })
      );
  
      renderCache.processedGroups = processedGroups.filter(Boolean); // Cache the processed groups
      console.log("Grouped topics processing complete:", renderCache.processedGroups);
  
      if (!isBackground) {
        hideLoadingScreen(); // Hide loading screen after processing
        displayGroupedTopics(renderCache.processedGroups);
      }
    } catch (error) {
      console.error("Error while processing grouped topics:", error);
    } finally {
      if (!isBackground && !renderCache.processedGroups) {
        hideLoadingScreen(); // Ensure the loading screen is hidden even if processing fails
      }
    }
  };
  
  // Function to display grouped topics
  const displayGroupedTopics = (processedGroups) => {
    const topicsHeading = document.createElement("h2");
    topicsHeading.textContent = "Top Grouped Topics";
    topicsHeading.style.fontSize = "60px";
    topicsHeading.style.color = "white";
    topicsHeading.style.textAlign = "center";
    topicsHeading.style.marginBottom = "20px";
    historyContainer.appendChild(topicsHeading);
  
    const fragment = document.createDocumentFragment();
    processedGroups.forEach((item, index) => {
      const fontSize = 48 - index * 4;
  
      const topicElement = document.createElement("p");
      topicElement.textContent = `${item.statement} (${item.count} times)`;
      topicElement.style.fontSize = `${Math.max(fontSize, 12)}px`;
      topicElement.style.fontFamily = uniqueFonts[Math.floor(Math.random() * uniqueFonts.length)];
      topicElement.style.margin = "10px 0";
      topicElement.style.textAlign = "center";
  
      fragment.appendChild(topicElement);
    });
  
    historyContainer.appendChild(fragment);
    console.log("Grouped topics rendered.");
  };
  
  

const classifySearchesByTime = (urlsWithTimestamps) => {
    const timeCategories = {
      "Night Owl (10 PM - 4 AM)": 0,
      "Early Bird (4 AM - 10 AM)": 0,
      "Office Hoarder (10 AM - 5 PM)": 0,
      "Evening Hustler (5 PM - 10 PM)": 0,
    };
  
    urlsWithTimestamps.forEach(({ url, timestamp }) => {
      const date = new Date(timestamp);
      const hour = date.getHours();
  
      if (hour >= 22 || hour < 4) {
        timeCategories["Night Owl (10 PM - 4 AM)"]++;
      } else if (hour >= 4 && hour < 10) {
        timeCategories["Early Bird (4 AM - 10 AM)"]++;
      } else if (hour >= 10 && hour < 17) {
        timeCategories["Office Hoarder (10 AM - 5 PM)"]++;
      } else if (hour >= 17 && hour < 22) {
        timeCategories["Evening Hustler (5 PM - 10 PM)"]++;
      }
    });
  
    return timeCategories;
  };

  const renderTimeZoneClassification = (urlsWithTimestamps) => {
  
    // Step 1: Classify searches by time zones
    const timeCategories = classifySearchesByTime(urlsWithTimestamps);
  
    // Step 2: Render the heading
    const timeHeading = document.createElement("h2");
    timeHeading.textContent = "Searches by Time Zone";
    timeHeading.style.textAlign = "center";
    timeHeading.style.marginBottom = "20px";
    timeHeading.style.fontSize = "60px"; // Set font size to 60px
    timeHeading.style.color = "white"; // Set text color to white
    historyContainer.appendChild(timeHeading);
    

  
    // Step 5: Render the time zone classifications with random fonts and sizes
    const fragment = document.createDocumentFragment();
    Object.entries(timeCategories).forEach(([category, count], index) => {
      const fontSize = 32 - index * 4; // Adjust font size
      const randomFont = shuffledFonts[Math.floor(Math.random() * shuffledFonts.length)]; // Random font
  
      const categoryElement = document.createElement("p");
      categoryElement.textContent = `${category}: ${count} searches`;
      categoryElement.style.fontSize = `${Math.max(fontSize, 12)}px`; // Set font size
      categoryElement.style.fontFamily = uniqueFonts[Math.floor(Math.random() * uniqueFonts.length)];
      categoryElement.style.margin = "10px 0";
      categoryElement.style.textAlign = "center";
  
      fragment.appendChild(categoryElement);
    });
  
    historyContainer.appendChild(fragment);
    console.log("Time zone classification rendering complete.");
  };
  
      
      // Add topics to sections
    //   sections.push(() => renderTopTopics(results.map((item) => item.url)));
      
      
    const renderSection = (sectionIndex, sections) => {
      // Clear the container
      historyContainer.innerHTML = "";
  
      // Render the current section
      sections[sectionIndex]();
    };
  
    const addArrowButtons = (sections, currentSection, updateSection) => {
        const leftArrow = document.createElement("div");
        const rightArrow = document.createElement("div");
      
        // Left arrow
        leftArrow.textContent = "←";
        leftArrow.style.position = "absolute";
        leftArrow.style.left = "10px";
        leftArrow.style.top = "50%";
        leftArrow.style.transform = "translateY(-50%)";
        leftArrow.style.fontSize = "2rem";
        leftArrow.style.cursor = "pointer";
        leftArrow.style.userSelect = "none";
        leftArrow.style.display = currentSection > 0 ? "block" : "none";
        leftArrow.addEventListener("click", () => {
          if (currentSection > 0) {
            currentSection--;
            updateSection(currentSection);
          }
        });
      
        // Right arrow
        rightArrow.textContent = "→";
        rightArrow.style.position = "absolute";
        rightArrow.style.right = "10px";
        rightArrow.style.top = "50%";
        rightArrow.style.transform = "translateY(-50%)";
        rightArrow.style.fontSize = "2rem";
        rightArrow.style.cursor = "pointer";
        rightArrow.style.userSelect = "none";
        rightArrow.style.display = currentSection < sections.length - 1 ? "block" : "none";
        rightArrow.addEventListener("click", () => {
          if (currentSection < sections.length - 1) {
            currentSection++;
            updateSection(currentSection);
          }
        });
      
        document.body.appendChild(leftArrow);
        document.body.appendChild(rightArrow);
      
        return () => {
          // Update arrow visibility
          leftArrow.style.display = currentSection > 0 ? "block" : "none";
          rightArrow.style.display = currentSection < sections.length - 1 ? "block" : "none";
        };
      };
      
      const addKeyboardNavigation = (sections, currentSection, updateSection) => {
        document.addEventListener("keydown", (e) => {
          if (e.key === "ArrowLeft" && currentSection > 0) {
            currentSection--;
            updateSection(currentSection);
          } else if (e.key === "ArrowRight" && currentSection < sections.length - 1) {
            currentSection++;
            updateSection(currentSection);
          }
        });
      };
      
      const addMouseDragNavigation = (sections, currentSection, updateSection) => {
        let startX = 0;
      
        document.addEventListener("mousedown", (e) => {
          startX = e.clientX;
        });
      
        document.addEventListener("mouseup", (e) => {
          const endX = e.clientX;
          if (endX < startX - 50 && currentSection < sections.length - 1) {
            currentSection++;
            updateSection(currentSection);
          } else if (endX > startX + 50 && currentSection > 0) {
            currentSection--;
            updateSection(currentSection);
          }
        });
      };
      
    // After fetching results
chrome.history.search(
    { text: "", startTime: new Date(new Date().getFullYear(), 0, 1).getTime(), maxResults: 5000 },
    (results) => {
      // Group and count by domain
      const urlCountMap = results.reduce((acc, item) => {
        const domain = new URL(item.url).hostname;
        acc[domain] = acc[domain] || { count: 0 };
        acc[domain].count += 1;
        return acc;
      }, {});
  
      // Sort by count in descending order
      const sortedHistory = Object.entries(urlCountMap)
        .map(([domain, data]) => ({ domain, count: data.count }))
        .sort((a, b) => b.count - a.count);
  
      const top5History = sortedHistory.slice(0, 5);
      const uniqueSearches = sortedHistory.filter(
        (item) => !top20Websites.includes(item.domain)
      );
      const next5UniqueSearches = uniqueSearches.slice(0, 5);
  
      const searchesByDay = results.reduce((acc, item) => {
        const date = new Date(item.lastVisitTime).toDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
      const sortedDays = Object.entries(searchesByDay)
        .map(([day, count]) => ({ day, count }))
        .sort((a, b) => b.count - a.count);
      const top5Days = sortedDays.slice(0, 5);
  
      // Start processing grouped topics in the background
      renderGroupedTopics(results.map((item) => item.url), true); // Pass `true` to indicate background processing
  
      // Define the sections
      const sections = [
        () => renderTop5MostSearched(top5History),
        () => renderTop5UniqueSearches(next5UniqueSearches),
        () => renderTop5Days(top5Days),
        () => renderTimeZoneClassification(results.map((item) => ({ url: item.url, timestamp: item.lastVisitTime }))),
        () => {
          // Render grouped topics using cached data
          if (renderCache.processedGroups) {
            console.log("Re-rendering grouped topics from cache...");
            renderGroupedTopics([], false); // Pass `false` to indicate rendering cached data
          } else {
            console.log("Grouped topics not ready yet.");
          }
        },
      ];
  
      let currentSection = 0;
  
      // Initial render
      const updateSection = (index) => {
        renderSection(index, sections); // Render the current section
        updateArrows(); // Update arrow visibility
        applyRandomBackground(); // Change background
      };
  
      renderSection(currentSection, sections);
  
      // Add navigation features
      const updateArrows = addArrowButtons(sections, currentSection, updateSection);
      addKeyboardNavigation(sections, currentSection, updateSection);
      addMouseDragNavigation(sections, currentSection, updateSection);
    }
  );
  
  });
    