// get data
require('dotenv').config();
// Shitty code ahead
const TODOIST_BEREAER_TOKEN = "567202f6bca21c2c35af51f91c4c004bde9d0db4"
const REST_API_URL = "https://api.todoist.com/rest/v1/"
const SYNC_API_URL = "https://api.todoist.com/sync/v8/"
const NO_DATE_FILTER = `tasks?filter=no date`
const TODAY_FILTER = `tasks?filter=today`
const PROJECTS = `projects/`
const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${TODOIST_BEREAER_TOKEN}`);
const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

export async function getNoDates() {
  const noDateTasks = await fetch(`${REST_API_URL}${NO_DATE_FILTER}`, requestOptions)
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.json();
    }).catch((err) => {
      console.error(err)
    });
  return noDateTasks;
}

export async function getTodayTasks() {
  const todayTasks = await fetch(`${REST_API_URL}${TODAY_FILTER}`, requestOptions)
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.json();
    }).catch((err) => {
      console.error(err)
    });
  return todayTasks;
}

export async function getProjectByID(projectID) {
  const project = await fetch(`${REST_API_URL}${PROJECTS}${projectID}`, requestOptions)
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.json();
    }).catch((err) => {
      console.error(err)
    });
  return project;
}

export async function getProjectsLibrary() {
  const projects = await fetch(`${REST_API_URL}${PROJECTS}`, requestOptions)
    .then(response => {
      console.log(
        `getProjectsLibrary Response: ${response.status} ${response.statusText}`
      );
      return response.json();
    }).catch((err) => {
      console.error(err)
    });
  return projects;
}