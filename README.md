# Imagine Cup 2022 Submission - Menty

Menty is the tool for the amateur mentor.

- Organize mentoring sessions efficiently
- Resources to help users structure discussions
- Q&A at anytime
- Earn from subscriptions by getting certified or through income-share agreements
- Keep in contact with past mentors and mentees

According to a study in 2019, "76% of people think mentors are important, however, only 37% of people currently have one." ([Forbes](https://www.forbes.com/sites/christinecomaford/2019/07/03/new-study-76-of-people-think-mentors-are-important-but-only-37-have-one/?sh=10f46e424329))

This means that there are large pools of underutilised talents as mentors. With Menty, we can improve accessibility to knowledge, information, wisdom, and opportunities for many people.

## Tech Stack

Using Microsoft Azure, this app was developed to be serverless.

### Backend (Azure Functions + Azure SQL)

The backend API is written in JavaScript and deployed to Azure Functions where it will only run upon being triggered by a HTTP call. The API relies on a SQL Server database deployed on Azure SQL.

### Frontend (ReactJS on Azure Static Web Apps)

The frontend web app is written in JavaScript and uses ReactJS. This is deployed to Azure Static Web Apps through GitHub Actions. Available at:

https://jolly-stone-05341b200.azurestaticapps.net/home

## Local Development

To run the app locally first run `npm start` in the `react-app` folder.
After the server has started, we need to start the Azure Functions as well as 
proxy through the Static Web Apps authentication by using:

```bash
swa start http://localhost:3000 --api-location ./api
```

## References

Code adapted from:
- https://github.com/MicrosoftDocs/mslearn-staticwebapp-authentication
- https://github.com/Azure-Samples/serverless-full-stack-apps-azure-sql

Microsoft Learn Modules:
- https://docs.microsoft.com/en-us/learn/modules/build-full-stack-apps/
- https://docs.microsoft.com/en-us/learn/modules/publish-static-web-app-api-preview-url/
- https://docs.microsoft.com/en-us/learn/modules/publish-app-service-static-web-app-api/
- https://docs.microsoft.com/en-us/learn/modules/publish-static-web-app-authentication/