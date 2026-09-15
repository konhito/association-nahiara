# Private work log

Route: `/work-log`. Share this address with Matías after deployment. It is intentionally absent from public navigation and the sitemap, and requests search engines not to index it. Both people can create and update entries; each entry records its creator and latest editor. There is no delete action or fabricated starting data.

## Local development

Set these variables in the ignored `.env.local` file. Generate each secret independently with `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"`.

```dotenv
WORK_LOG_SECRET=<random encryption and signing secret, at least 32 characters>
WORK_LOG_ADITYA_KEY=<random access key, at least 32 characters>
WORK_LOG_MATIAS_KEY=<different random access key, at least 32 characters>
WORK_LOG_LOCAL_FILE=.work-log/development.enc
```

Run `npm run dev`, visit `/work-log`, select your name, and use your access key. Local entries are stored on disk in the ignored `.work-log` folder, survive server restarts, and are separate from the cloud log. This mode is disabled in production.

## Production setup

Configure the three secrets above in the hosting environment, plus:

```dotenv
WORK_LOG_BUCKET=aquamundi-glb-models
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=<existing server credential>
AWS_SECRET_ACCESS_KEY=<existing server credential>
```

Do not set `WORK_LOG_LOCAL_FILE` in production. AWS role-based credentials also work. Grant the server `s3:GetObject` and `s3:PutObject` for `work-log/entries.enc` in the chosen bucket. No new bucket or dependency is required. Enable S3 versioning if backup/recovery is needed. Bucket versioning is not configured by this change.

The complete log is encrypted using AES-256-GCM before S3 upload because the existing media bucket may permit public reads. Never put any of these variables behind a `NEXT_PUBLIC_` prefix. **Back up WORK_LOG_SECRET securely; losing or changing it makes existing entries unreadable.** Changing an access key blocks future sign-ins with that key; existing signed sessions last up to 12 hours. This two-person workspace uses long random access keys, not memorable passwords. Configure hosting-level request throttling if access is expanded.

Deploy, sign in as each person in separate browsers, add an entry in one, and refresh in the other. Verify a completed entry and completion date persist after reload. Share each person's own access key privately; do not include keys in URLs. No cloud data has been written by the local checks.

## Behavior and limits

- Every server read and write checks the signed HttpOnly session cookie. Next server actions enforce same-origin submission. The cookie is Secure in production and SameSite Strict.
- Entries include instruction, date received, status, completion date, and freeform progress notes. Add dated notes to preserve daily context. This is a current work log, not an immutable edit audit trail.
- The spreadsheet view uses numbered rows and lettered columns. Click any editable cell to open its row, Tab between fields, and choose Save row. The sheet scrolls horizontally on smaller screens.
- Completed status requires a completion date on or after the received date. Reopening an entry clears its completion date.
- Completion date is always editable. Entering a date selects Completed; clearing it changes a completed row to In progress.
- All shows only unfinished instructions. Saved completed entries appear under Completed, and the All count excludes them.
- Conditional S3 writes reject stale revisions, so simultaneous updates cannot silently replace each other. A conflict keeps the draft on screen: copy any draft notes, refresh, reopen the latest entry, and reapply the changes.
- Automatic refresh runs every minute while the page is visible and no edit is open. Save/network errors retain drafts in page memory; drafts are not persisted across tab closure.
- One encrypted object, capped at 5,000 entries. Split/archive the log if it outgrows this two-person workflow.

## Checks

`node tests/work-log.test.mjs`

`npx eslint app/work-log lib/workLog.mjs tests/work-log.test.mjs`

Implementation references: [Next.js cookies](https://nextjs.org/docs/app/api-reference/functions/cookies) and [S3 conditional writes](https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-writes.html).
