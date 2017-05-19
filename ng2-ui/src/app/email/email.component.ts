import {Component, OnInit} from '@angular/core';
import {Email} from './email.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
    public errorMessage: string;
    private emailList: Email[];
    private selectedEmail: Email;
    public emailForm: FormGroup;
    formErrors = {
        'fullname': '',
        'emailaddress': ''
    };
    validationMessages = {
        'fullname': {
            'required': 'full name is required.'
        },
        'emailaddress': {
            'required': 'email address is required.'
        }
    };

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.emailList = new Array();
        this.selectedEmail = new Email();
        this.buildForm();
    }

    buildForm(): void {
        this.emailForm = this.fb.group({
            'fullname': [this.selectedEmail.fullName, Validators.required ],
            'emailaddress': [this.selectedEmail.emailAddress, Validators.required]
        });
        this.emailForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }

    onValueChanged(data?: any) {
        if (!this.emailForm) {
            return;
        }
        const form = this.emailForm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    onSubmit() {
        // this.hero = this.prepareSaveHero();
        // this.heroService.updateHero(this.hero).subscribe(/* error handling */);
        // this.ngOnChanges();
    }

}
