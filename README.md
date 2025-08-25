# K6_Project

This project contains load and API test scripts written for use with [k6](https://k6.io/), an open-source load testing tool. The scripts are designed to test the performance and reliability of web applications and APIs.

## Project Structure

- `aump.js` — k6 script for API testing, including checks for endpoints such as documents API.
- `homepage.js` — k6 script for simulating user flows like login and dashboard access, with checks for HTTP status and HTML content.
- `summary.html` — Generated HTML report summarizing test results.

## How to Run Tests

1. **Install k6:**
   - Download and install k6 from [https://k6.io/docs/getting-started/installation/](https://k6.io/docs/getting-started/installation/)

2. **Run a Test Script:**
   - Open a terminal in the project directory.
   - Run a script with:
     ```
     k6 run aump.js
     ```
     or
     ```
     k6 run homepage.js
     ```

3. **View Results:**
   - Test results will be shown in the terminal.
   - If enabled, an HTML summary report will be generated as `summary.html`.

## Notes
- These scripts use HTTP requests directly and do not simulate browser interactions or JavaScript execution.
- For UI interaction or client-side rendered content, consider using browser automation tools like Playwright or Selenium.

## References
- [k6 Documentation](https://k6.io/docs/)
- [k6 Browser (experimental)](https://k6.io/docs/using-k6/browser/)
