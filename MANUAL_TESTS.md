# Manual Tests

## Test Setup

Refresh the application before starting to restore the demo accounts.

| Role | Email | Password |
|------|-------|----------|
| Student | ahmed@kfupm.edu.sa | Circle123! |
| Club manager | clubmanager@kfupm.edu.sa | Circle123! |
| Administrator | admin@kfupm.edu.sa | Circle123! |

Use bader@kfupm.edu.sa for new registration tests.

Email verification and password recovery are simulated. No real email is sent.

## Account Registration

### Instructions

1. Open the registration page.
2. Enter the details for each test.
3. Submit the form.
4. Compare the result with the expected result.

### REG-01: Empty Fields

Leave all four fields empty and submit.

**Expected result:** Required-field errors appear for the full name, university email, password, and password confirmation.

**Result:** Passed.

### REG-02: Invalid Email and Mismatched Passwords - W02A

| Field | Value |
|-------|-------|
| Full name | Bader Albarjas |
| University email | bader@gmail.com |
| Password | Circle123! |
| Confirm password | Circle456! |

**Expected result:** A KFUPM email error and “Passwords must match.” appear.

**Result:** Passed.

### REG-03: Email Already Registered

| Field | Value |
|-------|-------|
| Full name | Ahmed Al-Dossary |
| University email | ahmed@kfupm.edu.sa |
| Password | Circle123! |
| Confirm password | Circle123! |

**Expected result:** “An account with this email already exists.” appears.

**Result:** Passed.

### REG-04: Short Password

| Field | Value |
|-------|-------|
| Full name | Bader Albarjas |
| University email | bader@kfupm.edu.sa |
| Password | abc123 |
| Confirm password | abc123 |

**Expected result:** A password-strength error appears because the password is too short.

**Result:** Passed.

### REG-05: Password Without a Number

| Field | Value |
|-------|-------|
| Full name | Bader Albarjas |
| University email | bader@kfupm.edu.sa |
| Password | abcdefgh |
| Confirm password | abcdefgh |

**Expected result:** A password-strength error appears because the password does not contain a number.

**Result:** Passed.

### REG-06: Password Without a Letter

| Field | Value |
|-------|-------|
| Full name | Bader Albarjas |
| University email | bader@kfupm.edu.sa |
| Password | 12345678 |
| Confirm password | 12345678 |

**Expected result:** A password-strength error appears because the password does not contain a letter.

**Result:** Passed.

### REG-07: Valid Details After Errors

After a test that displays errors, replace the entries with these valid details and submit again.

| Field | Value |
|-------|-------|
| Full name | Bader Albarjas |
| University email | bader@kfupm.edu.sa |
| Password | Circle123! |
| Confirm password | Circle123! |

**Expected result:** The email verification page opens and shows bader@kfupm.edu.sa. The registration errors are no longer displayed.

**Result:** Passed.

### REG-08: Other Existing Demo Accounts

Repeat REG-03 using each email:

- clubmanager@kfupm.edu.sa
- admin@kfupm.edu.sa

**Expected result:** “An account with this email already exists.” appears for both accounts.

**Result:** Passed.

### REG-09: Back to Login

Select Back to login.

**Expected result:** The login page opens.

**Result:** Passed.

## Email Verification

Refresh, then register with bader@kfupm.edu.sa and matching valid passwords. Run VER-01 to VER-08 in order.

| ID | Action or input | Expected result | Result |
|----|-----------------|-----------------|--------|
| VER-01 | Submit valid signup details | Verification opens and shows bader@kfupm.edu.sa. | Passed |
| VER-02 | Leave the code empty and select Verify email | A six-digit code error appears. | Passed |
| VER-03 | Enter 123 and select Verify email | A six-digit code error appears. | Passed |
| VER-04 | Enter 123456 and select Verify email | An incorrect-code error appears. The entered code stays in the field. | Passed |
| VER-05 | Enter 111111 and select Verify email | An expired-code error appears. The entered code stays in the field. | Passed |
| VER-06 | Select Resend code once | A confirmation appears, the previous error clears, and the demo code changes from 246810 to 654321. | Passed |
| VER-07 | Enter 246810 after resending | An incorrect-code error appears. | Passed |
| VER-08 | Enter 654321 and select Verify email | Profile setup opens with the registration name filled in. | Passed |
| VER-09 | Start a fresh registration and enter 246810 without resending | Profile setup opens. | Passed |

