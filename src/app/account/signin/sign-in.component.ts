import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router  } from "@angular/router";
import swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AccountService } from '../account-service/account.service';
import { FormControl } from '@angular/forms';
import { BsModalService } from 'ngx-foundation/modal';
import { BsModalRef } from 'ngx-foundation/modal/bs-modal-ref.service';
declare var $: any;
@Component ({
    templateUrl: 'sign-in.component.html', 
    styleUrls:[ '../../../assets/css/style.css', '../../../assets/css/home.css'],
    encapsulation: ViewEncapsulation.None

})
export class SignInComponent implements OnInit {
  modalRef: BsModalRef;
    signinForm: any;
    forgetPasswordForm: any;
    rememberMe=false;
    submitted = false;
    submittedF=false;
    massage = null;

    constructor(private formbulider: FormBuilder,private modalService: BsModalService,
        private _service:AccountService,private _router:Router,
        private ngxUiLoaderService: NgxUiLoaderService) { }
        ngOnInit() {
         // this.loadScripts();
            this.signinForm = this.formbulider.group({
                UserName: ['', [Validators.required]],
                RememberMe: [false, [Validators.required]],
                Password: ['', [Validators.required]]

              });
              this.forgetPasswordForm = this.formbulider.group({
                email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
             
              });

                      
let loggedUser = localStorage.getItem('loggeduser-remember');

if(loggedUser !='' && loggedUser !=null)
 {
  const lp: any = JSON.parse(localStorage.getItem('loggeduser-remember'));
  this.signinForm.patchValue({
    UserName: lp.UserName,
    RememberMe:lp.RememberMe,
    Password:lp.Password});

 }


// Signup/Signin Background image



  var images = ['main-banner-two.jpg', 'main-banner-first.jpg'];


  // $('<img class="fade-in" src="assets/img/' + images[Math.floor(Math.random() * images.length)] + '">').appendTo('#background-img').load(function(){
  //     $(this).remove();
  //     $('#background-img').css({'background-image': 'url(assets/img/' + images[Math.floor(Math.random() * images.length)] + ')'});
  //     $("#background-overlay").addClass("overlay-timout");
  // });


        }


        get f() { return this.signinForm.controls; }
        get fp() { return this.forgetPasswordForm.controls; }

        onSigninFormSubmit() {
          

       }

       checkValue(chk){
         if(this.rememberMe)
         {
          this.rememberMe=false;
         }else{
          this.rememberMe=true;
         }
        
       }
  
       onForgetPasswordFormSubmit(){
        this.submittedF = true;
        if (this.forgetPasswordForm.invalid) {
          return false;
      }
      this.ngxUiLoaderService.start();
      let obj = this.forgetPasswordForm.value;

      this._service.ForgetPassword(obj.email).subscribe(
        (data) => {
          
          const resp:any =data;
          console.log(resp);
          if(resp.response)
          {
            this.modalRef.hide();
          swal( "Success","Password reset link has been sent to registered email","success")

          }

        },(error) => {
          this.ngxUiLoaderService.stop();
        //  swal( "Error",error.message,"error")
      }
      );


       }

      openModal(template: TemplateRef<any>) { 
        this.modalRef = this.modalService.show(template, {class: 'tiny', ignoreBackdropClick: true,
        });
      }

}
