import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectAndTasksService } from 'src/app/services/project-and-tasks.service';
import {UserService} from '../../services/user.service'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  taskForm: FormGroup;
  commentForm: FormGroup<any>;
  id: String;
  Myproject:Project;
  project:any;
  user: User
  userList:any  = [];
  editTask :any ;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userservice : UserService ,
    private router: Router,
    private route : ActivatedRoute,
    private PAndTservice :ProjectAndTasksService
  ) {}

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){

      this.taskForm = this.formBuilder.group({
        name: ['', Validators.required],
        details: [''],
        startDate: [''],
        endDate: [''],
        selectedUser:['', Validators.required]
      });
  
      this.commentForm = this.formBuilder.group({
        commentText: ['', Validators.required]
      });
      this.route.params.subscribe(params=>{
        this.id = params['id'];
        if(this.id != null){
          this.getAllUser();
          this.authService.getUser().subscribe(
            (data)=>{
              this.user = data;
              let exist=true;
             /* for(let proj of data.project){
                if(proj.id==Number(this.id)){
                  exist=true;
                  this.Myproject = proj;
                  break;
                }
              }
              if(exist==false){
                this.router.navigateByUrl('/')
              }else{
                console.log(this.Myproject);
              }*/
            },
            (error)=>this.router.navigateByUrl('/login')
          );
          this.PAndTservice.getProjectById(Number(this.id )).subscribe(res => {
            this.project = res;
          })
        }else{
          this.router.navigateByUrl("/");
        }
      })

    }else{
      this.router.navigateByUrl("/login");
    }
    
  }
  getAllUser() {
    this.userservice.getUsers().subscribe((res:any) => {
      this.userList = res ;
    })
  }
  onCreateTask() {
    // Logic to handle creating task
    console.log(this.taskForm.value)
    let object = {
      idProject : this.id,
      name:this.taskForm.value.name,
      description:this.taskForm.value.details,
      idUser:this.taskForm.value.selectedUser
    }
    this.PAndTservice.createtasks(object).subscribe(res => {
     console.log(res)
     this.PAndTservice.getProjectById(Number(this.id )).subscribe(res => {
      this.project = res;
    })
    })
  }
  onSubmitComment() {
    throw new Error('Method not implemented.');
    }
    public onOpenModal(user: User, mode:string ): void{
      const container= document.getElementById('table-responsive');
      const button= document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
    
      if (mode === 'edit') {
        this.editTask = user;
        button.setAttribute('data-target', '#updateUserModal');
      }
    
      container.appendChild(button);
      button.click();
    }
    public onUpdateTaks(taks: any): void {
      console.log(taks)
      let favorit = false ; 
      if(taks.favorite){
        favorit = true;
      }
 let obj = {
  id :this.editTask.id ,
  title:taks.title,
  description:taks.description,
  favorite : favorit,
 }
    this.PAndTservice.updateTasks(obj).subscribe(res => {
      this.PAndTservice.getProjectById(Number(this.id )).subscribe(res => {
        this.project = res;
      })
    })
    
    }
    ondelete(id:any){
      var res = confirm("Êtes-vous sûr de vouloir supprimer?");
      if (res) {
        console.log(id)
        this.PAndTservice.deleteTask(id).subscribe(res => {
          console.log(res)
          this.PAndTservice.getProjectById(Number(this.id )).subscribe(res => {
            this.project = res;
          })
        }
        )
        
     }
    
      
    }
}
