import { Agent } from '../../models/agent';
import {TodoistDAO} from '../../services/todoistDAO';

const radiusPriorityMap = new Map([
  [1, 4],
  [2, 5],
  [3, 8],
  [4, 11]
])

async function getNoDateAgents(todoistDAO) {
  const noDateAgents = [];
  const noDateTasks = await todoistDAO.getNoDates();
  if (noDateTasks.length > 0) {
    noDateTasks.forEach(task => {
      const color = todoistDAO.getColorForProject(task.project_id);
      const agent = new Agent(0,0,false, getRadiusByPriority(task.priority), color);
      noDateAgents.push(agent);
    });
  }
  return noDateAgents;
}

async function getTodayAgents(todoistDAO) {
  const todayAgents = [];
  const todayTasks = await todoistDAO.getTodayTasks();
  if (todayTasks.length > 0) {
    todayTasks.forEach(task => {
      const color = todoistDAO.getColorForProject(task.project_id);
      const agent = new Agent(0,0,true, getRadiusByPriority(task.priority), color);
      todayAgents.push(agent);
    });
  }
  return todayAgents;
}

async function getDoneTodayAgents(todoistDAO) {
  const doneToday = [];
  const doneTodayTasks = await todoistDAO.getDoneToday();
  if (doneTodayTasks.items.length > 0) {
    doneTodayTasks.items.forEach(task => {
      const color = todoistDAO.getColorForProject(task.project_id);
      const agent = new Agent(0,0,false, getRadiusByPriority(task.priority), color);
      doneToday.push(agent);
    });
  }
  console.log('doneToday :>> ', doneToday);
  return doneToday;
}

function getRadiusByPriority(priority) {
  return radiusPriorityMap.get(priority) || 4;
}

export {getNoDateAgents, getTodayAgents, getDoneTodayAgents}