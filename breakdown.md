# 1. Real-Time Search with Debouncing

## Objective

Create a real-time search component with debouncing to optimize performance.

## Steps

Create a simple React app with an input field and a list to display search results.
Fetch data from a provided API endpoint (e.g., a list of users or products) whenever the user types in the input field.
Implement a debouncing mechanism using setTimeout to delay the API call until the user has stopped typing for 300ms.
Display the search results dynamically as the user types.
Style the input field and results list for a clean, user-friendly interface.

## Breakdown

state

- search
- userList
- loading

hooks

- const debouncedValue = DebouncedSearch(search)
  --- state for debouncedValue
  --- timeoutIdRef
  --- useEffect [text, delay = 500]
  ---- timeoutIdRef.current = setTimeout(() => { setDebouncedValue(text) }, delay)
  ---- cleanup return () => clearTimeout(timeoutIdRef.current)
  --- return debouncedValue

derived state

- filteredUserList --> userList.filter((user) => user.includes(debouncedValue))

effect

- start loading
- useFetch to get user data
- store the user data in userList
- end loading

handlers

- onInputChange --> set search

render

- loading
- <input {onInputChange} {search} />
- map through list of filteredUserList

# 2. Countdown Timer

## Objective

Build a countdown timer that counts down from a specified number of seconds and displays a message when the time is up.

## Steps

Create a React component with an input field for the user to enter the number of seconds for the countdown.
Display the countdown timer on the screen, updating every second using setInterval.
When the countdown reaches zero, clear the interval and display a "Time's up!" message.
Allow the user to start, pause, and reset the countdown timer.

## Breakdown

state

- duration --> this can be optimized to as a ref so we dont rerender the component on keypress
- timer
- isRunning
- isStarted
- finishedMessage

ref

- timerIntervalId.current

effect

- clean up effect
  -- return () => {clearInterval(timerIntervalId.current)}
- listen to finish timer
  --if (timer) return
  --isRunning = false
  --isStarted = false
  --finishedMessage == 'Time's up!'
  --timer = duration
  --clearInterval(timerIntervalId.current)

handlers

- onDurationChange
  -- duration = e.target.value

- onStart
  --isStarted = true
  --isRunning = true
  --finishedMessage == ''
  --timer = duration
  --setInterval(() => {
  --timer((prev) => prev - 1)
  }, 1000)

- onPause
  --isRunning = false
  --clearInterval(timerIntervalId.current)

- onReset
  --isRunning = false
  --isStarted = false
  --finishedMessage == ''
  --timer = duration

render

- <input {duration} {onDurationChange} >
- {timer}
- {!isRunning && <button>Start</button>}
- {isRunning && <button>Pause</button>}
- {!isRunning && <button disabled={!isStarted}>Reset</button>}
- {finishedMessage && finishedMessage}

# 3. Carousel Component

## Objective

Develop an image carousel that automatically transitions between images every few seconds.

## Steps

Create a React component that takes an array of image URLs as props.
Display the first image initially and automatically transition to the next image every 3 seconds using setInterval.
Include navigation buttons (next and previous) to manually switch between images.
Pause the automatic transition when the user hovers over the carousel and resume when the user stops hovering.
Ensure smooth transitions and a visually appealing layout for the carousel.

## Breakdown

props

- images

state

- currentImageIdx = 0

ref

- imageIntervalId
- imageCache

const startInterval = () => {
imageIntervalId.current = setInterval(() => {
currentImageIdx((prev) => {
if (prev === imagesUrl.length - 1) return 0
return prev + 1})
}, 3000)
}

effect

- startInterval()
- return () => {
  clearInterval(imageIntervalId.current)
  }

handlers

- onHoverEnter = () => {
  clearInterval(imageIntervalId.current)
  }
- onHoverLeave = () => {
  startInterval()
  }
- onPrev() {
  if (idx === 0) return

  currentImageIdx((prev) => prev - 1)

  clearInterval(imageIntervalId.current)
  startInterval()

}

- onNext() {
  if (idx === images.length) return

  currentImageIdx((prev) => prev + 1)

  clearInterval(imageIntervalId.current)
  startInterval()

}

render

- <CarouselImage image={images[currentImageIdx]} imageCache={imageCache}>
- button --> prevous --> disabled if idx === 0
- button --> next --> disabled if idx === images.length

CarouselImage component
props

- imageUrl
- imageCache

state
image

effect

- if (imageCache[imageUrl]) image = imageCache[imageUrl]
- else {
  const imageData = fetch(imageUrl)
  imageCache[imageUrl] = imageData
  image = imageData
  }
- add a clean for the fetch promise

render

- <img src={imageData}>

