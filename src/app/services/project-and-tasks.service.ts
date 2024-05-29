import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project';
import { Task } from '../interfaces/task';

const apiBaseUrl = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProjectAndTasksService {

  private apiServerUrl = `${apiBaseUrl}/projects/adminuser/`;
  private apiServerUrlTasks = `${apiBaseUrl}/tasks/adminuser/`;
  private  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.authService.getToken()}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private authService:AuthService) {}

  createProject(project:any): Observable<Project> {
    return this.http.post<any>(`${this.apiServerUrl}create`, project, { headers: this.headers });
  }
  createtasks(task:any): Observable<Project> {
    return this.http.post<any>(`${this.apiServerUrlTasks}tasksCreate`, task, { headers: this.headers });
  }
  deleteTask(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrlTasks}tasks_delete_/${projectId}`, { headers: this.headers });
  }
  updateTasks(tasks: any): Observable<Project> {
    return this.http.patch<any>(`${this.apiServerUrlTasks}tasksUpdate`, tasks, { headers: this.headers });
  }
  getTasksByUser(id: any): Observable<Project> {
    return this.http.get<any>(`${this.apiServerUrlTasks}adminuser/user/${id}`, { headers: this.headers });
  }
 
  updateProject(project: any): Observable<Project> {
    return this.http.patch<any>(`${this.apiServerUrl}update`, project, { headers: this.headers });
  }

  getAllProjectsByUserId(userId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiServerUrl}users/${userId}`, { headers: this.headers });
  }
  getAllProjectsAdmin(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiServerUrl}all`, { headers: this.headers });
  }
  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiServerUrl+projectId}`, { headers: this.headers });
  }

  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}delete/${projectId}`, { headers: this.headers });
  }

  getAllTasksByProjectId(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiServerUrl}tasks/${projectId}`, { headers: this.headers });
  }

  getAllTasksForToday(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiServerUrl}tasks/today/${userId}`, { headers: this.headers });
  }
}
