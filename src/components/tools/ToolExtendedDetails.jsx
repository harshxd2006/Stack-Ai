import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToolExtendedDetails = ({ tool }) => {
  const [activeFaq, setActiveFaq] = useState(null);

  // Dynamic Mock Data Map
  const mockExtendedData = {
    'chatgpt': {
      overviewText: 'ChatGPT is a highly advanced language model developed by OpenAI. It excels at generating human-like text, understanding context, and performing complex reasoning tasks across multiple domains. It provides an intuitive chat interface to seamlessly integrate conversational AI into daily workflows.',
      forText: 'Professionals, developers, writers, and students seeking a powerful conversational assistant to accelerate text-based tasks.',
      whyText: 'It offers industry-leading reasoning capabilities, extensive general knowledge, and supports custom instructions for personalized output.',
      features: [
        { title: 'Conversational Reasoning', description: 'Maintains context over long conversations with advanced logic.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg> },
        { title: 'Data Analysis', description: 'Can execute Python code to analyze datasets and create charts.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
        { title: 'Web Browsing', description: 'Accesses the live internet to retrieve up-to-date information.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg> },
        { title: 'Custom GPTs', description: 'Create tailored versions of the AI for specific, repeatable tasks.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg> }
      ],
      prosCons: {
        pros: ['Highly versatile across many domains', 'Extremely fast response generation', 'Robust API available for developers', 'Vast community and integration ecosystem'],
        cons: ['Information can sometimes be hallucinated', 'Strict content filters can be restrictive', 'Paid tier required for latest model access']
      },
      useCases: [
        { role: 'For Developers', benefits: ['Generate code snippets and architecture plans', 'Debug complex system errors', 'Write extensive technical documentation'] },
        { role: 'For Writers', benefits: ['Brainstorm story structures and outlines', 'Draft articles and blog posts quickly', 'Proofread and edit existing content'] },
        { role: 'For Analysts', benefits: ['Analyze raw datasets using Python', 'Format unorganized data into tables', 'Generate data summaries automatically'] }
      ],
      pricingPlans: [
        { name: 'Free', price: '$0', period: 'forever', features: ['GPT-3.5 access', 'Standard response speed', 'Limited data analysis'], highlighted: false },
        { name: 'Plus', price: '$20', period: 'per month', features: ['GPT-4 access', 'Faster response speed', 'Priority access during peak times', 'Create custom GPTs'], highlighted: true },
        { name: 'Team', price: '$25', period: 'per user/month', features: ['Everything in Plus', 'Higher message limits', 'Admin console and billing management', 'Workspace data exclusion from training'], highlighted: false }
      ],
      integrations: ['Slack', 'Microsoft Teams', 'Zapier', 'API', 'Visual Studio Code'],
      steps: [
        { step: 1, title: 'Create an Account', description: 'Sign up on the OpenAI platform using email or single sign-on.' },
        { step: 2, title: 'Start a Chat', description: 'Enter a prompt or question into the primary input interface.' },
        { step: 3, title: 'Refine the Output', description: 'Provide follow-up instructions to shape the model\'s response.' },
        { step: 4, title: 'Export or Save', description: 'Copy the generated text, export code snippets, or share the chat link.' }
      ],
      faqs: [
        { question: 'Is ChatGPT free to use?', answer: 'Yes, a free tier is available using the GPT-3.5 model. Premium features require a Plus subscription.' },
        { question: 'Is my data used to train the model?', answer: 'For Free and Plus users, chat data may be used for training unless you opt out in your settings. Team and Enterprise data is excluded by default.' },
        { question: 'Can ChatGPT access the internet?', answer: 'Yes, users on premium tiers can use the web browsing feature to search for current information.' }
      ]
    },
    'midjourney': {
      overviewText: 'Midjourney is a cutting-edge generative AI program that creates stunning, highly detailed images from natural language descriptions. Accessible primarily through Discord, it is renowned for its artistic quality and distinct aesthetic styling.',
      forText: 'Designers, concept artists, marketers, and hobbyists looking to generate high-quality visual assets quickly.',
      whyText: 'It consistently outperforms competitors in artistic interpretation, lighting fidelity, and texture realism.',
      features: [
        { title: 'Text-to-Image Generation', description: 'Create high-resolution images from simple text prompts.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
        { title: 'Style Tuning', description: 'Emulate specific artistic styles, mediums, or camera lenses.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg> },
        { title: 'Image Upscaling', description: 'Enhance and upscale generations to print-ready resolutions.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg> },
        { title: 'Inpainting', description: 'Modify specific regions of an image without altering the whole.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> }
      ],
      prosCons: {
        pros: ['Unmatched artistic quality and style rendering', 'Excellent at understanding complex lighting', 'Continuous rapid model updates'],
        cons: ['Requires using Discord as the primary interface', 'No free tier available anymore', 'Prompting syntax can be complex for beginners']
      },
      useCases: [
        { role: 'For Designers', benefits: ['Generate rapid concept art and moodboards', 'Create unique textures and backgrounds', 'Explore alternative color palettes'] },
        { role: 'For Marketers', benefits: ['Create custom illustrations for campaigns', 'Generate social media graphics without stock photos', 'Develop distinct brand imagery'] },
        { role: 'For Developers', benefits: ['Generate assets for games and prototypes', 'Create app icons and UI placeholders', 'Design creative cover images for articles'] }
      ],
      pricingPlans: [
        { name: 'Basic', price: '$10', period: 'per month', features: ['~200 GPU minutes/month', 'Access to member gallery', 'Commercial usage rights'], highlighted: false },
        { name: 'Standard', price: '$30', period: 'per month', features: ['15 hours fast GPU time', 'Unlimited relax GPU time', 'Access to member gallery', 'Commercial usage rights'], highlighted: true },
        { name: 'Pro', price: '$60', period: 'per month', features: ['30 hours fast GPU time', 'Stealth image generation', 'Maximum concurrent jobs', 'Commercial usage rights'], highlighted: false }
      ],
      integrations: ['Discord'],
      steps: [
        { step: 1, title: 'Join the Discord', description: 'Sign up for Discord and join the official Midjourney server.' },
        { step: 2, title: 'Subscribe', description: 'Type /subscribe in a channel to select a billing plan.' },
        { step: 3, title: 'Use /imagine', description: 'Go to a newbie channel or DM the bot and use the /imagine command.' },
        { step: 4, title: 'Upscale and Save', description: 'Use the U buttons to upscale your favorite variation, then save the image.' }
      ],
      faqs: [
        { question: 'Do I own the images I create?', answer: 'Paid members own the assets they create under the General Commercial Terms.' },
        { question: 'Is there a free trial?', answer: 'Due to high demand, free trials are currently suspended.' },
        { question: 'Do I have to use Discord?', answer: 'Currently, generation is primarily done via the Discord bot, though a web interface is in alpha for power users.' }
      ]
    },
    'github-copilot': {
      overviewText: 'GitHub Copilot is an AI pair programmer that offers autocomplete-style suggestions as you code. It analyzes the context of your repository and the file you are editing to provide relevant, syntactically correct code blocks.',
      forText: 'Software engineers, data scientists, and developers looking to accelerate coding and reduce boilerplate.',
      whyText: 'It is deeply integrated into popular IDEs and backed by OpenAI\'s Codex model, offering unparalleled context awareness.',
      features: [
        { title: 'Code Autocomplete', description: 'Generates multi-line functions and boilerplate code instantly.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> },
        { title: 'Chat Interface', description: 'Ask questions about your codebase directly within your IDE.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg> },
        { title: 'Documentation Generation', description: 'Automatically write comments and docs for complex functions.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
        { title: 'Test Generation', description: 'Create unit tests based on your function logic.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> }
      ],
      prosCons: {
        pros: ['Seamless integration with major IDEs', 'Understands context from multiple open tabs', 'Significantly speeds up routine coding tasks'],
        cons: ['Can occasionally suggest insecure code', 'Requires a paid subscription after trial', 'Struggles with highly obscure frameworks']
      },
      useCases: [
        { role: 'For Frontend Developers', benefits: ['Generate React components and CSS classes', 'Write boilerplate API fetching logic', 'Debug complex state issues'] },
        { role: 'For Backend Developers', benefits: ['Generate database schemas and SQL queries', 'Write comprehensive unit tests', 'Implement complex sorting algorithms'] },
        { role: 'For Data Scientists', benefits: ['Generate Python pandas data manipulation code', 'Create matplotlib visualization scripts', 'Format Jupyter notebooks'] }
      ],
      pricingPlans: [
        { name: 'Individual', price: '$10', period: 'per month', features: ['Copilot in your IDE', 'Copilot Chat', 'Security vulnerability filter'], highlighted: false },
        { name: 'Business', price: '$19', period: 'per user/month', features: ['Everything in Individual', 'Organization-wide policy management', 'Enterprise-grade privacy'], highlighted: true },
        { name: 'Enterprise', price: '$39', period: 'per user/month', features: ['Everything in Business', 'Chat customized to your codebase', 'Fine-tuned models'], highlighted: false }
      ],
      integrations: ['VS Code', 'Visual Studio', 'JetBrains IDEs', 'Neovim'],
      steps: [
        { step: 1, title: 'Install Extension', description: 'Download the GitHub Copilot extension for your preferred IDE.' },
        { step: 2, title: 'Sign In', description: 'Authenticate with your GitHub account containing an active subscription.' },
        { step: 3, title: 'Start Coding', description: 'Begin typing a function name or comment to trigger suggestions.' },
        { step: 4, title: 'Accept Suggestions', description: 'Press Tab to accept a suggestion or cycle through alternatives.' }
      ],
      faqs: [
        { question: 'Is Copilot free for students?', answer: 'Yes, GitHub Copilot is free for verified students, teachers, and maintainers of popular open source projects.' },
        { question: 'Does Copilot steal code?', answer: 'Copilot is trained on public code, but includes filters to block suggestions matching public code exactly.' },
        { question: 'Does it work offline?', answer: 'No, an active internet connection is required to communicate with the Codex model.' }
      ]
    },
    'notion-ai': {
      overviewText: 'Notion AI is a powerful writing assistant tightly integrated into the Notion workspace. It helps you write, edit, summarize, and brainstorm without ever leaving your documents.',
      forText: 'Teams, product managers, writers, and students who use Notion as their primary workspace.',
      whyText: 'Because it lives natively in your docs, it can instantly format, rewrite, or expand on your existing workspace data without context switching.',
      features: [
        { title: 'Document Summarization', description: 'Instantly summarize long meeting notes or research documents.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
        { title: 'Tone Adjustment', description: 'Rewrite text to be more professional, casual, or concise.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> },
        { title: 'Action Item Extraction', description: 'Automatically pull out tasks from meeting transcripts.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> },
        { title: 'Brainstorming', description: 'Generate ideas, outlines, and first drafts from a blank page.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> }
      ],
      prosCons: {
        pros: ['Zero context switching required', 'Excellent integration with Notion blocks and tables', 'Affordable add-on for existing users'],
        cons: ['Requires using Notion as your primary tool', 'Not as versatile for coding or complex math', 'Text generation can feel generic']
      },
      useCases: [
        { role: 'For Product Managers', benefits: ['Generate PRDs from bullet points', 'Summarize customer feedback interviews', 'Create launch checklists'] },
        { role: 'For Marketers', benefits: ['Draft blog posts and social copy', 'Brainstorm campaign concepts', 'Fix grammar and adjust tone'] },
        { role: 'For Students', benefits: ['Summarize lecture notes', 'Generate study guides', 'Improve essay structure'] }
      ],
      pricingPlans: [
        { name: 'Add-on', price: '$8', period: 'per user/month', features: ['Unlimited AI responses', 'Integrated into all workspaces', 'Priority support'], highlighted: true }
      ],
      integrations: ['Notion'],
      steps: [
        { step: 1, title: 'Open Notion', description: 'Create a new page or open an existing document.' },
        { step: 2, title: 'Trigger AI', description: 'Press Space on a new line or highlight text and click "Ask AI".' },
        { step: 3, title: 'Provide Prompt', description: 'Tell the AI what to write, summarize, or edit.' },
        { step: 4, title: 'Insert or Replace', description: 'Choose to insert the generated text, replace your selection, or try again.' }
      ],
      faqs: [
        { question: 'Is Notion AI free?', answer: 'Users get a limited number of free AI responses to try it out. Afterward, an add-on subscription is required.' },
        { question: 'Does it read all my workspaces?', answer: 'Notion AI only processes the text on the specific page you are actively querying.' }
      ]
    },
    'cursor': {
      overviewText: 'Cursor is a fork of VS Code built specifically for AI-assisted programming. It brings powerful models like GPT-4 and Claude 3.5 Sonnet directly into the editor, allowing you to generate entire files, refactor large codebases, and debug errors automatically.',
      forText: 'Software engineers, frontend/backend developers, and indie hackers looking to 10x their coding velocity.',
      whyText: 'Unlike standard extensions, Cursor is deeply integrated into the editor core, allowing it to read your entire codebase and apply multi-file edits simultaneously.',
      features: [
        { title: 'Composer', description: 'Generate entire applications or multi-file features from a single prompt.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
        { title: 'Codebase Context', description: 'The AI can search and understand your entire repository automatically.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg> },
        { title: 'Auto-Debug', description: 'One-click error fixing based on terminal outputs or linter errors.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> },
        { title: 'VS Code Compatibility', description: 'Supports all standard VS Code extensions, themes, and keybindings.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg> }
      ],
      prosCons: {
        pros: ['The most powerful AI coding assistant currently available', 'Can edit multiple files simultaneously', 'Familiar VS Code interface makes transition seamless'],
        cons: ['Requires downloading a completely separate editor application', 'High resource usage on large codebases', 'Premium features are strictly gated behind subscriptions']
      },
      useCases: [
        { role: 'For Frontend Developers', benefits: ['Generate complex React components from UI mockups', 'Refactor massive CSS files', 'Migrate frameworks automatically'] },
        { role: 'For Backend Developers', benefits: ['Generate boilerplate API routes and database schemas', 'Write extensive automated test suites', 'Debug tricky container/Docker issues'] },
        { role: 'For Indie Hackers', benefits: ['Build MVPs 10x faster', 'Learn new languages and frameworks on the fly', 'Handle full-stack logic single-handedly'] }
      ],
      pricingPlans: [
        { name: 'Basic', price: 'Free', period: 'forever', features: ['Basic autocomplete', 'Standard models only', 'VS Code extension compatibility'], highlighted: false },
        { name: 'Pro', price: '$20', period: 'per month', features: ['500 fast premium requests', 'Unlimited slow premium requests', 'Composer access', 'Claude 3.5 Sonnet & GPT-4o'], highlighted: true },
        { name: 'Business', price: '$40', period: 'per user/month', features: ['Everything in Pro', 'Centralized billing', 'Enforced privacy mode', 'Priority support'], highlighted: false }
      ],
      integrations: ['GitHub', 'VS Code Extensions', 'Terminal', 'Docker'],
      steps: [
        { step: 1, title: 'Download Cursor', description: 'Install the desktop application from the official Cursor website.' },
        { step: 2, title: 'Import Settings', description: 'Instantly import your existing VS Code extensions, themes, and shortcuts.' },
        { step: 3, title: 'Open a Project', description: 'Open your codebase and let Cursor index the files for context.' },
        { step: 4, title: 'Use Ctrl+K', description: 'Press Ctrl+K (or Cmd+K) to prompt the AI to generate or edit code.' }
      ],
      faqs: [
        { question: 'Do I have to abandon VS Code?', answer: 'Cursor is a standalone app, but because it is a fork of VS Code, the interface and extension ecosystem are virtually identical.' },
        { question: 'Is my codebase private?', answer: 'Yes, Cursor offers a Privacy Mode setting where none of your code is logged or stored.' },
        { question: 'Which AI models does it use?', answer: 'Cursor currently supports top-tier models including Claude 3.5 Sonnet, GPT-4o, and specialized autocomplete models.' }
      ]
    },
    'claude': {
      overviewText: 'Claude is a next-generation AI assistant developed by Anthropic. It is highly regarded for its exceptional writing capabilities, massive context window, and nuanced understanding of complex prompts with a strong focus on safety and constitutional AI.',
      forText: 'Writers, analysts, researchers, and developers who need to process massive amounts of text or require highly nuanced writing.',
      whyText: 'Its enormous context window allows you to upload entire books, codebases, or financial reports and query them instantly with near-perfect recall.',
      features: [
        { title: 'Massive Context Window', description: 'Process up to 200,000 tokens (hundreds of pages) in a single prompt.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
        { title: 'Artifacts UI', description: 'View generated code, websites, and documents in a dedicated side panel.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg> },
        { title: 'Nuanced Writing', description: 'Generates text that feels significantly more human and less robotic.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> },
        { title: 'Advanced Coding', description: 'Claude 3.5 Sonnet ranks among the best models globally for software engineering.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> }
      ],
      prosCons: {
        pros: ['The best model available for creative and nuanced writing', 'Artifacts UI makes visualizing code/SVG incredibly easy', 'Massive context window with perfect recall'],
        cons: ['Usage limits on the Pro plan can be restrictive', 'Lacks native image generation capabilities', 'Strict safety filters can sometimes block harmless queries']
      },
      useCases: [
        { role: 'For Writers', benefits: ['Edit and refine manuscripts without losing your voice', 'Brainstorm complex narrative structures', 'Draft highly professional email copy'] },
        { role: 'For Researchers', benefits: ['Summarize 100-page academic papers instantly', 'Extract specific data points from massive datasets', 'Compare multiple documents side-by-side'] },
        { role: 'For Developers', benefits: ['Generate interactive React components via Artifacts', 'Refactor massive legacy files', 'Debug complex logic errors'] }
      ],
      pricingPlans: [
        { name: 'Free', price: '$0', period: 'forever', features: ['Claude 3.5 Sonnet access', 'Standard usage limits', 'Web interface access'], highlighted: false },
        { name: 'Pro', price: '$20', period: 'per month', features: ['5x more usage limits', 'Access to Claude 3 Opus', 'Priority during high traffic', 'Early access to features'], highlighted: true },
        { name: 'Team', price: '$30', period: 'per user/month', features: ['Everything in Pro', 'Higher usage limits per user', 'Central billing & administration', 'Workspace management'], highlighted: false }
      ],
      integrations: ['API', 'Slack', 'Cursor', 'Google Docs (via extensions)'],
      steps: [
        { step: 1, title: 'Sign Up', description: 'Create an account on the Anthropic Claude interface.' },
        { step: 2, title: 'Upload Context', description: 'Attach massive PDFs, text files, or codebases if needed.' },
        { step: 3, title: 'Provide Instructions', description: 'Give Claude detailed instructions on how to process the information.' },
        { step: 4, title: 'View Artifacts', description: 'If asking for code or designs, interact with them directly in the right-hand Artifacts panel.' }
      ],
      faqs: [
        { question: 'What are Artifacts?', answer: 'Artifacts is a UI feature that allows Claude to render code, SVGs, websites, and documents in a dedicated window next to the chat.' },
        { question: 'How big is the context window?', answer: 'Claude can process up to 200,000 tokens, which is roughly equivalent to a 500-page book.' },
        { question: 'Does Claude generate images?', answer: 'No, Claude is currently focused strictly on text, code, and vision (analyzing images you upload).' }
      ]
    },
    'runway': {
      overviewText: 'Runway is an applied AI research company shaping the next era of art, entertainment and human creativity. Their flagship Gen-2 and Gen-3 models allow users to generate highly realistic, cinematic videos directly from text prompts, images, or existing videos.',
      forText: 'Filmmakers, video editors, content creators, and agencies looking to generate or edit video content at scale.',
      whyText: 'It is widely considered the industry standard for AI video generation, offering precise camera controls, motion brushes, and exceptional cinematic quality.',
      features: [
        { title: 'Text to Video', description: 'Generate high-fidelity, cinematic video clips simply by typing a descriptive prompt.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
        { title: 'Motion Brush', description: 'Paint over specific areas of a static image to add targeted movement (like flowing water or smoke).', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg> },
        { title: 'Video to Video', description: 'Alter the style of an existing video clip entirely using text prompts.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg> },
        { title: 'Advanced Camera Controls', description: 'Specify pan, tilt, zoom, and roll to direct the AI camera like a real cinematographer.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg> }
      ],
      prosCons: {
        pros: ['Industry-leading video generation quality (Gen-3 Alpha)', 'Granular control over camera movement and object motion', 'Comprehensive suite of over 30 AI magic tools'],
        cons: ['High credit cost per generation', 'Generating long, cohesive scenes is still difficult', 'Requires powerful hardware for local training (though cloud is fast)']
      },
      useCases: [
        { role: 'For Filmmakers', benefits: ['Generate B-roll and establishing shots instantly', 'Create storyboards and previz mockups', 'Apply stylized visual effects'] },
        { role: 'For Marketers', benefits: ['Produce highly engaging social media video ads', 'Animate static product photography', 'Iterate video campaigns rapidly'] },
        { role: 'For Animators', benefits: ['Create complex background animations', 'Experiment with unique visual styles', 'Accelerate the rendering pipeline'] }
      ],
      pricingPlans: [
        { name: 'Basic', price: 'Free', period: 'forever', features: ['125 credits', 'Gen-2 access', 'Up to 3 projects'], highlighted: false },
        { name: 'Standard', price: '$15', period: 'per user/month', features: ['625 credits/month', 'Gen-3 Alpha access', 'Upscale resolution', 'Watermark removal'], highlighted: true },
        { name: 'Pro', price: '$35', period: 'per user/month', features: ['2250 credits/month', 'Unlimited video generations', 'Custom video training', 'Priority rendering'], highlighted: false }
      ],
      integrations: ['Adobe Premiere Pro', 'After Effects'],
      steps: [
        { step: 1, title: 'Select a Model', description: 'Choose between Gen-2, Gen-3 Alpha, or a specialized magic tool.' },
        { step: 2, title: 'Provide Input', description: 'Upload a reference image, an existing video, or simply type a detailed prompt.' },
        { step: 3, title: 'Adjust Settings', description: 'Set camera motion, aspect ratio, and use the motion brush to highlight active areas.' },
        { step: 4, title: 'Generate & Export', description: 'Generate the clip, upscale it if necessary, and export the final MP4.' }
      ],
      faqs: [
        { question: 'What is the difference between Gen-2 and Gen-3?', answer: 'Gen-3 Alpha represents a massive leap in photorealism, consistency, and prompt adherence compared to Gen-2.' },
        { question: 'Can I use the videos commercially?', answer: 'Yes, users on paid plans have full commercial rights to the videos they generate.' },
        { question: 'How long can the generated videos be?', answer: 'Currently, generations range from 4 to 10 seconds per prompt, which can be extended or stitched together.' }
      ]
    },
    'synthesia': {
      overviewText: 'Synthesia is a leading AI video generation platform that allows you to create professional videos with lifelike AI avatars just by typing text. It eliminates the need for cameras, actors, or microphones.',
      forText: 'Corporate trainers, marketers, educators, and HR teams who need to scale localized video content production.',
      whyText: 'It offers the most realistic human avatars, lip-syncing, and multi-language support (120+ languages) on the market.',
      features: [
        { title: 'AI Avatars', description: 'Choose from over 160 diverse, hyper-realistic AI actors.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
        { title: 'Text-to-Speech', description: 'Convert text into high-quality voiceovers in 120+ languages and accents.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg> },
        { title: 'Custom Avatars', description: 'Create a digital twin of yourself or a company spokesperson.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { title: 'Video Templates', description: 'Start quickly with professionally designed templates for presentations and tutorials.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg> }
      ],
      prosCons: {
        pros: ['Drastically reduces video production costs and time', 'Exceptional multi-language and accent support', 'Very intuitive slide-based interface'],
        cons: ['Avatars can still occasionally fall into the uncanny valley', 'Limited control over avatar body language (mostly head and shoulders)', 'Pricing is based on minute quotas']
      },
      useCases: [
        { role: 'For HR & Training', benefits: ['Create onboarding videos easily', 'Translate training materials for global teams', 'Update compliance videos without reshooting'] },
        { role: 'For Marketers', benefits: ['Produce explainer videos rapidly', 'A/B test localized ad creatives', 'Create personalized sales outreach videos'] },
        { role: 'For Educators', benefits: ['Develop engaging e-learning modules', 'Provide consistent lecture delivery', 'Scale course content globally'] }
      ],
      pricingPlans: [
        { name: 'Starter', price: '$22', period: 'per month', features: ['120 minutes of video/year', '70+ AI avatars', 'Standard templates'], highlighted: false },
        { name: 'Creator', price: '$67', period: 'per month', features: ['360 minutes of video/year', 'Premium avatars', 'Custom fonts & branding'], highlighted: true },
        { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited video minutes', '1-click translations', 'Dedicated success manager', 'Enterprise-grade security'], highlighted: false }
      ],
      integrations: ['PowerPoint', 'Zapier', 'LMS platforms (SCORM)'],
      steps: [
        { step: 1, title: 'Choose an Avatar', description: 'Select an AI presenter that fits your brand tone.' },
        { step: 2, title: 'Type Your Script', description: 'Input the text you want the avatar to speak.' },
        { step: 3, title: 'Design the Scene', description: 'Add backgrounds, text on screen, images, and brand elements.' },
        { step: 4, title: 'Generate Video', description: 'Click generate and wait a few minutes for the AI to render the lip-syncing and visuals.' }
      ],
      faqs: [
        { question: 'Can I create a custom avatar of myself?', answer: 'Yes, Synthesia offers a custom avatar add-on where you record a short video of yourself to create a digital twin.' },
        { question: 'How natural do the voices sound?', answer: 'Synthesia uses top-tier neural TTS models that sound highly natural, including realistic breathing and pauses.' },
        { question: 'Do I own the rights to the videos?', answer: 'Yes, you have full commercial rights to use the videos anywhere.' }
      ]
    },
    'jasper': {
      overviewText: 'Jasper is an enterprise-grade AI marketing copilot designed to help teams create high-converting content, maintain brand voice, and run multi-channel campaigns efficiently.',
      forText: 'Marketing teams, agencies, and enterprise organizations needing to produce on-brand content at scale.',
      whyText: 'Unlike generic models, Jasper allows you to define strict brand voices, style guides, and knowledge bases to ensure all generated content aligns with your brand identity.',
      features: [
        { title: 'Brand Voice', description: 'Train the AI on your specific tone, style, and company facts.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg> },
        { title: 'Campaign Creation', description: 'Generate end-to-end campaigns (emails, blogs, social posts) from a single brief.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
        { title: 'SEO Integration', description: 'Integrates natively with SurferSEO to rank higher on Google.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg> },
        { title: 'AI Image Generation', description: 'Create royalty-free images to accompany your marketing copy.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> }
      ],
      prosCons: {
        pros: ['Exceptional ability to match specific brand voices', 'Template library covers almost every marketing use case', 'Strong team collaboration and workflow features'],
        cons: ['Significantly more expensive than raw ChatGPT', 'Interface can be overwhelming for casual users', 'Image generation is average compared to Midjourney']
      },
      useCases: [
        { role: 'For Content Marketers', benefits: ['Write long-form blog posts optimized for SEO', 'Generate high-converting landing page copy', 'Repurpose whitepapers into social threads'] },
        { role: 'For Performance Marketers', benefits: ['A/B test Facebook ad copy variations', 'Generate personalized cold email sequences', 'Write Google ad headlines'] },
        { role: 'For Social Media Managers', benefits: ['Schedule a month of LinkedIn posts in minutes', 'Ensure consistent tone across all platforms', 'Generate engaging Instagram captions'] }
      ],
      pricingPlans: [
        { name: 'Creator', price: '$39', period: 'per month', features: ['1 User', '1 Brand Voice', '50+ Templates'], highlighted: false },
        { name: 'Pro', price: '$59', period: 'per user/month', features: ['Up to 5 Users', '3 Brand Voices', 'Campaign creation tools', 'Jasper Art'], highlighted: true },
        { name: 'Business', price: 'Custom', period: '', features: ['Unlimited feature access', 'Unlimited Brand Voices', 'API access', 'Dedicated account manager'], highlighted: false }
      ],
      integrations: ['SurferSEO', 'Grammarly', 'Google Docs', 'Chrome Extension', 'Webflow'],
      steps: [
        { step: 1, title: 'Set Up Brand Voice', description: 'Provide URLs or text samples to teach Jasper how your company sounds.' },
        { step: 2, title: 'Choose a Template', description: 'Select from over 50 templates, such as Blog Post, Ad Copy, or Email Sequence.' },
        { step: 3, title: 'Provide Context', description: 'Input brief details about the product, audience, and campaign goals.' },
        { step: 4, title: 'Edit & Publish', description: 'Review the generated content in the editor, refine it, and publish directly to your CMS.' }
      ],
      faqs: [
        { question: 'How is this different from ChatGPT?', answer: 'Jasper is built specifically for marketing workflows. It includes brand voice enforcement, multi-channel campaign generation, and SEO integrations that ChatGPT lacks natively.' },
        { question: 'Is my data secure?', answer: 'Yes, Jasper does not use your private company data or brand voices to train their base models.' },
        { question: 'Can it check for plagiarism?', answer: 'Yes, Jasper includes an integrated plagiarism checker via Copyscape.' }
      ]
    },
    'dall-e-3': {
      overviewText: 'DALL-E 3 is a state-of-the-art image generation model by OpenAI. Integrated natively into ChatGPT, it understands complex prompts with significantly more nuance and detail than previous generation systems.',
      forText: 'Marketers, content creators, educators, and anyone needing highly accurate custom illustrations.',
      whyText: 'It is the easiest image generator to use because it utilizes ChatGPT to help rewrite and expand upon your prompts for optimal results, and it perfectly adheres to complex instructions.',
      features: [
        { title: 'Prompt Adherence', description: 'Exceptional at following complex, multi-sentence instructions exactly.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
        { title: 'Text Rendering', description: 'Can reliably generate legible text within images (signs, logos, etc).', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg> },
        { title: 'Conversational Editing', description: 'Ask ChatGPT to make specific adjustments to the generated image.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg> },
        { title: 'Inpainting', description: 'Select specific regions of an image to modify or replace.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> }
      ],
      prosCons: {
        pros: ['The best model for generating legible text', 'Easiest learning curve since ChatGPT writes the prompts', 'Included free with a ChatGPT Plus subscription'],
        cons: ['Overly stylized "AI look" compared to Midjourney’s photorealism', 'Strict safety filters restrict many types of generations', 'Lacks advanced camera controls and aspect ratio flexibility']
      },
      useCases: [
        { role: 'For Content Creators', benefits: ['Generate custom thumbnail images', 'Create specific illustrations for blog posts', 'Design unique vector-style icons'] },
        { role: 'For Marketers', benefits: ['Draft mockups for ad campaigns', 'Create social media graphics with embedded text', 'Storyboard video concepts'] },
        { role: 'For Educators', benefits: ['Generate specific historical or scientific illustrations', 'Create engaging presentation slides', 'Design custom worksheets'] }
      ],
      pricingPlans: [
        { name: 'ChatGPT Plus', price: '$20', period: 'per month', features: ['Full access to DALL-E 3', 'Access to GPT-4', 'Custom GPTs'], highlighted: true },
        { name: 'API Usage', price: '$0.04', period: 'per image', features: ['Standard resolution', 'High volume generation', 'Programmatic access'], highlighted: false }
      ],
      integrations: ['ChatGPT', 'Bing Image Creator', 'OpenAI API'],
      steps: [
        { step: 1, title: 'Open ChatGPT', description: 'Log in to ChatGPT Plus and ensure DALL-E is enabled or just start typing.' },
        { step: 2, title: 'Describe Your Image', description: 'Type a casual description of what you want to see.' },
        { step: 3, title: 'Review & Refine', description: 'Review the generated image and ask ChatGPT to make tweaks (e.g., "make it more cinematic").' },
        { step: 4, title: 'Download', description: 'Save the image or use the selection tool to edit specific parts of it.' }
      ],
      faqs: [
        { question: 'Can DALL-E 3 spell words correctly?', answer: 'Yes, unlike previous models, DALL-E 3 is highly capable of rendering specific words and phrases you include in your prompt.' },
        { question: 'Do I own the images?', answer: 'Yes, OpenAI grants you full commercial rights to the images you generate.' },
        { question: 'Is it better than Midjourney?', answer: 'It is better at following exact instructions and spelling words, but Midjourney is generally preferred for artistic beauty and photorealism.' }
      ]
    },
    'suno-ai': {
      overviewText: 'Suno AI is a groundbreaking music generation platform that can create full-length, radio-quality songs—including vocals, instrumentation, and lyrics—from a single text prompt.',
      forText: 'Content creators, musicians, marketers, and hobbyists looking to create original music tracks in seconds.',
      whyText: 'It is currently the undisputed leader in AI music generation, capable of producing remarkably cohesive song structures, catchy melodies, and expressive human-sounding vocals across any genre.',
      features: [
        { title: 'Full Song Generation', description: 'Creates entire tracks up to 4 minutes long with distinct verses, choruses, and bridges.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg> },
        { title: 'Custom Lyrics', description: 'Input your own lyrics or have the AI write them for you based on a theme.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg> },
        { title: 'Genre Blending', description: 'Mix obscure genres together (e.g., "cyberpunk country") for unique sounds.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> },
        { title: 'Song Extension', description: 'Extend existing generations to create longer mixes or complete unfinished tracks.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg> }
      ],
      prosCons: {
        pros: ['Vocal realism and emotional delivery are unmatched', 'Generates 2 full song options per prompt rapidly', 'Extremely generous free tier'],
        cons: ['Audio quality can sometimes sound slightly compressed', 'Difficult to edit specific stems or instruments after generation', 'No granular DAW-like controls']
      },
      useCases: [
        { role: 'For Content Creators', roleIcon: '', benefits: ['Generate original, copyright-free background music for YouTube', 'Create catchy intro themes for podcasts', 'Produce viral TikTok audios'] },
        { role: 'For Marketers', roleIcon: '', benefits: ['Create custom jingles for ad campaigns', 'Generate highly specific mood music for presentations', 'Avoid expensive music licensing fees'] },
        { role: 'For Musicians', roleIcon: '', benefits: ['Brainstorm melodies and chord progressions', 'Experiment with genre fusions', 'Generate vocal scratch tracks'] }
      ],
      pricingPlans: [
        { name: 'Basic', price: 'Free', period: 'forever', features: ['50 credits daily (~10 songs)', 'Non-commercial terms', 'Standard priority generation'], highlighted: false },
        { name: 'Pro', price: '$10', period: 'per month', features: ['2,500 credits/month (~500 songs)', 'General commercial terms', 'Priority generation queue'], highlighted: true },
        { name: 'Premier', price: '$30', period: 'per month', features: ['10,000 credits/month (~2,000 songs)', 'General commercial terms', 'Priority generation queue'], highlighted: false }
      ],
      integrations: ['Discord', 'Web App'],
      steps: [
        { step: 1, title: 'Open Suno', description: 'Navigate to the Suno web interface and click "Create".' },
        { step: 2, title: 'Choose Mode', description: 'Toggle "Custom Mode" on if you want to write your own lyrics and specify the exact genre.' },
        { step: 3, title: 'Generate', description: 'Enter your prompt or lyrics and hit Generate. It will create two variations.' },
        { step: 4, title: 'Extend or Export', description: 'Download the audio/video file, or choose to extend the track if you want it longer.' }
      ],
      faqs: [
        { question: 'Do I own the music I create?', answer: 'If you are on a paid Pro or Premier tier, you own the commercial rights to the music generated.' },
        { question: 'Will I get copyright strikes on YouTube?', answer: 'Paid users using original prompts generally do not face copyright issues, as the music is uniquely generated.' },
        { question: 'Can I upload my own voice?', answer: 'Suno allows audio inputs on newer models to extend or build upon existing audio.' }
      ]
    }
  };

  const defaultData = {
    overviewText: `${tool?.name || 'This AI tool'} is designed to help professionals maximize their productivity by leveraging state-of-the-art machine learning models. Whether you are looking to automate mundane tasks, generate assets, or analyze data, it provides an intuitive interface to seamlessly integrate AI into your daily workflow.`,
    forText: 'Startups, agencies, and forward-thinking enterprises looking to scale their operations with artificial intelligence.',
    whyText: 'Unlike traditional software, it adapts to your specific workflow over time, offering a highly robust user experience.',
    features: [
      { title: 'Intelligent Automation', description: 'Streamline your workflow with automation that learns from your actions.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
      { title: 'Seamless Integration', description: 'Connect directly with your existing software stack and databases.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg> },
      { title: 'Detailed Analytics', description: 'Get deep insights into usage patterns and performance metrics.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
      { title: 'Enterprise Security', description: 'Bank-grade encryption and compliance features to keep data safe.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> }
    ],
    prosCons: {
      pros: ['Intuitive and clean user interface', 'Fast processing speeds', 'Excellent documentation and support', 'Regular feature updates'],
      cons: ['Learning curve for advanced capabilities', 'Requires consistent internet connection', 'Premium tiers can be expensive for solo users']
    },
    useCases: [
      { role: 'For Content Creators', benefits: ['Accelerate asset generation', 'Maintain brand consistency', 'Automate repetitive tasks'] },
      { role: 'For Developers', benefits: ['Write boilerplate faster', 'Debug complex system errors', 'Generate extensive documentation'] },
      { role: 'For Marketers', benefits: ['A/B test campaign variations', 'Optimize copy for SEO', 'Analyze engagement data'] }
    ],
    pricingPlans: [
      { name: 'Starter', price: 'Free', period: 'forever', features: ['Core functionality', '1 User license', 'Community support'], highlighted: false },
      { name: 'Pro', price: '$29', period: 'per month', features: ['Advanced capabilities', 'Up to 5 Users', 'Priority email support', 'Custom integrations'], highlighted: true },
      { name: 'Enterprise', price: 'Custom', period: '', features: ['Everything in Pro', 'Unlimited Users', 'Dedicated account manager', 'SLA guarantees'], highlighted: false }
    ],
    integrations: ['Slack', 'Notion', 'Google Drive', 'Figma', 'Zapier', 'GitHub', 'Linear'],
    steps: [
      { step: 1, title: 'Create an Account', description: 'Register securely using your email or a single sign-on provider.' },
      { step: 2, title: 'Connect Your Data', description: 'Securely import your existing files or integrate your current tools.' },
      { step: 3, title: 'Configure Settings', description: 'Adjust the system parameters to align with your specific workflow.' },
      { step: 4, title: 'Deploy', description: 'Begin utilizing the tool to automate tasks and produce high-quality output.' }
    ],
    faqs: [
      { question: 'Is there a trial period available?', answer: 'Yes, new users can access a 14-day trial on premium tiers to evaluate features prior to purchase.' },
      { question: 'How is data privacy handled?', answer: 'We employ industry-standard encryption. Your data is never used to train global models without explicit opt-in.' },
      { question: 'Do you offer custom enterprise agreements?', answer: 'Yes, our sales team can tailor specific service level agreements and pricing for larger organizations.' }
    ]
  };

  const currentData = mockExtendedData[tool?.slug] || defaultData;
  const features = tool?.features || currentData.features;
  const prosCons = tool?.pros_cons || currentData.prosCons;
  const useCases = tool?.use_cases || currentData.useCases;
  const pricingPlans = tool?.pricing_plans || currentData.pricingPlans;
  const integrations = tool?.integrations || currentData.integrations;
  const steps = tool?.steps || currentData.steps;
  const faqs = tool?.faqs || currentData.faqs;

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  return (
    <div className="space-y-16">
      
      {/* 1. Overview Section */}
      <section id="overview" className="glass-card p-8">
        <h2 className="text-2xl font-bold font-syne text-white mb-6">Overview</h2>
        <div className="space-y-6 text-gray-300">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">What is {tool?.name || 'this tool'}?</h3>
            <p className="leading-relaxed">
              {currentData.overviewText}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-5 rounded-xl border border-[#262626]">
              <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Who is it for?
              </h4>
              <p className="text-sm text-[#737373]">{currentData.forText}</p>
            </div>
            <div className="bg-white/5 p-5 rounded-xl border border-[#262626]">
              <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                Why it stands out
              </h4>
              <p className="text-sm text-[#737373]">{currentData.whyText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Screenshots / Demo */}
      <section id="screenshots">
        <h2 className="text-2xl font-bold font-syne text-white mb-6">Interface Preview</h2>
        <div className="relative group rounded-2xl overflow-hidden border border-[#262626] aspect-video bg-card">
          {/* Mock Screenshot Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-card via-[#1A1A24] to-[#16161E] flex flex-col">
            {/* Mock Header */}
            <div className="h-10 border-b border-[#262626] flex items-center px-4 gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
            </div>
            {/* Mock Body */}
            <div className="flex-1 flex p-4 gap-4">
              <div className="w-1/4 h-full bg-white/5 rounded-lg border border-[#262626]"></div>
              <div className="flex-1 h-full bg-white/5 rounded-lg border border-[#262626] flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-[#262626] flex items-center justify-center backdrop-blur-md cursor-pointer hover:bg-white/10 transition-colors">
                   <svg className="w-6 h-6 text-white/70 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section id="features">
        <h2 className="text-2xl font-bold font-syne text-white mb-6">Key Features</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -2 }}
              className="bg-card border border-[#262626] p-6 rounded-2xl hover:border-[#262626] transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-[#262626] flex items-center justify-center text-white/70 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-[#737373] leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Use Cases */}
      <section id="usecases">
        <h2 className="text-2xl font-bold font-syne text-white mb-6">Real-World Use Cases</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((useCase, idx) => (
            <div key={idx} className="bg-card p-6 border border-[#262626] rounded-2xl border-t-2 border-t-white/20">
              <h3 className="text-base font-semibold text-white mb-4">{useCase.role}</h3>
              <ul className="space-y-3">
                {useCase.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#737373]">
                    <svg className="w-4 h-4 text-white/40 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Step-by-step Guide */}
      <section id="guide">
        <h2 className="text-2xl font-bold font-syne text-white mb-6">How It Works</h2>
        <div className="space-y-3">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-4 p-5 bg-card border border-[#262626] rounded-2xl">
              <div className="w-8 h-8 rounded-full bg-white/10 text-white text-sm flex items-center justify-center font-medium shrink-0">
                {step.step}
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-sm text-[#737373]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Pros & Cons */}
      <section id="pros-cons">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-[#262626] rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Strengths
            </h3>
            <ul className="space-y-3">
              {prosCons.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#737373]">
                  <span className="text-white/30 mt-0.5">+</span> {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-[#262626] rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
              Limitations
            </h3>
            <ul className="space-y-3">
              {prosCons.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#737373]">
                  <span className="text-white/30 mt-0.5">-</span> {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Integrations */}
      <section id="integrations">
        <h2 className="text-2xl font-bold font-syne text-white mb-6">Integrations</h2>
        <div className="flex flex-wrap gap-3">
          {integrations.map((app, idx) => (
            <div key={idx} className="px-4 py-2 rounded-full bg-card border border-[#262626] text-gray-300 text-sm flex items-center gap-2 hover:bg-white/5 transition-colors cursor-default">
              <div className="w-2 h-2 rounded-full bg-white/30"></div>
              {app}
            </div>
          ))}
        </div>
      </section>

      {/* 5. Pricing */}
      <section id="pricing">
        <h2 className="text-2xl font-bold font-syne text-white mb-6">Pricing Plans</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, idx) => (
            <div key={idx} className={`rounded-2xl p-6 border ${plan.highlighted ? 'bg-white/5 border-white/20 relative' : 'bg-card border-[#262626]'}`}>
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1A1A24] border border-[#262626] text-white text-xs font-bold px-3 py-1 rounded-full">
                  RECOMMENDED
                </div>
              )}
              <h3 className="text-lg font-medium text-white mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-[#737373] text-sm ml-1">/{plan.period}</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <svg className="w-5 h-5 text-white/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FAQ Section */}
      <section id="faq">
        <h2 className="text-2xl font-bold font-syne text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-card border border-[#262626] rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span className="font-medium text-white">{faq.question}</span>
                <svg className={`w-5 h-5 text-[#737373] transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-4 text-[#737373] text-sm"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ToolExtendedDetails;
