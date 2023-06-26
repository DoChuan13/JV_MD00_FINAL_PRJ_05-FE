import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-upload-multi',
  templateUrl: './upload-multi.component.html',
  styleUrls: ['./upload-multi.component.scss']
})
export class UploadMultiComponent implements OnInit {
  selectedFile: any;
  ref?: AngularFireStorageReference;
  downloadURL: any[] = [];
  checkUploadAvatar = false;
  @Output()
  giveURLtoCreate = new EventEmitter<string>();

  constructor(private afStorage: AngularFireStorage) {
  }

  onFileChangedMulti($event: any) {
    this.selectedFile = $event.target.files;
    if (this.selectedFile != null) {
      for (let i = 0; i < this.selectedFile.length; i++) {
        this.onUploadMulti(this.selectedFile[i]);
      }
    }
  }

  onUploadMulti(fileName: any) {
    this.checkUploadAvatar = true;
    const codeName = fileName.name + "_" + Math.random().toString(18).substring(2);
    console.log('codeName ---> ', codeName);
    this.ref = this.afStorage.ref(codeName);
    this.ref.put(fileName).then(snapshot => {
      return snapshot.ref.getDownloadURL();
    }).then(downloadURL => {
      this.downloadURL.push(downloadURL);
      this.giveURLtoCreate.emit(downloadURL);
      this.checkUploadAvatar = false;
      return downloadURL;
    })
      .catch(error => {
        console.log(`Failed to upload avatar and get link ${error}`);
      })
    console.log("Image base", this.downloadURL)
  }

  ngOnInit(): void {
    hideUploadInput();
  }
}


const hideUploadInput = () => {
  let inputBtn = document.getElementById("upload-btn");
  let inputElement = document.getElementById("upload-multi");
  // @ts-ignore
  inputBtn.addEventListener('click',(e)=>{
    // @ts-ignore
    inputElement.click();
    e.preventDefault()
  })
}
