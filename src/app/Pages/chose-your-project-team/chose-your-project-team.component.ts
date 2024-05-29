import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../../services/user.service'
import {ProjectAndTasksService} from '../../services/project-and-tasks.service'
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-chose-your-project-team',
  templateUrl: './chose-your-project-team.component.html',
  styleUrls: ['./chose-your-project-team.component.css']
})
export class ChoseYourProjectTeamComponent implements OnInit {
  myForm: FormGroup;
  tasks: { title: string ,description:string ,idUser : string , done:boolean , favorite:boolean }[] = [];
  taskName: string = '';
  taskDescription: string = '';
  selectedemail: string = '';
  myTeam:any = []
  userList:any  = [];
  constructor(private formBuilder: FormBuilder ,private userservice : UserService , private projectAndTasksService : ProjectAndTasksService) { }
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
        name: ['', Validators.required],
        endDate:['', Validators.required],
        description:['', Validators.required],
    });
    this.getAllUser();
  }
  onSubmitResult() {
    let obj = {
      name:this.myForm.value.name,
      description:this.myForm.value.description,
      endDate:this.myForm.value.endDate,
      user:this.myTeam,
      tasksList: this.tasks,
    }
    this.projectAndTasksService.createProject(obj).subscribe(result => {
      console.log(result);
      Swal.fire("your project is add!");

    })
  }
  getAllUser() {
    this.userservice.getUsers().subscribe((res:any) => {
      this.userList = res ;
    })
  }
  addTask() {
    // Logic to find user by email and add task
    console.log(this.selectedemail, this.taskName);
    let userSelected:any = this.userList.find((el:any) => el.id == this.selectedemail);
    console.log('userSelected:', userSelected);
    if(userSelected)
      {
    if(this.myTeam.length>0){
    let filterdTeam = this.myTeam.filter((el:any) => el.id ==  this.selectedemail);
    if(filterdTeam.length ==0){
      this.myTeam.push(userSelected);
    }}
    else {
      this.myTeam.push(userSelected);

    }
    if(userSelected && userSelected.id){
      let id = userSelected.id;
      this.tasks.push({ title: this.taskName ,description:this.taskDescription , idUser: id,done:false,favorite:false });
    }
   
      }
    this.taskName = ''; // Clear input after adding task
  this.taskDescription = '';
  this.selectedemail = '';
  console.log(' task:', this.tasks);
  console.log(' myTeam:', this.myTeam);
  }
}
