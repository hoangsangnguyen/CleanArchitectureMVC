import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-notification',
  templateUrl:'./notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @ViewChild('slidetemplate', { read: TemplateRef })
  public slidetemplate: TemplateRef<any>;

  @ViewChild('fadetemplate', { read: TemplateRef })
  public fadetemplate: TemplateRef<any>;

  @ViewChild('template', { read: TemplateRef })
  public template: TemplateRef<any>;

  @ViewChild('viewContainer', { read: ViewContainerRef })
  public viewContainer: ViewContainerRef;

  public enabled: boolean = true;
  public duration: number = 500;
  public animationType: string = 'slide';
  
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
  }

  public show(): void {
    if (this.enabled && this.animationType === 'slide') {
        this.notificationService.show({
            content: this.slidetemplate,
            animation: {
                type: this.animationType,
                duration: this.duration
            },
            type: { style: 'success' }
        })
    } else if (this.enabled && this.animationType === 'fade') {
        this.notificationService.show({
            content: this.fadetemplate,
            animation: {
                type: this.animationType,
                duration: this.duration
            },
            type: { style: 'info', icon: true }
        })
    } else {
        this.notificationService.show({
            content: this.template,
            position: { horizontal: 'right', vertical: 'bottom' }
        })
    }
}
}
