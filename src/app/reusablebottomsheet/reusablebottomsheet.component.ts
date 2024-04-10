import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { IDynamicDialogConfig } from '../reusabledialog/reusabledialog.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reusablebottomsheet',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './reusablebottomsheet.component.html',
  styleUrl: './reusablebottomsheet.component.css'
})
export class ReusablebottomsheetComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ReusablebottomsheetComponent>,
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: IDynamicDialogConfig) {
        data.acceptButtonTitle ?? 'Yes';
        data.title ?? 'Unnamed Dialog'; }
    
    
    closeBottomSheet() {
      const dataToReturn = { result: 'Success' };
      this.bottomSheetRef.dismiss(dataToReturn);
    }
    dismissBottomSheet(){
      this.bottomSheetRef.dismiss();
    }
  


}
