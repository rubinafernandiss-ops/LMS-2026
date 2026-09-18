/**
 * Prompt and Context Engineering
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
  "id": "c_prompt_context",
  "title": "Prompt and Context Engineering",
  "subtitle": "Ten applied learning sprints. Ten business days. One hour a day.",
  "description": "You are going to build one thing across ten days and keep it: the AI Context Design Canvas. By the end it will hold, for one real task of yours, a scoped prompt, the sources it depends on, the guardrails that keep it safe, the tools and memory it needs, and the review that keeps it reliable. The course is organized by The USAII Context Design Canvas, which moves through five regions: SCOPE, SUPPLY, SHAPE, STATE, and SUSTAIN.",
  "credentialName": "USAII Certificate of Completion: Prompt and Context Engineering",
  "durationLabel": "10 days · 1 hour a day",
  "level": "Everyone",
  "price": 25,
  "access": "invite",
  "status": "published",
  "accent": "purple",
  "passMark": 75,
  "grading": {
    "checks": 30,
    "activities": 40,
    "finalExam": 30
  },
  "modules": [
    {
      "id": "pc-m-scope",
      "title": "SCOPE · Say what you want, precisely",
      "summary": "Decide clearly what you are asking the tool to do, as whom, within what limits, and in what shape.",
      "lessons": [
        {
          "id": "pc-d1",
          "title": "Day 1: Prompt fundamentals: task, role, constraints, format",
          "topic": "Prompt fundamentals: task, role, constraints, format",
          "estimatedMinutes": 60,
          "summary": "Today you build: Basic prompt draft.",
          "blocks": [
            {
              "id": "b184",
              "type": "text",
              "tone": "info",
              "text": "SCOPE · Step 1: State the task, role, constraints, and format",
              "label": "Framework step"
            },
            {
              "id": "b185",
              "type": "text",
              "tone": "info",
              "text": "You may not put confidential, proprietary, regulated, or personally identifiable information into an AI tool unless you have authorization and the environment explicitly supports it. Use a real task, sanitized: keep the shape of your real work and strip the sensitive details. This matters most in this course when you supply source documents — use a USAII sample set or sanitized copies with no restricted information.",
              "label": "Data-safety rule"
            },
            {
              "id": "b186",
              "type": "heading",
              "level": 2,
              "text": "Concept · 10 minutes"
            },
            {
              "id": "b187",
              "type": "paragraph",
              "text": "You are going to build one thing across ten days and keep it: the AI Context Design Canvas. It is the single method this course teaches, and every day fills in one more part of it. Today you start at the beginning of any AI task, which is the prompt itself."
            },
            {
              "id": "b188",
              "type": "paragraph",
              "text": "A prompt is the instruction you hand an AI tool. Most people write a short one, get a generic answer, and conclude the tool is weak. The tool is not weak. The instruction was thin. A useful prompt names four things on purpose every time: the task, the role, the constraints, and the format. Task is the job to do. Role is the voice or expertise the tool should answer from. Constraints are the limits the answer must respect, such as length, tone, or what to leave out. Format is the shape of the output, such as an email, a bulleted list, or a table."
            },
            {
              "id": "b189",
              "type": "paragraph",
              "text": "Supplying all four is the first region of the canvas, SCOPE. Before you engineer any context around an AI system, you decide clearly what you are asking it to do, as whom, within what limits, and in what shape. A vague prompt forces the tool to guess the parts you left out, and a guess reads generic. A scoped prompt gives it no room to drift."
            },
            {
              "id": "b190",
              "type": "heading",
              "level": 2,
              "text": "Worked example on Wendy · 10 minutes"
            },
            {
              "id": "b191",
              "type": "paragraph",
              "text": "Watch the Day 1 worked-example video before you begin your build. It follows Wendy, a customer-support team lead at a mid-size B2B SaaS company. She wants AI to help her draft replies to a busy support inbox without every answer sounding generic."
            },
            {
              "id": "b192",
              "type": "paragraph",
              "text": "Wendy starts the way most people do. She types: \"Write a reply to this customer.\" The tool returns a polite, shapeless paragraph. It apologizes for an unnamed problem, promises nothing specific, and could have been sent to any customer of any company. It is not wrong, exactly. It is just empty."
            },
            {
              "id": "b193",
              "type": "paragraph",
              "text": "Look at why. Her prompt named a task and nothing else. The tool did not know who it was speaking as, what limits applied, or what shape the answer should take, so it filled all three gaps with the blandest safe defaults."
            },
            {
              "id": "b194",
              "type": "paragraph",
              "text": "Now watch Wendy scope it. Task: reply to a customer reporting that a scheduled report failed to send. Role: a support team lead who is calm, specific, and never over-promises. Constraints: under 120 words, no commitment to a fix date she cannot confirm, acknowledge the specific failure. Format: a ready-to-send email with a subject line. The same tool now returns a reply that sounds like her team wrote it, addresses the actual failure, and stays inside the promise she is allowed to make."
            },
            {
              "id": "b195",
              "type": "paragraph",
              "text": "The lesson to carry into your own build: the difference between the two outputs was not a better tool or a longer prompt. It was four named elements instead of one. SCOPE is where every reliable AI task begins."
            },
            {
              "id": "b196",
              "type": "heading",
              "level": 2,
              "text": "Guided build on your own task · 35 minutes"
            },
            {
              "id": "b197",
              "type": "paragraph",
              "text": "Follow these steps on a real task from your own work. You should be able to work through them without stopping to ask a question."
            },
            {
              "id": "b198",
              "type": "paragraph",
              "text": "> 1. Pick one recurring task from your real work where you would > like a good first draft from AI. Name it in one plain line. > > 2. Write the task element: the specific job the AI should do on > this task, in one sentence. > > 3. Write the role element: the voice or expertise the AI should > answer from, such as \"a support lead\" or \"a project manager.\" > > 4. Write the constraints element: the limits the answer must > respect. List two or three, such as a length cap, a tone, or something > it must not say. > > 5. Write the format element: the exact shape of the output, such > as an email with a subject line, a five-row table, or a three-bullet > summary. > > 6. Assemble the four into one prompt and run it on a real > (sanitized) example from your work. > > 7. Save the prompt and the output into your template below. This > is the first region of your canvas: SCOPE."
            }
          ],
          "check": [
            {
              "id": "q199",
              "question": "Which four elements make up a useful prompt in this course?",
              "options": [
                "Task, role, constraints, and format",
                "Length, speed, tone, and topic",
                "Question, source, answer, and review",
                "Who, what, when, and where"
              ],
              "correctIndex": 0,
              "rationale": "The four are task, role, constraints, and format. Supplying all four on purpose is the SCOPE habit."
            },
            {
              "id": "q200",
              "question": "A prompt names the task but nothing else. What usually happens?",
              "options": [
                "The tool asks you for the missing elements",
                "The tool fills the gaps with generic defaults",
                "The tool refuses until you add a role",
                "The tool produces a shorter but more accurate answer"
              ],
              "correctIndex": 1,
              "rationale": "A missing element gets filled by a guess, and a guess reads generic."
            },
            {
              "id": "q201",
              "question": "\"Return it as an email with a subject line\" supplies which element?",
              "options": [
                "The task",
                "The role",
                "The format",
                "A constraint"
              ],
              "correctIndex": 2,
              "rationale": "Format names the shape of the answer; \"an email with a subject line\" is a shape."
            }
          ],
          "checkSettings": {
            "mode": "practice",
            "timeLimitMin": 0,
            "attemptsAllowed": 0
          },
          "activity": {
            "title": "My Scoped Prompt · Canvas Region 1: SCOPE",
            "instructions": [
              "Complete your canvas page for Day 1."
            ],
            "fields": [
              {
                "id": "pc-d1-f1",
                "label": "Task",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d1-f2",
                "label": "Role",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d1-f3",
                "label": "Constraints",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d1-f4",
                "label": "Format",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d1-f5",
                "label": "Assembled prompt",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d1-f6",
                "label": "First output (paste or summarize)",
                "multiline": true,
                "placeholder": ""
              }
            ],
            "allowFile": true
          }
        },
        {
          "id": "pc-d2",
          "title": "Day 2: Prompt patterns for repeatable work",
          "topic": "Prompt patterns for repeatable work",
          "estimatedMinutes": 60,
          "summary": "Today you build: Three reusable prompt patterns.",
          "blocks": [
            {
              "id": "b202",
              "type": "text",
              "tone": "info",
              "text": "SCOPE · Step 2: Turn a good prompt into a reusable pattern",
              "label": "Framework step"
            },
            {
              "id": "b203",
              "type": "heading",
              "level": 2,
              "text": "Concept · 10 minutes"
            },
            {
              "id": "b204",
              "type": "paragraph",
              "text": "Yesterday you scoped one prompt. Today you turn scoping into something you do not have to reinvent every time. A prompt pattern is a scoped prompt with the specifics pulled out and replaced by fill-in slots. You write the structure once, then reuse it by dropping in today's details."
            },
            {
              "id": "b205",
              "type": "paragraph",
              "text": "The value is in the repeat. A one-off question is not worth turning into a pattern. But a task you do many times a week, worded slightly differently each time, is exactly where a pattern pays off. It locks in the four elements so you never send a thin prompt again on that task, and it keeps every output consistent."
            },
            {
              "id": "b206",
              "type": "paragraph",
              "text": "Good patterns cluster where work repeats: replies that follow a recognizable shape, summaries of the same kind of document, updates in a fixed structure. Still inside SCOPE, a pattern is simply a scoped prompt built to be used again."
            },
            {
              "id": "b207",
              "type": "heading",
              "level": 2,
              "text": "Worked example on Wendy · 10 minutes"
            },
            {
              "id": "b208",
              "type": "paragraph",
              "text": "Read through this example before you build your own. It follows Wendy as she turns yesterday's one good reply into something her whole team can reuse."
            },
            {
              "id": "b209",
              "type": "paragraph",
              "text": "Wendy handles the same three reply types over and over: an outage acknowledgement, a how-to answer, and a refund-or-credit response. Yesterday she scoped one outage reply well. Today she notices she will scope the next one from scratch tomorrow unless she captures the structure."
            },
            {
              "id": "b210",
              "type": "paragraph",
              "text": "Her first attempt at a pattern is too rigid. She saves the exact outage reply, word for word, and tries to reuse it. It does not fit the next outage, because the specifics differ, and editing the whole thing takes as long as starting over."
            },
            {
              "id": "b211",
              "type": "paragraph",
              "text": "See the fix. She rewrites it as a pattern with slots: Role stays fixed (a calm support lead). Task becomes \"acknowledge {incident} and set expectation for {next update}.\" Constraints stay fixed (under 120 words, no unconfirmed fix date). Format stays fixed (email with subject line). Only the bracketed slots change per ticket."
            },
            {
              "id": "b212",
              "type": "paragraph",
              "text": "The lesson for your own build: a pattern keeps the four elements fixed and lets only the true variables change. Wendy now has three patterns for her three recurring reply types, and each one produces a consistent, on-scope draft in seconds."
            },
            {
              "id": "b213",
              "type": "heading",
              "level": 2,
              "text": "Guided build on your own task · 35 minutes"
            },
            {
              "id": "b214",
              "type": "paragraph",
              "text": "Follow these steps on a real task from your own work. You should be able to work through them without stopping to ask a question."
            },
            {
              "id": "b215",
              "type": "paragraph",
              "text": "> 1. List the recurring tasks where you would reuse an AI prompt. > Keep only the ones that come back often. > > 2. Choose the top three. These become your three patterns. > > 3. For each, write the role, constraints, and format as fixed text > that does not change between uses. > > 4. For each, write the task line with the true variables in curly > braces, such as {incident} or {customer name}. > > 5. Test one pattern by filling its slots with a real, sanitized > example and running it. > > 6. Adjust any slot that turned out to be fixed, or any fixed line > that turned out to vary. > > 7. Save all three patterns into your template. These extend your > SCOPE region."
            }
          ],
          "check": [
            {
              "id": "q216",
              "question": "What is a prompt pattern?",
              "options": [
                "The exact saved text of one good output, reused word for word",
                "A longer prompt that lists every possible instruction",
                "A prompt written by the AI tool itself",
                "A scoped prompt with the true variables replaced by fill-in slots"
              ],
              "correctIndex": 3,
              "rationale": "A pattern fixes the elements that stay and slots the ones that change, so you reuse it."
            },
            {
              "id": "q217",
              "question": "Which task is worth turning into a pattern?",
              "options": [
                "A recurring task you word slightly differently each time",
                "A one-time request you will never repeat",
                "Any task, since patterns always save time",
                "A task that does not use language"
              ],
              "correctIndex": 0,
              "rationale": "Value comes from the repeat; a recurring, slightly varying task is exactly where a pattern pays off."
            },
            {
              "id": "q218",
              "question": "In a good pattern, what should the curly-brace slots hold?",
              "options": [
                "The role and format, which change every time",
                "The true variables that change from one use to the next",
                "Nothing; slots are decorative",
                "The fixed constraints"
              ],
              "correctIndex": 1,
              "rationale": "Slots hold the true variables; role, constraints, and format stay fixed."
            }
          ],
          "checkSettings": {
            "mode": "practice",
            "timeLimitMin": 0,
            "attemptsAllowed": 0
          },
          "activity": {
            "title": "My Three Prompt Patterns · SCOPE",
            "instructions": [
              "Complete your canvas page for Day 2."
            ],
            "fields": [
              {
                "id": "pc-d2-f1",
                "label": "Pattern 1 name",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d2-f2",
                "label": "Role (fixed)",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d2-f3",
                "label": "Task (with {slots})",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d2-f4",
                "label": "Constraints (fixed)",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d2-f5",
                "label": "Format (fixed)",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d2-f6",
                "label": "Pattern 2 name",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d2-f7",
                "label": "Role / Task / Constraints / Format",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "pc-d2-f8",
                "label": "Pattern 3 name",
                "multiline": false,
                "placeholder": ""
              }
            ],
            "allowFile": true
          }
        },
        {
          "id": "pc-d3",
          "title": "Day 3: Testing prompt quality and identifying prompt limits",
          "topic": "Testing prompt quality and identifying prompt limits",
          "estimatedMinutes": 60,
          "summary": "Today you build: Prompt test log.",
          "blocks": [
            {
              "id": "b219",
              "type": "text",
              "tone": "info",
              "text": "SCOPE · Step 3: Test the prompt and find where it stops improving",
              "label": "Framework step"
            },
            {
              "id": "b220",
              "type": "heading",
              "level": 2,
              "text": "Concept · 10 minutes"
            },
            {
              "id": "b221",
              "type": "paragraph",
              "text": "You now have scoped prompts and reusable patterns. Today you learn to test them, and in testing them you meet the ceiling that the rest of this course is built to break through."
            },
            {
              "id": "b222",
              "type": "paragraph",
              "text": "Testing a prompt means running it on a few real cases and judging the output against clear criteria: is it accurate, is it complete, does it match the format, does it stay on the right side of your constraints. You do not judge by whether it reads nicely. You judge against what the task actually needs."
            },
            {
              "id": "b223",
              "type": "paragraph",
              "text": "Here is the important part. When you test a well-scoped prompt on a task that needs facts the tool does not have, you will find a wall. No rewording fixes it. The prompt is already clear; the tool simply lacks the knowledge. That wall is the prompt ceiling, and hitting it on purpose is the whole point of today. It is the reason context engineering exists, and it is where SCOPE ends and SUPPLY begins."
            },
            {
              "id": "b224",
              "type": "heading",
              "level": 2,
              "text": "Worked example on Wendy · 10 minutes"
            },
            {
              "id": "b225",
              "type": "paragraph",
              "text": "Watch the Day 3 worked-example video before you build. It follows Wendy as she tests her best reply pattern and runs straight into the ceiling."
            },
            {
              "id": "b226",
              "type": "paragraph",
              "text": "Wendy takes her outage-reply pattern, which is well scoped, and tests it on five real tickets. On three, the draft is excellent. On two, something is wrong: the AI confidently references a service credit policy that does not match her company's actual policy. The tone is right, the format is right, the facts are invented."
            },
            {
              "id": "b227",
              "type": "paragraph",
              "text": "She tries to fix it by rewording. She adds \"be accurate about the credit policy.\" The tool cannot become accurate about a policy it has never seen. It just states the wrong policy more firmly."
            },
            {
              "id": "b228",
              "type": "paragraph",
              "text": "This is the ceiling. Her prompt is not the problem. Her prompt is clean. The problem is that the tool has no access to her company's actual service-credit policy, and no prompt, however well scoped, can supply knowledge the tool does not hold."
            },
            {
              "id": "b229",
              "type": "paragraph",
              "text": "The lesson for your own build: testing does two jobs. It confirms which of your prompts are reliable, and it reveals exactly where prompting alone runs out. Every place a well-scoped prompt still fails on facts is a place you will need to SUPPLY context, which begins in a few days."
            },
            {
              "id": "b230",
              "type": "heading",
              "level": 2,
              "text": "Guided build on your own task · 35 minutes"
            },
            {
              "id": "b231",
              "type": "paragraph",
              "text": "Follow these steps on a real task from your own work. You should be able to work through them without stopping to ask a question."
            },
            {
              "id": "b232",
              "type": "paragraph",
              "text": "> 1. Take one of your patterns from Day 2 and run it on three to > five real, sanitized cases. > > 2. For each run, score four things: accurate, complete, format > matches, constraints respected. Mark each pass or fail. > > 3. For every failure, write one line on why it failed: wording, or > missing knowledge the tool could not have. > > 4. Separate the two kinds of failure. Wording failures you can fix > now by tightening the prompt. > > 5. Circle every failure caused by missing knowledge. Do not try to > fix these by rewording; you have found the prompt ceiling. > > 6. Note what knowledge each circled failure would have needed, > such as \"our actual refund policy\" or \"this customer's plan > tier.\" > > 7. Save the test log into your template. The circled items become > your SUPPLY list."
            }
          ],
          "check": [
            {
              "id": "q233",
              "question": "How should you judge whether a prompt's output is good?",
              "options": [
                "By whether it reads nicely and sounds confident",
                "By how long the answer is",
                "Against clear criteria: accuracy, completeness, format, constraints",
                "By how quickly the tool responded"
              ],
              "correctIndex": 2,
              "rationale": "Judge against the task's real needs — accuracy, completeness, format, constraints — not surface polish."
            },
            {
              "id": "q234",
              "question": "A well-scoped prompt keeps stating a company policy incorrectly. Rewording does not help. What have you found?",
              "options": [
                "A tool that is simply broken",
                "A prompt that needs to be longer",
                "A formatting error",
                "The prompt ceiling: the tool lacks knowledge no prompt can supply"
              ],
              "correctIndex": 3,
              "rationale": "The prompt is clean; the tool lacks knowledge no wording can supply. That is the prompt ceiling."
            },
            {
              "id": "q235",
              "question": "What is the value of deliberately testing a prompt to failure?",
              "options": [
                "It reveals exactly where you will need to supply context",
                "It proves prompting can solve every problem",
                "It makes the tool remember the correct answer next time",
                "It shortens the prompt"
              ],
              "correctIndex": 0,
              "rationale": "Testing to failure shows exactly where prompting ends and SUPPLY must begin."
            }
          ],
          "checkSettings": {
            "mode": "practice",
            "timeLimitMin": 0,
            "attemptsAllowed": 0
          },
          "activity": {
            "title": "My Prompt Test Log · SCOPE",
            "instructions": [
              "Complete your canvas page for Day 3."
            ],
            "fields": [
              {
                "id": "pc-d3-f1",
                "label": "Pattern tested",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d3-f2",
                "label": "Case 1: accurate __ complete __ format __ constraints __",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "pc-d3-f3",
                "label": "If failed, why",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d3-f4",
                "label": "Case 2: accurate __ complete __ format __ constraints __",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "pc-d3-f5",
                "label": "Case 3: accurate __ complete __ format __ constraints __",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "pc-d3-f6",
                "label": "Failures fixable by wording",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d3-f7",
                "label": "Failures caused by MISSING KNOWLEDGE (the ceiling)",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "pc-d3-f8",
                "label": "Knowledge each one needed",
                "multiline": false,
                "placeholder": ""
              }
            ],
            "allowFile": true
          }
        }
      ]
    },
    {
      "id": "pc-m-supply",
      "title": "SUPPLY · Give it what it needs to know",
      "summary": "Provide the specific knowledge the tool lacks, from sources you can point to.",
      "lessons": [
        {
          "id": "pc-d4",
          "title": "Day 4: Why prompt engineering is not enough",
          "topic": "Why prompt engineering is not enough",
          "estimatedMinutes": 60,
          "summary": "Today you build: Workplace AI use case.",
          "blocks": [
            {
              "id": "b236",
              "type": "text",
              "tone": "info",
              "text": "SCOPE → SUPPLY: Name the tasks prompting alone cannot carry",
              "label": "Framework step"
            },
            {
              "id": "b237",
              "type": "heading",
              "level": 2,
              "text": "Concept · 10 minutes"
            },
            {
              "id": "b238",
              "type": "paragraph",
              "text": "Yesterday you hit the ceiling on one pattern. Today you generalize it. Prompt engineering, done well, gets you a clear instruction. It does not get you a tool that knows your policies, your documents, your customers, or your history. Those live outside the model, and no instruction reaches them."
            },
            {
              "id": "b239",
              "type": "paragraph",
              "text": "This is the hinge of the whole course. Everything up to now has been SCOPE: saying clearly what you want. Everything after is about giving the AI what it needs to actually deliver it. The name for that is context engineering, and the first honest step is to admit which of your real tasks prompting alone will never carry."
            },
            {
              "id": "b240",
              "type": "paragraph",
              "text": "A task needs context beyond prompting whenever a correct answer depends on specific information the tool cannot know: internal policy, a particular document, a customer's record, an example of your house style. Naming one such task precisely is today's work. It becomes the use case you build the rest of your canvas around, exactly as Course structure intends."
            },
            {
              "id": "b241",
              "type": "heading",
              "level": 2,
              "text": "Worked example on Wendy · 10 minutes"
            },
            {
              "id": "b242",
              "type": "paragraph",
              "text": "Read through this example before you build. It follows Wendy as she chooses the one use case her canvas will serve."
            },
            {
              "id": "b243",
              "type": "paragraph",
              "text": "Wendy has several tasks she would like AI to help with: drafting replies, summarizing tickets, writing internal shift notes. She has to pick one to build a full context design around, because building context for everything at once would be shapeless."
            },
            {
              "id": "b244",
              "type": "paragraph",
              "text": "Her first instinct is to pick \"drafting replies\" as a whole. But that is a category, like Course 1's \"emails.\" It is too broad to design context for, because different reply types need different sources and different guardrails."
            },
            {
              "id": "b245",
              "type": "paragraph",
              "text": "She narrows it. The use case she chooses: \"Draft first-response replies to service-outage tickets, grounded in our actual incident-status page and our real service-credit policy, in our house tone.\" That is specific. It names the task, and it names exactly the knowledge that prompting alone could not supply, which is what makes it a context-engineering use case rather than a prompting one."
            },
            {
              "id": "b246",
              "type": "paragraph",
              "text": "The lesson for your own build: pick one specific, recurring task whose correct answer depends on information the tool cannot know on its own. That dependency is the signal that you have found a real context use case."
            },
            {
              "id": "b247",
              "type": "heading",
              "level": 2,
              "text": "Guided build on your own task · 35 minutes"
            },
            {
              "id": "b248",
              "type": "paragraph",
              "text": "Follow these steps on a real task from your own work. You should be able to work through them without stopping to ask a question."
            },
            {
              "id": "b249",
              "type": "paragraph",
              "text": "> 1. List three or four real tasks where you would like AI help and > where you have already sensed prompting alone falls short. > > 2. Cross out any that are just categories (\"emails,\" > \"reports\"). Keep only specific, recurring jobs. > > 3. For each remaining task, write the one piece of knowledge a > correct answer depends on that the tool cannot know by itself. > > 4. Choose the one task with the clearest such dependency. This is > your use case for the rest of the course. > > 5. Write it as one sentence that names both the task and the > knowledge it depends on. > > 6. State who relies on the output and what a wrong answer would > cost, in one line each. > > 7. Save the use case into your template. Your whole canvas will > now serve this one task."
            }
          ],
          "check": [
            {
              "id": "q250",
              "question": "What does even a perfectly engineered prompt still fail to give the AI?",
              "options": [
                "A clear statement of the task",
                "Knowledge of your policies, documents, and records",
                "A defined role and format",
                "A length constraint"
              ],
              "correctIndex": 1,
              "rationale": "No instruction reaches your policies, documents, or records; that knowledge lives outside the model."
            },
            {
              "id": "q251",
              "question": "Why is \"drafting replies\" a weak use case to design context around?",
              "options": [
                "Replies never need AI help",
                "It happens too rarely to matter",
                "It is a broad category, not a specific task with specific sources",
                "The AI cannot write replies at all"
              ],
              "correctIndex": 2,
              "rationale": "A category is too broad to design context for; different reply types need different sources and guardrails."
            },
            {
              "id": "q252",
              "question": "What signals that a task genuinely needs context engineering, not just a better prompt?",
              "options": [
                "The task is long",
                "The task is disliked",
                "The task is new to you",
                "A correct answer depends on information the tool cannot know on its own"
              ],
              "correctIndex": 3,
              "rationale": "Dependence on information the tool cannot know is the signal of a real context use case."
            }
          ],
          "checkSettings": {
            "mode": "practice",
            "timeLimitMin": 0,
            "attemptsAllowed": 0
          },
          "activity": {
            "title": "My Context Use Case · The Task My Canvas Serves",
            "instructions": [
              "Complete your canvas page for Day 4."
            ],
            "fields": [
              {
                "id": "pc-d4-f1",
                "label": "Use case (task + the knowledge it depends on)",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "pc-d4-f2",
                "label": "The knowledge prompting alone cannot supply",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "pc-d4-f3",
                "label": "Who relies on the output",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d4-f4",
                "label": "What a wrong answer would cost",
                "multiline": true,
                "placeholder": ""
              }
            ],
            "allowFile": true
          }
        },
        {
          "id": "pc-d5",
          "title": "Day 5: What context engineering means",
          "topic": "What context engineering means",
          "estimatedMinutes": 60,
          "summary": "Today you build: Context inventory.",
          "blocks": [
            {
              "id": "b253",
              "type": "text",
              "tone": "info",
              "text": "SUPPLY · Step 1: Inventory the knowledge the AI needs but lacks",
              "label": "Framework step"
            },
            {
              "id": "b254",
              "type": "heading",
              "level": 2,
              "text": "Concept · 10 minutes"
            },
            {
              "id": "b255",
              "type": "paragraph",
              "text": "You have named a use case whose correct answer depends on knowledge the tool does not have. Today you begin the second region of the canvas, SUPPLY, by inventorying exactly what that knowledge is."
            },
            {
              "id": "b256",
              "type": "paragraph",
              "text": "Context engineering is the practice of assembling everything an AI system needs around the prompt so it can perform reliably: source documents, reference material, worked examples, and later the constraints, tools, and review that keep it honest. SUPPLY is the knowledge half of that. If SCOPE says what you want, SUPPLY gives the tool what it needs to produce it."
            },
            {
              "id": "b257",
              "type": "paragraph",
              "text": "A context inventory is a plain list of the knowledge your use case depends on, and where each piece lives. You are not connecting anything yet. You are naming the sources: the policy document, the status page, the example of good work, the record the answer must reflect. Naming them completely is what makes the next step, mapping them, possible."
            },
            {
              "id": "b258",
              "type": "heading",
              "level": 2,
              "text": "Worked example on Wendy · 10 minutes"
            },
            {
              "id": "b259",
              "type": "paragraph",
              "text": "Watch the Day 5 worked-example video before you build. It follows Wendy as she inventories the knowledge her outage-reply use case depends on."
            },
            {
              "id": "b260",
              "type": "paragraph",
              "text": "Wendy's use case needs the AI to draft outage replies grounded in real policy and real status. She lists what a correct reply actually depends on, one item at a time."
            },
            {
              "id": "b261",
              "type": "paragraph",
              "text": "Her first inventory is too vague. She writes \"company info\" and \"policies.\" That does not help, because it does not name a specific source anyone could point to. It is the SUPPLY equivalent of \"emails.\""
            },
            {
              "id": "b262",
              "type": "paragraph",
              "text": "She sharpens it. The correct reply depends on: the current incident-status page, the written service-credit policy, two or three past replies her team considers model examples of the right tone, and the specific ticket's plan tier. For each, she notes where it lives: the status tool, a policy doc, a saved folder of good replies, the ticket record."
            },
            {
              "id": "b263",
              "type": "paragraph",
              "text": "The lesson for your own build: a context inventory names each source specifically and says where it lives. \"Policies\" is not a source. \"Our written service-credit policy, in the shared drive\" is. Specific sources are the only kind you can later connect."
            },
            {
              "id": "b264",
              "type": "heading",
              "level": 2,
              "text": "Guided build on your own task · 35 minutes"
            },
            {
              "id": "b265",
              "type": "paragraph",
              "text": "Follow these steps on a real task from your own work. You should be able to work through them without stopping to ask a question."
            },
            {
              "id": "b266",
              "type": "paragraph",
              "text": "> 1. Return to your Day 4 use case. Write it at the top of your > inventory. > > 2. List every distinct piece of knowledge a correct answer depends > on, one line each. Aim for four to seven. > > 3. Replace any vague entry (\"policies,\" \"company info\") with > the specific document or record it really means. > > 4. Next to each source, note where it actually lives: a file, a > system, a page, a folder. > > 5. Mark each source as one of: reference document, worked example, > or live record. > > 6. Flag any source that contains sensitive data, so you know to > sanitize or substitute it later. > > 7. Save the inventory into your template. This opens your SUPPLY > region."
            }
          ],
          "check": [
            {
              "id": "q267",
              "question": "What is context engineering, in this course's terms?",
              "options": [
                "Assembling the sources, examples, limits, and review an AI system needs around the prompt",
                "Writing longer prompts until the answer improves",
                "Choosing which AI tool to buy",
                "Deleting the chat history after each use"
              ],
              "correctIndex": 0,
              "rationale": "Context engineering assembles the sources, examples, limits, and review around the prompt."
            },
            {
              "id": "q268",
              "question": "What does the SUPPLY region provide that SCOPE does not?",
              "options": [
                "A clearer statement of the task",
                "The specific knowledge the tool needs but does not have",
                "A shorter prompt",
                "The output format"
              ],
              "correctIndex": 1,
              "rationale": "SUPPLY provides the specific knowledge the tool lacks; SCOPE only states the task."
            },
            {
              "id": "q269",
              "question": "Why is \"policies\" a weak entry in a context inventory?",
              "options": [
                "Policies are never relevant to AI",
                "It is too specific",
                "It names a category, not a specific source anyone could point to and connect",
                "Policies cannot contain sensitive data"
              ],
              "correctIndex": 2,
              "rationale": "\"Policies\" names a category, not a specific source you could point to and connect."
            }
          ],
          "checkSettings": {
            "mode": "practice",
            "timeLimitMin": 0,
            "attemptsAllowed": 0
          },
          "activity": {
            "title": "My Context Inventory · Canvas Region 2: SUPPLY",
            "instructions": [
              "Complete your canvas page for Day 5."
            ],
            "fields": [
              {
                "id": "pc-d5-f1",
                "label": "Use case",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d5-f2",
                "label": "Source 1",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d5-f3",
                "label": "lives in",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d5-f4",
                "label": "type",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d5-f5",
                "label": "Source 2",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d5-f6",
                "label": "Source 3",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d5-f7",
                "label": "Source 4",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d5-f8",
                "label": "Source 5",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d5-f9",
                "label": "(type = reference document / worked example / live record)",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "pc-d5-f10",
                "label": "Sources containing sensitive data (sanitize or substitute)",
                "multiline": true,
                "placeholder": ""
              }
            ],
            "allowFile": true
          }
        },
        {
          "id": "pc-d6",
          "title": "Day 6: Source material, examples, and reference documents",
          "topic": "Source material, examples, and reference documents",
          "estimatedMinutes": 60,
          "summary": "Today you build: Source and context map.",
          "blocks": [
            {
              "id": "b270",
              "type": "text",
              "tone": "info",
              "text": "SUPPLY · Step 2: Map each source to where it feeds the task",
              "label": "Framework step"
            },
            {
              "id": "b271",
              "type": "heading",
              "level": 2,
              "text": "Concept · 10 minutes"
            },
            {
              "id": "b272",
              "type": "paragraph",
              "text": "Yesterday you listed your sources. Today you map them: for each source, you decide what job it does in the answer and how much of it the AI actually needs. A list becomes a map when every source is tied to the part of the task it serves."
            },
            {
              "id": "b273",
              "type": "paragraph",
              "text": "Sources do different jobs. A reference document supplies facts the answer must be correct about. A worked example shows the tool the shape and tone of good output, teaching by demonstration rather than instruction. A live record supplies the specifics of this one case. Knowing which job a source does tells you how to give it to the tool: facts must be quoted accurately, examples must be representative, records must be current."
            },
            {
              "id": "b274",
              "type": "paragraph",
              "text": "Mapping also means trimming. You rarely need a whole 40-page policy; you need the two clauses the answer depends on. Good SUPPLY is not the most context, it is the right context, mapped to the task so the tool is grounded without being buried."
            },
            {
              "id": "b275",
              "type": "heading",
              "level": 2,
              "text": "Worked example on Wendy · 10 minutes"
            },
            {
              "id": "b276",
              "type": "paragraph",
              "text": "Read through this example before you build. It follows Wendy as she maps her inventory into a working context map."
            },
            {
              "id": "b277",
              "type": "paragraph",
              "text": "Wendy has her five sources. She now asks of each: what job does this do, and how much of it does the reply actually need?"
            },
            {
              "id": "b278",
              "type": "paragraph",
              "text": "Her first pass over-supplies. She plans to paste the entire service-credit policy, the whole status page, and ten past replies. The result would bury the real signal and confuse the tool with irrelevant detail."
            },
            {
              "id": "b279",
              "type": "paragraph",
              "text": "She maps and trims. The service-credit policy becomes just the two clauses that govern outages, tagged \"facts, quote exactly.\" The status page becomes the current incident summary only, tagged \"live record.\" The ten past replies become the two clearest ones, tagged \"example, match this tone.\" The plan tier stays as a single field pulled from the ticket. Each source now has a job and a right-sized portion."
            },
            {
              "id": "b280",
              "type": "paragraph",
              "text": "The lesson for your own build: map each source to the job it does and cut it down to what the task needs. Right-sized, well-labeled context beats a large pile of raw material every time."
            },
            {
              "id": "b281",
              "type": "heading",
              "level": 2,
              "text": "Guided build on your own task · 35 minutes"
            },
            {
              "id": "b282",
              "type": "paragraph",
              "text": "Follow these steps on a real task from your own work. You should be able to work through them without stopping to ask a question."
            },
            {
              "id": "b283",
              "type": "paragraph",
              "text": "> 1. For each source in your inventory, write the one job it does in > the answer: supplies facts, shows tone, or supplies case specifics. > > 2. For each, decide the right-sized portion the task actually > needs, not the whole document. > > 3. Tag every factual source \"quote exactly\" so its facts are > never paraphrased loose. > > 4. Tag every example source with what the tool should learn from > it, such as tone or structure. > > 5. Note for each source how current it must be, and who keeps it > up to date. > > 6. Arrange the mapped sources in the order the answer uses them. > > 7. Save the source and context map into your template. This > completes your SUPPLY region."
            }
          ],
          "check": [
            {
              "id": "q284",
              "question": "What turns a source list into a source map?",
              "options": [
                "Making the list longer",
                "Deleting the examples",
                "Alphabetizing the sources",
                "Tying each source to the job it does and the portion the task needs"
              ],
              "correctIndex": 3,
              "rationale": "A map ties each source to the job it does and the right-sized portion the task needs."
            },
            {
              "id": "q285",
              "question": "What job does a worked example do in the context?",
              "options": [
                "Shows the tool the shape and tone of good output",
                "Supplies the exact facts the answer must be correct about",
                "Provides this one case's live specifics",
                "Sets the length limit"
              ],
              "correctIndex": 0,
              "rationale": "A worked example teaches by demonstration: it shows the shape and tone of good output."
            },
            {
              "id": "q286",
              "question": "Why trim a 40-page policy down to two clauses?",
              "options": [
                "Shorter is always more accurate",
                "The right context grounds the tool; a large pile buries the signal",
                "The tool cannot read long documents at all",
                "To hide the rest of the policy"
              ],
              "correctIndex": 1,
              "rationale": "The right context grounds the tool; a large pile buries the signal."
            }
          ],
          "checkSettings": {
            "mode": "practice",
            "timeLimitMin": 0,
            "attemptsAllowed": 0
          },
          "activity": {
            "title": "My Source And Context Map · SUPPLY",
            "instructions": [
              "Complete your canvas page for Day 6."
            ],
            "fields": [
              {
                "id": "pc-d6-f1",
                "label": "Source",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d6-f2",
                "label": "job",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d6-f3",
                "label": "portion needed",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d6-f4",
                "label": "currency / owner",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d6-f5",
                "label": "Facts to quote exactly",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d6-f6",
                "label": "Examples and what to learn from each",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "pc-d6-f7",
                "label": "Order the answer uses the sources in",
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
      "id": "pc-m-shape",
      "title": "SHAPE · Set the boundaries",
      "summary": "Standing rules applied to every answer, and a fallback for each one.",
      "lessons": [
        {
          "id": "pc-d7",
          "title": "Day 7: Constraints, policies, and risk boundaries",
          "topic": "Constraints, policies, and risk boundaries",
          "estimatedMinutes": 60,
          "summary": "Today you build: Guardrails checklist.",
          "blocks": [
            {
              "id": "b287",
              "type": "text",
              "tone": "info",
              "text": "SHAPE · Set the constraints, policies, and guardrails",
              "label": "Framework step"
            },
            {
              "id": "b288",
              "type": "heading",
              "level": 2,
              "text": "Concept · 10 minutes"
            },
            {
              "id": "b289",
              "type": "paragraph",
              "text": "You have told the AI what to do (SCOPE) and given it what it needs to know (SUPPLY). Today you set the boundaries it must not cross. This is the third region, SHAPE: the constraints, policies, and risk guardrails that keep output inside acceptable limits even when the task tempts it outside them."
            },
            {
              "id": "b290",
              "type": "paragraph",
              "text": "Guardrails are different from constraints in a single prompt. A prompt constraint shapes one answer. A guardrail is a standing rule the system applies to every answer: never promise a refund the policy does not allow, never state a fix time that is not confirmed, never share another customer's information, always route certain cases to a human. These are the rules that protect you when the tool is confidently wrong."
            },
            {
              "id": "b291",
              "type": "paragraph",
              "text": "SHAPE is where responsible use lives in this course. A context design without guardrails will produce fluent, well-grounded, on-tone answers that still commit you to things you cannot honor. The guardrails checklist is what stops that, and it is scrutinized closely when your canvas is reviewed."
            },
            {
              "id": "b292",
              "type": "heading",
              "level": 2,
              "text": "Worked example on Wendy · 10 minutes"
            },
            {
              "id": "b293",
              "type": "paragraph",
              "text": "Watch the Day 7 worked-example video before you build. It follows Wendy as she adds guardrails to her outage-reply context."
            },
            {
              "id": "b294",
              "type": "paragraph",
              "text": "Wendy's grounded, on-tone drafts are good, but she spots a danger. On a high-severity outage, the AI drafts a reply that promises a service credit \"within 24 hours.\" Her policy allows the credit, but never commits to a timeline. The draft is fluent, grounded, and about to over-promise."
            },
            {
              "id": "b295",
              "type": "paragraph",
              "text": "Her first fix is a prompt constraint: \"do not promise a timeline.\" It works on that reply, but she realizes it will not hold across every reply her team sends unless it is a standing rule, not a one-time instruction."
            },
            {
              "id": "b296",
              "type": "paragraph",
              "text": "She writes guardrails. Never state a credit timeline. Never promise a fix time that is not confirmed on the status page. Never reference another customer. Route any legal or data-breach mention to a human immediately. Each guardrail names the boundary and what to do instead. Now the boundary holds no matter how the ticket is worded."
            },
            {
              "id": "b297",
              "type": "paragraph",
              "text": "The lesson for your own build: turn every \"it must never do that\" into a written guardrail with a boundary and a fallback. Guardrails are the difference between an impressive draft and a safe one."
            },
            {
              "id": "b298",
              "type": "heading",
              "level": 2,
              "text": "Guided build on your own task · 35 minutes"
            },
            {
              "id": "b299",
              "type": "paragraph",
              "text": "Follow these steps on a real task from your own work. You should be able to work through them without stopping to ask a question."
            },
            {
              "id": "b300",
              "type": "paragraph",
              "text": "> 1. List the ways a fluent, grounded answer on your use case could > still cause harm: over-promising, exposing data, giving advice out of > scope. > > 2. Turn each into a guardrail: a standing rule that names the > boundary the system must not cross. > > 3. For each guardrail, write the fallback: what the system does > instead, such as \"say a human will confirm\" or \"route to a > manager.\" > > 4. Identify the cases that must always go to a human, and name > who. > > 5. Add any policy or compliance limit your task carries, stated as > a rule the output must respect. > > 6. Test one guardrail by feeding the system a case designed to > trip it, and confirm it holds. > > 7. Save the guardrails checklist into your template. This is your > SHAPE region."
            }
          ],
          "check": [
            {
              "id": "q301",
              "question": "How does a guardrail differ from a single prompt constraint?",
              "options": [
                "A guardrail is shorter",
                "A guardrail only affects tone",
                "A guardrail is a standing rule applied to every answer, not just one",
                "There is no difference"
              ],
              "correctIndex": 2,
              "rationale": "A guardrail is a standing rule applied to every answer, not a one-time prompt constraint."
            },
            {
              "id": "q302",
              "question": "A grounded, on-tone draft promises a refund timeline the policy never commits to. Which region catches this?",
              "options": [
                "SCOPE",
                "SUPPLY",
                "None; the draft is fine because it is grounded",
                "SHAPE"
              ],
              "correctIndex": 3,
              "rationale": "SHAPE catches a grounded, on-tone draft that still over-promises against policy."
            },
            {
              "id": "q303",
              "question": "What should every guardrail include besides the boundary?",
              "options": [
                "A fallback: what the system does instead",
                "A word count",
                "A new AI tool",
                "The full policy text"
              ],
              "correctIndex": 0,
              "rationale": "Every guardrail needs a fallback — what the system does instead of crossing the boundary."
            }
          ],
          "checkSettings": {
            "mode": "practice",
            "timeLimitMin": 0,
            "attemptsAllowed": 0
          },
          "activity": {
            "title": "My Guardrails Checklist · Canvas Region 3: SHAPE",
            "instructions": [
              "Complete your canvas page for Day 7."
            ],
            "fields": [
              {
                "id": "pc-d7-f1",
                "label": "Guardrail 1 (boundary)",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d7-f2",
                "label": "Fallback (what it does instead)",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "pc-d7-f3",
                "label": "Guardrail 2 (boundary)",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d7-f4",
                "label": "Fallback",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d7-f5",
                "label": "Guardrail 3 (boundary)",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d7-f6",
                "label": "Cases that must always go to a human, and who",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "pc-d7-f7",
                "label": "Policy / compliance limits the output must respect",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "pc-d7-f8",
                "label": "Edge case I tested a guardrail against, and result",
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
      "id": "pc-m-state",
      "title": "STATE · Manage tools, memory, and flow",
      "summary": "The tools and memory the task needs, and how work moves between them.",
      "lessons": [
        {
          "id": "pc-d8",
          "title": "Day 8: Tools, memory, and workflow state",
          "topic": "Tools, memory, and workflow state",
          "estimatedMinutes": 60,
          "summary": "Today you build: Context flow diagram.",
          "blocks": [
            {
              "id": "b304",
              "type": "text",
              "tone": "info",
              "text": "STATE · Define the tools, memory, and workflow state",
              "label": "Framework step"
            },
            {
              "id": "b305",
              "type": "heading",
              "level": 2,
              "text": "Concept · 10 minutes"
            },
            {
              "id": "b306",
              "type": "paragraph",
              "text": "Your canvas now scopes the task, supplies the knowledge, and shapes the boundaries. Today you handle what the system can reach and what it carries between steps. This is the fourth region, STATE: the tools the AI can use, the memory it keeps, and the workflow state that moves through the task."
            },
            {
              "id": "b307",
              "type": "paragraph",
              "text": "Tools are what the system can act on beyond the prompt: a lookup that pulls the current status, a system that fetches a ticket, a place it writes a draft. Memory is what carries across turns: the customer's earlier messages, the decisions already made. Workflow state is where the task is in its own sequence: drafted, reviewed, sent. Naming these keeps the system from re-asking what it already knows or acting on stale information."
            },
            {
              "id": "b308",
              "type": "paragraph",
              "text": "STATE is what turns a single clever answer into a workflow. A reply that ignores the customer's three earlier messages, or that fetches yesterday's status, is not grounded no matter how good the prompt. Mapping tools, memory, and state is how the canvas handles a real task from start to finish rather than one turn in isolation."
            },
            {
              "id": "b309",
              "type": "heading",
              "level": 2,
              "text": "Worked example on Wendy · 10 minutes"
            },
            {
              "id": "b310",
              "type": "paragraph",
              "text": "Read through this example before you build. It follows Wendy as she diagrams the tools, memory, and state her use case moves through."
            },
            {
              "id": "b311",
              "type": "paragraph",
              "text": "Wendy's outage reply is not one isolated answer. It sits in a flow: a ticket arrives, the current status is pulled, the reply is drafted, a human reviews, the reply is sent, and the ticket is updated. Each step needs something and hands something on."
            },
            {
              "id": "b312",
              "type": "paragraph",
              "text": "Her first version ignores state. The AI drafts a fresh reply every time, unaware the customer already wrote twice and unaware whether the last draft was approved. The result contradicts earlier messages and sometimes re-sends."
            },
            {
              "id": "b313",
              "type": "paragraph",
              "text": "She maps the flow. Tools: the status lookup (live), the ticket system (fetch history, write draft). Memory: the customer's prior messages in this ticket, the decision made last time. State: the ticket moves drafted then reviewed then sent, and the AI only drafts, never sends. The diagram shows what feeds each step and what each step passes on."
            },
            {
              "id": "b314",
              "type": "paragraph",
              "text": "The lesson for your own build: draw the task as a flow of steps, and for each step name the tool it uses, the memory it needs, and the state it changes. That is how context stays coherent across a whole task, not just one prompt."
            },
            {
              "id": "b315",
              "type": "heading",
              "level": 2,
              "text": "Guided build on your own task · 35 minutes"
            },
            {
              "id": "b316",
              "type": "paragraph",
              "text": "Follow these steps on a real task from your own work. You should be able to work through them without stopping to ask a question."
            },
            {
              "id": "b317",
              "type": "paragraph",
              "text": "> 1. Write the steps your use case moves through, from trigger to > finished output, in order. > > 2. For each step, name any tool the system uses: a lookup, a > fetch, a place it writes. > > 3. For each step, name the memory it needs from earlier: prior > messages, past decisions. > > 4. For each step, name the state it changes: what is true after > the step that was not before. > > 5. Mark the one step where a human acts, and confirm the AI never > skips past it. > > 6. Draw the steps as a simple left-to-right flow with what feeds > each and what it passes on. > > 7. Save the context flow diagram into your template. This is your > STATE region."
            }
          ],
          "check": [
            {
              "id": "q318",
              "question": "In this course, what does \"STATE\" cover?",
              "options": [
                "The task, role, and format",
                "The tools the AI can use, the memory it keeps, and the workflow state",
                "Only the guardrails",
                "The final knowledge check"
              ],
              "correctIndex": 1,
              "rationale": "STATE covers the tools the AI can use, the memory it keeps, and the workflow state."
            },
            {
              "id": "q319",
              "question": "A reply ignores the customer's three earlier messages in the same ticket. Which part of STATE is missing?",
              "options": [
                "A tool",
                "A guardrail",
                "Memory of prior turns",
                "A format"
              ],
              "correctIndex": 2,
              "rationale": "Ignoring earlier messages in the same ticket is a failure of memory across turns."
            },
            {
              "id": "q320",
              "question": "Why map tools, memory, and state as a flow rather than a single answer?",
              "options": [
                "Flows look more impressive",
                "Because the AI cannot answer single questions",
                "To make the prompt longer",
                "So context stays coherent across a whole task, not just one turn"
              ],
              "correctIndex": 3,
              "rationale": "Mapping tools, memory, and state as a flow keeps context coherent across the whole task."
            }
          ],
          "checkSettings": {
            "mode": "practice",
            "timeLimitMin": 0,
            "attemptsAllowed": 0
          },
          "activity": {
            "title": "My Context Flow · Canvas Region 4: STATE",
            "instructions": [
              "Complete your canvas page for Day 8."
            ],
            "fields": [
              {
                "id": "pc-d8-f1",
                "label": "Step 1",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d8-f2",
                "label": "tool",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d8-f3",
                "label": "memory",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d8-f4",
                "label": "state",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d8-f5",
                "label": "Step 2",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d8-f6",
                "label": "Step 3",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d8-f7",
                "label": "Step 4",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d8-f8",
                "label": "The step where a human acts",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d8-f9",
                "label": "What the AI is NOT allowed to do on its own",
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
      "id": "pc-m-sustain",
      "title": "SUSTAIN · Keep it reliable",
      "summary": "The review that keeps the design working after the day you built it.",
      "lessons": [
        {
          "id": "pc-d9",
          "title": "Day 9: Testing, evaluation, and human review",
          "topic": "Testing, evaluation, and human review",
          "estimatedMinutes": 60,
          "summary": "Today you build: Review rubric.",
          "blocks": [
            {
              "id": "b321",
              "type": "text",
              "tone": "info",
              "text": "SUSTAIN · Test, evaluate, and keep a human in the loop",
              "label": "Framework step"
            },
            {
              "id": "b322",
              "type": "heading",
              "level": 2,
              "text": "Concept · 10 minutes"
            },
            {
              "id": "b323",
              "type": "paragraph",
              "text": "Your canvas is nearly whole: scoped, supplied, shaped, and given state. Today you make it reliable over time with the fifth region, SUSTAIN: the testing, evaluation, and human review that keep the whole design honest as tasks and sources change."
            },
            {
              "id": "b324",
              "type": "paragraph",
              "text": "SUSTAIN is a repeatable review rubric you apply to the system's output, not a one-time check. It asks the questions that matter for your use case: is the answer grounded in the supplied sources, does it respect every guardrail, is it complete and correctly formatted, and did a human sign off where required. A design that passed last month can drift when a policy changes or a source goes stale; the rubric is what catches that drift."
            },
            {
              "id": "b325",
              "type": "paragraph",
              "text": "This is also where the human belongs permanently. Context engineering does not remove the person; it gives the person a clear, fast way to check and own the output. SUSTAIN names who reviews, what they check, and what happens when the answer fails. It is the region that lets you trust the canvas without trusting it blindly."
            },
            {
              "id": "b326",
              "type": "heading",
              "level": 2,
              "text": "Worked example on Wendy · 10 minutes"
            },
            {
              "id": "b327",
              "type": "paragraph",
              "text": "Watch the Day 9 worked-example video before you build. It follows Wendy as she builds the review rubric that keeps her canvas reliable."
            },
            {
              "id": "b328",
              "type": "paragraph",
              "text": "Wendy's canvas works today. But her service-credit policy changes quarterly, her status page format shifts, and her team grows. Without a review step, the design will quietly drift out of correctness."
            },
            {
              "id": "b329",
              "type": "paragraph",
              "text": "Her first idea is a vague intention: \"we'll keep an eye on it.\" That is the SUSTAIN equivalent of a thin prompt. It leaves every check to a busy moment, which is exactly when checks get skipped."
            },
            {
              "id": "b330",
              "type": "paragraph",
              "text": "She writes a real rubric. Every drafted reply is checked on five points before it sends: grounded in the current sources, every guardrail respected, complete, correctly formatted, and human-approved. She names who reviews (the on-shift lead), how often the sources are re-verified (monthly), and what happens on a fail (return with the reason). The rubric is short enough to run in seconds and specific enough to catch drift."
            },
            {
              "id": "b331",
              "type": "paragraph",
              "text": "The lesson for your own build: turn \"we'll watch it\" into a named rubric with specific checks, a named reviewer, a re-verification cadence, and a defined fail path. That is what sustains a context design past its first good week."
            },
            {
              "id": "b332",
              "type": "heading",
              "level": 2,
              "text": "Guided build on your own task · 35 minutes"
            },
            {
              "id": "b333",
              "type": "paragraph",
              "text": "Follow these steps on a real task from your own work. You should be able to work through them without stopping to ask a question."
            },
            {
              "id": "b334",
              "type": "paragraph",
              "text": "> 1. Write the five or so checks every output of your use case must > pass before it is used. > > 2. Make one check \"grounded in the current supplied sources\" and > one \"every guardrail respected.\" > > 3. Name the human reviewer and exactly what they sign off on. > > 4. Set how often you re-verify that your sources are still > current, and who does it. > > 5. Define the fail path: what happens when an output fails a > check. > > 6. Run your full canvas end to end on one real, sanitized case and > record whether it passed the rubric. > > 7. Save the review rubric into your template. This completes your > SUSTAIN region and your canvas."
            }
          ],
          "check": [
            {
              "id": "q335",
              "question": "What is the SUSTAIN region?",
              "options": [
                "A repeatable review rubric that keeps the design reliable over time",
                "A one-time check you run once and file away",
                "The prompt itself",
                "A list of tools"
              ],
              "correctIndex": 0,
              "rationale": "SUSTAIN is a repeatable review rubric that keeps the design reliable over time."
            },
            {
              "id": "q336",
              "question": "Why does a context design need re-verification even after it works?",
              "options": [
                "AI tools expire",
                "Sources and policies change, so a design can drift out of correctness",
                "The prompt gets shorter over time",
                "It does not; once it works it always works"
              ],
              "correctIndex": 1,
              "rationale": "Sources and policies change, so a design can drift out of correctness and must be re-verified."
            },
            {
              "id": "q337",
              "question": "Where does the human belong in a finished context design?",
              "options": [
                "Removed entirely, since the context is complete",
                "Watching the AI decide, but not owning the result",
                "Permanently in SUSTAIN, reviewing and owning the output where required",
                "Only on the first day"
              ],
              "correctIndex": 2,
              "rationale": "The human stays permanently in SUSTAIN, reviewing and owning the output where required."
            }
          ],
          "checkSettings": {
            "mode": "practice",
            "timeLimitMin": 0,
            "attemptsAllowed": 0
          },
          "activity": {
            "title": "My Review Rubric · Canvas Region 5: SUSTAIN",
            "instructions": [
              "Complete your canvas page for Day 9."
            ],
            "fields": [
              {
                "id": "pc-d9-f1",
                "label": "Check 1: grounded in current sources",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "pc-d9-f2",
                "label": "Check 2: every guardrail respected",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "pc-d9-f3",
                "label": "Check 3: complete",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d9-f4",
                "label": "Check 4: correctly formatted",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d9-f5",
                "label": "Check 5: human-approved",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d9-f6",
                "label": "Who reviews and signs off",
                "multiline": false,
                "placeholder": ""
              },
              {
                "id": "pc-d9-f7",
                "label": "How often sources are re-verified, and by whom",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "pc-d9-f8",
                "label": "Fail path (what happens on a failed check)",
                "multiline": true,
                "placeholder": ""
              },
              {
                "id": "pc-d9-f9",
                "label": "End-to-end test case and result",
                "multiline": true,
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
        "id": "q338",
        "question": "Which four elements make up a useful prompt in this course?",
        "options": [
          "Task, role, constraints, and format",
          "Length, speed, tone, and topic",
          "Who, what, when, and where",
          "Question, source, answer, and review"
        ],
        "correctIndex": 0,
        "rationale": "The four elements are task, role, constraints, and format."
      },
      {
        "id": "q339",
        "question": "A well-scoped prompt keeps stating a company policy incorrectly, and rewording does not help. What have you found?",
        "options": [
          "A formatting error",
          "The prompt ceiling: knowledge the tool cannot supply",
          "A prompt that needs to be longer",
          "A tool that is simply broken"
        ],
        "correctIndex": 1,
        "rationale": "A clean prompt that still states a policy wrong has hit the prompt ceiling: missing knowledge."
      },
      {
        "id": "q340",
        "question": "What does even a perfectly engineered prompt still fail to give the AI?",
        "options": [
          "A clear task and format",
          "A defined role",
          "Knowledge of your policies, documents, and records",
          "A length limit"
        ],
        "correctIndex": 2,
        "rationale": "No instruction supplies your policies, documents, or records; they live outside the model."
      },
      {
        "id": "q341",
        "question": "What signals that a task needs context engineering, not just a better prompt?",
        "options": [
          "The task is long",
          "The task is new to you",
          "The task is disliked",
          "A correct answer depends on information the tool cannot know on its own"
        ],
        "correctIndex": 3,
        "rationale": "Dependence on information the tool cannot know is the signal of a context use case."
      },
      {
        "id": "q342",
        "question": "What is context engineering, in this course's terms?",
        "options": [
          "Assembling the sources, examples, limits, and review an AI needs around the prompt",
          "Choosing which AI tool to buy",
          "Writing longer prompts until the answer improves",
          "Deleting the chat after each use"
        ],
        "correctIndex": 0,
        "rationale": "Context engineering assembles sources, examples, limits, and review around the prompt."
      },
      {
        "id": "q343",
        "question": "Why is \"policies\" a weak entry in a context inventory?",
        "options": [
          "Policies never matter to AI",
          "It names a category, not a specific source you could point to and connect",
          "It is too specific",
          "Policies cannot contain sensitive data"
        ],
        "correctIndex": 1,
        "rationale": "\"Policies\" is a category, not a specific, connectable source."
      },
      {
        "id": "q344",
        "question": "What job does a worked example do in the supplied context?",
        "options": [
          "It sets the length limit",
          "It supplies the live specifics of this one case",
          "It shows the tool the shape and tone of good output",
          "It replaces the need for a prompt"
        ],
        "correctIndex": 2,
        "rationale": "A worked example shows the tool the shape and tone of good output."
      },
      {
        "id": "q345",
        "question": "Why trim a long policy down to the clauses the answer depends on?",
        "options": [
          "The tool cannot read long documents at all",
          "Shorter text is always more accurate",
          "To hide the rest of the policy",
          "The right context grounds the tool; a large pile buries the signal"
        ],
        "correctIndex": 3,
        "rationale": "The right context grounds the tool; a large pile buries the signal."
      },
      {
        "id": "q346",
        "question": "How does a guardrail differ from a single prompt constraint?",
        "options": [
          "A guardrail is a standing rule applied to every answer, not just one",
          "A guardrail is shorter",
          "A guardrail only affects tone",
          "There is no difference"
        ],
        "correctIndex": 0,
        "rationale": "A guardrail is a standing rule on every answer, not a one-time constraint."
      },
      {
        "id": "q347",
        "question": "A grounded, on-tone draft promises a refund timeline the policy never commits to. Which region catches this?",
        "options": [
          "SCOPE",
          "SHAPE",
          "SUPPLY",
          "STATE"
        ],
        "correctIndex": 1,
        "rationale": "SHAPE catches a grounded draft that over-promises against policy."
      },
      {
        "id": "q348",
        "question": "What should every guardrail include besides the boundary it sets?",
        "options": [
          "A word count",
          "The full policy text",
          "A fallback: what the system does instead",
          "A new AI tool"
        ],
        "correctIndex": 2,
        "rationale": "Every guardrail needs a fallback: what the system does instead."
      },
      {
        "id": "q349",
        "question": "A reply ignores the customer's earlier messages in the same ticket. Which part of STATE is missing?",
        "options": [
          "A format",
          "A guardrail",
          "A tool",
          "Memory of prior turns"
        ],
        "correctIndex": 3,
        "rationale": "Ignoring earlier messages in the ticket is a memory failure in STATE."
      },
      {
        "id": "q350",
        "question": "What is the SUSTAIN region?",
        "options": [
          "A repeatable review rubric that keeps the design reliable over time",
          "The prompt itself",
          "A one-time check you run once and file away",
          "A list of tools"
        ],
        "correctIndex": 0,
        "rationale": "SUSTAIN is a repeatable review rubric that keeps the design reliable over time."
      },
      {
        "id": "q351",
        "question": "Why does a context design need re-verification even after it works?",
        "options": [
          "It does not; once it works it always works",
          "Sources and policies change, so a design can drift out of correctness",
          "AI tools expire on a fixed date",
          "The prompt gets shorter over time"
        ],
        "correctIndex": 1,
        "rationale": "Sources and policies change, so designs drift and need re-verification."
      },
      {
        "id": "q352",
        "question": "Where does the human belong in a finished context design?",
        "options": [
          "Removed entirely, since the context is complete",
          "Only on the first day",
          "Permanently in SUSTAIN, reviewing and owning the output where required",
          "Watching the AI decide, but not owning the result"
        ],
        "correctIndex": 2,
        "rationale": "The human stays permanently in SUSTAIN, owning the reviewed output."
      },
      {
        "id": "q353",
        "question": "In what order does the 5S Context Design Canvas run?",
        "options": [
          "SUSTAIN, STATE, SHAPE, SUPPLY, SCOPE",
          "SUPPLY, SCOPE, STATE, SHAPE, SUSTAIN",
          "SCOPE, SHAPE, SUPPLY, SUSTAIN, STATE",
          "SCOPE, SUPPLY, SHAPE, STATE, SUSTAIN"
        ],
        "correctIndex": 3,
        "rationale": "The canvas runs SCOPE, SUPPLY, SHAPE, STATE, SUSTAIN, in that order."
      }
    ],
    "timeLimitMin": 30,
    "attemptsAllowed": 3
  }
} as const;

export function buildPromptContextCourse(createdBy: string, at: string): Course {
  return { ...(COURSE as unknown as Course), createdBy, createdAt: at, updatedAt: at };
}