The initial demo code is 246810. Resending switches between 246810 and 654321. The code 111111 demonstrates the expired-code error.

## Login and Role Navigation

Refresh before starting so all demo passwords are Circle123!. Sign out between accounts.

| ID | Action or input | Expected result | Result |
|----|-----------------|-----------------|--------|
| LOG-01 | Submit with both fields empty | Required-field validation prevents submission. | Passed |
| LOG-02 | Enter ahmed@gmail.com and Circle123! | KFUPM email validation prevents submission. | Passed |
| LOG-03 | Enter ahmed@kfupm.edu.sa and Wrong123! | “Incorrect email or password. Please try again.” appears. | Passed |
| LOG-04 | Enter unknown@kfupm.edu.sa and Circle123! | The incorrect-email-or-password error appears. | Passed |
| LOG-05 | Enter ahmed@kfupm.edu.sa and Circle123! | The student homepage opens and shows Ahmed's name. | Passed |
| LOG-06 | Enter clubmanager@kfupm.edu.sa and Circle123! | Manage Club Information opens. | Passed |
| LOG-07 | Enter admin@kfupm.edu.sa and Circle123! | Student Accounts opens. | Passed |
| LOG-08 | Select the sidebar sign-out icon on each homepage | The login page opens. | Passed |
| LOG-09 | Select Create an account | Registration opens. | Passed |
| LOG-10 | Select Forgot password? | Password recovery opens. | Passed |
| LOG-11 | After an incorrect password, enter the correct password | The appropriate homepage opens. | Passed |

## Password Recovery

### Recovery Form and Password Validation

| ID | Action or input | Expected result | Result |
|----|-----------------|-----------------|--------|
| REC-01 | Submit an empty recovery email | Email validation prevents continuing. | Passed |
| REC-02 | Submit ahmed@gmail.com | A KFUPM email error appears. | Passed |
| REC-03 | Submit ahmed@kfupm.edu.sa | Check your inbox appears with the Open demo reset link button. | Passed |
| REC-04 | Select Open demo reset link | The new-password form opens. | Passed |
| REC-05 | Submit both password fields empty | Required-password errors appear. | Passed |
| REC-06 | Enter abc123 in both fields | A password-strength error appears. | Passed |
| REC-07 | Enter abcdefgh in both fields | A password-strength error appears because a number is missing. | Passed |
| REC-08 | Enter 12345678 in both fields | A password-strength error appears because a letter is missing. | Passed |
| REC-09 | Enter NewCircle456! and Different456! | A password-matching error appears. | Passed |
| REC-10 | Correct both fields to NewCircle456! and submit | Password updated appears. | Passed |
| REC-11 | Select Back to login | The login page opens. | Passed |
| REC-12 | Request a reset for unknown@kfupm.edu.sa, open the demo link, and submit valid matching passwords | The initial request shows the generic inbox message. Completing the reset shows that the demo account was not found. | Passed |

### Password Change and Account Separation

Refresh before this sequence. Do not refresh between steps.

1. Reset ahmed@kfupm.edu.sa to NewCircle456!.
2. Return to login.
3. Try ahmed@kfupm.edu.sa with Circle123!.
4. Try ahmed@kfupm.edu.sa with NewCircle456!.
5. Sign out.
6. Sign in as clubmanager@kfupm.edu.sa using Circle123!.

**Expected results:**

- The old student password fails.
- The new student password opens the student homepage.
- The club manager's password is unchanged and opens the club manager page.

