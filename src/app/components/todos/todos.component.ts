import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  tasks: any[] = [];
  newTask: any = {
    name: '',
    is_done: false
  }
  constructor(private api: ApiService) { }

  async ngOnInit() {
    let res = await this.api.apiRequest('allTodos', {}, 'get')
    const arr = JSON.parse(res);
    if (arr instanceof Array) {
      this.tasks = arr;
    }
    this.tasks.forEach(t => {
      t.is_done = t.is_done === 'true'
    })
    console.log(this.tasks);
  }

  getTasksLeft() {
    let left = 0;
    this.tasks.length > 0 && this.tasks.reduce((c) => !c.is_done && ++left);
    return left;
  }

  async saveTask(key: any) {
    if (key.keyCode === 13) {
      const res = await this.api.apiRequest('createTodo', {
        "name": this.newTask.name,
        "is_done": `${this.newTask.is_done}`
      }, 'post');
      console.log(res)
    }
  }

  async updateTask(task: any) {

    this.newTask.is_done = `${this.newTask.is_done}`;
    const res = await this.api.apiRequest('createTodo', this.newTask, 'post');
    console.log(res)

  }

  async deleteTask(task: any) {

    this.newTask.is_done = `${this.newTask.is_done}`;
    const res = await this.api.apiRequest('createTodo', this.newTask, 'post');
    console.log(res)

  }
}