# 4. Notification System

## Objective

Implement a notification system that displays a new notification every 5 seconds and hides notifications after a few seconds.

## Steps

Create a React component that displays a list of notifications.
Use setInterval to add a new notification to the list every 5 seconds.
Each notification should automatically disappear after 3 seconds using setTimeout.
Allow users to manually dismiss notifications by clicking a close button on each notification.
Style the notifications to be visually distinct and easy to read.

## Breakdown

state
currentNotification = ''
showNotification = false

ref

- notificationList = []
- notificationListIdx = -1
- intervalIdRef
- timeoutIdRef

effect

- set interval effect []
  -- setInterval(() => {
  if (notificationListIdx.current === notificationList.current.length - 1) notificationListIdx.current = 0
  else notificationListIdx.current += 1
  currentNotification(notificationList[notificationListIdx.current])
  }, 5000)
  -- cleanup {
  clearInterval
  clearSetTimout
  }

- set timeout effect [currentNotification]
  -- showNotification = true
  -- setTimeout(() => {
  showNotification = false
  }, 3000)
  -- cleanup {
  clearSetTimout
  }

handlers

- onNotificationClose() {
  showNotification = false
  clearSetTimout
  }

render

- create a box that shows conditionall on {showNotification} with text inside for {currentNotification} and a X button that uses the {onNotificationClose()} handler

# 5. Whack-a-Mole Game

## Objective

Create a simple "Whack-a-Mole" game where moles appear and disappear at random intervals.

## Steps

Create a React component with a grid of clickable cells (e.g., 3x3 grid).
Use setInterval to randomly select a cell to display a mole every second.
The mole should disappear after 1 second or when the user clicks on it, whichever comes first.
Keep track of the user's score based on how many moles they successfully click.
Style the grid and moles to make the game visually appealing and fun to play.
These challenges are designed to test a candidate's ability to work with React.js and JavaScript timers (setTimeout and setInterval), as well as their skills in creating interactive and dynamic user interfaces.

## Breakdown

global

- grid [['', '',''], ['', '',''], ['', '','']]
- duration = 30

  state

- score = 0
- timer = duration
- isGameStarted = false
- randCol = -1
- randRow = -1

ref

- timerIntervalIdRef

effect

- didMount cleanup timerIntervalIdRef
- update
  -- if (timer) return
  -- timer = duration
  -- isGameStarted = false
  -- randCol = -1
  -- randRow = -1
  -- clearInterval

handlers

- onStart function
  -- score = 0
  -- isGameStarted = true
  -- start the interval
  --- setTimer function inside decrementing by 1 second
  --- setRandCol to a random number based on grid.length
  --- setRandRow to a random number based on grid[0].length

- onMoleClick
  -- randCol = -1
  -- randRow = -1
  -- score = (prev) => prev + 1

render

- display timer
- create board
  --set backgroundColor of cell that row === randRow and col === randCol
- if isGameStarted hide start button else show

# 6. Typing Speed Test

## Objective

Create a typing speed test component that measures how quickly the user can type a given sentence.

## Steps

Create a React component that displays a random sentence for the user to type.
Start a timer when the user begins typing (use setTimeout to simulate the passing of time).
Display the elapsed time and calculate the typing speed (words per minute) when the user finishes typing the sentence.
Display the results, including the typing speed and accuracy.
Allow the user to restart the test with a new random sentence.

## Breakdown

global

- randomSentence

state

- timer = 0
- deconstructedSentece = []
- sentenceIdx
- typingSpeed
- accuracy
- correctKeyPresses
- totalKeyPresses

ref

- intervalTimerRef

effect onMount

- setInterval inside
- deconstructedSentece = for each char add an object { char, isCorrect }
- eventCB()
  -- we need to check if the key is equal to the next letter in the string
  --- if sentence[sentenceIdx] === key
  ---- sentence[sentenceIdx].isCorrect = true
  ---- correctKeyPresses + 1
  --- else sentence[sentenceIdx].isCorrect = false
  --- totalKeyPresses + 1
  --- increment sentenceIdx + 1
- keydown eventListener
- cleanup
  -- clearInterval
  -- remove eventListener

effect update [timer]

- if timer then return
- if not timer calculateWordsPerMin
- if sentence finished calculateWordsPerMin
- clearInterval

handlers

- calculateWordsPerMin
  -- typingSpeed = ((totalKeyPresses ÷ 5) / timer) x 60;
  -- accuracy = correctKeyPresses / totalKeyPresses x 100

render

- timer
- map deconstructedSentece and put char in span and set color green for true and red for false
- Display the results, including the typing speed and accuracy.

# 7. Auto-Logout Feature

## Objective

