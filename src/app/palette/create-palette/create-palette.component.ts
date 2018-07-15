import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import { Palette } from '../../models/palette.model';

@Component({
  selector: 'app-create-palette',
  templateUrl: './create-palette.component.html',
  styleUrls: ['./create-palette.component.css']
})
export class CreatePaletteComponent implements OnInit {

  // Constructor
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  // Properties
  paletteCreationForm: FormGroup;
  count: Number;

  // Methods
  ngOnInit() {
    // const colorPicker = this.formBuilder.group({color: ''});
    this.paletteCreationForm = this.formBuilder.group({
      themeName: '',
      colors: this.formBuilder.array([
        this.formBuilder.group({color: ''}),
        this.formBuilder.group({color: ''}),
        this.formBuilder.group({color: ''})
      ]),
    });
    this.count = this.colors.controls.length;
  }

  onSubmit() {
    console.log(this.paletteCreationForm.value.themeName, this.paletteCreationForm.value.colors);
  }

  onClear() {
    this.paletteCreationForm.reset();
  }

  // Add a new picker field
  get colors() {
    return this.paletteCreationForm.get('colors') as FormArray;
  }

  addColorPicker() {
    this.colors.controls.push(this.formBuilder.group({color: undefined}));
    this.count = this.colors.controls.length;
  }

  removeColorPicker(index) {
    this.colors.removeAt(index);
    this.count = this.colors.controls.length;
  }

  getColor(index, e) {
    this.paletteCreationForm.controls.colors.value[index] = {color: e};
  }

}
