import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectAndTasksService } from "../../services/project-and-tasks.service";
@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent  implements OnInit {
  updateForm: FormGroup;
  categoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private prjService: ProjectAndTasksService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['id'];

    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      endDate: ['', Validators.required],

    });

    // Fetch category data by ID and pre-fill the form
    this.prjService.getProjectById(Number(this.categoryId)).subscribe((prj:any) => {
      this.updateForm.patchValue({
        name: prj.name,   
        description :prj.description,   
        endDate :prj.endDate
      });
    });
  }

  onSubmit(): void {
    if (this.updateForm.invalid) {
      return;
    }

    const updatedCategory = {
      id: Number(this.categoryId),
      name: this.updateForm.value.name,
      description: this.updateForm.value.description,
      endDate: this.updateForm.value.endDate,
    };

    // Call category service to update the category
    this.prjService.updateProject(updatedCategory).subscribe(() => {
      console.log('Category updated successfully');
      this.router.navigate(['/project']); // Redirect to category list page
    }, error => {
      console.error('Error updating category:', error);
      // Handle error if necessary
    });
  }
}


