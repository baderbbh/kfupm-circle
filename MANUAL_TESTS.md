# Manual Tests

## Account Registration

These tests check required fields, email validation, password rules, and successful validation.

### Test Instructions

1. Open the registration page.
2. Enter the details listed for each test.
3. Submit the form.
4. Compare the result with the expected result.

**Test setup:** `student@kfupm.edu.sa` must already be registered, and `ahmed@kfupm.edu.sa` must be available.

### REG-01: Empty Fields

Leave all four fields empty and submit the form.

**Expected result:** Required-field errors appear for the full name, university email, password, and password confirmation.

### REG-02: Invalid Email and Mismatched Passwords — W02A

| Field | Value |
|-------|-------|
| Full name | Ahmed Al-Dossary |
| University email | ahmed@gmail.com |
| Password | Circle123! |
| Confirm password | Circle456! |

**Expected result:** A KFUPM email validation error and “Passwords must match.” appear.

### REG-03: Email Already Registered

| Field | Value |
|-------|-------|
| Full name | Ahmed Al-Dossary |
| University email | student@kfupm.edu.sa |
| Password | Circle123! |
| Confirm password | Circle123! |

**Expected result:** “An account with this email already exists.” appears.

### REG-04: Short Password

| Field | Value |
|-------|-------|
| Full name | Ahmed Al-Dossary |
| University email | ahmed@kfupm.edu.sa |
| Password | abc123 |
| Confirm password | abc123 |

**Expected result:** A password strength error appears because the password is too short.

### REG-05: Password Without a Number

| Field | Value |
|-------|-------|
| Full name | Ahmed Al-Dossary |
| University email | ahmed@kfupm.edu.sa |
| Password | abcdefgh |
| Confirm password | abcdefgh |

**Expected result:** A password strength error appears because the password does not contain a number.

### REG-06: Password Without a Letter

| Field | Value |
|-------|-------|
| Full name | Ahmed Al-Dossary |
| University email | ahmed@kfupm.edu.sa |
| Password | 12345678 |
| Confirm password | 12345678 |

**Expected result:** A password strength error appears because the password does not contain a letter.

### REG-07: Valid Details and Error Clearing

After a test that displays validation errors, replace the entries with the following valid details and submit again.

| Field | Value |
|-------|-------|
| Full name | Ahmed Al-Dossary |
| University email | ahmed@kfupm.edu.sa |
| Password | Circle123! |
| Confirm password | Circle123! |

**Expected result:** Your details are valid, and all previous validation errors disappear and the email verification page opens.

## Test Results

All seven tests were run manually and passed. The actual results matched the expected results.

| Test ID | Status | Actual Result |
|---------|--------|---------------|
| REG-01 | Passed | Required-field errors appeared for all four fields. |
| REG-02 | Passed | The KFUPM email error and “Passwords must match.” appeared. |
| REG-03 | Passed | “An account with this email already exists.” appeared. |
| REG-04 | Passed | A password strength error appeared for the short password. |
| REG-05 | Passed | A password strength error appeared for the password without a number. |
| REG-06 | Passed | A password strength error appeared for the password without a letter. |
| REG-07 | Passed | “Your details are valid.” appeared, and all previous errors disappeared. |


## Email Verification

Register with ahmed@kfupm.edu.sa and matching valid passwords.
Run these tests in order.

| Test | Action or input | Expected result |
|---------|--------|---------------|
| Open verification | Submit valid signup details | Verification page opens and shows ahmed@kfupm.edu.sa. |
| Empty code | Leave the code empty and select Verify email | Six-digit code error appears. |
| Incomplete code | Enter 123 and select Verify email | Six-digit code error appears. |
| Incorrect code | Enter 123456 and select Verify email | Incorrect-code error appears. The entered code stays in the field. |
| Expired code | Enter 111111 and select Verify email | Expired-code error appears. The entered code stays in the field. |
| Resend code | Select Resend code | A confirmation appears, the previous error clears, and the demo code changes to 654321. |
| Previous code | Enter 246810 after resending | Incorrect-code error appears. |
| Valid code | Enter 654321 and select Verify email | Email verified successfully appears and the error clears. |

Verification is simulated. No email is sent.
Navigation to profile setup is not connected yet.