**Result:** Passed.

### Additional Recovery Checks

| ID | Action or input | Expected result | Result |
|----|-----------------|-----------------|--------|
| REC-13 | Repeat the reset flow for clubmanager@kfupm.edu.sa | The new password opens the club manager page. Other accounts keep their passwords. | Passed |
| REC-14 | Repeat the reset flow for admin@kfupm.edu.sa | The new password opens the administrator page. Other accounts keep their passwords. | Passed |
| REC-15 | Refresh after changing a demo password | The changed password is cleared and Circle123! works again. | Passed |

## Profile Setup

Reach this page through registration and successful email verification.

Use these valid details:

| Field | Value |
|-------|-------|
| Full name | Bader Albarjas |
| Major | Software Engineering |
| Short biography | Software engineering student interested in web development and campus activities. |
| Current courses | SWE 363 |
| Interests | Web development |
| Hobbies | Football, hiking |
| Preferred activities | Workshops, study sessions |

| ID | Action or input | Expected result | Result |
|----|-----------------|-----------------|--------|
| PRO-01 | Open profile setup after verification | The registration name is already filled in. | Passed |
| PRO-02 | Clear the full name and submit | Required-field validation prevents submission. | Passed |
| PRO-03 | Leave the major unselected and submit | Required-field validation prevents submission. | Passed |
| PRO-04 | Enter a name, major, and interest but no courses | Submission is blocked with a required-profile-details error. | Passed |
| PRO-05 | Enter a name, major, and course but no interests | Submission is blocked with a required-profile-details error. | Passed |
| PRO-06 | Select a suggested course or interest | It appears as a selected tag. | Passed |
| PRO-07 | Type a custom course or interest and select Add or press Enter | The value appears as a selected tag. | Passed |
| PRO-08 | Add the same tag again, including a different letter case | A duplicate tag is not added. | Passed |
| PRO-09 | Select × on a tag | That tag is removed. | Passed |
| PRO-10 | Enter biography text | The character count updates. Input is limited to 500 characters. | Passed |
| PRO-11 | Complete only the required fields | Save and continue opens the student homepage. | Passed |
| PRO-12 | Submit all the valid details above | The homepage opens and the sidebar shows the entered name and major. | Passed |

## Student Homepage

| ID | Action or input | Expected result | Result |
|----|-----------------|-----------------|--------|
| HOME-01 | Sign in using ahmed@kfupm.edu.sa | The student homepage opens with Ahmed's name and Software Engineering. | Passed |
| HOME-02 | Open the homepage | The date and greeting match the device's local date and time when the page renders. | Passed |
| HOME-03 | Inspect the recommendations | Three sample student cards appear with names, majors, reasons, tags, and View profile buttons. | Passed |
| HOME-04 | Inspect Coming up on campus | The sample Game Development Workshop appears. | Passed |
| HOME-05 | Try the unfinished navigation, shortcut, profile, and activity buttons | The disabled buttons do not navigate. | Passed |
| HOME-06 | Select the sign-out icon | Login opens. | Passed |

Recommendations and the workshop currently use sample data.

## Club Manager Homepage

Sign in with clubmanager@kfupm.edu.sa and Circle123!.

| ID | Action or input | Expected result | Result |
|----|-----------------|-----------------|--------|
| CLUB-01 | Sign in | Manage Club Information opens with the Game Development Club details. | Passed |
| CLUB-02 | Clear the club name, contact email, or description and save | Required-field validation blocks submission. | Passed |
| CLUB-03 | Enter an invalid contact email and save | Email-format validation blocks submission. | Passed |
| CLUB-04 | Enter only spaces for the club name or description and save | An error asks for the club name and description. | Passed |
| CLUB-05 | Remove every interest and save | An error asks for at least one interest. | Passed |
| CLUB-06 | Type a new interest and select Add or press Enter | A new interest tag appears. | Passed |
| CLUB-07 | Add the same interest again using different letter case | A duplicate is not added. | Passed |
| CLUB-08 | Remove an interest using × | The selected tag disappears. | Passed |
| CLUB-09 | Change the club name to Game Development Society and save valid details | The heading updates and a success message appears. | Passed |
| CLUB-10 | Change a field after saving | The previous success message disappears. | Passed |
| CLUB-11 | Try the unfinished navigation, shortcuts, and Return to student view | The disabled buttons do not navigate. | Passed |
| CLUB-12 | Select the sign-out icon | Login opens. | Passed |

