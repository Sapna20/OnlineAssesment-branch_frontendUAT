import { Component, OnInit, NgZone } from '@angular/core';
import { WindowRefService, ICustomWindow } from '../../paymentService/window-ref.service';
import { AuthservicesService } from '../../services/authservices.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { AppConstants } from 'src/app/shared/constants/AppConstants';


@Component({
  selector: 'app-razorpay',
  templateUrl: './razorpay.component.html',
  styleUrls: ['./razorpay.component.scss']
})
export class RazorpayComponent{

  private _window: ICustomWindow;
  private razorPayKey = AppConstants.razorPayKey;
  public rzp: any;
  country=['India','USA'];
  money={'India':['100','INR'],'USA':['100','USD'],};
  personame:'';
  contactnumber:'';
  selectedcountry="India";
  email="";
  public options: any = {
    key: this.razorPayKey, // add razorpay key here
    name: 'Nykinsky Assesssment',
    description: 'Premium Tests',
    currency:'INR',
    amount: '100', // razorpay takes amount in paisa
    prefill: {
      name: this.personame,
      email: this.email, // add your email id
      contact:this.contactnumber,
    },
    notes: {},
    theme: {
      color: '#3880FF'
    },
    handler: this.paymentHandler.bind(this),
    modal: {
      ondismiss: (() => {
        this.zone.run(() => {
          // add current page routing if payment fails
          console.log("unsuccessful");
        })
      })
    }
  };

  constructor(
    private zone: NgZone,
    private winRef: WindowRefService,
    private authservice:AuthservicesService,
    private notifyService: NotificationsService,
    private router:Router
  ) {
    this._window = this.winRef.nativeWindow;

    this.authservice.getuserdetails().subscribe((data:any)=>{
        this.personame=data.name;
        this.contactnumber=data.phoneNumber;
        this.email=data.email
      
    },
    (err:HttpErrorResponse)=>
    {
    }
    );
  }

  initPay(): void {
    
    this.options= {
      key: this.razorPayKey, // add razorpay key here
      name: 'Nykinsky Assesssment',
      description: 'Premium Tests',
      currency:this.money[this.selectedcountry][1],
      amount: this.money[this.selectedcountry][0], // razorpay takes amount in paisa
      prefill: {
        name: this.personame,
        email:this.email, // add your email id
        contact:this.contactnumber,
      },
      notes: {},
      theme: {
        color: '#3880FF'
      },
      handler: this.paymentHandler.bind(this),
      modal: {
        ondismiss: (() => {
          this.zone.run(() => {
            // add current page routing if payment fails
            console.log("unsuccessful");
          })
        })
      }
    };
    this.rzp = new this.winRef.nativeWindow['Razorpay'](this.options);
    this.rzp.open();
  }

  paymentHandler(res: any) {
    this.zone.run(() => {
      let packet={'Token':sessionStorage.getItem('token'),'RazorpaySignature':"12345",'RazorpayPaymentId':'123','RazorpayOrderId':'3456'};
      this.authservice.setpremium(packet).subscribe((data:any)=>{
      
        if(data)
        {
          //this.router.navigate(['/otp-verification']);
          //alert(data);
        }
       
      },
      (err:HttpErrorResponse)=>
      {
        this.notifyService.showError("Something is wrong", "Error!");
      },
      ()=>{
        this.router.navigate(['./premiumTests']);
      }
      )
    });
  }


}
