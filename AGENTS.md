<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing you write any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## HireNP Project Summary

### Overview
Automated hiring system with AI-powered candidate evaluation, interview scheduling, and email automation.

### Stack
- Next.js 16, Tailwind CSS 4, Supabase
- Email: Resend (configured but requires API key)
- LLM: Ollama with configurable model

### Environment Variables Required
```
RESEND_API_KEY=<from resend.com>
FROM_EMAIL=HireNP <onboarding@resend.dev>
NEXT_PUBLIC_URL=http://localhost:3000
```

### Key Files
- `/src/lib/email.js` - Email utility with Resend integration
- `/src/lib/pipeline.js` - Shared pipeline for AI + manual shortlisting
- `/src/lib/supabaseClient.js` - Supabase client setup
- `/src/app/scheduling/page.js` - Candidate scheduling UI (wrapped in Suspense)

### Email Flow
1. Candidate shortlisted (AI or manual) → `triggerInterviewScheduling()`
2. Interview record + slots created
3. Scheduling request generated with token
4. Email sent via Resend with scheduling link
5. Candidate books slot → confirmation email sent

### Testing
Run `npm run dev` and test the pipeline with a real application.
