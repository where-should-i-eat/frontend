# Where Should I Eat? - Frontend
Hungry, but can't figure out a place nearby to eat? Craving something sweet? Spicy or mild? Pizza or sushi?  
Use the [WhereShouldIEat Chatbot](https://wheretoeat.vercel.app/) to help you decide!

Submission for CalHacks AI LLM Hackathon (Summer 2023) - Achieved top 30% (ranking) of submissions

## [Demo Video](https://youtu.be/Uac_E676KiQ)

## Collaborators
- Ryan Campbell
- Harry Lai
- Shulu Li
- Rishi Khare

## Factored Cognition Chatbot

- Ask a series of questions about proximity/location, occasion, price, etc.
- From responses, output one restaurant

## App workflow:

- App tells user an initial question: occasion/location preference/etc.
- User types in answer, hits enter
- User’s response is sent to OpenAI API, formatted with correct prompt
- Repeat: (factored cognition)
  - Chat gives user another question about their preference
  - User types response, hits enter
  - User’s response is sent to OpenAI API, formatted with correct prompt
- OpenAI generates search input to Google Maps API, then returns information to user
- possibly use OpenAI to refine input to Google Maps API, then return refined information to user

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
