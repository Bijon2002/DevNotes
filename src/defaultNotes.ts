import { TechNote } from './types';

export const INITIAL_NOTES: TechNote[] = [
  {
    id: '1',
    title: 'React 19 Server Actions & use() Hook',
    category: 'React',
    snippet: `const data = use(fetchPromise);\nconst [state, formAction, isPending] = useActionState(updateName, null);`,
    content: 'React 19 simplifies async operations using the use() API and useActionState for form mutations. Always remember to handle Suspense boundaries properly.',
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    tags: ['hooks', 'react19', 'async']
  },
  {
    id: '2',
    title: 'Docker Essential Clean-up Commands',
    category: 'Docker',
    snippet: `# Remove all stopped containers and unused images\ndocker system prune -a --volumes -f`,
    content: 'Quickly reclaim disk space by pruning dangling images, stopped containers, build cache, and unused networks.',
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    tags: ['devops', 'cli', 'prune']
  },
  {
    id: '3',
    title: 'Node.js Native Fetch & Stream Pipelines',
    category: 'Node.js',
    snippet: `import { pipeline } from 'node:stream/promises';\nimport { createWriteStream } from 'node:fs';\n\nconst res = await fetch('https://api.example.com/data');\nawait pipeline(res.body, createWriteStream('./out.json'));`,
    content: 'Node.js 18+ provides built-in Fetch without needing node-fetch or axios, and stream/promises allows seamless async streaming.',
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    tags: ['streams', 'fetch', 'backend']
  },
  {
    id: '4',
    title: 'Capacitor Android Build & Sync Flow',
    category: 'Cloud',
    snippet: `npm run build\nnpx cap sync android\ncd android && ./gradlew assembleDebug`,
    content: 'This is the exact pipeline used to transform our React TypeScript application into a native Android APK buildable on Codemagic CI/CD.',
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    tags: ['mobile', 'capacitor', 'android']
  },
  {
    id: '5',
    title: 'Git Branch Cleanup & Rebase Tricks',
    category: 'GitHub',
    snippet: `# Interactive rebase last 3 commits\ngit rebase -i HEAD~3\n\n# Force push with lease for safety\ngit push --force-with-lease origin main`,
    content: 'Always prefer --force-with-lease over raw --force to avoid stomping on teammates branch updates.',
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    tags: ['git', 'workflow', 'team']
  },
  {
    id: '6',
    title: 'AI Prompt Engineering System Directives',
    category: 'AI',
    snippet: `Role: Senior Architect\nContext: Mobile CI/CD pipeline\nConstraint: Zero third-party backend, local-first`,
    content: 'Structure prompt context into Role, Constraints, Target Output, and Step-by-step breakdown for best LLM accuracy.',
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    tags: ['llm', 'prompts', 'ai']
  }
];
