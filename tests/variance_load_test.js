import http from 'k6/http';
import { check, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
  stages: [
    { target: 10, duration: "10s" }
  ]
};
const cookies = __ENV.COOKIES
// Base URL of your application
const BASE_URL = 'https://uat-vaudit-mng-app-service-frontend-1.azurewebsites.net/';

const headers = {
  Cookie: `AppServiceAuthSession=${cookies}`
};


export default function () {
  // The request will automatically include the cookie we just set.
  group('Companies', function () {
  const authenticated_res = http.get('https://uat-vaudit-mng-app-service-frontend-1.azurewebsites.net/api/companies', { headers: headers });

  // Check that the request was successful, indicating that the authentication worked.
  check(authenticated_res, {
    'authenticated request status is 200': (r) => r.status === 200,
  });
});
  group('Company Detail', function(){
  const companyDetail = http.get('https://uat-vaudit-mng-app-service-frontend-1.azurewebsites.net/api/employees?company_id=TEST300525', { headers: headers });
  check(companyDetail, {
    'company detail request status is 200': (r) => r.status === 200
  })
  });

}
export function handleSummary(data){
  return{
      "../reports/varianceTool.html": htmlReport(data, { title: "Variance Tool Protocol Performance Test Report" }),
      "stdout": textSummary(data, { indent: " ", enableColors: true }),
    };
}