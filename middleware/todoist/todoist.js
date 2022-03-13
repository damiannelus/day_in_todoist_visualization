import { Agent } from '../../models/agent';
import {getNoDates, getTodayTasks, getProjectsLibrary} from '../../services/todoistDAO';

const radiusPriorityMap = new Map([
  [1, 4],
  [2, 5],
  [3, 8],
  [4, 11]
])

export class Todoist {
  constructor() {
    this.projectsLibrary = [];
  }

  async getProjectsLibrary() {
    const prjs = await getProjectsLibrary();
    this.projectsLibrary = prjs;
  }
}

async function getNoDateAgents(todoistObject) {
  const noDateAgents = [];
  const noDateTasks = await getNoDates();
  if (noDateTasks.length > 0) {
    noDateTasks.forEach(task => {
      const agent = new Agent(0,0,false, getRadiusByPriority(task.priority), getColorForProject(task.project_id, todoistObject));
      noDateAgents.push(agent);
    });
  } else {
    // TODO: missing no date tasks
  }
  return noDateAgents;
}

async function getTodayAgents(todoistObject) {
  const todayAgents = [];
  const todayTasks = await getTodayTasks();
  if (todayTasks.length > 0) {
    todayTasks.forEach(task => {
      const color = getColorForProject(task.project_id, todoistObject);
      const agent = new Agent(0,0,true, getRadiusByPriority(task.priority), color);
      todayAgents.push(agent);
    });
  } else {
    // TODO: missing no date tasks
  }
  return todayAgents;
}

function getRadiusByPriority(priority) {
  return radiusPriorityMap.get(priority) || 4;
}

function getColorForProject(projectID, todoistObject) {
  for (let index = 0; index < todoistObject.projectsLibrary.length; index++) {
    const element = todoistObject.projectsLibrary[index];
    if (element.id == projectID) {
      return element.color;
    }
  }
  return 666;
}

export {getNoDateAgents, getTodayAgents}