Club changes are temporary. They are not stored in a database or shared with other pages. Leaving and reopening this page restores its initial details.

## Administrator Homepage

Sign in with admin@kfupm.edu.sa and Circle123!.

| ID | Action or input | Expected result | Result |
|----|-----------------|-----------------|--------|
| ADM-01 | Sign in | Student Accounts opens with four sample accounts. | Passed |
| ADM-02 | Search for Ahmed | Only Ahmed's row appears. | Passed |
| ADM-03 | Search for lina@kfupm.edu.sa | Only Lina's row appears. | Passed |
| ADM-04 | Search for AHMED | Ahmed's row still appears; search ignores letter case. | Passed |
| ADM-05 | Search for a name that is not listed | “No accounts match your search.” appears. | Passed |
| ADM-06 | Clear the search and select Active | Ahmed, Omar, and Lina appear. | Passed |
| ADM-07 | Select Administrator | Only Noor's row appears. | Passed |
| ADM-08 | Select Administrator and search for Ahmed | No matching accounts appear. | Passed |
| ADM-09 | Clear the search and select All statuses | All four rows appear again. | Passed |
| ADM-10 | Inspect Omar's verification badge | It shows Unverified. | Passed |
| ADM-11 | Inspect Noor's row | It shows Administrator · You and Self-deletion blocked, with no delete button. | Passed |
| ADM-12 | Try the other navigation and edit/delete buttons | They remain disabled and do not change account data. | Passed |
| ADM-13 | Select the sign-out icon | Login opens. | Passed |

The table uses sample records. It is not connected to registration or the demo login account list.

## Layout and Keyboard Checks

Use normal browser zoom. Check a desktop window and a mobile viewport such as 390 × 844.

| ID | Check | Expected result | Result |
|----|-------|-----------------|--------|
| UI-01 | Open login and registration on desktop | The introduction and form appear beside each other. | Passed |
| UI-02 | Open login and registration on mobile | The panels stack vertically and the fields remain usable. | Passed |
| UI-03 | Open verification and password recovery on mobile | The cards and controls fit within the screen width. | Passed |
| UI-04 | Open profile setup and the student homepage on desktop | Reduced spacing keeps the layout compact. The main controls remain reachable. | Passed |
| UI-05 | Open all three homepages and profile setup on mobile | Content stacks without page-wide horizontal scrolling. | Passed |
| UI-06 | Open the administrator table on mobile | The table can scroll horizontally inside its container. | Passed |
| UI-07 | Use Tab and Shift+Tab through forms | Focus moves through enabled controls and has a visible outline. | Passed |
| UI-08 | Submit invalid registration details | Focus moves to the first invalid field. | Passed |
| UI-09 | Add several tags or show validation errors | The page expands and content remains reachable by scrolling. | Passed |

## Build Checks

Run these commands inside the frontend folder:

```powershell
npm run lint
npm run build
```

| Check | Expected result | Result |
|-------|-----------------|--------|
| Lint | No lint errors are reported. | Passed |
| Production build | The production build completes successfully. | Passed |

## Current Demo Limits

- Email verification and password recovery are simulated.
- Demo passwords reset when the browser page is refreshed.
- Remember me is displayed but does not yet keep the user signed in.
- New registration details are not yet added to the login account list.
- Navigation for unfinished pages remains disabled.
- Administrator edit and delete actions remain disabled.