Implement an auto-logout feature that logs the user out after a period of inactivity.

## Steps

Create a React component that simulates a user session.
Use setTimeout to track user inactivity (e.g., no mouse or keyboard activity for 5 minutes).
Display a warning message 1 minute before auto-logout, giving the user an option to stay logged in.
Log the user out and redirect them to a login page if they remain inactive.
Reset the inactivity timer on any user interaction.

## Breakdown

state
ref
effect
handlers
render

# 8. Image Lazy Loader

## Objective

Create an image lazy loader that loads images only when they come into view.

## Steps

Create a React component that displays a list of images.
Use setTimeout to delay the loading of images until they are about to come into the viewport.
Implement a function to check if an image is near the viewport and load it if it is.
Display a placeholder image or a loading spinner until the actual image is loaded.
Ensure smooth loading and transitions for a seamless user experience.

## Breakdown

state
ref
effect
handlers
render

# 9. Fade-In / Fade-Out Animation

## Objective

Implement a component that fades in and fades out text messages with a specified delay.

## Steps

Create a React component that takes an array of text messages as props.
Use setTimeout to display each message for a specified duration (e.g., 3 seconds) before fading it out and showing the next message.
Implement CSS transitions to smoothly fade in and fade out the text messages.
Loop through the messages continuously.
Style the component to make the transitions visually appealing.

## Breakdown

state
ref
effect
handlers
render

# 10. Popup Notification with Auto-Close

## Objective

Create a popup notification component that automatically closes after a few seconds.

## Steps

Create a React component for a popup notification.
Use setTimeout to automatically close the popup after a specified duration (e.g., 5 seconds).
Allow the user to manually close the popup by clicking a close button.
Display different types of notifications (e.g., success, error, info) with appropriate styles.
Ensure the popup is styled to grab the user's attention without being intrusive.

## Breakdown

state
ref
effect
handlers
render

# 11. Progress Bar

## Objective

Implement a progress bar that fills up over a specified period of time.

## Steps

Create a React component for a progress bar.
Use setTimeout to gradually update the width of the progress bar over a specified period (e.g., 10 seconds).
Display the percentage completion as the progress bar fills up.
Reset the progress bar and start over when it reaches 100%.
Style the progress bar for visual clarity and appeal.

## Breakdown

global

- duration = 10s

state

- timer = duration

derived

- percentage = (timer / duration) // 100

ref

- intervalIdref

effect

- didMount
  -- setIntervalX100
  --- if !timer clearInterval
  --- timer - 1
  -- cleanup
  --- clearInterval

handlers

- onReset ()
  -- timer = duration
  -- setIntervalX100
  --- if !timer clearInterval
  --- timer - 1

render

- create a box with a fix height and 100% width
- create a box inside the above box and set height to 100%, width === percentage%, and a backgroundColor
- display the remaining percentage
- if timer === 0 show reset button

# 12. Quiz Timer

## Objective

Develop a quiz component with a timer that limits the time allowed to answer each question.

## Steps

Create a React component that displays a quiz question and multiple-choice answers.
Use setTimeout to start a countdown timer for each question (e.g., 30 seconds).
Display the remaining time to the user.
Automatically move to the next question or display a timeout message if the user doesn't answer within the time limit.
Track the user's score and display the final result at the end of the quiz.

## Breakdown

global

- test = [{ question: '', choices: [], answer: ''}]
- duration = 30

state

- score = 0
- timer = duration
- questionIdx = 0
- isTestStarted = true
- timeRanOutMessage = false

derived

- currentQuestion = test[questionIdx]

ref

- intervalTimerId
- setTimeoutId
- radioButtonRef

effect

- didMount
  -- setIntervalX1000 = timer - 1
  -- clean
  --- clearInterval
  --- clearTimeout
- update next question deps[timer, questionIdx]
  -- if (timer) return
  -- timer = duration
  -- questionIdx += 1
  -- timeRanOutMessage = true
  -- setTimeoutx3000 = timeRanOutMessage = false
  -- if currentQuestion.answer === radioButtonRef.current.value --> score += 1
- update test end deps[timer, questionIdx]
  -- if (timer && questionIdx < test.length - 1) return
  -- isTestStarted = false
  -- clearInterval

handlers

- onNextClick ()
  -- clearInterval
  -- if currentQuestion.answer === radioButtonRef.current.value --> score += 1
  -- questionIdx += 1
  -- timer = duration
  -- setIntervalX1000 = timer - 1

render

- timer
- currentQuestion.question
- multiple choice radio buttons add on the radioButtonRef
- next button
- if timeRanOutMessage
  -- show "time ran out" message
- if timer ends and isTestStarted === false
  -- show test score
