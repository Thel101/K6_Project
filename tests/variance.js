import http from 'k6/http';
import { check, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
  stages: [
    { target: 10, duration: "10s" }
  ]
};

// Base URL of your application
const BASE_URL = 'https://uat-vaudit-mng-app-service-frontend-1.azurewebsites.net/';

const headers = {
  Cookie: 'AppServiceAuthSession=CASsgXk/W5DqODGmB8qEGT3jfQJCHT/VYvN8losx0Pht8IzWJ5e+9fsmkJcXjEs/FvhMb1YoTfjTkDDI4koGm2M7ZmHiXkwZuvBao3krHU9/z597l3WeWnCSFFBMcoN5xiZBgXZn4B/yT9IF8EivEQxUWEfjGqTJI3h+FKrP48nyhO8T4zhQxi0vjF3hNY6mFwGJpyOWgVsdg1fC3JBZ84U0/kuNDKpmFyyZptApmIB3cyrSrUzYFnZ96oox24D1GtzkzjF8xgc+LCqRks4e9bcEqIp2Q4zmd0YKXFqCvLbrwW4+nVkBwHqkWGzBHgBLifIbfYNSNmubigvJzS+m7/OTP7O5SafdsSel3E15qtFsdD12aJrck8uAz1dii0yds/qw9s+CTwevKv+ZqwMujEvxuUqkkGbS3nL2Vz6J1dhw4d9MwXJ/ldgGpzipT4lQ+8/odY5VCM+E9aVvvhzgpOZyB3ICJT5orOPE7waTxhIEllhFMj6J5Qeg202AR3WL1fYzDZcfw0UbN1w+BbEKN7s2imZivlkiO5TM45/LChDEUp9YTIKcfnR7Df1uR8N/l0qTGBJm9oO9K+IWLjCI3QJ+NPQXMe1SJlZvfkQphfp7D33BczYUKyxBx+KrQ2B2cUfOHBdJTjyFdYktJX3PXcQdvmCGVMWcy5spwzvcQ9aVKTRUlth4zhruXnImz0Qur4r5AFEux0EADnx1TXarEn0mtjceUMsnZjfuIHrQi2QLvIpvtjVlQzdERJjPm6r2mGLL59W2VK6e541PtomosOiOSkHyu4LhiCl0QuvWX/NI89oFXJHBpFK4OTudSt+9yRXJ/vIBDocjAHmISdtBe0VNUO1JQcjvqFVJf1xyq1JIPpwo0UgURVjG2sob4Rj9G7smQBa0VQTRIVu9I7qqEhSyfbfjdCVWwXMne5iaTzXAl3R9QKvRPF3gtRKrQsSi6u/FxBAE9lq4iSfY91OAc81G/0vF3aaW3CxcDCHhl/HGvV6Q23EstmVYxub9LvfGXWV4uxBWS7ALlCpwUx3NQfFUd4NAaGQ0AFpJm3nrwMV26dfuyxDXWLBq5Ti//DWtDo6+HxKU5CSA3/+CliLRpG1DuaICVxh35DDVSfmPIygJFA5pf1A/UzRYWlgZWR+VM5DLLcVV+yNez10FoNi/Kc9Wz8EJNLZMxlQcrsfSqPo898modaIl1ACjBTQH9PkWcniqNt1xhVg9C6GsCwmDikeTvOyz3EGCoHyeOc5TT6IZWf+44AzE0UVvNnjUDjjivdQ4WwxTUBog8Eocej09F1D6hQJXpiFai9L9o8xhb5r2eqOWebMQsHVekYCYSvQBwlbCfcOfzI3N5FIGBYec6gw/xOlmDZvqV3KShg/lGVo='
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