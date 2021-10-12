import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IsbnResp, IsbnService } from '../isbn.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  data: any;
  book: any;
  constructor(private barcodeScanner: BarcodeScanner, public isbnService: IsbnService, public alertCtrl: AlertController) {
  }

  scan() {
    this.data = null;
    this.book = null;
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.data = barcodeData;
      console.log(this.data);
      this.getBook(this.data.text.trim());
    }).catch(err => {
      console.log('Error', err);
    });
  }

  getBook(id) {
    
    this.isbnService.getBook(id).subscribe((data: IsbnResp) => {
      this.book = data.book;
      console.log("Book :");
      console.log(data);
    },
    (err) => {
      console.log(err);
      this.presentAlert();
    });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
    message: 'Nous n\'arrivons pas à trouver un livre avec le ISBN : ' + this.data.text,
    buttons:[{
        text: 'Ok',
        role: 'cancel',
        handler: () => {
          console.log('Ok clicked');
        }
      }]
    });

    alert.present();
  }
}

