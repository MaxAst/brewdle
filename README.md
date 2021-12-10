This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## User Stories

### Create a poll

As a user, I visit the landing page and click on "create a poll". I give the occasion a name. Then I select dates that others can vote on. Next, I can optionally suggest places for the occasion (e.g. names and links of specific Airbnbs). Lastly, I have to provide my name and email address, so invitees know who the poll was created by and so that I get emails when someone submits a vote.

### Edit a poll

As a user, I can edit polls when I log in. This can be done with a magic link since a user has to provide their email address before creating the poll. Once logged in, I can view all polls created by me. I can click on a poll and go through the same flow as described above, prefilled with the already existing values for each step.

### Invite people to a poll

As a user, I can edit polls when I log in. This can be done with a magic link since a user has to provide their email address before creating the poll. Once logged in, I can view all polls created by me. I can click on a poll and go through the same flow as described above, prefilled with the already existing values for each step.

### Participate in a poll

#### From POV of creator

#### From POV of invitee

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.tsx`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
