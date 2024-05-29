import { Component ,OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { ProjectAndTasksService } from "../../services/project-and-tasks.service";
@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit  {
  urlImagePack = "http://localhost:8081/imagePack/"
  currentPage = 1;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  title = '';
  collection : any  = [];


  constructor(
    private router: Router,
    private pjctService : ProjectAndTasksService,
  ) { }
  ngOnInit(): void {
    this.getAllProduct()
  
    };
  handlePageChange(event: number): void {
    this.page = event;
    this.collection();
  }
  getAllProduct() {
this.pjctService.getAllProjectsAdmin().subscribe((res:any) => {
  console.log(res)
  this.collection = res ;
})
  }
  delete(id: any) {
    var res = confirm("Êtes-vous sûr de vouloir supprimer?");
    if (res) { this.pjctService.deleteProject(id).subscribe((res:any) => {console.log(res)
      this.getAllProduct()
   })
  }
     
      
      else
       console.log(res)
      
    
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.collection();
  }
  searchTitle(): void {
    this.page = 1;

  }



  update(id: number) {
    this.router.navigate(["project-update", id]);
  } 
  details(id: number) 
 {
  this.router.navigate(["project", id]);
 }
}
