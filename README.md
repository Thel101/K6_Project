# K6_Project

# K6_Project

This project contains load, browser UI, and API test scripts written for use with [k6](https://k6.io/), an open-source load testing tool. The scripts are designed to test the performance and reliability of web applications and APIs, including browser automation scenarios.

## Project Structure

- `aump.js` — k6 script for API testing, including checks for endpoints such as documents API.
- `homepage.js` — k6 script for simulating user flows like login and dashboard access, with checks for HTTP status and HTML content.
- `dashboard.js` — k6 browser script for automating login and dashboard checks using real browser automation.
- `summary.html` — Generated HTML report summarizing test results.

## How to Run Tests

1. **Install k6:**
   - Download and install k6 from [https://k6.io/docs/getting-started/installation/](https://k6.io/docs/getting-started/installation/)
   - For browser automation, use [k6 browser](https://k6.io/docs/using-k6/browser/) (requires k6 v0.44.0+ and Chromium/Firefox/Webkit installed)

2. **Run a Protocol/API Test Script:**
   - Open a terminal in the project directory.
   - Run a script with:
     ```
     k6 run aump.js
     ```
     or
     ```
     k6 run homepage.js
     ```

3. **Run a Browser Automation Script:**
   - Run a browser test with:
     ```
     k6 run --browser dashboard.js
     ```
   - This will launch a real browser and automate UI actions as defined in the script.

4. **View Results:**
   - Test results will be shown in the terminal.
   - An HTML summary report will be generated as `summary.html` if the script includes a `handleSummary` function with `htmlReport`.

## Generating HTML Reports

The scripts use the [k6-reporter](https://github.com/benc-uk/k6-reporter) to generate HTML reports. After running a script, open `summary.html` in your browser to view a detailed report.

## Notes
- `aump.js` and `homepage.js` use HTTP requests directly and do not simulate browser interactions or JavaScript execution.
- `dashboard.js` uses k6 browser for real browser automation, including UI login and content checks.
- For advanced UI or end-to-end testing, you can further customize selectors and flows in `dashboard.js`.

## References
- [k6 Documentation](https://k6.io/docs/)
- [k6 Browser](https://k6.io/docs/using-k6/browser/)
- [k6 Reporter (HTML reports)](https://github.com/benc-uk/k6-reporter)
