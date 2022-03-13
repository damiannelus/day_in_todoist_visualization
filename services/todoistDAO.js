// get data
import {TODOIST_BEREAER_TOKEN} from '../secrets'
// Shitty code ahead
const REST_API_URL = "https://api.todoist.com/rest/v1/"
const SYNC_API_URL = "https://api.todoist.com/sync/v8/"
const NO_DATE_FILTER = `tasks?filter=no date`
const TODAY_FILTER = `tasks?filter=today`
const PROJECTS = `projects/`
const COMPLETED = `completed/`
const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${TODOIST_BEREAER_TOKEN}`);
const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

export class TodoistDAO {
  constructor() {
    this.projectsLibrary = [];
  }

  async init() {
    this.projectsLibrary = await this.getProjectsLibrary();
  }

  async getNoDates() {
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
  
  async getTodayTasks() {
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

  async getDoneToday() {
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];
    const doneToday = await fetch(`${SYNC_API_URL}${COMPLETED}get_all?since=${todayFormatted}T00:00`, requestOptions)
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.json();
    }).catch((err) => {
      console.error(err)
    });
    console.log('doneToday@getDoneToday :>> ', doneToday);
    return doneToday;
  }
  
  async getProjectByID(projectID) {
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
  
  async getProjectsLibrary() {
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

  // TODO: this should be rewritten to use Array.find() or sth
  getColorForProject(projectID) {
    for (let index = 0; index < this.projectsLibrary.length; index++) {
      const element = this.projectsLibrary[index];
      if (element.id == projectID) {
        return element.color;
      }
    }
    return 666;
  }
}
