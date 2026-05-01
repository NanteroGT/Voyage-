# Security Specification: Nzoko Transport

## Data Invariants
1. Only authorized administrators can modify any data (Destinations, Agencies, Packages, News, Gallery, Config).
2. Public users can read Destinations, Agencies, Published News, and the Gallery.
3. Packages should only be searchable by their tracking number for public users (though currently the UI seems to list all if I don't implement a specific query). Actually, for security, a public user should NOT be able to list all packages. They should only be able to 'get' a package if they know the ID or tracking number.
4. Timestamps (createdAt, updatedAt) must be server-generated.
5. All input string sizes must be capped to prevent resource exhaustion.

## The "Dirty Dozen" Payloads
1. Create a destination without being logged in.
2. Update the status of a package to 'Livré' as an unauthorized user.
3. Delete an agency without being logged in.
4. Update `homepage_config` with a 1MB string for the title.
5. Modify `createdAt` field on a destination.
6. Create an admin record for yourself.
7. Inject a malicious object into a string field.
8. List all packages as a public user.
9. Delete the entire database via a wildcard match if rules are leaky.
10. Update a published article to 'Brouillon' as a non-admin.
11. Upload a gallery image with an invalid ID.
12. Modify the `updatedAt` field using a client-side timestamp instead of `request.time`.

## The Test Runner (TDD)
I will implement `firestore.rules.test.ts` (conceptual for now, will implement actual rules).
