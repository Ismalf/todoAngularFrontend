import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  tasks: any[] = [];
  filteredTasks: any[] = [];
  filter = 'all';
  newTask: any = {
    name: '',
    is_done: false
  }
  constructor(private api: ApiService) { }

  async ngOnInit() {
    await this.init()
  }

  async init() {
    let res = await this.api.apiRequest('allTodos', {}, 'get')
    const arr = JSON.parse(res);
    if (arr instanceof Array) {
      this.tasks = arr;
    }
    this.tasks.forEach(t => {
      t.is_done = t.is_done === 'true'
    })
    this.filteredTasks = this.tasks;
    console.log(this.tasks);

  }

  getTasksLeft() {
    let left = 0;
    this.tasks.forEach(t => !t.is_done && ++left)
    return left;
  }

  async saveTask(key: any) {
    if (key.keyCode === 13) {
      const res = await this.api.apiRequest('createTodo', {
        "name": this.newTask.name,
        "is_done": `${this.newTask.is_done}`
      }, 'post');
      console.log(res)
      this.newTask.name = '';
      this.init()
    }
  }

  async updateTask(task: any) {

    task.is_done = `${task.is_done}`;
    const res = await this.api.apiRequest('updateTodo', task, 'put');
    console.log(res)
    this.init()
  }

  async deleteTask(task: any) {
    const res = await this.api.apiRequest('deleteTodo', task.id, 'delete');
    console.log(res)
    this.init()
  }

  applyFilter() {
    switch (this.filter) {
      case 'all':
        this.filteredTasks = this.tasks;
        break;
      case 'notdone':
        this.filteredTasks = this.tasks.filter(t => !t.is_done);
        break;
      case 'done':
        this.filteredTasks = this.tasks.filter(t => t.is_done);
        break;
    }
  }

  async clearCompleted() {
    const l = this.tasks.length;
    for (let i = 0; i < l; i++) {
      if (this.tasks[i].is_done) {
        await this.api.apiRequest('deleteTodo', this.tasks[i].id, 'delete');
      }
    }

    this.init()
  }
}
