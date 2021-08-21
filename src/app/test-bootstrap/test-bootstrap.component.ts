import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test-bootstrap',
  templateUrl: './test-bootstrap.component.html',
  styleUrls: ['./test-bootstrap.component.scss'],
})
export class TestBootstrapComponent implements OnInit {
  FormGroup: FormGroup = new FormGroup({});
  constructor() {}

  ngOnInit(): void {}
}
