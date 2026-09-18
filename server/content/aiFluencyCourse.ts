/**
 * AI Fluency for the Workplace
 *
 * Generated from the USAII course document of the same name. Every sentence,
 * question and template field below comes from that document. The correct
 * answers come from the confidential answer key and live here, in the backend,
 * so they are never sent to a learner: the server strips them before the course
 * is delivered and grades submitted answers against this copy.
 *
 * Do not hand-edit. Regenerate from the source document if the course changes.
 */
import type { Course } from '../../shared/types';

const COURSE = {
  "id": "c_ai_fluency",
  "title": "AI Fluency for the Workplace",
  "subtitle": "Ten applied learning sprints. Ten business days. One hour a day.",
  "description": "You are going to build one thing across ten days and keep it. It is called the Personal AI Productivity Playbook, and by the end it will hold your own use cases, your own tested prompts, your own workflows, and your own safeguards. The course is organized by The USAII AI Fluency Framework, which moves through three stages: FRAME, then RUN, then TRUST.",
  "credentialName": "USAII Certificate of Completion: AI Fluency for the Workplace",
  "durationLabel": "10 days · 1 hour a day",
  "level": "Everyone",
  "price": 25,
  "access": "invite",
  "status": "published",
  "accent": "blue",
  "passMark": 75,
  "grading": {
    "checks": 30,
    "activities": 40,
    "finalExam": 30
  },
  "modules": [
    {
      "id": "af-m-frame",
      "title": "FRAME · Before you touch AI",
      "summary": "Framing is the thinking you do before prompting. It decides whether AI belongs on this task at all, and if so, which task.",
      "lessons": [
        {
          "id": "af-d1",
          "title": "Day 1: What AI can and cannot do",
          "topic": "What AI can and cannot do",
          "estimatedMinutes": 60,
          "summary": "Today you build: AI capability checklist.",
          "blocks": [
            {
              "id": "b1",
              "type": "text",
              "tone": "info",
              "text": "FRAME · Step 1: Decide if it is an AI task.",
              "label": "Framework step"
            },
            {
              "id": "b2",
              "type": "text",
              "tone": "info",
              "text": "You may not submit artifacts containing confidential, proprietary, regulated, or personally identifiable information unless you have authorization and the course environment explicitly supports it.",
              "label": "Data-safety rule"
            },
            {
              "id": "b3",
              "type": "heading",
              "level": 2,
              "text": "Concept · 10 minutes"
            },
            {
              "id": "b4",
              "type": "paragraph",
              "text": "Most people meet AI by asking it to do something and then reacting to whatever comes back. That is a slow way to learn where the tool actually helps. A faster way is to decide, before you type anything, whether the task in front of you is one that AI does well. That single decision saves more time than any clever prompt."
            },
            {
              "id": "b5",
              "type": "paragraph",
              "text": "AI language tools are strong at a specific set of jobs. They draft text. They summarize long material. They rewrite something in a different tone. They explain an idea in plainer words. They suggest options when you are stuck. What these jobs share is that they work with language and they tolerate a good first draft that you will review."
            },
            {
              "id": "b6",
              "type": "paragraph",
              "text": "The same tools are weak at a different set of jobs. They invent facts when they do not know an answer. They cannot tell you what happened inside your company last week. They are unreliable with exact math and precise counts. They do not know anything that was private or that happened after their training. When a task depends on those things, the tool will still answer, and its answer will sound confident, and it may be wrong. Knowing the weak set is what keeps you from trusting the tool where it should not be trusted."
            },
            {
              "id": "b7",
              "type": "heading",
              "level": 2,
              "text": "Worked example on Dana · 10 minutes"
            },
            {
              "id": "b8",
              "type": "paragraph",
              "text": "Read through this example before you build your own. It follows Dana, an operations manager at a mid-size logistics company, doing today's task on a real case."
            },
            {
              "id": "b9",
              "type": "paragraph",
              "text": "Walk through a real morning with Dana, an operations manager at a mid-size logistics company. She has four tasks in front of her, and the point is to sort them before she reaches for AI."
            },
            {
              "id": "b10",
              "type": "paragraph",
              "text": "Her tasks: draft a delay notice to a client, confirm the exact fuel surcharge on an invoice, summarize a long carrier contract, and decide which of two warehouses is closer to a new customer."
            },
            {
              "id": "b11",
              "type": "paragraph",
              "text": "Here is what happens if she treats all four as the same kind of job and asks AI to handle each one at face value. The delay notice comes back usable, because drafting a short professional message is squarely a language job. The fuel surcharge comes back as a confident number, and Dana has no way to trust it, because the tool never saw her invoice. The contract summary is helpful. The warehouse answer is a guess, because the tool does not know her sites or the real distances."
            },
            {
              "id": "b12",
              "type": "paragraph",
              "text": "Look at why two of the four went wrong. They depended on facts that live only in Dana's own records and on exact figures. The tool filled those gaps with guesses that sounded certain."
            },
            {
              "id": "b13",
              "type": "paragraph",
              "text": "Now watch Dana sort first. Draft the delay notice: yes, a language job. Summarize the contract: yes, a language job. Confirm the surcharge: no, that is a lookup in her own system. Pick the closer warehouse: no, that needs real distances she can check on a map. She uses AI for the two language jobs and does the two fact jobs herself."
            },
            {
              "id": "b14",
              "type": "paragraph",
              "text": "The lesson to carry into your own build: the tasks that landed in the \"AI helps\" column were the ones that work with language and tolerate a first draft. The two that did not needed private facts and exact figures, and no amount of clever prompting changes that."
            },
            {
              "id": "b15",
              "type": "heading",
              "level": 2,
              "text": "Guided build on your own task · 35 minutes"
            },
            {
              "id": "b16",
              "type": "paragraph",
              "text": "Follow these steps on a real task from your own work. You should be able to work through them without stopping to ask a question."
            },
            {
              "id": "b17",
              "type": "list",
              "ordered": true,
              "items": [
                "List five to eight tasks you actually did at work in the last week. Write them plainly, one line each.",
                "Next to each task, write what a good result would depend on: general language, or facts only your records hold, or exact numbers.",
                "Mark each task \"AI helps\" or \"do it myself\" based on that dependency.",
                "For every \"AI helps\" task, write one word for the job type: draft, summarize, rewrite, explain, or brainstorm.",
                "For every \"do it myself\" task, write the one reason in a few words, such as \"needs private data\" or \"needs exact figures.\"",
                "Look at your list. Circle the one \"AI helps\" task you will actually use this week.",
                "Save the sorted list into your template below. This is your first playbook page."
              ]
            }
          ],
          "check": [
            {
              "id": "q18",
              "question": "Which of these tasks is the best fit for a general AI language tool?",
              "options": [
                "Confirming an exact invoice total from your finance system",
                "Reporting what was decided in a private meeting last week",
                "Drafting a first version of a routine client message",
                "Calculating a precise figure you will file"
              ],
              "correctIndex": 2,
              "rationale": "Drafting language is a core strength. The others need private facts or exact figures the tool cannot supply."
            },
            {
              "id": "q19",
              "question": "An AI tool answers a factual question with full confidence. What is the safe assumption?",
              "options": [
                "Confidence does not tell you whether it is true",
                "A confident answer is almost always right",
                "It checked a live source first",
                "The specific numbers mean it verified"
              ],
              "correctIndex": 0,
              "rationale": "AI sounds confident whether or not it is correct. Confidence is not evidence."
            },
            {
              "id": "q20",
              "question": "A task depends on data that exists only in your company records. What does that tell you?",
              "options": [
                "AI will refuse the task",
                "AI can retrieve it if you ask clearly",
                "AI will say it does not know",
                "That part is yours to do; AI cannot supply it"
              ],
              "correctIndex": 3,
              "rationale": "The tool has no access to your private records, so it may guess. That part stays with you."
            }
          ],
          "checkSettings": {
            "mode": "practice",
            "timeLimitMin": 0,
            "attemptsAllowed": 0
          },
          "activity": {
            "title": "My AI Capability Checklist",
            "instructions": [
              "List five to eight tasks you actually did at work in the last week. Write them plainly, one line each.",
              "Next to each task, write what a good result would depend on: general language, or facts only your records hold, or exact numbers.",
              "Mark each task \\\"AI helps\\\" or \\\"do it myself\\\" based on that dependency.",
              "For every \\\"AI helps\\\" task, write one word for the job type: draft, summarize, rewrite, explain, or brainstorm.",
              "For every \\\"do it myself\\\" task, write the one reason in a few words, such as \\\"needs private data\\\" or \\\"needs exact figures.\\\"",
              "Look at your list. Circle the one \\\"AI helps\\\" task you will actually use this week.",
              "Save the sorted list into your template below. This is your first playbook page."
            ],
            "fields": [
              {
                "id": "af-d1-f1",
                "label": "Task 1",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d1-f2",
                "label": "Depends on",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d1-f3",
                "label": "AI helps / Do myself",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d1-f4",
                "label": "Job type or reason",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d1-f5",
                "label": "Task 2",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d1-f6",
                "label": "Task 3",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d1-f7",
                "label": "Task 4",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d1-f8",
                "label": "Task 5",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d1-f9",
                "label": "The one AI-helps task I will use this week",
                "multiline": true,
                "placeholder": ""
              }
            ],
            "allowFile": true
          }
        },
        {
          "id": "af-d2",
          "title": "Day 2: Common workplace AI use cases",
          "topic": "Common workplace AI use cases",
          "estimatedMinutes": 60,
          "summary": "Today you build: Personal use-case list.",
          "blocks": [
            {
              "id": "b21",
              "type": "text",
              "tone": "info",
              "text": "FRAME · Step 2: Pick the use case.",
              "label": "Framework step"
            },
            {
              "id": "b22",
              "type": "heading",
              "level": 2,
              "text": "Concept · 10 minutes"
            },
            {
              "id": "b23",
              "type": "paragraph",
              "text": "Yesterday you sorted tasks into what AI helps with and what it does not. Today you turn the \"AI helps\" side into a short list of use cases you will actually return to. A use case is a specific job you do often enough that getting AI to help with it pays off more than once."
            },
            {
              "id": "b24",
              "type": "paragraph",
              "text": "The value is in the repeat. A one-time task is rarely worth the effort of working out how to prompt for it. A task you do every week is different. If you spend twenty minutes getting AI to help with your weekly status update, and it saves you fifteen minutes every week after that, the math works in a fortnight and keeps paying out."
            },
            {
              "id": "b25",
              "type": "paragraph",
              "text": "Good workplace use cases cluster in a few places. Writing that follows a pattern, such as updates, replies, and short notices. Summarizing that you do repeatedly, such as long threads or documents. Preparation work, such as first-draft plans, checklists, and outlines. The test for a strong personal use case is simple: you do it often, it works with language, and a solid first draft would save you real time."
            },
            {
              "id": "b26",
              "type": "heading",
              "level": 2,
              "text": "Worked example on Dana · 10 minutes"
            },
            {
              "id": "b27",
              "type": "paragraph",
              "text": "Read through this example before you build your own. It follows Dana, an operations manager at a mid-size logistics company, doing today's task on a real case."
            },
            {
              "id": "b28",
              "type": "paragraph",
              "text": "Follow Dana as she turns her sorted list from Day 1 into a short list of use cases she will actually return to. She is looking for tasks she does most weeks, not the one-offs."
            },
            {
              "id": "b29",
              "type": "paragraph",
              "text": "Her first attempt is too broad. She writes down \"emails.\" That does not help her, because every email is different and she cannot build a repeatable habit around a category that wide."
            },
            {
              "id": "b30",
              "type": "paragraph",
              "text": "See the problem: \"emails\" names a category, not a use case. It does not say what the AI should produce or how often the job comes up."
            },
            {
              "id": "b31",
              "type": "paragraph",
              "text": "Watch her narrow it. She rewrites the list as three specific, recurring jobs: the Monday operations summary she sends her director, delay notices to clients, and first-draft agendas for her Thursday team meeting. Each one is specific, each happens on a schedule, and each is a language job."
            },
            {
              "id": "b32",
              "type": "paragraph",
              "text": "Then she adds a rough frequency to each: the Monday summary weekly, delay notices a few times a week, agendas weekly. The frequency tells her which use case is worth building first."
            },
            {
              "id": "b33",
              "type": "paragraph",
              "text": "The lesson for your own build: narrow, recurring items are the ones worth building on. \"Emails\" would never have given you a place to start. A named job that comes back every week will."
            },
            {
              "id": "b34",
              "type": "heading",
              "level": 2,
              "text": "Guided build on your own task · 35 minutes"
            },
            {
              "id": "b35",
              "type": "paragraph",
              "text": "Follow these steps on a real task from your own work. You should be able to work through them without stopping to ask a question."
            },
            {
              "id": "b36",
              "type": "list",
              "ordered": true,
              "items": [
                "Open your capability checklist from Day 1 and look only at the \"AI helps\" tasks.",
                "Cross out anything that only happens once. You want tasks that come back.",
                "For each remaining task, rewrite it as a specific job. Name what gets produced, such as \"weekly status update to my manager,\" not just \"writing.\"",
                "Next to each, write how often it happens: daily, weekly, or a few times a month.",
                "Add one more recurring task that did not make the Day 1 list. Pick one you know eats your time.",
                "Rank the list by a simple rule: most frequent and most annoying goes to the top.",
                "Save the ranked list into your template. The top item is the use case you will build around for the rest of this course."
              ]
            }
          ],
          "check": [
            {
              "id": "q37",
              "question": "What makes a strong personal use case for AI?",
              "options": [
                "A one-time task that is complex",
                "Any task involving a computer",
                "A specific task you do often where a good draft saves time",
                "A task you rarely do but dislike"
              ],
              "correctIndex": 1,
              "rationale": "Value comes from the repeat. Specific and recurring, working with language, is the test."
            },
            {
              "id": "q38",
              "question": "Why is \"emails\" a weak use case to build around?",
              "options": [
                "It names a category, not a specific recurring job",
                "Email is not a workplace task",
                "AI cannot write email",
                "It happens too often to be useful"
              ],
              "correctIndex": 3,
              "rationale": "\"Emails\" is too broad to build a repeatable habit around. A named, recurring email job is not."
            },
            {
              "id": "q39",
              "question": "You have two candidate use cases. Which should you build first?",
              "options": [
                "The rarest one",
                "The one that needs the least language",
                "Whichever is newest",
                "The most frequent and most time-consuming one"
              ],
              "correctIndex": 0,
              "rationale": "Frequent and costly tasks return the most value once you build a workflow for them."
            }
          ],
          "checkSettings": {
            "mode": "practice",
            "timeLimitMin": 0,
            "attemptsAllowed": 0
          },
          "activity": {
            "title": "My Personal Use-Case List",
            "instructions": [
              "Open your capability checklist from Day 1 and look only at the \\\"AI helps\\\" tasks.",
              "Cross out anything that only happens once. You want tasks that come back.",
              "For each remaining task, rewrite it as a specific job. Name what gets produced, such as \\\"weekly status update to my manager,\\\" not just \\\"writing.\\\"",
              "Next to each, write how often it happens: daily, weekly, or a few times a month.",
              "Add one more recurring task that did not make the Day 1 list. Pick one you know eats your time.",
              "Rank the list by a simple rule: most frequent and most annoying goes to the top.",
              "Save the ranked list into your template. The top item is the use case you will build around for the rest of this course."
            ],
            "fields": [
              {
                "id": "af-d2-f1",
                "label": "Use case (specific, recurring) How often Rank",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d2-f2",
                "label": "MY TOP USE CASE (I will build on this all course)",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d2-f3",
                "label": "Why this one",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d2-f4",
                "label": "What a good result would save me each time",
                "multiline": true,
                "placeholder": ""
              }
            ],
            "allowFile": true
          }
        }
      ]
    },
    {
      "id": "af-m-run",
      "title": "RUN · Do the work",
      "summary": "Running is putting AI to work. You prompt it well, then use it for the two job families it handles most reliably.",
      "lessons": [
        {
          "id": "af-d3",
          "title": "Day 3: Writing useful prompts",
          "topic": "Writing useful prompts",
          "estimatedMinutes": 60,
          "summary": "Today you build: First prompt draft.",
          "blocks": [
            {
              "id": "b40",
              "type": "text",
              "tone": "info",
              "text": "RUN · Step 1: Prompt it well. Task, role, constraints, format.",
              "label": "Framework step"
            },
            {
              "id": "b41",
              "type": "heading",
              "level": 2,
              "text": "Concept · 10 minutes"
            },
            {
              "id": "b42",
              "type": "paragraph",
              "text": "A prompt is the instruction you give an AI tool. A vague instruction gets a vague result. A useful prompt carries four things. It names the task, so the tool knows what you want done. It sets a role, so the tool answers from the right point of view. It states constraints, the limits and requirements the answer must respect. It specifies a format, so the answer comes back in a shape you can use."
            },
            {
              "id": "b43",
              "type": "paragraph",
              "text": "When any of the four is missing, the tool guesses, and its guess is usually generic. Ask for \"a shipment update\" and you get something that could belong to any company. Add the role, the limits, and the shape, and the same tool produces something you can send."
            },
            {
              "id": "b44",
              "type": "paragraph",
              "text": "Writing a useful prompt is the habit of supplying all four on purpose. It is not about clever wording or secret phrases. It is about telling the tool the four things it needs every time, so it stops filling the gaps with guesses."
            },
            {
              "id": "b45",
              "type": "heading",
              "level": 2,
              "text": "Worked example on Dana · 10 minutes"
            },
            {
              "id": "b46",
              "type": "paragraph",
              "text": "Read through this example before you build your own. It follows Dana, an operations manager at a mid-size logistics company, doing today's task on a real case."
            },
            {
              "id": "b47",
              "type": "paragraph",
              "text": "Watch Dana write a status update for a delayed shipment, and watch the prompt improve across three passes."
            },
            {
              "id": "b48",
              "type": "paragraph",
              "text": "First pass, she types: \"Write a shipment update.\" The result is generic. It could belong to any company, because the tool has nothing to work with."
            },
            {
              "id": "b49",
              "type": "paragraph",
              "text": "See what is missing: no role, no constraints, no format. The tool does not know who is writing, to whom, or in what shape the answer should come back."
            },
            {
              "id": "b50",
              "type": "paragraph",
              "text": "Second pass, she gives it all four elements: \"You are an operations manager. Write a shipment delay update for a key client. Keep it under 120 words, professional, and do not promise a delivery date we have not confirmed. Format it as a short email with a subject line.\""
            },
            {
              "id": "b51",
              "type": "paragraph",
              "text": "The result is usable. It has a subject line, it holds the word limit, it avoids the unconfirmed promise, and it reads in Dana's voice."
            },
            {
              "id": "b52",
              "type": "paragraph",
              "text": "Look at what each added phrase supplied. \"You are an operations manager\" is the role. \"Shipment delay update for a key client\" is the task. \"Under 120 words, professional, do not promise a date\" are the constraints. \"Short email with a subject line\" is the format. That is the habit to copy: supply all four on purpose."
            },
            {
              "id": "b53",
              "type": "heading",
              "level": 2,
              "text": "Guided build on your own task · 35 minutes"
            },
            {
              "id": "b54",
              "type": "paragraph",
              "text": "Follow these steps on a real task from your own work. You should be able to work through them without stopping to ask a question."
            },
            {
              "id": "b55",
              "type": "list",
              "ordered": true,
              "items": [
                "Open your use-case list from Day 2 and pick your top task.",
                "Write a first prompt for it in one plain sentence.",
                "Add a role. State who the AI should answer as.",
                "Add your constraints. State the limits the answer must respect, such as length, tone, or things to avoid.",
                "Add a format. State the shape you want the answer in.",
                "Run the prompt. Read the result.",
                "Fix one thing that is still off and run it again.",
                "Save the version that works into your template below."
              ]
            }
          ],
          "check": [
            {
              "id": "q56",
              "question": "What are the four elements of a useful prompt?",
              "options": [
                "Who, what, when, where",
                "Length, tone, speed, topic",
                "Task, role, constraints, format",
                "Question, answer, edit, send"
              ],
              "correctIndex": 3,
              "rationale": "Task, role, constraints, and format. Supplying all four on purpose is the habit."
            },
            {
              "id": "q57",
              "question": "In \"You are an operations manager, keep it under 120 words,\" which element is the word limit?",
              "options": [
                "A constraint",
                "The role",
                "The task",
                "The format"
              ],
              "correctIndex": 2,
              "rationale": "A limit the answer must respect is a constraint."
            },
            {
              "id": "q58",
              "question": "What usually happens when a prompt is missing one of the four elements?",
              "options": [
                "The tool refuses",
                "The tool asks you for it",
                "The tool produces a shorter answer",
                "The tool guesses, and the guess is generic"
              ],
              "correctIndex": 1,
              "rationale": "A missing element gets filled by a guess, which is why vague prompts read generic."
            }
          ],
          "checkSettings": {
            "mode": "practice",
            "timeLimitMin": 0,
            "attemptsAllowed": 0
          },
          "activity": {
            "title": "My Useful Prompt",
            "instructions": [
              "Open your use-case list from Day 2 and pick your top task.",
              "Write a first prompt for it in one plain sentence.",
              "Add a role. State who the AI should answer as.",
              "Add your constraints. State the limits the answer must respect, such as length, tone, or things to avoid.",
              "Add a format. State the shape you want the answer in.",
              "Run the prompt. Read the result.",
              "Fix one thing that is still off and run it again.",
              "Save the version that works into your template below."
            ],
            "fields": [
              {
                "id": "af-d3-f1",
                "label": "Task",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d3-f2",
                "label": "Role",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d3-f3",
                "label": "Constraints",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d3-f4",
                "label": "Format",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d3-f5",
                "label": "Tested prompt (the version that worked)",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d3-f6",
                "label": "What I changed between the first and final version",
                "multiline": true,
                "placeholder": ""
              }
            ],
            "allowFile": true
          }
        },
        {
          "id": "af-d4",
          "title": "Day 4: Using AI for writing and summarization",
          "topic": "Using AI for writing and summarization",
          "estimatedMinutes": 60,
          "summary": "Today you build: Writing workflow.",
          "blocks": [
            {
              "id": "b59",
              "type": "text",
              "tone": "info",
              "text": "RUN · Step 2: Write with it.",
              "label": "Framework step"
            },
            {
              "id": "b60",
              "type": "heading",
              "level": 2,
              "text": "Concept · 10 minutes"
            },
            {
              "id": "b61",
              "type": "paragraph",
              "text": "Yesterday you built one good prompt. Today you turn prompting into a small workflow you can repeat for any writing or summarizing job. A workflow is just the fixed set of steps you run every time, so you are not reinventing the approach on each task."
            },
            {
              "id": "b62",
              "type": "paragraph",
              "text": "Writing and summarizing are the two jobs AI handles most reliably, and they run in opposite directions. Writing goes from a few points to finished prose. Summarizing goes from long material down to the few points that matter. Both improve when you tell the tool what the output is for and who will read it."
            },
            {
              "id": "b63",
              "type": "paragraph",
              "text": "The workflow that works for both has three moves. You give the tool the raw material and the four prompt elements from Day 3. You read the draft against what you actually needed. You send the tool one correction, the single most important fix, and let it revise. Most of the value comes from that one correction. A good first draft plus one sharp fix beats ten vague retries."
            },
            {
              "id": "b64",
              "type": "heading",
              "level": 2,
              "text": "Worked example on Dana · 10 minutes"
            },
            {
              "id": "b65",
              "type": "paragraph",
              "text": "Read through this example before you build your own. It follows Dana, an operations manager at a mid-size logistics company, doing today's task on a real case."
            },
            {
              "id": "b66",
              "type": "paragraph",
              "text": "Follow Dana as she turns prompting into a small repeatable workflow. She has a forty-message email thread about a late delivery and needs a five-line summary for her director."
            },
            {
              "id": "b67",
              "type": "paragraph",
              "text": "First pass, she pastes the thread and asks: \"summarize this.\" The result is accurate but long, and it buries the one thing her director cares about, which is whether the client is still at risk."
            },
            {
              "id": "b68",
              "type": "paragraph",
              "text": "See the weakness: she never told the tool who the summary is for or what decision it supports."
            },
            {
              "id": "b69",
              "type": "paragraph",
              "text": "Second pass, she gives it direction: \"You are briefing an operations director. Summarize this thread in five lines. Lead with whether the client relationship is at risk, then the cause, then the current status. Plain language, no jargon.\" Now the summary opens with the risk and fits five lines."
            },
            {
              "id": "b70",
              "type": "paragraph",
              "text": "Then she makes one correction. She notices it left out the recovery date the team agreed on, so she replies: \"add the committed recovery date in line two.\" The tool revises, and the summary is done."
            },
            {
              "id": "b71",
              "type": "paragraph",
              "text": "Notice the three moves you can reuse on any writing or summarizing job: give the material plus the four prompt elements, read the draft against what you actually needed, then send one sharp correction. Most of the value came from that single fix, not from many vague retries."
            },
            {
              "id": "b72",
              "type": "heading",
              "level": 2,
              "text": "Guided build on your own task · 35 minutes"
            },
            {
              "id": "b73",
              "type": "paragraph",
              "text": "Follow these steps on a real task from your own work. You should be able to work through them without stopping to ask a question."
            },
            {
              "id": "b74",
              "type": "list",
              "ordered": true,
              "items": [
                "Pick a writing or summarizing task from your use-case list.",
                "Gather the raw material the task needs: the notes to write from, or the long text to summarize.",
                "Write your prompt using the four elements from Day 3, and add who the output is for.",
                "Run it and read the draft against what you actually needed, not against whether it \"looks fine.\"",
                "Identify the single most important thing that is off.",
                "Send the tool that one correction and let it revise.",
                "Write down the steps you just ran, in order, as your repeatable workflow.",
                "Save the workflow and the prompt into your template below."
              ]
            }
          ],
          "check": [
            {
              "id": "q75",
              "question": "On the writing workflow, what should you read the first draft against?",
              "options": [
                "Whether it looks polished",
                "How long it took",
                "What you actually needed it to do",
                "Whether it is longer than last time"
              ],
              "correctIndex": 0,
              "rationale": "Read against the real need, not against surface appearance."
            },
            {
              "id": "q76",
              "question": "Where does most of the value come from when improving an AI draft?",
              "options": [
                "One sharp, well-aimed correction",
                "Many vague retries",
                "Making the prompt longer each time",
                "Starting over from scratch"
              ],
              "correctIndex": 1,
              "rationale": "A good first draft plus one sharp fix beats repeated vague retries."
            },
            {
              "id": "q77",
              "question": "When you ask AI to summarize, what most improves the result?",
              "options": [
                "Asking for maximum length",
                "Removing all context",
                "Running it several times",
                "Telling it who the summary is for and what it supports"
              ],
              "correctIndex": 2,
              "rationale": "Naming the reader and the decision the summary supports focuses the output."
            }
          ],
          "checkSettings": {
            "mode": "practice",
            "timeLimitMin": 0,
            "attemptsAllowed": 0
          },
          "activity": {
            "title": "My Writing Workflow",
            "instructions": [
              "Pick a writing or summarizing task from your use-case list.",
              "Gather the raw material the task needs: the notes to write from, or the long text to summarize.",
              "Write your prompt using the four elements from Day 3, and add who the output is for.",
              "Run it and read the draft against what you actually needed, not against whether it \\\"looks fine.\\\"",
              "Identify the single most important thing that is off.",
              "Send the tool that one correction and let it revise.",
              "Write down the steps you just ran, in order, as your repeatable workflow.",
              "Save the workflow and the prompt into your template below."
            ],
            "fields": [
              {
                "id": "af-d4-f1",
                "label": "This workflow is for: (writing / summarizing)",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d4-f2",
                "label": "The task it handles",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d4-f3",
                "label": "My repeatable steps",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d4-f4",
                "label": "The output is for (who reads it)",
                "multiline": true,
                "placeholder": ""
              }
            ],
            "allowFile": true
          }
        },
        {
          "id": "af-d5",
          "title": "Day 5: Using AI for planning and analysis",
          "topic": "Using AI for planning and analysis",
          "estimatedMinutes": 60,
          "summary": "Today you build: Planning workflow.",
          "blocks": [
            {
              "id": "b78",
              "type": "text",
              "tone": "info",
              "text": "RUN · Step 3: Plan with it.",
              "label": "Framework step"
            },
            {
              "id": "b79",
              "type": "heading",
              "level": 2,
              "text": "Concept · 10 minutes"
            },
            {
              "id": "b80",
              "type": "paragraph",
              "text": "Writing and summarizing work with words. Planning and analysis work with structure: steps, options, risks, and trade-offs. AI can help here too, but the caution changes. When AI writes, a weak result reads awkwardly and you notice. When AI plans or analyzes, a weak result can look organized and still be wrong underneath."
            },
            {
              "id": "b81",
              "type": "paragraph",
              "text": "That is the risk to hold onto today. A tidy plan with a missing step still looks like a plan. A confident comparison built on a number the tool invented still looks like analysis. The structure hides the gap. So planning work needs a heavier review than writing work does."
            },
            {
              "id": "b82",
              "type": "paragraph",
              "text": "AI is genuinely useful for the first draft of a plan. Ask it to break a goal into steps, to list what could go wrong, to lay out options side by side, or to suggest an order of operations. Then you do the part it cannot: you check the steps against what you know, you add what it missed, and you fix any figure it guessed. The tool gives you a starting structure. Your judgment makes it correct."
            },
            {
              "id": "b83",
              "type": "heading",
              "level": 2,
              "text": "Worked example on Dana · 10 minutes"
            },
            {
              "id": "b84",
              "type": "paragraph",
              "text": "Read through this example before you build your own. It follows Dana, an operations manager at a mid-size logistics company, doing today's task on a real case."
            },
            {
              "id": "b85",
              "type": "paragraph",
              "text": "Watch Dana use AI for a first-draft plan, and watch where the caution changes. She has to plan the onboarding of a new carrier."
            },
            {
              "id": "b86",
              "type": "paragraph",
              "text": "First pass, she asks: \"Make a plan to onboard a new carrier.\" The result is a clean, sensible-looking list of steps. It reads well, which is exactly what makes it risky."
            },
            {
              "id": "b87",
              "type": "paragraph",
              "text": "Here is the trap. Because the plan looks complete, it is tempting to trust it. When Dana reads it against what she knows, she finds two problems. It skips the insurance-verification step, which is mandatory at her company. And it assumes a two-week setup that her systems team has never hit."
            },
            {
              "id": "b88",
              "type": "paragraph",
              "text": "Watch her fix it rather than start over. She keeps the draft as a starting structure. She adds the insurance-verification step in the right place, changes the timeline to match reality, and asks the tool to \"add a risk for each step that could delay go-live.\" Now the plan reflects her operation instead of a generic one."
            },
            {
              "id": "b89",
              "type": "paragraph",
              "text": "The lesson for your own build: the first draft was useful precisely because Dana did not trust it. A tidy plan can hide a missing step. Writing errors look awkward and you catch them. A structural gap looks organized and slips past, so planning work needs a heavier review than writing work."
            },
            {
              "id": "b90",
              "type": "heading",
              "level": 2,
              "text": "Guided build on your own task · 35 minutes"
            },
            {
              "id": "b91",
              "type": "paragraph",
              "text": "Follow these steps on a real task from your own work. You should be able to work through them without stopping to ask a question."
            },
            {
              "id": "b92",
              "type": "list",
              "ordered": true,
              "items": [
                "Pick a planning or analysis task from your use-case list, such as a project plan, a comparison, or a risk list.",
                "Prompt the tool to produce a first-draft structure: steps, options, or risks, using the four elements from Day 3.",
                "Read the result once for how organized it looks, then set that aside.",
                "Read it again against what you actually know. Find what is missing, wrong, or assumed.",
                "Add the missing pieces yourself. Do not ask the tool to guess at facts it does not have.",
                "Fix or flag every number or date you cannot verify.",
                "Ask the tool for one improvement to the corrected version, such as a risk per step.",
                "Save the workflow and the checks you ran into your template below."
              ]
            }
          ],
          "check": [
            {
              "id": "q93",
              "question": "Why does a plan from AI need heavier review than a piece of writing?",
              "options": [
                "Plans are always longer",
                "AI cannot make plans",
                "A tidy structure can hide a missing step or an invented figure",
                "Writing never has errors"
              ],
              "correctIndex": 1,
              "rationale": "Structure makes a flawed plan still look organized, so the gap hides."
            },
            {
              "id": "q94",
              "question": "AI gives you a clean project plan. What is the right next move?",
              "options": [
                "Check it against what you know and add what it missed",
                "Send it as is; it looks complete",
                "Assume the timeline is correct",
                "Delete any step you do not recognize"
              ],
              "correctIndex": 0,
              "rationale": "The draft is a starting structure. Your knowledge makes it correct."
            },
            {
              "id": "q95",
              "question": "The AI plan includes a specific setup timeline. What should you do with it?",
              "options": [
                "Trust it, since it is specific",
                "Ignore all timelines",
                "Ask AI to make it shorter",
                "Verify it against reality before relying on it"
              ],
              "correctIndex": 3,
              "rationale": "Figures and dates the tool cannot know must be verified against a real source."
            }
          ],
          "checkSettings": {
            "mode": "practice",
            "timeLimitMin": 0,
            "attemptsAllowed": 0
          },
          "activity": {
            "title": "My Planning Workflow",
            "instructions": [
              "Pick a planning or analysis task from your use-case list, such as a project plan, a comparison, or a risk list.",
              "Prompt the tool to produce a first-draft structure: steps, options, or risks, using the four elements from Day 3.",
              "Read the result once for how organized it looks, then set that aside.",
              "Read it again against what you actually know. Find what is missing, wrong, or assumed.",
              "Add the missing pieces yourself. Do not ask the tool to guess at facts it does not have.",
              "Fix or flag every number or date you cannot verify.",
              "Ask the tool for one improvement to the corrected version, such as a risk per step.",
              "Save the workflow and the checks you ran into your template below."
            ],
            "fields": [
              {
                "id": "af-d5-f1",
                "label": "This workflow is for: (planning / analysis)",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d5-f2",
                "label": "The task it handles",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d5-f3",
                "label": "My repeatable steps",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d5-f4",
                "label": "The one check I will never skip on this task",
                "multiline": true,
                "placeholder": ""
              }
            ],
            "allowFile": true
          }
        }
      ]
    },
    {
      "id": "af-m-trust",
      "title": "TRUST · Earn the right to rely on it",
      "summary": "Trusting is not automatic. You earn it by checking the output, guarding against the ways AI use goes wrong, and building the good version into a habit you can repeat.",
      "lessons": [
        {
          "id": "af-d6",
          "title": "Day 6: Checking AI outputs",
          "topic": "Checking AI outputs",
          "estimatedMinutes": 60,
          "summary": "Today you build: Quality review checklist.",
          "blocks": [
            {
              "id": "b96",
              "type": "text",
              "tone": "info",
              "text": "TRUST · Step 1: Check the output.",
              "label": "Framework step"
            },
            {
              "id": "b97",
              "type": "heading",
              "level": 2,
              "text": "Concept · 10 minutes"
            },
            {
              "id": "b98",
              "type": "paragraph",
              "text": "You have spent five days getting AI to produce good work. Today the job flips. You learn to check what it produced before you rely on it. This is the first step of TRUST, and it is where fluency separates from guesswork. Anyone can generate an answer. A fluent user checks it."
            },
            {
              "id": "b99",
              "type": "paragraph",
              "text": "AI outputs fail in a few predictable ways. The tool states a fact that is not true and states it with full confidence. It leaves out something the task needed. It drifts off the format or tone you asked for. It agrees with a wrong assumption in your prompt instead of correcting it. Each of these can slip past a quick read, because the output looks finished either way."
            },
            {
              "id": "b100",
              "type": "paragraph",
              "text": "A quality check is a short, fixed set of questions you run against every output before you use it. Is every fact here something I can confirm. Is anything important missing. Does it match the format and tone I asked for. Would I put my name on this as it stands. The check takes a minute. Sending unchecked AI output to a client or a manager can cost far more than a minute."
            },
            {
              "id": "b101",
              "type": "heading",
              "level": 2,
              "text": "Worked example on Dana · 10 minutes"
            },
            {
              "id": "b102",
              "type": "paragraph",
              "text": "Read through this example before you build your own. It follows Dana, an operations manager at a mid-size logistics company, doing today's task on a real case."
            },
            {
              "id": "b103",
              "type": "paragraph",
              "text": "Follow Dana as she checks an output before she relies on it. She generated a client-facing delay notice and is about to send it."
            },
            {
              "id": "b104",
              "type": "paragraph",
              "text": "The notice reads well, and she is tempted to send it as is. Instead she runs four questions against it."
            },
            {
              "id": "b105",
              "type": "paragraph",
              "text": "Are the facts confirmable? The notice says the shipment cleared customs Tuesday. Dana checks her tracking and finds it was Wednesday. That is a real error the tool invented from context. Is anything missing? Yes, it does not give the client the new estimated arrival, which is the one thing they will want. Does it match tone and format? Yes, professional and short. Would she sign it? Not until the two problems are fixed."
            },
            {
              "id": "b106",
              "type": "paragraph",
              "text": "See what the check caught. The notice failed on two of the four questions even though it read perfectly. A quick skim would have let a wrong date and a missing arrival estimate reach a key client."
            },
            {
              "id": "b107",
              "type": "paragraph",
              "text": "Watch her finish. She corrects the customs date, adds the estimated arrival, re-reads, and now she signs it. The check took about a minute and protected the client relationship. That is the habit: a fixed set of questions you run every time, because a polished output does not announce its errors."
            },
            {
              "id": "b108",
              "type": "heading",
              "level": 2,
              "text": "Guided build on your own task · 35 minutes"
            },
            {
              "id": "b109",
              "type": "paragraph",
              "text": "Follow these steps on a real task from your own work. You should be able to work through them without stopping to ask a question."
            },
            {
              "id": "b110",
              "type": "list",
              "ordered": true,
              "items": [
                "Take an AI output you generated earlier this week, ideally from your top use case.",
                "Run the first question: is every fact in it something you can confirm. Mark any you cannot.",
                "Run the second question: is anything the task needed missing. Note what.",
                "Run the third question: does it match the format and tone you asked for.",
                "Run the fourth question: would you put your name on it as it stands.",
                "Fix every problem the four questions surfaced.",
                "Write the four questions, in your own words, as your reusable quality-review checklist.",
                "Save the checklist into your template below. You will use it on every output from now on."
              ]
            }
          ],
          "check": [
            {
              "id": "q111",
              "question": "Why can a weak AI output slip past a quick read?",
              "options": [
                "It is always shorter",
                "It uses obvious placeholder text",
                "It looks finished whether or not it is correct",
                "It is in a different tone"
              ],
              "correctIndex": 3,
              "rationale": "Finished-looking output does not announce its errors, so a fixed check is needed."
            },
            {
              "id": "q112",
              "question": "Which question belongs in a quality-review check?",
              "options": [
                "Is every fact here one I can confirm?",
                "Did it answer quickly?",
                "Is it longer than last time?",
                "Did I use my favorite prompt?"
              ],
              "correctIndex": 2,
              "rationale": "Confirmable facts, completeness, format and tone, and sign-off are the checks."
            },
            {
              "id": "q113",
              "question": "A summary reads perfectly but omits the one figure your manager needs. Which check catches it?",
              "options": [
                "The tone check",
                "The sign-off check only",
                "None would catch it",
                "The \"is anything missing\" check"
              ],
              "correctIndex": 0,
              "rationale": "A missing required element is caught by the completeness question."
            }
          ],
          "checkSettings": {
            "mode": "practice",
            "timeLimitMin": 0,
            "attemptsAllowed": 0
          },
          "activity": {
            "title": "My Quality Review Checklist",
            "instructions": [
              "Take an AI output you generated earlier this week, ideally from your top use case.",
              "Run the first question: is every fact in it something you can confirm. Mark any you cannot.",
              "Run the second question: is anything the task needed missing. Note what.",
              "Run the third question: does it match the format and tone you asked for.",
              "Run the fourth question: would you put your name on it as it stands.",
              "Fix every problem the four questions surfaced.",
              "Write the four questions, in your own words, as your reusable quality-review checklist.",
              "Save the checklist into your template below. You will use it on every output from now on."
            ],
            "fields": [
              {
                "id": "af-d6-f1",
                "label": "I run these questions against every AI output before I use it",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d6-f2",
                "label": "[ ] Facts: is every fact here one I can confirm?",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d6-f3",
                "label": "Where I check",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d6-f4",
                "label": "[ ] Missing: is anything the task needed left out?",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d6-f5",
                "label": "[ ] Format and tone: does it match what I asked for?",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d6-f6",
                "label": "[ ] Sign-off: would I put my name on it as it stands?",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d6-f7",
                "label": "One extra check specific to my use case",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d6-f8",
                "label": "[ ]",
                "multiline": false,
                "placeholder": ""
              }
            ],
            "allowFile": true
          }
        },
        {
          "id": "af-d7",
          "title": "Day 7: Privacy, accuracy, and judgment",
          "topic": "Privacy, accuracy, and judgment",
          "estimatedMinutes": 60,
          "summary": "Today you build: Safe-use checklist.",
          "blocks": [
            {
              "id": "b114",
              "type": "text",
              "tone": "info",
              "text": "TRUST · Step 2: Guard privacy, accuracy, and judgment.",
              "label": "Framework step"
            },
            {
              "id": "b115",
              "type": "heading",
              "level": 2,
              "text": "Concept · 10 minutes"
            },
            {
              "id": "b116",
              "type": "paragraph",
              "text": "Yesterday you checked whether an output was good. Today you guard against the three ways AI use goes wrong even when the output looks good: a privacy slip, an accuracy failure, and a lapse of judgment. These are the safeguards that protect you and your company, and this is the safe-use content the course is built to deliver."
            },
            {
              "id": "b117",
              "type": "paragraph",
              "text": "Privacy comes first because it is the easiest to breach without noticing. When you paste text into an AI tool, you are sending it outside your own systems. Confidential, proprietary, regulated, or personal information does not belong in a public AI tool unless you have authorization and the tool is approved for it. The safe move is to use real tasks with the sensitive details removed. Sanitize first, then prompt."
            },
            {
              "id": "b118",
              "type": "paragraph",
              "text": "Accuracy comes second. AI states things confidently whether or not they are true, so anything you will act on or pass along has to be verified against a real source. Judgment comes third and sits over both. Some decisions should not be handed to a tool at all, such as anything affecting a person's job, a legal or financial commitment, or a message that carries your company's word. On those, AI can help you draft or think, but a human makes the call and a human signs it."
            },
            {
              "id": "b119",
              "type": "heading",
              "level": 2,
              "text": "Worked example on Dana · 10 minutes"
            },
            {
              "id": "b120",
              "type": "paragraph",
              "text": "Read through this example before you build your own. It follows Dana, an operations manager at a mid-size logistics company, doing today's task on a real case."
            },
            {
              "id": "b121",
              "type": "paragraph",
              "text": "Watch Dana guard against the three ways AI use goes wrong even when the output looks fine. She wants help drafting a performance note about a warehouse team member who has been late."
            },
            {
              "id": "b122",
              "type": "paragraph",
              "text": "She starts to paste the employee's name, their record, and specific dates into the tool. Stop there, because three problems fire at once."
            },
            {
              "id": "b123",
              "type": "paragraph",
              "text": "Privacy: she is about to send a named person's employment details to an outside tool. Accuracy: the tool cannot know the real dates and might smooth over or invent them. Judgment: a performance note affects someone's job and should not be handed to AI to decide."
            },
            {
              "id": "b124",
              "type": "paragraph",
              "text": "Watch the safe version. Dana strips the name and identifying details. She asks the tool only for neutral, professional phrasing for a lateness conversation in general terms. She keeps the real record in her own system. She writes the actual note herself, using the tool's phrasing as raw material, and she signs it as her own judgment."
            },
            {
              "id": "b125",
              "type": "paragraph",
              "text": "Notice how each safeguard fired: sanitize for privacy, verify the real facts for accuracy, and keep the human decision for judgment. The tool still helped, on the part that was safe to hand it. That is the standard for your own safe-use page."
            },
            {
              "id": "b126",
              "type": "heading",
              "level": 2,
              "text": "Guided build on your own task · 35 minutes"
            },
            {
              "id": "b127",
              "type": "paragraph",
              "text": "Follow these steps on a real task from your own work. You should be able to work through them without stopping to ask a question."
            },
            {
              "id": "b128",
              "type": "list",
              "ordered": true,
              "items": [
                "Look at your top use case and ask what sensitive information it might involve: names, client data, figures, anything confidential.",
                "Write your sanitizing rule: exactly what you will remove or mask before anything goes into an AI tool.",
                "Write your accuracy rule: which facts in this use case you will always verify against a real source.",
                "Write your judgment rule: what decisions in this area you will never hand to AI, only draft with it.",
                "Check whether the AI tool you use is approved by your organization for the kind of data your task involves.",
                "Combine the three rules into a short safe-use checklist you can run before and after using AI.",
                "Save the checklist into your template below. This is the safeguard page of your playbook."
              ]
            }
          ],
          "check": [
            {
              "id": "q129",
              "question": "The data-safety rule allows sensitive information in an AI tool only when what is true?",
              "options": [
                "You are in a hurry",
                "Only you will see the output",
                "You have authorization and the tool is approved for it",
                "You delete the chat after"
              ],
              "correctIndex": 2,
              "rationale": "Authorization plus an approved environment is the condition."
            },
            {
              "id": "q130",
              "question": "What is the recommended way to use a real work task while protecting sensitive data?",
              "options": [
                "Use the real task with sensitive details removed",
                "Use a made-up task instead",
                "Skip the task",
                "Paste everything and hope it is forgotten"
              ],
              "correctIndex": 3,
              "rationale": "Sanitize first, then prompt. A real task with details stripped stays authentic and safe."
            },
            {
              "id": "q131",
              "question": "Which decision should not be handed to AI to make?",
              "options": [
                "Suggesting synonyms",
                "Drafting a meeting agenda",
                "Summarizing a public article",
                "A decision affecting a person's job"
              ],
              "correctIndex": 1,
              "rationale": "Consequential decisions about people, law, or money stay with a human. AI may draft, not decide."
            }
          ],
          "checkSettings": {
            "mode": "practice",
            "timeLimitMin": 0,
            "attemptsAllowed": 0
          },
          "activity": {
            "title": "My Safe-Use Checklist",
            "instructions": [
              "Look at your top use case and ask what sensitive information it might involve: names, client data, figures, anything confidential.",
              "Write your sanitizing rule: exactly what you will remove or mask before anything goes into an AI tool.",
              "Write your accuracy rule: which facts in this use case you will always verify against a real source.",
              "Write your judgment rule: what decisions in this area you will never hand to AI, only draft with it.",
              "Check whether the AI tool you use is approved by your organization for the kind of data your task involves.",
              "Combine the three rules into a short safe-use checklist you can run before and after using AI.",
              "Save the checklist into your template below. This is the safeguard page of your playbook."
            ],
            "fields": [
              {
                "id": "af-d7-f1",
                "label": "[ ] Before prompting, I remove or mask",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d7-f2",
                "label": "[ ] The tool I use is approved for this data: yes / no",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d7-f3",
                "label": "[ ] Facts I always verify against a real source",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d7-f4",
                "label": "Source I verify against",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d7-f5",
                "label": "[ ] Decisions I never hand to AI (draft only)",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d7-f6",
                "label": "[ ] A human signs the final version: yes",
                "multiline": true,
                "placeholder": ""
              }
            ],
            "allowFile": true
          }
        },
        {
          "id": "af-d8",
          "title": "Day 8: Building a personal AI workflow",
          "topic": "Building a personal AI workflow",
          "estimatedMinutes": 60,
          "summary": "Today you build: AI workflow draft.",
          "blocks": [
            {
              "id": "b132",
              "type": "text",
              "tone": "info",
              "text": "TRUST · Step 3: Systematize into a workflow.",
              "label": "Framework step"
            },
            {
              "id": "b133",
              "type": "heading",
              "level": 2,
              "text": "Concept · 10 minutes"
            },
            {
              "id": "b134",
              "type": "paragraph",
              "text": "You now have pieces: a top use case, a tested prompt, a writing or planning workflow, a quality check, and a safe-use checklist. Today you connect them into one repeatable workflow for your top use case, so using AI on it becomes a habit instead of a fresh decision each time."
            },
            {
              "id": "b135",
              "type": "paragraph",
              "text": "A workflow is worth building only where a task repeats. That is why you spent Day 2 finding a recurring use case. The workflow captures the good version once, so tomorrow you run the steps instead of working out the approach again. The version you keep is the version that already passed your checks."
            },
            {
              "id": "b136",
              "type": "paragraph",
              "text": "A complete personal workflow runs start to finish: the trigger that tells you it is time to run it, the material you gather, the prompt you use, the review you run, and the safeguard you apply before the output leaves your hands. Written down, it becomes something you can follow on a busy day and something you could hand to a colleague. Loose in your head, it drifts, and yesterday's good result is hard to reproduce."
            },
            {
              "id": "b137",
              "type": "heading",
              "level": 2,
              "text": "Worked example on Dana · 10 minutes"
            },
            {
              "id": "b138",
              "type": "paragraph",
              "text": "Read through this example before you build your own. It follows Dana, an operations manager at a mid-size logistics company, doing today's task on a real case."
            },
            {
              "id": "b139",
              "type": "paragraph",
              "text": "Follow Dana as she connects her pieces into one repeatable workflow for her Monday operations summary, the recurring task she picked on Day 2."
            },
            {
              "id": "b140",
              "type": "paragraph",
              "text": "Her first instinct is to just remember roughly how she did it last week. That is the weak version. Last week she was careful to verify the figures. This week, rushed, she might skip that, because nothing holds the good version in place."
            },
            {
              "id": "b141",
              "type": "paragraph",
              "text": "Watch her write it down instead, as five fixed steps. Trigger: Monday 8 a.m. Material: pull the weekend exception report and the open-delay list. Prompt: her tested summary prompt from Day 3, with role and format set. Review: her four-question quality check from Day 6. Safeguard: mask client names and verify every figure against the source system before it goes to her director."
            },
            {
              "id": "b142",
              "type": "paragraph",
              "text": "See what that buys her. The summary now comes out the same quality every Monday, whether she has twenty minutes or five. She could even hand the steps to a backup and get the same result."
            },
            {
              "id": "b143",
              "type": "paragraph",
              "text": "The lesson for your own build: the workflow did not add new skills. It locked the ones you already have into an order you can repeat under pressure, which is what turns a good day into a reliable habit."
            },
            {
              "id": "b144",
              "type": "heading",
              "level": 2,
              "text": "Guided build on your own task · 35 minutes"
            },
            {
              "id": "b145",
              "type": "paragraph",
              "text": "Follow these steps on a real task from your own work. You should be able to work through them without stopping to ask a question."
            },
            {
              "id": "b146",
              "type": "list",
              "ordered": true,
              "items": [
                "Take your top use case and write its trigger: the moment or signal that tells you to run this.",
                "Write the material step: exactly what you gather before you prompt.",
                "Drop in your tested prompt from Day 3.",
                "Drop in your quality review from Day 6 as the review step.",
                "Drop in the relevant part of your safe-use checklist from Day 7 as the safeguard step.",
                "Put the five steps in order and read them as one workflow. Fix any gap or jump.",
                "Test the workflow once on a real instance of the task, following your own steps exactly.",
                "Save the workflow into your template below."
              ]
            }
          ],
          "check": [
            {
              "id": "q147",
              "question": "Why is a workflow worth building only where a task repeats?",
              "options": [
                "One-time tasks are always harder",
                "AI only works on repeated tasks",
                "The setup pays off across many future runs",
                "Repeated tasks are always simple"
              ],
              "correctIndex": 0,
              "rationale": "The workflow captures the good version once so you reuse it, which only pays off on recurring work."
            },
            {
              "id": "q148",
              "question": "What does writing a workflow down protect against?",
              "options": [
                "Quality drifting when you are rushed",
                "The tool changing its answers",
                "Needing to prompt at all",
                "The task disappearing"
              ],
              "correctIndex": 1,
              "rationale": "A written workflow holds the good version in place on a busy day."
            },
            {
              "id": "q149",
              "question": "A complete personal workflow runs from trigger to output. Which piece comes last?",
              "options": [
                "The prompt",
                "The material you gather",
                "The trigger",
                "The safeguard before the output leaves your hands"
              ],
              "correctIndex": 3,
              "rationale": "The safeguard is the final gate before the output goes out."
            }
          ],
          "checkSettings": {
            "mode": "practice",
            "timeLimitMin": 0,
            "attemptsAllowed": 0
          },
          "activity": {
            "title": "My Personal AI Workflow",
            "instructions": [
              "Take your top use case and write its trigger: the moment or signal that tells you to run this.",
              "Write the material step: exactly what you gather before you prompt.",
              "Drop in your tested prompt from Day 3.",
              "Drop in your quality review from Day 6 as the review step.",
              "Drop in the relevant part of your safe-use checklist from Day 7 as the safeguard step.",
              "Put the five steps in order and read them as one workflow. Fix any gap or jump.",
              "Test the workflow once on a real instance of the task, following your own steps exactly.",
              "Save the workflow into your template below."
            ],
            "fields": [
              {
                "id": "af-d8-f1",
                "label": "Use case this workflow is for",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d8-f2",
                "label": "STEP 1 Trigger (when I run this)",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d8-f3",
                "label": "STEP 2 Material I gather",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d8-f4",
                "label": "STEP 3 Prompt I use (from Day 3)",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d8-f5",
                "label": "STEP 4 Review (from Day 6)",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d8-f6",
                "label": "STEP 5 Safeguard before it leaves my hands (Day 7)",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d8-f7",
                "label": "I tested this workflow on a real task: yes / not yet",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d8-f8",
                "label": "What I fixed after testing",
                "multiline": false,
                "placeholder": ""
              }
            ],
            "allowFile": true
          }
        },
        {
          "id": "af-d9",
          "title": "Day 9: Creating a 7-day adoption plan",
          "topic": "Creating a 7-day adoption plan",
          "estimatedMinutes": 60,
          "summary": "Today you build: Adoption plan.",
          "blocks": [
            {
              "id": "b150",
              "type": "text",
              "tone": "info",
              "text": "TRUST · Step 4: Adopt on a 7-day plan.",
              "label": "Framework step"
            },
            {
              "id": "b151",
              "type": "heading",
              "level": 2,
              "text": "Concept · 10 minutes"
            },
            {
              "id": "b152",
              "type": "paragraph",
              "text": "A workflow you built and never run is not adoption. Today you make a plan to actually put your workflow to use over the next seven days, so the skill sticks after the course ends. This is the last step of the framework, and it is the one that decides whether any of the previous eight days changes how you work."
            },
            {
              "id": "b153",
              "type": "paragraph",
              "text": "New habits fail when they are vague. \"Use AI more\" is not a plan and nothing happens. A plan names the specific task, the specific day, and the specific moment. When you decide in advance that you will run your Monday-summary workflow on Monday at 8 a.m., you remove the daily decision that vague intentions leave open."
            },
            {
              "id": "b154",
              "type": "paragraph",
              "text": "A realistic adoption plan starts small and names a person. One workflow, run on its real schedule, for one week. It also names who else is involved, because most workplace tasks touch someone: a manager who receives the output, a teammate who reviews it, or an approver who signs off. Naming them turns a private habit into something real in your actual work, and it surfaces any approval you need before you rely on the output."
            },
            {
              "id": "b155",
              "type": "heading",
              "level": 2,
              "text": "Worked example on Dana · 10 minutes"
            },
            {
              "id": "b156",
              "type": "paragraph",
              "text": "Read through this example before you build your own. It follows Dana, an operations manager at a mid-size logistics company, doing today's task on a real case."
            },
            {
              "id": "b157",
              "type": "paragraph",
              "text": "Watch Dana make a plan to actually put her workflow to use over the next seven days, so the skill sticks after the course ends."
            },
            {
              "id": "b158",
              "type": "paragraph",
              "text": "Her first version is an intention, not a plan. She writes: \"start using my AI workflow next week.\" Nothing about that will make it happen. It has no day, no time, and no one else attached."
            },
            {
              "id": "b159",
              "type": "paragraph",
              "text": "See why that fails. It leaves every detail to be decided in the moment, which is exactly when busy people skip things."
            },
            {
              "id": "b160",
              "type": "paragraph",
              "text": "Watch the specific version. Monday 8 a.m., run the operations summary workflow. Her director receives it, so she flags to him that this week's summary was AI-assisted and asks for feedback on quality. Wednesday, she reviews how it went and adjusts the prompt if the summary needed heavy editing. She notes one approval point: her director is fine with AI-assisted drafts as long as the figures are verified, which her safeguard already covers."
            },
            {
              "id": "b161",
              "type": "paragraph",
              "text": "The lesson for your own build: the specific plan is harder to write and far more likely to happen. The named day and the named person are what carry it out of your head and into your real work."
            },
            {
              "id": "b162",
              "type": "heading",
              "level": 2,
              "text": "Guided build on your own task · 35 minutes"
            },
            {
              "id": "b163",
              "type": "paragraph",
              "text": "Follow these steps on a real task from your own work. You should be able to work through them without stopping to ask a question."
            },
            {
              "id": "b164",
              "type": "list",
              "ordered": true,
              "items": [
                "Take the workflow you built on Day 8. This is what you will adopt.",
                "Name the exact day and time you will run it in the next seven days.",
                "Name who receives or reviews the output, and whether they need to know AI was involved.",
                "Name any approval you need before you rely on the output, and how you will get it.",
                "Set one mid-week checkpoint to review how it went and adjust.",
                "Write down one obstacle that could stop you, and your plan for it.",
                "Save the plan into your template below. This is the final working page of your playbook."
              ]
            }
          ],
          "check": [
            {
              "id": "q165",
              "question": "Why does \"start using AI more\" fail as an adoption plan?",
              "options": [
                "It is too ambitious",
                "AI cannot be scheduled",
                "It names no specific task, day, or time",
                "It involves other people"
              ],
              "correctIndex": 1,
              "rationale": "Vague intentions leave every detail to the moment, which is when they get skipped."
            },
            {
              "id": "q166",
              "question": "What turns a private habit into something real in your actual work?",
              "options": [
                "Naming the people it touches and any approval needed",
                "Doing it silently",
                "Keeping it to yourself",
                "Waiting until you have free time"
              ],
              "correctIndex": 2,
              "rationale": "Naming the receiver and the approval surfaces what the task actually depends on."
            },
            {
              "id": "q167",
              "question": "What makes an adoption plan more likely to happen?",
              "options": [
                "Keeping it general so it is flexible",
                "Planning many workflows at once",
                "Avoiding any checkpoint",
                "A named day, time, and person"
              ],
              "correctIndex": 0,
              "rationale": "Specific commitments with a named day and person carry the plan into real work."
            }
          ],
          "checkSettings": {
            "mode": "practice",
            "timeLimitMin": 0,
            "attemptsAllowed": 0
          },
          "activity": {
            "title": "My 7-Day Adoption Plan",
            "instructions": [
              "Take the workflow you built on Day 8. This is what you will adopt.",
              "Name the exact day and time you will run it in the next seven days.",
              "Name who receives or reviews the output, and whether they need to know AI was involved.",
              "Name any approval you need before you rely on the output, and how you will get it.",
              "Set one mid-week checkpoint to review how it went and adjust.",
              "Write down one obstacle that could stop you, and your plan for it.",
              "Save the plan into your template below. This is the final working page of your playbook."
            ],
            "fields": [
              {
                "id": "af-d9-f1",
                "label": "Workflow I am adopting",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d9-f2",
                "label": "I will run it on: Day",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d9-f3",
                "label": "Time",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d9-f4",
                "label": "Who receives or reviews the output",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d9-f5",
                "label": "Do they need to know AI was involved? yes / no",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d9-f6",
                "label": "Approval I need first",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d9-f7",
                "label": "How I will get it",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d9-f8",
                "label": "Mid-week checkpoint (day)",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "af-d9-f9",
                "label": "One obstacle that could stop me",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "af-d9-f10",
                "label": "My plan for that obstacle",
                "multiline": false,
                "placeholder": ""
              }
            ],
            "allowFile": true
          }
        }
      ]
    }
  ],
  "finalExam": {
    "questions": [
      {
        "id": "q168",
        "question": "Which task is the strongest fit for a general AI language tool?",
        "options": [
          "Confirming the exact total on an invoice in your finance system",
          "Reporting what was decided in a private meeting last week",
          "Drafting a first version of a routine client email",
          "Calculating a precise year-end figure you will file"
        ],
        "correctIndex": 2,
        "rationale": "AI is strong at drafting language. The other three depend on private facts or exact figures the tool cannot supply reliably."
      },
      {
        "id": "q169",
        "question": "An AI tool gives you a confident, specific answer to a factual question. What is the safest assumption?",
        "options": [
          "Confidence does not tell you whether the answer is true",
          "A confident answer is almost always correct",
          "The tool has checked a live source before answering",
          "Specific numbers mean the answer was verified"
        ],
        "correctIndex": 0,
        "rationale": "AI states things confidently whether or not they are true. Confidence is not evidence of accuracy."
      },
      {
        "id": "q170",
        "question": "Why is it useful to decide whether a task is an AI task before you start prompting?",
        "options": [
          "It guarantees the tool will not make mistakes",
          "It replaces the need to check the output",
          "It makes the prompt shorter automatically",
          "It saves time by keeping AI off jobs it does poorly"
        ],
        "correctIndex": 3,
        "rationale": "The upfront decision keeps you from spending effort getting AI to do fact or figure work it is weak at."
      },
      {
        "id": "q171",
        "question": "A task depends on data that exists only inside your company records. What does this tell you?",
        "options": [
          "AI can retrieve it if you ask clearly enough",
          "AI cannot supply it, so that part is yours to do",
          "AI will refuse the task",
          "AI will always say it does not know"
        ],
        "correctIndex": 1,
        "rationale": "The tool has no access to your private records, so it may guess. That part of the task stays with you."
      },
      {
        "id": "q172",
        "question": "What are the four elements of a useful prompt taught in this course?",
        "options": [
          "Length, speed, tone, and topic",
          "Task, role, constraints, and format",
          "Question, answer, review, and edit",
          "Who, what, when, and where"
        ],
        "correctIndex": 1,
        "rationale": "The four are task, role, constraints, and format. Supplying all four on purpose is the core habit."
      },
      {
        "id": "q173",
        "question": "In the prompt \"You are an operations manager, write a delay update under 120 words,\" which element is \"under 120 words\"?",
        "options": [
          "The task",
          "The role",
          "The format",
          "A constraint"
        ],
        "correctIndex": 3,
        "rationale": "A word limit is a constraint: a limit the answer must respect."
      },
      {
        "id": "q174",
        "question": "What most often happens when a prompt is missing one of the four elements?",
        "options": [
          "The tool guesses, and the guess is usually generic",
          "The tool refuses to answer",
          "The tool asks you for the missing element",
          "The tool produces a shorter answer"
        ],
        "correctIndex": 0,
        "rationale": "A missing element gets filled by a guess, which is why vague prompts produce generic results."
      },
      {
        "id": "q175",
        "question": "Which addition to a prompt supplies the \"format\" element?",
        "options": [
          "Answer as a senior analyst",
          "Keep it professional in tone",
          "Return it as a short email with a subject line",
          "Focus on the delayed shipment"
        ],
        "correctIndex": 2,
        "rationale": "Format specifies the shape of the answer. \"A short email with a subject line\" names that shape."
      },
      {
        "id": "q176",
        "question": "What is the main reason a weak AI output can slip past a quick read?",
        "options": [
          "It is always shorter than a correct one",
          "It uses obvious placeholder text",
          "It is written in a different tone",
          "It looks finished whether or not it is correct"
        ],
        "correctIndex": 3,
        "rationale": "AI output looks finished either way, so errors and gaps do not announce themselves. A fixed check surfaces them."
      },
      {
        "id": "q177",
        "question": "Why does planning and analysis work need a heavier review than writing work?",
        "options": [
          "Plans are always longer than written drafts",
          "A tidy structure can hide a missing step or an invented figure",
          "AI cannot produce plans at all",
          "Writing never contains errors"
        ],
        "correctIndex": 1,
        "rationale": "Structure makes a flawed plan still look organized, so the gap hides. Writing errors are easier to notice."
      },
      {
        "id": "q178",
        "question": "Which question belongs in a quality-review check before you rely on an output?",
        "options": [
          "Did the tool answer quickly?",
          "Is the answer longer than last time?",
          "Is every fact here one I can confirm?",
          "Did I use my favorite prompt?"
        ],
        "correctIndex": 2,
        "rationale": "Confirmable facts, completeness, format and tone, and sign-off are the review questions. Speed and length are not checks."
      },
      {
        "id": "q179",
        "question": "An AI summary reads perfectly but omits the one figure your manager needs. On the checklist, which question catches this?",
        "options": [
          "The \"is anything missing\" question",
          "The format and tone question",
          "The sign-off question only",
          "None of them would catch it"
        ],
        "correctIndex": 0,
        "rationale": "A missing required element is caught by the completeness question, even when tone and format are fine."
      },
      {
        "id": "q180",
        "question": "The data-safety rule says you may not put confidential or personal information into an AI tool unless what is true?",
        "options": [
          "You have authorization and the tool is approved for it",
          "You are in a hurry and it would save time",
          "The output will only be seen by you",
          "You delete the chat afterward"
        ],
        "correctIndex": 0,
        "rationale": "Authorization plus an approved environment is the condition. Convenience and deletion do not make it safe."
      },
      {
        "id": "q181",
        "question": "What is the recommended way to use a real work task while protecting sensitive data?",
        "options": [
          "Use a made-up task instead",
          "Skip the task entirely",
          "Use the real task with sensitive details removed",
          "Paste everything and hope the tool forgets it"
        ],
        "correctIndex": 2,
        "rationale": "Sanitize first, then prompt. A real task with the sensitive details stripped keeps the work authentic and safe."
      },
      {
        "id": "q182",
        "question": "Which decision should not be handed to an AI tool to make?",
        "options": [
          "Suggesting synonyms for a word",
          "A decision affecting a person's job",
          "Drafting a first outline of a meeting agenda",
          "Summarizing a public article"
        ],
        "correctIndex": 1,
        "rationale": "Decisions affecting a person's job, or legal, financial, or company commitments, stay with a human. AI may draft, not decide."
      },
      {
        "id": "q183",
        "question": "What does \"human judgment\" mean in the safe-use context of this course?",
        "options": [
          "The AI decides and a person watches",
          "Judgment is only needed for creative tasks",
          "The tool signs off automatically once confident",
          "A person reviews and owns the final decision, even when AI helped draft it"
        ],
        "correctIndex": 3,
        "rationale": "On consequential work, AI can help draft or think, but a human makes the call and signs the result."
      }
    ],
    "timeLimitMin": 30,
    "attemptsAllowed": 3
  }
} as const;

export function buildAiFluencyCourse(createdBy: string, at: string): Course {
  return { ...(COURSE as unknown as Course), createdBy, createdAt: at, updatedAt: at };
}
